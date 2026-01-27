import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { LocationInput } from "@/components/LocationInput";
import { FilterBar } from "@/components/FilterBar";
import { PlaceList } from "@/components/PlaceList";
import { useVolunteerPlaces } from "@/hooks/useVolunteerPlaces";
import { FilterState } from "@/types/volunteer";

const Search = () => {
  const [location, setLocation] = useState("");
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Search Section */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Search Volunteer Opportunities
          </h1>
          <div className="max-w-xl">
            <LocationInput
              currentLocation={location}
              onLocationChange={handleLocationChange}
            />
          </div>
        </section>

        {/* Location Display */}
        {location && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing opportunities near{" "}
              <span className="font-medium text-foreground">{location}</span>
            </p>
          </div>
        )}

        {/* Filters */}
        <section className="mb-8">
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </section>

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
        <PlaceList 
          places={filteredPlaces} 
          loadingState={loadingState}
          error={error}
        />
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
