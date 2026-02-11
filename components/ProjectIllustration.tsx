interface Props {
  projectIndex: number;
}

export default function ProjectIllustration({ projectIndex }: Props) {
  const illustrations = [
    // 0: GRBV Impact on Wine Quality - grapevine + wine glass
    <svg key={0} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg0" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4c1d95" stopOpacity="0.15" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#bg0)" />
      {/* Vine branch */}
      <path d="M40 160 Q80 80 160 100 Q200 110 220 70" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M160 100 Q170 60 140 40" stroke="#059669" strokeWidth="2" fill="none" />
      <path d="M100 120 Q110 80 90 60" stroke="#059669" strokeWidth="2" fill="none" />
      {/* Grape cluster */}
      <circle cx="145" cy="38" r="8" fill="#7c3aed" opacity="0.7" />
      <circle cx="158" cy="42" r="8" fill="#6d28d9" opacity="0.7" />
      <circle cx="135" cy="48" r="8" fill="#8b5cf6" opacity="0.6" />
      <circle cx="150" cy="55" r="8" fill="#7c3aed" opacity="0.7" />
      <circle cx="163" cy="55" r="8" fill="#6d28d9" opacity="0.6" />
      {/* Leaf */}
      <ellipse cx="85" cy="55" rx="18" ry="12" fill="#059669" opacity="0.5" transform="rotate(-30 85 55)" />
      {/* Wine glass */}
      <path d="M300 50 L280 110 Q290 115 300 115 Q310 115 320 110 L300 50Z" fill="#7c3aed" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="300" y1="115" x2="300" y2="155" stroke="#7c3aed" strokeWidth="2" />
      <line x1="280" y1="155" x2="320" y2="155" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      {/* DNA helix hint */}
      <path d="M340 30 Q355 60 340 90 Q325 120 340 150" stroke="#007bff" strokeWidth="1.5" opacity="0.3" fill="none" />
      <path d="M360 30 Q345 60 360 90 Q375 120 360 150" stroke="#007bff" strokeWidth="1.5" opacity="0.3" fill="none" />
      <line x1="342" y1="45" x2="358" y2="45" stroke="#007bff" strokeWidth="1" opacity="0.2" />
      <line x1="338" y1="75" x2="362" y2="75" stroke="#007bff" strokeWidth="1" opacity="0.2" />
      <line x1="342" y1="105" x2="358" y2="105" stroke="#007bff" strokeWidth="1" opacity="0.2" />
      <line x1="338" y1="135" x2="362" y2="135" stroke="#007bff" strokeWidth="1" opacity="0.2" />
    </svg>,

    // 1: GRBV Quantification Assays - PCR / lab equipment
    <svg key={1} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0369a1" stopOpacity="0.12" />
          <stop offset="1" stopColor="#0ea5e9" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#bg1)" />
      {/* PCR machine outline */}
      <rect x="50" y="60" width="100" height="80" rx="8" stroke="#0369a1" strokeWidth="2" opacity="0.4" />
      <rect x="60" y="70" width="80" height="40" rx="4" fill="#0ea5e9" opacity="0.15" />
      {/* Well plate dots */}
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <circle key={`w${r}${c}`} cx={70 + c * 14} cy={78 + r * 8} r="3" fill="#0369a1" opacity={0.2 + Math.random() * 0.4} />
        ))
      )}
      {/* Bar chart / amplification curve */}
      <path d="M200 160 L220 155 L240 140 L260 100 L280 60 L300 55 L320 54 L340 53" stroke="#007bff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M200 160 L220 155 L240 140 L260 100 L280 60 L300 55 L320 54 L340 53 L340 160Z" fill="#007bff" opacity="0.08" />
      {/* Axes */}
      <line x1="195" y1="40" x2="195" y2="165" stroke="#0369a1" strokeWidth="1.5" opacity="0.3" />
      <line x1="195" y1="165" x2="350" y2="165" stroke="#0369a1" strokeWidth="1.5" opacity="0.3" />
      {/* Ct threshold line */}
      <line x1="195" y1="80" x2="350" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <text x="352" y="84" fill="#ef4444" fontSize="10" opacity="0.5">Ct</text>
    </svg>,

    // 2: Nano-encapsulated Antifungal - nanoparticle + fungus
    <svg key={2} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg2" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" stopOpacity="0.12" />
          <stop offset="1" stopColor="#10b981" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="nano" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="url(#bg2)" />
      {/* Large nanoparticle */}
      <circle cx="120" cy="100" r="55" fill="url(#nano)" stroke="#059669" strokeWidth="2" opacity="0.6" />
      <circle cx="120" cy="100" r="40" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      {/* Inner essential oil droplets */}
      <circle cx="105" cy="90" r="8" fill="#f59e0b" opacity="0.4" />
      <circle cx="130" cy="85" r="6" fill="#f59e0b" opacity="0.3" />
      <circle cx="115" cy="110" r="7" fill="#f59e0b" opacity="0.35" />
      <circle cx="135" cy="105" r="5" fill="#f59e0b" opacity="0.3" />
      {/* Chitosan shell dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={`ch${i}`}
          cx={120 + 55 * Math.cos((i * Math.PI * 2) / 12)}
          cy={100 + 55 * Math.sin((i * Math.PI * 2) / 12)}
          r="3"
          fill="#059669"
          opacity="0.5"
        />
      ))}
      {/* Aspergillus hyphae (crossed out) */}
      <path d="M260 140 Q280 100 300 110 Q320 120 330 80 Q340 50 360 60" stroke="#6b7280" strokeWidth="2" opacity="0.3" fill="none" />
      <path d="M270 150 Q290 130 300 110" stroke="#6b7280" strokeWidth="1.5" opacity="0.2" fill="none" />
      <circle cx="360" cy="60" r="10" stroke="#6b7280" strokeWidth="1" opacity="0.2" fill="#6b7280" fillOpacity="0.1" />
      {/* Inhibition X */}
      <line x1="290" y1="70" x2="340" y2="140" stroke="#ef4444" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
      <line x1="340" y1="70" x2="290" y2="140" stroke="#ef4444" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
    </svg>,

    // 3: Multi-omics Biomarker Discovery - data integration
    <svg key={3} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg3" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dc2626" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#007bff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#059669" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#bg3)" />
      {/* Three overlapping circles (Venn diagram) */}
      <circle cx="140" cy="90" r="50" fill="#dc2626" fillOpacity="0.1" stroke="#dc2626" strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="190" cy="90" r="50" fill="#007bff" fillOpacity="0.1" stroke="#007bff" strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="165" cy="130" r="50" fill="#059669" fillOpacity="0.1" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Labels */}
      <text x="115" y="75" fill="#dc2626" fontSize="10" fontWeight="600" opacity="0.6">GC-MS</text>
      <text x="185" y="75" fill="#007bff" fontSize="10" fontWeight="600" opacity="0.6">RNA-Seq</text>
      <text x="135" y="160" fill="#059669" fontSize="10" fontWeight="600" opacity="0.6">LC-MS/MS</text>
      {/* Center star / biomarker */}
      <circle cx="165" cy="100" r="8" fill="#f59e0b" opacity="0.5" />
      <circle cx="165" cy="100" r="4" fill="#f59e0b" opacity="0.8" />
      {/* Arrow to results */}
      <path d="M220 100 L280 100" stroke="#007bff" strokeWidth="2" markerEnd="url(#arrow)" opacity="0.4" />
      <polygon points="280,95 290,100 280,105" fill="#007bff" opacity="0.4" />
      {/* Heatmap grid */}
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`h${r}${c}`}
            x={300 + c * 22}
            y={50 + r * 22}
            width="18"
            height="18"
            rx="2"
            fill={["#dc2626", "#f59e0b", "#059669", "#007bff"][(r + c) % 4]}
            opacity={0.15 + ((r * 4 + c) % 5) * 0.08}
          />
        ))
      )}
    </svg>,

    // 4: Sustained-Release Delivery System - time release / capsule
    <svg key={4} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg4" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" stopOpacity="0.1" />
          <stop offset="1" stopColor="#059669" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#bg4)" />
      {/* Large capsule */}
      <rect x="60" y="65" width="120" height="70" rx="35" fill="#059669" fillOpacity="0.15" stroke="#059669" strokeWidth="2" strokeOpacity="0.4" />
      <line x1="120" y1="65" x2="120" y2="135" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
      {/* Particles releasing */}
      <circle cx="190" cy="80" r="4" fill="#f59e0b" opacity="0.6" />
      <circle cx="205" cy="95" r="3" fill="#f59e0b" opacity="0.5" />
      <circle cx="195" cy="115" r="3.5" fill="#f59e0b" opacity="0.4" />
      <circle cx="215" cy="85" r="2.5" fill="#f59e0b" opacity="0.35" />
      <circle cx="225" cy="105" r="2" fill="#f59e0b" opacity="0.3" />
      <circle cx="210" cy="125" r="2.5" fill="#f59e0b" opacity="0.25" />
      {/* Timeline / sustained release curve */}
      <line x1="250" y1="160" x2="380" y2="160" stroke="#6b7280" strokeWidth="1.5" opacity="0.3" />
      <line x1="250" y1="40" x2="250" y2="160" stroke="#6b7280" strokeWidth="1.5" opacity="0.3" />
      {/* Sustained line */}
      <path d="M255 60 Q270 65 290 70 Q320 80 350 85 Q370 90 380 92" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Burst release comparison (dashed) */}
      <path d="M255 50 Q270 80 290 120 Q310 145 380 155" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.4" />
      {/* Labels */}
      <text x="355" y="80" fill="#059669" fontSize="9" fontWeight="500" opacity="0.6">60 days</text>
      <text x="255" y="175" fill="#6b7280" fontSize="9" opacity="0.4">Time</text>
    </svg>,

    // 5: Antifungal Mechanism Elucidation - molecular / cell membrane
    <svg key={5} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg5" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" stopOpacity="0.1" />
          <stop offset="1" stopColor="#007bff" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#bg5)" />
      {/* Cell membrane phospholipid bilayer */}
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={`pl${i}`}>
          <circle cx={40 + i * 25} cy="95" r="5" fill="#007bff" opacity="0.3" />
          <line x1={40 + i * 25} y1="100" x2={38 + i * 25} y2="125" stroke="#007bff" strokeWidth="1.5" opacity="0.2" />
          <line x1={40 + i * 25} y1="100" x2={42 + i * 25} y2="125" stroke="#007bff" strokeWidth="1.5" opacity="0.2" />
          <circle cx={40 + i * 25} cy="130" r="5" fill="#007bff" opacity="0.3" />
          <line x1={40 + i * 25} y1="135" x2={38 + i * 25} y2="158" stroke="#007bff" strokeWidth="1.5" opacity="0.2" />
          <line x1={40 + i * 25} y1="135" x2={42 + i * 25} y2="158" stroke="#007bff" strokeWidth="1.5" opacity="0.2" />
        </g>
      ))}
      {/* Disruption zone */}
      <ellipse cx="200" cy="112" rx="35" ry="40" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.3" />
      {/* ROS / oxidative stress symbols */}
      <text x="185" y="105" fill="#ef4444" fontSize="14" fontWeight="700" opacity="0.4">O</text>
      <text x="198" y="100" fill="#ef4444" fontSize="8" opacity="0.3">-</text>
      <text x="205" y="120" fill="#ef4444" fontSize="11" fontWeight="600" opacity="0.3">ROS</text>
      {/* Molecule structure hint */}
      <circle cx="60" cy="40" r="6" fill="#7c3aed" opacity="0.3" />
      <circle cx="85" cy="30" r="6" fill="#7c3aed" opacity="0.3" />
      <circle cx="75" cy="55" r="6" fill="#059669" opacity="0.3" />
      <line x1="60" y1="40" x2="85" y2="30" stroke="#7c3aed" strokeWidth="1.5" opacity="0.3" />
      <line x1="60" y1="40" x2="75" y2="55" stroke="#7c3aed" strokeWidth="1.5" opacity="0.3" />
      <line x1="85" y1="30" x2="75" y2="55" stroke="#7c3aed" strokeWidth="1.5" opacity="0.3" />
      {/* Gene expression arrow */}
      <path d="M310 40 L310 70 L340 55 Z" fill="#059669" opacity="0.2" />
      <path d="M310 75 L310 105 L280 90 Z" fill="#ef4444" opacity="0.2" />
      <text x="348" y="60" fill="#059669" fontSize="9" opacity="0.5">Up</text>
      <text x="255" y="95" fill="#ef4444" fontSize="9" opacity="0.5">Down</text>
    </svg>,
  ];

  return (
    <div className="h-48 overflow-hidden flex items-center justify-center">
      {illustrations[projectIndex] || illustrations[0]}
    </div>
  );
}
