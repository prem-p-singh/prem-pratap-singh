import type { Project } from "@/components/ProjectCard";

// Descriptions are written in plain language for a non-specialist reader.
// `skills` lists transferable capabilities; `tech` lists the tools used.
export const projects: Project[] = [
  {
    title: "How a Virus Changes Wine Quality",
    description:
      "A multi-year study, funded by state and federal agriculture agencies, on how Grapevine Red Blotch Virus changes the chemistry of wine grapes and the quality of the wine made from them.",
    impact:
      "Pinpointed which ripening processes the virus disrupts, giving growers evidence for when to treat, replant, or harvest differently. California's wine industry is worth roughly $58 billion.",
    skills: [
      "Experimental design",
      "Large-scale data analysis",
      "Project delivery",
      "Scientific writing",
    ],
    tech: ["RNA sequencing", "GC-MS", "LC-MS/MS", "R", "Python"],
    papers: [
      {
        label: "Arch Virol 2026",
        url: "https://doi.org/10.1007/s00705-026-06634-0",
      },
    ],
    links: {},
  },
  {
    title: "Early Detection Test for Infected Vines",
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
    title: "Working Out How the Treatment Kills the Mold",
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
