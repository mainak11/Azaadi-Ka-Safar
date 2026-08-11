import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useRadio } from "../context/RadioContext";
import { useLanguage } from "../context/LanguageContext";

export function SongList() {
  const { songs, currentSong, selectSong, playRequested, togglePlay } = useRadio();
  const { lang } = useLanguage();

  return (
    <section id="songs" className="px-5 pb-16 sm:px-8">
      <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {songs.map((song, i) => {
          const isCurrent = currentSong?.id === song.id;
          const isPlayingThis = isCurrent && playRequested;
          return (
            <motion.li
              key={song.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <motion.button
                type="button"
                onClick={() => (isCurrent ? togglePlay() : selectSong(song))}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left shadow-sm backdrop-blur-md transition-colors ${
                  isCurrent
                    ? "border-saffron-bright bg-parchment-light/70 shadow-lg shadow-saffron/20 ring-1 ring-saffron-bright/40"
                    : "border-brown-500/15 bg-parchment-light/30 hover:border-saffron/50 hover:bg-parchment-light/55 hover:shadow-md"
                }`}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brown-500/20 shadow-inner">
                  {song.youtubeId && (
                    <img
                      src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <span
                    className={`absolute inset-0 flex items-center justify-center bg-ink/0 text-parchment-light opacity-0 transition group-hover:bg-ink/40 group-hover:opacity-100 ${
                      isPlayingThis ? "bg-ink/40 opacity-100" : ""
                    }`}
                  >
                    {isPlayingThis ? <Pause size={18} /> : <Play size={18} />}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-base font-semibold text-ink">
                    {lang === "hi" ? song.titleHindi : song.title}
                  </span>
                  <span className="block truncate text-xs text-ink-soft/70">
                    {song.film} · {song.year}
                  </span>
                </span>
              </motion.button>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
