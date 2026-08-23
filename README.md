<div align="center">

<img src="./public/readme-banner.svg" alt="Crop biology and data science — from field samples to decision-ready evidence" width="100%" />

<br />

[![Live portfolio](https://img.shields.io/badge/Live_portfolio-prempsingh.com-285F47?style=for-the-badge)](https://www.prempsingh.com)
[![Research farm](https://img.shields.io/badge/Explore-Research_farm-9C482D?style=for-the-badge)](https://www.prempsingh.com/explore)
[![Methods](https://img.shields.io/badge/Read-Methods-46567D?style=for-the-badge)](https://www.prempsingh.com/methods)
[![Data stories](https://img.shields.io/badge/Open-Data_stories-7A5B16?style=for-the-badge)](https://www.prempsingh.com/data)

</div>

## About

I am **Prem Pratap Singh**, a plant scientist and data scientist at UC Davis. I study crop disease from the first field observation to the final model, connecting molecular diagnostics, multi-omics, and reproducible computation to find evidence that can improve crop decisions.

<p align="center"><strong>300+ crop samples · 1.3B+ sequencing reads · 38 journal articles · 22 book chapters · 2,300+ citations</strong></p>

## How I work

- **Diagnose the crop.** Field sampling, RT-qPCR, digital PCR, and carefully designed assays establish what changed biologically.
- **Build the evidence.** RNA-seq and metabolomics move through reusable Python, R, Bash, Snakemake, SLURM, and Linux/HPC workflows.
- **Make it useful.** Statistics, causal analysis, and machine learning help turn measurements into markers, mechanisms, and decisions.

The crop stays central; the data grows deeper.

## Research in practice

**Grapevine disease**<br />
Commercial-vineyard samples become diagnostic measurements, transcriptomic profiles, infection markers, and seasonal disease models.

**Food safety**<br />
Formulation experiments become optimized treatments, release models, transcriptomic evidence, and testable explanations of toxin control.

**Open crop data**<br />
Public records become reproducible analyses and visual stories that make uncertainty, bias, and biological meaning easier to see.

## Explore

Start with [selected research](https://www.prempsingh.com/#research), then follow the work into [projects](https://www.prempsingh.com/#projects), [methods](https://www.prempsingh.com/methods), or [data stories](https://www.prempsingh.com/data). The [interactive research farm](https://www.prempsingh.com/explore) offers a more playful field-to-evidence route.

[Blog](https://www.prempsingh.com/blog) · [Visual lab](https://www.prempsingh.com/gallery) · [Career journey](https://www.prempsingh.com/journey) · [CV](https://www.prempsingh.com/cv.pdf)

## Built for research communication

The portfolio combines **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Three.js** with MDX research reports, reproducible analysis code, structured scholarly metadata, dynamic RSS, and automated sitemap generation.

<details>
<summary><strong>Repository map</strong></summary>

```text
app/                     Routes, metadata, feeds, APIs, and the research farm
components/              Interface, charts, and interactive experiences
content/                 Blog posts, method reports, and data stories in MDX
profile/                 Publications, projects, experience, skills, and metrics
data-interpretations/    Reproducible analysis code and report-specific data
blog_automation/         Assisted research-draft pipeline
lib/                     Content loaders and shared utilities
public/                  CV, images, figures, and downloadable assets
```

</details>

<details>
<summary><strong>Assisted research-blog workflow</strong></summary>

Every other Thursday, the pipeline gathers recent work from arXiv, OpenAlex, Europe PMC, and Google News; ranks relevant sources; prepares a pending draft; checks references, similarity, and links; and emails a preview for human review. It never publishes automatically.

Full details: [blog automation guide](blog_automation/README.md).

</details>

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Before shipping a change, run:

```bash
npm run lint
npm run build
```

## Connect

[![Google Scholar](https://img.shields.io/badge/Google_Scholar-4285F4?style=flat-square&logo=google-scholar&logoColor=white)](https://scholar.google.com/citations?user=UGFMZEYAAAAJ&hl=en)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/prem-p-singh)
[![ORCID](https://img.shields.io/badge/ORCID-A6CE39?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0000-0001-7921-9379)
[![ResearchGate](https://img.shields.io/badge/ResearchGate-00CCBB?style=flat-square&logo=researchgate&logoColor=white)](https://www.researchgate.net/profile/Prem-Singh-12)

---

<div align="center">
<sub>Field → bench → data → evidence → crop decision</sub>
</div>
