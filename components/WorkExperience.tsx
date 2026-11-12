import Link from "next/link";
import type { MentorLink } from "@/components/Timeline";
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
      "I lead the field, laboratory, and computational work on California field crop diseases, including Grapevine Red Blotch Virus, from field sampling and dPCR through RNA sequencing and biological interpretation.",
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

// Splits a role's mentors into current and former, keeping only the affiliation from each note.
function groupMentors(mentors: string | MentorLink[] | undefined) {
  if (!mentors || typeof mentors === "string") return { current: [], former: [] };
  const withAffiliation = (mentor: MentorLink) => ({
    ...mentor,
    affiliation: (mentor.note ?? "")
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part && !/^(current|former|deceased)/i.test(part))
      .join(", "),
  });
  return {
    current: mentors.filter((m) => !/former/i.test(m.note ?? "")).map(withAffiliation),
    former: mentors.filter((m) => /former/i.test(m.note ?? "")).map(withAffiliation),
  };
}

// Pills in the hero tag style: current PIs in green, former PIs in a neutral tone.
const pillTones = {
  current: "border-field/20 bg-field-wash text-field-strong",
  former: "border-border bg-card text-foreground",
};

function MentorPills({
  mentors,
  tone,
}: {
  mentors: ReturnType<typeof groupMentors>["current"];
  tone: keyof typeof pillTones;
}) {
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {mentors.map((mentor) => {
        const label = (
          <>
            {mentor.name}
            {mentor.affiliation && <span className="font-normal">, {mentor.affiliation}</span>}
          </>
        );
        const pill = `inline-block rounded-[3px] border px-3 py-1 text-xs font-semibold ${pillTones[tone]}`;
        return (
          <li key={mentor.name}>
            {mentor.url ? (
              <a
                href={mentor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pill} underline-offset-4 hover:underline`}
              >
                {label}
              </a>
            ) : (
              <span className={pill}>{label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function WorkExperience() {
  return (
    <section
      id="experience"
      className="guided-scroll-section"
      aria-labelledby="work-experience-title"
    >
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 border-t border-border py-10 lg:grid-cols-12 lg:py-14">
          <div className="room-title lg:col-span-12">
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

          <div className="lg:col-span-12">
            <ul className="grid gap-5 xl:grid-cols-2 xl:items-start">
              {workExperience.map((role) => {
                const detail = roleDetails[role.title];
                if (!detail) return null;
                const tone = tones[detail.tone];
                const mentors = groupMentors(role.mentor);
                const currentLabel = role.endDate === "Present" ? "Current PIs" : "Supervisor";

                return (
                  <li key={role.title} className="paper-panel p-6 sm:p-7">
                    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-[10rem_1fr]">
                      <div className="text-sm leading-normal">
                        <p className="font-serif text-lg font-bold leading-tight tabular-nums text-foreground">
                          {role.startDate}–{role.endDate}
                        </p>
                        <p className="mt-1 text-muted-foreground">{role.location}</p>
                        <span
                          className={`mt-3 inline-block rounded-[3px] border px-3 py-1 text-xs font-semibold ${tone.tag}`}
                        >
                          {detail.label}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl leading-tight text-foreground sm:text-3xl">{role.title}</h3>
                        <p className="mt-2 text-base font-semibold text-muted-foreground">
                          {role.organization}
                        </p>
                        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-foreground">
                          {detail.summary}
                        </p>
                      </div>
                    </div>

                    {(mentors.current.length > 0 || mentors.former.length > 0) && (
                      <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-border pt-4 text-sm leading-normal">
                        {mentors.current.length > 0 && (
                          <div>
                            <dt className="text-muted-foreground">{currentLabel}</dt>
                            <dd>
                              <MentorPills mentors={mentors.current} tone="current" />
                            </dd>
                          </div>
                        )}
                        {mentors.former.length > 0 && (
                          <div>
                            <dt className="text-muted-foreground">Former PIs</dt>
                            <dd>
                              <MentorPills mentors={mentors.former} tone="former" />
                            </dd>
                          </div>
                        )}
                      </dl>
                    )}

                    <ul
                      className="mt-5 grid gap-3 sm:grid-cols-3"
                      aria-label={`${role.title} highlights`}
                    >
                      {detail.evidence.map((item) => (
                        <li
                          key={item}
                          className="border-t-2 border-foreground pt-2 text-sm font-semibold leading-snug tabular-nums text-foreground"
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
              href="/Prem_Pratap_Singh_Resume.pdf"
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
