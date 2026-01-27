import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { VolunteerPlace } from "@/types/volunteer";
import { CauseBadge } from "./CauseBadge";
import { Button } from "@/components/ui/button";

interface PlaceCardProps {
  place: VolunteerPlace;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CauseBadge cause={place.type} />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
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

      <div className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" className="flex-1 group/btn">
          <a
            href={place.osmUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        </Button>
        <Button asChild className="flex-1 group/btn">
          <a
            href={place.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
            <Navigation className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        </Button>
      </div>
    </article>
  );
}
