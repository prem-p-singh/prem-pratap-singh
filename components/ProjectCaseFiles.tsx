"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { Project } from "@/components/ProjectCard";

const tones = [
  { dot: "bg-biology", text: "text-biology", wash: "bg-biology-wash" },
  { dot: "bg-field", text: "text-field", wash: "bg-field-wash" },
  { dot: "bg-data", text: "text-data", wash: "bg-data-wash" },
  { dot: "bg-decision", text: "text-decision", wash: "bg-decision-wash" },
];

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
      <div className="border-t border-border">
      {visibleProjects.map((project, index) => {
        const open = openIndex === index;
        const tone = tones[index % tones.length];
        const panelId = `project-case-${index}`;
        const methods = project.tech.slice(0, 3).join(" · ");
        const toolkit = Array.from(new Set([...(project.skills ?? []), ...project.tech]));

        return (
          <article key={project.title} className="border-b border-border">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className={`grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] gap-x-4 gap-y-4 px-1 py-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-data/45 sm:px-4 md:grid-cols-[4rem_minmax(0,1.35fr)_minmax(0,0.75fr)_8rem_auto] md:items-center md:gap-x-6 ${
                open ? tone.wash : "hover:bg-muted/20"
              }`}
            >
              <div className="col-start-1 row-start-1 flex items-center gap-2 self-start pt-1 md:self-center md:pt-0">
                <span className={`size-2 rounded-full ${tone.dot}`} aria-hidden="true" />
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="col-start-2 row-start-1 min-w-0 md:col-start-2 md:row-start-1">
                <p className={`text-xs font-semibold ${tone.text}`}>
                  {project.category || "Research"}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                  {project.title}
                </h3>
                {project.question && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {project.question}
                  </p>
                )}
              </div>

              <div className="col-span-2 col-start-2 row-start-2 md:col-span-1 md:col-start-3 md:row-start-1">
                <p className="text-xs font-semibold text-muted-foreground">Methods</p>
                <p className="mt-1 text-sm leading-snug text-foreground/80">{methods}</p>
              </div>

              <div className="col-span-2 col-start-2 row-start-3 md:col-span-1 md:col-start-4 md:row-start-1">
                <p className={`text-2xl font-semibold leading-none ${tone.text}`}>
                  {project.resultStat || "Evidence"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">outcome</p>
              </div>

              <ChevronDown
                className={`col-start-3 row-start-1 size-5 self-start text-muted-foreground transition-transform md:col-start-5 md:row-start-1 md:self-center ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <div id={panelId} hidden={!open} className={tone.wash}>
              <div className="grid gap-8 border-t border-border px-5 py-7 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-9">
                <div className="space-y-7">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">What we did</p>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/85">
                      {project.description}
                    </p>
                  </div>

                  {project.impact && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">What the data showed</p>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/90">
                        {project.impact}
                      </p>
                    </div>
                  )}

                  {((project.papers && project.papers.length > 0) || project.links?.github) && (
                    <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5">
                      {project.papers?.map((paper) => (
                        <a
                          key={paper.url}
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                        >
                          {paper.label} <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      ))}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                        >
                          Analysis code <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground">Methods and capabilities</p>
                  <ul className="mt-3 grid grid-cols-2 border-t border-border">
                    {toolkit.map((item) => (
                      <li key={item} className="border-b border-border py-2.5 pr-3 text-xs leading-snug text-foreground/75">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.image && (
                  <figure className="md:col-span-2">
                    <div className="relative overflow-hidden rounded-xl border border-border bg-white">
                      <Image
                        src={project.image}
                        alt={project.imageCaption || `Figure from ${project.title}`}
                        width={project.imageWidth ?? 1600}
                        height={project.imageHeight ?? 1200}
                        sizes="(max-width: 768px) 100vw, 900px"
                        className="h-auto w-full"
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
            </div>
          </article>
        );
      })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-6 flex justify-center">
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
