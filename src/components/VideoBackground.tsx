
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import heroSoundtrack from "@/assets/hero-soundtrack.mp3";

// Export audio ref for external volume control
export let heroAudioRef: HTMLAudioElement | null = null;

const VideoBackground = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      heroAudioRef = audioRef.current;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user interaction needed
      });
    }

    return () => {
      heroAudioRef = null;
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.5;
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {/* Hero Soundtrack */}
      <audio ref={audioRef} src={heroSoundtrack} loop />
      
      {/* Background gradient overlay */}
      <div className="video-overlay" />

      {/* Subtle Mute/Unmute Toggle Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-2.5 rounded-full glass-button transition-all duration-300 hover:scale-110 opacity-90 hover:opacity-100"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-foreground/80" />
        ) : (
          <Volume2 className="w-4 h-4 text-foreground/80" />
        )}
      
        mute
      </button>
    </div>
  );
};

export default VideoBackground;
