import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LocationInputProps {
  onLocationChange: (location: string) => void;
  currentLocation: string;
}

export function LocationInput({ onLocationChange, currentLocation }: LocationInputProps) {
  const [inputValue, setInputValue] = useState(currentLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationChange(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter city or ZIP code..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 h-11 bg-card border-border"
        />
      </div>
      <Button type="submit" className="h-11 px-5">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}
