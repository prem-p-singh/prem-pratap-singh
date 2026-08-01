#!/usr/bin/env python3
"""Can a public biodiversity database detect a plant disease outbreak?

Two analyses:

1. VALIDATION. Compare the first GBIF record per country against documented
   first detections for recent, well-characterised European incursions. This
   tests whether the database carries real early-warning signal or only noise.

2. EFFORT CORRECTION. Raw record counts track how much a country records in
   general. Dividing Xylella records by that country's TOTAL GBIF records gives
   a normalised intensity, which is comparable across countries.

Outputs tables to results/ and figures to figures/.
"""
import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
import requests

BASE = Path(__file__).resolve().parents[1]
RAW = BASE / "data" / "raw"
RESULTS = BASE / "results"
FIGS = BASE / "figures"
API = "https://api.gbif.org/v1"

INK = "#1f2937"
MUTED = "#6b7280"
SLATE = "#527089"
GREEN = "#6b8e6b"
AMBER = "#c08a2e"
ROSE = "#b0555a"

plt.rcParams.update({
    "figure.dpi": 140, "savefig.dpi": 140, "font.size": 11,
    "axes.edgecolor": "#d1d5db", "axes.linewidth": 0.8,
    "axes.grid": True, "grid.color": "#eef0f2", "grid.linewidth": 0.8,
    "axes.axisbelow": True, "figure.facecolor": "white", "axes.facecolor": "white",
})


def country_totals() -> dict:
    """Total GBIF occurrence records per country (the sampling-effort denominator)."""
    cache = RAW / "country_totals.json"
    if cache.exists():
        return json.loads(cache.read_text())
    r = requests.get(
        f"{API}/occurrence/search",
        params={"facet": "country", "facetLimit": 300, "limit": 0},
        timeout=60,
    )
    r.raise_for_status()
    counts = {c["name"]: c["count"] for c in r.json()["facets"][0]["counts"]}
    cache.write_text(json.dumps(counts, indent=2))
    return counts


def finish(ax, fig, title, path, subtitle=None):
    ax.set_title(title, fontsize=13, fontweight="bold", color=INK, pad=16 if subtitle else 10)
    if subtitle:
        ax.text(0.5, 1.02, subtitle, transform=ax.transAxes, ha="center",
                fontsize=9, color=MUTED)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    fig.tight_layout(rect=(0, 0.04, 1, 1))
    fig.savefig(path)
    plt.close(fig)
    print(f"  wrote {path.name}")


def main() -> None:
    RESULTS.mkdir(exist_ok=True)
    FIGS.mkdir(exist_ok=True)

    df = pd.read_csv(RAW / "occurrences.csv")
    d = df.dropna(subset=["year", "countryCode"]).astype({"year": int})
    per_country = d.groupby("countryCode")["year"].agg(
        first_record="min", records="count").reset_index()

    # ---------- 1. Validation against documented EU incursions ----------
    truth = pd.read_csv(BASE / "data" / "ground_truth_eu_incursions.csv")
    val = truth.merge(per_country, left_on="country_code", right_on="countryCode", how="left")
    val["lag_years"] = val["first_record"] - val["documented_first_detection"]
    val["detected"] = val["first_record"].notna()
    val = val.sort_values("documented_first_detection")
    val.to_csv(RESULTS / "validation_eu.csv", index=False)
    print("\nValidation vs documented EU incursions:")
    print(val[["country", "documented_first_detection", "first_record", "lag_years"]].to_string(index=False))

    fig, ax = plt.subplots(figsize=(8, 4.2))
    y = range(len(val))
    for i, row in enumerate(val.itertuples()):
        doc = row.documented_first_detection
        if pd.notna(row.first_record):
            rec = int(row.first_record)
            colour = GREEN if abs(rec - doc) <= 1 else AMBER
            ax.plot([doc, rec], [i, i], color=colour, lw=2.5, zorder=2, solid_capstyle="round")
            ax.scatter([rec], [i], color=colour, s=70, zorder=3, label=None)
            lag = rec - doc
            ax.text(max(doc, rec) + 0.4, i, f"{lag:+d} yr", va="center", fontsize=8.5, color=colour)
        else:
            ax.scatter([doc], [i], color=ROSE, s=70, marker="x", zorder=3)
            ax.text(doc + 0.4, i, "never recorded", va="center", fontsize=8.5, color=ROSE)
        ax.scatter([doc], [i], facecolor="white", edgecolor=INK, s=55, zorder=4, linewidth=1.4)

    ax.set_yticks(list(y))
    ax.set_yticklabels(val["country"])
    ax.set_xlabel("Year")
    ax.set_xlim(2011, 2029)
    ax.invert_yaxis()
    finish(ax, fig,
           "Did the database notice? Documented outbreak vs first public record",
           FIGS / "validation_timeline.png",
           subtitle="White marker = documented first detection, coloured marker = first GBIF record")

    # ---------- 2. Sampling-effort correction ----------
    totals = country_totals()
    per_country["total_gbif_records"] = per_country["countryCode"].map(totals)
    eff = per_country.dropna(subset=["total_gbif_records"]).copy()
    eff = eff[eff["records"] >= 5]  # avoid noise from single-record countries
    eff["per_million"] = eff["records"] / eff["total_gbif_records"] * 1e6
    eff = eff.sort_values("per_million", ascending=False)
    eff.to_csv(RESULTS / "effort_corrected.csv", index=False)
    print("\nEffort-corrected intensity (Xylella records per million total records):")
    print(eff[["countryCode", "records", "total_gbif_records", "per_million"]].head(10).to_string(index=False))

    top = eff.head(10)[::-1]
    fig, ax = plt.subplots(figsize=(8, 4.4))
    colours = [AMBER if c == "US" else SLATE for c in top["countryCode"]]
    ax.barh(top["countryCode"], top["per_million"], color=colours)
    for i, (v, n) in enumerate(zip(top["per_million"], top["records"])):
        ax.text(v + 0.12, i, f"{v:.1f}  ({n} rec)", va="center", fontsize=8, color=INK)
    ax.set_xlabel("Xylella records per million total GBIF records for that country")
    ax.set_xlim(0, top["per_million"].max() * 1.28)
    finish(ax, fig,
           "After correcting for how much each country records",
           FIGS / "effort_corrected.png",
           subtitle="The US (amber) drops sharply once its enormous recording volume is accounted for")

    # US rank comparison, raw vs corrected
    raw_rank = per_country.sort_values("records", ascending=False).reset_index(drop=True)
    us_raw = int(raw_rank.index[raw_rank["countryCode"] == "US"][0]) + 1
    us_corr = int(eff.reset_index(drop=True).index[eff.reset_index(drop=True)["countryCode"] == "US"][0]) + 1
    summary = {
        "us_rank_raw": us_raw,
        "us_rank_effort_corrected": us_corr,
        "eu_incursions_tested": int(len(val)),
        "eu_detected_within_1yr": int((val["lag_years"].abs() <= 1).sum()),
        "eu_never_recorded": int(val["first_record"].isna().sum()),
        "top_corrected_country": eff.iloc[0]["countryCode"],
    }
    (RESULTS / "headline_findings.json").write_text(json.dumps(summary, indent=2))
    print("\nHeadline findings:", json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
