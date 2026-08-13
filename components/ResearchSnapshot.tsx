import {
  ChartNoAxesCombined,
  Dna,
  FileCheck2,
  FlaskConical,
  ScanSearch,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import SkillsMatrix from "@/components/SkillsMatrix";

const capabilityPillars: Array<{
  title: string;
  description: string;
  methods: string[];
  icon: LucideIcon;
  tone: string;
  surface: string;
  rule: string;
}> = [
  {
    title: "Crop biology",
    description: "Read disease in the plant and design sampling around the biological question.",
    methods: ["Plant pathology", "Field sampling", "Infection assays"],
    icon: Sprout,
    tone: "text-field",
    surface: "bg-field-wash",
    rule: "bg-field",
  },
  {
    title: "Molecular diagnostics",
    description: "Build quantitative assays that move from laboratory validation to field use.",
    methods: ["RT-qPCR", "Digital PCR", "Assay validation"],
    icon: ScanSearch,
    tone: "text-biology",
    surface: "bg-biology-wash",
    rule: "bg-biology",
  },
  {
    title: "Omics & analytical",
    description: "Measure gene activity and chemistry across the same biological system.",
    methods: ["RNA-seq", "GC-MS", "LC-MS/MS"],
    icon: FlaskConical,
    tone: "text-decision",
    surface: "bg-decision-wash",
    rule: "bg-decision",
  },
  {
    title: "Data science",
    description: "Turn complex measurements into reproducible models and interpretable evidence.",
    methods: ["Python & R", "Machine learning", "Statistical modeling"],
    icon: ChartNoAxesCombined,
    tone: "text-data",
    surface: "bg-data-wash",
    rule: "bg-data",
  },
  {
    title: "Research delivery",
    description: "Make the work reusable, reviewable, and clear to collaborators and decision-makers.",
    methods: ["Reproducible pipelines", "SOPs", "Scientific writing"],
    icon: FileCheck2,
    tone: "text-field",
    surface: "bg-field-wash",
    rule: "bg-field",
  },
];

export default function ResearchSnapshot() {
  return (
    <section id="capabilities" data-guided-scroll-section className="guided-scroll-section py-6 sm:py-8" aria-labelledby="research-snapshot-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="section-kicker">Capabilities</p>
            <h2
              id="research-snapshot-title"
              className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.08] text-foreground sm:text-4xl lg:text-5xl"
            >
              Crop biology is my domain. Data science is how I investigate it.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:justify-self-end">
            I connect plant pathology and molecular measurement with computation, statistics, and reproducible research delivery.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {capabilityPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-5"
              >
                <span className={`absolute inset-x-0 top-0 h-1 ${pillar.rule}`} aria-hidden="true" />
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex size-12 items-center justify-center rounded-xl ${pillar.surface} ${pillar.tone}`}>
                    <Icon className="size-6" strokeWidth={1.65} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-tight text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                <ul className="mt-5 border-t border-border pt-3" aria-label={`${pillar.title} methods`}>
                  {pillar.methods.map((method) => (
                    <li key={method} className="flex items-center gap-2 py-1 text-xs font-medium text-foreground/85">
                      <span className={`size-1.5 shrink-0 rounded-full ${pillar.rule}`} aria-hidden="true" />
                      {method}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 border-y border-border py-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 px-1 sm:px-3">
            <Dna className="size-5 shrink-0 text-biology" strokeWidth={1.65} aria-hidden="true" />
            <p className="text-xs leading-snug text-muted-foreground"><strong className="font-semibold text-foreground">Field to molecule</strong><br />Biology defines what to measure.</p>
          </div>
          <div className="flex items-center gap-3 border-border px-1 sm:border-x sm:px-5">
            <ChartNoAxesCombined className="size-5 shrink-0 text-data" strokeWidth={1.65} aria-hidden="true" />
            <p className="text-xs leading-snug text-muted-foreground"><strong className="font-semibold text-foreground">Data to evidence</strong><br />Models connect the measurements.</p>
          </div>
          <div className="flex items-center gap-3 px-1 sm:px-3">
            <Sprout className="size-5 shrink-0 text-field" strokeWidth={1.65} aria-hidden="true" />
            <p className="text-xs leading-snug text-muted-foreground"><strong className="font-semibold text-foreground">Evidence to crop</strong><br />Interpretation returns to the decision.</p>
          </div>
        </div>

        <details id="skills" className="group scroll-mt-24 border-b border-border">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 marker:content-none">
            <span>
              <span className="block text-base font-semibold text-foreground">Open the full capability index</span>
              <span className="mt-1 block text-xs text-muted-foreground">Eight technical domains · 96 methods and research practices</span>
            </span>
            <span className="flex shrink-0 items-center gap-3 text-xs font-semibold text-field">
              08 domains
              <span className="flex size-8 items-center justify-center rounded-full border border-field/35 bg-field-wash text-lg transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </span>
          </summary>
          <div className="pb-10 pt-3">
            <SkillsMatrix />
          </div>
        </details>
      </div>
    </section>
  );
}
