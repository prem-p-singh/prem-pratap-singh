# prempsingh.com: what makes it read as AI-generated

Audit date: 19 Sep 2026. No code was changed.

## Coverage

- **Looked at:** the live homepage at prempsingh.com, top to bottom, in light and dark mode.
- **Read:** `components/HeroClient.tsx`, `app/page.tsx`, `components/GuidedSectionScroll.tsx`, and the theme tokens in `app/globals.css`.
- **Searched:** all `.tsx` / `.ts` files in `app/`, `components/` and `profile/` for 14 common generated-design patterns.
- **Not reviewed:** the `/blog`, `/data`, `/methods` and `/journey` pages. They share the same components, so they very likely have the same issues, but this audit did not check them.
- **Categories checked:** colour, type, hero, layout, numbering and labels, motion, copy.

## Issues found (worst first)

| # | Area | Issue | Evidence |
|---|---|---|---|
| 1 | Colour | Both themes use one of the two most common generated palettes. Light mode is cream (`#fbf8f1`) with a terracotta accent. Dark mode is a tinted near-black (`#111713`) with one bright mint green. The dark `biology` colour (`#e69069`) is very close to Claude's own terracotta (`#D97757`). | `app/globals.css:21-78` |
| 2 | Hero | A circular headshot with a blurred rainbow glow behind it and three pills floating around it (FIELD / BENCH / CODE). This is a very familiar template. Three more coloured pills sit under the bio. | `components/HeroClient.tsx:102-120` |
| 3 | Buttons | The "moving border" buttons are a widely copied UI-kit effect, and they run on a loop in the hero. There are 15 uses across 4 files. | `components/HeroClient.tsx:53` |
| 4 | Headings | Every section opens with a line-plus-ALL-CAPS label ("HOW I WORK", "CAPABILITIES", "SELECTED WORK", "FIELD NOTES"). There are 19 uses, and the CSS forces uppercase with wide letter-spacing. | `app/globals.css:934-956` |
| 5 | Numbering | Things that are not in any order get 01/02/03 numbers: the five capability cards, the three jobs (drawn as large faded numerals), the projects, and the blog cards. Only "How I work" is a real sequence, so only it should be numbered. | `components/ResearchSnapshot.tsx:100`, `components/WorkExperience.tsx:92`, `components/ProjectCaseFiles.tsx:51`, `app/page.tsx:148` |
| 6 | Blog cards | The two latest posts have no image in `public/blog/`. The homepage shows the fallback instead: a gradient box with decorative circles and a giant "01" / "02". That is the most obviously empty part of the page. | `app/page.tsx:137-150` |
| 7 | Card kit | Capabilities is five identical rounded cards, each with an icon tile, a corner number, a coloured top edge and three bullets. Rounded cards appear 26 times, gradient fills 29, and hover lift-and-zoom about 15. | `components/ResearchSnapshot.tsx` |
| 8 | Copy | Headings repeat the same formula back to back: "Crop improvement is the destination. Data is how I get there.", then "Crop biology is my domain. Data science is how I investigate it.", then "I do not begin with a model. I begin with what changed in the plant." Taglines like "New research, no noise." and "Better crop decisions, built on stronger biological data." are the generic slogan voice too. | `components/ResearchPathway.tsx:135,146`, `components/ResearchSnapshot.tsx:79`, `app/page.tsx:186`, `components/NewsletterSignup.tsx:147` |
| 9 | Groups of three | Three hero pills, three floating labels, three stat chips per job, the three-part "Field to molecule / Data to evidence / Evidence to crop" strip, and three contact cards. The house style guide rules this out. | `components/HeroClient.tsx`, `components/WorkExperience.tsx`, `components/ResearchSnapshot.tsx:120`, `app/page.tsx` |
| 10 | Middle dots | The "A · B · C" format appears 53 times, starting with the hero role line, the nav subtitle and the page `<title>`. | `profile/personal.ts:5` |
| 11 | Arrows | An arrow icon is added to link text in 20 places. | `ArrowRight` in 8 files |
| 12 | Scrolling | On desktop, the mouse wheel is taken over so each scroll jumps a whole section. It feels like a template demo, and it gets in a recruiter's way when they are skimming. | `components/GuidedSectionScroll.tsx:84` |
| 13 | Type | One font does every job: `--font-sans`, `--font-serif` and `--font-mono` all point to Urbanist. It is a clean geometric sans with nothing scientific about it, so none of the site's personality comes from the type. | `app/globals.css:124-126` |

## What is already good

- The actual content: 327 vines over two seasons, the dPCR / RNA-seq / metabolite work, the 2.6x outcome, and 60 published works. These are specific, true things no template would produce.
- The "How I work" steps are a real sequence, so numbering them is correct.
- The publications block is a plain, honest archive you can expand.
- The 14px minimum text size and the colour-token structure are sound. The problem is the palette choice, not how it is built.

## Recommended direction

Most of what makes the site distinctive already exists as evidence: field samples, assay plates, sequencing reads, vineyard blocks. Build from those materials instead of the generic kit.

1. **Make one thing memorable, and make it real data.** Replace the headshot glow and floating pills with something only this work can show, such as a vineyard block map or a dPCR plate layout. Put the photo at normal size beside it.
2. **Change the palette** away from cream/terracotta and dark/mint. Take colours from the subject: a paper-grey page, graphite ink, and the red-purple of red blotch leaves as the single accent.
3. **Remove the chrome:** caps labels, numbers on things that are not sequences, moving borders, gradients, hover lifts, arrows on links, middle-dot strings and the scroll-jacking.
4. **Rewrite the headings** so each one states a finding, following `blog_automation/voice_profile.md`, and drop the "X is the destination" formula.
5. **Use two typefaces** with clearly different roles.
6. **Give the two latest blog posts real visual-summary images.**

Steps 3, 4 and 6 are low-risk and do not change the overall look. Steps 1, 2 and 5 are a redesign and need a plan approved first.
