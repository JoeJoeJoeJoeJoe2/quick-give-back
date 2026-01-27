export type CauseArea = 
  | "environment"
  | "education"
  | "health"
  | "animals"
  | "community"
  | "food";

export interface VolunteerOpportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  cause: CauseArea;
  date: string;
  time: string;
  duration: string;
  location: string;
  distance: number;
  spotsLeft: number;
  signupUrl: string;
  imageUrl?: string;
}

export interface FilterState {
  cause: CauseArea | "all";
  maxDistance: number;
  dateRange: "any" | "today" | "this-week" | "this-month";
}
