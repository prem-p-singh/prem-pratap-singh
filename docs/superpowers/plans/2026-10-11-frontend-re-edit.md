# Frontend Re-edit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the generated-template look from prempsingh.com so the homepage reads as one scientist's own site, without changing its content model or routes.

**Architecture:** Two phases. Phase 1 deletes template chrome and is safe to ship on its own. Phase 2 is a redesign (palette, type, hero) and each of its three tasks waits for a decision from Prem before any code is written. All colour changes go through the existing token block in `app/globals.css`, so components keep their class names.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4 (`@theme inline`), framer-motion, lucide-react, `next/font/google`. No test framework is installed; verification is `npm run lint`, `npm run build`, grep counts and browser screenshots.

**Spec:** `docs/superpowers/plans/2026-09-19-ai-look-audit.md` (copied from the `portfolio-ai-appearance-d4847b` worktree, where it sits untracked).

## Global Constraints

- Branch: `claude/website-frontend-upgradation-b8b035`. One commit per task. No Claude co-author lines.
- `node_modules` is absent in this worktree. Run `npm install` once before Task 1 (uses the existing lockfile, adds nothing).
- Text never renders below 14px. No arbitrary sizes such as `text-[11px]`.
- Base CSS must reference `var(--font-<name>)` directly, never `var(--font-sans)` (see the Gotchas section of `CLAUDE.md`).
- No new dependencies. No charting library.
- Copy rules: no em dashes, no groups of three unless there are three real items, no slogans, headings state a finding (`blog_automation/voice_profile.md`).
- No invented artifacts. A plate map, block map or figure may only show real data.
- Chart colours are validated, not picked by eye. Any change to the four semantic families must pass the `dataviz` skill validator before commit.
- `.paper-panel` is shared by about twenty files. Change it once, in `globals.css`, and check every page.

## Audit status on 11 Oct 2026

Re-checked every finding against `HEAD` (`1b308a2`). No frontend file has changed since the audit commit (`11bb924`), so all thirteen findings stand. Counts that differ from the audit are because my greps were broader, not because the code moved.

| # | Finding | Still true | Current evidence |
|---|---|---|---|
| 1 | Cream/terracotta and near-black/mint palette | Yes | `app/globals.css:21-93` |
| 2 | Glow headshot with FIELD / BENCH / CODE pills | Yes | `components/HeroClient.tsx:98-120` |
| 3 | Moving-border effect | Yes | 5 files: `globals.css`, `HeroClient.tsx`, `FloatingNavWrapper.tsx`, `ui/moving-border.tsx`, `ui/shiny-card.tsx` |
| 4 | Line plus ALL-CAPS section label | Yes | `.section-kicker` at `app/globals.css:934-957`, 19 uses in 15 files |
| 5 | 01/02/03 on unordered things | Yes | `ResearchSnapshot.tsx:100`, `WorkExperience.tsx:92`, `ProjectCaseFiles.tsx:51`, `SkillsMatrix.tsx:124`, `app/page.tsx:148` |
| 6 | Latest two posts have no image | Yes | 10 Sep and 27 Aug posts have no `public/blog/<slug>/` folder; fallback at `app/page.tsx:135-151` |
| 7 | Identical rounded card kit | Yes | `ResearchSnapshot.tsx` |
| 8 | Formula headings and slogans | Yes | `ResearchPathway.tsx:135,146`, `ResearchSnapshot.tsx:79`, `app/page.tsx:186`, `NewsletterSignup.tsx:147` |
| 9 | Groups of three | Yes | `HeroClient.tsx`, `WorkExperience.tsx`, `ResearchSnapshot.tsx`, `app/page.tsx` |
| 10 | Middle-dot strings | Yes | `profile/personal.ts:3-5` and elsewhere |
| 11 | Arrow appended to link text | Yes | 11 `<ArrowRight>` uses in 8 files |
| 12 | Wheel hijacking | Yes | `components/GuidedSectionScroll.tsx:103,144,170` |
| 13 | One font for every role | Yes | `app/globals.css:129-131`, `app/layout.tsx:8` |

Not covered by the audit and still unreviewed: `/blog`, `/data`, `/methods`, `/journey`, `/gallery`. Task 10 covers them.

## Skills and where each is used

| Skill | Used for |
|---|---|
| `frontend-design` | Phase 2 direction: subject-grounded palette, type and hero. Its list of generated-design tells matches audit items 1, 4, 5, 10, 11. |
| `taste-skill:redesign-skill` | Fix order (font, then colour, then states, then layout) and the Phase 1 checklist. Its advice to add gradients, grain and placeholder photos is **not** followed; it contradicts the audit. |
| `color-expert` | Task 7: tokens authored in OKLCH, a reference-to-semantic token graph, contrast checked for every text and surface pair. |
| `dataviz` | Task 7: validator run on the four chart families after the palette change. |
| `web-design-guidelines` | Task 10: accessibility and interaction review of every touched file. |
| `playground` | Task 7: one HTML page to compare palette candidates on real components before committing. |
| `brightdata-plugin:design-mirror` | Not used. There is no reference site to copy. |
| Other `taste-skill` variants (brutalist, minimalist, soft, stitch, imagegen) | Not used. Each imposes a house look, which is the problem being fixed. |

---

## Phase 1: remove the chrome (no approval needed beyond this plan)

Each task ends with the same gate:

```bash
npm run lint && npm run build
```

Expected: both exit 0. Then load `/` in the browser pane at desktop and 375px, in light and dark, and compare against the pre-task screenshot.

### Task 1: Stop hijacking the scroll wheel

**Files:** Modify `components/GuidedSectionScroll.tsx`, `app/page.tsx:26,36`, `app/globals.css` (`.guided-scroll-section`, `--guided-scroll-offset`).

- [ ] Read `GuidedSectionScroll.tsx` in full and list what it does besides the wheel handler (keyboard, hash sync, active-section tracking).
- [ ] Remove the `wheel` listener and both `preventDefault` calls (lines 103, 144, 170-174). Keep anything the nav depends on for the active section.
- [ ] If nothing else remains, delete the component, its import and its render in `app/page.tsx`, and keep `scroll-margin-top` on sections so anchor links still clear the nav.
- [ ] Verify: wheel scrolls freely; clicking each nav item lands on the right section with the heading visible; `grep -n "wheel" components/GuidedSectionScroll.tsx` returns nothing.
- [ ] Commit: `fix: let the homepage scroll normally`

### Task 2: Remove the moving-border effect

**Files:** Modify `components/HeroClient.tsx:53`, `components/FloatingNavWrapper.tsx`, `app/globals.css` (`.nav-moving-border` rules). Delete `components/ui/moving-border.tsx` and `components/ui/shiny-card.tsx` if no importer remains.

- [ ] `grep -rn "moving-border\|MovingBorder\|shiny-card\|ShinyCard" app components` and record every importer.
- [ ] Replace each use with the existing `.btn-primary` or `.btn-outline` class. No new button style.
- [ ] Remove the `.nav-moving-border + nav::after { content: none }` opt-out only after the travelling highlight is gone, then check the nav corner accent looks intended.
- [ ] Verify: the grep above returns nothing; buttons keep hover, focus-visible and active states.
- [ ] Commit: `refactor: replace moving-border buttons with the standard button classes`

### Task 3: Number only real sequences

**Files:** Modify `components/ResearchSnapshot.tsx:100`, `components/WorkExperience.tsx:92`, `components/ProjectCaseFiles.tsx:51`, `components/SkillsMatrix.tsx:124`, `app/page.tsx:148`.

- [ ] Delete the numeral element at each of the five locations and close any layout gap it leaves.
- [ ] Leave `components/ResearchPathway.tsx:36-84` alone. "How I work" is a real sequence.
- [ ] Leave `components/charts/IndustryEvidenceCharts.tsx:329` alone. It is a rank in a ranking chart.
- [ ] Verify: `grep -rnE "padStart\(2|>0\{index" app components` returns only the chart line.
- [ ] Commit: `refactor: drop numbering from unordered lists`

### Task 4: Replace the caps kicker and the appended arrows

**Files:** Modify `app/globals.css:934-957` and the 8 files that render `<ArrowRight>`.

- [ ] In `.section-kicker`, remove `text-transform: uppercase`, `letter-spacing: 0.09em` and the `::before` line. Set sentence case, weight 600, `color: var(--muted-foreground)`. This fixes all 19 uses from one rule.
- [ ] Read each of the 15 files using `.section-kicker`. Where the kicker only restates the heading below it, delete the kicker. Record which were deleted in the commit body.
- [ ] Remove `<ArrowRight>` where it trails link text. Keep it only where it is the sole content of an icon button, and give that button an `aria-label`.
- [ ] Verify: `grep -rn "<ArrowRight" app components` lists only icon buttons; no heading has lost its label where the label carried information.
- [ ] Commit: `refactor: quiet section labels and remove decorative link arrows`

### Task 5: Rewrite formula headings and middle-dot strings

**Files:** Modify `components/ResearchPathway.tsx:135,146`, `components/ResearchSnapshot.tsx:79`, `app/page.tsx:186`, `components/NewsletterSignup.tsx:147`, `profile/personal.ts:3-5`.

Copy needs Prem's sign-off, so this task produces a proposal table first.

- [ ] Draft one replacement per line, each stating a specific fact from `profile/` (for example the 327 vine samples across two seasons at `profile/projects.ts:12`). Present old and new side by side and wait for approval.
- [ ] Replace `A · B · C` role strings in `profile/personal.ts` with one plain sentence or a comma list. Check `app/layout.tsx` metadata, the nav subtitle and the hero, which all read these fields.
- [ ] Run `grep -rn "·" app components profile` and fix the remaining cases file by file. Leave any inside chart axis labels or citations where the dot is a real separator.
- [ ] Verify: the five strings in audit item 8 no longer appear; `<title>` still reads correctly in the built HTML.
- [ ] Commit: `copy: state findings in homepage headings`

### Task 6: Fix the empty blog cards

**Files:** Modify `app/page.tsx:135-151`. Create `public/blog/<slug>/visual-summary.jpg` for the 10 Sep and 27 Aug posts.

- [ ] Replace the gradient-circles-numeral fallback with a plain text card: title, date, description, on `bg-card`. A missing image then looks deliberate.
- [ ] The two visual summaries need real figures. Ask Prem whether to generate them through the existing blog pipeline or to supply them. Do not draw placeholder art.
- [ ] Verify: homepage "latest posts" shows no gradient fallback with or without images present.
- [ ] Commit: `fix: use a text card when a post has no visual summary`

---

## Phase 2: redesign (each task starts with a decision)

### Task 7: Palette

**Decision needed:** approve, adjust or reject the candidate below.

Candidate, following the audit's direction (paper-grey page, graphite ink, red-blotch leaf colour as the single accent). Authored in OKLCH, all in sRGB gamut, WCAG contrast computed, not estimated:

| Role | Light | Dark |
|---|---|---|
| page | `#f4f3f1` oklch(0.965 0.003 95) | `#111417` oklch(0.19 0.008 255) |
| card | `#fafaf9` oklch(0.985 0.002 95) | `#191c20` oklch(0.225 0.008 255) |
| ink | `#1e2227`, 14.45:1 on page | `#e8e8e5`, 15.03:1 on page |
| muted ink | `#565b62`, 6.16:1 on page | `#a7abb0`, 8.01:1 on page |
| rule | `#d2d1ce` | `#35383c` |
| accent | `#8b1d4f`, 7.97:1 on page | `#ec86aa`, 7.53:1 on page |

Known weakness: the dark page at `#111417` is still a tinted near-black, which is itself a common tell. Option: raise it to about oklch(0.24) so dark mode reads as graphite, and re-check contrast.

- [ ] Build one comparison page with the `playground` skill showing the hero, one card, one chart and body text under the current palette and the candidate, light and dark.
- [ ] After approval, rewrite `app/globals.css:20-93` as reference tokens (raw OKLCH) feeding the existing semantic names, so no component class changes.
- [ ] UI chrome uses ink plus the one accent. The four families (`field`, `biology`, `data`, `decision`) stay only where colour encodes a category, which in practice means charts and the "How I work" steps.
- [ ] Re-derive the four families at matched lightness in OKLCH and run the `dataviz` validator. Both earlier failure modes (chroma floor, deltaE below 15) must pass.
- [ ] Search for hard-coded colours that bypass tokens: `grep -rnE "#[0-9a-fA-F]{3,8}|rgba?\(" app components --include='*.tsx'`. Move each to a token.
- [ ] Remove decorative gradients (45 matches for `gradient` today). Keep a gradient only where it encodes data.
- [ ] Update `data-interpretations/R/theme_pps.R` (`PPS_CAT`) only if the chart families changed, and regenerate figures for all projects, not a subset.
- [ ] Verify: contrast script passes for every text and surface pair in both modes; every page checked in both modes.
- [ ] Commit: `feat: replace the site palette`

### Task 8: Two typefaces

**Decision needed:** which pair. Recommendation: **STIX Two Text** for headings and long-form prose (it is the typeface scientific journals publish in, so it comes from the subject) with **IBM Plex Sans** for navigation, labels, tables and charts. Not verified: that both are exposed by `next/font/google` in this Next version. `node_modules` is absent, so the first step checks.

- [ ] After `npm install`, confirm both families in `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`. If either is missing, stop and report.
- [ ] Load both in `app/layout.tsx` beside the existing `Urbanist` call, exposing `--font-stix` and `--font-plex`.
- [ ] In `app/globals.css:129-131` point `--font-serif` at STIX and `--font-sans` at Plex. Drop `--font-mono` pointing at a sans; use `tabular-nums` for figures instead.
- [ ] Update the base rules that reference `var(--font-urbanist)` directly. Do not route them through `var(--font-sans)`.
- [ ] Keep the type scale: 30 / 36 / 48 for sections, 36 / 48 / 60 for the page title. Give serif body slightly more line-height and cap prose at about 70 characters.
- [ ] Remove Urbanist once nothing references it.
- [ ] Verify: computed `font-family` on a heading, a paragraph and a nav link in the browser; no layout shift on load; 14px floor intact.
- [ ] Commit: `feat: pair a serif for reading with a sans for interface text`

### Task 9: Hero

**Decision needed, and it depends on data only Prem has.** The audit asks for one memorable element made of real data in place of the glow and floating pills. Options, most distinctive first:

1. A vineyard block map of GRBV status built from the real sampling design (327 vine samples, two seasons). Needs a de-identified table of block, row, vine and status.
2. A dPCR plate layout from one real run. Needs the well-level export.
3. An existing real figure from the site's own analyses, such as `public/data/xylella-fastidiosa-spread/global_map.png` or `public/methods/causal-mediation/two_pathways.png`, redrawn as SVG in the new palette, with the headshot at ordinary size beside the text.

Option 3 can be built today, but it shows public-data work, not the vineyard work the homepage leads with. The repo holds no field or bench photographs (`public/images/` has only two headshots; `/gallery` shows analysis figures). Options 1 and 2 cannot be drawn without the data, and a made-up plate or map would break the no-invented-artifacts rule.

- [ ] Remove the conic-gradient glow and the three floating pills (`HeroClient.tsx:100,111-119`) and the three pills under the bio.
- [ ] Set the headshot at a normal size with a plain border.
- [ ] Build the chosen element as hand-written SVG in `components/charts/IndustryEvidenceCharts.tsx` using `EvidenceFrame`, so it gets a source line and a table of the underlying numbers.
- [ ] One load animation at most, and none under `prefers-reduced-motion`.
- [ ] Verify: hero at 375px, 768px and desktop; LCP image still has `priority`.
- [ ] Commit: `feat: lead the homepage with real data`

### Task 10: Card kit, other pages, and review

**Files:** `components/ResearchSnapshot.tsx`, `components/WorkExperience.tsx`, then every route.

- [ ] Capabilities: replace five identical icon cards with a two-column list of capability and evidence. Remove icon tiles, coloured top edges and hover lift.
- [ ] Work experience: replace the three stat chips per job with one sentence carrying the same numbers.
- [ ] Remove hover lift and zoom site-wide (17 matches for `hover:-translate-y`, `hover:scale`, `group-hover:scale`). Keep colour or underline change on hover.
- [ ] Extend the audit to `/blog`, `/data`, `/methods`, `/journey`, `/gallery` using the same thirteen categories, and report in the coverage format from the house rules.
- [ ] Run `web-design-guidelines` on every file touched in this plan and fix what it reports.
- [ ] Final gate: `npm run lint && npm run build`, then screenshots of all seven routes in both modes at two widths.
- [ ] Commit: `refactor: replace the card kit and apply the pass to inner pages`

## Review Focus

- **Keyboard and anchor navigation after Task 1.** A nav click or a `#section` URL must still land with the heading clear of the fixed nav.
- **Dark mode after Task 7.** The site is dark by default; a token missed in `.light` or `:root` shows as unreadable text on one mode only.
- **Charts after Task 7.** Category colours must stay distinguishable under colour-vision deficiency; the validator is the check, not the eye.
- **Posts without images after Task 6.** Any future post published without a visual summary must still produce a tidy card.
- **Font fallback after Task 8.** If a base rule points at `--font-sans`, every page silently falls back to the system font.

## Risks

- `npm install` is required and has not been run in this worktree.
- Task 7 may force regenerating every R figure, which needs the gitignored 520MB FAOSTAT file.
- Tasks 5, 7, 8 and 9 each wait on a decision, so Phase 2 cannot be finished unattended.
