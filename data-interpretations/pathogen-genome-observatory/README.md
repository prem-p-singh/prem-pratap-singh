# The famine pathogen has 8 genomes. A leaf spot bacterium has 1,788.

How evenly are public genomes distributed across the plant pathogens the field
itself ranked most important?

Live write-up: https://www.prempsingh.com/data/pathogen-genome-observatory

## The panel

Not my ranking. The 23 pathogens come from three published Top 10 surveys in
*Molecular Plant Pathology*:

- Dean et al. 2012, top 10 fungal pathogens
- Mansfield et al. 2012, top 10 bacterial pathogens
- Kamoun et al. 2015, top 10 oomycete pathogens

## Findings

| | |
|---|---|
| Total assemblies across the panel | 9,843 |
| Most sequenced | *Pseudomonas syringae*, 1,788 |
| *Phytophthora infestans* (potato late blight) | 8 |
| *Puccinia graminis* (wheat stem rust) | 6 |
| *Melampsora lini* (flax rust) | 0 |
| Median bacterium vs median fungus/oomycete | 915 vs 19, a 48x gap |
| Assemblies reaching chromosome level | about 16% |

The split follows sequencing difficulty, not agricultural damage. Bacterial
genomes are small (~5 Mb) and assemble cleanly; fungal and oomycete genomes are
larger, repeat-rich and sometimes dikaryotic, so they stay expensive and
fragmented. That hits hardest for rusts and oomycetes, which keep many
virulence genes in exactly the repetitive regions a draft assembly loses.

## Caveats

An assembly is not an isolate: counts include re-assemblies and lab
derivatives, so genomic diversity is lower than the numbers suggest. Some
genomes live in specialist databases rather than NCBI. Organism-name search can
split or merge species complexes.

## Reproduce

```bash
# from data-interpretations/, with the shared .venv created
../.venv/bin/python code/fetch_ncbi.py   # -> data/raw/pathogen_genomes.csv + provenance
../.venv/bin/python code/analyze.py      # -> results/*.csv + 3 figures
```
