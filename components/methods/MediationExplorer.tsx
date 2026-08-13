"use client";

import { useState } from "react";

type Suspect = "heat" | "virus" | "both";

const suspectOptions: Array<{
  id: Suspect;
  label: string;
}> = [
  {
    id: "heat",
    label: "Direct route: heat to vine",
  },
  {
    id: "virus",
    label: "Mediated route: heat through virus to vine",
  },
  {
    id: "both",
    label: "Both routes",
  },
];

const suspectResponses: Record<Suspect, { title: string; body: string }> = {
  heat: {
    title: "Plausible, but incomplete",
    body: "The direct route remains, but viral titer carried the larger share.",
  },
  virus: {
    title: "Close—not the whole path",
    body: "Virus carried 61.8%; the rest stayed direct.",
  },
  both: {
    title: "Best-supported answer",
    body: "MBF1c split 61.8% through virus and 38.2% direct.",
  },
};

export function VineyardCaseFile() {
  const [suspect, setSuspect] = useState<Suspect | null>(null);
  const response = suspect ? suspectResponses[suspect] : null;

  return (
    <section className="paper-panel not-prose my-10 overflow-hidden bg-card">
      <div className="border-b border-border bg-card px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="rounded-full bg-biology-wash px-2.5 py-1 text-biology">
            Case file 01
          </span>
          Vineyard mystery
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Which route fits?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Heat · virus · gene response
        </p>
      </div>

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3" role="group" aria-label="Choose a causal explanation">
          {suspectOptions.map((option) => {
            const active = suspect === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSuspect(option.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  active
                    ? "border-primary bg-primary/[0.07] shadow-sm"
                    : "border-border bg-background/60 hover:-translate-y-0.5 hover:border-primary/40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {active ? "✓" : "?"}
                  </span>
                  <span className="font-semibold text-foreground">{option.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-background/70 p-5 sm:p-6">
          {!response ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center">
              <div className="flex w-full max-w-md items-center text-sm font-semibold text-foreground">
                <span className="rounded-full bg-biology-wash px-3 py-2 text-biology">
                  Heat
                </span>
                <span className="mx-2 flex min-w-5 flex-1 items-center" aria-hidden="true">
                  <span className="h-px flex-1 bg-biology/35" />
                  <span className="size-1.5 rounded-full bg-data" />
                </span>
                <span className="rounded-full bg-data-wash px-3 py-2 text-data">
                  ?
                </span>
                <span className="mx-2 flex min-w-5 flex-1 items-center" aria-hidden="true">
                  <span className="h-px flex-1 bg-data/35" />
                  <span className="size-1.5 rounded-full bg-field" />
                </span>
                <span className="rounded-full bg-field-wash px-3 py-2 text-field">
                  Vine response
                </span>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Choose a route to reveal the split.
              </p>
            </div>
          ) : (
            <div aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Evidence revealed
              </p>
              <h3 className="mt-2 text-xl font-bold text-foreground">{response.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {response.body}
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4 text-xs">
                    <span className="font-semibold text-data">
                      Through viral titer
                    </span>
                    <span className="tabular-nums text-muted-foreground">61.8%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[61.8%] rounded-full bg-data" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4 text-xs">
                    <span className="font-semibold text-biology">
                      Direct temperature route
                    </span>
                    <span className="tabular-nums text-muted-foreground">38.2%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[38.2%] rounded-full bg-biology" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/70 p-3">
                  <p className="text-2xl font-bold tabular-nums text-foreground">39</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    significant mediating genes
                  </p>
                </div>
                <div className="rounded-xl bg-muted/70 p-3">
                  <p className="text-2xl font-bold tabular-nums text-foreground">2,000</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    bootstrap resamples
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                61.8% describes MBF1c—not every vineyard heat response.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type Crop = {
  name: string;
  mediated: number;
  ci?: [number, number];
  productionGrowth: number;
  areaGrowth: number;
  interpretable: boolean;
  verdict: string;
  detail: string;
};

const crops: Crop[] = [
  {
    name: "Sugarcane",
    mediated: 97.2,
    ci: [86.0, 110.8],
    productionGrowth: 4.5,
    areaGrowth: 3.01,
    interpretable: true,
    verdict: "Expansion dominated",
    detail: "Nearly all of the modeled production trend travelled through expansion of harvested area.",
  },
  {
    name: "Maize",
    mediated: 72.8,
    ci: [66.4, 78.9],
    productionGrowth: 6.04,
    areaGrowth: 2.0,
    interpretable: true,
    verdict: "Mostly more land",
    detail: "Land expansion carried most of the trend, with a substantial yield pathway still visible.",
  },
  {
    name: "Cassava",
    mediated: 59.8,
    ci: [51.9, 69.0],
    productionGrowth: 4.77,
    areaGrowth: 3.44,
    interpretable: true,
    verdict: "Land-leaning mix",
    detail: "Both routes contributed, but expansion of harvested area carried the larger share.",
  },
  {
    name: "Banana",
    mediated: 48.6,
    ci: [22.3, 78.8],
    productionGrowth: 6.09,
    areaGrowth: 2.79,
    interpretable: true,
    verdict: "Almost an even split",
    detail: "The model divides the trend nearly evenly between harvested area and the direct pathway.",
  },
  {
    name: "Rice",
    mediated: 12.5,
    ci: [5.5, 23.0],
    productionGrowth: 3.73,
    areaGrowth: 1.46,
    interpretable: true,
    verdict: "Productivity dominated",
    detail: "Most production growth stayed on the direct pathway, consistent with much more output from modest land expansion.",
  },
  {
    name: "Tomato",
    mediated: 130.4,
    productionGrowth: 6.72,
    areaGrowth: 3.04,
    interpretable: false,
    verdict: "The simple percentage breaks",
    detail: "The land pathway exceeds the total modeled trend, so the remaining direct pathway turns negative.",
  },
  {
    name: "Soybean",
    mediated: 128.1,
    productionGrowth: 13.8,
    areaGrowth: 5.78,
    interpretable: false,
    verdict: "The simple percentage breaks",
    detail: "Rapid area expansion makes a single 0-100% summary misleading for this trend.",
  },
  {
    name: "Wheat",
    mediated: -1.1,
    productionGrowth: 3.57,
    areaGrowth: 1.07,
    interpretable: false,
    verdict: "The land pathway opposes the trend",
    detail: "The fitted land pathway runs against the overall production trend, so the mediated share becomes negative.",
  },
  {
    name: "Potato",
    mediated: -54.5,
    productionGrowth: 1.43,
    areaGrowth: 0.77,
    interpretable: false,
    verdict: "More output from less land",
    detail: "Harvested area ended lower while production ended higher, making a negative land pathway informative rather than erroneous.",
  },
  {
    name: "Barley",
    mediated: -189.3,
    productionGrowth: 1.97,
    areaGrowth: 0.84,
    interpretable: false,
    verdict: "More output from less land",
    detail: "Production nearly doubled while harvested area ended below its 1961 level.",
  },
];

const guessOptions = ["Sugarcane", "Rice", "Wheat"];

export function CropGrowthExplorer() {
  const [guess, setGuess] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState("Sugarcane");
  const selected = crops.find((crop) => crop.name === selectedName) ?? crops[0];
  const landShare = Math.max(0, Math.min(100, selected.mediated));
  const yieldShare = 100 - landShare;

  return (
    <section className="paper-panel not-prose my-10 overflow-hidden bg-card">
      <div className="border-b border-border bg-card px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="rounded-full bg-field-wash px-2.5 py-1 text-field">
            Case file 02
          </span>
          The method goes travelling
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          More farmland or better harvests?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          63 years · 10 crops · one route split
        </p>
      </div>

      <div className="border-b border-border p-5 sm:p-7">
        <p className="text-sm font-semibold text-foreground">
          Which crop was most land-driven?
        </p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Guess the most land-driven crop">
          {guessOptions.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={guess === option}
              onClick={() => {
                setGuess(option);
                setSelectedName(option);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                guess === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {guess && (
          <div
            className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${
              guess === "Sugarcane"
                ? "border-field/30 bg-field-wash text-foreground"
                : "border-decision/30 bg-decision-wash text-foreground"
            }`}
            aria-live="polite"
          >
            <span className="font-semibold">
              {guess === "Sugarcane" ? "Correct." : "Sugarcane."}
            </span>{" "}
            97.2% of its modeled trend ran through harvested area.
          </div>
        )}
      </div>

      <div className="p-5 sm:p-7">
        <label className="block sm:hidden">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Explore a crop</span>
          <select
            value={selected.name}
            onChange={(event) => setSelectedName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {crops.map((crop) => (
              <option key={crop.name} value={crop.name}>{crop.name}</option>
            ))}
          </select>
        </label>

        <div className="hidden gap-2 overflow-x-auto pb-3 sm:flex" role="tablist" aria-label="Explore crops">
          {crops.map((crop) => (
            <button
              key={crop.name}
              type="button"
              role="tab"
              aria-selected={selected.name === crop.name}
              onClick={() => setSelectedName(crop.name)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                selected.name === crop.name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {crop.name}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-2xl border border-border bg-background/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              1961–2023
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground">{selected.name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{selected.verdict}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {selected.detail}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted/70 p-3">
                <p className="text-xl font-bold tabular-nums text-foreground">
                  {selected.productionGrowth.toFixed(2)}×
                </p>
                <p className="mt-1 text-xs text-muted-foreground">production</p>
              </div>
              <div className="rounded-xl bg-muted/70 p-3">
                <p className="text-xl font-bold tabular-nums text-foreground">
                  {selected.areaGrowth.toFixed(2)}×
                </p>
                <p className="mt-1 text-xs text-muted-foreground">harvested area</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-5 sm:p-6">
            {selected.interpretable ? (
              <>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Modeled route split
                    </p>
                    <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">
                      {selected.mediated.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">through harvested area</p>
                  </div>
                  {selected.ci && (
                    <p className="text-right text-xs leading-relaxed text-muted-foreground">
                      Bootstrap interval
                      <br />
                      {selected.ci[0].toFixed(1)}–{selected.ci[1].toFixed(1)}%
                    </p>
                  )}
                </div>

                <div className="mt-7 overflow-hidden rounded-full bg-muted" aria-label={`${selected.name}: ${landShare.toFixed(1)} percent land pathway and ${yieldShare.toFixed(1)} percent direct pathway`}>
                  <div className="flex h-10 w-full text-xs font-semibold">
                    <div
                      className="flex items-center justify-center bg-field text-field-foreground"
                      style={{ width: `${landShare}%` }}
                    >
                      {landShare >= 24 ? `${landShare.toFixed(0)}% land` : ""}
                    </div>
                    <div
                      className="flex items-center justify-center bg-data text-data-foreground"
                      style={{ width: `${yieldShare}%` }}
                    >
                      {yieldShare >= 24 ? `${yieldShare.toFixed(0)}% direct` : ""}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-field" /> Through harvested area
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-data" /> Remaining direct pathway
                  </span>
                </div>
              </>
            ) : (
              <div className="flex min-h-52 flex-col justify-center">
                <span className="self-start rounded-full bg-decision-wash px-3 py-1 text-xs font-semibold uppercase tracking-wider text-decision">
                  Outside the 0–100% zone
                </span>
                <p className="mt-4 text-4xl font-bold tabular-nums text-foreground">
                  {selected.mediated > 0 ? "+" : ""}{selected.mediated.toFixed(1)}%
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  The pathways oppose each other or one exceeds the total. Read this as
                  a warning—not a pie-chart share.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Modeled global trends—not causal proof.
        </p>
      </div>
    </section>
  );
}
