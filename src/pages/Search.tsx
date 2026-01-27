import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { LocationInput } from "@/components/LocationInput";
import { FilterBar } from "@/components/FilterBar";
import { PlaceList } from "@/components/PlaceList";
import { useVolunteerPlaces } from "@/hooks/useVolunteerPlaces";
import { FilterState } from "@/types/volunteer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const Search = () => {
  const [location, setLocation] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    cause: "all",
    maxDistance: 10,
  });

  const { places, loadingState, error, searchPlaces } = useVolunteerPlaces();

  // Trigger search when location changes
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    searchPlaces(newLocation, filters.maxDistance);
  };

  // Re-search when radius changes (if we have a location)
  useEffect(() => {
    if (location && loadingState.step === "complete") {
      searchPlaces(location, filters.maxDistance);
    }
  }, [filters.maxDistance]);

  // Filter places by cause area
  const filteredPlaces = useMemo(() => {
    if (filters.cause === "all") return places;
    return places.filter((place) => place.type === filters.cause);
  }, [places, filters.cause]);

  const isInitial = !location && !loadingState.isLoading && places.length === 0 && !error;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container py-8 flex-1 flex flex-col">
        {/* Search + Filters */}
        <section className={isInitial ? "flex-1 flex items-center justify-center" : "mb-8"}>
          <div className="w-full max-w-2xl">
            <h1 className={isInitial ? "text-3xl font-bold text-foreground mb-6 text-center" : "text-2xl font-bold text-foreground mb-4"}>
              Search Volunteer Opportunities
            </h1>

            <div className={isInitial ? "mx-auto" : ""}>
              <LocationInput
                currentLocation={location}
                onLocationChange={handleLocationChange}
              />
            </div>

            <div className="mt-4 flex items-center justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFiltersOpen((v) => !v)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {filtersOpen && (
              <div className="mt-4">
                <FilterBar filters={filters} onFilterChange={setFilters} />
              </div>
            )}

            {isInitial && (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Enter a city or ZIP code to discover nearby places where you can volunteer.
              </p>
            )}
          </div>
        </section>

        {/* Location Display */}
        {!isInitial && location && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing opportunities near{" "}
              <span className="font-medium text-foreground">{location}</span>
            </p>
          </div>
        )}

        {/* Results Count */}
        {!loadingState.isLoading && places.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground">
              {filteredPlaces.length} opportunit
              {filteredPlaces.length !== 1 ? "ies" : "y"} found
            </p>
          </div>
        )}

        {/* Place List */}
        {!isInitial && (
          <PlaceList
            places={filteredPlaces}
            loadingState={loadingState}
            error={error}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>VolunteerNow — Find meaningful ways to give back 💚</p>
        </div>
      </footer>
    </div>
  );
};

export default Search;
