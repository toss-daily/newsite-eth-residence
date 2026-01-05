import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResidencePage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent">
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
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.15em] uppercase text-foreground">
              Residence v2.0
            </h1>
            <p className="text-foreground/70 text-xs tracking-[0.4em] uppercase">
              Coming Soon
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-6 py-8 border-y border-foreground/10">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed tracking-wide">
              A scaled sanctuary for builders creating technology that serves humanity.
            </p>
            <p className="text-sm text-foreground/60 tracking-wider">
              Infrastructure meets purpose. Community meets innovation.
            </p>
          </div>

          {/* Registration Form - Deactivated */}
          <div className="space-y-6">
            <p className="text-xs tracking-[0.3em] text-foreground/60 uppercase">
              Early Registration
            </p>
            <form className="space-y-4 max-w-md mx-auto">
              <Input
                placeholder="Your name"
                className="glass-input"
                disabled
              />
              <Input
                type="email"
                placeholder="Your email"
                className="glass-input"
                disabled
              />
              <Input
                placeholder="What do you build?"
                className="glass-input"
                disabled
              />
              <Button
                type="button"
                disabled
                className="w-full glass-button opacity-50 cursor-not-allowed"
              >
                Registration Opens Soon
              </Button>
            </form>
            <p className="text-xs text-foreground/50 tracking-wide">
              Registration will open when v2.0 is ready.
            </p>
          </div>

          {/* Back Link */}
          <Link
            to="/"
            className="inline-block text-xs tracking-widest text-foreground/60 hover:text-foreground transition-colors uppercase"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResidencePage;
