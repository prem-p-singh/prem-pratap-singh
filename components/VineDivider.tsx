/**
 * Thick, woody grapevine branch section divider.
 * Uses brown bark color layers for a 3D wood feel,
 * with green leaves and tendrils growing from the branch.
 */

interface VineDividerProps {
  flip?: boolean;
  className?: string;
}

export default function VineDivider({ flip = false, className = "" }: VineDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden my-0 ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <svg
        className="w-full h-14 sm:h-16 md:h-20"
        viewBox="0 0 1200 72"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* ═══ WOODY MAIN BRANCH — 3D bark layers ═══ */}
        {/* Layer 1: deep shadow (darkest) */}
        <path
          d="M-20 38 C60 32, 130 42, 260 35 C370 29, 430 40, 540 36 C640 32, 710 42, 820 35 C920 29, 990 40, 1080 36 C1150 32, 1190 38, 1220 35"
          stroke="var(--bark-dark)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.55"
          fill="none"
        />
        {/* Layer 2: main bark body */}
        <path
          d="M-20 37 C60 31, 130 41, 260 34 C370 28, 430 39, 540 35 C640 31, 710 41, 820 34 C920 28, 990 39, 1080 35 C1150 31, 1190 37, 1220 34"
          stroke="var(--bark)"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.65"
          fill="none"
        />
        {/* Layer 3: mid bark highlight */}
        <path
          d="M-20 36 C60 30, 130 40, 260 33 C370 27, 430 38, 540 34 C640 30, 710 40, 820 33 C920 27, 990 38, 1080 34 C1150 30, 1190 36, 1220 33"
          stroke="var(--bark-light)"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
        {/* Layer 4: top highlight streak */}
        <path
          d="M-20 35 C60 29, 130 39, 260 32 C370 26, 430 37, 540 33 C640 29, 710 39, 820 32 C920 26, 990 37, 1080 33 C1150 29, 1190 35, 1220 32"
          stroke="var(--bark-highlight)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
          fill="none"
        />

        {/* ═══ BARK GRAIN TEXTURE ═══ */}
        {[50, 120, 200, 310, 400, 500, 590, 680, 770, 860, 950, 1040, 1120].map((x, i) => (
          <line
            key={`grain-${x}`}
            x1={x}
            y1={32 + (i % 3) * 2}
            x2={x + 12 + (i % 4) * 2}
            y2={34 + (i % 2) * 3}
            stroke="var(--bark-dark)"
            strokeWidth="0.8"
            opacity="0.35"
            strokeLinecap="round"
          />
        ))}

        {/* ═══ WOOD KNOTS ═══ */}
        <ellipse cx="280" cy="34" rx="6" ry="5" fill="var(--bark-dark)" opacity="0.45" />
        <ellipse cx="280" cy="34" rx="3" ry="2.5" fill="var(--bark)" opacity="0.35" />
        <ellipse cx="620" cy="35" rx="7" ry="5" fill="var(--bark-dark)" opacity="0.4" />
        <ellipse cx="620" cy="35" rx="3.5" ry="2.5" fill="var(--bark)" opacity="0.3" />
        <ellipse cx="950" cy="35" rx="5.5" ry="4" fill="var(--bark-dark)" opacity="0.4" />
        <ellipse cx="950" cy="35" rx="3" ry="2" fill="var(--bark)" opacity="0.3" />

        {/* ═══ SIDE BRANCHES (woody brown) ═══ */}
        {/* Branch up-left */}
        <path d="M200 33 C190 24, 176 18, 166 12" stroke="var(--bark-dark)" strokeWidth="5" strokeLinecap="round" opacity="0.4" fill="none" />
        <path d="M200 33 C190 24, 176 18, 166 12" stroke="var(--bark)" strokeWidth="3" strokeLinecap="round" opacity="0.55" fill="none" />
        <path d="M200 32 C190 23, 176 17, 166 11" stroke="var(--bark-light)" strokeWidth="1" strokeLinecap="round" opacity="0.35" fill="none" />

        {/* Branch down-right */}
        <path d="M480 36 C492 44, 502 50, 514 55" stroke="var(--bark-dark)" strokeWidth="4" strokeLinecap="round" opacity="0.4" fill="none" />
        <path d="M480 36 C492 44, 502 50, 514 55" stroke="var(--bark)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" fill="none" />
        <path d="M480 35 C492 43, 502 49, 514 54" stroke="var(--bark-light)" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" fill="none" />

        {/* Branch up-right */}
        <path d="M760 33 C772 24, 786 16, 800 10" stroke="var(--bark-dark)" strokeWidth="4.5" strokeLinecap="round" opacity="0.4" fill="none" />
        <path d="M760 33 C772 24, 786 16, 800 10" stroke="var(--bark)" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" fill="none" />
        <path d="M760 32 C772 23, 786 15, 800 9" stroke="var(--bark-light)" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" fill="none" />

        {/* Branch down-left */}
        <path d="M1030 36 C1018 46, 1008 54, 998 58" stroke="var(--bark-dark)" strokeWidth="3.5" strokeLinecap="round" opacity="0.35" fill="none" />
        <path d="M1030 36 C1018 46, 1008 54, 998 58" stroke="var(--bark)" strokeWidth="2" strokeLinecap="round" opacity="0.45" fill="none" />

        {/* ═══ GRAPEVINE LEAVES (green) ═══ */}
        {/* Leaf 1 — upper-left branch */}
        <g opacity="0.55" transform="translate(152, 3) rotate(-15)">
          <path d="M0 12 C-4 4, 0 -2, 6 0 C10 -2, 16 0, 18 6 C22 4, 26 8, 24 14 C28 16, 26 22, 20 22 C18 26, 12 26, 10 22 C4 24, -2 20, 0 12Z" fill="var(--primary)" />
          <path d="M12 2 L12 24 M12 8 L6 4 M12 8 L18 4 M12 14 L4 12 M12 14 L20 12 M12 20 L8 22 M12 20 L16 22" stroke="var(--primary)" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Leaf 2 — upper-right branch */}
        <g opacity="0.5" transform="translate(794, 0) rotate(20)">
          <path d="M0 10 C-3 4, 0 -1, 5 0 C8 -1, 12 0, 14 5 C17 3, 20 6, 18 11 C21 13, 20 18, 16 18 C14 21, 10 21, 8 18 C4 20, -1 16, 0 10Z" fill="var(--primary)" />
          <path d="M10 1 L10 20 M10 6 L5 3 M10 6 L15 3 M10 12 L3 10 M10 12 L17 10" stroke="var(--primary)" strokeWidth="0.4" opacity="0.5" />
        </g>

        {/* Leaf 3 — below vine */}
        <g opacity="0.45" transform="translate(506, 50) rotate(10)">
          <path d="M0 8 C-3 3, 0 -1, 4 0 C7 -1, 10 0, 12 4 C14 3, 17 5, 15 9 C18 10, 16 14, 13 14 C12 17, 8 17, 7 14 C3 16, -1 13, 0 8Z" fill="var(--primary)" />
          <path d="M8 1 L8 16 M8 5 L4 2 M8 5 L12 2 M8 10 L2 8 M8 10 L14 8" stroke="var(--primary)" strokeWidth="0.4" opacity="0.4" />
        </g>

        {/* Leaf 4 — near right */}
        <g opacity="0.4" transform="translate(1090, 24) rotate(-30)">
          <path d="M0 7 C-2 2, 0 -1, 4 0 C6 -1, 8 0, 9 3 C11 2, 13 4, 12 7 C14 8, 12 11, 10 11 C9 13, 6 13, 5 11 C3 12, 0 10, 0 7Z" fill="var(--primary)" />
        </g>

        {/* Leaf 5 — on left side */}
        <g opacity="0.4" transform="translate(68, 26) rotate(15)">
          <path d="M0 6 C-2 2, 0 -1, 3 0 C5 -1, 7 0, 8 3 C9 2, 11 3, 10 6 C12 7, 10 9, 8 9 C7 11, 5 11, 4 9 C2 10, 0 8, 0 6Z" fill="var(--primary)" />
        </g>

        {/* ═══ SPIRAL TENDRILS (brown → green) ═══ */}
        <path d="M340 30 C346 18, 356 16, 358 24 C360 30, 352 32, 350 26 C348 20, 354 14, 360 18" stroke="var(--bark-light)" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M340 30 C346 18, 356 16, 358 24 C360 30, 352 32, 350 26" stroke="var(--primary)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />

        <path d="M700 30 C692 18, 682 16, 680 24 C678 30, 686 32, 688 26 C690 20, 684 14, 678 18" stroke="var(--bark-light)" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.35" />
        <path d="M700 30 C692 18, 682 16, 680 24 C678 30, 686 32, 688 26" stroke="var(--primary)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />

        <path d="M1140 32 C1146 20, 1156 18, 1158 26 C1160 32, 1152 34, 1150 28" stroke="var(--bark-light)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />

        {/* ═══ GRAPE CLUSTERS (purple/green) ═══ */}
        <g opacity="0.5">
          <circle cx="410" cy="30" r="4.5" fill="#7c3aed" />
          <circle cx="419" cy="28" r="4.5" fill="#7c3aed" />
          <circle cx="414" cy="23" r="4.5" fill="#8b5cf6" />
          <circle cx="405" cy="25" r="4" fill="#7c3aed" />
          <circle cx="412" cy="18" r="3.5" fill="#8b5cf6" opacity="0.8" />
          <path d="M412 15 L415 8 Q417 4, 422 3" stroke="var(--bark)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
        </g>

        <g opacity="0.4">
          <circle cx="882" cy="39" r="4" fill="#7c3aed" />
          <circle cx="890" cy="37" r="4" fill="#8b5cf6" />
          <circle cx="886" cy="44" r="4" fill="#7c3aed" />
          <circle cx="878" cy="41" r="3.5" fill="#8b5cf6" />
          <path d="M885 35 L887 28" stroke="var(--bark)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
        </g>

        {/* ═══ BERRIES / BUDS ═══ */}
        <circle cx="100" cy="33" r="2.5" fill="var(--accent)" opacity="0.4" />
        <circle cx="570" cy="31" r="2" fill="var(--accent)" opacity="0.35" />
        <circle cx="860" cy="32" r="2" fill="var(--accent)" opacity="0.35" />
        <circle cx="1060" cy="36" r="2.5" fill="var(--accent)" opacity="0.4" />
      </svg>
    </div>
  );
}
