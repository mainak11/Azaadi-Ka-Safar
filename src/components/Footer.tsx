import { Music2, Video } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brown-500/20 bg-parchment/70 px-5 pb-36 pt-10 backdrop-blur-sm sm:px-8 sm:pb-40">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h3 className="font-display text-lg font-bold text-ink-soft">{t("rights_title")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{t("rights_body")}</p>
        </div>

        <div className="rounded-xl border border-brown-500/20 bg-parchment-light/60 p-4 text-sm text-ink-soft/80">
          {t("takedown")}{" "}
          <a
            href="mailto:mainakmaity1999@gmail.com?subject=Azaadi%20Ka%20Safar%20Radio%20—%20Takedown%20Request"
            className="font-medium text-saffron underline decoration-dotted underline-offset-2 hover:text-saffron-bright"
          >
            mainakmaity1999@gmail.com
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://open.spotify.com/search/desh%20bhakti%20hindi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#1DB954] px-3 py-1.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            <Music2 size={16} /> Spotify
          </a>
          <a
            href="https://music.youtube.com/search?q=desh+bhakti+hindi+patriotic"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#FF0000] px-3 py-1.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            <Video size={16} /> YT Music
          </a>
        </div>

        <p className="text-xs text-ink-soft/60">
          © {year} Azaadi Ka Safar Radio. Illustration &amp; interface original; songs © their
          respective labels and rights holders. Made with warmth for 15 August.
        </p>
      </div>
    </footer>
  );
}
