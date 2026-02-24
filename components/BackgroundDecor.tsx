"use client";

/**
 * Decorative background layer — more vibrant botanical & science SVGs.
 * Uses brown bark tones for woody vines + green leaves + amber accents.
 */

export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── Grapevine Leaf — top-right (vibrant green) ── */}
      <svg
        className="absolute -top-14 -right-18 w-[540px] h-[540px] opacity-[0.1] animate-sway-slow"
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
          opacity="0.5"
        />
      </svg>

      {/* ── Grapevine Leaf — bottom-left ── */}
      <svg
        className="absolute -bottom-10 -left-14 w-[480px] h-[480px] opacity-[0.08] animate-sway-reverse"
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
          d="M100 30 L100 170 M100 60 L60 45 M100 60 L140 45 M100 90 L45 75 M100 90 L155 75 M100 120 L55 115 M100 120 L145 115"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* ── WOODY VINE — diagonal top-left to center (brown) ── */}
      <svg
        className="absolute top-[10%] -left-10 w-[600px] h-[400px] opacity-[0.12]"
        viewBox="0 0 300 200"
        fill="none"
      >
        {/* Thick bark */}
        <path
          d="M0 180 C40 160, 80 140, 120 110 C160 80, 200 60, 260 30 C280 20, 290 15, 300 10"
          stroke="var(--bark-dark)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M0 179 C40 159, 80 139, 120 109 C160 79, 200 59, 260 29 C280 19, 290 14, 300 9"
          stroke="var(--bark)"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
        <path
          d="M0 178 C40 158, 80 138, 120 108 C160 78, 200 58, 260 28"
          stroke="var(--bark-light)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
          fill="none"
        />
        {/* Side branch */}
        <path d="M120 110 C110 95, 95 85, 80 78" stroke="var(--bark)" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none" />
        <path d="M200 60 C210 50, 215 38, 220 28" stroke="var(--bark)" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" fill="none" />
        {/* Leaves on vine */}
        <g opacity="0.4" transform="translate(72,70) rotate(-20)">
          <path d="M0 8 C-3 3, 0 -1, 4 0 C7 -1, 10 0, 12 4 C14 3, 17 5, 15 9 C18 10, 16 14, 13 14 C12 17, 8 17, 7 14 C3 16, -1 13, 0 8Z" fill="var(--primary)" />
        </g>
        <g opacity="0.35" transform="translate(215,22) rotate(15)">
          <path d="M0 6 C-2 2, 0 -1, 3 0 C5 -1, 7 0, 8 3 C9 2, 11 3, 10 6 C12 7, 10 9, 8 9 C7 11, 5 11, 4 9 C2 10, 0 8, 0 6Z" fill="var(--primary)" />
        </g>
        {/* Tendril */}
        <path d="M160 88 C166 78, 174 76, 176 82 C178 88, 170 90, 168 84" stroke="var(--bark-light)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.3" />
      </svg>

      {/* ── WOODY VINE — bottom-right diagonal (brown) ── */}
      <svg
        className="absolute bottom-[5%] -right-8 w-[500px] h-[350px] opacity-[0.1]"
        viewBox="0 0 250 180"
        fill="none"
      >
        <path
          d="M250 170 C220 155, 180 130, 140 100 C100 70, 60 50, 20 20 C10 12, 5 8, 0 5"
          stroke="var(--bark-dark)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M250 169 C220 154, 180 129, 140 99 C100 69, 60 49, 20 19"
          stroke="var(--bark)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
        <path
          d="M250 168 C220 153, 180 128, 140 98 C100 68, 60 48, 20 18"
          stroke="var(--bark-light)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.3"
          fill="none"
        />
        {/* Side branch */}
        <path d="M140 100 C150 88, 158 80, 168 74" stroke="var(--bark)" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" fill="none" />
        {/* Leaf */}
        <g opacity="0.35" transform="translate(164,66) rotate(25)">
          <path d="M0 8 C-3 3, 0 -1, 4 0 C7 -1, 10 0, 12 4 C14 3, 17 5, 15 9 C18 10, 16 14, 13 14 C12 17, 8 17, 7 14 C3 16, -1 13, 0 8Z" fill="var(--primary)" />
        </g>
        {/* Grape cluster */}
        <g opacity="0.3" transform="translate(70,44)">
          <circle cx="0" cy="0" r="4" fill="#7c3aed" />
          <circle cx="7" cy="-2" r="4" fill="#8b5cf6" />
          <circle cx="3" cy="-7" r="3.5" fill="#7c3aed" />
          <circle cx="-4" cy="-4" r="3" fill="#8b5cf6" />
        </g>
      </svg>

      {/* ── Grape Cluster — mid-right (more vibrant) ── */}
      <svg
        className="absolute top-[35%] -right-4 w-[340px] h-[340px] opacity-[0.09]"
        viewBox="0 0 120 160"
        fill="none"
      >
        <circle cx="50" cy="60" r="12" fill="#7c3aed" />
        <circle cx="70" cy="60" r="12" fill="#8b5cf6" />
        <circle cx="60" cy="78" r="12" fill="#7c3aed" />
        <circle cx="40" cy="78" r="12" fill="#8b5cf6" />
        <circle cx="80" cy="78" r="12" fill="#7c3aed" />
        <circle cx="50" cy="96" r="12" fill="#8b5cf6" />
        <circle cx="70" cy="96" r="12" fill="#7c3aed" />
        <circle cx="60" cy="114" r="12" fill="#8b5cf6" />
        {/* Woody stem */}
        <path d="M60 48 L60 20 Q60 10, 70 8 L85 5" stroke="var(--bark)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M60 47 L60 20 Q60 10, 70 8 L85 5" stroke="var(--bark-light)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
        {/* Leaf */}
        <path d="M72 14 C78 6, 90 8, 88 18 C86 26, 76 24, 72 14Z" fill="var(--primary)" opacity="0.6" />
      </svg>

      {/* ── DNA Helix — left side ── */}
      <svg
        className="absolute top-[52%] -left-2 w-[240px] h-[460px] opacity-[0.07]"
        viewBox="0 0 80 200"
        fill="none"
        style={{ transform: "rotate(10deg)" }}
      >
        <path d="M20 10 C50 30, 50 50, 20 70 C-10 90, -10 110, 20 130 C50 150, 50 170, 20 190" stroke="currentColor" className="text-primary" strokeWidth="2.5" fill="none" />
        <path d="M60 10 C30 30, 30 50, 60 70 C90 90, 90 110, 60 130 C30 150, 30 170, 60 190" stroke="currentColor" className="text-primary" strokeWidth="2.5" fill="none" />
        {[25, 55, 85, 115, 145, 175].map((y) => (
          <line key={y} x1="25" y1={y} x2="55" y2={y} stroke="currentColor" className="text-primary" strokeWidth="1.5" opacity="0.5" />
        ))}
        {[25, 55, 85, 115, 145, 175].map((y, i) => (
          <circle key={`dot-${y}`} cx={i % 2 === 0 ? 32 : 48} cy={y} r="2.5" fill="currentColor" className={i % 2 === 0 ? "text-accent" : "text-primary"} opacity="0.6" />
        ))}
      </svg>

      {/* ── Molecular Structure — upper-left ── */}
      <svg
        className="absolute top-[14%] left-[7%] w-[260px] h-[260px] opacity-[0.06]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,15 75,30 75,60 50,75 25,60 25,30" stroke="currentColor" className="text-primary" strokeWidth="1.5" fill="none" />
        <line x1="53" y1="17" x2="72" y2="32" stroke="currentColor" className="text-primary" strokeWidth="0.8" opacity="0.4" />
        <line x1="72" y1="58" x2="53" y2="73" stroke="currentColor" className="text-primary" strokeWidth="0.8" opacity="0.4" />
        <line x1="28" y1="32" x2="28" y2="58" stroke="currentColor" className="text-primary" strokeWidth="0.8" opacity="0.4" />
        <circle cx="50" cy="15" r="4.5" fill="currentColor" className="text-primary" />
        <circle cx="75" cy="30" r="4.5" fill="currentColor" className="text-accent" />
        <circle cx="75" cy="60" r="4.5" fill="currentColor" className="text-primary" />
        <circle cx="50" cy="75" r="4.5" fill="currentColor" className="text-accent" />
        <circle cx="25" cy="60" r="4.5" fill="currentColor" className="text-primary" />
        <circle cx="25" cy="30" r="4.5" fill="currentColor" className="text-primary" />
        <line x1="50" y1="15" x2="50" y2="0" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="50" cy="0" r="3" fill="currentColor" className="text-accent" opacity="0.7" />
        <line x1="75" y1="60" x2="92" y2="72" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="92" cy="72" r="3" fill="currentColor" className="text-primary" opacity="0.7" />
        <line x1="25" y1="60" x2="8" y2="72" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
        <circle cx="8" cy="72" r="3" fill="currentColor" className="text-accent" opacity="0.7" />
      </svg>

      {/* ── Medium Leaf — mid-right ── */}
      <svg
        className="absolute top-[68%] right-[10%] w-[220px] h-[220px] opacity-[0.08] animate-sway-slow"
        viewBox="0 0 100 100"
        fill="none"
        style={{ transform: "rotate(45deg)" }}
      >
        <path d="M50 10 C30 20, 10 40, 15 60 C18 75, 35 88, 50 92 C65 88, 82 75, 85 60 C90 40, 70 20, 50 10Z" fill="currentColor" className="text-primary" />
        <path d="M50 15 L50 88 M50 35 L30 25 M50 35 L70 25 M50 55 L25 48 M50 55 L75 48 M50 72 L35 72 M50 72 L65 72" stroke="currentColor" className="text-primary" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* ── Extra leaf — mid-left ── */}
      <svg
        className="absolute top-[42%] left-[2%] w-[180px] h-[180px] opacity-[0.06] animate-sway-slow"
        viewBox="0 0 80 80"
        fill="none"
        style={{ transform: "rotate(-60deg)" }}
      >
        <path d="M40 5 C22 12, 5 30, 8 48 C10 60, 25 70, 40 74 C55 70, 70 60, 72 48 C75 30, 58 12, 40 5Z" fill="currentColor" className="text-primary" />
        <path d="M40 10 L40 70 M40 25 L22 18 M40 25 L58 18 M40 42 L18 36 M40 42 L62 36" stroke="currentColor" className="text-primary" strokeWidth="0.8" opacity="0.4" />
      </svg>

      {/* ── Floating Spore / Pollen — top center ── */}
      <svg
        className="absolute top-[6%] left-[40%] w-[150px] h-[150px] opacity-[0.06] animate-sway-reverse"
        viewBox="0 0 60 60"
        fill="none"
      >
        <circle cx="30" cy="30" r="22" fill="currentColor" className="text-accent" />
        <circle cx="30" cy="30" r="14" fill="currentColor" className="text-primary" opacity="0.4" />
        {[[18,20],[40,18],[22,40],[38,38],[30,16],[20,30],[40,30],[30,42]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="currentColor" className="text-primary" opacity="0.35" />
        ))}
      </svg>

      {/* ── Ambient gradient blobs — more vibrant ── */}
      <div className="absolute top-[15%] right-[15%] w-[550px] h-[550px] rounded-full bg-primary/[0.05] blur-[130px]" />
      <div className="absolute top-[50%] left-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[130px]" />
      <div className="absolute bottom-[2%] right-[20%] w-[450px] h-[450px] rounded-full bg-primary/[0.04] blur-[110px]" />
      <div className="absolute top-[78%] left-[35%] w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
    </div>
  );
}
