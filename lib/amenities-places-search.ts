import {
  AMENITY_MAP_RADIUS_METERS,
  communityAmenitiesConfig,
  type AmenityCategoryId,
} from "@/lib/amenities-map";

const cache = new Map<string, Promise<google.maps.places.Place[]>>();

export function searchCategory(
  categoryId: AmenityCategoryId,
  types: string[]
): Promise<google.maps.places.Place[]> {
  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: [
          "displayName",
          "location",
          "formattedAddress",
          "googleMapsURI",
          "id",
        ],
        locationRestriction: {
          center: communityAmenitiesConfig.center,
          radius: AMENITY_MAP_RADIUS_METERS,
        },
        includedPrimaryTypes: types,
        maxResultCount: 10,
        rankPreference: "POPULARITY" as any,
      });
      return places;
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}
