// content/data/*.mdx bodies -> plain HTML for WordPress. Interactive parts are dropped or swapped for the static chart PNGs.
// Usage: node build_data.mjs <repo-with-node_modules> <content/data dir> <out.json>
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const [repo, dir, out] = process.argv.slice(2);
const req = createRequire(path.join(repo, "package.json"));
const imp = async (n) => import(pathToFileURL(req.resolve(n)).href);
const matter = req("gray-matter");
const { unified } = await imp("unified");
const remarkParse = (await imp("remark-parse")).default;
const remarkGfm = (await imp("remark-gfm")).default;
const remarkRehype = (await imp("remark-rehype")).default;
const { toJsxRuntime } = await imp("hast-util-to-jsx-runtime");
const jsx = req("react/jsx-runtime");
const { renderToStaticMarkup } = req("react-dom/server");
const SITE = "https://www.prempsingh.com"; // ponytail: images stay hosted on the old site; upload to WP media if that site goes away
// Chart component -> [static figure, alt text]. Each PNG was opened and checked against the text around it.
const CHARTS = {
  AttentionIntensityChart: ["ai-attention-vs-crop-importance/papers_per_tonne.png", "Bar chart of AI plant-disease papers per million tonnes produced, by crop. Coffee 39.8, tomato 15.4, maize 1.3, cassava 0.9, sugarcane 0.2."],
  ResearchOpportunityMatrix: ["ai-attention-vs-crop-importance/attention_vs_production.png", "Scatter plot of AI plant-disease papers against world production for 14 crops. The points do not rise to the right."],
  AIAdoptionTrend: ["ai-attention-vs-crop-importance/ai_share_over_time.png", "Line chart of the share of plant disease papers that use AI, from about 3 percent in 2005 to 14.8 percent in 2025."],
  OutbreakReadinessChart: ["xylella-fastidiosa-spread/validation_timeline.png", "Timeline comparing the confirmed outbreak year with the first public record for Portugal, Spain, Germany, France and Italy."],
  SurveillanceRankingChart: ["xylella-fastidiosa-spread/effort_corrected.png", "Bar chart of Xylella records per million total GBIF records by country. The United States is seventh."],
};
const DROP_SECTIONS = ["Look up any pathogen"]; // heading whose only content was an interactive table
const res = {};
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).sort()) {
  let { content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
  content = content.replace(/<DataGuess[\s\S]*?\/>\s*/g, "");
  for (const [name, [img, alt]] of Object.entries(CHARTS)) content = content.replace(new RegExp(`<${name}\\s*/>`, "g"), `![${alt}](/data/${img})`);
  content = content.replace(/<Takeaway>\s*([\s\S]*?)\s*<\/Takeaway>/g, (_, t) => t.split("\n").map((l) => "> " + l).join("\n"));
  for (const h of DROP_SECTIONS) content = content.replace(new RegExp(`## ${h}\\s*\\n\\s*<\\w+\\s*/>\\s*`), "");
  const left = content.match(/<[A-Z]\w*/g);
  if (left) throw new Error(`${f}: unhandled component ${left.join(", ")}`);
  const p = unified().use(remarkParse).use(remarkGfm);
  const tree = await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).run(p.parse(content));
  const html = renderToStaticMarkup(toJsxRuntime(tree, { Fragment: jsx.Fragment, jsx: jsx.jsx, jsxs: jsx.jsxs })).replace(/(src|href)="\/(?!\/)/g, `$1="${SITE}/`);
  res[f.replace(/\.mdx$/, "")] = html;
}
fs.writeFileSync(out, JSON.stringify(res));
for (const [k, v] of Object.entries(res)) console.log(k, v.length, "chars,", (v.match(/<img/g) || []).length, "images, sha", crypto.createHash("sha256").update(v).digest("hex").slice(0, 16));
