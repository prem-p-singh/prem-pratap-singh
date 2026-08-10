"use client";

import { useState } from "react";
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

              <div className="mt-7">
                {project.resultStat && (
                  <p className={`text-3xl font-bold tracking-tight ${tone.stat}`}>
                    {project.resultStat}
                  </p>
                )}
                <h3 className="mt-3 text-xl font-bold leading-snug text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.question || project.description}
                </p>
              </div>

              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="mt-6 inline-flex w-full items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                <span>{open ? "Close case file" : "Reveal the case file"}</span>
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
                      The experiment
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                      {project.description}
                    </p>
                  </div>

                  {project.impact && (
                    <div className="rounded-2xl border border-border bg-background/60 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        What changed
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {project.impact}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Skills and tools
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
