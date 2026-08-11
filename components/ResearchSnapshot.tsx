import { ArrowRight, BarChart3, Dna, Sprout, Target } from "lucide-react";
import SkillsMatrix from "@/components/SkillsMatrix";

const evidence = [
  { value: "300+", label: "vineyard samples", tone: "text-emerald-500", rule: "border-t-emerald-500" },
  { value: "1.3B+", label: "reads processed", tone: "text-violet-500", rule: "border-t-violet-500" },
  { value: "37", label: "research articles", tone: "text-sky-500", rule: "border-t-sky-500" },
  { value: "21", label: "book chapters", tone: "text-amber-500", rule: "border-t-amber-500" },
];

const workingSequence = [
  { label: "Observe the crop", icon: Sprout, tone: "text-emerald-500", rule: "border-t-emerald-500" },
  { label: "Measure the biology", icon: Dna, tone: "text-violet-500", rule: "border-t-violet-500" },
  { label: "Integrate the data", icon: BarChart3, tone: "text-sky-500", rule: "border-t-sky-500" },
  { label: "Inform selection", icon: Target, tone: "text-amber-500", rule: "border-t-amber-500" },
];

export default function ResearchSnapshot() {
  return (
    <section id="about" className="py-20" aria-labelledby="research-snapshot-title">
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
            Select a domain to see the methods I use in practice.
          </p>
        </div>

        <div className="mt-10 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4" aria-label="Working sequence">
          {workingSequence.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 border-b border-t-2 border-b-border px-4 py-4 last:border-b-0 sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 ${item.rule}`}
              >
                <span className={`font-mono text-[10px] ${item.tone}`}>0{index + 1}</span>
                <Icon className={`size-6 ${item.tone}`} strokeWidth={1.6} aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                {index < workingSequence.length - 1 && (
                  <ArrowRight className="ml-auto hidden size-3.5 text-muted-foreground/45 lg:block" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>

        <div id="skills" className="mt-8">
          <SkillsMatrix />
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
      </div>
    </section>
  );
}
