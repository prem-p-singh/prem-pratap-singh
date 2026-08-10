import { ArrowDown, BarChart3, Dna, Sprout, Target } from "lucide-react";
import SkillsMatrix from "@/components/SkillsMatrix";

const evidence = [
  { value: "300+", label: "crop samples", tone: "bg-emerald-500/[0.08]" },
  { value: "1.3B+", label: "sequencing reads", tone: "bg-violet-500/[0.08]" },
  { value: "37", label: "research articles", tone: "bg-sky-500/[0.08]" },
  { value: "21", label: "book chapters", tone: "bg-amber-500/[0.08]" },
];

const translationStack = [
  { label: "Crop phenotype", icon: Sprout, tone: "text-emerald-600 dark:text-emerald-300" },
  { label: "Molecular evidence", icon: Dna, tone: "text-violet-600 dark:text-violet-300" },
  { label: "Data integration", icon: BarChart3, tone: "text-sky-600 dark:text-sky-300" },
  { label: "Trait decision", icon: Target, tone: "text-amber-600 dark:text-amber-300" },
];

export default function ResearchSnapshot() {
  return (
    <section id="about" className="py-20" aria-labelledby="research-snapshot-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Capability canopy</p>
            <h2 id="research-snapshot-title" className="mt-3 max-w-4xl text-3xl font-bold text-foreground sm:text-4xl">
              Crop knowledge at the core. <span className="text-primary">Data depth around it.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Select any capability to reveal the working toolkit.
          </p>
        </div>

        <div id="skills" className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <SkillsMatrix />

          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-5 sm:p-6">
              <span className="absolute -right-12 -top-12 size-40 rounded-full border border-emerald-400/15" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">How the skills translate</p>
              <div className="mt-5 space-y-2">
                {translationStack.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-3">
                        <Icon className={`size-5 ${item.tone}`} strokeWidth={1.7} aria-hidden="true" />
                        <span className="text-sm font-semibold text-foreground">{item.label}</span>
                      </div>
                      {index < translationStack.length - 1 && <ArrowDown className="mx-auto my-1 size-3.5 text-muted-foreground/45" aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {evidence.map((item) => (
                <div key={item.label} className={`flex min-h-28 flex-col justify-end rounded-2xl border border-border p-4 ${item.tone}`}>
                  <p className="text-2xl font-bold tracking-tight text-foreground">{item.value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
