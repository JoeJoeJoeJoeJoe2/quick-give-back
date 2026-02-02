import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <AnimatedBackground />
      
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-7xl font-bold text-foreground">404</h1>
          <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
          <Link to="/">
            <Button size="lg" className="shadow-apple hover:shadow-apple-hover transition-all">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
