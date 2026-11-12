---
name: prempsingh.com
description: The portfolio of Prem Pratap Singh, Ph.D., hung as a solo exhibition.
colors:
  merlot-wall: "#6b1d35"
  vine-green-wall: "#1f4d3a"
  rose-plaster: "#e7dad8"
  label-card: "#fbf6ee"
  ink: "#1d1418"
  brass: "#e9c46a"
  muted-ink: "#54474a"
  merlot-edge: "#3d0f1d"
  card-edge: "#c9bfae"
  field: "#1f5d3b"
  biology: "#8a2346"
  data: "#1f4e79"
  decision: "#8a5a0a"
  danger: "#b3261e"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Public Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Public Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.14
rounded:
  label: "2px"
  control: "10px"
  button: "14px"
  chip: "3px"
spacing:
  page-gutter: "1rem"
  section-y: "2.5rem"
  card: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.merlot-wall}"
    textColor: "{colors.label-card}"
    rounded: "{rounded.button}"
    padding: "0.8rem 1.6rem"
  button-primary-on-wall:
    backgroundColor: "{colors.label-card}"
    textColor: "{colors.merlot-edge}"
    rounded: "{rounded.button}"
    padding: "0.8rem 1.6rem"
  button-outline:
    backgroundColor: "{colors.label-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0.8rem 1.6rem"
  label-card:
    backgroundColor: "{colors.label-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.label}"
  sign-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.label-card}"
    height: "4rem"
---

# Design System: prempsingh.com

## Overview

**Creative North Star: "The Exhibition"**

The site is hung as a solo exhibition about one scientist. The person is the opening wall. Each project, method and data story is an exhibit in the rooms that follow. The owner chose this direction in November 2026 and asked for a look that is warm, industry professional, and soft and tactile to use.

A section is a room, and a room is one flat coat of wall colour. Lettering sits on the wall at a large scale, like vinyl wall text. Work hangs on label cards of one stock. The owner said a startup-template look would feel wrong, so nothing here borrows from software landing pages.

**Key Characteristics:**
- Wall colour is used at room scale, never as a small accent.
- One flat coat per room. No gradients, washes or glass.
- Every card is the same label stock, wherever it hangs.
- Buttons stand proud of the wall and press in when clicked.
- One theme. There is no dark mode.

## Colors

Two painted walls, one plaster wall and one card stock carry the whole site.

### Primary
- **Merlot Wall** (`merlot-wall`): the opening wall on the homepage, the contact room, and the header rooms of `/journey` and `/privacy`. On plaster it is also the fill of the primary button.

### Secondary
- **Vine Green Wall** (`vine-green-wall`): the rooms that hold the work, and the header rooms of `/blog`, `/data`, `/methods` and `/gallery`.

### Tertiary
- **Brass** (`brass`): the role line and other small accents on a painted wall. Never used on plaster or on a card.

### Neutral
- **Rose Plaster** (`rose-plaster`): the default wall, tinted from the merlot. Dense and long-form content sits here.
- **Label Card** (`label-card`): every card, control and the sign bar. Also the lettering colour on painted walls.
- **Ink** (`ink`): text on plaster and on cards. **Muted Ink** (`muted-ink`) is secondary text there.
- **Field, Biology, Data, Decision** (`field`, `biology`, `data`, `decision`): the four category families used in charts and the "How I work" steps. On a painted wall they lift to light tints, set in `app/globals.css`.

### Named Rules
**The One Coat Rule.** A room is one flat colour from edge to edge. If a surface needs a gradient to look finished, it is the wrong surface.

**The Ink On Paper Rule.** A card always reads as ink on label stock. Cards re-declare the ink tokens for their own subtree, so this holds on any wall.

**The Second Cue Rule.** The four family colours are close in lightness. A chart never relies on colour alone: label series directly and add a second cue.

## Typography

**Display Font:** Bricolage Grotesque (with Helvetica Neue, Arial)
**Body Font:** Public Sans (with Helvetica Neue, Arial)

**Character:** Heavy, slightly irregular wall lettering over a plain, steady reading face. The display face does the talking; the text face stays out of the way.

### Hierarchy
- **Display** (700, `clamp(3rem, 7.2vw, 6rem)`, 0.94): the name on the opening wall only.
- **Headline** (700, 30 to 36px for section headings; 36 / 48 / 60px for inner page titles): one per room.
- **Title** (700, 1.625rem, 1.25): headings inside articles and cards.
- **Body** (400, 1.125rem, 1.6): running text. Article text is capped at 60ch.
- **Label** (600, 0.875rem): tags, meta lines and small labels. This is the floor; nothing renders below 14px.

### Named Rules
**The 14 Pixel Floor.** The Tailwind text tokens are redefined so `text-xs` is 14px. An arbitrary smaller size is a defect.

## Layout

Content sits in a `max-w-[100rem]` container, so wide screens are used with gutters of 1rem, 1.5rem and 2rem at the three breakpoints. A section opens with wall text (`.room-title`): a solid ink plate, the title set large (up to 4.75rem), then the intro directly under it at 22px, and the content full width underneath. Experience and project cards hang two across on wide screens. The small label above a title is a solid ink plate (`.section-kicker`). Rooms change in this order on the homepage: merlot, green, plaster, green, plaster, merlot.

Inner pages open with a header room that paints wall to wall (`.room-bleed`) and then continue on plaster. A fixed sign bar of ink, 4rem tall, runs across the top of every page; pages reserve its height with `pt-16`.

On phones the opening wall stacks: name, role, statement, buttons, then the framed portrait. No page scrolls sideways at 375px.

## Elevation & Depth

Depth comes from hanging, not from glow. Cards cast one soft offset shadow, set once per room in `--shadow-float`. Buttons cast a hard lower edge instead, because they are objects that can be pressed.

### Shadow Vocabulary
- **Hung label** (`box-shadow: 0 18px 30px -18px rgba(29,20,24,.5), 0 2px 4px -2px rgba(29,20,24,.2)`): cards on plaster. Painted walls use a deeper single shadow.
- **Button edge** (`box-shadow: 0 5px 0 <edge colour>`): primary and outline buttons at rest.
- **Sign edge** (`box-shadow: 0 3px 0 #c9bfae`): the sign bar.
- **Frame** (`0 0 0 10px #2a0b15` around a matted image): the portrait only.

### Named Rules
**The Press Rule.** A button moves down 4px and its edge shrinks to 1px while pressed. Nothing else on the site moves on hover.

## Shapes

Corners are crisp. Label cards are 2px with a heavy 4px top rule, chips 3px, controls 10px and buttons 14px. Icons are solid pictograms: filled shapes with detail cut out of the fill, drawn bare at 36px in their family colour (`.icon-stamp`), with no tile and no frame. The few outline icons from `lucide-react` that sit beside them use a 2.5 stroke so they carry the same weight. Borders are 1px hairlines in the room's `--border`. No card carries a coloured edge stripe; the family shows in the icon and the text colour.

## Components

### Buttons
- **Shape:** softly squared (14px), on a hard 5px lower edge.
- **Primary:** on plaster, merlot fill with paper-white text. On a painted wall, paper-white fill with dark text. Padding 0.8rem by 1.6rem.
- **Outline:** label stock with ink text and a card-coloured edge.
- **Hover / Focus:** hover shifts the fill one step. Focus shows a 2px outline in the room's primary colour, offset 2px.
- **Active:** presses down 4px.

### Chips
- **Style:** 3px corners, 1px border, family wash and family text colour. Never a pill. On a wall they take the wall tints.

### Cards / Containers
- **Corner Style:** 2px, under a 4px top rule that is ink by default and takes a family colour where the card has one.
- **Background:** label stock, always.
- **Shadow Strategy:** the hung-label shadow of the room.
- **Border:** 1px hairline.
- **Internal Padding:** 1.25rem is the common step.

### Inputs / Fields
- **Style:** `.paper-control`: label stock, 1px border, 10px corners.
- **Focus:** the shared 2px focus outline. Hover darkens the border to ink.

### Navigation
- **Style:** the sign bar. Ink with paper-white lettering and a 3px brass rule under it. Links underline on hover, the current page is underlined in brass, and "Let's talk" is a brass button. The Explore menu opens as a label card. On phones the links open as one scrolling label card under the bar.

### Framed portrait
The portrait hangs on the opening wall in a label-stock mat with a dark frame edge, with a one-line caption plate under it. Use this treatment for the portrait only.

## Do's and Don'ts

### Do:
- **Do** give a new section a room class (`room-merlot`, `room-green` or `room-paper`) and let the tokens do the rest.
- **Do** put `bg-card` on any element that takes the card colour, so its text turns to ink.
- **Do** keep article text at 60ch or less.
- **Do** keep the four family colours for categories only, with a second cue in charts.

### Don't:
- **Don't** add gradients, washes, glass or gradient text.
- **Don't** use brass on plaster or on a card.
- **Don't** set any text below 14px.
- **Don't** make cards lift, scale or animate on hover. Only buttons move, and only when pressed.
- **Don't** dress a statement up as a quotation, a record or a signed document.
