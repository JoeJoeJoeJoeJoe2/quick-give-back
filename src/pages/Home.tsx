import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Heart, MapPin, Clock, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">VolunteerNow</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Find Volunteer Opportunities Near You
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Discover meaningful ways to give back to your community. 
              No sign-up required—just browse, find, and connect with local organizations making a difference.
            </p>
            
            <Link to="/search">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold">
                Start Now
              </Button>
            </Link>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Location-Based</h3>
                <p className="text-sm text-muted-foreground">Find opportunities near your location</p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Quick Discovery</h3>
                <p className="text-sm text-muted-foreground">Browse and filter in seconds</p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">No Sign-Up</h3>
                <p className="text-sm text-muted-foreground">Connect directly with organizations</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>VolunteerNow — Find meaningful ways to give back 💚</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
