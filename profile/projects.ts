import type { Project } from "@/components/ProjectCard";

// Descriptions are written in plain language for a non-specialist reader.
// `skills` lists transferable capabilities; `tech` lists the tools used.
export const projects: Project[] = [
  {
    title: "What Red Blotch Virus Costs a Vineyard",
    category: "Vineyard systems",
    question: "Why does red blotch become more damaging in hot seasons?",
    resultStat: "2.6×",
    description:
      "A multi-year study of 327 vine samples across two growing seasons and four ripening stages, funded by state and federal agriculture agencies, measuring how Grapevine Red Blotch Virus changes grape chemistry and the wine made from it.",
    impact:
      "Infected vines lost roughly 4 points of sugar in a cool season and 10 in a hot one, so heat makes the damage about 2.6 times worse. The study also showed the virus does not trip the vine's immune system; it stops the vine from mounting its normal heat-stress response.",
    skills: [
      "Experimental design",
      "Large-scale data analysis",
      "Reproducible pipelines",
      "Scientific writing",
    ],
    tech: ["RNA sequencing", "Snakemake", "DESeq2", "GC-MS", "R", "Python"],
    papers: [
      {
        label: "Arch Virol 2026",
        url: "https://doi.org/10.1007/s00705-026-06634-0",
      },
    ],
    links: {
      github: "https://github.com/prem-p-singh/GRBV-Transcriptomics-Analysis",
    },
  },
  {
    title: "Early Detection Test for Infected Vines",
    category: "Diagnostics",
    question: "Can infection be measured before symptoms become visible?",
    resultStat: "Before symptoms",
    description:
      "Built and validated laboratory tests that measure how much virus is present in a vine, then ran them across more than ten vineyard blocks to follow infection through the season.",
    impact:
      "Growers can identify infected vines before symptoms are visible and see how infection spreads across a block, which directly informs costly replanting decisions.",
    skills: [
      "Diagnostic test development",
      "Method validation",
      "Field sampling",
      "Statistical analysis",
    ],
    tech: ["RT-qPCR", "Digital PCR"],
    papers: [
      {
        label: "Arch Virol 2026",
        url: "https://doi.org/10.1007/s00705-026-06634-0",
      },
    ],
    links: {},
  },
  {
    title: "Food-Safe Coating Against a Cancer-Causing Mold Toxin",
    category: "Food safety",
    question: "Can a food-safe plant treatment suppress aflatoxin without synthetic preservatives?",
    resultStat: ">90%",
    description:
      "Designed a plant-oil treatment wrapped inside tiny food-safe particles that stops a mold responsible for contaminating stored grain and nuts with aflatoxin, a known human carcinogen.",
    impact:
      "Blocked over 90% of toxin production using food-safe, plant-derived ingredients, offering a practical alternative to synthetic chemical preservatives.",
    skills: [
      "Formulation development",
      "Antimicrobial testing",
      "Materials characterization",
      "Food safety",
    ],
    tech: ["Nano-encapsulation", "Chitosan", "GC-MS", "Electron microscopy"],
    papers: [
      {
        label: "Int J Food Microbiol 2026",
        url: "https://doi.org/10.1016/j.ijfoodmicro.2026.111632",
      },
      {
        label: "Food Chem 2024",
        url: "https://doi.org/10.1016/j.foodchem.2024.138502",
      },
      {
        label: "Food Addit Contam 2020",
        url: "https://doi.org/10.1080/19440049.2020.1775310",
      },
    ],
    links: {},
  },
  {
    title: "Chemical Signatures of Early Infection",
    category: "Multi-omics",
    question: "Can infection be found in chemical signals before it becomes visible?",
    resultStat: "Early markers",
    description:
      "Combined several different laboratory measurements taken from the same grape samples to find the chemical fingerprints that appear once a vine becomes infected.",
    impact:
      "Identified candidate markers that could become a field test for spotting infection before any visible symptoms appear.",
    skills: [
      "Multi-source data integration",
      "Statistical analysis",
      "Biomarker discovery",
      "Data visualization",
    ],
    tech: ["RNA sequencing", "GC-MS", "LC-MS/MS", "R / Bioconductor"],
    links: {},
  },
  {
    title: "Long-Lasting Protection for Stored Food",
    category: "Formulation",
    question: "Can a plant-based coating protect stored food for much longer?",
    resultStat: "60+ days",
    description:
      "Developed a low-cost, plant-based protective coating that releases its active ingredient gradually rather than all at once, and tested how well it held up over time.",
    impact:
      "Extended protection of stored food from a few days to more than 60 days, cutting how often treatment must be reapplied and lowering storage cost.",
    skills: [
      "Formulation chemistry",
      "Stability testing",
      "Cost-effective design",
      "Scale-up planning",
    ],
    tech: ["Chitosan matrices", "Essential oils", "Controlled release"],
    papers: [
      {
        label: "Food Addit Contam 2020",
        url: "https://doi.org/10.1080/19440049.2020.1775310",
      },
      {
        label: "Int J Biol Macromol 2023",
        url: "https://doi.org/10.1016/j.ijbiomac.2023.123684",
      },
    ],
    links: {},
  },
  {
    title: "Finding the Best Oil Blend in Ten Experiments",
    category: "Mathematical modeling",
    question:
      "Which mix of three plant oils works best, without testing every combination?",
    resultStat: "94.7% fit",
    description:
      "Mapped the full space of three-oil blends from 10 planned experiments, then fitted a model that predicts any untested blend.",
    impact:
      "The winning ratio was 1:4:1, ginger to ajwain to Indian borage. It beat all three oils alone and every other mix, working at 0.6 µl/ml against the target mold.",
    skills: [
      "Design of experiments",
      "Statistical model validation",
      "Formulation optimization",
    ],
    tech: [
      "Simplex-centroid mixture design",
      "Special cubic regression",
      "Design-Expert",
      "JMP 8.0",
    ],
    image: "/projects/mixture-design/simplex-centroid.jpg",
    imageWidth: 1600,
    imageHeight: 755,
    imageCaption:
      "Left: the ten blends tested, placed across the three-oil space. Right: inhibitory concentration modelled over every possible blend, where blue is the lowest dose needed. From the doctoral thesis, Banaras Hindu University.",
    papers: [
      {
        label: "Int J Food Microbiol 2026",
        url: "https://doi.org/10.1016/j.ijfoodmicro.2026.111632",
      },
      {
        label: "Food Chem Toxicol 2023",
        url: "https://doi.org/10.1016/j.fct.2023.114111",
      },
    ],
    links: {},
  },
  {
    title: "Finding Where Plant Compounds Attack",
    category: "Drug discovery",
    question:
      "Which proteins do the plant compounds actually bind, and how tightly?",
    resultStat: "8 targets",
    description:
      "Built the 3D protein models from scratch when none existed publicly, then docked the plant compounds into them, ran simulations to check the fit held, and measured binding strength.",
    impact:
      "Covered 8 protein targets and found one new antibacterial target that human cells do not carry. The models became the basis for the lab's later computational work.",
    skills: [
      "Structure-based drug design",
      "Target identification",
      "Simulation and validation",
    ],
    tech: [
      "Homology modelling",
      "AutoDock 4.2",
      "Amber16 molecular dynamics",
      "MM-PBSA binding free energy",
    ],
    papers: [
      {
        label: "Scientific Reports 2021",
        url: "https://doi.org/10.1038/s41598-021-86253-8",
      },
      {
        label: "Food Addit Contam 2020",
        url: "https://doi.org/10.1080/19440049.2020.1775310",
      },
    ],
    links: {},
  },
  {
    title: "Working Out How the Treatment Kills the Mold",
    category: "Mechanism",
    question: "Where does the antifungal treatment strike the mold?",
    resultStat: "Two routes",
    description:
      "Traced exactly how the treatment acts on the mold, by following what happens to its outer surface, its energy production, and which of its genes switch on or off during exposure.",
    impact:
      "Showed the treatment attacks the mold through two separate routes at once, which makes it harder for resistance to develop and guides the design of better treatments.",
    skills: [
      "Mechanism-of-action studies",
      "Gene expression analysis",
      "Microscopy",
      "Computational modeling",
    ],
    tech: ["Transcriptomics", "Metabolomics", "Molecular docking"],
    papers: [
      {
        label: "Food Chem Toxicol 2023",
        url: "https://doi.org/10.1016/j.fct.2023.114111",
      },
      {
        label: "Sci Rep 2021",
        url: "https://doi.org/10.1038/s41598-021-86253-8",
      },
      {
        label: "Int J Food Microbiol 2026",
        url: "https://doi.org/10.1016/j.ijfoodmicro.2026.111632",
      },
    ],
    links: {},
  },
];
