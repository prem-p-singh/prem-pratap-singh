# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary visitor is a recruiter or hiring manager filling a Scientist or
Scientist II role in ag-bio R&D. They arrive from a resume, a LinkedIn profile
or an application link, and they are checking whether the person behind the
resume can do the work it describes.

Confirmed by the owner on 2026-11-11. No second audience has been confirmed.

## Product Purpose

prempsingh.com is the career portfolio of Prem Pratap Singh, Ph.D. The homepage
makes the case for hiring him. Every other section exists as evidence behind
that case, not as a separate publication venue.

A visit succeeds when the visitor opens one piece of work (a project, a method
or a data story) and reads it. Contact and the resume download follow from
that; they are not the first goal.

## Positioning

One scientist who covers the field, the bench and the code: vineyard sampling,
molecular assays and the full data analysis. Nothing is lost between teams
because the same person carries the question from the plant to the result.

## Operating Context

- Visitors usually come with a specific role in mind and limited time.
- The resume is offered as a PDF at `public/Prem_Pratap_Singh_Resume.pdf`.
- Blog drafts are generated once a month, reviewed by the owner by email, and
  published by hand through a GitHub Action.
- Analyses live in `data-interpretations/`. Python fetches and computes, R draws
  the figures, and the figures are copied into `public/`.
- The site deploys to Vercel from the `main` branch.

## Capabilities and Constraints

- Sections: the portfolio homepage, `/blog` (research notes), `/data` ("Open
  Data, Decoded"), `/methods` ("Methods That Travel"), `/journey`, `/gallery`
  ("The Visual Lab") and `/privacy`.
- Built with Next.js App Router, MDX content and Tailwind v4. Charts are
  hand-built SVG and flexbox with no charting library.
- CV facts live in `profile/`. Navigation lives in `profile/navigation.ts`.
- A new section needs an entry in `app/sitemap.ts` and its own canonical URL.
- Undecided: whether faculty search committees or readers outside ag-bio are an
  audience the site should serve on purpose.

## Brand Commitments

- Name as shown: Prem Pratap Singh, Ph.D.
- Site description: "Plant scientist and data scientist combining field biology,
  molecular diagnostics, multi-omics, and reproducible analysis to improve crop
  decisions."
- Voice: finding first, method after. Plain language in body text, technical
  detail in a collapsible or a closing methods block. Titles state the finding,
  not the technique. Caveats are collected at the end. The full profile is in
  `blog_automation/voice_profile.md`.
- House style: no em dashes, no rule-of-three padding, no buzzwords.
- Subject icons come from the custom set in
  `components/icons/PortfolioIcons.tsx`.

## Evidence on Hand

- Publications, experience, projects and software in `profile/`.
- Published research notes in `content/blog/`.
- Data stories in `content/data/` and re-applied methods in `content/methods/`,
  each with code under `data-interpretations/` and a recorded data source.
- The resume PDF named above.

Not on hand, and not to be invented: testimonials, employer or client logos,
endorsements, and any quotation, record number, date or signature that would
imply a real record exists behind the words.

## Product Principles

1. Every claim on the homepage points to a piece of work the visitor can open.
2. The shortest path from arrival to one readable piece of work matters more
   than showing everything.
3. Field, bench and code are shown as one line of work, not as three separate
   skill lists.
4. Only real, checkable records are shown. A statement of approach is never
   dressed up as a quotation or a document.

## Accessibility & Inclusion

- No text renders below 14px.
- Charts never rely on colour alone: series are labelled directly and carry a
  second cue.
- Reduced-motion preferences are honoured.
- Undecided: a formal target standard (for example WCAG 2.2 AA) has not been
  set.
