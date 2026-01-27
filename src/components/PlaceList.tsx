import { VolunteerPlace, LoadingState } from "@/types/volunteer";
import { PlaceCardGoogle } from "./PlaceCardGoogle";
import { LoadingProgress } from "./LoadingProgress";
import { Heart, AlertCircle } from "lucide-react";

interface PlaceListProps {
  places: VolunteerPlace[];
  loadingState: LoadingState;
  error: string | null;
}

export function PlaceList({ places, loadingState, error }: PlaceListProps) {
  if (loadingState.isLoading) {
    return <LoadingProgress loadingState={loadingState} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Something went wrong
        </h3>
        <p className="text-muted-foreground max-w-sm">
          {error}
        </p>
      </div>
    );
  }

  if (places.length === 0 && loadingState.step === "complete") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No opportunities found
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Try expanding your search radius or searching a different location.
        </p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Search for opportunities
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Enter a location above to find volunteer opportunities near you.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place, index) => (
        <div
          key={place.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PlaceCardGoogle place={place} />
        </div>
      ))}
    </div>
  );
}
