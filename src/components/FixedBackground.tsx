import { Particles } from "./Particles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import heroBg from "../assets/hero-bg.webp";
import heroVideo from "../assets/hero-bg.mp4";

const FOCUS_POSITION = "50% 42%";

// Pinned to the viewport (not the page) so the artwork holds still while the
// hero content and, later, the opaque page sections scroll up over it.
export function FixedBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="fixed inset-x-0 top-0 -z-10 min-h-[54vh] max-h-[480px] overflow-hidden border-b-4 border-double border-brown-600/40 sm:min-h-[70vh] sm:max-h-[640px] md:min-h-[85vh] md:max-h-[800px]"
      aria-hidden="true"
    >
      {reducedMotion ? (
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: FOCUS_POSITION }}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroBg}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: FOCUS_POSITION }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}
      <Particles />
      <div className="vignette-overlay pointer-events-none absolute inset-0" />
    </div>
  );
}
