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

## Charts

Figures are drawn in R with ggplot2 using a shared theme in `R/theme_pps.R`.

Colours are not chosen by eye. They come from a validated categorical palette
and were checked with a validator for lightness band, chroma floor,
colour-vision-deficiency separation, normal-vision separation and contrast. The
earlier hand-picked palette failed two hard checks: two hues read as gray, and
the green/slate pair sat at deltaE 12 in normal vision, below the 15 floor,
meaning even full-colour-vision readers struggled to tell them apart.

Run order for any project: Python first (fetches data, writes result tables),
then R (renders the figures).

```bash
../.venv/bin/python code/fetch_*.py
../.venv/bin/python code/analyze.py
Rscript code/figures.R
```
