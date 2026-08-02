#!/usr/bin/env python3
"""Does AI plant-disease research follow agricultural importance?

Combines OpenAlex publication counts with FAOSTAT world production to compare
where research attention goes against how much of each crop the world grows.

Outputs tables to results/ and figures to figures/.
"""
import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

BASE = Path(__file__).resolve().parents[1]
RAW = BASE / "data" / "raw"
RESULTS = BASE / "results"
FIGS = BASE / "figures"
FAO_CSV = RAW / "Production_Crops_Livestock_E_All_Data_(Normalized).csv"
FAO_YEAR = 2023

INK = "#1f2937"
MUTED = "#6b7280"
SLATE = "#527089"
GREEN = "#6b8e6b"
AMBER = "#c08a2e"
SRC_OA = "Source: OpenAlex (CC0), indexed literature."
SRC_BOTH = f"Sources: OpenAlex (CC0) and FAOSTAT world production, {FAO_YEAR}."

plt.rcParams.update({
    "figure.dpi": 140, "savefig.dpi": 140, "font.size": 11,
    "axes.edgecolor": "#d1d5db", "axes.linewidth": 0.8,
    "axes.grid": True, "grid.color": "#eef0f2", "grid.linewidth": 0.8,
    "axes.axisbelow": True, "figure.facecolor": "white", "axes.facecolor": "white",
})


def finish(ax, fig, title, path, source, subtitle=None):
    ax.set_title(title, fontsize=13, fontweight="bold", color=INK,
                 pad=16 if subtitle else 10)
    if subtitle:
        ax.text(0.5, 1.02, subtitle, transform=ax.transAxes, ha="center",
                fontsize=9, color=MUTED)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    fig.text(0.01, 0.01, source, fontsize=7, color=MUTED, ha="left")
    fig.tight_layout(rect=(0, 0.05, 1, 1))
    fig.savefig(path)
    plt.close(fig)
    print(f"  wrote {path.name}")


def world_production() -> pd.DataFrame:
    df = pd.read_csv(FAO_CSV, encoding="latin-1", low_memory=False,
                     usecols=["Area", "Element", "Item", "Year", "Unit", "Value"])
    w = df[(df["Area"] == "World") & (df["Element"] == "Production")
           & (df["Year"] == FAO_YEAR)]
    return w[["Item", "Value", "Unit"]].rename(
        columns={"Item": "fao_item", "Value": "production_tonnes"})


def main() -> None:
    RESULTS.mkdir(exist_ok=True)
    FIGS.mkdir(exist_ok=True)

    # ---------- 1. AI share of plant pathology over time ----------
    share = pd.read_csv(RAW / "ai_share_by_year.csv")
    share = share[(share["year"] >= 2005) & share["ai_share_pct"].notna()]
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.plot(share["year"], share["ai_share_pct"], color=SLATE, lw=2.5,
            marker="o", markersize=4)
    ax.fill_between(share["year"], share["ai_share_pct"], color=SLATE, alpha=0.12)
    first, last = share.iloc[0], share.iloc[-1]
    ax.annotate(f"{last['ai_share_pct']:.1f}%",
                xy=(last["year"], last["ai_share_pct"]),
                xytext=(-6, 8), textcoords="offset points",
                fontsize=10, fontweight="bold", color=SLATE)
    ax.annotate(f"{first['ai_share_pct']:.1f}%",
                xy=(first["year"], first["ai_share_pct"]),
                xytext=(0, 8), textcoords="offset points", fontsize=9, color=MUTED)
    ax.set_xlabel("Year")
    ax.set_ylabel("% of plant disease papers")
    finish(ax, fig, "AI's share of plant disease research",
           FIGS / "ai_share_over_time.png", SRC_OA,
           subtitle="Share, not raw count, so overall publishing growth is already accounted for")

    # ---------- 2. Attention vs production ----------
    crops = pd.read_csv(RAW / "crop_ai_works.csv")
    prod = world_production()
    df = crops.merge(prod, on="fao_item", how="left")
    missing = df[df["production_tonnes"].isna()]["crop"].tolist()
    if missing:
        print(f"  warning: no FAO production matched for {missing}")
    df = df.dropna(subset=["production_tonnes"]).copy()
    df["production_mt"] = df["production_tonnes"] / 1e6
    df["works_per_mt"] = df["ai_disease_works"] / df["production_mt"]
    df = df.sort_values("works_per_mt", ascending=False)
    df.to_csv(RESULTS / "attention_vs_production.csv", index=False)
    print("\nAttention per million tonnes of production:")
    print(df[["crop", "ai_disease_works", "production_mt", "works_per_mt"]]
          .to_string(index=False, float_format=lambda v: f"{v:,.1f}"))

    # Scatter: production vs papers
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.scatter(df["production_mt"], df["ai_disease_works"], s=70,
               color=SLATE, alpha=0.85, edgecolor="white", linewidth=0.8, zorder=3)
    # Nudge labels that would otherwise collide.
    offsets = {"Orange": (6, -12), "Grape": (6, 4), "Soybean": (6, 6), "Cassava": (6, -13)}
    for r in df.itertuples():
        highlight = r.crop in ("Tomato", "Maize", "Sugarcane", "Cassava")
        ax.annotate(r.crop, (r.production_mt, r.ai_disease_works),
                    xytext=offsets.get(r.crop, (6, 4)), textcoords="offset points",
                    fontsize=9 if highlight else 8,
                    fontweight="bold" if highlight else "normal",
                    color=AMBER if highlight else MUTED)
    ax.set_xscale("log")
    ax.set_xlabel(f"World production, {FAO_YEAR} (million tonnes, log scale)")
    ax.set_ylabel("AI plant-disease papers")
    finish(ax, fig, "Research attention does not track how much we grow",
           FIGS / "attention_vs_production.png", SRC_BOTH,
           subtitle="If attention followed production, points would rise to the right")

    # Bar: papers per Mt
    top = df.sort_values("works_per_mt")[::1]
    fig, ax = plt.subplots(figsize=(8, 5))
    colours = [AMBER if c in ("Tomato", "Apple", "Grape") else
               GREEN if c in ("Sugarcane", "Cassava", "Maize") else SLATE
               for c in top["crop"]]
    ax.barh(top["crop"], top["works_per_mt"], color=colours)
    for i, (v, n) in enumerate(zip(top["works_per_mt"], top["ai_disease_works"])):
        ax.text(v + 0.25, i, f"{v:,.1f}", va="center", fontsize=8, color=INK)
    ax.set_xlabel("AI plant-disease papers per million tonnes produced")
    finish(ax, fig, "Papers per tonne grown: the imbalance",
           FIGS / "papers_per_tonne.png", SRC_BOTH,
           subtitle="Amber = high attention per tonne, green = staples with low attention")

    # ---------- headline numbers ----------
    top_att = df.iloc[0]
    staples = df[df["crop"].isin(["Maize", "Sugarcane", "Cassava", "Wheat", "Rice"])]
    least = df.sort_values("works_per_mt").iloc[0]
    summary = {
        "ai_share_first_year": int(share.iloc[0]["year"]),
        "ai_share_first_pct": float(share.iloc[0]["ai_share_pct"]),
        "ai_share_last_year": int(share.iloc[-1]["year"]),
        "ai_share_last_pct": float(share.iloc[-1]["ai_share_pct"]),
        "most_studied_crop": df.sort_values("ai_disease_works", ascending=False).iloc[0]["crop"],
        "most_studied_works": int(df.sort_values("ai_disease_works", ascending=False).iloc[0]["ai_disease_works"]),
        "highest_attention_per_mt": top_att["crop"],
        "highest_attention_value": round(float(top_att["works_per_mt"]), 1),
        "lowest_attention_per_mt": least["crop"],
        "lowest_attention_value": round(float(least["works_per_mt"]), 2),
        "tomato_vs_maize_ratio": round(
            float(df[df["crop"] == "Tomato"]["works_per_mt"].iloc[0] /
                  df[df["crop"] == "Maize"]["works_per_mt"].iloc[0]), 1),
        "staple_mean_per_mt": round(float(staples["works_per_mt"].mean()), 2),
    }
    (RESULTS / "headline_findings.json").write_text(json.dumps(summary, indent=2))
    print("\nHeadline findings:")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
