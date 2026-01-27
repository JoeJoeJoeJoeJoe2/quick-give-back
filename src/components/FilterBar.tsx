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

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
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
          <SelectContent className="bg-popover z-50">
            {causeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-muted-foreground mb-2 block">
          Search Radius: {filters.maxDistance} miles
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
