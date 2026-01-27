import { CauseArea, FilterState } from "@/types/volunteer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const causeOptions: { value: CauseArea | "all"; label: string }[] = [
  { value: "all", label: "All Causes" },
  { value: "environment", label: "🌿 Environment" },
  { value: "education", label: "📚 Education" },
  { value: "health", label: "🏥 Health" },
  { value: "animals", label: "🐾 Animals" },
  { value: "community", label: "🤝 Community" },
  { value: "food", label: "🍎 Food & Hunger" },
];

const dateOptions = [
  { value: "any", label: "Any Date" },
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
];

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 p-4 rounded-xl bg-card border border-border card-shadow">
      <div className="flex-1 min-w-[160px]">
        <Label className="text-sm font-medium text-muted-foreground mb-2 block">
          Cause Area
        </Label>
        <Select
          value={filters.cause}
          onValueChange={(value) =>
            onFilterChange({ ...filters, cause: value as CauseArea | "all" })
          }
        >
          <SelectTrigger className="h-10 bg-background">
            <SelectValue placeholder="Select cause" />
          </SelectTrigger>
          <SelectContent>
            {causeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[160px]">
        <Label className="text-sm font-medium text-muted-foreground mb-2 block">
          Date
        </Label>
        <Select
          value={filters.dateRange}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              dateRange: value as FilterState["dateRange"],
            })
          }
        >
          <SelectTrigger className="h-10 bg-background">
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            {dateOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label className="text-sm font-medium text-muted-foreground mb-2 block">
          Distance: up to {filters.maxDistance} miles
        </Label>
        <Slider
          value={[filters.maxDistance]}
          onValueChange={([value]) =>
            onFilterChange({ ...filters, maxDistance: value })
          }
          max={25}
          min={1}
          step={1}
          className="py-2"
        />
      </div>
    </div>
  );
}
