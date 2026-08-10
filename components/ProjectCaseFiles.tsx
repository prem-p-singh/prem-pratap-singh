"use client";

import { useState } from "react";
import { Database, Sprout, Target } from "lucide-react";
import type { Project } from "@/components/ProjectCard";

const tones = [
  {
    border: "border-violet-400/50",
    badge: "bg-violet-400/15 text-violet-700 dark:text-violet-300",
    stat: "text-violet-700 dark:text-violet-300",
    wash: "from-violet-400/[0.10]",
  },
  {
    border: "border-emerald-400/50",
    badge: "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300",
    stat: "text-emerald-700 dark:text-emerald-300",
    wash: "from-emerald-400/[0.10]",
  },
  {
    border: "border-orange-400/50",
    badge: "bg-orange-400/15 text-orange-700 dark:text-orange-300",
    stat: "text-orange-700 dark:text-orange-300",
    wash: "from-orange-400/[0.10]",
  },
  {
    border: "border-sky-400/50",
    badge: "bg-sky-400/15 text-sky-700 dark:text-sky-300",
    stat: "text-sky-700 dark:text-sky-300",
    wash: "from-sky-400/[0.10]",
  },
  {
    border: "border-amber-400/50",
    badge: "bg-amber-400/15 text-amber-700 dark:text-amber-300",
    stat: "text-amber-700 dark:text-amber-300",
    wash: "from-amber-400/[0.10]",
  },
  {
    border: "border-rose-400/50",
    badge: "bg-rose-400/15 text-rose-700 dark:text-rose-300",
    stat: "text-rose-700 dark:text-rose-300",
    wash: "from-rose-400/[0.10]",
  },
];

export default function ProjectCaseFiles({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => {
        const open = openIndex === index;
        const tone = tones[index % tones.length];
        const panelId = `project-case-${index}`;
        const dataRoute = project.tech.slice(0, 2).join(" + ");

        return (
          <article
            key={project.title}
            className={`relative overflow-hidden rounded-3xl border bg-card transition-all ${
              open ? `${tone.border} shadow-xl` : "border-border hover:-translate-y-1 hover:border-muted-foreground/50"
            }`}
          >
            <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${tone.wash} to-transparent pointer-events-none`} />
            <div className="relative flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${tone.badge}`}>
                  {project.category || "Research"}
                </span>
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold leading-snug text-foreground">
                  {project.title}
                </h3>
                <div className="mt-5 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center" aria-label="Crop question to research result">
                  <div className="flex min-h-28 flex-col justify-between rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-3">
                    <Sprout className="size-5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
                    <div className="mt-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Crop context</p>
                      <p className="mt-1 text-xs font-bold leading-tight text-foreground">{project.category || "Plant system"}</p>
                    </div>
                  </div>
                  <span className="hidden text-center text-muted-foreground/40 sm:block" aria-hidden="true">→</span>
                  <div className="flex min-h-28 flex-col justify-between rounded-2xl border border-sky-400/25 bg-sky-400/[0.07] p-3">
                    <Database className="size-5 text-sky-600 dark:text-sky-300" aria-hidden="true" />
                    <div className="mt-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Data route</p>
                      <p className="mt-1 text-xs font-bold leading-tight text-foreground">{dataRoute}</p>
                    </div>
                  </div>
                  <span className="hidden text-center text-muted-foreground/40 sm:block" aria-hidden="true">→</span>
                  <div className={`flex min-h-28 flex-col justify-between rounded-2xl border ${tone.border} bg-background/60 p-3`}>
                    <Target className={`size-5 ${tone.stat}`} aria-hidden="true" />
                    <div className="mt-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Crop value</p>
                      <p className={`mt-1 text-lg font-black leading-tight ${tone.stat}`}>
                        {project.resultStat || "Evidence"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="mt-6 inline-flex w-full items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                <span>{open ? "Close details" : "Open details"}</span>
                <span className={`text-lg transition-transform ${open ? "rotate-45" : ""}`} aria-hidden="true">
                  +
                </span>
              </button>

              <div
                id={panelId}
                hidden={!open}
                className="mt-5 border-t border-border pt-5"
              >
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Crop question
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                      {project.question || project.description}
                    </p>
                  </div>

                  {project.question && (
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Study design
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        {project.description}
                      </p>
                    </div>
                  )}

                  {project.impact && (
                    <div className="rounded-2xl border border-border bg-background/60 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Data → crop value
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {project.impact}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Working toolkit
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {[...(project.skills ?? []), ...project.tech].map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {((project.papers && project.papers.length > 0) || project.links?.github) && (
                    <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                      {project.papers?.map((paper) => (
                        <a
                          key={paper.url}
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                        >
                          {paper.label} ↗
                        </a>
                      ))}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                        >
                          Analysis code ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
