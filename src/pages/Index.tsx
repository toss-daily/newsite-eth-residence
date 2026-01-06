import { useState, useEffect } from "react";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import VideoBackground from "@/components/VideoBackground";
import HeroCarousel from "@/components/HeroCarousel";

// Typing animation for intro
const IntroTypeWriter = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else {
      // Wait a moment after typing completes
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
                text="WHAT IF WE CREATE TECH WE DIDN'T THINK WE WOULD " 
                onComplete={handleIntroComplete}
              />
            </p>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <TopNav />
        <HeroCarousel isVisible={showContent} isFirstLoad={true} />
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
