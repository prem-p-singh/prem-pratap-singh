import type { Publication } from "@/components/PublicationCard";

export const publications: Publication[] = [
  // ── Manuscripts in preparation ─────────────────────────────────────────
  {
    title: "Temporal Dynamics of Grapevine Red Blotch Virus Accumulation in Grapevine Leaves is Influenced by Fruit Maturity Stages",
    authors: ["P. P. Singh", "H. Scully", "K. Reddy", "A. M. Boghozian", "C. Medina-Plaza", "A. Oberholster", "M. R. Sudarshana"],
    venue: "In Preparation",
    year: 2026,
    type: "journal",
    methods: ["RT-qPCR", "Digital PCR", "Statistical Modeling"],
    links: {},
  },
  {
    title: "Grapevine Red Blotch Disease: An Emerging Threat to Global Viticulture",
    authors: ["P. P. Singh", "K. Reddy", "A. M. Boghozian", "A. Oberholster", "M. R. Sudarshana"],
    venue: "In Preparation",
    year: 2026,
    type: "journal",
    methods: ["Review", "Multi-omics"],
    links: {},
  },

  // ── 2026 ───────────────────────────────────────────────────────────────
  {
    title: "Rethinking Arsenal: Non-TAL Effectors Drive Xanthomonas Virulence in Brassica",
    authors: ["R. Singh", "P. P. Singh"],
    venue: "Plant Physiology",
    year: 2026,
    type: "journal",
    methods: ["Review", "Plant-Pathogen Interactions"],
    links: {
      paper: "https://doi.org/10.1093/plphys/kiag109",
    },
  },
  {
    title: "Systematic investigation of aflatoxigenic Aspergillus flavus inhibition: Integrating essential-oils-based formulation with mathematical modeling and transcriptomic analysis",
    authors: ["P. P. Singh", "R. Singh", "P. K. Verma", "B. Prakash"],
    venue: "International Journal of Food Microbiology",
    year: 2026,
    type: "journal",
    methods: ["Transcriptomics", "Mathematical Modeling", "GC-MS"],
    links: {},
  },

  // ── 2025 ───────────────────────────────────────────────────────────────
  {
    title: "Ceramide and C1P: a lipid love story of Brassica–Sclerotinia interaction",
    authors: ["R. Singh", "P. P. Singh"],
    venue: "Plant Physiology",
    year: 2025,
    type: "journal",
    methods: ["Review", "Plant-Pathogen Interactions"],
    links: {
      paper: "https://doi.org/10.1093/plphys/kiae656",
    },
  },
  {
    title: "Microbial genome editing with CRISPR–Cas9: recent advances and emerging applications across sectors",
    authors: ["C. Dudeja", "A. Mishra", "A. Ali", "P. P. Singh", "A. K. Jaiswal"],
    venue: "Fermentation",
    year: 2025,
    type: "journal",
    methods: ["Review", "CRISPR-Cas9"],
    links: {},
  },

  // ── 2024 ───────────────────────────────────────────────────────────────
  {
    title: "Assessment of Trachyspermum ammi essential oil against Aspergillus flavus, aflatoxin B1 contamination, and post-harvest quality of Sorghum bicolor",
    authors: ["P. P. Singh", "A. K. Jaiswal", "R. Singh", "A. Kumar", "V. Gupta", "T. S. Raghuvanshi", "A. Sharma", "B. Prakash"],
    venue: "Food Chemistry",
    year: 2024,
    type: "journal",
    methods: ["GC-MS", "Antifungal Screening", "Postharvest Analysis"],
    links: {
      paper: "https://doi.org/10.1016/j.foodchem.2024.138502",
    },
  },
  {
    title: "Essential oils as green promising alternatives to chemical preservatives for agri-food products",
    authors: ["B. Prakash", "P. P. Singh", "V. Gupta", "T. S. Raghuvanshi"],
    venue: "Food and Chemical Toxicology",
    year: 2024,
    type: "journal",
    methods: ["Molecular Docking", "Toxicity Assessment", "Review"],
    links: {
      paper: "https://doi.org/10.1016/j.fct.2023.114241",
    },
  },

  // ── 2023 ───────────────────────────────────────────────────────────────
  {
    title: "Insights into the antimicrobial efficacy of Coleus aromaticus essential oil against food-borne microbes",
    authors: ["P. P. Singh", "A. K. Jaiswal", "T. S. Raghuvanshi", "B. Prakash"],
    venue: "Food and Chemical Toxicology",
    year: 2023,
    type: "journal",
    methods: ["Molecular Simulation", "GC-MS", "Antimicrobial Assay"],
    links: {
      paper: "https://doi.org/10.1016/j.fct.2023.114111",
    },
  },
  {
    title: "Synthesis, characterization, and assessment of chitosan-nanomatrix enriched with antifungal formulation",
    authors: ["V. Gupta", "P. P. Singh", "B. Prakash"],
    venue: "International Journal of Biological Macromolecules",
    year: 2023,
    type: "journal",
    methods: ["Nano-encapsulation", "SEM", "Chitosan"],
    links: {
      paper: "https://doi.org/10.1016/j.ijbiomac.2023.123684",
    },
  },
  {
    title: "Recent advancement in functional properties and toxicity assessment of plant-derived bioactive peptides using bioinformatic approaches",
    authors: ["P. P. Singh", "V. Gupta", "B. Prakash"],
    venue: "Critical Reviews in Food Science and Nutrition",
    year: 2023,
    type: "journal",
    methods: ["Bioinformatics", "Toxicity Assessment", "Review"],
    links: {
      paper: "https://doi.org/10.1080/10408398.2021.2002807",
    },
  },

  // ── 2022 ───────────────────────────────────────────────────────────────
  {
    title: "Nanoencapsulated plant-based antifungal formulation against Aspergillus flavus and aflatoxin B1 contamination: biochemical and molecular mechanism of action",
    authors: ["A. Kumar", "P. P. Singh", "M. Kumar", "B. Prakash"],
    venue: "International Journal of Food Microbiology",
    year: 2022,
    type: "journal",
    methods: ["Nano-encapsulation", "Gene Expression", "SEM"],
    links: {
      paper: "https://doi.org/10.1016/j.ijfoodmicro.2022.109681",
    },
  },
  {
    title: "Efficacy of chitosan nanomatrix with Cymbopogon citratus essential oil against food-borne molds and aflatoxin B1",
    authors: ["A. Kumar", "P. P. Singh", "B. Prakash"],
    venue: "Pesticide Biochemistry and Physiology",
    year: 2022,
    type: "journal",
    methods: ["Chitosan", "Nano-encapsulation", "Antifungal Screening"],
    links: {
      paper: "https://doi.org/10.1016/j.pestbp.2021.105001",
    },
  },
  {
    title: "Botanicals for sustainable management of stored food grains",
    authors: ["B. Prakash", "P. P. Singh", "A. Kumar", "V. Gupta"],
    venue: "Anthropocene Science",
    year: 2022,
    type: "journal",
    methods: ["Molecular Docking", "Ecological Risk Assessment"],
    links: {
      paper: "https://doi.org/10.1007/s44177-022-00016-2",
    },
  },

  // ── 2021 ───────────────────────────────────────────────────────────────
  {
    title: "Untangling the multi-regime molecular mechanism of verbenol-chemotype Zingiber officinale essential oil against Aspergillus flavus and aflatoxin B1",
    authors: ["P. P. Singh", "A. K. Jaiswal", "A. Kumar", "V. Gupta", "B. Prakash"],
    venue: "Scientific Reports",
    year: 2021,
    type: "journal",
    methods: ["GC-MS", "Gene Expression", "Molecular Docking"],
    links: {
      paper: "https://doi.org/10.1038/s41598-021-86253-8",
    },
  },
  {
    title: "Potential anti-Mycobacterium tuberculosis activity of plant secondary metabolites: molecular docking interactions",
    authors: ["M. Kumar", "S. K. Singh", "P. P. Singh", "V. K. Singh", "A. C. Rai", "A. K. Srivastava", "et al."],
    venue: "Antioxidants",
    year: 2021,
    type: "journal",
    methods: ["Molecular Docking"],
    links: {
      paper: "https://doi.org/10.3390/antiox10121990",
    },
  },
  {
    title: "Microbial biosurfactant: a new frontier for sustainable agriculture and pharmaceutical industries",
    authors: ["A. Kumar", "S. K. Singh", "C. Kant", "H. Verma", "D. Kumar", "P. P. Singh", "et al."],
    venue: "Antioxidants",
    year: 2021,
    type: "journal",
    methods: ["Review"],
    links: {
      paper: "https://doi.org/10.3390/antiox10091472",
    },
  },
  {
    title: "Fabrication, characterization, and antifungal assessment of Jasmine essential-oil-loaded chitosan nanomatrix against Aspergillus flavus in food system",
    authors: ["A. Kujur", "A. Kumar", "P. P. Singh", "B. Prakash"],
    venue: "Food and Bioprocess Technology",
    year: 2021,
    type: "journal",
    methods: ["Nano-encapsulation", "Chitosan", "Characterization"],
    links: {},
  },
  {
    title: "Pesticidal efficacy, mode of action and safety limits profile of essential-oils-based nanoformulation against Callosobruchus chinensis and Aspergillus flavus",
    authors: ["A. Yadav", "A. Kumar", "P. P. Singh", "B. Prakash"],
    venue: "Pesticide Biochemistry and Physiology",
    year: 2021,
    type: "journal",
    methods: ["Nano-encapsulation", "Pesticidal Assay"],
    links: {
      paper: "https://doi.org/10.1016/j.pestbp.2021.104813",
    },
  },

  // ── 2020 ───────────────────────────────────────────────────────────────
  {
    title: "Elucidation of antifungal toxicity of Callistemon lanceolatus essential oil encapsulated in chitosan nanogel against Aspergillus flavus",
    authors: ["P. P. Singh", "A. Kumar", "B. Prakash"],
    venue: "Food Additives & Contaminants: Part A",
    year: 2020,
    type: "journal",
    methods: ["Chitosan", "Nano-encapsulation", "GC-MS"],
    links: {
      paper: "https://doi.org/10.1080/19440049.2020.1775310",
    },
  },
  {
    title: "Unravelling the antifungal and anti-aflatoxin B1 mechanism of chitosan nanocomposite incorporated with Foeniculum vulgare essential oil",
    authors: ["A. Kumar", "P. P. Singh", "B. Prakash"],
    venue: "Carbohydrate Polymers",
    year: 2020,
    type: "journal",
    methods: ["Chitosan", "SEM", "Gene Expression"],
    links: {
      paper: "https://doi.org/10.1016/j.carbpol.2020.116050",
    },
  },
  {
    title: "Assessing the antifungal and aflatoxin B1 inhibitory efficacy of nanoencapsulated formulation based on combination of Ocimum spp. essential oils",
    authors: ["A. Kumar", "P. P. Singh", "V. Gupta", "B. Prakash"],
    venue: "International Journal of Food Microbiology",
    year: 2020,
    type: "journal",
    methods: ["Nano-encapsulation", "Antifungal Screening"],
    links: {
      paper: "https://doi.org/10.1016/j.ijfoodmicro.2020.108766",
    },
  },
  {
    title: "Encapsulation of Bunium persicum essential oil using chitosan nanopolymer: preparation, characterization, antifungal assessment, and thermal stability",
    authors: ["A. Yadav", "A. Kujur", "A. Kumar", "P. P. Singh", "V. Gupta", "B. Prakash"],
    venue: "International Journal of Biological Macromolecules",
    year: 2020,
    type: "journal",
    methods: ["Nano-encapsulation", "Chitosan", "Characterization"],
    links: {},
  },
  {
    title: "Fabrication of volatile-compounds-loaded chitosan biopolymer nanoparticles: optimization, characterization and assessment against Aspergillus flavus and aflatoxin B1 contamination",
    authors: ["A. Kumar", "V. Gupta", "P. P. Singh", "A. Kujur", "B. Prakash"],
    venue: "International Journal of Biological Macromolecules",
    year: 2020,
    type: "journal",
    methods: ["Nano-encapsulation", "Chitosan", "Characterization"],
    links: {
      paper: "https://doi.org/10.1016/j.ijbiomac.2020.09.257",
    },
  },

  // ── 2019 ───────────────────────────────────────────────────────────────
  {
    title: "Nanoencapsulated plant-based bioactive formulation against food-borne molds and aflatoxin B1 contamination",
    authors: ["A. Kumar", "A. Kujur", "P. P. Singh", "B. Prakash"],
    venue: "Food Chemistry",
    year: 2019,
    type: "journal",
    methods: ["Nano-encapsulation", "Stability Analysis"],
    links: {
      paper: "https://doi.org/10.1016/j.foodchem.2019.02.045",
    },
  },
  {
    title: "Nanoencapsulated methyl salicylate as a biorational alternative of synthetic antifungal and aflatoxin B1 suppressive agents",
    authors: ["A. Kujur", "A. Yadav", "A. Kumar", "P. P. Singh", "B. Prakash"],
    venue: "Environmental Science and Pollution Research",
    year: 2019,
    type: "journal",
    methods: ["Nano-encapsulation", "Antifungal Screening"],
    links: {},
  },
  {
    title: "Assessing the preservative efficacy of nanoencapsulated mace essential oil against food-borne molds, aflatoxin B1 contamination, and free-radical generation",
    authors: ["A. Yadav", "A. Kujur", "A. Kumar", "P. P. Singh", "B. Prakash", "N. K. Dubey"],
    venue: "LWT",
    year: 2019,
    type: "journal",
    methods: ["Nano-encapsulation", "Antifungal Screening"],
    links: {},
  },
  {
    title: "Variations of biomass and carbon contents in different traits and components of herbaceous species from tropical grassland",
    authors: ["P. Verma", "R. Sagar", "H. Verma", "A. Rai", "P. Chaturvedi", "P. P. Singh", "K. Kumar", "S. K. Singh"],
    venue: "African Journal of Biological Sciences",
    year: 2019,
    type: "journal",
    methods: ["Ecology", "Field Study"],
    links: {},
  },

  // ── 2018 ───────────────────────────────────────────────────────────────
  {
    title: "Nanoencapsulation: an efficient technology to boost the antimicrobial potential of plant essential oils in food system",
    authors: ["B. Prakash", "A. Kujur", "A. Yadav", "A. Kumar", "P. P. Singh", "N. K. Dubey"],
    venue: "Food Control",
    year: 2018,
    type: "journal",
    methods: ["Nano-encapsulation", "Review"],
    links: {
      paper: "https://doi.org/10.1016/j.foodcont.2018.01.018",
    },
  },
  {
    title: "Biotechnological aspects of plant metabolites in the treatment of ulcer: a new prospective",
    authors: ["A. K. Singh", "S. K. Singh", "P. P. Singh", "A. K. Srivastava", "K. D. Pandey", "A. Kumar", "H. Yadav"],
    venue: "Biotechnology Reports",
    year: 2018,
    type: "journal",
    methods: ["Review"],
    links: {
      paper: "https://doi.org/10.1016/j.btre.2018.e00256",
    },
  },
  {
    title: "Interaction of plant growth-promoting bacteria with tomato under abiotic stress: a review",
    authors: ["V. K. Singh", "A. K. Singh", "P. P. Singh", "A. Kumar"],
    venue: "Agriculture, Ecosystems & Environment",
    year: 2018,
    type: "journal",
    methods: ["Review"],
    links: {
      paper: "https://doi.org/10.1016/j.agee.2018.08.020",
    },
  },
  {
    title: "Distribution of cyanobacteria and their interactions with pesticides in paddy field: a comprehensive review",
    authors: ["A. K. Singh", "P. P. Singh", "V. Tripathi", "H. Verma", "S. K. Singh", "A. K. Srivastava", "A. Kumar"],
    venue: "Journal of Environmental Management",
    year: 2018,
    type: "journal",
    methods: ["Review"],
    links: {
      paper: "https://doi.org/10.1016/j.jenvman.2018.07.039",
    },
  },
  {
    title: "Enumeration of culturable endophytic bacterial population of different Lycopersicum esculentum L. varieties",
    authors: ["M. Singh", "P. P. Singh", "A. K. Patel", "P. K. Singh", "K. D. Pandey"],
    venue: "International Journal of Current Microbiology and Applied Sciences",
    year: 2018,
    type: "journal",
    methods: ["Microbiology"],
    links: {},
  },
  {
    title: "Role of plants and their metabolites in the treatment of diarrhoea",
    authors: ["S. K. Singh", "P. P. Singh", "A. K. Singh", "A. K. Srivastava", "V. K. Singh", "H. Yadav", "et al."],
    venue: "Journal of Scientific Research",
    year: 2018,
    type: "journal",
    methods: ["Review"],
    links: {},
  },

  // ── 2017 ───────────────────────────────────────────────────────────────
  {
    title: "Plant growth-promoting rhizobacteria of Curcuma amada (mango ginger)",
    authors: ["A. Kumar", "H. Verma", "A. Yadav", "W. A. Ansari", "P. P. Singh", "S. K. Singh", "P. K. Singh", "et al."],
    venue: "Journal of Pure and Applied Microbiology",
    year: 2017,
    type: "journal",
    methods: ["Microbiology", "Plant Growth Analysis"],
    links: {},
  },
  {
    title: "Plant-derived bioactive compounds as functional food ingredients and food preservatives",
    authors: ["B. Prakash", "A. Kujur", "P. P. Singh", "A. Kumar", "A. Yadav"],
    venue: "Journal of Nutrition and Food Sciences",
    year: 2017,
    type: "journal",
    methods: ["Review"],
    links: {},
  },

  // ── 2016 ───────────────────────────────────────────────────────────────
  {
    title: "Isolation of plant growth-promoting rhizobacteria and their impact on growth and curcumin content in Curcuma longa L.",
    authors: ["A. Kumar", "M. Singh", "P. P. Singh", "S. K. Singh", "P. K. Singh", "K. D. Pandey"],
    venue: "Biocatalysis and Agricultural Biotechnology",
    year: 2016,
    type: "journal",
    methods: ["Microbiology", "Plant Growth Analysis"],
    links: {
      paper: "https://doi.org/10.1016/j.bcab.2016.07.002",
    },
  },
  {
    title: "Antioxidant efficacy and curcumin content of turmeric (Curcuma longa L.) flower",
    authors: ["A. Kumar", "M. Singh", "P. P. Singh", "S. K. Singh", "P. Raj", "K. D. Pandey"],
    venue: "International Journal of Current Pharmaceutical Research",
    year: 2016,
    type: "journal",
    methods: ["Microbiology"],
    links: {},
  },
];

export const bookChapters: Publication[] = [
  // ── 2023 ───────────────────────────────────────────────────────────────
  {
    title: "Essential oils: from traditional to modern-day applications with special reference to medicinal and aromatic plants in India",
    authors: ["T. S. Raghuvanshi", "P. P. Singh", "N. Kohar", "B. Prakash"],
    venue: "Plant Essential Oils, Springer (ISBN 9789819943692)",
    year: 2023,
    type: "book",
    links: {},
  },
  {
    title: "Green products in the management of stored food grains: challenges, recent advances and future prospects",
    authors: ["B. Prakash", "P. P. Singh", "T. S. Raghuvanshi"],
    venue: "Green Products in Food Safety, Academic Press (Elsevier), ISBN 9780323955904",
    year: 2023,
    type: "book",
    links: {},
  },
  {
    title: "Nanoencapsulated plant essential oils as a shelf-life enhancer for herbal raw materials",
    authors: ["V. Gupta", "P. P. Singh", "A. Kumar", "M. Kumar", "T. S. Raghuvanshi"],
    venue: "Nanotechnology in Herbal Medicine, Woodhead Publishing (Elsevier), ISBN 9780323995276",
    year: 2023,
    type: "book",
    links: {},
  },
  {
    title: "Prospects of bioinformatics and data-acquirement tools in boosting the applications of phytochemicals in food sciences",
    authors: ["A. K. Jaiswal", "P. P. Singh", "B. Prakash"],
    venue: "Plant Essential Oils, Springer (ISBN 9789819943692)",
    year: 2023,
    type: "book",
    links: {},
  },
  {
    title: "Role of biotechnology and combinatorial-chemistry approaches in molecular-assisted engineering of plant volatile compounds",
    authors: ["R. Singh", "P. P. Singh"],
    venue: "Plant Essential Oils, Springer (ISBN 9789819943692)",
    year: 2023,
    type: "book",
    links: {},
  },
  {
    title: "The pharmacokinetic facet of bioactive natural compounds",
    authors: ["P. P. Singh", "T. S. Raghuvanshi", "V. Gupta", "B. Prakash"],
    venue: "Green Products in Food Safety, Academic Press (Elsevier), ISBN 9780323955904",
    year: 2023,
    type: "book",
    links: {},
  },

  // ── 2022 ───────────────────────────────────────────────────────────────
  {
    title: "Food and human health: an outlook of the journey of food from hunger satiation to health-promoting agent",
    authors: ["B. Prakash", "P. P. Singh", "A. Kumar", "V. Gupta"],
    venue: "Research and Technological Advances in Food Science, Academic Press (Elsevier), ISBN 9780128243695",
    year: 2022,
    type: "book",
    links: {},
  },

  // ── 2021 ───────────────────────────────────────────────────────────────
  {
    title: "Recent advancement in plant disease management",
    authors: ["P. P. Singh", "A. Kumar", "V. Gupta", "B. Prakash"],
    venue: "Food Security and Plant Disease Management, Woodhead Publishing (Elsevier), ISBN 9780128218433",
    year: 2021,
    type: "book",
    links: {},
  },
  {
    title: "Prospects of plant products in the management of insect pests of food grains",
    authors: ["B. Prakash", "A. Kumar", "P. P. Singh", "S. Das", "N. K. Dubey"],
    venue: "Natural Bioactive Compounds, Academic Press (Elsevier), ISBN 9780128206553",
    year: 2021,
    type: "book",
    links: {},
  },
  {
    title: "Biosurfactant-producing microbes for clean-up of soil contaminants",
    authors: ["S. K. Singh", "M. K. Singh", "H. Verma", "P. P. Singh", "A. V. Singh", "K. Rashmi"],
    venue: "Microbe-Mediated Remediation of Environmental Contaminants, Woodhead Publishing (Elsevier), ISBN 9780128211991",
    year: 2021,
    type: "book",
    links: {},
  },

  // ── 2020 ───────────────────────────────────────────────────────────────
  {
    title: "Antimicrobial and antioxidant properties of phytochemicals: current status and future perspective",
    authors: ["B. Prakash", "A. Kumar", "P. P. Singh", "L. S. Songachan"],
    venue: "Functional and Preservative Properties of Phytochemicals, Academic Press (Elsevier), ISBN 9780128185933",
    year: 2020,
    type: "book",
    links: {},
  },
  {
    title: "Phytochemicals: intellectual property rights",
    authors: ["M. K. Singh", "S. K. Singh", "A. V. Singh", "H. Verma", "P. P. Singh", "A. Kumar"],
    venue: "Functional and Preservative Properties of Phytochemicals, Academic Press (Elsevier), ISBN 9780128185933",
    year: 2020,
    type: "book",
    links: {},
  },
  {
    title: "Prospects of omics technologies and bioinformatics approaches in food science",
    authors: ["B. Prakash", "P. P. Singh", "A. Kumar", "V. Gupta"],
    venue: "Functional and Preservative Properties of Phytochemicals, Academic Press (Elsevier), ISBN 9780128185933",
    year: 2020,
    type: "book",
    links: {},
  },

  // ── 2019 ───────────────────────────────────────────────────────────────
  {
    title: "Mechanisms of plant–microbe interactions and its significance for sustainable agriculture",
    authors: ["P. P. Singh", "A. Kujur", "A. Yadav", "A. Kumar", "S. K. Singh", "B. Prakash"],
    venue: "PGPR Amelioration in Sustainable Agriculture, Woodhead Publishing (Elsevier), ISBN 9780128158791",
    year: 2019,
    type: "book",
    links: {},
  },
  {
    title: "Medicinal plants under climate change: impacts on pharmaceutical properties of plants",
    authors: ["A. Gupta", "P. P. Singh", "P. Singh", "K. Singh", "A. V. Singh", "S. K. Singh"],
    venue: "Climate Change and Agricultural Ecosystems, Woodhead Publishing (Elsevier), ISBN 9780128164839",
    year: 2019,
    type: "book",
    links: {},
  },
  {
    title: "Microbes as a novel source of secondary metabolite products of industrial importance",
    authors: ["B. Prakash", "P. P. Singh", "A. Kumar", "S. Das", "A. K. Chaudhari"],
    venue: "Role of Plant Growth Promoting Microorganisms in Sustainable Agriculture and Nanotechnology, Woodhead Publishing (Elsevier), ISBN 9780128170045",
    year: 2019,
    type: "book",
    links: {},
  },
  {
    title: "Rhizome endophytes: roles and applications in sustainable agriculture",
    authors: ["A. Gupta", "H. Verma", "P. P. Singh", "P. Singh", "M. Singh", "V. Mishra"],
    venue: "Seed Endophytes: Biology and Biotechnology, Springer, ISBN 9783030105037",
    year: 2019,
    type: "book",
    links: {},
  },
  {
    title: "Sustainable agriculture and benefits of organic farming with special emphasis on PGPR",
    authors: ["P. Mishra", "P. P. Singh", "S. K. Singh", "H. Verma"],
    venue: "Role of Plant Growth Promoting Microorganisms in Sustainable Agriculture and Nanotechnology, Woodhead Publishing (Elsevier), ISBN 9780128170045",
    year: 2019,
    type: "book",
    links: {},
  },
  {
    title: "Tolerance of heavy metal toxicity using PGPR strains of Pseudomonas species",
    authors: ["S. K. Singh", "P. P. Singh", "A. Gupta", "A. K. Singh", "J. Keshri"],
    venue: "PGPR Amelioration in Sustainable Agriculture, Woodhead Publishing (Elsevier), ISBN 9780128158791",
    year: 2019,
    type: "book",
    links: {},
  },

  // ── 2018 ───────────────────────────────────────────────────────────────
  {
    title: "Plant Growth-Promoting Rhizobacteria (PGPR): perspective in agriculture under biotic and abiotic stresses",
    authors: ["A. Kumar", "V. K. Singh", "V. Tripathi", "P. P. Singh", "A. K. Singh"],
    venue: "Crop Improvement Through Microbial Biotechnology, Elsevier, Chapter 16, pp. 333–342",
    year: 2018,
    type: "book",
    links: {
      paper: "https://doi.org/10.1016/B978-0-444-63987-5.00016-5",
    },
  },

  // ── 2017 ───────────────────────────────────────────────────────────────
  {
    title: "Role of Pseudomonas sp. in sustainable agriculture and disease management",
    authors: ["A. Kumar", "H. Verma", "V. K. Singh", "P. P. Singh", "S. K. Singh", "W. A. Ansari", "A. Yadav", "et al."],
    venue: "Agriculturally Important Microbes for Sustainable Agriculture, Vol. 2, Springer, ISBN 9789811053429",
    year: 2017,
    type: "book",
    links: {},
  },
];

export const thesis = {
  title: "Assessment and amelioration of plant-based bioactive formulations against food-borne microbes",
  advisor: "Dr. Bhanu Prakash",
  committee: [],
  expectedCompletion: "2023",
  abstract: "Ternary essential-oil formulation (Zingiber, Trachyspermum, Coleus at 1:4:1) optimized by augmented simplex-centroid mixture design, nano-encapsulated in chitosan–cinnamic acid nanogels via EDC crosslinking. The formulation suppressed Aspergillus flavus growth and aflatoxin biosynthesis at sub-MIC concentrations. A computational arm using AlphaFold, Rosetta, AutoDock, and Amber16 molecular dynamics with MM-PBSA identified tyrosyl-tRNA synthetase as a druggable antibacterial target and mapped binding poses for essential oil components against Nor-1, Omt-1, and Vbs in the aflatoxin pathway.",
};
