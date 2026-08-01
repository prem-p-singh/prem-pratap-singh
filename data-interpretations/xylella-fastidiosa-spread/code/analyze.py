#!/usr/bin/env python3
"""Analyze the GBIF Xylella fastidiosa records.

Reads data/raw/occurrences.csv, writes summary tables to results/ and figures to
figures/. Every figure carries a source line. Interpretation is deliberately
conservative: these are recording counts, not disease incidence.
"""
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

BASE = Path(__file__).resolve().parents[1]
RAW = BASE / "data" / "raw" / "occurrences.csv"
RESULTS = BASE / "results"
FIGS = BASE / "figures"

# Muted, print-friendly palette (matches the site aesthetic).
INK = "#1f2937"
MUTED = "#6b7280"
GREEN = "#6b8e6b"
SLATE = "#527089"
AMBER = "#c08a2e"
SOURCE = "Source: GBIF.org (Xylella fastidiosa occurrences). Counts reflect sampling and digitization, not disease incidence."

plt.rcParams.update({
    "figure.dpi": 140, "savefig.dpi": 140, "font.size": 11,
    "axes.edgecolor": "#d1d5db", "axes.linewidth": 0.8,
    "axes.grid": True, "grid.color": "#eef0f2", "grid.linewidth": 0.8,
    "axes.axisbelow": True, "figure.facecolor": "white", "axes.facecolor": "white",
})


def _finish(ax, fig, title, path):
    ax.set_title(title, fontsize=13, fontweight="bold", color=INK, pad=10)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    fig.text(0.01, 0.01, SOURCE, fontsize=7, color=MUTED, ha="left")
    fig.tight_layout(rect=(0, 0.04, 1, 1))
    fig.savefig(path)
    plt.close(fig)
    print(f"  wrote {path.name}")


def main() -> None:
    RESULTS.mkdir(exist_ok=True)
    FIGS.mkdir(exist_ok=True)
    df = pd.read_csv(RAW)
    n = len(df)
    geo = df["decimalLatitude"].notna().sum()
    print(f"records={n}  georeferenced={geo}  countries={df['countryCode'].nunique()}")

    # 1. Records per year (1990+ where data is meaningful)
    by_year = df.dropna(subset=["year"]).astype({"year": int})
    yr = by_year[by_year["year"] >= 1990].groupby("year").size()
    yr.to_csv(RESULTS / "records_per_year.csv", header=["records"])
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.bar(yr.index, yr.values, color=SLATE, width=0.8)
    peak = yr.idxmax()
    ax.annotate(f"{peak} spike is a reporting/digitization\nartifact, not a real surge",
                xy=(peak, yr.max()), xytext=(peak - 12, yr.max() * 0.85),
                fontsize=8, color=MUTED,
                arrowprops=dict(arrowstyle="->", color=MUTED, lw=0.8))
    ax.set_xlabel("Year"); ax.set_ylabel("Records")
    _finish(ax, fig, "Xylella fastidiosa records per year (1990-present)", FIGS / "records_per_year.png")

    # 2. By country (top 12)
    cc = df["countryCode"].value_counts().head(12)[::-1]
    cc.to_csv(RESULTS / "records_by_country.csv", header=["records"])
    fig, ax = plt.subplots(figsize=(8, 4.2))
    ax.barh(cc.index, cc.values, color=GREEN)
    for i, v in enumerate(cc.values):
        ax.text(v + n * 0.005, i, str(v), va="center", fontsize=8, color=INK)
    ax.set_xlabel("Records")
    _finish(ax, fig, "Where records come from (top 12 countries)", FIGS / "records_by_country.png")

    # 3. Basis of record (what KIND of data this is)
    br = df["basisOfRecord"].value_counts()[::-1]
    br.to_csv(RESULTS / "basis_of_record.csv", header=["records"])
    fig, ax = plt.subplots(figsize=(8, 3.6))
    ax.barh([b.replace("_", " ").title() for b in br.index], br.values, color=AMBER)
    for i, v in enumerate(br.values):
        ax.text(v + n * 0.005, i, str(v), va="center", fontsize=8, color=INK)
    ax.set_xlabel("Records")
    _finish(ax, fig, "What kind of records are these?", FIGS / "basis_of_record.png")

    # 4. Cumulative records over time (digitization curve, not spread)
    cum = yr.cumsum()
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.fill_between(cum.index, cum.values, color=SLATE, alpha=0.18)
    ax.plot(cum.index, cum.values, color=SLATE, lw=2)
    ax.set_xlabel("Year"); ax.set_ylabel("Cumulative records")
    _finish(ax, fig, "Cumulative records added (a digitization curve, not a spread curve)",
            FIGS / "cumulative_records.png")

    # Summary table for the report + narration step
    summary = pd.DataFrame({
        "metric": ["total_records", "georeferenced_records", "countries",
                   "year_min", "year_max", "top_country", "top_country_share_pct",
                   "peak_year", "peak_year_records"],
        "value": [n, int(geo), df["countryCode"].nunique(),
                  int(by_year["year"].min()), int(by_year["year"].max()),
                  cc.index[-1], round(cc.values[-1] / n * 100, 1),
                  int(peak), int(yr.max())],
    })
    summary.to_csv(RESULTS / "summary.csv", index=False)
    print("wrote results/summary.csv")


if __name__ == "__main__":
    main()
