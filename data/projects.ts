import type { Project } from "@/components/ProjectCard";

export const projects: Project[] = [
  {
    title: "GRBV Impact on Wine Quality",
    description: "Multi-year, omics-driven project funded by CDFA and USDA to dissect the metabolic and transcriptional impacts of Grapevine Red Blotch Virus on Vitis vinifera cv. Merlot berries and wine quality.",
    impact: "Identified key metabolic pathways disrupted by GRBV, informing vineyard management for the $58B California wine industry.",
    tech: ["RNA-Seq", "GC-MS", "LC-MS/MS", "R", "Python"],
    links: {},
  },
  {
    title: "GRBV Quantification Assays",
    description: "Developed and validated RT-qPCR and digital PCR assays to quantify GRBV titers across >10 vineyard blocks, enabling spatial and seasonal tracking of infection load.",
    impact: "Enabled early detection and spatial mapping of virus spread, helping growers make informed replanting decisions.",
    tech: ["RT-qPCR", "Digital PCR", "Statistical Modeling"],
    links: {},
  },
  {
    title: "Nano-encapsulated Antifungal Formulation",
    description: "Engineered a chitosan-gel matrix nano-encapsulated essential oil formulation that significantly inhibited Aspergillus flavus growth and aflatoxin B1 production in postharvest applications.",
    impact: "Achieved >90% aflatoxin inhibition using green, food-safe materials — a viable alternative to synthetic preservatives.",
    tech: ["Nano-encapsulation", "Chitosan", "GC-MS", "SEM"],
    links: {},
  },
  {
    title: "Multi-omics Biomarker Discovery",
    description: "Integrated multi-platform datasets (GC-MS, LC-MS/MS, RNA-Seq) to identify putative biomarkers linked to virus-induced changes in grape cell wall composition and metabolite profiles.",
    impact: "Discovered novel biomarkers that could serve as diagnostic tools for early GRBV detection in field conditions.",
    tech: ["Bioconductor", "DESeq2", "Pathway Analysis", "Data Visualization"],
    links: {},
  },
  {
    title: "Sustained-Release Delivery System",
    description: "Developed a green, cost-effective, and scalable chitosan-based delivery system with enhanced formulation stability and sustained release over 60 days in postharvest conditions.",
    impact: "Extended antifungal protection from days to 60+ days, reducing reapplication frequency and cost for food storage.",
    tech: ["Chitosan Matrices", "Essential Oils", "Formulation Chemistry"],
    links: {},
  },
  {
    title: "Antifungal Mechanism Elucidation",
    description: "Multi-disciplinary R&D pipeline integrating antifungal screening, GC-MS metabolomics, SEM imaging, and gene expression analysis to uncover mechanisms involving oxidative stress and membrane disruption.",
    impact: "Revealed a dual-target mechanism (membrane disruption + oxidative stress) opening new avenues for rational antifungal design.",
    tech: ["Transcriptomics", "Metabolomics", "Gene Expression", "Molecular Docking"],
    links: {},
  },
];
