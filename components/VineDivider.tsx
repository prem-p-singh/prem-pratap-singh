/**
 * Thick, woody grapevine branch section divider.
 * A textured brown/bark vine with knots, small branches, tendrils and leaves.
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
        className="w-full h-12 sm:h-14 md:h-16"
        viewBox="0 0 1200 64"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* ── Thick woody main branch ── */}
        {/* Bark shadow / outer edge */}
        <path
          d="M-10 34 C80 30, 140 38, 250 32 C340 27, 400 36, 520 33 C620 30, 680 38, 800 32 C900 27, 960 36, 1060 33 C1140 30, 1180 34, 1210 32"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.08"
          fill="none"
        />
        {/* Main branch — thick woody center */}
        <path
          d="M-10 33 C80 29, 140 37, 250 31 C340 26, 400 35, 520 32 C620 29, 680 37, 800 31 C900 26, 960 35, 1060 32 C1140 29, 1180 33, 1210 31"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.18"
          fill="none"
        />
        {/* Bark highlight — inner lighter line */}
        <path
          d="M-10 32 C80 28, 140 36, 250 30 C340 25, 400 34, 520 31 C620 28, 680 36, 800 30 C900 25, 960 34, 1060 31 C1140 28, 1180 32, 1210 30"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.25"
          fill="none"
        />

        {/* ── Bark texture — tiny strokes along the branch ── */}
        {[60, 150, 230, 330, 440, 560, 650, 740, 830, 920, 1010, 1100].map((x, i) => (
          <line
            key={`bark-${x}`}
            x1={x}
            y1={29 + (i % 3) * 2}
            x2={x + 8}
            y2={31 + (i % 2) * 3}
            stroke="var(--primary)"
            strokeWidth="1"
            opacity="0.1"
            strokeLinecap="round"
          />
        ))}

        {/* ── Knots / wood bumps ── */}
        <ellipse cx="280" cy="31" rx="5" ry="4" fill="var(--primary)" opacity="0.12" />
        <ellipse cx="620" cy="32" rx="6" ry="4.5" fill="var(--primary)" opacity="0.1" />
        <ellipse cx="950" cy="32" rx="5" ry="3.5" fill="var(--primary)" opacity="0.1" />

        {/* ── Small side branches ── */}
        {/* Branch going up-left */}
        <path
          d="M200 30 C192 22, 180 18, 172 14"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.15"
          fill="none"
        />
        <path
          d="M200 30 C192 22, 180 18, 172 14"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.22"
          fill="none"
        />

        {/* Branch going down-right */}
        <path
          d="M480 33 C490 40, 498 46, 508 50"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.14"
          fill="none"
        />
        <path
          d="M480 33 C490 40, 498 46, 508 50"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.2"
          fill="none"
        />

        {/* Branch going up-right */}
        <path
          d="M760 30 C770 22, 782 16, 794 12"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.14"
          fill="none"
        />
        <path
          d="M760 30 C770 22, 782 16, 794 12"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.2"
          fill="none"
        />

        {/* Branch going down-left */}
        <path
          d="M1020 33 C1010 42, 1004 48, 996 52"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.13"
          fill="none"
        />

        {/* ── Grapevine leaves (five-lobed shape) ── */}
        {/* Leaf 1 — hanging from upper-left branch */}
        <g opacity="0.2" transform="translate(158, 6) rotate(-15)">
          <path
            d="M0 12 C-4 4, 0 -2, 6 0 C10 -2, 16 0, 18 6 C22 4, 26 8, 24 14 C28 16, 26 22, 20 22 C18 26, 12 26, 10 22 C4 24, -2 20, 0 12Z"
            fill="var(--primary)"
          />
          <path d="M12 2 L12 24 M12 8 L6 4 M12 8 L18 4 M12 14 L4 12 M12 14 L20 12 M12 20 L8 22 M12 20 L16 22" stroke="var(--primary)" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Leaf 2 — on the right side branch */}
        <g opacity="0.18" transform="translate(788, 2) rotate(20)">
          <path
            d="M0 10 C-3 4, 0 -1, 5 0 C8 -1, 12 0, 14 5 C17 3, 20 6, 18 11 C21 13, 20 18, 16 18 C14 21, 10 21, 8 18 C4 20, -1 16, 0 10Z"
            fill="var(--primary)"
          />
          <path d="M10 1 L10 20 M10 6 L5 3 M10 6 L15 3 M10 12 L3 10 M10 12 L17 10" stroke="var(--primary)" strokeWidth="0.4" opacity="0.4" />
        </g>

        {/* Leaf 3 — below the vine center-left */}
        <g opacity="0.16" transform="translate(500, 44) rotate(10)">
          <path
            d="M0 8 C-3 3, 0 -1, 4 0 C7 -1, 10 0, 12 4 C14 3, 17 5, 15 9 C18 10, 16 14, 13 14 C12 17, 8 17, 7 14 C3 16, -1 13, 0 8Z"
            fill="var(--primary)"
          />
          <path d="M8 1 L8 16 M8 5 L4 2 M8 5 L12 2 M8 10 L2 8 M8 10 L14 8" stroke="var(--primary)" strokeWidth="0.4" opacity="0.4" />
        </g>

        {/* Leaf 4 — small near right end */}
        <g opacity="0.15" transform="translate(1090, 24) rotate(-25)">
          <path
            d="M0 7 C-2 2, 0 -1, 4 0 C6 -1, 8 0, 9 3 C11 2, 13 4, 12 7 C14 8, 12 11, 10 11 C9 13, 6 13, 5 11 C3 12, 0 10, 0 7Z"
            fill="var(--primary)"
          />
        </g>

        {/* ── Spiral tendrils ── */}
        <path
          d="M340 28 C346 18, 354 16, 356 22 C358 28, 350 30, 348 24 C346 18, 352 14, 358 18"
          stroke="var(--primary)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.18"
        />
        <path
          d="M700 28 C692 18, 684 16, 682 22 C680 28, 688 30, 690 24 C692 18, 686 14, 680 18"
          stroke="var(--primary)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.16"
        />
        <path
          d="M1140 30 C1146 20, 1154 18, 1156 24 C1158 30, 1150 32, 1148 26"
          stroke="var(--primary)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.14"
        />

        {/* ── Tiny grape clusters ── */}
        <g opacity="0.14">
          <circle cx="410" cy="28" r="4" fill="var(--primary)" />
          <circle cx="418" cy="26" r="4" fill="var(--primary)" />
          <circle cx="414" cy="22" r="4" fill="var(--primary)" />
          <circle cx="406" cy="24" r="3.5" fill="var(--primary)" />
          <circle cx="412" cy="18" r="3" fill="var(--primary)" opacity="0.7" />
          {/* Tiny stem */}
          <path d="M412 16 L414 10 Q416 6, 420 5" stroke="var(--primary)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        <g opacity="0.12">
          <circle cx="880" cy="36" r="3.5" fill="var(--primary)" />
          <circle cx="887" cy="34" r="3.5" fill="var(--primary)" />
          <circle cx="883" cy="40" r="3.5" fill="var(--primary)" />
          <circle cx="876" cy="38" r="3" fill="var(--primary)" />
          <path d="M882 32 L884 26" stroke="var(--primary)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        {/* ── Small buds / berries ── */}
        <circle cx="100" cy="31" r="2" fill="var(--accent)" opacity="0.15" />
        <circle cx="570" cy="29" r="2" fill="var(--accent)" opacity="0.12" />
        <circle cx="860" cy="30" r="1.5" fill="var(--accent)" opacity="0.12" />
        <circle cx="1060" cy="33" r="2" fill="var(--accent)" opacity="0.14" />
      </svg>
    </div>
  );
}
