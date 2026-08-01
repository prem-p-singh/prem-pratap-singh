# What GBIF's Xylella records do and don't tell us about spread

A reproducible read of every public GBIF occurrence record for *Xylella
fastidiosa*, a xylem-limited bacterium behind diseases in grapevine, olive,
almond, and citrus.

Live write-up: https://www.prempsingh.com/data/xylella-fastidiosa-spread

## The question

Occurrence databases are often mistaken for disease maps. This piece asks what
1,170 GBIF records honestly support, and what they do not.

## Data

- Source: GBIF.org, *Xylella fastidiosa* (taxonKey 3222355)
- Pulled: 1 August 2026 — 1,170 records, 309 georeferenced, 26 countries, 1906–2026
- Provenance stamp: `data/raw/provenance.json`

## Reproduce

```bash
# from the data-interpretations/ root, with the shared .venv created
../.venv/bin/python code/fetch_gbif.py   # -> data/raw/occurrences.csv + provenance.json
../.venv/bin/python code/analyze.py      # -> results/*.csv + 4 figures
../.venv/bin/python code/map.py          # -> figures/global_map.png
```

## Outputs

- `results/summary.csv` and per-cut tables
- `figures/`: records per year, by country, basis of record, cumulative, and a world map

## Key caveat

An occurrence record marks where the organism was recorded and digitized, not
disease incidence. US dominance (48%) reflects reporting effort; the 2019 spike is
a digitization artifact. The data supports presence across 26 countries and growth
in recording, not prevalence, spread rate, or severity.
