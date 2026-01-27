import { MapPin, Navigation } from "lucide-react";
import { VolunteerPlace } from "@/types/volunteer";
import { CauseBadge } from "./CauseBadge";
import { Button } from "@/components/ui/button";

interface PlaceCardGoogleProps {
  place: VolunteerPlace;
}

function buildGoogleMapsUrl(place: VolunteerPlace) {
  // Prefer coordinates (most reliable), fall back to a query string.
  if (Number.isFinite(place.lat) && Number.isFinite(place.lon)) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${place.lat},${place.lon}`,
    )}`;
  }

  return `https://www.google.com/maps/search/${encodeURIComponent(
    `${place.name}, ${place.address}`,
  )}`;
}

function openExternal(url: string) {
  // Lovable preview runs inside an iframe; Google refuses to load in iframes.
  // Try a real new tab first; if popups are blocked, fall back to top-level navigation.
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (opened) return;

  try {
    window.top?.location.assign(url);
  } catch {
    // Last resort (may still be blocked in an iframe, but avoids hard crashes)
    window.location.assign(url);
  }
}

export function PlaceCardGoogle({ place }: PlaceCardGoogleProps) {
  const googleMapsUrl = buildGoogleMapsUrl(place);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
      {/* translucent gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/40 to-accent/10 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CauseBadge cause={place.type} />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap px-2 py-1 rounded-full bg-background/60">
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

      <div className="relative p-4 pt-0 flex justify-center">
        <Button
          type="button"
          className="w-full max-w-xs justify-center group/btn"
          onClick={() => openExternal(googleMapsUrl)}
        >
          <Navigation className="h-4 w-4 mr-2 transition-transform group-hover/btn:translate-x-0.5" />
          View on Google Maps
        </Button>
      </div>
    </article>
  );
}
