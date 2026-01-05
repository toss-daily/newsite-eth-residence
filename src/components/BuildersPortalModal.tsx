import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import typingSoundtrack from "@/assets/quick-typing-soundtrack.mp3";
import loadingSoundtrack from "@/assets/loading-access-soundtrack.mp3";

interface BuildersPortalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BuildersPortalModal = ({ open, onOpenChange }: BuildersPortalModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'loading' | 'invalid'>('idle');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();
  
  const typingAudioRef = useRef<HTMLAudioElement>(null);
  const loadingAudioRef = useRef<HTMLAudioElement>(null);
  const isTypingRef = useRef(false);

  // Handle typing sound
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    
    if (typingAudioRef.current) {
      if (!isTypingRef.current) {
        isTypingRef.current = true;
        typingAudioRef.current.currentTime = 0;
        typingAudioRef.current.volume = 0.3;
        typingAudioRef.current.play().catch(() => {});
      }
    }
  };

  // Pause typing sound when not typing
  const handleInputBlur = () => {
    if (typingAudioRef.current) {
      typingAudioRef.current.pause();
      isTypingRef.current = false;
    }
  };

  // Stop typing on key up after delay
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const stopTyping = () => {
      timeout = setTimeout(() => {
        if (typingAudioRef.current) {
          typingAudioRef.current.pause();
          isTypingRef.current = false;
        }
      }, 200);
    };

    window.addEventListener('keyup', stopTyping);
    return () => {
      window.removeEventListener('keyup', stopTyping);
      clearTimeout(timeout);
    };
  }, []);

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
            sessionStorage.setItem("portal_access", "granted");
            onOpenChange(false);
            navigate("/builders-portal");
          }
        }, 100);
      } else {
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

  const renderContent = () => {
    if (verificationState === 'verifying') {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-foreground/10"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-neon-cyan animate-spin-slow"
                strokeDasharray="251.2"
                strokeDashoffset="125.6"
                strokeLinecap="round"
              />
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
          <p className="text-neon-cyan text-lg font-bold tracking-widest uppercase">
            Access Valid
          </p>
          {/* Horizontal Progress Bar */}
          <div className="w-full max-w-xs h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-neon-cyan transition-all duration-100 ease-out rounded-full"
              style={{ width: `${loadingProgress}%`, boxShadow: 'var(--glow-cyan)' }}
            />
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
          <p className="text-destructive text-lg font-bold tracking-widest uppercase">
            AccessKey Invalid!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6 py-4">
        <p className="text-foreground/70 text-sm">
          Enter credentials to access Builder House.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              type="text"
              placeholder="Key name"
              value={username}
              onChange={(e) => handleInputChange(setUsername, e.target.value)}
              onBlur={handleInputBlur}
              className="glass-input pl-10 pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-neon-turquoise animate-pulse" />
            </div>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              type="password"
              placeholder="Access Key"
              value={password}
              onChange={(e) => handleInputChange(setPassword, e.target.value)}
              onBlur={handleInputBlur}
              className="glass-input pl-10 pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            </div>
          </div>
          
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            disabled={!password}
            className="w-full glass-button-primary tracking-widest uppercase"
          >
            Access
          </Button>
        </form>

        <p className="text-xs text-foreground/40 text-center">
          Contact the team for access credentials.
        </p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal border-neon-cyan/20 max-w-md scifi-border">
        {/* Audio elements */}
        <audio ref={typingAudioRef} src={typingSoundtrack} loop />
        <audio ref={loadingAudioRef} src={loadingSoundtrack} />
        
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
