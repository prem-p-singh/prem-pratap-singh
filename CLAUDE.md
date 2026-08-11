# prempsingh.com

Personal site and public-data portfolio for Prem Pratap Singh, Ph.D.
Next.js 16 App Router, MDX content, Tailwind, deployed on Vercel.

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
| `/methods` | "Methods That Travel", my own models re-applied to public data | 1 |
| `/journey` | Career infographic | n/a |
| `/gallery` | Field and laboratory images | n/a |

Navigation lives in `components/FloatingNavWrapper.tsx`. It has two tiers:
`primaryItems` (About, Research, Projects, Writing, Data, Journey) in the main
bar, and `exploreItems` (Skills, Experience, Methods, Gallery) in the Explore
dropdown. Adding a section means editing one of those two arrays, plus
`app/sitemap.ts`.

## Content model

Each MDX section has a reader in `lib/`, a listing page, and a `[slug]` page.

| Reader | Directory | Notable frontmatter |
|:---|:---|:---|
| `lib/mdx.ts` | `content/blog/` | title, date, description, tags, image |
| `lib/data.ts` | `content/data/` | dataset, source, sourceUrl, codePath, records, keyStats, methods, methodsNote |
| `lib/methods.ts` | `content/methods/` | method, origin, paperUrl, paperLabel, reappliedTo, codePath, keyStats, toolkit |

`KeyStat` is defined once in `lib/data.ts` and imported by `lib/methods.ts`.
Cover images are auto-extracted from the first markdown image in the body, so a
piece does not need an explicit `image` field.

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

Note the last row: one file, two differently-named exports. The filename does
not announce either of them.

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
  is now punctuation only, since the voice profile does the heavier work.

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

`main` is the deploy branch. Work happens on `codex/*` branches. Two backup
snapshots exist from the August 2026 redesign passes:
`codex/backup-methods-before-engaging-redesign-20260809` and
`codex/backup-before-site-engagement-pass-20260809`. Both are already merged
into `main`, so they are recoverable history rather than pending work.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build, run before pushing content changes
npm run lint
```
