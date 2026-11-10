// Open-source work from github.com/prem-p-singh. Wording follows each repository's README.

export type SoftwareProject = {
  name: string;
  summary: string;
  language: string;
  status?: string;
  url: string;
};

export const featuredSoftware = {
  name: "RNASeq pipeline",
  version: "v3.0.0",
  released: "November 2026",
  headline: "Your study design. Your reads. A traceable analysis.",
  summary:
    "Turns raw RNA-seq reads into quality reports, gene counts and differential-expression results: bulk libraries, small RNA, Lexogen QuantSeq 3′ end-tag libraries, or a host and a pathogen sequenced together. Describe the study in an Excel intake, review the configuration, then run it with Snakemake on Linux or through SLURM.",
  stats: [
    { value: "41", label: "strict release checks passed" },
    { value: "580", label: "packages in the locked core runtime" },
    { value: "3", label: "DE backends: limma-voom, edgeR, DESeq2" },
  ],
  features: ["Excel intake", "Salmon or STAR", "Small RNA", "QuantSeq 3′ end-tag", "Host + pathogen", "Preflight design check", "Snakemake + SLURM", "GO and WGCNA"],
  video: {
    src: "/projects/rnaseq-pipeline/overview.mp4",
    poster: "/projects/rnaseq-pipeline/overview-poster.jpg",
    label:
      "22-second overview of v3.0.0: the apt install command, the four library types, the Excel intake, the six stages with Salmon or STAR, 41 strict checks passed and the locked runtimes",
  },
  url: "https://github.com/prem-p-singh/RNASeq-pipeline",
  releaseUrl: "https://github.com/prem-p-singh/RNASeq-pipeline/releases/tag/v3.0.0",
};

export const software: SoftwareProject[] = [
  {
    name: "GRBV transcriptomics analysis",
    summary:
      "A 327-sample RNA-seq study of how Grapevine Red Blotch Virus rewires the Merlot transcriptome, and how temperature modulates it.",
    language: "Snakemake + R",
    status: "Pre-submission",
    url: "https://github.com/prem-p-singh/GRBV-Transcriptomics-Analysis",
  },
  {
    name: "RGraphMaker",
    summary:
      "Publication-ready R graphs from a plain-language description: 50 graph types across ggplot2, base R and plotly.",
    language: "R",
    url: "https://github.com/prem-p-singh/RGraphMaker",
  },
  {
    name: "AcademicWriter",
    summary:
      "A paper writing and revision system with 14 workflows, from a first draft to a response to reviewers.",
    language: "Python",
    url: "https://github.com/prem-p-singh/AcademicWriter",
  },
];
