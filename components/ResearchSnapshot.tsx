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

const capabilityPillars: Array<{
  title: string;
  description: string;
  methods: string[];
  icon: ComponentType<IconProps>;
}> = [
  {
    title: "Crop biology",
    description: "Read disease in the plant and design sampling around the biological question.",
    methods: ["Plant pathology", "Field sampling", "Infection assays"],
    icon: CropBiologyIcon,
  },
  {
    title: "Molecular diagnostics",
    description: "Build quantitative assays that move from laboratory validation to field use.",
    methods: ["RT-qPCR", "Digital PCR", "Assay validation"],
    icon: DiagnosticsIcon,
  },
  {
    title: "Omics & analytical",
    description: "Measure gene activity and chemistry across the same biological system.",
    methods: ["RNA-seq", "GC-MS", "LC-MS/MS"],
    icon: OmicsIcon,
  },
  {
    title: "Data science",
    description: "Turn complex measurements into reproducible models and interpretable evidence.",
    methods: ["Python & R", "Machine learning", "Statistical modeling"],
    icon: DataScienceIcon,
  },
  {
    title: "Research delivery",
    description: "Make the work reusable, reviewable, and clear to collaborators and decision-makers.",
    methods: ["Reproducible pipelines", "SOPs", "Scientific writing"],
    icon: ResearchDeliveryIcon,
  },
];

export default function ResearchSnapshot() {
  return (
    <section
      id="capabilities"
      data-guided-scroll-section
      className="guided-scroll-section"
      aria-labelledby="research-snapshot-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="section-kicker">Capabilities</p>
            <h2
              id="research-snapshot-title"
              className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl xl:text-5xl"
            >
              Crop biology is my domain. Data science is how I investigate it.
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              I connect plant pathology and molecular measurement with computation, statistics, and reproducible research delivery.
            </p>
          </div>

          <ul className="lg:col-span-8">
            {capabilityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <li
                  key={pillar.title}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-4 gap-y-2 border-t border-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[1.5rem_12rem_1fr]"
                >
                  <Icon className="text-muted-foreground" />
                  {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
                  <h3 className="font-sans! text-base font-semibold leading-relaxed text-foreground">
                    {pillar.title}
                  </h3>
                  <div className="col-start-2 sm:col-start-3">
                    <p className="max-w-[60ch] text-base leading-relaxed text-foreground">
                      {pillar.description}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{pillar.methods.join(", ")}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <details id="skills" className="scroll-mt-24 lg:col-span-12">
            <summary className="cursor-pointer list-none text-sm text-muted-foreground marker:content-none lg:grid lg:grid-cols-12 lg:gap-x-8">
              <span className="lg:col-span-8 lg:col-start-5">
                Eight technical domains, 96 methods and research practices.{" "}
                <span className="text-accent underline underline-offset-4">
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
