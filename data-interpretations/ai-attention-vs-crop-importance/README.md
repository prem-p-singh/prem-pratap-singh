# AI studies tomatoes more than wheat

Does AI plant-disease research follow agricultural importance? This combines
the publication record with world production data to find out.

Live write-up: https://www.prempsingh.com/data/ai-attention-vs-crop-importance

## Findings

**1. AI adoption is real, not a publishing artefact**

Raw counts of AI plant-disease papers grew about 13-fold since 2015, but
publishing grew too. Measured as a *share* of all plant disease research, AI
went from **3.1% (2005) to 14.8% (2025)**, roughly one paper in seven. The
result survives normalisation.

**2. Attention does not track production**

| Crop | AI disease papers | World production (Mt, 2023) | Papers per Mt |
|---|---|---|---|
| Coffee | 441 | 11.1 | 39.8 |
| **Tomato** | **2,848** | 185.5 | **15.4** |
| Apple | 1,427 | 97.4 | 14.6 |
| Grape | 933 | 75.4 | 12.4 |
| Rice | 2,420 | 804.7 | 3.0 |
| Wheat | 1,315 | 794.6 | 1.7 |
| Maize | 1,658 | 1,238.6 | 1.3 |
| Cassava | 318 | 339.5 | 0.9 |
| **Sugarcane** | 443 | **2,017.4** | **0.2** |

Tomato is the most studied crop overall, ahead of maize, rice, and wheat, and
receives **11.5x** more attention per tonne than maize. Sugarcane, the largest
crop by tonnage, sits last.

The likely driver is dataset availability rather than agronomic importance:
public plant-disease image datasets over-represent a few crops, tomato
especially, and the literature compounds around the data rather than the
problem.

## Caveats

Paper counts measure attention, not quality or deployment. Production tonnage
is a proxy for scale, not for value or dietary dependence; weighting by value
would flatter horticultural crops, and weighting by dependence would widen the
cassava gap. Keyword matching captures the literature imperfectly.

## Data

- OpenAlex (CC0), accessed via API; see `data/raw/provenance_openalex.json`
- FAOSTAT world production, 2023, from the public bulk download
- Crop counts use `title_and_abstract.search` requiring a crop term, an AI
  method term, and a disease term, which avoids the inflation that fuzzy
  full-text search produces

## Reproduce

```bash
# from data-interpretations/, with the shared .venv created
../.venv/bin/python code/fetch_openalex.py   # -> data/raw/*.csv + provenance
../.venv/bin/python code/analyze.py          # -> results/*.csv + 3 figures
```

FAOSTAT bulk data is downloaded separately (34 MB) and is not committed:

```bash
curl -L -o data/raw/faostat_production.zip \
  "https://bulks-faostat.fao.org/production/Production_Crops_Livestock_E_All_Data_(Normalized).zip"
unzip -o data/raw/faostat_production.zip -d data/raw/
```
