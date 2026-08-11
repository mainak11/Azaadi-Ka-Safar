const PARTICLES = [
  { left: "8%", size: 5, delay: "0s", duration: "16s", color: "var(--color-saffron-bright)" },
  { left: "18%", size: 3, delay: "3s", duration: "13s", color: "var(--color-gold)" },
  { left: "27%", size: 4, delay: "6s", duration: "18s", color: "var(--color-india-green-bright)" },
  { left: "41%", size: 3, delay: "1.5s", duration: "15s", color: "var(--color-gold-soft)" },
  { left: "58%", size: 5, delay: "4.5s", duration: "20s", color: "var(--color-saffron-bright)" },
  { left: "69%", size: 3, delay: "8s", duration: "14s", color: "var(--color-india-green-bright)" },
  { left: "78%", size: 4, delay: "2s", duration: "17s", color: "var(--color-gold)" },
  { left: "88%", size: 3, delay: "5.5s", duration: "19s", color: "var(--color-saffron-bright)" },
  { left: "95%", size: 4, delay: "9.5s", duration: "15s", color: "var(--color-gold-soft)" },
  { left: "50%", size: 3, delay: "7s", duration: "21s", color: "var(--color-india-green-bright)" },
];

export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="motion-safe:animate-drift absolute bottom-0 rounded-full opacity-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
