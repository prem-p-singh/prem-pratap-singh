#!/usr/bin/env python3
"""Fetch public genome assembly records from NCBI for a curated pathogen panel.

The panel is the set of pathogens the plant pathology community itself voted
most important, from three published Top 10 surveys. Using an external, peer
reviewed importance ranking avoids the trap of inventing an importance score.

For each pathogen this records how many assemblies exist, how good they are,
and when they were deposited.
"""
import csv
import datetime as dt
import json
import time
from collections import Counter
from pathlib import Path

import requests

API = "https://api.ncbi.nlm.nih.gov/datasets/v2alpha/genome/taxon"
BASE = Path(__file__).resolve().parents[1]
PANEL = BASE / "data" / "pathogen_panel.csv"
RAW = BASE / "data" / "raw"
PAGE = 1000

LEVEL_RANK = {"Complete Genome": 4, "Chromosome": 3, "Scaffold": 2, "Contig": 1}


def fetch(pathogen: str) -> list[dict]:
    """Page through every assembly report for one organism name."""
    reports, token = [], None
    while True:
        params = {"page_size": PAGE}
        if token:
            params["page_token"] = token
        url = f"{API}/{requests.utils.quote(pathogen)}/dataset_report"
        r = requests.get(url, params=params, timeout=90)
        if r.status_code == 404:
            return []
        r.raise_for_status()
        payload = r.json()
        reports.extend(payload.get("reports", []) or [])
        token = payload.get("next_page_token")
        if not token:
            return reports


def summarise(pathogen: str, reports: list[dict]) -> dict:
    levels, years, n50s = Counter(), [], []
    submitters = Counter()
    for rep in reports:
        info = rep.get("assembly_info", {}) or {}
        stats = rep.get("assembly_stats", {}) or {}
        lvl = info.get("assembly_level")
        if lvl:
            levels[lvl] += 1
        rd = info.get("release_date")
        if rd:
            years.append(int(rd[:4]))
        n50 = stats.get("contig_n50")
        if n50:
            n50s.append(int(n50))
        sub = info.get("submitter")
        if sub:
            submitters[sub] += 1
    # "Well assembled" means chromosome level or better, the standard needed for
    # comparative work on structural variation and effector repertoires.
    good = levels.get("Complete Genome", 0) + levels.get("Chromosome", 0)
    return {
        "pathogen": pathogen,
        "assemblies": len(reports),
        "complete_or_chromosome": good,
        "scaffold": levels.get("Scaffold", 0),
        "contig": levels.get("Contig", 0),
        "pct_well_assembled": round(good / len(reports) * 100, 1) if reports else 0.0,
        "first_year": min(years) if years else "",
        "latest_year": max(years) if years else "",
        "best_contig_n50": max(n50s) if n50s else "",
        "top_submitter": submitters.most_common(1)[0][0] if submitters else "",
    }


def main() -> None:
    RAW.mkdir(parents=True, exist_ok=True)
    panel = list(csv.DictReader(PANEL.open(encoding="utf-8")))
    rows = []
    for entry in panel:
        name = entry["pathogen"]
        reports = fetch(name)
        summary = summarise(name, reports)
        summary.update(group=entry["group"], disease=entry["disease"],
                       importance_source=entry["importance_source"])
        rows.append(summary)
        print(f"  {name:<30} {summary['assemblies']:>5} assemblies "
              f"({summary['complete_or_chromosome']} well assembled)")
        time.sleep(0.4)

    fields = ["pathogen", "group", "disease", "assemblies", "complete_or_chromosome",
              "scaffold", "contig", "pct_well_assembled", "first_year", "latest_year",
              "best_contig_n50", "top_submitter", "importance_source"]
    with (RAW / "pathogen_genomes.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    (RAW / "provenance_ncbi.json").write_text(json.dumps({
        "source": "NCBI Datasets v2alpha genome dataset_report",
        "endpoint": API,
        "accessed_utc": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "panel": "Pathogens from three published Top 10 surveys in Molecular Plant Pathology",
        "panel_sources": [
            "Dean et al. 2012, Top 10 fungal pathogens in molecular plant pathology",
            "Mansfield et al. 2012, Top 10 plant pathogenic bacteria",
            "Kamoun et al. 2015, The Top 10 oomycete pathogens in molecular plant pathology",
        ],
        "license_note": "NCBI data are in the public domain.",
        "caveat": "An assembly is not an isolate. Counts include re-assemblies, "
                  "alternate haplotypes and laboratory derivatives, so assembly "
                  "count overstates true genomic diversity.",
    }, indent=2), encoding="utf-8")
    print(f"\nwrote {RAW/'pathogen_genomes.csv'} and provenance_ncbi.json")


if __name__ == "__main__":
    main()
