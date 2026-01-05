import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import journeySoundtrack from "@/assets/journey-soundtrack.mp3";

const timelineEvents = [
  {
    year: "2019 Q4",
    title: "The Lightbulb",
    description: "Tech as facilitator for human good. Many aspects and details, but followed the trail of immediate realities.",
  },
  {
    year: "2023 Q1",
    title: "The Leap",
    description: "Someone dropped a high-paying remote job in Finland. Met Aya and Vitalik and received their encouragement. After the job, concentrated on putting bricks up one at a time.",
  },
  {
    year: "2024 Q1",
    title: "First Grant",
    description: "Received small grant from EF for 1 year execution of the partial application Xerxis — the simplest version, the educational community.",
  },
  {
    year: "2024 Q2",
    title: "Full Commitment",
    description: "Someone needed to drop another good remote job in Europe to focus on this mission entirely.",
  },
  {
    year: "2025 Q1",
    title: "The Bigger Event",
    description: "Builder Residency, Hackathon & Conference. Small grant from EF for conference and hackathon. Multiple partners for the Builder Residence.",
  },
  {
    year: "2026 Q?",
    title: "V2.0",
    description: "Coming Soon.",
  },
];

// Placeholder images for carousel
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200", alt: "Team collaboration" },
  { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200", alt: "Conference" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200", alt: "Event" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200", alt: "Workshop" },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200", alt: "Presentation" },
];

const HistoryPage = () => {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward');
  const timelineRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);

  // Play journey soundtrack on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user interaction needed
      });
    }
  }, []);

  // Timeline animation - slower to match event timing
  useEffect(() => {
    const eventDuration = 1200; // ms per event
    const totalDuration = eventDuration * timelineEvents.length;
    const intervalTime = 100;
    const increment = (100 / (totalDuration / intervalTime));

    const lineInterval = setInterval(() => {
      setLineProgress(prev => {
        if (prev >= 100) {
          clearInterval(lineInterval);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    // Animate events appearing one by one - same speed as line
    timelineEvents.forEach((_, index) => {
      setTimeout(() => {
        setVisibleEvents(prev => [...prev, index]);
      }, index * eventDuration);
    });

    return () => clearInterval(lineInterval);
  }, []);

  // Auto-scroll timeline horizontally back and forth (1.5 minute loop = 90 seconds)
  useEffect(() => {
    if (!timelineRef.current) return;

    const container = timelineRef.current;
    const scrollDuration = 45000; // 45 seconds each direction
    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (scrollDirection === 'forward') {
        const progress = Math.min(elapsed / scrollDuration, 1);
        container.scrollLeft = progress * maxScroll;
        
        if (progress >= 1) {
          setScrollDirection('backward');
          startTime = null;
        }
      } else {
        const progress = Math.min(elapsed / scrollDuration, 1);
        container.scrollLeft = maxScroll - (progress * maxScroll);
        
        if (progress >= 1) {
          setScrollDirection('forward');
          startTime = null;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start auto-scroll after timeline animation completes
    const startDelay = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, timelineEvents.length * 1200 + 1000);

    return () => {
      clearTimeout(startDelay);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [scrollDirection]);

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const scrollToGallery = () => {
    gallerySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Journey Soundtrack */}
      <audio ref={audioRef} src={journeySoundtrack} loop />

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

      {/* Timeline Section - Full Screen */}
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase text-neon-cyan mb-4">
            History
          </h1>
          <p className="text-sm text-foreground/70">
            From spark to scale.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="w-full max-w-7xl overflow-x-auto pb-8 scrollbar-hide" ref={timelineRef}>
          <div className="relative min-w-max px-8">
            {/* Animated line */}
            <div className="absolute top-[52px] left-8 right-8 h-[2px] bg-border">
              <div 
                className="h-full bg-neon-cyan transition-all ease-out"
                style={{ width: `${lineProgress}%`, transitionDuration: '100ms' }}
              />
            </div>

            <div className="flex items-start gap-0">
              {timelineEvents.map((event, index) => (
                <div 
                  key={event.year} 
                  className={`flex flex-col items-center w-56 transition-all duration-700 ${
                    visibleEvents.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Year */}
                  <span className="text-lg font-bold text-neon-cyan mb-4 tracking-wider">
                    {event.year}
                  </span>
                  
                  {/* Dot */}
                  <div className={`w-3 h-3 rounded-full bg-neon-cyan mb-4 transition-all duration-500 ${
                    visibleEvents.includes(index) ? 'scale-100' : 'scale-0'
                  }`} 
                  style={{ boxShadow: visibleEvents.includes(index) ? 'var(--glow-cyan)' : 'none' }}
                  />
                  
                  {/* Content */}
                  <div className="text-center px-4">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-foreground/90 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll to Gallery Arrow */}
        <button
          onClick={scrollToGallery}
          className="mt-12 flex flex-col items-center gap-2 text-foreground/70 hover:text-foreground transition-colors group"
          aria-label="Scroll to Gallery"
        >
          <ChevronDown className="w-8 h-8 animate-bounce group-hover:text-neon-cyan transition-colors" />
        </button>
      </div>

      {/* Gallery Section - Full Screen */}
      <div ref={gallerySectionRef} className="min-h-screen flex flex-col items-center justify-center px-8 py-24 bg-secondary/30">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-foreground/90 mb-4">
            Gallery
          </h2>
          <p className="text-sm text-foreground/60">
            Moments from our journey.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative w-full max-w-5xl aspect-video">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  index === currentImage 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-button rounded-full hover:scale-110 transition-transform"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-foreground/80" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-button rounded-full hover:scale-110 transition-transform"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-foreground/80" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImage ? 'bg-foreground w-6' : 'bg-foreground/40'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
