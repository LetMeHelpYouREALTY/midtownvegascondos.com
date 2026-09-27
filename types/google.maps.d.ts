/** Minimal Maps JS API types for amenity map (full types via @types/google.maps optional). */
declare namespace google.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class Map {
    constructor(el: HTMLElement, opts?: Record<string, unknown>);
  }

  class Marker {
    constructor(opts?: {
      map?: Map | null;
      position?: { lat: number; lng: number };
      title?: string;
      zIndex?: number;
    });
    setMap(map: Map | null): void;
    addListener(event: string, handler: () => void): void;
  }

  class InfoWindow {
    constructor();
    setContent(content: string): void;
    open(opts: { map: Map; anchor?: Marker }): void;
  }

  interface PlacesLibrary {
    Place: {
      searchNearby: (request: {
        fields: string[];
        locationRestriction: { center: LatLng; radius: number };
        includedPrimaryTypes: string[];
        maxResultCount: number;
      }) => Promise<{
        places: Array<{
          id?: string;
          displayName?: string;
          formattedAddress?: string;
          rating?: number;
          location?: { lat(): number; lng(): number };
        }>;
      }>;
    };
  }

  function importLibrary(name: "maps" | "places"): Promise<PlacesLibrary | unknown>;
}
