import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Users, Calendar, FileText, ArrowRight } from "lucide-react";

const portalSections = [
  {
    icon: Users,
    title: "Community",
    description: "Connect with fellow builders",
    color: "neon-cyan",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Upcoming sessions & meetups",
    color: "neon-gold",
  },
  {
    icon: FileText,
    title: "Resources",
    description: "Documentation & guides",
    color: "neon-turquoise",
  },
  {
    icon: Shield,
    title: "Projects",
    description: "Current initiatives",
    color: "neon-cream",
  },
];

const BuildersPortalPage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has access
    const access = sessionStorage.getItem("portal_access");
    if (access !== "granted") {
      navigate("/");
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'pulse 4s ease-in-out infinite',
        }} />
      </div>

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass-nav">
        <Link to="/" className="text-foreground">
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.5em] uppercase">
              ETH · IOPIA
            </span>
            <span className="text-[8px] tracking-[0.35em] uppercase text-foreground/70">
              Builders Residence
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-neon-cyan">
          <Shield className="w-4 h-4" />
          <span className="text-xs tracking-widest uppercase">Portal Access</span>
        </div>
      </nav>

      {/* Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase text-foreground mb-4">
            Builders Portal
          </h1>
          <p className="text-sm text-foreground/60 tracking-wider">
            Welcome to the inner circle.
          </p>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {portalSections.map((section, index) => (
            <button
              key={section.title}
              className="group p-8 glass-card rounded-xl text-left transition-all duration-500 hover:scale-[1.02] hover:bg-foreground/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${section.color}/10`}>
                  <section.icon className={`w-6 h-6 text-${section.color}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-foreground/70 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-bold tracking-wider uppercase text-foreground/90 mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-foreground/50">
                {section.description}
              </p>
            </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="mt-16 flex items-center gap-4 glass-card px-6 py-3 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs text-foreground/60 tracking-wider">System Online</span>
          </div>
          <div className="w-px h-4 bg-foreground/20" />
          <span className="text-xs text-foreground/40">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Back Link */}
        <Link
          to="/"
          onClick={() => sessionStorage.removeItem("portal_access")}
          className="mt-8 text-xs tracking-widest text-foreground/50 hover:text-foreground transition-colors uppercase"
        >
          ← Exit Portal
        </Link>
      </div>
    </div>
  );
};

export default BuildersPortalPage;
