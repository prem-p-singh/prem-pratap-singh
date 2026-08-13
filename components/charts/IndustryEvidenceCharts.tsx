import type { ReactNode } from "react";

type TableValue = string | number;

function EvidenceTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: TableValue[][];
}) {
  return (
    <details className="border-t border-border px-5 py-4 sm:px-7">
      <summary className="cursor-pointer text-sm font-semibold text-foreground marker:text-field">
        Evidence detail
      </summary>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {headers.map((header) => (
                <th key={header} className="px-2 py-2 font-semibold first:pl-0">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cellIndex}-${cell}`}
                    className={`px-2 py-2.5 text-foreground/85 first:pl-0 ${cellIndex > 0 ? "tabular-nums" : "font-medium"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function EvidenceFrame({
  eyebrow,
  title,
  takeaway,
  source,
  children,
  details,
}: {
  eyebrow: string;
  title: string;
  takeaway: string;
  source: string;
  children: ReactNode;
  details?: ReactNode;
}) {
  return (
    <figure className="paper-panel not-prose my-8 overflow-hidden bg-card">
      <div className="grid h-1 grid-cols-4" aria-hidden="true">
        <span className="bg-field" />
        <span className="bg-biology" />
        <span className="bg-data" />
        <span className="bg-decision" />
      </div>
      <div className="px-5 pb-3 pt-5 sm:px-7 sm:pt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-field">
          {eyebrow}
        </p>
        <h3 className="mt-2 max-w-3xl text-xl font-semibold leading-tight text-foreground sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {takeaway}
        </p>
      </div>
      <div className="px-5 py-4 sm:px-7 sm:py-5">{children}</div>
      <figcaption className="border-t border-border px-5 py-3 text-xs leading-relaxed text-muted-foreground sm:px-7">
        {source}
      </figcaption>
      {details}
    </figure>
  );
}

const attention = [
  ["Coffee", 39.8, 441, 11.1],
  ["Tomato", 15.4, 2848, 185.5],
  ["Apple", 14.6, 1427, 97.4],
  ["Orange", 13.7, 946, 69.3],
  ["Grape", 12.4, 933, 75.4],
  ["Potato", 4.2, 1610, 386.7],
  ["Banana", 3.6, 493, 136.7],
  ["Rice", 3.0, 2420, 804.7],
  ["Wheat", 1.7, 1315, 794.6],
  ["Maize", 1.3, 1658, 1238.6],
  ["Soybean", 1.3, 465, 370.9],
  ["Cassava", 0.9, 318, 339.5],
  ["Barley", 0.7, 100, 142.7],
  ["Sugarcane", 0.2, 443, 2017.4],
] as const;

export function AttentionIntensityChart() {
  const visible = attention.filter(([crop]) =>
    ["Coffee", "Tomato", "Apple", "Grape", "Potato", "Rice", "Maize", "Sugarcane"].includes(crop)
  );
  const max = Math.max(...visible.map(([, value]) => value));

  return (
    <EvidenceFrame
      eyebrow="Portfolio allocation signal"
      title="Research intensity is concentrated away from staple volume"
      takeaway="Tomato receives 11.5× more AI plant-disease attention per tonne than maize; sugarcane sits at the opposite end of the portfolio."
      source="Sources: OpenAlex indexed literature and FAOSTAT world production, 2023. Rate = papers per million tonnes produced."
      details={
        <EvidenceTable
          headers={["Crop", "Papers / Mt", "AI papers", "Production (Mt)"]}
          rows={attention.map(([crop, rate, papers, production]) => [crop, rate.toFixed(1), papers.toLocaleString(), production.toFixed(1)])}
        />
      }
    >
      <div className="space-y-3" aria-label="AI plant-disease papers per million tonnes produced">
        {visible.map(([crop, value]) => {
          const staple = ["Rice", "Maize", "Sugarcane"].includes(crop);
          return (
            <div key={crop} className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3 sm:grid-cols-[7rem_1fr_4rem]">
              <span className={`text-sm font-semibold ${staple ? "text-data" : "text-foreground"}`}>{crop}</span>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${staple ? "bg-data" : "bg-field"}`}
                  style={{ width: `${Math.max(2, (value / max) * 100)}%` }}
                />
              </div>
              <span className="text-right text-sm font-semibold tabular-nums text-foreground">{value.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-field" />Higher research intensity</span>
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-data" />Selected staple crops</span>
      </div>
    </EvidenceFrame>
  );
}

const opportunityLabels = new Set(["Coffee", "Tomato", "Grape", "Potato", "Rice", "Wheat", "Maize", "Sugarcane"]);

export function ResearchOpportunityMatrix() {
  const width = 720;
  const height = 400;
  const left = 54;
  const right = 20;
  const top = 34;
  const bottom = 48;
  const minLog = Math.log10(10);
  const maxLog = Math.log10(2300);
  const x = (production: number) => left + ((Math.log10(production) - minLog) / (maxLog - minLog)) * (width - left - right);
  const y = (papers: number) => top + (1 - papers / 3100) * (height - top - bottom);
  const xThreshold = x(300);
  const yThreshold = y(700);
  const labelOffsets: Record<string, [number, number]> = {
    Coffee: [8, -8], Tomato: [8, -10], Grape: [8, 15], Potato: [8, -9],
    Rice: [8, -9], Wheat: [-42, 17], Maize: [8, 15], Sugarcane: [-70, -9],
  };

  return (
    <EvidenceFrame
      eyebrow="Opportunity matrix"
      title="Agricultural scale and research attention are not moving together"
      takeaway="The lower-right zone contains large production systems receiving comparatively limited AI disease research—a useful place to test portfolio priorities."
      source="Sources: OpenAlex and FAOSTAT, 2023. Production is shown on a logarithmic scale so crops of very different size remain comparable."
      details={
        <EvidenceTable
          headers={["Crop", "Production (Mt)", "AI papers", "Papers / Mt"]}
          rows={attention.map(([crop, rate, papers, production]) => [crop, production.toFixed(1), papers.toLocaleString(), rate.toFixed(1)])}
        />
      }
    >
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-background/55 sm:block">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-labelledby="opportunity-title opportunity-desc">
          <title id="opportunity-title">Crop research opportunity matrix</title>
          <desc id="opportunity-desc">Crop production scale on the horizontal axis and AI plant-disease paper count on the vertical axis.</desc>
          <rect x={left} y={top} width={xThreshold - left} height={yThreshold - top} fill="var(--field-wash)" />
          <rect x={xThreshold} y={yThreshold} width={width - right - xThreshold} height={height - bottom - yThreshold} fill="var(--decision-wash)" />
          <line x1={xThreshold} x2={xThreshold} y1={top} y2={height - bottom} stroke="var(--border)" strokeDasharray="5 6" />
          <line x1={left} x2={width - right} y1={yThreshold} y2={yThreshold} stroke="var(--border)" strokeDasharray="5 6" />
          <text x={left + 12} y={top + 20} fill="var(--field)" fontSize="12" fontWeight="700">HIGH ATTENTION · SMALLER SCALE</text>
          <text x={xThreshold + 12} y={height - bottom - 14} fill="var(--decision)" fontSize="12" fontWeight="700">PORTFOLIO OPPORTUNITY</text>
          {attention.map(([crop, , papers, production]) => {
            const selected = opportunityLabels.has(crop);
            const [dx, dy] = labelOffsets[crop] ?? [0, 0];
            const risk = production >= 300 && papers < 700;
            return (
              <g key={crop}>
                <circle cx={x(production)} cy={y(papers)} r={selected ? 5.5 : 3.5} fill={risk ? "var(--decision)" : "var(--data)"} stroke="var(--background)" strokeWidth="2">
                  <title>{`${crop}: ${papers.toLocaleString()} papers; ${production.toFixed(1)} million tonnes`}</title>
                </circle>
                {selected && (
                  <text x={x(production) + dx} y={y(papers) + dy} fill="var(--foreground)" fontSize="12" fontWeight="600">
                    {crop}
                  </text>
                )}
              </g>
            );
          })}
          <line x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} stroke="var(--border)" />
          <line x1={left} x2={left} y1={top} y2={height - bottom} stroke="var(--border)" />
          <text x={(left + width - right) / 2} y={height - 14} textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">WORLD PRODUCTION SCALE →</text>
          <text transform={`translate(16 ${(top + height - bottom) / 2}) rotate(-90)`} textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">RESEARCH ATTENTION →</text>
        </svg>
      </div>
      <div className="space-y-2 sm:hidden" aria-label="Priority crops with high production and comparatively low research attention">
        {attention
          .filter(([crop]) => ["Sugarcane", "Maize", "Rice", "Cassava"].includes(crop))
          .reverse()
          .map(([crop, rate, papers, production]) => (
            <div key={crop} className="rounded-xl border border-border bg-background/55 px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-semibold text-foreground">{crop}</span>
                <span className="text-sm font-semibold tabular-nums text-decision">{rate.toFixed(1)} papers / Mt</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {production.toLocaleString()} Mt production · {papers.toLocaleString()} AI papers
              </p>
            </div>
          ))}
      </div>
    </EvidenceFrame>
  );
}

const aiShare = [
  [2005, 3.14], [2006, 4.71], [2007, 3.34], [2008, 3.63], [2009, 3.72],
  [2010, 3.77], [2011, 3.46], [2012, 3.57], [2013, 3.48], [2014, 3.63],
  [2015, 3.67], [2016, 3.86], [2017, 3.99], [2018, 4.46], [2019, 5.35],
  [2020, 6.01], [2021, 7.16], [2022, 8.37], [2023, 10.53], [2024, 13.06], [2025, 14.77],
] as const;

export function AIAdoptionTrend() {
  const width = 720;
  const height = 300;
  const left = 44;
  const right = 30;
  const top = 28;
  const bottom = 42;
  const x = (year: number) => left + ((year - 2005) / 20) * (width - left - right);
  const y = (value: number) => top + (1 - value / 16) * (height - top - bottom);
  const line = aiShare.map(([year, value], index) => `${index ? "L" : "M"}${x(year)},${y(value)}`).join(" ");
  const area = `${line} L${x(2025)},${height - bottom} L${x(2005)},${height - bottom} Z`;

  return (
    <EvidenceFrame
      eyebrow="Adoption signal"
      title="AI moved from a niche method to a material share of the field"
      takeaway="AI appeared in 14.8% of plant-disease papers in 2025—nearly five times its 2005 share."
      source="Source: OpenAlex indexed literature. Annual AI papers shown as a share of all indexed plant-disease papers."
      details={<EvidenceTable headers={["Year", "AI share"]} rows={aiShare.filter(([year]) => year % 5 === 0 || year >= 2023).map(([year, share]) => [year, `${share.toFixed(1)}%`])} />}
    >
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-background/55 sm:block">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-labelledby="trend-title trend-desc">
          <title id="trend-title">AI share of plant-disease research from 2005 to 2025</title>
          <desc id="trend-desc">The share rises from 3.1 percent in 2005 to 14.8 percent in 2025, with most growth after 2019.</desc>
          {[0, 5, 10, 15].map((tick) => (
            <g key={tick}>
              <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} stroke="var(--border)" strokeOpacity="0.65" />
              <text x={left - 8} y={y(tick) + 4} textAnchor="end" fill="var(--muted-foreground)" fontSize="11">{tick}%</text>
            </g>
          ))}
          <path d={area} fill="var(--field-wash)" />
          <path d={line} fill="none" stroke="var(--field)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {[2005, 2015, 2019, 2025].map((year) => {
            const point = aiShare.find(([candidate]) => candidate === year)!;
            return <circle key={year} cx={x(point[0])} cy={y(point[1])} r="5" fill="var(--field)" stroke="var(--background)" strokeWidth="2" />;
          })}
          <text x={x(2005)} y={y(3.14) - 14} fill="var(--foreground)" fontSize="12" fontWeight="700">3.1%</text>
          <text x={x(2025) - 4} y={y(14.77) - 14} textAnchor="end" fill="var(--field)" fontSize="18" fontWeight="700">14.8%</text>
          {[2005, 2010, 2015, 2020, 2025].map((year) => (
            <text key={year} x={x(year)} y={height - 16} textAnchor={year === 2005 ? "start" : year === 2025 ? "end" : "middle"} fill="var(--muted-foreground)" fontSize="11">{year}</text>
          ))}
        </svg>
      </div>
      <div className="rounded-2xl border border-border bg-background/55 p-4 sm:hidden" aria-label="AI adoption increased from 3.1 percent in 2005 to 14.8 percent in 2025">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <div>
            <p className="text-2xl font-semibold tabular-nums text-foreground">3.1%</p>
            <p className="text-xs text-muted-foreground">2005</p>
          </div>
          <div className="relative h-2 rounded-full bg-field-wash">
            <span className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-field/35 to-field" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold tabular-nums text-field">14.8%</p>
            <p className="text-xs text-muted-foreground">2025</p>
          </div>
        </div>
        <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">Most of the acceleration occurred after 2019.</p>
      </div>
    </EvidenceFrame>
  );
}

const surveillance = [
  ["Iran", 7.7, 10], ["Italy", 7.5, 104], ["Brazil", 2.2, 96], ["Argentina", 1.0, 19],
  ["China", 0.7, 10], ["United Kingdom", 0.5, 122], ["United States", 0.4, 543],
  ["Spain", 0.3, 31], ["France", 0.3, 63], ["Taiwan", 0.2, 5],
] as const;

export function SurveillanceRankingChart() {
  const max = 7.7;
  return (
    <EvidenceFrame
      eyebrow="Surveillance portfolio"
      title="Reporting effort reshapes the country ranking"
      takeaway="The United States leads raw records but falls to seventh after normalizing for total GBIF publishing volume."
      source="Source: GBIF occurrence records for Xylella fastidiosa. The index measures records per million total GBIF records—not disease incidence."
      details={<EvidenceTable headers={["Country", "Normalized index", "Xylella records"]} rows={surveillance.map(([country, rate, records]) => [country, rate.toFixed(1), records])} />}
    >
      <div className="space-y-3" aria-label="Effort-corrected Xylella records by country">
        {surveillance.map(([country, rate], index) => {
          const us = country === "United States";
          return (
            <div key={country} className="grid grid-cols-[1.25rem_7.5rem_1fr_2.5rem] items-center gap-2 sm:grid-cols-[1.5rem_9rem_1fr_3rem] sm:gap-3">
              <span className="text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <span className={`text-sm font-semibold ${us ? "text-biology" : "text-foreground"}`}>{country}</span>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${us ? "bg-biology" : "bg-field"}`} style={{ width: `${Math.max(2, (rate / max) * 100)}%` }} />
              </div>
              <span className="text-right text-sm font-semibold tabular-nums text-foreground">{rate.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Normalized index · Xylella records per one million records published by that country</p>
    </EvidenceFrame>
  );
}

const outbreakReadiness = [
  { country: "Italy", confirmed: 2013, record: 2013, status: "On time", tone: "field" },
  { country: "Spain", confirmed: 2016, record: 2017, status: "+1 year", tone: "field" },
  { country: "France", confirmed: 2015, record: 2012, status: "3 years earlier", tone: "data" },
  { country: "Germany", confirmed: 2016, record: 2026, status: "+10 years", tone: "biology" },
  { country: "Portugal", confirmed: 2019, record: null, status: "Missing", tone: "decision" },
] as const;

export function OutbreakReadinessChart() {
  const start = 2012;
  const end = 2026;
  const position = (year: number) => ((year - start) / (end - start)) * 100;
  const toneClasses: Record<string, string> = {
    field: "bg-field text-field-foreground",
    data: "bg-data text-data-foreground",
    biology: "bg-biology text-biology-foreground",
    decision: "bg-decision text-decision-foreground",
  };
  const toneColors: Record<string, string> = {
    field: "var(--field)", data: "var(--data)", biology: "var(--biology)", decision: "var(--decision)",
  };

  return (
    <EvidenceFrame
      eyebrow="Data-readiness check"
      title="Public data does not provide a consistent outbreak alert"
      takeaway="Italy appears on time, Spain within one year, Germany a decade late, and Portugal is missing entirely."
      source="Sources: GBIF occurrence records and documented European plant-health detections. A public record can predate a confirmed outbreak and is not itself an outbreak diagnosis."
      details={<EvidenceTable headers={["Country", "Confirmed", "First public record", "Timing"]} rows={outbreakReadiness.map(({ country, confirmed, record, status }) => [country, confirmed, record ?? "No record", status])} />}
    >
      <div className="space-y-5">
        {outbreakReadiness.map(({ country, confirmed, record, status, tone }) => {
          const first = Math.min(confirmed, record ?? confirmed);
          const last = Math.max(confirmed, record ?? confirmed);
          return (
            <div key={country} className="grid gap-2 sm:grid-cols-[6rem_1fr_7rem] sm:items-center sm:gap-4">
              <span className="text-sm font-semibold text-foreground">{country}</span>
              <div className="relative h-8" aria-label={`${country}: confirmed ${confirmed}; ${record ? `first public record ${record}` : "no public record"}`}>
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
                {record && record !== confirmed && (
                  <div
                    className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                    style={{ left: `${position(first)}%`, width: `${Math.max(1, position(last) - position(first))}%`, background: toneColors[tone] }}
                  />
                )}
                <span className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground bg-card" style={{ left: `${position(confirmed)}%` }} />
                {record && <span className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${position(record)}%`, background: toneColors[tone] }} />}
                {!record && <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-decision" style={{ left: `${position(confirmed)}%` }}>×</span>}
              </div>
              <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{status}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-3 rounded-full border-2 border-foreground bg-card" />Confirmed outbreak</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-data" />First public record</span>
        <span className="ml-auto">2012 → 2026</span>
      </div>
    </EvidenceFrame>
  );
}

const landContribution = [
  ["Sugarcane", 97.2, "86.0–110.8%"], ["Maize", 72.8, "66.4–78.9%"],
  ["Cassava", 59.8, "51.9–69.0%"], ["Banana", 48.6, "22.3–78.8%"], ["Rice", 12.5, "5.5–23.0%"],
] as const;

export function LandContributionChart() {
  return (
    <EvidenceFrame
      eyebrow="Growth-route portfolio"
      title="Different crops reached growth through very different routes"
      takeaway="Sugarcane’s modeled trend was almost entirely land-driven; rice growth was dominated by the productivity route."
      source="Source: FAOSTAT world totals, 1961–2023. Shares come from observational mediation models with 2,000 bootstrap resamples; they are not causal proof."
      details={<EvidenceTable headers={["Crop", "Via harvested area", "Bootstrap interval", "Remaining route"]} rows={landContribution.map(([crop, land, interval]) => [crop, `${land.toFixed(1)}%`, interval, `${(100 - land).toFixed(1)}%`])} />}
    >
      <div className="space-y-5">
        {landContribution.map(([crop, land]) => (
          <div key={crop}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-foreground">{crop}</span>
              <span className="text-sm font-semibold tabular-nums text-foreground">{land.toFixed(1)}% via land</span>
            </div>
            <div className="flex h-9 overflow-hidden rounded-xl bg-muted" aria-label={`${crop}: ${land.toFixed(1)} percent through harvested area, ${(100 - land).toFixed(1)} percent remaining direct route`}>
              <div className="flex items-center justify-center bg-field text-xs font-semibold text-field-foreground" style={{ width: `${land}%` }}>
                {land >= 28 ? "Land expansion" : ""}
              </div>
              <div className="flex items-center justify-center bg-data text-xs font-semibold text-data-foreground" style={{ width: `${100 - land}%` }}>
                {100 - land >= 28 ? "Productivity route" : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-field" />Harvested-area route</span>
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-data" />Remaining direct route</span>
      </div>
    </EvidenceFrame>
  );
}

const growth = [
  ["Tomato", 3.04, 6.72], ["Soybean", 5.78, 13.8], ["Sugarcane", 3.01, 4.5],
  ["Maize", 2.0, 6.04], ["Cassava", 3.44, 4.77], ["Banana", 2.79, 6.09],
  ["Rice", 1.46, 3.73], ["Wheat", 1.07, 3.57], ["Potato", 0.77, 1.43], ["Barley", 0.84, 1.97],
] as const;

export function GrowthStrategyMatrix() {
  const width = 720;
  const height = 420;
  const left = 58;
  const right = 28;
  const top = 34;
  const bottom = 52;
  const x = (area: number) => left + ((area - 0.5) / 5.6) * (width - left - right);
  const y = (production: number) => top + (1 - (production - 1) / 13.5) * (height - top - bottom);
  const offsets: Record<string, [number, number]> = {
    Tomato: [8, -8], Soybean: [-58, -10], Sugarcane: [8, 16], Maize: [8, -9],
    Cassava: [8, 16], Banana: [-50, -9], Rice: [8, -9], Wheat: [8, 16], Potato: [8, -8], Barley: [8, 16],
  };

  return (
    <EvidenceFrame
      eyebrow="Growth strategy matrix"
      title="More output did not always require more land"
      takeaway="Potato, barley, and wheat produced more while using roughly the same or less land; soybean combined the strongest production and land expansion."
      source="Source: FAOSTAT world totals, 1961–2023. Values compare the final year with 1961 and describe global observational trends."
      details={<EvidenceTable headers={["Crop", "Production growth", "Area growth", "Interpretation"]} rows={growth.map(([crop, area, production]) => [crop, `${production.toFixed(2)}×`, `${area.toFixed(2)}×`, area < 1 ? "More output, less land" : production / area > 2 ? "Output outpaced land" : "Land-intensive growth"])} />}
    >
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-background/55 sm:block">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-labelledby="growth-title growth-desc">
          <title id="growth-title">Production growth compared with harvested-area growth</title>
          <desc id="growth-desc">Crops toward the upper-left produced more output with less land growth; crops toward the upper-right expanded both production and land.</desc>
          <rect x={left} y={top} width={x(1) - left} height={height - top - bottom} fill="var(--field-wash)" />
          <line x1={x(1)} x2={x(1)} y1={top} y2={height - bottom} stroke="var(--field)" strokeDasharray="5 6" />
          <text x={left + 10} y={top + 18} fill="var(--field)" fontSize="12" fontWeight="700">MORE OUTPUT · LESS LAND</text>
          {[1, 3, 6, 10, 14].map((tick) => (
            <g key={tick}>
              <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} stroke="var(--border)" strokeOpacity="0.55" />
              <text x={left - 9} y={y(tick) + 4} textAnchor="end" fill="var(--muted-foreground)" fontSize="11">{tick}×</text>
            </g>
          ))}
          {[1, 2, 3, 4, 5, 6].map((tick) => (
            <text key={tick} x={x(tick)} y={height - 22} textAnchor="middle" fill="var(--muted-foreground)" fontSize="11">{tick}×</text>
          ))}
          {growth.map(([crop, area, production]) => {
            const [dx, dy] = offsets[crop];
            const efficient = area <= 1.1 || production / area > 2;
            return (
              <g key={crop}>
                <circle cx={x(area)} cy={y(production)} r="6" fill={efficient ? "var(--field)" : "var(--biology)"} stroke="var(--background)" strokeWidth="2" />
                <text x={x(area) + dx} y={y(production) + dy} fill="var(--foreground)" fontSize="12" fontWeight="600">{crop}</text>
              </g>
            );
          })}
          <line x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} stroke="var(--border)" />
          <line x1={left} x2={left} y1={top} y2={height - bottom} stroke="var(--border)" />
          <text x={(left + width - right) / 2} y={height - 8} textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">HARVESTED-AREA GROWTH →</text>
          <text transform={`translate(16 ${(top + height - bottom) / 2}) rotate(-90)`} textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">PRODUCTION GROWTH →</text>
        </svg>
      </div>
      <div className="space-y-2 sm:hidden" aria-label="Selected crop production and harvested-area growth patterns">
        {growth
          .filter(([crop]) => ["Soybean", "Sugarcane", "Wheat", "Potato"].includes(crop))
          .map(([crop, area, production]) => {
            const efficient = area <= 1.1 || production / area > 2;
            return (
              <div key={crop} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-border bg-background/55 px-4 py-3">
                <div>
                  <p className="font-semibold text-foreground">{crop}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Production {production.toFixed(2)}× · Land {area.toFixed(2)}×</p>
                </div>
                <span className={`self-center rounded-full px-2.5 py-1 text-xs font-semibold ${efficient ? "bg-field-wash text-field" : "bg-biology-wash text-biology"}`}>
                  {efficient ? "Efficient" : "Land-led"}
                </span>
              </div>
            );
          })}
      </div>
    </EvidenceFrame>
  );
}

/* ------------------------------------------------------------------ *
 * Variance decomposition of world crop yields.
 * Figures from data-interpretations/methods-variance-decomposition.
 * ------------------------------------------------------------------ */

const pooledSplit = [
  ["Crop", 73.9, "bg-biology"],
  ["Country", 15.9, "bg-field"],
  ["Residual", 8.9, "bg-muted-foreground"],
  ["Year", 1.3, "bg-decision"],
] as const;

const withinSplit = [
  ["Country", 69.1, "bg-field"],
  ["Residual", 23.9, "bg-muted-foreground"],
  ["Year", 5.6, "bg-decision"],
] as const;

type VarianceRows = readonly (readonly [string, number, string])[];

function VarianceBar({ rows }: { rows: VarianceRows }) {
  return (
    <div className="flex h-8 overflow-hidden rounded-lg">
      {rows.map(([label, value, tone]) => (
        <span
          key={label}
          className={`${tone} grid place-items-center text-xs font-semibold text-background`}
          style={{ width: `${value}%` }}
          title={`${label} ${value}%`}
        >
          {value >= 12 ? `${value}%` : ""}
        </span>
      ))}
    </div>
  );
}

function VarianceLegend({ rows }: { rows: VarianceRows }) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
      {rows.map(([label, value, tone]) => (
        <span key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className={`${tone} size-2.5 rounded-full`} aria-hidden="true" />
          {label} <span className="tabular-nums text-foreground/85">{value}%</span>
        </span>
      ))}
    </div>
  );
}

export function YieldVarianceSplit() {

  return (
    <EvidenceFrame
      eyebrow="Where yield variation lives"
      title="The pooled answer is mostly a units artefact"
      takeaway="Compared across all crops, crop identity looks dominant. That is largely because sugarcane is measured in tens of thousands of kg per hectare and wheat in thousands. Remove crop identity and the picture changes."
      source="Source: FAOSTAT crop yields, 166 countries, 151 crops, 1961 to 2023. Balanced panel of 305,676 country-crop-year observations. Shares are eta-squared on log yield. The second bar sums to 98.6% rather than 100% because each figure is a median taken across 63 separate decompositions, and medians need not add up."
      details={
        <EvidenceTable
          headers={["Model", "Country", "Crop", "Year", "Residual"]}
          rows={[
            ["All crops pooled", "15.9%", "73.9%", "1.3%", "8.9%"],
            ["Within crop (median of 63)", "69.1%", "removed", "5.6%", "23.9%"],
          ]}
        />
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">All crops in one model</p>
          <VarianceBar rows={pooledSplit} />
          <VarianceLegend rows={pooledSplit} />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            Within a single crop, median across 63 crops
          </p>
          <VarianceBar rows={withinSplit} />
          <VarianceLegend rows={withinSplit} />
        </div>
      </div>
    </EvidenceFrame>
  );
}

const cropVariance = [
  ["Tea leaves", 25.7, 57.9, 16.4, 46],
  ["Soya beans", 63.1, 15.0, 21.9, 43],
  ["Wheat", 69.6, 14.1, 16.3, 84],
  ["Maize (corn)", 69.1, 12.3, 18.6, 126],
  ["Potatoes", 70.8, 11.9, 17.3, 110],
  ["Rice", 71.6, 8.8, 19.5, 98],
  ["Barley", 77.3, 8.3, 14.5, 67],
  ["Sorghum", 80.0, 3.0, 16.9, 74],
  ["Taro", 85.6, 0.8, 13.6, 39],
] as const;

export function CropVarianceRanking() {
  return (
    <EvidenceFrame
      eyebrow="Same method, one crop at a time"
      title="For most crops, place explains far more than year"
      takeaway="Tea is the exception that proves the method works: its yield variation is dominated by a steady climb over six decades rather than by which country grew it."
      source="Source: FAOSTAT crop yields, 1961 to 2023, crops observed in at least 30 countries across every year. Bars show eta-squared on log yield within each crop."
      details={
        <EvidenceTable
          headers={["Crop", "Country", "Year", "Residual", "Countries"]}
          rows={cropVariance.map(([crop, country, year, residual, n]) => [
            crop,
            `${country.toFixed(1)}%`,
            `${year.toFixed(1)}%`,
            `${residual.toFixed(1)}%`,
            n,
          ])}
        />
      }
    >
      <div className="space-y-3" aria-label="Share of yield variance from country and from year, by crop">
        {cropVariance.map(([crop, country, year]) => (
          <div
            key={crop}
            className="grid grid-cols-[6rem_1fr_3rem] items-center gap-3 sm:grid-cols-[8rem_1fr_3.5rem]"
          >
            <span className="text-sm font-semibold text-foreground">{crop}</span>
            <div className="flex h-3 overflow-hidden rounded-full bg-muted">
              <span className="bg-field" style={{ width: `${country}%` }} />
              <span className="bg-decision" style={{ width: `${year}%` }} />
            </div>
            <span className="text-right text-sm tabular-nums text-muted-foreground">
              {year.toFixed(1)}%
            </span>
          </div>
        ))}
        <p className="pt-1 text-xs text-muted-foreground">
          <span className="mr-1 inline-block size-2.5 rounded-full bg-field align-middle" aria-hidden="true" />
          Country
          <span className="ml-4 mr-1 inline-block size-2.5 rounded-full bg-decision align-middle" aria-hidden="true" />
          Year. Trailing figure is the year share.
        </p>
      </div>
    </EvidenceFrame>
  );
}
