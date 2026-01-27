import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { LocationInput } from "@/components/LocationInput";
import { FilterBar } from "@/components/FilterBar";
import { OpportunityList } from "@/components/OpportunityList";
import { mockOpportunities } from "@/data/mockOpportunities";
import { FilterState } from "@/types/volunteer";
import { isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";

const Index = () => {
  const [location, setLocation] = useState("San Francisco, CA");
  const [filters, setFilters] = useState<FilterState>({
    cause: "all",
    maxDistance: 10,
    dateRange: "any",
  });

  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter((opp) => {
      // Filter by cause
      if (filters.cause !== "all" && opp.cause !== filters.cause) {
        return false;
      }

      // Filter by distance
      if (opp.distance > filters.maxDistance) {
        return false;
      }

      // Filter by date
      if (filters.dateRange !== "any") {
        const oppDate = parseISO(opp.date);
        switch (filters.dateRange) {
          case "today":
            if (!isToday(oppDate)) return false;
            break;
          case "this-week":
            if (!isThisWeek(oppDate)) return false;
            break;
          case "this-month":
            if (!isThisMonth(oppDate)) return false;
            break;
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Find Volunteer Opportunities Near You
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover meaningful ways to give back to your community. No sign-up required—just browse and connect.
          </p>
          
          <div className="max-w-xl mx-auto">
            <LocationInput
              currentLocation={location}
              onLocationChange={setLocation}
            />
          </div>
        </section>

        {/* Location Display */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing opportunities near{" "}
            <span className="font-medium text-foreground">{location}</span>
          </p>
        </div>

        {/* Filters */}
        <section className="mb-8">
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </section>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground">
            {filteredOpportunities.length} opportunity
            {filteredOpportunities.length !== 1 ? "ies" : "y"} found
          </p>
        </div>

        {/* Opportunity List */}
        <OpportunityList opportunities={filteredOpportunities} />
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

export default Index;
