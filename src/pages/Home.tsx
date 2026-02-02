import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Heart, MapPin, Clock, Users, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] animate-float-slow" />
        <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full bg-accent/15 blur-[120px] animate-float-medium" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-primary/15 blur-[80px] animate-float-fast" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating shapes */}
        <div className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-primary/40 animate-float-particle-1" />
        <div className="absolute top-[25%] right-[20%] w-2 h-2 rounded-full bg-accent/50 animate-float-particle-2" />
        <div className="absolute top-[60%] left-[15%] w-2 h-2 rounded-full bg-primary/30 animate-float-particle-3" />
        <div className="absolute bottom-[30%] right-[10%] w-4 h-4 rounded-full bg-primary/25 animate-float-particle-1" />
        <div className="absolute top-[40%] left-[80%] w-2 h-2 rounded-full bg-accent/40 animate-float-particle-2" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/25">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">VolunteerNow</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center">
        <div className="container py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">No sign-up required</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight animate-fade-in">
              Find Ways to{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Give Back</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-primary/20 -skew-x-3 rounded" />
              </span>
              {" "}Near You
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-in">
              Discover meaningful volunteer opportunities in your community. 
              Browse, find, and connect with local organizations making a real difference.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Link to="/search">
                <Button 
                  size="lg" 
                  className="h-14 px-10 text-lg font-semibold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a 
                href="#features" 
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Learn more ↓
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16 animate-fade-in">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">100+</div>
                <div className="text-sm text-muted-foreground mt-1">Organizations</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">Free</div>
                <div className="text-sm text-muted-foreground mt-1">Always</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">0</div>
                <div className="text-sm text-muted-foreground mt-1">Sign-ups needed</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find and connect with volunteer opportunities in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Enter Location</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Type your city or neighborhood to find opportunities nearby
              </p>
            </div>
            
            <div className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Browse & Filter</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore causes that matter to you and filter by category
              </p>
            </div>
            
            <div className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Connect Directly</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reach out to organizations directly — no middleman needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 bg-background/80 backdrop-blur-sm">
        <div className="container text-center text-sm text-muted-foreground">
          <p>VolunteerNow — Find meaningful ways to give back 💚</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
