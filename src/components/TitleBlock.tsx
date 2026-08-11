import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export function TitleBlock() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-light max-w-2xl rounded-3xl p-6 shadow-xl shadow-ink/10 sm:p-8"
    >
      <h1 className="font-display text-4xl font-bold leading-tight text-ink text-shadow-paper sm:text-5xl md:text-6xl">
        आज़ादी का सफ़र
        <span className="mt-1 block font-poppins text-2xl font-extrabold tracking-tight text-saffron sm:text-3xl">
          Azaadi Ka Safar
        </span>
      </h1>

      <p className="mt-4 border-l-4 border-saffron pl-3 font-display text-xl font-semibold text-ink-soft sm:text-2xl">
        {t("tagline")}
      </p>

      <p className="mt-4 text-base leading-relaxed text-ink-soft/90 sm:text-lg">{t("blurb")}</p>
    </motion.div>
  );
}
