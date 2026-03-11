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

      {/* Mute/Unmute Toggle Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-background/80 backdrop-blur-md border border-foreground/20 transition-all duration-300 hover:scale-110 hover:bg-background/90 shadow-lg"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-foreground" />
        ) : (
          <Volume2 className="w-5 h-5 text-foreground" />
        )}
      </button>
    </div>
  );
};

export default VideoBackground;
