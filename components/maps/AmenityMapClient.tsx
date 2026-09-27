"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AMENITY_MAP_EMBED_URL,
  AMENITY_MAP_RADIUS_METERS,
  amenityCategories,
  communityAmenitiesConfig,
  directionsUrlForAddress,
  getCuratedPlacesForCategory,
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
  placeSearchUrl,
  type AmenityCategoryId,
} from "@/lib/amenities-map";

type MapPlace = {
  id: string;
  name: string;
  address: string;
  rating?: number;
  lat?: number;
  lng?: number;
};

type AmenityMapClientProps = {
  compact?: boolean;
  defaultCategory?: AmenityCategoryId;
};

const MAP_MIN_HEIGHT = 420;
const MAP_HEIGHT_COMPACT = "min(60vh, 520px)";
const MAP_HEIGHT_FULL = "min(72vh, 640px)";

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }

  const w = window as Window & { __amenityMapsScriptPromise?: Promise<void> };
  if (w.__amenityMapsScriptPromise) {
    return w.__amenityMapsScriptPromise;
  }

  w.__amenityMapsScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-amenity-maps="true"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("maps script")), {
        once: true,
      });
      if ((window as Window & { google?: unknown }).google) {
        resolve();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.amenityMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("maps script failed"));
    document.head.appendChild(script);
  });

  return w.__amenityMapsScriptPromise;
}

function curatedToMapPlaces(categoryId: AmenityCategoryId): MapPlace[] {
  return getCuratedPlacesForCategory(categoryId).map((p, i) => ({
    id: `curated-${categoryId}-${i}`,
    name: p.name,
    address: p.address,
  }));
}

export default function AmenityMapClient({
  compact = false,
  defaultCategory = "restaurants",
}: AmenityMapClientProps) {
  const apiKey = getGoogleMapsApiKey();
  const mapId = getGoogleMapsMapId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(defaultCategory);
  const [inView, setInView] = useState(false);
  const [useInteractive, setUseInteractive] = useState(false);
  const [loadFailed, setLoadFailed] = useState(!apiKey);
  const [places, setPlaces] = useState<MapPlace[]>(() =>
    curatedToMapPlaces(defaultCategory)
  );
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const tablistId = useId();
  const mapHeight = compact ? MAP_HEIGHT_COMPACT : MAP_HEIGHT_FULL;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const renderMarkers = useCallback(
    (map: google.maps.Map, list: MapPlace[]) => {
      clearMarkers();
      const infoWindow =
        infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;

      list.forEach((place) => {
        if (place.lat == null || place.lng == null) return;
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
        });
        marker.addListener("click", () => {
          const ratingLine =
            place.rating != null
              ? `<p style="margin:4px 0;font-size:13px">Rating: ${place.rating.toFixed(1)}</p>`
              : "";
          const directions = directionsUrlForAddress(
            place.address || `${place.lat},${place.lng}`
          );
          infoWindow.setContent(
            `<div style="max-width:240px;font-family:system-ui,sans-serif">
              <strong>${place.name}</strong>
              ${ratingLine}
              <p style="margin:4px 0;font-size:13px">${place.address}</p>
              <a href="${directions}" target="_blank" rel="noopener noreferrer">Directions</a>
            </div>`
          );
          infoWindow.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });
    },
    [clearMarkers]
  );

  const ensureCommunityMarker = useCallback((map: google.maps.Map) => {
    if (communityMarkerRef.current) return;
    const marker = new google.maps.Marker({
      map,
      position: communityAmenitiesConfig.center,
      title: communityAmenitiesConfig.communityMarkerLabel,
      zIndex: 999,
    });
    const infoWindow =
      infoWindowRef.current ?? new google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;
    marker.addListener("click", () => {
      infoWindow.setContent(
        `<div style="max-width:260px;font-family:system-ui,sans-serif">
          <strong>${communityAmenitiesConfig.communityMarkerLabel}</strong>
          <p style="margin:4px 0;font-size:13px">${communityAmenitiesConfig.communityAddress}</p>
          <a href="${directionsUrlForAddress(communityAmenitiesConfig.communityAddress)}" target="_blank" rel="noopener noreferrer">Directions</a>
        </div>`
      );
      infoWindow.open({ map, anchor: marker });
    });
    communityMarkerRef.current = marker;
  }, []);

  const initMap = useCallback(async () => {
    if (!apiKey || !mapContainerRef.current || mapInstanceRef.current) return;

    try {
      await loadGoogleMapsScript(apiKey);
      await google.maps.importLibrary("maps");
      const map = new google.maps.Map(mapContainerRef.current, {
        center: communityAmenitiesConfig.center,
        zoom: 14,
        ...(mapId ? { mapId } : {}),
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      mapInstanceRef.current = map;
      ensureCommunityMarker(map);
      setUseInteractive(true);
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
      setUseInteractive(false);
    }
  }, [apiKey, ensureCommunityMarker, mapId]);

  useEffect(() => {
    if (!inView || !apiKey || loadFailed) return;
    void initMap();
  }, [inView, apiKey, loadFailed, initMap]);

  const fetchPlacesForCategory = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const category = amenityCategories.find((c) => c.id === categoryId);
      if (!category) {
        setPlaces(curatedToMapPlaces(categoryId));
        return;
      }

      setLoadingPlaces(true);
      const fallback = curatedToMapPlaces(categoryId);
      setPlaces(fallback);

      if (!mapInstanceRef.current || !apiKey || loadFailed) {
        setLoadingPlaces(false);
        return;
      }

      try {
        const placesLib = (await google.maps.importLibrary(
          "places"
        )) as google.maps.PlacesLibrary;
        const { Place } = placesLib;
        if (!Place?.searchNearby) {
          setLoadingPlaces(false);
          return;
        }

        const center = new google.maps.LatLng(
          communityAmenitiesConfig.center.lat,
          communityAmenitiesConfig.center.lng
        );

        const { places: nearby } = await Place.searchNearby({
          fields: [
            "displayName",
            "formattedAddress",
            "location",
            "rating",
            "id",
          ],
          locationRestriction: {
            center,
            radius: AMENITY_MAP_RADIUS_METERS,
          },
          includedPrimaryTypes: category.primaryTypes,
          maxResultCount: 12,
        });

        const mapped: MapPlace[] = nearby
          .map((p, index) => {
            const loc = p.location;
            const lat = loc?.lat();
            const lng = loc?.lng();
            const rawName = p.displayName as string | { text?: string } | undefined;
            const name =
              typeof rawName === "string"
                ? rawName
                : rawName?.text ?? "Place";
            const address = p.formattedAddress ?? "";
            return {
              id: p.id ?? `place-${index}`,
              name,
              address,
              rating: p.rating ?? undefined,
              lat,
              lng,
            };
          })
          .filter((p) => p.lat != null && p.lng != null);

        if (mapped.length > 0) {
          setPlaces(mapped);
          renderMarkers(mapInstanceRef.current, mapped);
        } else {
          renderMarkers(mapInstanceRef.current, fallback);
        }
      } catch {
        if (mapInstanceRef.current) {
          renderMarkers(mapInstanceRef.current, fallback);
        }
      } finally {
        setLoadingPlaces(false);
      }
    },
    [apiKey, loadFailed, renderMarkers]
  );

  useEffect(() => {
    if (!useInteractive || !mapInstanceRef.current) return;
    void fetchPlacesForCategory(activeCategory);
  }, [activeCategory, useInteractive, fetchPlacesForCategory]);

  useEffect(() => {
    if (useInteractive && apiKey && !loadFailed) return;
    setPlaces(curatedToMapPlaces(activeCategory));
  }, [activeCategory, useInteractive, apiKey, loadFailed]);

  const showEmbed = !apiKey || loadFailed || !useInteractive;

  return (
    <div ref={sectionRef} className="w-full">
      <div
        role="tablist"
        id={tablistId}
        aria-label="Amenity categories near Midtown Las Vegas"
        className="flex flex-wrap gap-2 pb-4"
      >
        {amenityCategories.map((cat) => {
          const selected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              id={`${tablistId}-${cat.id}`}
              aria-selected={selected}
              aria-controls={`${tablistId}-panel`}
              tabIndex={selected ? 0 : -1}
              aria-label={cat.ariaLabel}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-labelledby={`${tablistId}-${activeCategory}`}
        className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
        style={{ height: mapHeight, minHeight: MAP_MIN_HEIGHT }}
      >
        {showEmbed ? (
          <iframe
            title={`Map of amenities near ${communityAmenitiesConfig.communityMarkerLabel}`}
            src={AMENITY_MAP_EMBED_URL}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div
            ref={mapContainerRef}
            className="absolute inset-0 h-full w-full"
            aria-label={`Interactive Google Map showing ${activeCategory} near ${communityAmenitiesConfig.name}`}
          />
        )}
        {loadingPlaces && !showEmbed && (
          <p className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs text-slate-600 shadow">
            Updating places…
          </p>
        )}
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2" aria-live="polite">
        {places.map((place) => (
          <li
            key={place.id}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <p className="font-medium text-slate-900">{place.name}</p>
            {place.address ? (
              <p className="text-slate-600">{place.address}</p>
            ) : null}
            <a
              href={placeSearchUrl(place.name, place.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-blue-600 hover:underline"
            >
              Directions
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
