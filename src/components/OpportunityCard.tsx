import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { VolunteerOpportunity } from "@/types/volunteer";
import { CauseBadge } from "./CauseBadge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";

interface OpportunityCardProps {
  opportunity: VolunteerOpportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const formattedDate = format(parseISO(opportunity.date), "EEE, MMM d");

  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CauseBadge cause={opportunity.cause} />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {opportunity.distance} mi
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {opportunity.organization}
        </p>

        <p className="text-sm text-secondary-foreground mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>
              {formattedDate} at {opportunity.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{opportunity.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" />
            <span>{opportunity.spotsLeft} spots left</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Button asChild className="w-full group/btn">
          <a
            href={opportunity.signupUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign Up
            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        </Button>
      </div>
    </article>
  );
}
