import { useState, useCallback } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

export function useLocationSearch() {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const proxyUrl = `${SUPABASE_URL}/functions/v1/geo-proxy?service=nominatim&q=${encodeURIComponent(query)}&limit=5`;

      const response = await fetch(proxyUrl, {
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });

      if (response.ok) {
        const result: LocationSuggestion[] = await response.json();
        setSuggestions(result);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    searchLocations,
    clearSuggestions,
  };
}
