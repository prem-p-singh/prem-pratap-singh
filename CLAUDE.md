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
| `/` | Portfolio: hero, research pathway, snapshot, experience, career map, publications, projects, latest posts, contact | n/a |
| `/blog` | Research notes, semi-automated, grouped into curated sets | 22 |
| `/data` | "Open Data, Decoded", public datasets read honestly | 3 |
| `/methods` | "Methods That Travel", my own models re-applied to public data | 3 |
| `/journey` | Career infographic | n/a |
| `/gallery` | Field and laboratory images | n/a |
| `/privacy` | Privacy notice | n/a |

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

Two of those files export a pair of differently-named components, and neither
filename announces either name. Grep the exports rather than guessing from the
path.

## Theme and type

`app/globals.css` holds a field-notebook colour system. `:root` is **dark by
default**; a `.light` class overrides it. Alongside the usual background and
foreground tokens there are four semantic families, each with a base, `-strong`,
`-foreground` and `-wash` variant:

| Family | Stands for |
|:---|:---|
| `field` | crop and observation |
| `biology` | bench and mechanism |
| `data` | computation and evidence |
| `decision` | translation and outcomes |

`danger` exists as a fifth, smaller family.

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

Headings run 30 / 36 / 48 for sections and 36 / 48 / 60 for the page title, one
step apart at every breakpoint. Keep that gap when adding a section.

Homepage scroll chapters come from `components/GuidedSectionScroll.tsx` plus the
`.guided-scroll-section` class and the `--guided-scroll-offset` variable.

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

More `/methods` pieces exist than analysis folders. `attention-normalization`
and `effort-normalization` point their `codePath` at the OpenAlex and GBIF
projects rather than carrying their own.

## Charts

`data-interpretations/R/theme_pps.R` holds the palette (`PPS_CAT`), the theme
functions (`theme_pps`, `theme_pps_barh`), and the saver (`pps_save`).

The palette is validated, not chosen by eye. An earlier hand-picked set failed
two hard checks: two hues fell below the chroma floor and read as gray, and the
green/slate pair sat at deltaE 12.0 against a floor of 15. Run the `dataviz`
skill validator before changing any colour.

## Blog automation (`blog_automation/`)

Draft generated on odd ISO weeks, Thursday 13:00 UTC, emailed for review, then
published manually through a GitHub Action.

- Model `gpt-5.6`. It rejects a non-default `temperature`, so no temperature
  parameter is sent on any call.
- 104-keyword bank in `config/keywords.yaml`, triangulated selection: two fixed
  anchors (plant pathology, synthetic biology) plus one rotating theme.
- Sources: OpenAlex, Europe PMC, arXiv, Google News.
- Guards: source-quality filter, claim check, novelty check, 700 to 750 word
  ceiling, DOI validation through **Crossref**.
- `voice_profile.md` is injected into the generation prompt. The humanizer step
  is punctuation only, since the voice profile does the heavier work.

Workflows: `.github/workflows/daily-blog-draft.yml` (named "Biweekly Blog
Draft") and `publish-draft.yml`. `social-post.yml.disabled` is parked.

## Writing rules

Finding first, method after. Plain language in body text, technical detail in
the collapsible or the closing methods block. Titles state the finding
concretely rather than naming the technique. Caveats collected at the end, not
sprinkled through. Full profile in `blog_automation/voice_profile.md`.

House style, applies to commits and site copy alike: no em dashes, no
rule-of-three padding, no buzzwords (leverage, cutting-edge, robust,
actionable, next-generation), no Claude co-author lines in commits.

## Gotchas

- `var(--font-sans)` does not resolve in hand-written CSS. Tailwind v4's
  `@theme inline` feeds the utility classes without publishing the variable, so
  the base rules reference `var(--font-urbanist)` directly. Point them back at
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
