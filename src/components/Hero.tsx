import { Music2, Video } from "lucide-react";
import { useRadio } from "../context/RadioContext";
import { useLanguage } from "../context/LanguageContext";
import { TitleBlock } from "./TitleBlock";
import { LanguageToggle } from "./LanguageToggle";

const SPOTIFY_URL = "https://open.spotify.com/search/desh%20bhakti%20hindi";
const YT_MUSIC_URL = "https://music.youtube.com/search?q=desh+bhakti+hindi+patriotic";

// The artwork itself lives in <FixedBackground>, pinned to the viewport so it
// stays put while the page scrolls. This header is a transparent spacer that
// carries the nav and title overlay in normal document flow above it.
export function Hero() {
  const { listenerCount } = useRadio();
  const { t } = useLanguage();

  return (
    <header className="relative flex min-h-[54vh] max-h-[480px] flex-col sm:min-h-[70vh] sm:max-h-[640px] md:min-h-[85vh] md:max-h-[800px]">
      <nav className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <div className="glass-light flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-ink-soft shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="motion-safe:animate-pulse-slow absolute inline-flex h-full w-full rounded-full bg-saffron-bright opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-saffron-bright" />
          </span>
          <span className="font-medium">{t("online")}</span>
          <span className="text-ink-soft/60">·</span>
          <span>
            {listenerCount.toLocaleString("en-IN")} {t("live_tuning")}
          </span>
        </div>

        <div className="hidden items-center gap-6 font-display text-lg font-semibold tracking-wide text-ink-soft md:flex">
          <a href="#rotations" className="hover:text-saffron">
            {t("nav_rotations")}
          </a>
          <a href="#songs" className="hover:text-saffron">
            {t("nav_songs")}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#1DB954] px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Music2 size={16} /> Spotify
          </a>
          <a
            href={YT_MUSIC_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#FF0000] px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Video size={16} /> YT Music
          </a>
        </div>
      </nav>

      <div className="flex flex-1 items-center px-5 pb-16 sm:px-8">
        <TitleBlock />
      </div>
    </header>
  );
}
