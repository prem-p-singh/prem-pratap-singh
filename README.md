<div align="center">

# prempsingh.com

**Academic portfolio & research blog for Dr. Prem Pratap Singh**

Postdoctoral Scholar | Plant Scientist | UC Davis

[![Live Site](https://img.shields.io/badge/Live-prempsingh.com-0e7490?style=for-the-badge)](https://www.prempsingh.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## About

A personal academic website showcasing research publications, projects, experience, and an AI-powered research blog. Built with Next.js App Router, Tailwind CSS, and Framer Motion.

**Key sections:** Hero / About / Experience Timeline / Education / Publications (20+) / Research Projects / Blog / Contact

## Tech Stack

| Layer | Tools |
|-------|-------|
| **Framework** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Content** | MDX, gray-matter, KaTeX (math notation) |
| **SEO** | JSON-LD schemas, OpenGraph images, RSS feed, sitemap |
| **Blog Automation** | Python, OpenAI API, arXiv & Google News feeds |
| **Deployment** | Vercel |

## Blog Automation

An automated pipeline generates weekly research blog posts:

```
CV Keywords + arXiv/News Sources
        |
    LLM Ranking & Draft Generation
        |
    Content Verification & Safety Guards
        |
    Email Notification with One-Click Publish
        |
    Manual Review & Publish via GitHub Actions
```

- **Schedule:** Every Thursday (configurable)
- **Sources:** arXiv papers + Google News, ranked by relevance
- **Guards:** Reference validation, plagiarism detection, link reachability checks
- **Publish:** Via GitHub Actions or CLI with optional title/description overrides

## Project Structure

```
app/                    Next.js App Router pages
components/             React components (Hero, Timeline, Publications, etc.)
content/blog/           Published MDX blog posts
blog_automation/        AI-powered draft generation pipeline
data/                   Structured content (publications, projects, experience)
lib/                    Utilities (MDX parsing)
public/                 Static assets (CV, images, RSS feed)
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Blog automation (offline test)
pip install -r blog_automation/requirements.txt
python blog_automation/generate_draft.py --offline
```

## Connect

[![Google Scholar](https://img.shields.io/badge/Google_Scholar-4285F4?style=flat-square&logo=google-scholar&logoColor=white)](https://scholar.google.com/citations?user=UGFMZEYAAAAJ&hl=en)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/prem-p-singh)
[![ORCID](https://img.shields.io/badge/ORCID-A6CE39?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0000-0001-7921-9379)
[![ResearchGate](https://img.shields.io/badge/ResearchGate-00CCBB?style=flat-square&logo=researchgate&logoColor=white)](https://www.researchgate.net/profile/Prem-Singh-12)

---

<div align="center">
<sub>Built with Next.js & deployed on Vercel</sub>
</div>
