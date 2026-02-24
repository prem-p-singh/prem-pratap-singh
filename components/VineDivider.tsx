/**
 * Organic vine/branch SVG section divider.
 * Replaces plain border-top lines with a botanical illustration.
 */

interface VineDividerProps {
  flip?: boolean;
  className?: string;
}

export default function VineDivider({ flip = false, className = "" }: VineDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <svg
        className="w-full h-8 sm:h-10 md:h-12"
        viewBox="0 0 1200 48"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Main horizontal vine stem */}
        <path
          d="M0 24 C100 24, 150 18, 250 22 C350 26, 400 20, 500 24 C600 28, 650 16, 750 24 C850 32, 900 20, 1000 24 C1100 28, 1150 24, 1200 24"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.15"
          fill="none"
        />

        {/* Secondary thinner vine */}
        <path
          d="M0 26 C80 22, 160 30, 260 24 C360 18, 420 28, 520 22 C620 16, 680 30, 780 24 C880 18, 940 28, 1040 24 C1120 20, 1160 26, 1200 24"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.08"
          fill="none"
        />

        {/* Leaves along the vine */}
        {/* Leaf 1 */}
        <path
          d="M180 22 C172 14, 160 16, 164 24 C166 30, 176 28, 180 22Z"
          fill="var(--primary)"
          opacity="0.12"
        />
        {/* Leaf 2 */}
        <path
          d="M380 24 C388 16, 400 18, 396 26 C394 32, 384 30, 380 24Z"
          fill="var(--primary)"
          opacity="0.1"
        />
        {/* Leaf 3 — larger */}
        <path
          d="M580 22 C570 12, 554 15, 558 24 C561 32, 574 30, 580 22Z"
          fill="var(--primary)"
          opacity="0.14"
        />
        <path
          d="M580 22 L560 24"
          stroke="var(--primary)"
          strokeWidth="0.5"
          opacity="0.1"
        />
        {/* Leaf 4 */}
        <path
          d="M780 26 C790 18, 802 20, 798 28 C796 34, 786 32, 780 26Z"
          fill="var(--primary)"
          opacity="0.1"
        />
        {/* Leaf 5 */}
        <path
          d="M960 22 C952 14, 940 16, 944 24 C946 30, 956 28, 960 22Z"
          fill="var(--primary)"
          opacity="0.12"
        />

        {/* Spiral tendrils */}
        <path
          d="M300 20 C306 14, 310 18, 306 22 C302 24, 298 20, 302 18"
          stroke="var(--primary)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.1"
        />
        <path
          d="M700 28 C694 22, 690 26, 694 30 C698 32, 702 28, 698 26"
          stroke="var(--primary)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.1"
        />
        <path
          d="M1080 22 C1086 16, 1090 20, 1086 24 C1082 26, 1078 22, 1082 20"
          stroke="var(--primary)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.1"
        />

        {/* Tiny grape clusters */}
        <circle cx="460" cy="20" r="3" fill="var(--primary)" opacity="0.08" />
        <circle cx="466" cy="22" r="3" fill="var(--primary)" opacity="0.08" />
        <circle cx="463" cy="26" r="3" fill="var(--primary)" opacity="0.08" />

        <circle cx="880" cy="28" r="2.5" fill="var(--primary)" opacity="0.07" />
        <circle cx="885" cy="26" r="2.5" fill="var(--primary)" opacity="0.07" />
        <circle cx="882" cy="31" r="2.5" fill="var(--primary)" opacity="0.07" />

        {/* Small dots / buds */}
        <circle cx="120" cy="23" r="1.5" fill="var(--accent)" opacity="0.1" />
        <circle cx="640" cy="21" r="1.5" fill="var(--accent)" opacity="0.1" />
        <circle cx="1020" cy="25" r="1.5" fill="var(--accent)" opacity="0.1" />
      </svg>
    </div>
  );
}
