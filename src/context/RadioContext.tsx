import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { RotationId, Song } from "../types";
import { songsByRotation } from "../data/songs";

interface RadioContextValue {
  activeRotation: RotationId;
  setActiveRotation: (id: RotationId) => void;
  songs: Song[];
  currentSong: Song | null;
  currentIndex: number;
  selectSong: (song: Song) => void;
  playRequested: boolean;
  togglePlay: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  listenerCount: number;
}

const RadioContext = createContext<RadioContextValue | null>(null);

// Base + gentle daily/random drift so the number feels alive without a real backend.
function nextListenerCount(prev: number) {
  const drift = Math.floor(Math.random() * 9) - 4;
  const next = prev + drift;
  return Math.min(2400, Math.max(600, next));
}

export function RadioProvider({ children }: { children: ReactNode }) {
  const [activeRotation, setActiveRotation] = useState<RotationId>("border-josh");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playRequested, setPlayRequested] = useState(false);
  const [listenerCount, setListenerCount] = useState(1204);
  const hasSelectedRef = useRef(false);

  const songs = useMemo(() => songsByRotation(activeRotation), [activeRotation]);
  const currentSong = songs[currentIndex] ?? null;

  useEffect(() => {
    setCurrentIndex(0);
    hasSelectedRef.current = false;
  }, [activeRotation]);

  useEffect(() => {
    const id = setInterval(() => {
      setListenerCount((c) => nextListenerCount(c));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  function selectSong(song: Song) {
    const idx = songs.findIndex((s) => s.id === song.id);
    if (idx === -1) return;
    hasSelectedRef.current = true;
    setCurrentIndex(idx);
    setPlayRequested(true);
  }

  function togglePlay() {
    hasSelectedRef.current = true;
    setPlayRequested((p) => !p);
  }

  function pause() {
    setPlayRequested(false);
  }

  function next() {
    if (songs.length === 0) return;
    hasSelectedRef.current = true;
    setCurrentIndex((i) => (i + 1) % songs.length);
    setPlayRequested(true);
  }

  function prev() {
    if (songs.length === 0) return;
    hasSelectedRef.current = true;
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
    setPlayRequested(true);
  }

  const value: RadioContextValue = {
    activeRotation,
    setActiveRotation,
    songs,
    currentSong,
    currentIndex,
    selectSong,
    playRequested,
    togglePlay,
    pause,
    next,
    prev,
    listenerCount,
  };

  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
}

export function useRadio() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("useRadio must be used within RadioProvider");
  return ctx;
}
