import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    title: "<ION LAB />",
    subtitle: "Public good network",
  },
  {
    title: "Ready for WEB 5.0?",
    subtitle: "",
    fullTitle: "Decetralised Web of Digital Data Privacy",
    link: "/"
  },
  {
    title: "Privacy as the default",
    subtitle: "",
    fullTitle: "Busy building/accelerating a the web where privacy is the default, not an afterthought.",
    link: "/",
  },
  {
    title: "Product for end users",
    subtitle: "Detail",
    fullTitle: "ZK verified end user products, with intent of making them open source after a while or on spot.",
    link: "/bookdemo",
  },
  {
    title: "Products for merchants",
    subtitle: "",
    fullTitle: "Privacy default APIs for retailers. Help to Start or Gear-up businesses with ready made API.",
    link: "/bookdemo",
  },
  {
    title: "Product for developers",
    subtitle: "Project Detail",
    fullTitle: "Libraries and SDKs with privacy as default feature.",
    link: "/bookdemo",
  },
];

// Typing animation component
const TypeWriter = ({ text, onComplete, speed = 50 }: { text: string; onComplete?: () => void; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayText}</span>;
};

// Letter scramble animation component
const LetterScramble = ({ text, duration = 2000 }: { text: string; duration?: number }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ</>?";

  useEffect(() => {
    if (!isScrambling) return;

    const iterations = 20;
    const interval = duration / iterations;
    let count = 0;

    const scrambleInterval = setInterval(() => {
      count++;
      const progress = count / iterations;
      
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < text.length * progress) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (count >= iterations) {
        clearInterval(scrambleInterval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, interval);

    return () => clearInterval(scrambleInterval);
  }, [text, duration, isScrambling]);

  return <span>{displayText}</span>;
};

interface HeroCarouselProps {
  isVisible: boolean;
  isFirstLoad: boolean;
}

const HeroCarousel = ({ isVisible, isFirstLoad }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideAnimationComplete, setSlideAnimationComplete] = useState(!isFirstLoad);

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setSlideAnimationComplete(false);
    }, 12000);
    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    // Mark animation complete after scramble/type duration
    const timeout = setTimeout(() => {
      setSlideAnimationComplete(true);
    }, isFirstLoad && currentSlide === 0 ? 4000 : 2000);
    
    return () => clearTimeout(timeout);
  }, [currentSlide, isVisible, isFirstLoad]);

  if (!isVisible) return null;

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8 text-center animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center px-8 transition-all duration-1000 ${
              index === currentSlide
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider uppercase mb-6">
              {index === currentSlide && (
                isFirstLoad && index === 0 ? (
                  <LetterScramble text={slide.title} duration={4000} />
                ) : (
                  <TypeWriter text={slide.title} speed={80} />
                )
              )}
            </h1>
            {'fullTitle' in slide && slide.fullTitle && (
              <p className={`text-foreground/85 text-xs md:text-sm tracking-widest mb-4 transition-opacity duration-500 ${
                slideAnimationComplete ? 'opacity-100' : 'opacity-50'
              }`}>
                {slide.fullTitle}
              </p>
            )}
            {'link' in slide && slide.link ? (
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-foreground/90 text-sm md:text-base tracking-widest max-w-xl leading-relaxed transition-opacity duration-500 underline underline-offset-4 hover:text-foreground ${
                  slideAnimationComplete ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {slide.subtitle}
              </a>
            ) : (
              <p className={`text-foreground/70 text-sm md:text-base tracking-widest max-w-xl leading-relaxed transition-opacity duration-500 ${
                slideAnimationComplete ? 'opacity-100' : 'opacity-0'
              }`}>
                {slide.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Core message */}
      <div className="absolute bottom-32 md:bottom-36 text-center px-8">
        <p className="text-[10px] md:text-xs tracking-[0.25em] text-foreground/70 uppercase">
          What if we create the tech we didn't think we would? 
        </p>
      </div>
    </div>
  );
};

export default HeroCarousel;
