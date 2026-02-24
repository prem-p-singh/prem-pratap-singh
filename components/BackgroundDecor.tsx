"use client";

/**
 * Decorative background layer with vibrant botanical & science SVGs.
 * Grapevine leaves, grape clusters, DNA helices, molecular structures,
 * vine tendrils — all at noticeable but tasteful opacity.
 */

export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── Grapevine Leaf — top-right ── */}
      <svg
        className="absolute -top-16 -right-20 w-[520px] h-[520px] opacity-[0.07] animate-sway-slow"
        viewBox="0 0 200 200"
        fill="none"
        style={{ transform: "rotate(15deg)" }}
      >
        <path
          d="M100 20 C60 30, 20 60, 25 100 C28 130, 50 155, 80 165 C90 168, 95 170, 100 180 C105 170, 110 168, 120 165 C150 155, 172 130, 175 100 C180 60, 140 30, 100 20Z"
          fill="currentColor"
          className="text-primary"
        />
        <path
          d="M100 30 L100 170 M100 60 L60 45 M100 60 L140 45 M100 90 L45 75 M100 90 L155 75 M100 120 L55 115 M100 120 L145 115 M100 145 L75 150 M100 145 L125 150"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* ── Grapevine Leaf — bottom-left (larger, gentle sway) ── */}
      <svg
        className="absolute -bottom-12 -left-16 w-[460px] h-[460px] opacity-[0.06] animate-sway-reverse"
        viewBox="0 0 200 200"
        fill="none"
        style={{ transform: "rotate(-130deg)" }}
      >
        <path
          d="M100 20 C60 30, 20 60, 25 100 C28 130, 50 155, 80 165 C90 168, 95 170, 100 180 C105 170, 110 168, 120 165 C150 155, 172 130, 175 100 C180 60, 140 30, 100 20Z"
          fill="currentColor"
          className="text-primary"
        />
        <path
          d="M100 30 L100 170 M100 60 L60 45 M100 60 L140 45 M100 90 L45 75 M100 90 L155 75 M100 120 L55 115 M100 120 L145 115 M100 145 L75 150 M100 145 L125 150"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* ── Grape Cluster — mid-right ── */}
      <svg
        className="absolute top-[35%] -right-6 w-[320px] h-[320px] opacity-[0.06]"
        viewBox="0 0 120 160"
        fill="none"
      >
        <circle cx="50" cy="60" r="12" fill="currentColor" className="text-primary" />
        <circle cx="70" cy="60" r="12" fill="currentColor" className="text-primary" />
        <circle cx="60" cy="78" r="12" fill="currentColor" className="text-primary" />
        <circle cx="40" cy="78" r="12" fill="currentColor" className="text-primary" />
        <circle cx="80" cy="78" r="12" fill="currentColor" className="text-primary" />
        <circle cx="50" cy="96" r="12" fill="currentColor" className="text-primary" />
        <circle cx="70" cy="96" r="12" fill="currentColor" className="text-primary" />
        <circle cx="60" cy="114" r="12" fill="currentColor" className="text-primary" />
        <path
          d="M60 48 L60 20 Q60 10, 70 8 L85 5"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M72 14 C78 6, 90 8, 88 18 C86 26, 76 24, 72 14Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.8"
        />
      </svg>

      {/* ── DNA Helix — left side ── */}
      <svg
        className="absolute top-[52%] -left-4 w-[220px] h-[440px] opacity-[0.05]"
        viewBox="0 0 80 200"
        fill="none"
        style={{ transform: "rotate(10deg)" }}
      >
        <path
          d="M20 10 C50 30, 50 50, 20 70 C-10 90, -10 110, 20 130 C50 150, 50 170, 20 190"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M60 10 C30 30, 30 50, 60 70 C90 90, 90 110, 60 130 C30 150, 30 170, 60 190"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2.5"
          fill="none"
        />
        {[25, 55, 85, 115, 145, 175].map((y) => (
          <line
            key={y}
            x1="25"
            y1={y}
            x2="55"
            y2={y}
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.5"
            opacity="0.5"
          />
        ))}
        {/* Nucleotide dots on rungs */}
        {[25, 55, 85, 115, 145, 175].map((y, i) => (
          <circle
            key={`dot-${y}`}
            cx={i % 2 === 0 ? 32 : 48}
            cy={y}
            r="2.5"
            fill="currentColor"
            className={i % 2 === 0 ? "text-accent" : "text-primary"}
            opacity="0.6"
          />
        ))}
      </svg>

      {/* ── Molecular Structure — upper-left ── */}
      <svg
        className="absolute top-[14%] left-[7%] w-[240px] h-[240px] opacity-[0.045]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon
          points="50,15 75,30 75,60 50,75 25,60 25,30"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Alternating double bonds */}
        <line x1="53" y1="17" x2="72" y2="32" stroke="currentColor" className="text-primary" strokeWidth="0.8" opacity="0.4" />
        <line x1="72" y1="58" x2="53" y2="73" stroke="currentColor" className="text-primary" strokeWidth="0.8" opacity="0.4" />
        <line x1="28" y1="32" x2="28" y2="58" stroke="currentColor" className="text-primary" strokeWidth="0.8" opacity="0.4" />
        {/* Nodes */}
        <circle cx="50" cy="15" r="4.5" fill="currentColor" className="text-primary" />
        <circle cx="75" cy="30" r="4.5" fill="currentColor" className="text-accent" />
        <circle cx="75" cy="60" r="4.5" fill="currentColor" className="text-primary" />
        <circle cx="50" cy="75" r="4.5" fill="currentColor" className="text-accent" />
        <circle cx="25" cy="60" r="4.5" fill="currentColor" className="text-primary" />
        <circle cx="25" cy="30" r="4.5" fill="currentColor" className="text-primary" />
        {/* Branches */}
        <line x1="50" y1="15" x2="50" y2="0" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="50" cy="0" r="3" fill="currentColor" className="text-accent" opacity="0.7" />
        <line x1="75" y1="60" x2="92" y2="72" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="92" cy="72" r="3" fill="currentColor" className="text-primary" opacity="0.7" />
        <line x1="25" y1="60" x2="8" y2="72" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="8" cy="72" r="3" fill="currentColor" className="text-accent" opacity="0.7" />
        {/* OH group */}
        <line x1="50" y1="75" x2="50" y2="92" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="50" cy="92" r="3" fill="currentColor" className="text-primary" opacity="0.7" />
      </svg>

      {/* ── Medium Leaf — mid page right ── */}
      <svg
        className="absolute top-[68%] right-[10%] w-[200px] h-[200px] opacity-[0.05] animate-sway-slow"
        viewBox="0 0 100 100"
        fill="none"
        style={{ transform: "rotate(45deg)" }}
      >
        <path
          d="M50 10 C30 20, 10 40, 15 60 C18 75, 35 88, 50 92 C65 88, 82 75, 85 60 C90 40, 70 20, 50 10Z"
          fill="currentColor"
          className="text-primary"
        />
        <path
          d="M50 15 L50 88 M50 35 L30 25 M50 35 L70 25 M50 55 L25 48 M50 55 L75 48 M50 72 L35 72 M50 72 L65 72"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      {/* ── Floating Spore / Pollen — top center ── */}
      <svg
        className="absolute top-[7%] left-[42%] w-[140px] h-[140px] opacity-[0.04] animate-sway-reverse"
        viewBox="0 0 60 60"
        fill="none"
      >
        <circle cx="30" cy="30" r="22" fill="currentColor" className="text-accent" />
        <circle cx="30" cy="30" r="14" fill="currentColor" className="text-primary" opacity="0.4" />
        {[
          [18, 20], [40, 18], [22, 40], [38, 38],
          [30, 16], [20, 30], [40, 30], [30, 42],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="currentColor"
            className="text-primary"
            opacity="0.35"
          />
        ))}
      </svg>

      {/* ── Vine Tendril — bottom-right ── */}
      <svg
        className="absolute bottom-[8%] right-[4%] w-[280px] h-[280px] opacity-[0.05]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M80 90 C75 70, 60 65, 50 50 C40 35, 45 20, 60 10"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 10 C68 5, 72 12, 65 16 C58 20, 55 14, 62 10"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M55 45 C48 38, 38 42, 42 50 C44 55, 52 52, 55 45Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.7"
        />
        <path
          d="M65 30 C72 24, 80 28, 76 35 C73 40, 66 37, 65 30Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.7"
        />
        {/* Additional small leaf */}
        <path
          d="M72 62 C78 56, 86 60, 82 67 C80 72, 74 69, 72 62Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.5"
        />
      </svg>

      {/* ── Extra leaf — mid-left ── */}
      <svg
        className="absolute top-[42%] left-[3%] w-[160px] h-[160px] opacity-[0.04] animate-sway-slow"
        viewBox="0 0 80 80"
        fill="none"
        style={{ transform: "rotate(-60deg)" }}
      >
        <path
          d="M40 5 C22 12, 5 30, 8 48 C10 60, 25 70, 40 74 C55 70, 70 60, 72 48 C75 30, 58 12, 40 5Z"
          fill="currentColor"
          className="text-primary"
        />
        <path
          d="M40 10 L40 70 M40 25 L22 18 M40 25 L58 18 M40 42 L18 36 M40 42 L62 36 M40 58 L28 58 M40 58 L52 58"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </svg>

      {/* ── Ambient gradient blobs — more vibrant ── */}
      <div className="absolute top-[18%] right-[18%] w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
      <div className="absolute top-[55%] left-[12%] w-[450px] h-[450px] rounded-full bg-accent/[0.03] blur-[120px]" />
      <div className="absolute bottom-[3%] right-[25%] w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
      <div className="absolute top-[80%] left-[40%] w-[350px] h-[350px] rounded-full bg-primary/[0.025] blur-[90px]" />
    </div>
  );
}
