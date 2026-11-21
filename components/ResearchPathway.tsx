"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentType, type KeyboardEvent } from "react";
import {
  AnalysisIcon,
  BenchIcon,
  CropIcon,
  FieldIcon,
  ResearchDeliveryIcon,
  type IconProps,
} from "@/components/icons/PortfolioIcons";

type StageId = "design" | "collect" | "analyse" | "improvement";
type Tone = "field" | "biology" | "data" | "decision";

// Family colours, written out in full so Tailwind can see every class.
const tones: Record<Tone, { tile: string; edge: string; selected: string; link: string }> = {
  field: {
    tile: "bg-field-wash text-field",
    edge: "bg-field",
    selected: "aria-selected:border-field",
    link: "text-field",
  },
  biology: {
    tile: "bg-biology-wash text-biology",
    edge: "bg-biology",
    selected: "aria-selected:border-biology",
    link: "text-biology",
  },
  data: {
    tile: "bg-data-wash text-data",
    edge: "bg-data",
    selected: "aria-selected:border-data",
    link: "text-data",
  },
  decision: {
    tile: "bg-decision-wash text-decision",
    edge: "bg-decision",
    selected: "aria-selected:border-decision",
    link: "text-decision",
  },
};

type Stage = {
  id: StageId;
  /** The step's photograph, a stand-in until the owner's own picture replaces it. */
  image: string;
  imageAlt: string;
  slotAlt: string;
  imagePosition: string;
  label: string;
  cue: string;
  evidence: string;
  translation: string;
  href: string;
  linkLabel: string;
  icon: ComponentType<IconProps>;
  tone: Tone;
};

const stages: Stage[] = [
  {
    id: "design",
    image: "/images/photos/writing-in-a-notebook-with-a-feather-pen-while-enjoying-coff-1920.jpg",
    imageAlt: "Hands writing in a notebook at a desk",
    slotAlt: "Your own picture: a sampling plan, a field map or a lab notebook page",
    imagePosition: "object-[50%_50%]",
    label: "Design the project",
    cue: "Start from the question",
    evidence: "Questions, sampling plans and controls set before the first sample",
    translation: "Define the plant response and the trait worth improving.",
    href: "/#projects",
    linkLabel: "See the research projects",
    icon: ResearchDeliveryIcon,
    tone: "data",
  },
  {
    id: "collect",
    image: "/images/photos/aerial-view-landschaft-markgraflerland1-1920.jpg",
    imageAlt: "Curving rows of vines on terraced hills, seen from above",
    slotAlt: "Your own picture: sampling in a vineyard block",
    imagePosition: "object-[50%_50%]",
    label: "Collect the samples",
    cue: "Observe before measuring",
    evidence: "Field and laboratory samples, tracked from collection to the bench",
    translation: "Capture the plant response where the disease happens.",
    href: "/#experience",
    linkLabel: "See the field program",
    icon: FieldIcon,
    tone: "field",
  },
  {
    id: "analyse",
    image: "/images/photos/csiro-scienceimage-11401-csiro-researcher-with-pipette-1280.jpg",
    imageAlt: "A gloved hand holding a pipette in a dim laboratory",
    slotAlt: "Your own picture: the bench, a dPCR run or a sequencing prep",
    imagePosition: "object-[50%_35%]",
    label: "Measure and analyse",
    cue: "Let biology guide the model",
    evidence: "dPCR, RNA sequencing, metabolites and multi-omics models",
    translation: "Separate strong biological signals from statistical noise.",
    href: "/methods/causal-mediation",
    linkLabel: "Visit the methods lab",
    icon: BenchIcon,
    tone: "biology",
  },
  {
    id: "improvement",
    image: "/images/photos/ripe-zinfandel-grapes-in-dry-creek-valley-8958-1920.jpg",
    imageAlt: "Ripe grapes hanging under red autumn vine leaves",
    slotAlt: "Your own picture: healthy fruit or vines at harvest",
    imagePosition: "object-[50%_60%]",
    label: "Return to the crop",
    cue: "Evidence should change a decision",
    evidence: "Earlier detection, validated assays, and candidate traits",
    translation: "Move useful evidence toward healthier, more resilient crops.",
    href: "/#projects",
    linkLabel: "See the research outcomes",
    icon: CropIcon,
    tone: "decision",
  },
];

const fieldNotes: Array<{
  label: string;
  value: string;
  icon: ComponentType<IconProps>;
  tone: Tone;
}> = [
  { label: "Design", value: "Questions, sampling plans and controls", icon: ResearchDeliveryIcon, tone: "data" },
  { label: "Field", value: "Samples across sites, seasons and growth stages", icon: FieldIcon, tone: "field" },
  { label: "Bench", value: "dPCR, RNA-seq and metabolites", icon: BenchIcon, tone: "biology" },
  {
    label: "Analysis",
    value: "Mechanisms, markers and trait leads",
    icon: AnalysisIcon,
    tone: "data",
  },
];

export default function ResearchPathway() {
  const [activeId, setActiveId] = useState<StageId>("design");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];
  const activeTone = tones[active.tone];

  // Arrow keys, Home and End move focus and selection together, from the focused step.
  // Modified keys are left alone so browser and system shortcuts keep working.
  const moveWithKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const current = tabs.indexOf(event.target as HTMLButtonElement);
    const last = stages.length - 1;
    const forward = current === last ? 0 : current + 1;
    const back = current <= 0 ? last : current - 1;
    const targets: Record<string, number> = {
      ArrowRight: forward,
      ArrowDown: forward,
      ArrowLeft: back,
      ArrowUp: back,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActiveId(stages[next].id);
    tabs[next]?.focus();
  };

  return (
    <section
      id="how-i-work"
      className="guided-scroll-section"
      aria-labelledby="research-pathway-title"
    >
      <div className="shell">
        <div className="grid gap-x-8 gap-y-10 py-[var(--section-gap-s)] lg:grid-cols-12">
          <div className="room-title lg:col-span-12">
            <h2
              id="research-pathway-title"
              className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl"
            >
              <span>Crop improvement is the destination.</span> <span>Data is how I get there.</span>
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              I do not begin with a model. I begin with what changed in the plant.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Davis, California</p>
          </div>

          <div className="lg:col-span-12">
            <div
              role="tablist"
              aria-label="Research pathway"
              onKeyDown={moveWithKeys}
              className="grid border-l border-border md:grid-cols-4 md:border-l-0 md:border-t"
            >
              {stages.map((stage, index) => {
                const tone = tones[stage.tone];
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    id={`research-pathway-tab-${stage.id}`}
                    aria-selected={stage.id === active.id}
                    tabIndex={stage.id === active.id ? 0 : -1}
                    aria-controls="research-pathway-panel"
                    onClick={() => setActiveId(stage.id)}
                    className={`-ml-px flex items-center gap-3 border-l-2 border-transparent py-3 pl-4 text-left text-muted-foreground transition-colors hover:text-foreground aria-selected:text-foreground md:-mt-px md:ml-0 md:flex-col md:items-start md:gap-3 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-4 md:pt-4 ${tone.selected}`}
                  >
                    <span className="figure text-[length:var(--text-2xl)] text-current">{index + 1}</span>
                    <span className="text-sm font-medium leading-snug">{stage.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              id="research-pathway-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`research-pathway-tab-${active.id}`}
              className="mt-10 grid items-center gap-x-8 gap-y-8 lg:grid-cols-12"
            >
              <figure
                key={active.id}
                data-slot={`step-${active.id}`}
                data-alt={active.slotAlt}
                className="relative aspect-[4/3] w-full lg:col-span-6"
              >
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className={`object-cover ${active.imagePosition}`}
                />
              </figure>
              <div className="lg:col-span-5 lg:col-start-8">
                <h3 className="text-[length:var(--text-3xl)] leading-tight">{active.label}</h3>
                <p className="lead mt-3 text-ink-2">{active.cue}</p>

              <dl className="mt-8 grid border-y border-border text-sm leading-normal">
                <div className="py-5">
                  <dt className="text-muted-foreground">Evidence carried forward</dt>
                  <dd className="mt-2 text-base font-medium leading-snug tabular-nums text-foreground">
                    {active.evidence}
                  </dd>
                </div>
                <div className="border-t border-border py-5">
                  <dt className="text-muted-foreground">What it changes</dt>
                  <dd className="mt-2 text-base font-medium leading-snug text-foreground">
                    {active.translation}
                  </dd>
                </div>
              </dl>

              <Link
                href={active.href}
                className={`mt-5 inline-block text-sm font-medium underline underline-offset-4 ${activeTone.link}`}
              >
                {active.linkLabel}
              </Link>
              </div>
            </div>
          </div>

          <dl className="grid gap-x-8 text-sm leading-normal sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {fieldNotes.map((note) => (
              <div key={note.label} className="border-t border-rule py-5">
                <dt className="text-xs font-medium text-muted">{note.label}</dt>
                <dd className="mt-2 text-ink">{note.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
