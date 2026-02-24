"use client";

/**
 * Decorative background layer with soft, blurred botanical & science SVGs.
 * Renders grapevine leaves, grape clusters, DNA helices, and molecular
 * structures at low opacity to fill the empty background.
 */

export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── Grapevine Leaf — top-right ── */}
      <svg
        className="absolute -top-20 -right-24 w-[500px] h-[500px] opacity-[0.035] blur-[2px]"
        viewBox="0 0 200 200"
        fill="none"
        style={{ transform: "rotate(15deg)" }}
      >
        <path
          d="M100 20 C60 30, 20 60, 25 100 C28 130, 50 155, 80 165 C90 168, 95 170, 100 180 C105 170, 110 168, 120 165 C150 155, 172 130, 175 100 C180 60, 140 30, 100 20Z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Leaf veins */}
        <path
          d="M100 30 L100 170 M100 60 L60 45 M100 60 L140 45 M100 90 L45 75 M100 90 L155 75 M100 120 L55 115 M100 120 L145 115 M100 145 L75 150 M100 145 L125 150"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* ── Grapevine Leaf — bottom-left ── */}
      <svg
        className="absolute -bottom-16 -left-20 w-[420px] h-[420px] opacity-[0.03] blur-[1px]"
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
        className="absolute top-[35%] -right-10 w-[300px] h-[300px] opacity-[0.03] blur-[2px]"
        viewBox="0 0 120 160"
        fill="none"
      >
        {/* Grapes */}
        <circle cx="50" cy="60" r="12" fill="currentColor" className="text-primary" />
        <circle cx="70" cy="60" r="12" fill="currentColor" className="text-primary" />
        <circle cx="60" cy="78" r="12" fill="currentColor" className="text-primary" />
        <circle cx="40" cy="78" r="12" fill="currentColor" className="text-primary" />
        <circle cx="80" cy="78" r="12" fill="currentColor" className="text-primary" />
        <circle cx="50" cy="96" r="12" fill="currentColor" className="text-primary" />
        <circle cx="70" cy="96" r="12" fill="currentColor" className="text-primary" />
        <circle cx="60" cy="114" r="12" fill="currentColor" className="text-primary" />
        {/* Stem */}
        <path
          d="M60 48 L60 20 Q60 10, 70 8 L85 5"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Small leaf at stem */}
        <path
          d="M72 14 C78 6, 90 8, 88 18 C86 26, 76 24, 72 14Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.8"
        />
      </svg>

      {/* ── DNA Helix — left side ── */}
      <svg
        className="absolute top-[55%] -left-8 w-[200px] h-[400px] opacity-[0.025] blur-[1px]"
        viewBox="0 0 80 200"
        fill="none"
        style={{ transform: "rotate(10deg)" }}
      >
        {/* Helix strands */}
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
        {/* Rungs */}
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
      </svg>

      {/* ── Molecular Structure — upper-left ── */}
      <svg
        className="absolute top-[15%] left-[8%] w-[220px] h-[220px] opacity-[0.025]"
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Hexagonal ring (benzene-like) */}
        <polygon
          points="50,15 75,30 75,60 50,75 25,60 25,30"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Nodes */}
        <circle cx="50" cy="15" r="4" fill="currentColor" className="text-primary" />
        <circle cx="75" cy="30" r="4" fill="currentColor" className="text-primary" />
        <circle cx="75" cy="60" r="4" fill="currentColor" className="text-primary" />
        <circle cx="50" cy="75" r="4" fill="currentColor" className="text-primary" />
        <circle cx="25" cy="60" r="4" fill="currentColor" className="text-primary" />
        <circle cx="25" cy="30" r="4" fill="currentColor" className="text-primary" />
        {/* Branches */}
        <line x1="50" y1="15" x2="50" y2="0" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="50" cy="0" r="3" fill="currentColor" className="text-primary" opacity="0.6" />
        <line x1="75" y1="60" x2="90" y2="70" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="90" cy="70" r="3" fill="currentColor" className="text-primary" opacity="0.6" />
        <line x1="25" y1="60" x2="10" y2="70" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="10" cy="70" r="3" fill="currentColor" className="text-primary" opacity="0.6" />
      </svg>

      {/* ── Small Leaf — mid page ── */}
      <svg
        className="absolute top-[70%] right-[12%] w-[180px] h-[180px] opacity-[0.025] blur-[1px]"
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
        className="absolute top-[8%] left-[45%] w-[120px] h-[120px] opacity-[0.02]"
        viewBox="0 0 60 60"
        fill="none"
      >
        <circle cx="30" cy="30" r="20" fill="currentColor" className="text-accent" />
        <circle cx="30" cy="30" r="12" fill="currentColor" className="text-primary" opacity="0.4" />
        {/* Surface texture dots */}
        {[
          [20, 22],
          [38, 20],
          [24, 38],
          [36, 36],
          [30, 18],
          [22, 30],
          [38, 30],
          [30, 40],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="1.5"
            fill="currentColor"
            className="text-primary"
            opacity="0.3"
          />
        ))}
      </svg>

      {/* ── Vine Tendril — bottom-right ── */}
      <svg
        className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] opacity-[0.025] blur-[1px]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M80 90 C75 70, 60 65, 50 50 C40 35, 45 20, 60 10"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Spiral tendril */}
        <path
          d="M60 10 C68 5, 72 12, 65 16 C58 20, 55 14, 62 10"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Small leaves along the vine */}
        <path
          d="M55 45 C48 38, 38 42, 42 50 C44 55, 52 52, 55 45Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.6"
        />
        <path
          d="M65 30 C72 24, 80 28, 76 35 C73 40, 66 37, 65 30Z"
          fill="currentColor"
          className="text-primary"
          opacity="0.6"
        />
      </svg>

      {/* ── Soft ambient gradient blobs ── */}
      <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px]" />
      <div className="absolute top-[60%] left-[15%] w-[350px] h-[350px] rounded-full bg-accent/[0.015] blur-[100px]" />
      <div className="absolute bottom-[5%] right-[30%] w-[300px] h-[300px] rounded-full bg-primary/[0.015] blur-[80px]" />
    </div>
  );
}
