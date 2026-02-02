import { MapPin, Navigation } from "lucide-react";
import { VolunteerPlace } from "@/types/volunteer";
import { CauseBadge } from "./CauseBadge";
import { Button } from "@/components/ui/button";

interface PlaceCardProps {
  place: VolunteerPlace;
}

export function PlaceCard({ place }: PlaceCardProps) {
  // Build a proper Google Maps search URL using the place name and address
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(place.name + ", " + place.address)}`;

  return (
    <article className="group flex flex-col rounded-2xl border border-border overflow-hidden bg-card/80 backdrop-blur-sm shadow-apple hover:shadow-apple-hover transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
      
      <div className="p-5 flex-1 relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CauseBadge cause={place.type} />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap px-2 py-1 rounded-full bg-muted/50">
            {place.distance} mi
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {place.name}
        </h3>

        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{place.address}</span>
        </div>
      </div>

      <div className="p-4 pt-0 flex justify-center">
        <Button 
          className="w-full max-w-xs group/btn"
          onClick={() => window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')}
        >
          <Navigation className="h-4 w-4 mr-2 transition-transform group-hover/btn:translate-x-0.5" />
          View on Google Maps
        </Button>
      </div>
    </article>
  );
}
