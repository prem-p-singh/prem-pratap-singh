"use client";

import { useState } from "react";
import { ArrowRight, BrainCircuit, MapPin } from "lucide-react";

type Chapter = {
  id: string;
  period: string;
  title: string;
  place: string;
  prompt: string;
  story: string;
  thread: string;
  markers: string[];
  activeClass: string;
  numberClass: string;
  lineClass: string;
};

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
    activeClass: "border-emerald-400/60 bg-emerald-400/[0.08]",
    numberClass: "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300",
    lineClass: "bg-emerald-400",
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
    activeClass: "border-amber-400/60 bg-amber-400/[0.08]",
    numberClass: "bg-amber-400/15 text-amber-700 dark:text-amber-300",
    lineClass: "bg-amber-400",
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
    activeClass: "border-violet-400/60 bg-violet-400/[0.08]",
    numberClass: "bg-violet-400/15 text-violet-700 dark:text-violet-300",
    lineClass: "bg-violet-400",
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
    activeClass: "border-sky-400/60 bg-sky-400/[0.08]",
    numberClass: "bg-sky-400/15 text-sky-700 dark:text-sky-300",
    lineClass: "bg-sky-400",
  },
];

export default function JourneyChapters() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);
  const active = chapters[activeIndex] ?? chapters[0];

  return (
    <section className="py-16" aria-labelledby="journey-chapters-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Varanasi → Davis → scientific AI
            </p>
            <h2 id="journey-chapters-title" className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Four chapters, one research habit
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Choose a chapter.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 rounded-3xl border border-border bg-card p-5 sm:p-6">
          <div className="text-center">
            <MapPin className="mx-auto size-6 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} aria-hidden="true" />
            <p className="mt-2 text-sm font-bold text-foreground">Varanasi</p>
            <p className="text-xs text-muted-foreground">2012</p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground/50" aria-hidden="true" />
          <div className="text-center">
            <MapPin className="mx-auto size-6 text-violet-600 dark:text-violet-300" strokeWidth={1.7} aria-hidden="true" />
            <p className="mt-2 text-sm font-bold text-foreground">Davis</p>
            <p className="text-xs text-muted-foreground">2023</p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground/50" aria-hidden="true" />
          <div className="text-center">
            <BrainCircuit className="mx-auto size-6 text-sky-600 dark:text-sky-300" strokeWidth={1.7} aria-hidden="true" />
            <p className="mt-2 text-sm font-bold text-foreground">Scientific AI</p>
            <p className="text-xs text-muted-foreground">2025</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative space-y-3" role="tablist" aria-label="Research journey chapters">
            <div className="absolute bottom-6 left-[1.63rem] top-6 w-px bg-border" aria-hidden="true" />
            {chapters.map((chapter, index) => {
              const selected = chapter.id === active.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="journey-chapter-panel"
                  onClick={() => setActiveId(chapter.id)}
                  className={`relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                    selected
                      ? chapter.activeClass
                      : "border-transparent bg-card/50 hover:border-border hover:bg-card"
                  }`}
                >
                  <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${chapter.numberClass}`}>
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {chapter.period}
                    </span>
                    <span className="mt-1 block font-semibold text-foreground">{chapter.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {chapter.place}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <article
            id="journey-chapter-panel"
            role="tabpanel"
            aria-live="polite"
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10"
          >
            <div className={`absolute inset-x-0 top-0 h-1 ${active.lineClass}`} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Chapter {activeIndex + 1} · {active.period}
            </p>
            <p className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {active.prompt}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{active.story}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {active.markers.map((marker) => (
                <span
                  key={marker}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${active.numberClass}`}
                >
                  {marker}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-5">
              <span className={`size-2.5 shrink-0 rounded-full ${active.lineClass}`} />
              <p className="text-sm font-semibold text-foreground">The constant: {active.thread}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
