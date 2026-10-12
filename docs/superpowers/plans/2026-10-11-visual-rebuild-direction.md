# Visual rebuild direction

Written 11 Oct 2026 after Prem's feedback that the cleanup pass left the site looking the same. This supersedes Tasks 7b, 9 and 10 of `2026-10-11-frontend-re-edit.md`. Tasks 7a (tokens) and 8 (typefaces) stand and land first.

## Brief

- **Subject:** a plant scientist who takes a crop-disease question from vineyard sampling through the bench to the analysis.
- **Audience:** recruiters and hiring managers for Scientist and Scientist II roles in ag-bio R&D. They skim.
- **Job of the homepage:** in under a minute, show who he is, what he has done with evidence, and how to reach him.
- **Scope:** same content, same routes, same data in `profile/`. New layout and surface treatment. No invented data, figures, quotes or testimonials.

## Concept: a research paper you can skim

The site should read like a well-set article by a working scientist, not like a product landing page. Structure comes from type, a column grid, whitespace and thin rules. Boxes appear only where something is interactive or is a figure.

What this rules out, because each is a generated-site default: floating cards with shadows, gradient washes, glows, pills as decoration, icon tiles, circular avatars, hover lift and zoom, tracked caps labels, numbered markers on unordered things, arrows after link text, middle-dot strings.

What this also rules out, so it does not become the newspaper cliche: dense multi-column body text, zero radius everywhere, rules between every element. Rules mark section boundaries and table rows only. Whitespace does the rest.

## Tokens

- **Colour:** from Task 7a. Page, card, ink, muted ink, rule, one accent. The accent is for links, the current item, and the single result figure in a row. Nothing else. The four category families appear only in charts and the "How I work" sequence.
- **Type:** from Task 8. STIX Two Text for `h1` to `h3` and long-form prose. IBM Plex Sans for navigation, labels, tables, buttons, captions, charts. Figures use `tabular-nums`.
- **Scale:** existing scale is kept (section headings 30 / 36 / 48, page title 36 / 48 / 60, body floor 14px). Serif headings use weight 600 with slightly tighter tracking; body prose is 18px with line-height about 1.65 and a measure of 60 to 72 characters.
- **Radius:** 6px on buttons, inputs and images. 0 on section containers. No radius above 8px anywhere.
- **Shadow:** none, except a one-step shadow on the sticky navigation and on open menus.
- **Motion:** colour and underline transitions on hover and focus only. No entrance animations, no scroll-triggered reveals. `prefers-reduced-motion` respected.

## Layout

A 12-column grid, max width about 1200px, left-aligned throughout. Each section has a heading in the left 4 columns and its content in the right 8 on desktop, stacking on mobile. That one repeated relationship is the page's structure.

```
┌──────────────────────────────────────────────────────────────┐
│ Prem P. Singh            About  Experience  Research  …  [◐] │  plain bar, rule under it
├──────────────────────────────────────────────────────────────┤
│ Prem Pratap Singh                       ┌──────────────┐     │
│ (role line, one sentence)               │   portrait   │     │  hero: type-led,
│ Two-sentence bio, 18px serif.           │  4:5, 6px    │     │  rectangular photo,
│ [Explore research] [CV]  email link     │   radius     │     │  no glow, no pills
│                                         └──────────────┘     │
│ ─────────────────────────────────────────────────────────    │
│ Now        Postdoctoral Scholar, UC Davis                    │  fact rows: label left,
│ Study      Grapevine red blotch, 327 samples, two seasons    │  value right, rules
│ Methods    dPCR, RNA-seq, metabolomics, statistics           │  between rows
│ Published  38 articles, 22 chapters                          │
├──────────────────────────────────────────────────────────────┤
│ How I work        1 ── 2 ── 3 ── 4   (real sequence, kept)   │
│                   selected step's text and evidence          │
├──────────────────────────────────────────────────────────────┤
│ Capabilities      Crop biology        plant pathology, …     │  rows, not cards
│                   Molecular diag.     RT-qPCR, dPCR, …       │
├──────────────────────────────────────────────────────────────┤
│ Experience        2023 to now   Postdoctoral Scholar …       │  dated rows, one
│                   2025 to now   MOVE Fellow …                │  evidence sentence each
├──────────────────────────────────────────────────────────────┤
│ Publications      60 published works, archive toggle         │
│ Projects          title … method … result (accent)           │
│ Notes             date   title                               │  list, not cards
│ Contact           what I am available for, email, links      │
└──────────────────────────────────────────────────────────────┘
```

## The one bold thing

The hero is set almost entirely in type: the name large in STIX Two Text, then the fact rows that read like the header block of a paper. A recruiter gets role, study, methods and output without scrolling. Space is left beside the fact rows for a real data visual later (vineyard block map or dPCR plate) once Prem supplies the data; until then the portrait holds that column.

## Shared surfaces

`.paper-panel`, `.paper-button`, `.paper-control`, `.btn-primary`, `.btn-outline` are redefined once in `app/globals.css`: flat, 1px rule border, 6px radius, no inset highlight, no corner accent. `.btn-primary` is solid accent with contrasting text; `.btn-outline` is ink text with a rule border. Focus-visible is a 2px accent outline with offset.

## Build order

| Task | Scope |
|---|---|
| R1 | Shared surfaces in `globals.css`, navigation, footer, hero |
| R2 | How I work, capabilities, experience |
| R3 | Publications, projects, notes (blog) block, contact, newsletter |
| R4 | Inner pages: `/blog`, `/data`, `/methods`, `/journey`, `/gallery`, slug pages; chart frames |
| R5 | `web-design-guidelines` review of every touched file, both themes, three widths |

Each task: one implementer, one reviewer, then a browser check by the controller in light and dark at 375px, 768px and desktop.

## Open points for Prem

- The site is dark by default. The paper concept is strongest in light. Recommendation: follow the visitor's system setting by default and keep the toggle.
- Heading copy from the Task 5 proposal is applied as each section is rebuilt, once approved.
