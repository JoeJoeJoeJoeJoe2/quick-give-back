import { useState, useCallback } from "react";
import { VolunteerPlace, CauseArea, LoadingState } from "@/types/volunteer";

interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

// Map OSM amenity types to our cause categories
function categorizePoi(tags: Record<string, string>): CauseArea {
  const amenity = tags.amenity || "";
  const shop = tags.shop || "";
  const landuse = tags.landuse || "";
  const leisure = tags.leisure || "";

  // Food-related
  if (["food_bank", "soup_kitchen", "social_facility"].includes(amenity) && 
      (tags.social_facility === "food_bank" || tags.name?.toLowerCase().includes("food"))) {
    return "food";
  }
  if (shop === "food" || amenity === "food_bank") return "food";

  // Health-related
  if (["hospital", "clinic", "doctors", "nursing_home", "social_facility"].includes(amenity) &&
      tags.social_facility !== "food_bank") {
    return "health";
  }

  // Education-related
  if (["school", "library", "college", "university", "kindergarten"].includes(amenity)) {
    return "education";
  }

  // Animals
  if (["animal_shelter", "veterinary"].includes(amenity) || 
      tags.name?.toLowerCase().includes("animal") ||
      tags.name?.toLowerCase().includes("humane")) {
    return "animals";
  }

  // Environment
  if (["park", "garden", "nature_reserve"].includes(leisure) ||
      landuse === "forest" ||
      tags.name?.toLowerCase().includes("conservation") ||
      tags.name?.toLowerCase().includes("environmental")) {
    return "environment";
  }

  // Default to community
  return "community";
}

function getPlaceName(tags: Record<string, string>, type: string): string {
  return tags.name || tags["name:en"] || `${type.replace(/_/g, " ")} location`;
}

function buildAddress(tags: Record<string, string>): string {
  const parts = [];
  if (tags["addr:housenumber"]) parts.push(tags["addr:housenumber"]);
  if (tags["addr:street"]) parts.push(tags["addr:street"]);
  if (tags["addr:city"]) parts.push(tags["addr:city"]);
  if (tags["addr:state"]) parts.push(tags["addr:state"]);
  if (tags["addr:postcode"]) parts.push(tags["addr:postcode"]);
  
  return parts.length > 0 ? parts.join(", ") : "Address not available";
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10;
}

export function useVolunteerPlaces() {
  const [places, setPlaces] = useState<VolunteerPlace[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    step: "idle",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(async (location: string, radiusMiles: number = 10) => {
    setError(null);
    setPlaces([]);
    setLoadingState({
      isLoading: true,
      step: "geocoding",
      message: `Finding coordinates for "${location}"...`,
    });

    try {
      // Step 1: Geocode the location
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "VolunteerFinder/1.0 (https://lovable.app)",
          },
        }
      );

      if (!geoResponse.ok) {
        throw new Error("Failed to find location");
      }

      const geoData: GeocodingResult[] = await geoResponse.json();
      
      if (geoData.length === 0) {
        throw new Error("Location not found. Please try a different search.");
      }

      const { lat, lon } = geoData[0];
      const centerLat = parseFloat(lat);
      const centerLon = parseFloat(lon);

      setLoadingState({
        isLoading: true,
        step: "searching",
        message: "Searching for volunteer opportunities nearby...",
      });

      // Step 2: Query Overpass API for volunteer-related places
      const radiusMeters = radiusMiles * 1609.34;
      
      // Query for various volunteer-related amenities
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="food_bank"](around:${radiusMeters},${lat},${lon});
          node["amenity"="social_facility"](around:${radiusMeters},${lat},${lon});
          node["amenity"="community_centre"](around:${radiusMeters},${lat},${lon});
          node["amenity"="shelter"](around:${radiusMeters},${lat},${lon});
          node["amenity"="library"](around:${radiusMeters},${lat},${lon});
          node["leisure"="nature_reserve"](around:${radiusMeters},${lat},${lon});
          node["shop"="charity"](around:${radiusMeters},${lat},${lon});
          node["amenity"="animal_shelter"](around:${radiusMeters},${lat},${lon});
          node["healthcare"="hospice"](around:${radiusMeters},${lat},${lon});
          way["amenity"="food_bank"](around:${radiusMeters},${lat},${lon});
          way["amenity"="social_facility"](around:${radiusMeters},${lat},${lon});
          way["amenity"="community_centre"](around:${radiusMeters},${lat},${lon});
          way["amenity"="shelter"](around:${radiusMeters},${lat},${lon});
          way["amenity"="library"](around:${radiusMeters},${lat},${lon});
          way["shop"="charity"](around:${radiusMeters},${lat},${lon});
          way["amenity"="animal_shelter"](around:${radiusMeters},${lat},${lon});
        );
        out center;
      `;

      const overpassResponse = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: `data=${encodeURIComponent(overpassQuery)}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "VolunteerFinder/1.0 (https://lovable.app)",
        },
      });

      if (!overpassResponse.ok) {
        throw new Error("Failed to search for places. Please try again.");
      }

      const overpassData = await overpassResponse.json();
      const elements: OverpassElement[] = overpassData.elements || [];

      setLoadingState({
        isLoading: true,
        step: "processing",
        message: `Processing ${elements.length} locations found...`,
      });

      // Step 3: Process and transform the data
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause for UX

      const volunteerPlaces: VolunteerPlace[] = elements
        .filter(el => {
          const elLat = el.lat ?? el.center?.lat;
          const elLon = el.lon ?? el.center?.lon;
          return elLat !== undefined && elLon !== undefined && el.tags?.name;
        })
        .map(el => {
          const elLat = el.lat ?? el.center?.lat ?? 0;
          const elLon = el.lon ?? el.center?.lon ?? 0;
          const tags = el.tags || {};
          const osmType = el.type === "node" ? "node" : "way";

          return {
            id: `${el.type}-${el.id}`,
            name: getPlaceName(tags, tags.amenity || tags.shop || tags.leisure || "place"),
            type: categorizePoi(tags),
            address: buildAddress(tags),
            lat: elLat,
            lon: elLon,
            distance: calculateDistance(centerLat, centerLon, elLat, elLon),
            osmUrl: `https://www.openstreetmap.org/${osmType}/${el.id}`,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${elLat},${elLon}`,
            tags,
          };
        })
        .sort((a, b) => a.distance - b.distance);

      setPlaces(volunteerPlaces);
      setLoadingState({
        isLoading: false,
        step: "complete",
        message: `Found ${volunteerPlaces.length} volunteer opportunities`,
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setLoadingState({
        isLoading: false,
        step: "idle",
        message: "",
      });
    }
  }, []);

  return {
    places,
    loadingState,
    error,
    searchPlaces,
  };
}
