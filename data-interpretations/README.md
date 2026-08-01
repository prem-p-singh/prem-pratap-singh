# Open Data, Decoded

Reproducible reads of public plant-science datasets. Each folder takes one open
dataset, computes the figures with code, and interprets it honestly, separating
what the data shows from what it does not. The written versions live at
[prempsingh.com/data](https://www.prempsingh.com/data).

## Principle

Figures and numbers are produced by deterministic code from the raw public data.
Interpretation is kept conservative and traceable: every claim maps to a computed
result, and the limitations of the source are stated plainly.

## Structure

```
<piece-slug>/
  code/        fetch + analysis scripts
  data/raw/    fetched data + a provenance stamp (source, date, licence)
  results/     computed summary tables (CSV)
  figures/     generated figures (PNG)
```

## Reproduce a piece

```bash
python3 -m venv .venv && ./.venv/bin/pip install pandas matplotlib requests
cd <piece-slug>
../.venv/bin/python code/fetch_gbif.py   # or the piece's fetch script
../.venv/bin/python code/analyze.py
```

## Pieces

- `xylella-fastidiosa-spread/` — what GBIF's 1,170 *Xylella fastidiosa* records do
  and don't tell us about spread.
