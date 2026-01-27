import { CauseArea } from "@/types/volunteer";
import { cn } from "@/lib/utils";

interface CauseBadgeProps {
  cause: CauseArea;
  className?: string;
}

const causeConfig: Record<CauseArea, { label: string; emoji: string; className: string }> = {
  environment: {
    label: "Environment",
    emoji: "🌿",
    className: "bg-cause-environment/15 text-cause-environment border-cause-environment/30",
  },
  education: {
    label: "Education",
    emoji: "📚",
    className: "bg-cause-education/15 text-cause-education border-cause-education/30",
  },
  health: {
    label: "Health",
    emoji: "🏥",
    className: "bg-cause-health/15 text-cause-health border-cause-health/30",
  },
  animals: {
    label: "Animals",
    emoji: "🐾",
    className: "bg-cause-animals/15 text-cause-animals border-cause-animals/30",
  },
  community: {
    label: "Community",
    emoji: "🤝",
    className: "bg-cause-community/15 text-cause-community border-cause-community/30",
  },
  food: {
    label: "Food & Hunger",
    emoji: "🍎",
    className: "bg-cause-food/15 text-cause-food border-cause-food/30",
  },
};

export function CauseBadge({ cause, className }: CauseBadgeProps) {
  const config = causeConfig[cause];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}
