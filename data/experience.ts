import type { TimelineItem } from "@/components/Timeline";

export const education: TimelineItem[] = [
  {
    title: "Ph.D. in Plant Pathology/Postharvest/Food Safety",
    organization: "Banaras Hindu University",
    location: "India",
    startDate: "2017",
    endDate: "2023",
    description: "Thesis: Assessment and amelioration of plant-based bioactive formulation against food-borne pathogens",
  },
  {
    title: "M.Sc. in Botany (Gold Medalist)",
    organization: "Banaras Hindu University",
    location: "India",
    startDate: "2015",
    endDate: "2017",
    description: "Specialization: Plant Pathology and Plant Protection, Microbial Genetics and Biotechnology, Conservation and Restoration Ecology",
  },
  {
    title: "B.Sc. in Botany",
    organization: "Banaras Hindu University",
    location: "India",
    startDate: "2012",
    endDate: "2015",
    description: "Foundation in plant sciences and biological research methods.",
  },
];

export const workExperience: TimelineItem[] = [
  {
    title: "Postdoctoral Scholar",
    organization: "University of California, Davis",
    location: "Davis, CA, USA",
    startDate: "Sep 2023",
    endDate: "Present",
    mentor: "Dr. David E. Block (current); Dr. Anita Oberholster (former, deceased Jan 2025)",
    description: "CDFA- and USDA-funded research on the molecular and metabolic impact of Grapevine Red Blotch Virus (GRBV) on Vitis vinifera cv. Merlot berries and wine quality, co-conducted with Dr. Mysore R. Sudarshana (USDA-ARS, UC Davis).",
    highlights: [
      "Quantified GRBV titer across more than ten vineyard blocks using RT-qPCR and digital PCR",
      "Integrated RNA-Seq, LC-MS/MS, and GC-MS data to map virus-induced changes in sugar accumulation, anthocyanin biosynthesis, and berry cell-wall composition",
      "Performed DESeq2 differential expression and GO, KEGG, and MapMan pathway enrichment on HPC infrastructure",
      "Co-authored two manuscripts in preparation with the Sudarshana group (USDA-ARS)",
      "Presented results at ASEV 2024 and 2025, and at ASPB Plant Biology 2024 (Honolulu)",
    ],
  },
  {
    title: "MOVE Fellow, AI Trainer (part-time)",
    organization: "Handshake AI",
    location: "Remote",
    startDate: "Sep 2025",
    endDate: "Present",
    description: "Scientific reasoning evaluation and biology-domain response grading for frontier large language models on Projects Canary and Cobalt.",
  },
  {
    title: "Ph.D. Research Scholar",
    organization: "Banaras Hindu University",
    location: "India",
    startDate: "2017",
    endDate: "2023",
    mentor: "Dr. Bhanu Prakash",
    description: "Thesis on plant-based bioactive formulations against food-borne microbes, spanning wet-lab formulation, mechanism-of-action assays, and computational target work.",
    highlights: [
      "Optimized a ternary essential-oil formulation (Zingiber, Trachyspermum, Coleus at 1:4:1) by augmented simplex-centroid mixture design",
      "Nano-encapsulated the formulation in chitosan–cinnamic acid nanogels via EDC carbodiimide crosslinking",
      "Suppressed Aspergillus flavus growth and aflatoxin biosynthesis at sub-MIC concentrations in model food systems",
      "Mapped binding poses of essential-oil components against Nor-1, Omt-1, and Vbs in the aflatoxin pathway using AlphaFold, Rosetta, AutoDock, and Amber16 molecular dynamics with MM-PBSA binding-energy analysis",
      "Identified tyrosyl-tRNA synthetase as a druggable antibacterial target by molecular docking",
    ],
  },
];

export const awards = [
  {
    title: "MOVE Fellow (AI Trainer, part-time)",
    organization: "Handshake AI",
    year: "2025",
  },
  {
    title: "Best Poster Presentation",
    organization: "7th International Conference of Phytopathology, ICAR-IARI, New Delhi",
    year: "2020",
  },
  {
    title: "Prof. Radhey Shyam Ambasht Gold Medal (M.Sc.)",
    organization: "Banaras Hindu University",
    year: "2018",
  },
  {
    title: "GATE Qualified",
    organization: "IIT Roorkee",
    year: "2017",
  },
  {
    title: "Professional Member (ID M128836)",
    organization: "American Society for Enology and Viticulture (ASEV)",
    year: "2024",
  },
];

export const training = [
  {
    title: "Scientific Leadership & Management Skills Program",
    organization: "Lawrence Berkeley National Laboratory",
    year: "2025",
  },
  {
    title: "Genome Informatics Workshop",
    organization: "EMBL-EBI & Decode Life",
    year: "2023",
  },
  {
    title: "Bioinformatics & Data Analysis Workshop",
    organization: "Redcliffe Genetics, Banaras Hindu University",
    year: "2022",
  },
  {
    title: "Advanced Multi-omics Data Analysis",
    organization: "Nextgenhelper",
    year: "2022",
  },
  {
    title: "Bacterial Endophytes in Agriculture: Concepts to Application",
    organization: "ICAR-NBAIM, Mau",
    year: "2019",
  },
];
