import SkillsMatrix from "@/components/SkillsMatrix";

const evidence = [
  { value: "300+", label: "vineyard samples", tone: "text-emerald-500", rule: "border-t-emerald-500" },
  { value: "1.3B+", label: "reads processed", tone: "text-violet-500", rule: "border-t-violet-500" },
  { value: "37", label: "research articles", tone: "text-sky-500", rule: "border-t-sky-500" },
  { value: "21", label: "book chapters", tone: "text-amber-500", rule: "border-t-amber-500" },
];

export default function ResearchSnapshot() {
  return (
    <section id="about" className="py-6 sm:py-8" aria-labelledby="research-snapshot-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Capabilities</p>
            <h2
              id="research-snapshot-title"
              className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.08] text-foreground sm:text-4xl lg:text-5xl"
            >
              I work across the field, bench, and data.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:justify-self-end">
            Eight connected capability areas support the path from crop observation to a useful decision.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 border-y border-border lg:grid-cols-4">
          {evidence.map((item, index) => (
            <div
              key={item.label}
              className={`border-t-2 px-4 py-6 sm:px-6 ${item.rule} ${
                index % 2 === 0 ? "border-r border-border" : ""
              } ${index < 2 ? "border-b border-border lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}
            >
              <p className={`text-3xl font-semibold tracking-tight sm:text-4xl ${item.tone}`}>{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

        <details id="skills" className="group scroll-mt-24 border-b border-border">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 marker:content-none">
            <span>
              <span className="block text-sm font-semibold text-foreground">Explore the capability index</span>
              <span className="mt-1 block text-xs text-muted-foreground">Diagnostics, molecular biology, computation, omics, and research practice</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-muted-foreground">
              08 domains
              <span className="text-lg transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </span>
          </summary>
          <div className="pb-10 pt-3">
            <SkillsMatrix />
          </div>
        </details>
      </div>
    </section>
  );
}
