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
    mentor: [
      { name: "Dr. David E. Block", url: "https://wineserver.ucdavis.edu/people/david-block", note: "current" },
      { name: "Dr. Anita Oberholster", url: "https://wineserver.ucdavis.edu/people/anita-oberholster", note: "former, deceased Jan 2025" },
    ],
    collaborator: [
      { name: "Dr. Mysore R. Sudarshana", url: "https://www.ars.usda.gov/people-locations/person/?person-id=42584", note: "USDA-ARS, UC Davis" },
    ],
    description: "CDFA- and USDA-funded research on the molecular and metabolic impact of Grapevine Red Blotch Virus (GRBV) on Vitis vinifera cv. Merlot berries and wine quality.",
    responsibilities: [
      "Lead the laboratory and computational sides of a viral disease-management program across 10+ commercial vineyard blocks over two growing seasons, overseeing field sampling, analysis, and partner reporting",
      "Own the sequencing workflow end to end, from sample processing to an automated, reusable analysis pipeline the team reruns each season",
      "Build and validate diagnostic assays (digital PCR) with quality controls and documented standard procedures",
      "Integrate chemical, genetic, and virus-level data into unified plant-response signatures across disease progression",
      "Coordinate with USDA-ARS scientists, commercial wineries, and university researchers on shared SOPs and data workflows",
    ],
    accomplishments: [
      "Delivered a 300+ sample sequencing study (1.3 billion+ reads) from start to finish, building a pipeline that reruns each season without errors",
      "Developed an AI/ML tool that surfaced candidate infection markers with a signal 2.29x stronger than known plant genetic regions, pointing toward disease-resistant breeding",
      "Enabled earlier detection of viral outbreaks and management decisions that reduced disease spread",
      "Established a statistical disease model explaining how environmental factors and virus levels combine to drive seasonal shifts in symptom severity",
      "Set diagnostic and data-workflow SOPs now used as standard practice, speeding disease-marker identification across teams",
    ],
  },
  {
    title: "MOVE Fellow, AI Trainer (part-time)",
    organization: "Handshake AI",
    location: "Remote",
    startDate: "Sep 2025",
    endDate: "Present",
    description: "Scientific reasoning evaluation and biology-domain response grading for frontier large language models, in partnership with two AI labs.",
    responsibilities: [
      "Review AI-generated scientific responses in plant biology, molecular biology, and biochemistry using Linux/HPC tools, grading them against published research",
      "Author reference answers and structured feedback for partner safety and capability teams",
    ],
    accomplishments: [
      "Flagged factual and reasoning errors that helped partners prioritize corrections and improve model reliability",
      "Documented failure patterns, such as overconfident wrong explanations and fabricated citations, that fed prompt and training refinements to reduce those errors",
    ],
  },
  {
    title: "Ph.D. Research Scholar",
    organization: "Banaras Hindu University",
    location: "India",
    startDate: "2017",
    endDate: "2023",
    mentor: [
      { name: "Dr. Bhanu Prakash", url: "https://www.bhu.ac.in/Site/FacultyProfile/1_148?FA000446" },
    ],
    description: "Thesis on plant-based bioactive formulations against food-borne microbes, spanning wet-lab formulation, mechanism-of-action assays, and computational target work.",
    responsibilities: [
      "Developed and validated plant-based bioactive formulations to protect stored grain from toxin-producing molds, spanning wet-lab efficacy and computational mechanism work",
      "Ran the computational pipeline end to end, from genome assembly and differential expression to molecular docking and simulation, and released the code publicly for reproducibility",
      "Mentored 5+ junior researchers",
    ],
    accomplishments: [
      "Formulated a treatment achieving 85% less mold growth and complete elimination of the toxin in stored sorghum and peanut",
      "Engineered a nano-polymer coating that extended formulation shelf stability to 60 days under storage",
      "Mapped 99.5% of the mold strain's genome and identified 80 toxin-producing gene clusters, including the three most dangerous",
      "Showed the treatment attacks the mold on several fronts at once, including the proteins that produce the toxin, by combining lab assays with simulations",
      "Authored 6 first-author peer-reviewed publications",
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
