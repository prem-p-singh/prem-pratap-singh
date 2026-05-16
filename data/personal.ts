export const personal = {
  name: "Prem Pratap Singh",
  title: "Postdoctoral Scholar & Plant Scientist · Viticulture & Enology, UC Davis",
  tagline: "Molecular biology that closes the loop on plant disease, from sample to inference, on commercial crop systems.",
  bio: `Plant pathologist and molecular biologist at the University of California, Davis, working on grapevine–virus interactions and the metabolic consequences of viral infection in berries. Current research under the mentorship of Dr. David E. Block continues a project initiated by the late Dr. Anita Oberholster and is co-conducted with Dr. Mysore R. Sudarshana (USDA-ARS, UC Davis) on Grapevine Red Blotch Virus impact in Merlot berries and wine quality.

Doctoral training at Banaras Hindu University focused on mycotoxin control through plant-based nano-encapsulated formulations, combining wet-lab efficacy studies with computational target identification. Published research spans 36 peer-reviewed articles and 21 book chapters across transcriptomics, targeted metabolomics, nanoencapsulation, and computational biology.

Recent commentaries in Plant Physiology, co-authored with Dr. Ritu Singh, cover plant defense against Sclerotinia and Xanthomonas in Brassica, extending a long-standing interest in how pathogens rewrite host metabolism and how that rewriting can be interrupted with practical molecular tools.`,
  location: "Davis, CA, USA",
  email: "ppssingh@ucdavis.edu",
  secondaryEmail: "pr0982@gmail.com",
  phone: "(530) 760-8784",
  social: {
    github: "https://github.com/prem-p-singh",
    linkedin: "https://www.linkedin.com/in/prem-p-singh",
    googleScholar: "https://scholar.google.com/citations?user=UGFMZEYAAAAJ&hl=en",
    twitter: "",
    orcid: "https://orcid.org/0000-0001-7921-9379",
    researchgate: "https://www.researchgate.net/profile/Prem-Singh-12",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=57199272095",
  },
  avatar: "/images/profile.jpg",
};

export const researchInterests = [
  {
    title: "Grapevine-Virus Interactions",
    description: "Investigating host-pathogen dynamics, transcriptomic profiling, and metabolic pathway analysis in virus-infected grapevines.",
  },
  {
    title: "Multi-Omics Integration",
    description: "Integrating GC-MS, LC-MS/MS, and RNA-Seq data to identify biomarkers and understand plant-pathogen systems.",
  },
  {
    title: "Postharvest Biology & Food Safety",
    description: "Quality evaluation, storage trials, microbial safety, and aflatoxin analysis in agricultural commodities.",
  },
  {
    title: "Nanoencapsulation",
    description: "Developing chitosan-based nano-formulations for sustained release of plant-derived bioactive compounds.",
  },
  {
    title: "Plant Volatiles",
    description: "Extraction, characterization, and biological activity assessment of essential oils against food-borne pathogens.",
  },
  {
    title: "Computational Biology",
    description: "Pathway analysis, molecular docking, protein modeling, and bioinformatics pipelines for plant science.",
  },
];

// Seven core-competency domains. Items are ordered strongest-first; the
// SkillsMatrix component shows the leading subset by default and reveals
// the full list on demand. Keep terms paper-verified (no vague claims).
export const skills = [
  {
    category: "Molecular Diagnostics & Assay Development",
    short: "Diagnostics",
    items: [
      "RT-qPCR", "Digital PCR (dPCR)", "Assay design", "Assay validation",
      "Primer/probe design", "Standard-curve calibration", "Limit of detection",
      "Limit of quantification", "Replicate-variance characterization",
      "Nucleic-acid extraction", "RNA / DNA handling", "Low-input sample handling",
      "MIC determination",
    ],
  },
  {
    category: "NGS Workflow & Library Preparation",
    short: "NGS",
    items: [
      "Illumina TAG-seq", "RNA-Seq", "Library preparation", "Library QC",
      "RNA isolation", "Sequencing-run setup", "UMI-aware quantification",
      "Low-input plant-tissue protocols", "Sample QC", "Bioanalyzer", "Qubit",
    ],
  },
  {
    category: "Computational Biology & Software Engineering",
    short: "Computation",
    items: [
      "Python", "NumPy", "pandas", "scikit-learn", "R", "Bioconductor",
      "Bash", "Snakemake", "SLURM", "Linux / HPC", "Pipeline development",
      "Git / GitHub", "conda / mamba", "Singularity containers",
      "Environment management", "Version control",
    ],
  },
  {
    category: "Bioinformatics & Statistical Analysis",
    short: "Bioinformatics",
    items: [
      "Differential expression (DESeq2, limma-voom, edgeR)", "Repeated-measures voom",
      "Pathway enrichment (GSEA, GO, KEGG, MapMan)",
      "Co-expression networks (WGCNA, GENIE3, DGCA)",
      "Multi-omics integration (MOFA)", "Machine-learning classification",
      "Biomarker discovery", "LASSO / random forest / SVM / gradient boosting",
      "Stability selection", "Cross-validation", "Bayesian inference (brms, Stan)",
      "Causal mediation (HIMA)", "Design of experiments",
      "Response-surface methodology", "Simplex-centroid mixture design",
      "Polynomial regression", "Model-adequacy testing", "JMP",
      "Cross-genome synteny (JCVI MCScan)",
      "Protein structure prediction (AlphaFold, Rosetta)",
      "Molecular docking (AutoDock)", "Molecular dynamics (Amber, MM-PBSA)",
      "Binding-energy validation",
    ],
  },
  {
    category: "Analytical Chemistry & Metabolomics",
    short: "Analytical",
    items: [
      "GC-MS", "LC-MS/MS", "Volatile profiling", "Targeted metabolomics",
      "HPLC", "FT-IR", "UV-Vis", "Fluorescence spectrophotometry",
      "In-vitro release profiling", "Sample preparation",
    ],
  },
  {
    category: "Plant Pathology & Disease Biology",
    short: "Pathology",
    items: [
      "Plant-virus biology", "Plant-fungal pathogen biology",
      "Vineyard / field sampling design", "Pathogen culture", "Infection assays",
      "Postharvest disease modeling", "Stored-grain matrices",
      "Biopesticide formulation chemistry", "Mixture-design optimization",
      "Chitosan nano-encapsulation",
      "Mechanism-of-action characterization (biochemical, structural-computational, transcriptomic)",
    ],
  },
  {
    category: "Documentation, Communication & Cross-Functional Work",
    short: "Documentation",
    items: [
      "SOP authoring", "Technical-report writing",
      "Reproducible-research documentation", "Manuscript writing",
      "Peer review", "Invited commentary", "Cross-functional collaboration",
    ],
  },
];
