// posts.json -> WordPress import file (WXR 1.2). Usage: node build_wxr.mjs posts.json out.xml
import fs from "node:fs";
const [inp, out] = process.argv.slice(2);
const posts = JSON.parse(fs.readFileSync(inp, "utf8"));
const x = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cdata = (s) => `<![CDATA[${s.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
const items = posts.map((p, i) => `<item>
<title>${x(p.title)}</title>
<dc:creator>${cdata("admin")}</dc:creator>
<content:encoded>${cdata(p.html)}</content:encoded>
<excerpt:encoded>${cdata(p.excerpt)}</excerpt:encoded>
<wp:post_id>${9000 + i}</wp:post_id>
<wp:post_date>${p.date} 09:00:00</wp:post_date>
<wp:post_date_gmt>${p.date} 16:00:00</wp:post_date_gmt>
<wp:post_name>${cdata(p.slug)}</wp:post_name>
<wp:status>publish</wp:status>
<wp:post_type>post</wp:post_type>
<wp:comment_status>closed</wp:comment_status>
<wp:ping_status>closed</wp:ping_status>
<category domain="category" nicename="research-notes">${cdata("Research Notes")}</category>
</item>`).join("\n");
fs.writeFileSync(out, `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
<title>Prem Pratap Singh blog import</title>
<wp:wxr_version>1.2</wp:wxr_version>
<wp:author><wp:author_login>${cdata("admin")}</wp:author_login></wp:author>
<wp:category><wp:category_nicename>research-notes</wp:category_nicename><wp:cat_name>${cdata("Research Notes")}</wp:cat_name></wp:category>
${items}
</channel>
</rss>
`);
console.log("wrote", posts.length, "items");
