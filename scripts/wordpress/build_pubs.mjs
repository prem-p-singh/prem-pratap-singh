// profile/publications.ts -> pubs.json for the WordPress "Publication" fields.
// Usage: node build_pubs.mjs <publications.ts> <out.json>
import fs from "node:fs";
import crypto from "node:crypto";
const [src, out] = process.argv.slice(2);
const js = fs.readFileSync(src, "utf8").replace(/^import type.*$/m, "").replace(/: Publication\[\]/g, "").replace(/export const/g, "const")
  + "\nexport { publications, bookChapters };";
const tmp = out + ".tmp.mjs"; fs.writeFileSync(tmp, js);
const { publications, bookChapters } = await import("file://" + tmp); fs.unlinkSync(tmp);
// Theme is NOT in the source data. The site only offers these four, so this is a keyword rule, first match wins.
const THEMES = [
  ["Molecular Diagnostics", /qpcr|dpcr|digital pcr|diagnos|detection|virus accumulation/i],
  ["Food Safety", /aflatox|mycotox|food|essential oil|nanoencapsul|nano-encapsul|nanoemulsion|preserv|stored|storage|aspergillus|antifungal|shelf|spoilage|chitosan|fumig/i],
  ["Multi-Omics", /omics|transcriptom|rna-seq|metabolom|genom|proteom|sequencing/i],
];
// Hand corrections made on the site on 2026-11-11, where the keyword rule picked the wrong one of the four.
const THEME_OVERRIDES = {
  "Recent advancement in plant disease management": "Plant Disease",
  "Prospects of bioinformatics and data-acquirement tools in boosting the applications of phytochemicals in food sciences": "Multi-Omics",
  "Prospects of omics technologies and bioinformatics approaches in food science": "Multi-Omics",
};
const theme = (p) => { if (THEME_OVERRIDES[p.title]) return THEME_OVERRIDES[p.title]; const t = [p.title, p.venue, ...(p.methods || [])].join(" "); return (THEMES.find(([, re]) => re.test(t)) || ["Plant Disease"])[0]; };
const row = (p, type) => ({ title: p.title, type, theme: theme(p), journal: p.venue, year: p.year, authors: p.authors.join(", "),
  doi: p.links?.doi || p.links?.paper || "", methods: (p.methods || []).join(", "),
  citation: `${p.authors.join(", ")} (${p.year}). ${p.title}. ${p.venue}.` });
const all = [...publications.filter((p) => p.venue !== "In Preparation").map((p) => row(p, "Article")), ...bookChapters.map((p) => row(p, "Book Chapter"))]
  .sort((a, b) => b.year - a.year);
for (const p of all) for (const k of ["title", "journal", "year", "authors"]) if (!p[k]) throw new Error("missing " + k + ": " + JSON.stringify(p));
const json = JSON.stringify(all);
fs.writeFileSync(out, json);
const n = (k, v) => all.filter((p) => p[k] === v).length;
console.log("total", all.length, "| articles", n("type", "Article"), "| chapters", n("type", "Book Chapter"), "| no link", n("doi", ""));
console.log("themes:", ["Plant Disease", "Molecular Diagnostics", "Multi-Omics", "Food Safety"].map((t) => t + " " + n("theme", t)).join(", "));
console.log("bytes", json.length, "sha256", crypto.createHash("sha256").update(json).digest("hex"));
