import { useEffect, useRef, useState } from "react";
import { useRadio } from "../context/RadioContext";
import flagIcon from "../assets/indian-flag.png";
import vandeMataramClip from "../assets/vande-matram_ZwV0gIk6.mp3";

export function VandeMataramButton() {
  const { playRequested, pause } = useRadio();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // If the main radio starts playing, let this short clip yield to it.
  useEffect(() => {
    if (playRequested && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [playRequested, isPlaying]);

  function handleClick() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    pause();
    setIsPlaying(true);
    try {
      audio.currentTime = 0;
    } catch {
      // media metadata not loaded yet — fine, it'll just play from the start anyway
    }
    audio.play().catch(() => setIsPlaying(false));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isPlaying ? "Pause Vande Mataram clip" : "Play Vande Mataram clip"}
      className="fixed bottom-44 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:bottom-52 sm:right-8"
    >
      {isPlaying && (
        <span className="motion-safe:animate-glow-pulse absolute inset-0 -z-10 rounded-full bg-saffron-bright/60 blur-lg" />
      )}
      <img src={flagIcon} alt="" className="h-7 w-7 object-contain" />
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} preload="auto">
        <source src={vandeMataramClip} type="audio/mpeg" />
      </audio>
    </button>
  );
}
