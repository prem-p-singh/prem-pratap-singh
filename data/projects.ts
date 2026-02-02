import type { Project } from "@/components/ProjectCard";

export const projects: Project[] = [
  {
    title: "GRBV Impact on Wine Quality",
    description: "Multi-year, omics-driven project funded by CDFA and USDA to dissect the metabolic and transcriptional impacts of Grapevine Red Blotch Virus on Vitis vinifera cv. Merlot berries and wine quality.",
    tech: ["RNA-Seq", "GC-MS", "LC-MS/MS", "R", "Python"],
    links: {},
  },
  {
    title: "GRBV Quantification Assays",
    description: "Developed and validated RT-qPCR and digital PCR assays to quantify GRBV titers across >10 vineyard blocks, enabling spatial and seasonal tracking of infection load.",
    tech: ["RT-qPCR", "Digital PCR", "Statistical Modeling"],
    links: {},
  },
  {
    title: "Nano-encapsulated Antifungal Formulation",
    description: "Engineered a chitosan-gel matrix nano-encapsulated essential oil formulation that significantly inhibited Aspergillus flavus growth and aflatoxin B1 production in postharvest applications.",
    tech: ["Nano-encapsulation", "Chitosan", "GC-MS", "SEM"],
    links: {},
  },
  {
    title: "Multi-omics Biomarker Discovery",
    description: "Integrated multi-platform datasets (GC-MS, LC-MS/MS, RNA-Seq) to identify putative biomarkers linked to virus-induced changes in grape cell wall composition and metabolite profiles.",
    tech: ["Bioconductor", "DESeq2", "Pathway Analysis", "Data Visualization"],
    links: {},
  },
  {
    title: "Sustained-Release Delivery System",
    description: "Developed a green, cost-effective, and scalable chitosan-based delivery system with enhanced formulation stability and sustained release over 60 days in postharvest conditions.",
    tech: ["Chitosan Matrices", "Essential Oils", "Formulation Chemistry"],
    links: {},
  },
  {
    title: "Antifungal Mechanism Elucidation",
    description: "Multi-disciplinary R&D pipeline integrating antifungal screening, GC-MS metabolomics, SEM imaging, and gene expression analysis to uncover mechanisms involving oxidative stress and membrane disruption.",
    tech: ["Transcriptomics", "Metabolomics", "Gene Expression", "Molecular Docking"],
    links: {},
  },
];
