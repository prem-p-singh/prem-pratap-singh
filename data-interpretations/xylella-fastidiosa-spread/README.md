# Can a public database detect a plant disease outbreak?

A reproducible test of whether public GBIF occurrence records carry real signal
about *Xylella fastidiosa*, a bacterium behind severe disease in olive,
grapevine, almond, and citrus.

Live write-up: https://www.prempsingh.com/data/xylella-fastidiosa-spread

## The question

Occurrence databases are often used as proxies for disease spread. Rather than
assume that works or assume it does not, this tests it against outbreaks whose
dates are independently documented.

## Findings

**1. Validation against documented European incursions**

| Country | Documented | First GBIF record | Lag |
|---|---|---|---|
| Italy | 2013 | 2013 | 0 yr |
| France | 2015 | 2012 | −3 yr |
| Spain | 2016 | 2017 | +1 yr |
| Germany | 2016 | 2026 | +10 yr |
| Portugal | 2019 | never | — |

The two largest, most publicised epidemics (Italy, Spain) appear almost
immediately. The two smallest contained incursions do not. Detection tracks
outbreak size and publicity, not presence, so these records can corroborate a
major incursion but cannot be used to argue a country is free of the pathogen.

**2. Sampling-effort correction**

Raw counts are dominated by the US (543 of 1,170 records, 48%). Dividing each
country's records by its *total* GBIF record count gives a comparable rate. The
US falls from rank 1 to rank 7, while Italy and Brazil rise to the top, both of
which have documented major epidemics. The corrected ranking agrees better with
known epidemiology than the raw one.

Caveat: Iran ranks first on only 10 records, so the top of that list is a
shortlist worth checking, not a finding.

## Data

- Source: GBIF.org, *Xylella fastidiosa* (taxonKey 3222355)
- Pulled: 1 August 2026 — 1,170 records, 309 georeferenced, 26 countries
- Provenance stamp: `data/raw/provenance.json`
- Ground truth: `data/ground_truth_eu_incursions.csv` (published plant-health reports)

## Reproduce

```bash
# from data-interpretations/, with the shared .venv created
../.venv/bin/python code/fetch_gbif.py   # -> data/raw/occurrences.csv + provenance.json
../.venv/bin/python code/analyze.py      # -> descriptive tables + 4 figures
../.venv/bin/python code/map.py          # -> figures/global_map.png
../.venv/bin/python code/validate.py     # -> validation + effort-corrected figures
```

## Outputs

- `results/validation_eu.csv` — outbreak vs first-record comparison
- `results/effort_corrected.csv` — records per million total GBIF records
- `results/headline_findings.json` — the numbers quoted in the write-up
- `figures/` — validation timeline, effort-corrected ranking, world map, and descriptives
