import { skills } from "@/profile/personal";

type Tone = "field" | "biology" | "data" | "decision";

// Family colours, written out in full so Tailwind can see every class.
const tones: Record<Tone, { edge: string; tag: string }> = {
  field: { edge: "bg-field", tag: "border-field/20 bg-field-wash text-field" },
  biology: { edge: "bg-biology", tag: "border-biology/20 bg-biology-wash text-biology" },
  data: { edge: "bg-data", tag: "border-data/20 bg-data-wash text-data" },
  decision: { edge: "bg-decision", tag: "border-decision/20 bg-decision-wash text-decision" },
};

// One family per category, in the order of profile/personal.ts, as the previous design had them:
// bench work biology, computation data, chemistry and documentation decision, pathology field.
const categoryTones: Tone[] = [
  "biology",
  "biology",
  "data",
  "data",
  "data",
  "decision",
  "field",
  "decision",
];

const tagClass = "rounded-full border px-3 py-1 text-xs font-semibold";

export default function SkillsMatrix() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {skills.map((skill, index) => {
        const tone = tones[categoryTones[index] ?? "field"];
        return (
          <li key={skill.category} className="paper-panel p-6">
            <span className={`absolute inset-x-0 top-0 h-1 ${tone.edge}`} aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl leading-tight text-foreground">{skill.category}</h3>
              <span className={`shrink-0 tabular-nums ${tagClass} ${tone.tag}`}>
                {skill.items.length}
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${skill.category} items`}>
              {skill.items.map((item) => (
                <li key={item} className={`${tagClass} ${tone.tag}`}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
