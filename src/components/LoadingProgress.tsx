import { Loader2, MapPin, Search, Sparkles, CheckCircle } from "lucide-react";
import { LoadingState } from "@/types/volunteer";

interface LoadingProgressProps {
  loadingState: LoadingState;
}

const steps = [
  { key: "geocoding", label: "Finding location", icon: MapPin },
  { key: "searching", label: "Searching places", icon: Search },
  { key: "processing", label: "Processing results", icon: Sparkles },
];

export function LoadingProgress({ loadingState }: LoadingProgressProps) {
  const currentStepIndex = steps.findIndex(s => s.key === loadingState.step);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.key === loadingState.step;
            const isComplete = index < currentStepIndex;

            return (
              <div key={step.key} className="flex flex-col items-center flex-1">
                <div
                  className={`
                    h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive ? "bg-primary text-primary-foreground scale-110" : ""}
                    ${isComplete ? "bg-primary/20 text-primary" : ""}
                    ${!isActive && !isComplete ? "bg-muted text-muted-foreground" : ""}
                  `}
                >
                  {isComplete ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : isActive ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={`
                    text-xs mt-2 text-center font-medium transition-colors
                    ${isActive ? "text-primary" : "text-muted-foreground"}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        {/* Current Step Message */}
        <p className="text-center text-muted-foreground animate-pulse">
          {loadingState.message}
        </p>
      </div>
    </div>
  );
}
