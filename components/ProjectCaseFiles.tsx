"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Project } from "@/components/ProjectCard";

const linkClass = "text-sm text-accent underline-offset-4 hover:underline";
const detailRowClass = "grid gap-x-4 gap-y-1 border-t border-border py-3 sm:grid-cols-[12rem_1fr]";

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
      {visibleProjects.map((project, index) => {
        const open = openIndex === index;
        const panelId = `project-case-${index}`;
        const methods = project.tech.slice(0, 3).join(", ");
        const toolkit = Array.from(new Set([...(project.skills ?? []), ...project.tech]));
        const Chevron = open ? ChevronUp : ChevronDown;

        return (
          <article
            key={project.title}
            className="border-t border-border py-6 first:border-t-0 first:pt-0"
          >
            {/* The button holds only the title. Its ::after covers the header, so the whole row toggles. */}
            <div className="relative grid gap-x-8 gap-y-3 sm:grid-cols-[1fr_10rem]">
              <div>
                <p className="text-sm text-muted-foreground">{project.category || "Research"}</p>
                {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
                <h3 className="font-sans! mt-1 text-lg font-semibold leading-snug text-foreground">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="text-left after:absolute after:inset-0"
                  >
                    {project.title}
                  </button>
                </h3>
                {project.question && (
                  <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-foreground">
                    {project.question}
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">Methods: {methods}</p>
              </div>

              <div className="flex items-start justify-between gap-4">
                <p>
                  <span className="block text-xl font-semibold leading-snug tabular-nums text-accent">
                    {project.resultStat || "Evidence"}
                  </span>
                  <span className="text-sm text-muted-foreground">outcome</span>
                </p>
                <Chevron className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              </div>
            </div>

            <div id={panelId} hidden={!open} className="pt-6">
              <dl className="text-sm leading-normal">
                <div className={detailRowClass}>
                  <dt className="text-muted-foreground">What we did</dt>
                  <dd className="text-foreground">{project.description}</dd>
                </div>
                {project.impact && (
                  <div className={detailRowClass}>
                    <dt className="text-muted-foreground">What the data showed</dt>
                    <dd className="tabular-nums text-foreground">{project.impact}</dd>
                  </div>
                )}
                <div className={detailRowClass}>
                  <dt className="text-muted-foreground">Methods and capabilities</dt>
                  <dd className="text-foreground">{toolkit.join(", ")}</dd>
                </div>
              </dl>

              {((project.papers && project.papers.length > 0) || project.links?.github) && (
                <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3">
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
                  <div className="overflow-x-auto rounded-md border border-border bg-card">
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

      {hiddenCount > 0 && (
        <div className="mt-2 border-t border-border pt-6">
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
