import { useState } from "react";
import { Flag, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const CAPTION =
  "Tuning in to Azaadi Ka Safar — Independence Day classics, playing round the clock. 🇮🇳";

export function ShareButton() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = { title: "Azaadi Ka Safar Radio", text: CAPTION, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${CAPTION} ${window.location.href}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing more we can do silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={t("share")}
      className="fixed bottom-32 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-saffron-bright text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:bottom-36 sm:right-8"
    >
      {copied ? <Check size={20} /> : <Flag size={20} />}
    </button>
  );
}
