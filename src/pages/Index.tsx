import { useState, useEffect, useRef, useCallback } from "react";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import VideoBackground from "@/components/VideoBackground";
import { heroAudioRef } from "@/components/VideoBackground";
import HeroCarousel from "@/components/HeroCarousel";

// Typing animation for intro
const IntroTypeWriter = ({ text, onComplete, onSoundtrackStart }: { text: string; onComplete: () => void; onSoundtrackStart: () => void }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const soundtrackTriggered = useRef(false);

  const charDelay = 120; // doubled from 60
  const remainingTime = (text.length - currentIndex) * charDelay;

  useEffect(() => {
    if (!soundtrackTriggered.current && remainingTime <= 1500 && currentIndex > 0) {
      soundtrackTriggered.current = true;
      onSoundtrackStart();
    }
  }, [remainingTime, currentIndex, onSoundtrackStart]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, charDelay);
      return () => clearTimeout(timeout);
    } else {
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(completeTimeout);
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = () => {
    setIntroFading(true);
    setTimeout(() => {
      setShowIntro(false);
      setShowContent(true);
    }, 500);
  };

  const handleSoundtrackStart = useCallback(() => {
    if (heroAudioRef) {
      heroAudioRef.volume = 0.5;
      heroAudioRef.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-background">
      <VideoBackground />
      
      {/* Intro Animation */}
      {showIntro && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
          introFading ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="max-w-3xl px-8 text-center">
            <p className="text-xs md:text-sm tracking-[0.3em] text-foreground/90 uppercase leading-relaxed">
              <IntroTypeWriter 
                text="WHAT IF WE CREATE THE TECH WE DIDN'T THINK WE WOULD?  " 
                onComplete={handleIntroComplete}
                onSoundtrackStart={handleSoundtrackStart}
              />
            </p>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className={`transition-opacity duration-990 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <TopNav />
        <HeroCarousel isVisible={showContent} isFirstLoad={true} />
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
