import { useEffect, useRef, useState, useCallback } from "react";

// Minimal shape of the YouTube IFrame Player API we rely on.
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(id: string): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  destroy(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: () => void;
            onStateChange?: (e: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoadPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiLoadPromise;
}

export function useYouTubePlayer(containerId: string, onEnded?: () => void) {
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;

  const playerRef = useRef<YTPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled) return;
      const el = document.getElementById(containerId);
      if (!el) return;

      playerRef.current = new window.YT.Player(el, {
        videoId: "",
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (e) => {
            const YTState = window.YT.PlayerState;
            setIsPlaying(e.data === YTState.PLAYING);
            if (e.data === YTState.PLAYING) {
              setDuration(playerRef.current?.getDuration() ?? 0);
            }
            if (e.data === YTState.ENDED) {
              onEndedRef.current?.();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId]);

  useEffect(() => {
    function tick() {
      if (playerRef.current && isReady) {
        setCurrentTime(playerRef.current.getCurrentTime() || 0);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady]);

  const loadVideo = useCallback((videoId: string, autoplay = true) => {
    if (!playerRef.current) return;
    playerRef.current.loadVideoById(videoId);
    if (!autoplay) playerRef.current.pauseVideo();
    setCurrentTime(0);
  }, []);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const seekTo = useCallback((seconds: number) => playerRef.current?.seekTo(seconds, true), []);
  const setVolume = useCallback((v: number) => playerRef.current?.setVolume(v), []);

  return { isReady, isPlaying, currentTime, duration, loadVideo, play, pause, seekTo, setVolume };
}
