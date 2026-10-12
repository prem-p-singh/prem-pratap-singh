import Link from "next/link";
import { workExperience } from "@/profile/experience";

const roleDetails: Record<string, { summary: string; evidence: string }> = {
  "Postdoctoral Scholar": {
    summary:
      "I lead the field, laboratory, and computational work for a grapevine-virus program, from vineyard sampling and dPCR through RNA sequencing and biological interpretation.",
    evidence: "300+ crop samples, 1.3B+ sequencing reads and reusable analysis pipelines.",
  },
  "MOVE Fellow, AI Trainer (part-time)": {
    summary:
      "I evaluate scientific reasoning in biology for frontier AI systems and document the failure patterns that matter to accuracy and trust.",
    evidence: "Biology-domain evaluation, reference answers and reasoning failure analysis.",
  },
  "Ph.D. Research Scholar": {
    summary:
      "I developed plant-based treatments for food-borne molds by combining formulation chemistry, wet-lab assays, transcriptomics, and computational modeling.",
    evidence: "85% less mold growth, toxin eliminated and 6 first-author papers.",
  },
};

export default function WorkExperience() {
  return (
    <section
      id="experience"
      data-guided-scroll-section
      className="guided-scroll-section"
      aria-labelledby="work-experience-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <h2
              id="work-experience-title"
              className="text-3xl leading-tight text-foreground sm:text-4xl"
            >
              Where I have done the work
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              Roles spanning crop research, data science, and the evaluation of scientific AI.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul>
              {workExperience.map((role) => {
                const detail = roleDetails[role.title];
                if (!detail) return null;

                return (
                  <li
                    key={role.title}
                    className="grid gap-x-8 gap-y-3 border-t border-border py-8 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr]"
                  >
                    <p className="text-sm leading-normal tabular-nums text-muted-foreground">
                      {role.startDate}–{role.endDate}
                      <span className="block">{role.location}</span>
                    </p>

                    <div>
                      <p className="text-sm text-muted-foreground">{role.organization}</p>
                      {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
                      <h3 className="font-sans! mt-1 text-lg font-semibold leading-snug text-foreground">
                        {role.title}
                      </h3>
                      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-foreground">
                        {detail.summary}
                      </p>
                      <p className="mt-2 max-w-[60ch] text-sm tabular-nums text-muted-foreground">
                        {detail.evidence}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-accent underline-offset-4 hover:underline"
            >
              Full career details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
