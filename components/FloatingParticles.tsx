"use client";

/**
 * Floating botanical particles — tiny leaves, spores and dots
 * that drift gently across the viewport for an organic feel.
 */

const particles = [
  // Leaves (SVG mini path)
  { type: "leaf", x: 5, delay: 0, duration: 28, size: 18, rotate: 25 },
  { type: "leaf", x: 15, delay: 8, duration: 32, size: 14, rotate: -40 },
  { type: "leaf", x: 30, delay: 4, duration: 26, size: 20, rotate: 60 },
  { type: "leaf", x: 50, delay: 12, duration: 30, size: 16, rotate: -20 },
  { type: "leaf", x: 65, delay: 2, duration: 34, size: 12, rotate: 45 },
  { type: "leaf", x: 80, delay: 6, duration: 28, size: 22, rotate: -55 },
  { type: "leaf", x: 92, delay: 10, duration: 30, size: 15, rotate: 35 },
  // Spores / dots
  { type: "dot", x: 10, delay: 5, duration: 24, size: 5, rotate: 0 },
  { type: "dot", x: 25, delay: 14, duration: 20, size: 4, rotate: 0 },
  { type: "dot", x: 42, delay: 9, duration: 22, size: 6, rotate: 0 },
  { type: "dot", x: 58, delay: 1, duration: 26, size: 3, rotate: 0 },
  { type: "dot", x: 73, delay: 11, duration: 18, size: 5, rotate: 0 },
  { type: "dot", x: 88, delay: 7, duration: 24, size: 4, rotate: 0 },
  // Extra leaves
  { type: "leaf", x: 22, delay: 16, duration: 36, size: 10, rotate: 80 },
  { type: "leaf", x: 45, delay: 20, duration: 28, size: 13, rotate: -70 },
  { type: "leaf", x: 70, delay: 18, duration: 32, size: 17, rotate: 15 },
  { type: "leaf", x: 95, delay: 22, duration: 26, size: 11, rotate: -30 },
];

export default function FloatingParticles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute animate-float-particle"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === "leaf" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <path
                d="M12 2 C6 5, 2 10, 3 16 C4 20, 8 23, 12 24 C16 23, 20 20, 21 16 C22 10, 18 5, 12 2Z"
                fill="var(--primary)"
                opacity="0.12"
              />
              <path
                d="M12 4 L12 22 M12 9 L7 6 M12 9 L17 6 M12 14 L6 12 M12 14 L18 12 M12 19 L9 19 M12 19 L15 19"
                stroke="var(--primary)"
                strokeWidth="0.5"
                opacity="0.08"
              />
            </svg>
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: i % 3 === 0 ? "var(--accent)" : "var(--primary)",
                opacity: 0.1,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
