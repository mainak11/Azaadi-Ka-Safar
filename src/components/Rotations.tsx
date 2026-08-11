import { motion } from "framer-motion";
import { rotations } from "../data/rotations";
import { useRadio } from "../context/RadioContext";
import { useLanguage } from "../context/LanguageContext";

export function Rotations() {
  const { activeRotation, setActiveRotation } = useRadio();
  const { lang } = useLanguage();

  return (
    <section id="rotations" className="px-5 py-12 sm:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-saffron" />
        <h2 className="font-display text-2xl font-bold text-ink-soft sm:text-3xl">
          {lang === "hi" ? "रोटेशन चुनें" : "Choose a rotation"}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {rotations.map((r) => {
          const active = r.id === activeRotation;
          return (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => setActiveRotation(r.id)}
              aria-pressed={active}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:text-base ${
                active
                  ? "bg-ink text-parchment-light shadow-lg shadow-ink/25"
                  : "glass-light text-ink-soft hover:text-ink"
              }`}
            >
              <span className="relative z-10">{lang === "hi" ? r.labelHindi : r.label}</span>
              {active && (
                <motion.span
                  layoutId="rotation-underline"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-x-3 -bottom-1 h-1 overflow-hidden rounded-full"
                >
                  <span className="flex h-full w-full">
                    <span className="h-full flex-1 bg-saffron-bright" />
                    <span className="h-full flex-1 bg-parchment-light" />
                    <span className="h-full flex-1 bg-india-green-bright" />
                  </span>
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {(() => {
        const active = rotations.find((r) => r.id === activeRotation);
        if (!active) return null;
        return (
          <p className="mt-4 max-w-xl text-sm text-ink-soft/80 sm:text-base">
            {lang === "hi" ? active.vibeHindi : active.vibe}
          </p>
        );
      })()}
    </section>
  );
}
