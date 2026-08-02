#!/usr/bin/env python3
"""Fetch AI/plant-disease publication counts from OpenAlex.

Two pulls:
  1. A time series of AI-related plant disease work, plus all plant disease
     work, so the AI share can be computed rather than a raw count.
  2. Per-crop deep-learning counts, using title/abstract search rather than the
     fuzzy full search, which otherwise inflates and overlaps counts.

Writes tidy CSVs to data/raw/ with a provenance stamp.
"""
import csv
import datetime as dt
import json
import time
import urllib.parse
from pathlib import Path

import requests

API = "https://api.openalex.org/works"
MAILTO = "pr0982@gmail.com"          # OpenAlex polite pool
RAW = Path(__file__).resolve().parents[1] / "data" / "raw"

# Crop label -> (OpenAlex search term, FAOSTAT item name)
CROPS = {
    "Maize": ("maize OR corn", "Maize (corn)"),
    "Rice": ("rice", "Rice"),
    "Wheat": ("wheat", "Wheat"),
    "Sugarcane": ("sugarcane", "Sugar cane"),
    "Potato": ("potato", "Potatoes"),
    "Soybean": ("soybean", "Soya beans"),
    "Cassava": ("cassava", "Cassava, fresh"),
    "Tomato": ("tomato", "Tomatoes"),
    "Banana": ("banana", "Bananas"),
    "Barley": ("barley", "Barley"),
    "Apple": ("apple", "Apples"),
    "Grape": ("grape OR grapevine", "Grapes"),
    "Orange": ("orange OR citrus", "Oranges"),
    "Coffee": ("coffee", "Coffee, green"),
}

AI_TERMS = '"deep learning" OR "machine learning" OR "neural network"'


def get(params: dict) -> dict:
    params = {**params, "mailto": MAILTO}
    for attempt in range(4):
        r = requests.get(API, params=params, timeout=60)
        if r.status_code == 200:
            return r.json()
        time.sleep(2 * (attempt + 1))
    r.raise_for_status()
    return {}


def year_series(search: str) -> dict:
    data = get({"search": search, "group_by": "publication_year"})
    return {int(g["key"]): g["count"] for g in data["group_by"] if g["key"].isdigit()}


def crop_count(crop_query: str) -> int:
    """Papers whose title/abstract mention the crop AND an AI method AND disease."""
    flt = (f'title_and_abstract.search:({crop_query}) AND ({AI_TERMS}) '
           f'AND (disease OR pathogen OR blight OR rust OR mildew)')
    return get({"filter": flt, "per-page": 1})["meta"]["count"]


def main() -> None:
    RAW.mkdir(parents=True, exist_ok=True)

    print("Pulling time series...")
    ai = year_series("machine learning plant disease")
    allpd = year_series("plant disease")
    years = sorted(y for y in ai if 2000 <= y <= dt.date.today().year - 1)
    with (RAW / "ai_share_by_year.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["year", "ai_plant_disease_works", "all_plant_disease_works", "ai_share_pct"])
        for y in years:
            a, t = ai.get(y, 0), allpd.get(y, 0)
            w.writerow([y, a, t, round(a / t * 100, 2) if t else ""])
    print(f"  wrote ai_share_by_year.csv ({len(years)} years)")

    print("Pulling per-crop counts...")
    rows = []
    for crop, (query, fao_item) in CROPS.items():
        n = crop_count(query)
        rows.append({"crop": crop, "openalex_query": query,
                     "fao_item": fao_item, "ai_disease_works": n})
        print(f"  {crop:<10} {n:>6}")
        time.sleep(0.4)
    with (RAW / "crop_ai_works.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    (RAW / "provenance_openalex.json").write_text(json.dumps({
        "source": "OpenAlex (openalex.org)",
        "endpoint": API,
        "accessed_utc": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "ai_terms": AI_TERMS,
        "crop_query_note": "title_and_abstract.search, requiring crop AND AI method AND a disease term",
        "license_note": "OpenAlex data is CC0.",
        "caveat": "Counts reflect indexed literature and keyword matching, not a curated review.",
    }, indent=2), encoding="utf-8")
    print("wrote provenance_openalex.json")


if __name__ == "__main__":
    main()
