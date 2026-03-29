import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, Github } from "lucide-react";

import loadingSoundtrack from "@/assets/loading-access-soundtrack.mp3";
import { heroAudioRef } from "@/components/VideoBackground";

interface BuildersPortalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Project {
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  category: string;
}

const projects: Project[] = [
  { title: "Decentralized Identity", description: "A self-sovereign identity layer built on Ethereum for seamless authentication.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop", githubUrl: "https://github.com", category: "Identity" },
  { title: "ZK Proof Engine", description: "Zero-knowledge proof toolkit for privacy-preserving computations on-chain.", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop", category: "Privacy" },
  { title: "DAO Governance", description: "Modular governance framework enabling transparent community decision-making.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", githubUrl: "https://github.com", category: "Governance" },
  { title: "NFT Marketplace", description: "A curated marketplace for digital art and collectibles with royalty enforcement.", image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=600&h=400&fit=crop", category: "NFTs" },
  { title: "DeFi Yield Aggregator", description: "Automated yield optimization across multiple DeFi protocols.", image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop", githubUrl: "https://github.com", category: "DeFi" },
  { title: "Cross-Chain Bridge", description: "Trustless bridge enabling asset transfers between EVM-compatible chains.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop", category: "Infrastructure" },
  { title: "Smart Contract Auditor", description: "AI-assisted static analysis tool for detecting smart contract vulnerabilities.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop", githubUrl: "https://github.com", category: "Security" },
  { title: "On-Chain Analytics", description: "Real-time blockchain data dashboard with customizable metrics and alerts.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", category: "Analytics" },
  { title: "Token Launchpad", description: "Fair-launch platform with built-in vesting schedules and anti-bot protection.", image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=600&h=400&fit=crop", githubUrl: "https://github.com", category: "DeFi" },
];

const portalCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const BuildersPortalModal = ({ open, onOpenChange }: BuildersPortalModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'loading' | 'invalid' | 'authenticated'>('idle');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [notAvailableOpen, setNotAvailableOpen] = useState(false);
  
  const loadingAudioRef = useRef<HTMLAudioElement>(null);

  // Lower hero soundtrack volume when modal opens, restore when it closes
  useEffect(() => {
    if (open) {
      if (heroAudioRef) {
        heroAudioRef.volume = 0.15;
      }
    } else {
      if (heroAudioRef) {
        heroAudioRef.volume = 0.5;
      }
    }
  }, [open]);

  // Handle typing sound and mute hero volume fully
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
  };


  const logAccessAttempt = (attemptUsername: string, status: 'granted' | 'denied') => {
    const entry = {
      timestamp: new Date().toISOString(),
      username: attemptUsername,
      status,
    };
    const existing = JSON.parse(localStorage.getItem('builderhouse_access_log') || '[]');
    existing.push(entry);
    localStorage.setItem('builderhouse_access_log', JSON.stringify(existing));
    console.log(`[Builder House] Access ${status}:`, entry);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setVerificationState('verifying');
    
    // Play loading soundtrack
    if (loadingAudioRef.current) {
      loadingAudioRef.current.currentTime = 0;
      loadingAudioRef.current.volume = 0.4;
      loadingAudioRef.current.play().catch(() => {});
    }

    // Verifying animation for 2 seconds
    setTimeout(() => {
      if (password === "builders2025") {
        logAccessAttempt(username, 'granted');
        setVerificationState('loading');
        
        // Loading progress animation for 3 seconds
        let progress = 0;
        const interval = setInterval(() => {
          progress += 3.33;
          setLoadingProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            if (loadingAudioRef.current) {
              loadingAudioRef.current.pause();
            }
            setVerificationState('authenticated');
          }
        }, 100);
      } else {
        logAccessAttempt(username, 'denied');
        setVerificationState('invalid');
        if (loadingAudioRef.current) {
          loadingAudioRef.current.pause();
        }
        setTimeout(() => {
          setVerificationState('idle');
        }, 2000);
      }
    }, 2000);
  };

  const handleGithubClick = (project: Project) => {
    if (project.githubUrl) {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    } else {
      setNotAvailableOpen(true);
    }
  };

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const renderContent = () => {
    if (verificationState === 'authenticated') {
      return (
        <div className="space-y-6">
          <h2 className="text-lg font-bold tracking-[0.2em] uppercase text-foreground text-center">
            Projects
          </h2>
          <p className="text-muted-foreground text-center text-xs tracking-widest uppercase">
            Explore what our builders are creating
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {portalCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border rounded-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-[hsl(var(--neon-cyan))] text-[hsl(var(--neon-cyan))] bg-[hsl(var(--neon-cyan))/0.08]"
                    : "border-border text-muted-foreground hover:border-[hsl(var(--neon-cyan))/0.4] hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[58vh] overflow-y-auto pr-2">
            {filtered.map((project) => (
              <div
                key={project.title}
                className="group rounded-sm border border-border bg-card overflow-hidden transition-all duration-300 hover:border-[hsl(var(--neon-cyan))/0.5]"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground">
                      {project.title}
                    </h3>
                    <button
                      onClick={() => handleGithubClick(project)}
                      className="shrink-0 p-1 rounded-sm border border-border text-muted-foreground hover:text-foreground hover:border-[hsl(var(--neon-cyan))] transition-colors duration-300"
                      title="View on GitHub"
                    >
                      <Github size={14} />
                    </button>
                  </div>
                  <span className="inline-block text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--neon-gold))] mb-1">
                    {project.category}
                  </span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Not Available Dialog */}
          {notAvailableOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60" onClick={() => setNotAvailableOpen(false)}>
              <div className="bg-card border border-border text-foreground max-w-sm p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <h3 className="tracking-widest uppercase text-sm font-semibold mb-2">Not Available</h3>
                <p className="text-muted-foreground text-xs tracking-wide">This repository is not open at the moment.</p>
                <button onClick={() => setNotAvailableOpen(false)} className="mt-4 text-xs text-foreground/60 hover:text-foreground tracking-widest uppercase">Close</button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (verificationState === 'verifying') {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="none" className="text-foreground/10" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="none" className="text-neon-cyan animate-spin-slow" strokeDasharray="251.2" strokeDashoffset="125.6" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-8 h-8 text-neon-cyan" />
            </div>
          </div>
          <p className="text-foreground/80 text-sm tracking-widest uppercase">
            Verifying<span className="animate-pulse">...</span>
          </p>
        </div>
      );
    }

    if (verificationState === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <p className="text-neon-cyan text-lg font-bold tracking-widest uppercase">Access Valid</p>
          <div className="w-full max-w-xs h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan transition-all duration-100 ease-out rounded-full" style={{ width: `${loadingProgress}%`, boxShadow: 'var(--glow-cyan)' }} />
          </div>
          <p className="text-foreground/80 text-sm tracking-widest uppercase">
            Loading access<span className="animate-pulse">...</span>
          </p>
        </div>
      );
    }

    if (verificationState === 'invalid') {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="w-24 h-24 rounded-full border-4 border-destructive flex items-center justify-center">
            <Lock className="w-8 h-8 text-destructive" />
          </div>
          <p className="text-destructive text-lg font-bold tracking-widest uppercase">AccessKey Invalid!</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 py-4">
        <p className="text-foreground/70 text-sm">Enter credentials to access Builder House.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input type="text" placeholder="Username" value={username} onChange={(e) => handleInputChange(setUsername, e.target.value)} className="glass-input pl-10 pr-10" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-neon-turquoise animate-pulse" /></div>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input type="password" placeholder="Access Key" value={password} onChange={(e) => handleInputChange(setPassword, e.target.value)} className="glass-input pl-10 pr-10" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" /></div>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" disabled={!password} className="w-full glass-button-primary tracking-widest uppercase">Access</Button>
        </form>
        <p className="text-xs text-foreground/40 text-center">Contact the team for access credentials.</p>
      </div>
    );
  };

  const isAuthenticated = verificationState === 'authenticated';

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) {
        setVerificationState('idle');
        setUsername('');
        setPassword('');
        setLoadingProgress(0);
        setActiveCategory('All');
      }
      onOpenChange(val);
    }}>
      <DialogContent className={`glass-modal border-foreground/10 pb-2 ${isAuthenticated ? 'w-[96%] max-w-none h-[95vh] max-h-[95vh] overflow-y-auto' : 'w-[96%] max-w-md'}`}>
        <audio ref={loadingAudioRef} src={loadingSoundtrack} preload="auto" />
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-widest uppercase text-foreground flex items-center gap-3">
            <Lock className="w-5 h-5 text-neon-cyan" />
            Builder House
          </DialogTitle>
        </DialogHeader>
        
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default BuildersPortalModal;