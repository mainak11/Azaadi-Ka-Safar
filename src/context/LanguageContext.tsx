import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "../types";

const strings = {
  tagline: {
    en: "Independence Day classics, playing round the clock.",
    hi: "स्वतंत्रता दिवस के गीत, हर घड़ी बजते हुए।",
  },
  blurb: {
    en: "No AI, no generated verses — just the real songs that have played from tea-stall radios and school loudspeakers every 15th August for decades. Pick a rotation, press play, and let the chowk hum along.",
    hi: "कोई एआई नहीं, कोई बनावटी पंक्ति नहीं — बस वही असली गीत जो दशकों से हर 15 अगस्त को चाय की दुकानों और स्कूल के लाउडस्पीकरों पर बजते आए हैं। एक रोटेशन चुनें, प्ले दबाएँ, और चौक को गुनगुनाने दें।",
  },
  nav_rotations: { en: "Rotations", hi: "रोटेशन" },
  nav_songs: { en: "Songs", hi: "गीत" },
  live_tuning: { en: "tuning in", hi: "सुन रहे हैं" },
  online: { en: "online", hi: "ऑनलाइन" },
  now_playing: { en: "Tuning in…", hi: "जुड़ रहे हैं…" },
  radio_label: { en: "radio", hi: "रेडियो" },
  all_songs: { en: "All Songs", hi: "सभी गीत" },
  share: { en: "Share", hi: "शेयर करें" },
  rights_title: { en: "Rights & credits", hi: "अधिकार व श्रेय" },
  rights_body: {
    en: "Songs on this page play through embedded YouTube and Spotify players — nothing is hosted on this site. All rights remain with the original labels, composers, lyricists and performers. Credits are compiled from public film soundtrack listings and may be incomplete.",
    hi: "इस पेज पर गीत यूट्यूब और स्पॉटीफ़ाई के एम्बेडेड प्लेयर के माध्यम से बजते हैं — कुछ भी इस साइट पर होस्ट नहीं है। सभी अधिकार मूल लेबल, संगीतकार, गीतकार और कलाकारों के पास सुरक्षित हैं।",
  },
  takedown: {
    en: "Rights holder and want something removed or corrected?",
    hi: "अधिकार धारक हैं और कुछ हटवाना या ठीक करवाना चाहते हैं?",
  },
} as const;

type StringKey = keyof typeof strings;

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: StringKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggleLang: () => setLang((l) => (l === "en" ? "hi" : "en")),
      t: (key) => strings[key][lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
