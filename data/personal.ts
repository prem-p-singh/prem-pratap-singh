export const personal = {
  name: "Prem Pratap Singh",
  title: "Postdoctoral Scholar & Plant Scientist · Viticulture & Enology, UC Davis",
  subtitle: "Molecular Diagnostics & Multi-Omics Scientist · Ag-Bio R&D · Genomics Tools",
  tagline: "Molecular biology that closes the loop on plant disease, from sample to inference, on commercial crop systems.",
  openTo: "Open to Scientist / Scientist II roles in ag-bio R&D, molecular diagnostics, NGS workflows, and trait discovery.",
  bio: `Plant pathologist and data scientist at the University of California, Davis, leading both the laboratory and computational sides of a CDFA- and USDA-funded program on Grapevine Red Blotch Virus. Current work continues a project initiated by the late Dr. Anita Oberholster, carried out under the mentorship of Dr. David E. Block and co-conducted with Dr. Mysore R. Sudarshana (USDA-ARS, UC Davis), running from vineyard sampling through more than 300 sequencing libraries to the biological markers that link infection to plant breeding.

The day-to-day sits between the bench and the computer: building and validating diagnostic assays, including digital PCR with documented quality controls, running large-scale RNA sequencing on high-performance computing, and writing reproducible pipelines that hold up season to season. One recent tool identifies the molecular warning signs of infection and points to candidate markers with a signal roughly 2.3 times stronger than known plant genetic regions, work aimed at earlier detection and disease-resistant breeding.

Doctoral training at Banaras Hindu University focused on mycotoxin control through plant-based nano-encapsulated formulations, pairing wet-lab efficacy studies with computational target identification and genome mining. Published research spans 37 peer-reviewed articles and 21 book chapters across transcriptomics, targeted metabolomics, nanoencapsulation, and computational biology. The current focus is scientist roles in agricultural biotech R&D, molecular diagnostics, NGS workflows, and trait discovery, where turning field samples into validated, decision-ready assays is the core of the work.`,
  location: "Davis, CA, USA",
  email: "pr0982@gmail.com",
  secondaryEmail: "ppssingh@ucdavis.edu",
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
    category: "Molecular Biology",
    short: "Mol Bio",
    items: [
      "SDS-PAGE", "Protein purification", "Western blotting",
      "Northern / Southern blotting", "Gel electrophoresis",
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
