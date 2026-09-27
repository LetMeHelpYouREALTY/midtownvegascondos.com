"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { searchCategory } from "@/lib/amenities-places-search";
import {
  loadGoogleMaps,
  mapsAuthFailed,
} from "@/lib/google-maps-loader";
import {
  AMENITY_MAP_EMBED_URL,
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
  lat?: number;
  lng?: number;
  mapsUri?: string;
};

type AmenityMapClientProps = {
  compact?: boolean;
  defaultCategory?: AmenityCategoryId;
};

const MAP_MIN_HEIGHT = 420;
const MAP_HEIGHT_COMPACT = "min(60vh, 520px)";
const MAP_HEIGHT_FULL = "min(72vh, 640px)";

function curatedToMapPlaces(categoryId: AmenityCategoryId): MapPlace[] {
  return getCuratedPlacesForCategory(categoryId).map((p, i) => ({
    id: `curated-${categoryId}-${i}`,
    name: p.name,
    address: p.address ?? "",
  }));
}

function placeDisplayName(displayName: unknown): string {
  if (!displayName) return "Place";
  if (typeof displayName === "string") return displayName;
  if (
    typeof displayName === "object" &&
    displayName !== null &&
    "text" in displayName &&
    typeof (displayName as { text?: string }).text === "string"
  ) {
    return (displayName as { text: string }).text;
  }
  return "Place";
}

function openInfoWindow(
  infoWindow: google.maps.InfoWindow,
  map: google.maps.Map,
  marker: google.maps.Marker,
  place: MapPlace
) {
  const container = document.createElement("div");
  container.style.maxWidth = "240px";
  container.style.fontFamily = "system-ui, sans-serif";

  const title = document.createElement("strong");
  title.textContent = place.name;
  container.appendChild(title);

  if (place.address) {
    const addr = document.createElement("p");
    addr.style.margin = "4px 0";
    addr.style.fontSize = "13px";
    addr.textContent = place.address;
    container.appendChild(addr);
  }

  const link = document.createElement("a");
  link.href = directionsUrlForAddress(
    place.address || `${place.lat},${place.lng}`
  );
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Directions";
  container.appendChild(link);

  infoWindow.setContent(container);
  infoWindow.open({ map, anchor: marker });
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
  const [forceFallback, setForceFallback] = useState(
    () => !apiKey || mapsAuthFailed
  );
  const [places, setPlaces] = useState<MapPlace[]>(() =>
    curatedToMapPlaces(defaultCategory)
  );
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const tablistId = useId();
  const mapHeight = compact ? MAP_HEIGHT_COMPACT : MAP_HEIGHT_FULL;

  const enterFallback = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    mapInstanceRef.current = null;
    setUseInteractive(false);
    setForceFallback(true);
  }, []);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

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
          openInfoWindow(infoWindow, map, marker, place);
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
      openInfoWindow(infoWindow, map, marker, {
        id: "community",
        name: communityAmenitiesConfig.communityMarkerLabel,
        address: communityAmenitiesConfig.communityAddress,
        lat: communityAmenitiesConfig.center.lat,
        lng: communityAmenitiesConfig.center.lng,
      });
    });
    communityMarkerRef.current = marker;
  }, []);

  const initMap = useCallback(async () => {
    if (
      !apiKey ||
      !mapContainerRef.current ||
      mapInstanceRef.current ||
      mapsAuthFailed ||
      forceFallback
    ) {
      return;
    }

    try {
      await loadGoogleMaps(apiKey);
      if (mapsAuthFailed) {
        enterFallback();
        return;
      }
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
      setForceFallback(false);
    } catch {
      enterFallback();
    }
  }, [apiKey, ensureCommunityMarker, enterFallback, forceFallback, mapId]);

  useEffect(() => {
    if (!inView || !apiKey || forceFallback || mapsAuthFailed) return;
    void initMap();
  }, [inView, apiKey, forceFallback, initMap]);

  const fetchPlacesForCategory = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const category = amenityCategories.find((c) => c.id === categoryId);
      const fallback = curatedToMapPlaces(categoryId);
      setPlaces(fallback);

      if (!category) return;

      if (!mapInstanceRef.current || !apiKey || forceFallback) {
        return;
      }

      setLoadingPlaces(true);
      try {
        const nearby = await searchCategory(categoryId, category.primaryTypes);
        const mapped: MapPlace[] = nearby
          .map((p, index) => {
            const loc = p.location;
            const json = loc?.toJSON();
            const lat = json?.lat ?? loc?.lat();
            const lng = json?.lng ?? loc?.lng();
            const name = placeDisplayName(p.displayName);
            const address = p.formattedAddress ?? "";
            return {
              id: p.id ?? `place-${index}`,
              name,
              address,
              lat,
              lng,
              mapsUri: p.googleMapsURI ?? undefined,
            };
          })
          .filter((p) => p.lat != null && p.lng != null);

        if (mapped.length > 0) {
          setPlaces(mapped);
          if (mapInstanceRef.current) {
            renderMarkers(mapInstanceRef.current, mapped);
          }
        } else if (mapInstanceRef.current) {
          renderMarkers(mapInstanceRef.current, fallback);
        }
      } catch {
        setPlaces(fallback);
        if (mapInstanceRef.current) {
          renderMarkers(mapInstanceRef.current, fallback);
        }
      } finally {
        setLoadingPlaces(false);
      }
    },
    [apiKey, forceFallback, renderMarkers]
  );

  useEffect(() => {
    if (!useInteractive || !mapInstanceRef.current) return;
    void fetchPlacesForCategory(activeCategory);
  }, [activeCategory, useInteractive, fetchPlacesForCategory]);

  useEffect(() => {
    if (useInteractive && apiKey && !forceFallback) return;
    setPlaces(curatedToMapPlaces(activeCategory));
  }, [activeCategory, useInteractive, apiKey, forceFallback]);

  const showEmbed = !apiKey || forceFallback || !useInteractive;

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
              href={
                place.mapsUri ??
                placeSearchUrl(place.name, place.address)
              }
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
