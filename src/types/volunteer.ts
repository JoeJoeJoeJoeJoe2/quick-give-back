export type CauseArea = 
  | "environment"
  | "education"
  | "health"
  | "animals"
  | "community"
  | "food";

export interface VolunteerPlace {
  id: string;
  name: string;
  type: CauseArea;
  address: string;
  lat: number;
  lon: number;
  distance: number;
  osmUrl: string;
  googleMapsUrl: string;
  tags?: Record<string, string>;
}

export interface FilterState {
  cause: CauseArea | "all";
  maxDistance: number;
}

export interface LoadingState {
  isLoading: boolean;
  step: "idle" | "geocoding" | "searching" | "processing" | "complete";
  message: string;
}
