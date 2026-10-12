"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Project } from "@/components/ProjectCard";

// Family colours, written out in full so Tailwind can see every class.
const tones = {
  field: {
    edge: "bg-field",
    text: "text-field",
    wash: "bg-field-wash",
    tag: "border-field/20 bg-field-wash text-field",
  },
  biology: {
    edge: "bg-biology",
    text: "text-biology",
    wash: "bg-biology-wash",
    tag: "border-biology/20 bg-biology-wash text-biology",
  },
  data: {
    edge: "bg-data",
    text: "text-data",
    wash: "bg-data-wash",
    tag: "border-data/20 bg-data-wash text-data",
  },
  decision: {
    edge: "bg-decision",
    text: "text-decision",
    wash: "bg-decision-wash",
    tag: "border-decision/20 bg-decision-wash text-decision",
  },
};

// One family per project category, keyed on the strings in profile/projects.ts.
// A category that is not listed falls back to field.
const categoryTones: Record<string, keyof typeof tones> = {
  "Vineyard systems": "field",
  Diagnostics: "biology",
  "Food safety": "decision",
  "Multi-omics": "data",
  Formulation: "biology",
  "Mathematical modeling": "data",
  "Drug discovery": "data",
  Mechanism: "biology",
};

const tagClass = "rounded-full border px-3 py-1 text-xs font-semibold";
const detailRowClass = "grid gap-x-4 gap-y-2 py-4 sm:grid-cols-[12rem_1fr]";

export default function ProjectCaseFiles({
  projects,
  initialVisible = projects.length,
}: {
  projects: Project[];
  initialVisible?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, initialVisible);
  const hiddenCount = Math.max(0, projects.length - initialVisible);

  return (
    <div>
      <div className="grid gap-5">
        {visibleProjects.map((project, index) => {
          const open = openIndex === index;
          const tone = tones[categoryTones[project.category ?? ""] ?? "field"];
          const panelId = `project-case-${index}`;
          const methods = project.tech.slice(0, 3);
          const toolkit = Array.from(new Set([...(project.skills ?? []), ...project.tech]));
          const Chevron = open ? ChevronUp : ChevronDown;
          const linkClass = `text-sm font-semibold underline underline-offset-4 ${tone.text}`;

          return (
            <article key={project.title} className="paper-panel p-6 pl-7 sm:p-7 sm:pl-9">
              <span className={`absolute inset-y-0 left-0 w-1.5 ${tone.edge}`} aria-hidden="true" />

              {/* The button holds only the title. Its ::after covers the header, above the
                  positioned result block, so the whole summary toggles. */}
              <div className="relative grid gap-x-6 gap-y-5 sm:grid-cols-[1fr_12rem]">
                <div>
                  <p>
                    <span className={`inline-block ${tagClass} ${tone.tag}`}>
                      {project.category || "Research"}
                    </span>
                  </p>
                  <h3 className="mt-4 text-2xl leading-tight text-foreground">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="text-left after:absolute after:inset-0 after:z-10"
                    >
                      {project.title}
                    </button>
                  </h3>
                  {project.question && (
                    <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-foreground">
                      {project.question}
                    </p>
                  )}
                  <p className="sr-only">Methods</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {methods.map((method) => (
                      <li key={method} className={`${tagClass} ${tone.tag}`}>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`relative flex flex-col justify-center rounded-xl p-5 pr-10 ${tone.wash}`}>
                  <p>
                    <span
                      className={`block text-3xl font-semibold leading-tight tabular-nums ${tone.text}`}
                    >
                      {project.resultStat || "Evidence"}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">outcome</span>
                  </p>
                  <Chevron
                    className="absolute right-3 top-3 size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div id={panelId} hidden={!open} className="mt-6 border-t border-border pt-2">
                <dl className="divide-y divide-border text-sm leading-normal">
                  <div className={detailRowClass}>
                    <dt className="font-semibold text-foreground">What we did</dt>
                    <dd className="text-foreground">{project.description}</dd>
                  </div>
                  {project.impact && (
                    <div className={detailRowClass}>
                      <dt className="font-semibold text-foreground">What the data showed</dt>
                      <dd className="tabular-nums text-foreground">{project.impact}</dd>
                    </div>
                  )}
                  <div className={detailRowClass}>
                    <dt className="font-semibold text-foreground">Methods and capabilities</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2">
                        {toolkit.map((item) => (
                          <li key={item} className={`${tagClass} ${tone.tag}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                {((project.papers && project.papers.length > 0) || project.links?.github) && (
                  <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
                    {project.papers?.map((paper) => (
                      <a
                        key={paper.url}
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {paper.label}
                      </a>
                    ))}
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        Analysis code
                      </a>
                    )}
                  </div>
                )}

                {/* min-w-0 lets the figure shrink below its intrinsic width, so the
                    overflow happens inside the scroller rather than widening the page. */}
                {project.image && (
                  <figure className="mt-6 min-w-0">
                    {/* Scrolls sideways on narrow screens. Shrinking a dense figure
                        to phone width makes axis labels unreadable, so it keeps a
                        legible minimum and the reader pans instead. */}
                    <div className="overflow-x-auto rounded-xl border border-border bg-card">
                      <Image
                        src={project.image}
                        alt={project.imageCaption || `Figure from ${project.title}`}
                        width={project.imageWidth ?? 1600}
                        height={project.imageHeight ?? 1200}
                        sizes="(max-width: 768px) 640px, (max-width: 1280px) 90vw, 800px"
                        className="h-auto w-full min-w-[640px] max-w-none"
                      />
                    </div>
                    {project.imageCaption && (
                      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {project.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setShowAll((value) => !value);
              if (showAll && openIndex !== null && openIndex >= initialVisible) {
                setOpenIndex(null);
              }
            }}
            className="btn-outline"
          >
            {showAll ? "Show selected projects" : `View ${hiddenCount} more projects`}
          </button>
        </div>
      )}
    </div>
  );
}
