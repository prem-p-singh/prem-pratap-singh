# prempsingh.com

Personal site and public-data portfolio for Prem Pratap Singh, Ph.D.
Next.js 16 App Router, MDX content, Tailwind v4, deployed on Vercel.

## Purpose

Career portfolio first. The homepage targets recruiters and hiring managers
(Scientist / Scientist II, ag-bio R&D). Every other section exists as evidence
behind that claim, not as a separate publication venue.

## Sections

| Route | What it is | Items |
|:---|:---|:---|
| `/` | Portfolio: hero, research pathway, snapshot (with the skills matrix), experience, publications, projects, latest posts, contact | n/a |
| `/blog` | Research notes, semi-automated, with a featured post and a searchable library | 24 |
| `/data` | "Open Data, Decoded", public datasets read honestly | 3 |
| `/methods` | "Methods That Travel", my own models re-applied to public data | 4 |
| `/journey` | Career chapters and impact summary | n/a |
| `/gallery` | "The Visual Lab": visual summaries from every blog post and method, plus the charts and maps from the data stories, filterable by collection | n/a |
| `/privacy` | Privacy notice | n/a |

`components/CareerMap.tsx` exists but is not mounted on any route.

Navigation lives in `profile/navigation.ts`, not in the nav component.
It exports `primaryNavigation` (About, Experience, Research, Methods, Data,
Blog) for the main bar and `exploreNavigation` (Projects, Skills, Journey,
Gallery) for the dropdown. `components/FloatingNavWrapper.tsx` only renders
them. Adding a section means editing one of those two arrays plus
`app/sitemap.ts`.

## Content model

Each MDX section has a reader in `lib/`, a listing page, and a `[slug]` page.

| Reader | Directory | Notable frontmatter |
|:---|:---|:---|
| `lib/mdx.ts` | `content/blog/` | title, date, description, tags, image, visualSummary |
| `lib/data.ts` | `content/data/` | dataset, source, sourceUrl, codePath, records, keyStats, methods, methodsNote, visualSummary, sourceLinks, accessDate, license |
| `lib/methods.ts` | `content/methods/` | method, origin, paperUrl, paperLabel, reappliedTo, codePath, keyStats, toolkit, visualSummary |

`KeyStat` is defined once in `lib/data.ts` and imported by `lib/methods.ts`.

### Visual summaries

All three readers look for `public/<section>/<slug>/visual-summary.jpg` on disk
and use it automatically when the frontmatter does not name one. No wiring is
needed beyond dropping the file in the right folder.

Blog posts go one step further: when the summary falls back to the first image
in the body, `removeFirstMarkdownImage()` strips that image from the content so
it is not rendered twice. Changing that fallback without keeping the strip in
step produces a duplicated lead image.

CV facts (name, roles, publications, skills) live in `profile/` and are imported
as `@/profile/...`. That folder was called `data/` until August 2026, which
collided with `content/data/`, `app/data/`, `public/data/` and `lib/data.ts`.
If you find an `@/data/...` import anywhere, it is stale.

### MDX rules

- All three renderers need `remarkGfm` or tables render as raw pipe characters.
- Array props passed inline in MDX (`stats={[...]}`) are silently dropped.
  Put structured data in frontmatter and read it in the page component.
- Custom components must be passed explicitly into the `MDXRemote` component
  map. A component that is not in the map renders as literal text, with no error.

## MDX components

| Path | Exports |
|:---|:---|
| `components/data/DataBlocks.tsx` | KeyStats, MythReality, Takeaway, Methods |
| `components/data/DataGuess.tsx` | DataGuess (reader guesses before seeing the answer) |
| `components/data/PathogenTable.tsx` | PathogenTable (searchable) |
| `components/methods/MediationExplorer.tsx` | **VineyardCaseFile** and **CropGrowthExplorer** |
| `components/methods/MethodResources.tsx` | **MethodVisualSummary** and **MethodVideos** |
| `components/content/VisualSummary.tsx` | VisualSummary (used by all three slug pages) |
| `components/charts/IndustryEvidenceCharts.tsx` | **nine** chart components, listed below |
| `components/icons/PortfolioIcons.tsx` | FieldIcon, BenchIcon, AnalysisIcon, CropIcon, CropBiologyIcon, DiagnosticsIcon, OmicsIcon, DataScienceIcon, ResearchDeliveryIcon, SiteMark |

`PortfolioIcons.tsx` is the custom icon set, redrawn in November 2026 as solid
pictograms (filled shapes, detail cut out with `fillRule="evenodd"`, heavy 2.5
strokes for parts that are lines in life). Subject icons (a crop, the bench,
omics) come from it; `lucide-react` is used only for functional controls such
as arrows and chevrons, and for social marks. `docs/design/portfolio-icons.ai`
is the Illustrator master of the set.

Two of the MDX files export a pair of differently-named components, and neither
filename announces either name. Grep the exports rather than guessing from the
path.

The chart file is the largest of them and its name undersells it. It holds every
inline SVG and bar chart used across `/data` and `/methods`, currently
AttentionIntensityChart, ResearchOpportunityMatrix, AIAdoptionTrend,
SurveillanceRankingChart, OutbreakReadinessChart, LandContributionChart,
GrowthStrategyMatrix, YieldVarianceSplit and CropVarianceRanking. Two unexported
helpers, `EvidenceFrame` and `EvidenceTable`, give them a shared frame with an
eyebrow, a takeaway, a source line, and a collapsible table of the underlying
numbers. Add new charts here rather than starting a parallel file, or the frame
gets duplicated.

Charts are hand-built SVG and flexbox, with no charting library. Colours come
from the semantic tokens, so a chart written with `bg-field` and `bg-decision`
follows the room it hangs in without extra work.

## Theme and type

`app/globals.css` holds the "Exhibition" colour system, chosen by the owner in
November 2026 through the Impeccable redesign flow. `DESIGN.md` is the full
record; `PRODUCT.md` holds who the site is for. There is one theme and no dark
mode. `components/ThemeToggle.tsx` is no longer mounted.

The site is hung as a solo exhibition. A section is a room, and a room is one
flat coat of wall colour. Tokens are scoped by container:

| Selector | Wall | Text |
|:---|:---|:---|
| `:root`, `.room-paper` | rose plaster `#e7dad8` (the default) | ink `#1d1418` |
| `.room-merlot` | merlot `#6b1d35` | paper-white `#fbf6ee`, brass accent |
| `.room-green` | vine green `#1f4d3a` | paper-white, brass accent |
| `.paper-panel`, `.paper-control`, `.btn-outline`, `.bg-card` | label-card stock `#fbf6ee` | ink |

A card re-declares the ink tokens for its own subtree, so a card hung on a dark
wall still reads as ink on paper. Any element that takes the card colour
without one of those classes will inherit the wall's white text; give it
`bg-card`. `.room-bleed` lets a room inside the page container paint wall to
wall; the inner page headers use it. There are no gradients or washes.

Alongside the usual background and foreground tokens there are four semantic
families, each with a base, `-strong`, `-foreground` and `-wash` variant:

| Family | Stands for |
|:---|:---|
| `field` | crop and observation |
| `biology` | bench and mechanism |
| `data` | computation and evidence |
| `decision` | translation and outcomes |

`-strong` is the variant that passes as 14px text on the page, on cards and on
its own wash, in both modes: darker than the base in light, lighter than the
base in dark. Use it for small family-coloured text that sits directly on the
page. `danger` exists as a fifth, smaller family.

The four family colours are close in lightness. A chart must never rely on
colour alone: label series directly, add a second cue such as marker shape, and
leave a gap or a stroke between adjacent fills.

**The Tailwind text tokens are redefined**, so the class names do not mean what
they normally do. Every body tier sits 2px above stock while keeping its old
line box, and display sizes are untouched:

```
text-xs    14px      text-base  18px
text-sm    16px      text-lg    20px
```

So `text-xs` is the 14px floor, not 12px. Nothing on the site renders below it.
Adding an arbitrary size such as `text-[11px]` reintroduces the small-text
problem this scale exists to prevent.

Section headings run 30 / 36 and stop there, because they sit in the narrow
left column of the two-column section pattern. The page title runs 36 / 48 / 60.

Homepage sections clear the fixed nav through the `.guided-scroll-section` class
and the `--guided-scroll-offset` variable. The page scrolls natively; there is
no wheel handler or scroll snapping.

### Article typography

`@tailwindcss/typography` is not installed, so `prose-*` modifiers such as
`prose-lg` do nothing. Article typography is a hand-written `.prose` block in
`app/globals.css` that skips anything inside `not-prose`. Its rules are
unlayered, so they beat utility classes on prose elements (`p`, `li`, `h2` and
so on). Any component placed inside an article must sit in a `not-prose`
wrapper, or the article rules restyle it.

### Shared surface treatment

`.paper-panel`, `.paper-control`, `.btn-primary` and `.btn-outline` share
one rule set in `globals.css`: a 1px border and card
background. Panels are exhibit labels: a 2px radius, a 4px top rule and the soft offset shadow
held in `--shadow-float`, which each room sets once. Buttons have a 14px radius
and stand on a hard 5px lower edge; they press down 4px on click. Controls have
a 10px radius and no shadow. `.btn-primary` takes the room's `--primary` and
`.btn-outline` sits on the card colour. Hover changes colour only. `.paper-panel` is used in about twenty files, so a
change there is a change to most surfaces on the site.

These rules are unlayered, so they beat Tailwind utilities on the same element:
a `rounded-*`, `bg-*`, `shadow-*`, `overflow-*` or position class on a
`.paper-panel` has no effect.

### Layout patterns

Homepage sections share one pattern: a container `mx-auto max-w-[100rem]` with the
usual `px-4 sm:px-6 lg:px-8`, then a 12-column grid with a top rule. The heading
block is `room-title lg:col-span-12`: `globals.css` sets the title large on the
left and the lede on the right. The content follows full width
(`lg:col-span-12`). See `components/ResearchSnapshot.tsx` and the
sections in `app/page.tsx`.

Inner pages (`/blog`, `/gallery`, `/journey`) open with a header in the same
container: a `.section-kicker`, an `h1` at 36 / 48 / 60, and a lede capped at
`max-w-[60ch]`. `/blog` and `/gallery` put a `.paper-panel` summary card beside
it in a 12-column grid (7 and 5 columns). Each section below the header opens
with its own top rule.

Cards are `.paper-panel`. Around them sit icon stamps (`.icon-stamp`: a ruled
square in the family colour with an icon from `PortfolioIcons`, no tinted
tile), coloured tags (a 3px-cornered label with a family border, wash and text
colour, never a pill) and stat chips (a wash-filled box with a
family-coloured value, as in the publications count in `app/page.tsx`).

The family tone maps, which pair a family with its literal classes such as
`border-field/20 bg-field-wash text-field`, are currently duplicated across the
files that use them (for example `components/ResearchSnapshot.tsx` and
`components/ProjectCaseFiles.tsx`). They must stay complete literals: Tailwind
cannot see a class built from a variable such as `` `bg-${tone}-wash` ``, and
the class is silently missing from the build.

## Analysis pipeline (`data-interpretations/`)

A monorepo, one folder per piece. Python fetches and computes, R draws.
Run the Python steps first, then the R figure script.

```
<project>/code/       fetch_*.py, analyze.py, figures.R
<project>/data/raw/   fetched data plus provenance.json
<project>/results/    computed tables
<project>/figures/    PNGs, copied into public/<section>/<slug>/
```

Current projects:

| Project | Source | Code |
|:---|:---|:---|
| `xylella-fastidiosa-spread` | GBIF | fetch_gbif.py, analyze.py, map.py, validate.py, figures.R |
| `ai-attention-vs-crop-importance` | OpenAlex + FAOSTAT | fetch_openalex.py, analyze.py, figures.R |
| `pathogen-genome-observatory` | NCBI Datasets | fetch_ncbi.py, analyze.py, figures.R |
| `methods-causal-mediation` | re-applied model | mediation.R |
| `methods-variance-decomposition` | FAOSTAT (reuses the OpenAlex project's raw file) | analyze.py |

A `/methods` piece does not always own a folder. `attention-normalization` and
`effort-normalization` point their `codePath` at the OpenAlex and GBIF projects
rather than carrying their own.

`methods-variance-decomposition` has its own folder but no fetch step: it reads
the FAOSTAT bulk CSV already sitting in `ai-attention-vs-crop-importance`.
Reuse that file rather than fetching a second copy, and note that both the
source `.zip` and the extracted `Production_Crops_Livestock_E_*.csv` are
gitignored. The CSV is 520MB, so a fresh clone has the analysis scripts but not
the input, and the fetch step in the OpenAlex project has to run first.

## Charts

`data-interpretations/R/theme_pps.R` holds the palette (`PPS_CAT`), the theme
functions (`theme_pps`, `theme_pps_barh`), and the saver (`pps_save`).

The palette is validated, not chosen by eye. An earlier hand-picked set failed
two hard checks: two hues fell below the chroma floor and read as gray, and the
green/slate pair sat at deltaE 12.0 against a floor of 15. Run the `dataviz`
skill validator before changing any colour.

## Blog automation (`blog_automation/`)

Draft generated once a month, on the 1st at 13:00 UTC, emailed for review, then
published manually through a GitHub Action.

- Model `gpt-6.1-sol`, set in `config/config.yaml`. No `temperature` parameter
  is sent on any call; the gpt-5.x models rejected a non-default value.
- 104-keyword bank in `config/keywords.yaml`, triangulated selection: two fixed
  anchors (plant pathology, synthetic biology) plus one rotating theme.
- Sources: OpenAlex, Europe PMC, arXiv, Google News.
- Guards: source-quality filter, claim check, novelty check, 700 to 750 word
  ceiling, DOI validation through **Crossref**.
- `voice_profile.md` is injected into the generation prompt. The humanizer step
  is punctuation only, since the voice profile does the heavier work.

Workflows: `.github/workflows/daily-blog-draft.yml` (named "Monthly Blog
Draft"; the filename is older than the schedule) and `publish-draft.yml`.
`social-post.yml.disabled` is parked.

## Writing rules

Finding first, method after. Plain language in body text, technical detail in
the collapsible or the closing methods block. Titles state the finding
concretely rather than naming the technique. Caveats collected at the end, not
sprinkled through. Full profile in `blog_automation/voice_profile.md`.

House style, applies to commits and site copy alike: no em dashes, no
rule-of-three padding, no buzzwords (leverage, cutting-edge, robust,
actionable, next-generation), no Claude co-author lines in commits.

Do not stage invented artifacts. Quotation marks, a record number, a date, or a
signature all assert that a real record exists behind the words. A statement of
approach can be displayed in a notebook-styled panel, but the moment it is
punctuated as a quotation it is claiming to be something it is not. The field
note on the homepage was a blockquote until August 2026 for this reason.

## Gotchas

- `var(--font-sans)` does not resolve in hand-written CSS. Tailwind v4's
  `@theme inline` feeds the utility classes without publishing the variable, so
  the base rules reference `var(--font-text)` (Public Sans) and `var(--font-display)` (Bricolage Grotesque) directly. Point them back at
  `--font-sans` and every page silently falls back to the visitor's system font.
- The publish workflow must pick drafts by **filename timestamp**, not mtime.
  `actions/checkout` resets every file's mtime, so `ls -t` returns the wrong draft.
- A blocked publish must `sys.exit(1)`. Returning 0 gives a green CI run on a
  failed publish.
- Never trust an HTTP 403 or a connection reset as proof a DOI is dead.
  Publishers block bots. Verify through Crossref instead.
- Vercel's deploy webhook drops occasionally. "Redeploy" re-runs the old commit
  and does not pull latest. Push an empty commit to force a fresh build.
- New sections need an entry in `app/sitemap.ts` or they never get indexed.
- Child pages inherit the root layout's canonical URL unless they set their own
  `alternates.canonical`. `/blog` and `/gallery` were both pointing at the
  homepage until this was fixed.

## Branches

`main` is the deploy branch. Work happens on `codex/*` branches.

Backup snapshots from the August 2026 redesign and colour-theme passes:
`codex/backup-methods-before-engaging-redesign-20260809`,
`codex/backup-before-site-engagement-pass-20260809` and
`codex/backup-before-color-theme-20260812`. All are merged into `main`, so they
are recoverable history rather than pending work. The last one and
`codex/color-theme` exist only on this machine; they have never been pushed.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build, run before pushing content changes
npm run lint
```
