#!/usr/bin/env python3
"""How evenly are public genomes distributed across major plant pathogens?

Compares genome assembly counts across a panel of pathogens the field itself
ranked as most important, then splits by pathogen group to test whether the
gap tracks biology or sequencing difficulty.
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

INK = "#1f2937"
MUTED = "#6b7280"
COLOURS = {"Bacterium": "#527089", "Fungus": "#6b8e6b", "Oomycete": "#c08a2e"}
SOURCE = ("Source: NCBI genome assemblies, accessed Aug 2026. Panel = pathogens from published "
          "Top 10 surveys (Dean 2012, Mansfield 2012, Kamoun 2015).")

plt.rcParams.update({
    "figure.dpi": 140, "savefig.dpi": 140, "font.size": 11,
    "axes.edgecolor": "#d1d5db", "axes.linewidth": 0.8,
    "axes.grid": True, "grid.color": "#eef0f2", "grid.linewidth": 0.8,
    "axes.axisbelow": True, "figure.facecolor": "white", "axes.facecolor": "white",
})


def finish(ax, fig, title, path, subtitle=None):
    ax.set_title(title, fontsize=13, fontweight="bold", color=INK, pad=16 if subtitle else 10)
    if subtitle:
        ax.text(0.5, 1.02, subtitle, transform=ax.transAxes, ha="center",
                fontsize=9, color=MUTED)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    fig.text(0.01, 0.01, SOURCE, fontsize=6.5, color=MUTED, ha="left")
    fig.tight_layout(rect=(0, 0.05, 1, 1))
    fig.savefig(path)
    plt.close(fig)
    print(f"  wrote {path.name}")


def main() -> None:
    RESULTS.mkdir(exist_ok=True)
    FIGS.mkdir(exist_ok=True)
    df = pd.read_csv(RAW / "pathogen_genomes.csv")

    # ---------- Figure 1: assemblies per pathogen ----------
    d = df.sort_values("assemblies")
    fig, ax = plt.subplots(figsize=(8.5, 6.5))
    ax.barh(d["pathogen"], d["assemblies"].clip(lower=0.6),
            color=[COLOURS.get(g, MUTED) for g in d["group"]])
    for i, (v, p) in enumerate(zip(d["assemblies"], d["pathogen"])):
        ax.text(max(v, 0.6) * 1.12, i, f"{v:,}" if v else "none", va="center",
                fontsize=8, color=INK)
    ax.set_xscale("symlog", linthresh=1)
    ax.set_xlim(0, 4000)
    ax.set_xlabel("Public genome assemblies (log scale)")
    handles = [plt.Rectangle((0, 0), 1, 1, color=c) for c in COLOURS.values()]
    ax.legend(handles, COLOURS.keys(), loc="lower right", frameon=False, fontsize=9)
    finish(ax, fig, "Genomes are not shared out by importance",
           FIGS / "assemblies_per_pathogen.png",
           subtitle="Every pathogen here was voted a global Top 10 threat by the field")

    # ---------- Figure 2: group medians ----------
    grp = (df.groupby("group")["assemblies"]
             .agg(median="median", total="sum", n="count")
             .sort_values("median"))
    grp.to_csv(RESULTS / "by_group.csv")
    fig, ax = plt.subplots(figsize=(7.5, 3.4))
    ax.barh(grp.index, grp["median"], color=[COLOURS.get(g, MUTED) for g in grp.index])
    for i, (m, n) in enumerate(zip(grp["median"], grp["n"])):
        ax.text(m + 8, i, f"median {m:,.0f}   ({n} pathogens)", va="center",
                fontsize=9, color=INK)
    ax.set_xlim(0, grp["median"].max() * 1.7)
    ax.set_xlabel("Median genome assemblies per pathogen")
    finish(ax, fig, "Bacteria are sequenced far more than fungi or oomycetes",
           FIGS / "by_group.png",
           subtitle="Small, cheap genomes get sequenced; large repetitive ones do not")

    # ---------- Figure 3: quantity is not quality ----------
    q = df[df["assemblies"] >= 5].sort_values("pct_well_assembled")
    fig, ax = plt.subplots(figsize=(8.5, 6))
    ax.barh(q["pathogen"], q["pct_well_assembled"],
            color=[COLOURS.get(g, MUTED) for g in q["group"]])
    for i, (v, n) in enumerate(zip(q["pct_well_assembled"], q["assemblies"])):
        ax.text(v + 1.2, i, f"{v:.0f}%  of {n:,}", va="center", fontsize=8, color=INK)
    ax.set_xlim(0, 100)
    ax.set_xlabel("Share of assemblies that reach chromosome level or better")
    finish(ax, fig, "Many genomes, few good ones",
           FIGS / "quality.png",
           subtitle="Most deposited assemblies are fragmented drafts, not finished genomes")

    # ---------- headline numbers ----------
    df_sorted = df.sort_values("assemblies", ascending=False)
    top, bottom = df_sorted.iloc[0], df_sorted.iloc[-1]
    infestans = df[df["pathogen"] == "Phytophthora infestans"].iloc[0]
    bact = df[df["group"] == "Bacterium"]["assemblies"].median()
    euk = df[df["group"].isin(["Fungus", "Oomycete"])]["assemblies"].median()
    zero = df[df["assemblies"] == 0]["pathogen"].tolist()
    summary = {
        "pathogens_in_panel": int(len(df)),
        "total_assemblies": int(df["assemblies"].sum()),
        "most_sequenced": top["pathogen"],
        "most_sequenced_n": int(top["assemblies"]),
        "least_sequenced": bottom["pathogen"],
        "least_sequenced_n": int(bottom["assemblies"]),
        "zero_genome_pathogens": zero,
        "infestans_assemblies": int(infestans["assemblies"]),
        "top_vs_infestans_ratio": round(float(top["assemblies"] / max(infestans["assemblies"], 1))),
        "median_bacterium": float(bact),
        "median_fungus_oomycete": float(euk),
        "bacteria_vs_eukaryote_ratio": round(float(bact / max(euk, 1)), 1),
        "median_pct_well_assembled": float(df[df["assemblies"] >= 5]["pct_well_assembled"].median()),
    }
    (RESULTS / "headline_findings.json").write_text(json.dumps(summary, indent=2))
    df_sorted.to_csv(RESULTS / "pathogen_genomes_ranked.csv", index=False)
    print("\nHeadline findings:")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
