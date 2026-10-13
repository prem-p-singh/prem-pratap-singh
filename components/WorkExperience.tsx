import Link from "next/link";
import { workExperience } from "@/profile/experience";

type Tone = "field" | "biology" | "data";

// Family colours, written out in full so Tailwind can see every class.
const tones: Record<Tone, { edge: string; chip: string; tag: string }> = {
  field: {
    edge: "bg-field",
    chip: "bg-field-wash",
    tag: "border-field/20 bg-field-wash text-field",
  },
  biology: {
    edge: "bg-biology",
    chip: "bg-biology-wash",
    tag: "border-biology/20 bg-biology-wash text-biology",
  },
  data: {
    edge: "bg-data",
    chip: "bg-data-wash",
    tag: "border-data/20 bg-data-wash text-data",
  },
};

const roleDetails: Record<
  string,
  { summary: string; evidence: string[]; label: string; tone: Tone }
> = {
  "Postdoctoral Scholar": {
    summary:
      "I lead the field, laboratory, and computational work for a grapevine-virus program, from vineyard sampling and dPCR through RNA sequencing and biological interpretation.",
    evidence: ["300+ crop samples", "1.3B+ sequencing reads", "Reusable analysis pipelines"],
    label: "Field + data",
    tone: "field",
  },
  "MOVE Fellow, AI Trainer (part-time)": {
    summary:
      "I evaluate scientific reasoning in biology for frontier AI systems and document the failure patterns that matter to accuracy and trust.",
    evidence: ["Biology-domain evaluation", "Reference answers", "Reasoning failure analysis"],
    label: "Scientific AI",
    tone: "data",
  },
  "Ph.D. Research Scholar": {
    summary:
      "I developed plant-based treatments for food-borne molds by combining formulation chemistry, wet-lab assays, transcriptomics, and computational modeling.",
    evidence: ["85% less mold growth", "Toxin eliminated", "6 first-author papers"],
    label: "Mechanism",
    tone: "biology",
  },
};

export default function WorkExperience() {
  return (
    <section
      id="experience"
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
            <ul className="grid gap-5">
              {workExperience.map((role) => {
                const detail = roleDetails[role.title];
                if (!detail) return null;
                const tone = tones[detail.tone];

                return (
                  <li key={role.title} className="paper-panel p-6 pl-7 sm:p-7 sm:pl-9">
                    <span
                      className={`absolute inset-y-0 left-0 w-1.5 ${tone.edge}`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <p className="text-sm leading-normal tabular-nums text-muted-foreground">
                        {role.startDate}–{role.endDate}, {role.location}
                      </p>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${tone.tag}`}
                      >
                        {detail.label}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-semibold text-muted-foreground">
                      {role.organization}
                    </p>
                    <h3 className="mt-1 text-2xl leading-tight text-foreground">{role.title}</h3>
                    <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-foreground">
                      {detail.summary}
                    </p>

                    <ul
                      className="mt-5 grid gap-3 sm:grid-cols-3"
                      aria-label={`${role.title} highlights`}
                    >
                      {detail.evidence.map((item) => (
                        <li
                          key={item}
                          className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold leading-snug tabular-nums text-foreground ${tone.chip}`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-field-strong underline underline-offset-4"
            >
              Full career details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
