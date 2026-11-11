// Converts every content/blog/*.mdx into one JSON list for the WordPress transfer.
// Usage: node build_posts.mjs <repo-with-node_modules> <content/blog dir> <out.json>
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";
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
const toHtml = (t) => renderToStaticMarkup(toJsxRuntime(t, { Fragment: jsx.Fragment, jsx: jsx.jsx, jsxs: jsx.jsxs }));
const SITE = "https://www.prempsingh.com"; // ponytail: images stay hosted on the old site; upload to WP media if that site goes away
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const posts = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).sort()) {
  const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
  for (const k of ["title", "date"]) if (!data[k]) throw new Error(`${f}: missing ${k}`);
  const tree = await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).run(
    unified().use(remarkParse).use(remarkGfm).parse(content));
  let html = toHtml(tree).replace(/(src|href)="\/(?!\/)/g, `$1="${SITE}/`);
  if (data.tldr?.length) html = `<ul>${data.tldr.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>\n` + html;
  posts.push({ slug: f.replace(/\.mdx$/, "").slice(0, 190), title: data.title, date: String(data.date).slice(0, 10),
    excerpt: data.description || "", tags: data.tags || [], html });
}
posts.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(out, JSON.stringify(posts));
console.log(posts.length, "posts;", posts.map((p) => p.html.length).reduce((a, b) => a + b), "chars of html");
for (const p of posts) console.log(p.date, p.html.length, (p.html.match(/<img/g) || []).length, p.title.slice(0, 60));
