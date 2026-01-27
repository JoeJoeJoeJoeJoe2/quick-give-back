import { VolunteerOpportunity } from "@/types/volunteer";
import { OpportunityCard } from "./OpportunityCard";
import { Heart } from "lucide-react";

interface OpportunityListProps {
  opportunities: VolunteerOpportunity[];
  isLoading?: boolean;
}

export function OpportunityList({ opportunities, isLoading }: OpportunityListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No opportunities found
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your filters or expanding your search area to find more volunteer opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity, index) => (
        <div
          key={opportunity.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <OpportunityCard opportunity={opportunity} />
        </div>
      ))}
    </div>
  );
}
