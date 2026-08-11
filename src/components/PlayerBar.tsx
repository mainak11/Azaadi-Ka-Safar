import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, Volume1, Volume2, VolumeX } from "lucide-react";
import { useRadio } from "../context/RadioContext";
import { useLanguage } from "../context/LanguageContext";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayerBar() {
  const { currentSong, playRequested, togglePlay, next } = useRadio();
  const { t } = useLanguage();
  const [volume, setVolume] = useState(70);
  const [skipSpin, setSkipSpin] = useState(false);
  const lastLoadedId = useRef<string | null>(null);

  const { isReady, currentTime, duration, loadVideo, play, pause, seekTo, setVolume: setPlayerVolume } =
    useYouTubePlayer("yt-audio-player", next);

  useEffect(() => {
    if (!isReady || !currentSong || !currentSong.youtubeId) return;
    if (lastLoadedId.current !== currentSong.id) {
      lastLoadedId.current = currentSong.id;
      loadVideo(currentSong.youtubeId, playRequested);
    }
  }, [isReady, currentSong, playRequested, loadVideo]);

  useEffect(() => {
    if (!isReady || !currentSong?.youtubeId) return;
    if (lastLoadedId.current !== currentSong.id) return;
    if (playRequested) play();
    else pause();
  }, [playRequested, isReady, currentSong, play, pause]);

  useEffect(() => {
    setPlayerVolume(volume);
  }, [volume, setPlayerVolume]);

  function handleSkip() {
    setSkipSpin(true);
    next();
    window.setTimeout(() => setSkipSpin(false), 500);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    seekTo(Number(e.target.value));
  }

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-6 sm:bottom-6">
      {/* hidden youtube player used as an audio engine for our custom controls */}
      <div id="yt-audio-player" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" />

      <div className="glass-dark mx-auto flex max-w-3xl flex-col gap-2 rounded-[28px] px-4 py-3 shadow-2xl shadow-ink/40 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white/10 sm:h-14 sm:w-14">
            {currentSong?.youtubeId && (
              <img
                src={`https://img.youtube.com/vi/${currentSong.youtubeId}/default.jpg`}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
            {playRequested && (
              <span className="absolute inset-0 rounded-xl ring-2 ring-saffron-bright/70" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-saffron-bright">
              {t("now_playing")} {t("radio_label")}
            </p>
            <p className="truncate font-display text-base font-semibold text-parchment-light sm:text-lg">
              {currentSong ? currentSong.title : "—"}
            </p>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playRequested ? "Pause" : "Play"}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron-bright text-ink shadow transition hover:brightness-110 sm:h-12 sm:w-12"
          >
            {playRequested && (
              <span className="motion-safe:animate-glow-pulse absolute inset-0 -z-10 rounded-full bg-saffron-bright/70 blur-lg" />
            )}
            {playRequested ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip to next"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-parchment-light/80 transition hover:bg-white/10 sm:h-10 sm:w-10"
          >
            <SkipForward size={18} className={skipSpin ? "motion-safe:animate-spin-once" : ""} />
          </button>

          <div className="hidden items-center gap-1.5 sm:flex">
            <VolumeIcon size={16} className="text-parchment-light/70" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 w-20 cursor-pointer accent-saffron-bright"
              aria-label="Volume"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-parchment-light/60">
          <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="h-1 flex-1 cursor-pointer accent-saffron-bright"
            style={{
              background: `linear-gradient(to right, var(--color-saffron-bright) ${progressPct}%, rgba(255,255,255,0.2) ${progressPct}%)`,
            }}
            aria-label="Seek"
          />
          <span className="w-9 tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
