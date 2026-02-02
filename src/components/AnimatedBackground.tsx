export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[100px] animate-float-slow" />
      <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-float-medium" />
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px] animate-float-fast" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-primary/30 animate-float-particle-1" />
      <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 rounded-full bg-accent/40 animate-float-particle-2" />
      <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 rounded-full bg-primary/25 animate-float-particle-3" />
      <div className="absolute bottom-[30%] right-[10%] w-3 h-3 rounded-full bg-primary/20 animate-float-particle-1" />
      <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-float-particle-2" />
    </div>
  );
}
