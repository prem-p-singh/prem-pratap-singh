"use client";

import { useState, type ComponentType, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import {
  AnalysisIcon,
  BenchIcon,
  CropBiologyIcon,
  CropIcon,
  type IconProps,
} from "@/components/icons/PortfolioIcons";

type Tone = "field" | "biology" | "data" | "decision";

// Family colours, written out in full so Tailwind can see every class.
const tones: Record<Tone, { tile: string; edge: string; selected: string; tag: string }> = {
  field: {
    tile: "bg-field-wash text-field",
    edge: "bg-field",
    selected: "aria-selected:border-field",
    tag: "border-field/20 bg-field-wash text-field",
  },
  biology: {
    tile: "bg-biology-wash text-biology",
    edge: "bg-biology",
    selected: "aria-selected:border-biology",
    tag: "border-biology/20 bg-biology-wash text-biology",
  },
  data: {
    tile: "bg-data-wash text-data",
    edge: "bg-data",
    selected: "aria-selected:border-data",
    tag: "border-data/20 bg-data-wash text-data",
  },
  decision: {
    tile: "bg-decision-wash text-decision",
    edge: "bg-decision",
    selected: "aria-selected:border-decision",
    tag: "border-decision/20 bg-decision-wash text-decision",
  },
};

const iconTile = "flex size-11 shrink-0 items-center justify-center rounded-xl";

type Chapter = {
  id: string;
  period: string;
  title: string;
  place: string;
  prompt: string;
  story: string;
  thread: string;
  markers: string[];
  icon: ComponentType<IconProps>;
  tone: Tone;
};

// Families as the previous design had them: field, biology, decision, data.
const chapters: Chapter[] = [
  {
    id: "foundations",
    period: "2012–2017",
    title: "Learn the whole plant",
    place: "Banaras Hindu University · Varanasi, India",
    prompt: "Botany first. Specialization second.",
    story: "Botany expanded into plant pathology, microbial genetics, biotechnology, and ecology—and a gold medal.",
    thread: "Understand the whole system first.",
    markers: ["B.Sc. Botany", "M.Sc. Gold Medal", "First paper in 2016"],
    icon: CropBiologyIcon,
    tone: "field",
  },
  {
    id: "doctorate",
    period: "2017–2023",
    title: "Build it, then explain it",
    place: "Banaras Hindu University · Varanasi, India",
    prompt: "From plant chemistry to food safety.",
    story: "A plant-based formulation was tested from antimicrobial assay to molecular simulation.",
    thread: "Bench and computation became one workflow.",
    markers: ["Ph.D. Plant Pathology", "6 first-author papers", "Mentored 5+ researchers"],
    icon: BenchIcon,
    tone: "biology",
  },
  {
    id: "vineyard",
    period: "2023–Present",
    title: "Scale the question to vineyards",
    place: "University of California, Davis · Davis, California",
    prompt: "Follow disease from a berry to a block.",
    story: "Commercial vineyards became the laboratory for diagnostics, sequencing, and GRBV modeling.",
    thread: "Observe, measure, model, decide.",
    markers: ["300+ samples", "1.3B+ sequencing reads", "10+ vineyard blocks"],
    icon: CropIcon,
    tone: "decision",
  },
  {
    id: "reasoning",
    period: "2025–Present",
    title: "Make scientific judgment the subject",
    place: "Handshake AI · Remote",
    prompt: "What makes an explanation scientifically reliable?",
    story: "Biological reasoning is checked against published evidence to expose recurring AI failure patterns.",
    thread: "Separate evidence from confidence.",
    markers: ["MOVE Fellow", "Biology-domain evaluation", "Scientific reasoning"],
    icon: AnalysisIcon,
    tone: "data",
  },
];

// A real sequence of places and years, so the arrows stay.
const route: Array<{ place: string; year: string; icon: ComponentType<IconProps>; tone: Tone }> = [
  { place: "Varanasi", year: "2012", icon: CropBiologyIcon, tone: "field" },
  { place: "Davis", year: "2023", icon: CropIcon, tone: "decision" },
  { place: "Scientific AI", year: "2025", icon: AnalysisIcon, tone: "data" },
];

export default function JourneyChapters() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);
  const active = chapters[activeIndex] ?? chapters[0];
  const activeTone = tones[active.tone];
  const ActiveIcon = active.icon;

  // Same handling as the homepage workflow stepper: arrow keys, Home and End move
  // focus and selection together. Modified keys are left to the browser and system.
  const moveWithKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const current = tabs.indexOf(event.target as HTMLButtonElement);
    const last = chapters.length - 1;
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
    setActiveId(chapters[next].id);
    tabs[next]?.focus();
  };

  return (
    <section
      className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24"
      aria-labelledby="journey-chapters-title"
    >
      <div className="lg:col-span-4">
        <p className="section-kicker">From Varanasi to Davis, now evaluating scientific AI</p>
        <h2 id="journey-chapters-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
          Four chapters, one research habit
        </h2>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
          Choose a chapter.
        </p>

        <ol className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
          {route.map((stop, index) => {
            const Icon = stop.icon;
            return (
              <li key={stop.place} className="contents">
                {index > 0 && (
                  <ArrowRight
                    className="size-4 shrink-0 rotate-90 self-center text-muted-foreground sm:rotate-0 lg:rotate-90"
                    aria-hidden="true"
                  />
                )}
                <span className="paper-panel flex flex-1 items-center gap-3 px-4 py-3 text-sm">
                  <span className={`${iconTile} ${tones[stop.tone].tile}`}>
                    <Icon size={22} />
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">{stop.place}</span>
                    <span className="block tabular-nums text-muted-foreground">{stop.year}</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="lg:col-span-8">
        <div
          role="tablist"
          aria-label="Research journey chapters"
          onKeyDown={moveWithKeys}
          className="grid border-l border-border md:grid-cols-4 md:border-l-0 md:border-t"
        >
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;
            const tone = tones[chapter.tone];
            return (
              <button
                key={chapter.id}
                type="button"
                role="tab"
                id={`journey-chapter-tab-${chapter.id}`}
                aria-selected={chapter.id === active.id}
                tabIndex={chapter.id === active.id ? 0 : -1}
                aria-controls="journey-chapter-panel"
                onClick={() => setActiveId(chapter.id)}
                className={`-ml-px flex items-start gap-3 border-l-2 border-transparent py-3 pl-4 text-left text-muted-foreground transition-colors hover:text-foreground aria-selected:text-foreground md:-mt-px md:ml-0 md:flex-col md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-4 md:pt-4 ${tone.selected}`}
              >
                <span className={`${iconTile} ${tone.tile}`}>
                  <Icon size={22} />
                </span>
                <span className="flex flex-col items-start gap-1">
                  <span className="text-xs tabular-nums">
                    {index + 1}
                    <span className="ml-3">{chapter.period}</span>
                  </span>
                  <span className="text-sm font-semibold leading-snug">{chapter.title}</span>
                  <span className="text-xs font-normal text-muted-foreground">{chapter.place}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="journey-chapter-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`journey-chapter-tab-${active.id}`}
          aria-live="polite"
          className="paper-panel mt-8 p-6 sm:p-8"
        >
          <span className={`absolute inset-x-0 top-0 h-1 ${activeTone.edge}`} aria-hidden="true" />
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm tabular-nums text-muted-foreground">
                Chapter {activeIndex + 1} · {active.period}
              </p>
              <h3 className="mt-2 text-2xl leading-tight text-foreground sm:text-3xl">{active.prompt}</h3>
            </div>
            <span className={`${iconTile} ${activeTone.tile}`}>
              <ActiveIcon size={22} />
            </span>
          </div>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-foreground">{active.story}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {active.markers.map((marker) => (
              <li
                key={marker}
                className={`rounded-full border px-3 py-1 text-xs font-semibold tabular-nums ${activeTone.tag}`}
              >
                {marker}
              </li>
            ))}
          </ul>

          <dl className="mt-6 divide-y divide-border border-t border-border text-sm leading-normal">
            <div className="grid gap-x-4 gap-y-1 py-4 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold text-foreground">Place</dt>
              <dd className="text-muted-foreground">{active.place}</dd>
            </div>
            <div className="grid gap-x-4 gap-y-1 pt-4 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold text-foreground">The constant</dt>
              <dd className="text-muted-foreground">{active.thread}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
