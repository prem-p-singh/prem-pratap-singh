import type { ComponentType } from "react";
import SkillsMatrix from "@/components/SkillsMatrix";
import {
  CropBiologyIcon,
  DataScienceIcon,
  DiagnosticsIcon,
  OmicsIcon,
  ResearchDeliveryIcon,
  type IconProps,
} from "@/components/icons/PortfolioIcons";

type Tone = "field" | "biology" | "data" | "decision";

const capabilityPillars: Array<{
  title: string;
  description: string;
  methods: string[];
  icon: ComponentType<IconProps>;
  tone: Tone;
}> = [
  {
    title: "Crop biology",
    description: "Read disease in the plant and design sampling around the biological question.",
    methods: ["Plant pathology", "Field sampling", "Infection assays"],
    icon: CropBiologyIcon,
    tone: "field",
  },
  {
    title: "Molecular diagnostics",
    description: "Build quantitative assays that move from laboratory validation to field use.",
    methods: ["RT-qPCR", "Digital PCR", "Assay validation"],
    icon: DiagnosticsIcon,
    tone: "biology",
  },
  {
    title: "Omics & analytical",
    description: "Measure gene activity and chemistry across the same biological system.",
    methods: ["RNA-seq", "GC-MS", "LC-MS/MS"],
    icon: OmicsIcon,
    tone: "decision",
  },
  {
    title: "Data science",
    description: "Turn complex measurements into reproducible models and interpretable evidence.",
    methods: ["Python & R", "Machine learning", "Statistical modeling"],
    icon: DataScienceIcon,
    tone: "data",
  },
  {
    title: "Research delivery",
    description: "Make the work reusable, reviewable, and clear to collaborators and decision-makers.",
    methods: ["Reproducible pipelines", "SOPs", "Scientific writing"],
    icon: ResearchDeliveryIcon,
    tone: "field",
  },
];

export default function ResearchSnapshot() {
  return (
    <section
      id="capabilities"
      className="guided-scroll-section"
      aria-labelledby="research-snapshot-title"
    >
      <div className="shell">
        <div className="grid gap-x-8 gap-y-10 py-[var(--section-gap-s)] lg:grid-cols-12">
          <div className="room-title lg:col-span-12">
            <h2
              id="research-snapshot-title"
              className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl"
            >
              <span>Crop biology is my domain.</span> <span>Data science is how I investigate it.</span>
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              I connect plant pathology and molecular measurement with computation, statistics, and reproducible research delivery.
            </p>
          </div>

          {/* A field guide: the capability in Prata, what it does, then its methods, on ruled rows. */}
          <ul className="index-list lg:col-span-12">
            {capabilityPillars.map((pillar) => (
              <li key={pillar.title} className="grid gap-x-8 gap-y-3 py-7 lg:grid-cols-12 lg:items-baseline">
                <h3 className="text-[length:var(--text-2xl)] leading-tight lg:col-span-4">{pillar.title}</h3>
                <p className="max-w-[46ch] text-ink-2 lg:col-span-5">{pillar.description}</p>
                <ul
                  className="grid gap-1 text-xs font-medium text-muted lg:col-span-3"
                  aria-label={`${pillar.title} methods`}
                >
                  {pillar.methods.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <details id="skills" className="scroll-mt-24 lg:col-span-12">
            <summary className="cursor-pointer list-none text-sm text-muted-foreground marker:content-none lg:grid lg:grid-cols-12 lg:gap-x-8">
              <span className="block lg:col-span-12">
                Eight technical domains, 96 methods and research practices.{" "}
                <span className="font-medium text-ink underline decoration-accent underline-offset-4">
                  Open the full capability index
                </span>
              </span>
            </summary>
            <div className="pt-8">
              <SkillsMatrix />
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
