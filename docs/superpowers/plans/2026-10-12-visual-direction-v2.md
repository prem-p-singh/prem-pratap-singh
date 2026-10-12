# Visual direction, version 2

Written 12 Oct 2026. This supersedes `2026-10-11-visual-rebuild-direction.md` wherever the two disagree.

## What happened

The first rebuild direction ("a research paper you can skim") removed too much. Along with the template effects it stripped the cards, the colour and the icons, and sections such as contact and the hero facts ended up reading as a bare text document. Prem's words: the rebuild made some parts worse, and he wanted the theme in the direction of the previous one.

## Prem's decisions (12 Oct 2026)

- **Keep the rebuilt layouts** (the left heading column with content on the right, the stepper, the row structures, the page headers) and **add richness back** on top of them.
- **Colour:** the previous greens and earth tones. The original field-notebook palette returns: green as the main colour, with the terracotta, blue and ochre families as accents.
- **Type:** keep STIX Two Text for headings and prose and IBM Plex Sans for interface text.
- **Bring back:** cards and panels; the round portrait and the hero pills (without the animated glow); icons and coloured accents.
- **Not asked for:** dark as the default. Light stays the default, dark stays on the toggle.

## The look

A field notebook kept by a working scientist: warm paper, green ink for emphasis, content grouped on cards that feel like pages or index cards, and each strand of the work (field, bench, data, decision) carrying its own colour wherever it appears.

- **Page:** the warm cream page and near-white cards of the original palette. Cards sit visibly above the page.
- **Cards and panels:** grouped content lives on `.paper-panel` surfaces again: card background, 1px border, a soft shadow, a generous radius (12 to 16px), comfortable padding. A section's list becomes a set of cards or one panel with divided rows, whichever suits the content. Section containers themselves stay unboxed.
- **Colour families are back in the interface**, used with meaning, not as decoration: `field` for crop and observation, `biology` for bench and mechanism, `data` for computation and evidence, `decision` for translation and outcomes. An item keeps the family it had in the previous design. Uses: an icon tile's wash and icon colour, a card's top or left edge, a tag, a figure's colour, the selected state of a step.
- **Icons:** the custom set in `components/icons/PortfolioIcons.tsx`, shown in tinted tiles (the family's `-wash` background with the family colour for the icon) at a size that reads, about 20 to 24px inside a 40 to 44px tile.
- **Main colour:** green (`--primary` is the `field` green again). Primary buttons are solid green. Links are green or the terracotta accent as they were.
- **Hero:** round portrait with a ring in the field colour and the three small labels (Field, Bench, Code) placed around it, static; the tags under the bio return as coloured tags; the fact rows sit inside a panel.
- **Depth and motion:** soft shadows on cards and the navigation are fine. Hover may change border colour, shadow strength or background tint. Flat tints (`-wash`) are fine as fills.

## What stays removed (these were the template effects, not the theme)

- Scroll-wheel hijacking and scroll snapping.
- Animated moving borders and the travelling shine on buttons.
- The animated conic glow behind the portrait and blurred colour blobs behind the page.
- 01 / 02 / 03 numbering on things that are not a sequence.
- Tracked ALL-CAPS labels with a leading line; arrows appended to link text.
- Hover lift, scale and image zoom; entrance and scroll-triggered animations.
- Multi-colour gradient fills as decoration.
- Text below 14px; arbitrary font sizes.

## What carries over unchanged from the rebuild

- Section pattern: container `max-w-6xl`, heading in the left 4 columns at `text-3xl sm:text-4xl`, content in the right 8, generous vertical rhythm.
- The navigation bar, the page header pattern on inner routes, the tablist behaviour of the steppers, the semantics and accessibility work, the custom icon set, the light default, and all the copy and fact rulings already made.

## Build order

| Task | Scope |
|---|---|
| V1 | Tokens and shared surfaces in `app/globals.css`: restore the original palette values, make green the main colour, give `.paper-panel` and buttons their card treatment back |
| V2 | Homepage top half: hero (round portrait, labels, tags, fact panel), How I work, capabilities, experience, with cards, icon tiles and family colours |
| V3 | Homepage bottom half and inner index pages: publications, projects, notes, contact, skills, blog, data, methods, journey, gallery |
| V4 | Article pages and in-article blocks (the earlier R4b brief, adjusted to this direction) |
| V5 | Final review: accessibility, both themes, three widths, whole-branch code review |
