#!/usr/bin/env python3
"""Fetch Xylella fastidiosa occurrence records from GBIF.

Writes a tidy CSV to data/raw/occurrences.csv and a provenance stamp to
data/raw/provenance.json so the pull is fully reproducible and auditable.

GBIF occurrence data is CC-BY / CC0 depending on the dataset; the aggregate
search API is free to query. This records WHERE the organism was reported or
digitized, not true disease incidence.
"""
import csv
import datetime as dt
import json
import sys
from pathlib import Path

import requests

SPECIES = "Xylella fastidiosa"
API = "https://api.gbif.org/v1"
RAW = Path(__file__).resolve().parents[1] / "data" / "raw"
PAGE = 300
FIELDS = [
    "key", "year", "countryCode", "basisOfRecord",
    "decimalLatitude", "decimalLongitude", "datasetKey", "eventDate",
]


def taxon_key(name: str) -> int:
    r = requests.get(f"{API}/species/match", params={"name": name}, timeout=30)
    r.raise_for_status()
    data = r.json()
    if not data.get("usageKey"):
        sys.exit(f"No GBIF taxon match for '{name}'")
    return int(data["usageKey"])


def fetch_all(key: int):
    rows, offset = [], 0
    while True:
        r = requests.get(
            f"{API}/occurrence/search",
            params={"taxon_key": key, "limit": PAGE, "offset": offset},
            timeout=60,
        )
        r.raise_for_status()
        payload = r.json()
        for rec in payload.get("results", []):
            rows.append({f: rec.get(f) for f in FIELDS})
        if payload.get("endOfRecords") or offset + PAGE > payload["count"]:
            total = payload["count"]
            break
        offset += PAGE
    return rows, total


def main() -> None:
    RAW.mkdir(parents=True, exist_ok=True)
    key = taxon_key(SPECIES)
    print(f"taxonKey={key}")
    rows, total = fetch_all(key)
    print(f"fetched {len(rows)} of {total} records")

    out = RAW / "occurrences.csv"
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(rows)

    provenance = {
        "source": "GBIF (Global Biodiversity Information Facility)",
        "species": SPECIES,
        "taxon_key": key,
        "query_url": f"{API}/occurrence/search?taxon_key={key}",
        "accessed_utc": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "records_reported_by_api": total,
        "records_fetched": len(rows),
        "license_note": "GBIF-mediated occurrence data; per-dataset licences (CC0/CC-BY). Cite GBIF.org.",
        "caveat": "Occurrence records reflect sampling and digitization effort, not true disease incidence or spread.",
    }
    (RAW / "provenance.json").write_text(json.dumps(provenance, indent=2), encoding="utf-8")
    print(f"wrote {out} and provenance.json")


if __name__ == "__main__":
    main()
