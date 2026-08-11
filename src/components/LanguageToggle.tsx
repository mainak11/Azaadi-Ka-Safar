import { useLanguage } from "../context/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const isHindi = lang === "hi";

  return (
    <button
      type="button"
      onClick={toggleLang}
      role="switch"
      aria-checked={isHindi}
      aria-label="Toggle language between English and Hindi"
      className="relative flex h-8 w-[74px] items-center rounded-full border border-brown-500/30 bg-parchment-light/80 px-1 shadow-inner"
    >
      <span
        className={`absolute h-6 w-9 rounded-full shadow transition-transform duration-300 ease-out ${
          isHindi ? "translate-x-[34px] bg-india-green" : "translate-x-0 bg-saffron"
        }`}
      />
      <span
        className={`relative z-10 w-9 text-center text-[11px] font-bold transition-colors ${
          !isHindi ? "text-white" : "text-ink-soft"
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 w-9 text-center font-display text-[11px] font-bold transition-colors ${
          isHindi ? "text-white" : "text-ink-soft"
        }`}
      >
        हिं
      </span>
    </button>
  );
}
