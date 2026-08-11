import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workExperience } from "@/profile/experience";

const roleDetails: Record<
  string,
  {
    summary: string;
    evidence: string[];
    accent: string;
    border: string;
    label: string;
  }
> = {
  "Postdoctoral Scholar": {
    summary:
      "I lead the field, laboratory, and computational work for a grapevine-virus program, from vineyard sampling and dPCR through RNA sequencing and biological interpretation.",
    evidence: ["300+ crop samples", "1.3B+ sequencing reads", "Reusable analysis pipelines"],
    accent: "bg-emerald-500",
    border: "border-emerald-500/45",
    label: "Field + data",
  },
  "MOVE Fellow, AI Trainer (part-time)": {
    summary:
      "I evaluate scientific reasoning in biology for frontier AI systems and document the failure patterns that matter to accuracy and trust.",
    evidence: ["Biology-domain evaluation", "Reference answers", "Reasoning failure analysis"],
    accent: "bg-sky-500",
    border: "border-sky-500/45",
    label: "Scientific AI",
  },
  "Ph.D. Research Scholar": {
    summary:
      "I developed plant-based treatments for food-borne molds by combining formulation chemistry, wet-lab assays, transcriptomics, and computational modeling.",
    evidence: ["85% less mold growth", "Toxin eliminated", "6 first-author papers"],
    accent: "bg-orange-500",
    border: "border-orange-500/45",
    label: "Mechanism",
  },
};

export default function WorkExperience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20" aria-labelledby="work-experience-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 border-b border-border pb-9 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Experience</p>
            <h2 id="work-experience-title" className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Where I have done the work
            </h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground">
            Roles spanning crop research, data science, and the evaluation of scientific AI.
          </p>
        </div>

        <div>
          {workExperience.map((role, index) => {
            const detail = roleDetails[role.title];
            if (!detail) return null;

            return (
              <article
                key={role.title}
                className="relative grid gap-5 border-b border-border py-8 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[10rem_minmax(0,1fr)_8rem] lg:py-10"
              >
                <span className={`absolute bottom-0 left-0 top-0 w-1 ${detail.accent}`} aria-hidden="true" />

                <div className="pl-5 sm:pl-6">
                  <p className="text-sm font-semibold text-foreground">
                    {role.startDate}–{role.endDate}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{role.location}</p>
                </div>

                <div className="pl-5 sm:pl-0">
                  <p className="text-sm font-semibold text-muted-foreground">{role.organization}</p>
                  <h3 className="mt-1 text-2xl font-semibold leading-tight text-foreground">{role.title}</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{detail.summary}</p>

                  <ul className="mt-5 grid gap-3 sm:grid-cols-3" aria-label={`${role.title} highlights`}>
                    {detail.evidence.map((item) => (
                      <li key={item} className={`border-l-2 pl-3 text-sm font-semibold leading-5 text-foreground ${detail.border}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden text-right lg:block">
                  <p className="text-xs font-semibold text-muted-foreground">{detail.label}</p>
                  <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground/20">0{index + 1}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-7 flex justify-end">
          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Full career details <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
