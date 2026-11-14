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

// Family colours, written out in full so Tailwind can see every class.
const tones: Record<Tone, { tile: string; edge: string; tag: string }> = {
  field: {
    tile: "bg-field-wash text-field",
    edge: "bg-field",
    tag: "border-field/20 bg-field-wash text-field",
  },
  biology: {
    tile: "bg-biology-wash text-biology",
    edge: "bg-biology",
    tag: "border-biology/20 bg-biology-wash text-biology",
  },
  data: {
    tile: "bg-data-wash text-data",
    edge: "bg-data",
    tag: "border-data/20 bg-data-wash text-data",
  },
  decision: {
    tile: "bg-decision-wash text-decision",
    edge: "bg-decision",
    tag: "border-decision/20 bg-decision-wash text-decision",
  },
};

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
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 border-t border-border py-10 lg:grid-cols-12 lg:py-14">
          <div className="room-title lg:col-span-12">
            <p className="section-kicker">Capabilities</p>
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

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-12">
            {capabilityPillars.map((pillar) => {
              const Icon = pillar.icon;
              const tone = tones[pillar.tone];
              return (
                <li
                  key={pillar.title}
                  className="paper-panel flex flex-col p-6 sm:last:col-span-2"
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-2xl leading-tight text-foreground sm:text-3xl">{pillar.title}</h3>
                    <span className={`icon-stamp ${tone.tile}`}>
                      <Icon size={22} />
                    </span>
                  </div>
                  <p className="mb-6 mt-3 max-w-[52ch] text-base leading-relaxed text-foreground">
                    {pillar.description}
                  </p>
                  <ul
                    className="mt-auto flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-4 text-sm font-semibold text-muted-foreground"
                    aria-label={`${pillar.title} methods`}
                  >
                    {pillar.methods.map((method) => (
                      <li key={method}>{method}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <details id="skills" className="scroll-mt-24 lg:col-span-12">
            <summary className="cursor-pointer list-none text-sm text-muted-foreground marker:content-none lg:grid lg:grid-cols-12 lg:gap-x-8">
              <span className="paper-panel block px-6 py-4 lg:col-span-12">
                Eight technical domains, 96 methods and research practices.{" "}
                <span className="font-semibold text-field underline underline-offset-4">
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
