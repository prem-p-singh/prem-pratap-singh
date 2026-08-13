"""Variance decomposition of world crop yields.

Splits the variation in log yield into the share attributable to crop, to
country, and to year, first across all crops together and then within each
crop separately. The two answers differ sharply, which is the point of the
piece: the pooled decomposition is dominated by a units artefact.

Reads the FAOSTAT bulk file already fetched for the
ai-attention-vs-crop-importance project. Nothing is downloaded here.

Run:  python analyze.py
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pandas as pd

# ---------------------------------------------------------------- constants
HERE = Path(__file__).resolve().parent
PROJECT = HERE.parent
RESULTS = PROJECT / "results"
FAO_CSV = (
    PROJECT.parent
    / "ai-attention-vs-crop-importance"
    / "data"
    / "raw"
    / "Production_Crops_Livestock_E_All_Data_(Normalized).csv"
)

YEAR_MIN, YEAR_MAX = 1961, 2023
N_YEARS = YEAR_MAX - YEAR_MIN + 1

# FAOSTAT encodes regional aggregates ("Africa", "World") with Area Code >= 5000
# and item aggregates ("Cereals, primary") with Item Code >= 1700. Both are
# excluded so the factors hold real countries and real crops only.
AREA_CODE_MAX = 5000
ITEM_CODE_MAX = 1700

YIELD_UNIT = "kg/ha"
MIN_COUNTRIES_PER_CROP = 30  # below this a within-crop split is too thin to read

FACTOR_LABELS = {"Area": "Country", "Item": "Crop", "Year": "Year"}


# ------------------------------------------------------------------ helpers
def eta_squared(frame: pd.DataFrame, factors: list[str], value: str) -> dict[str, float]:
    """Share of total sum of squares carried by each factor's group means.

    The panel is balanced, so the main effects are orthogonal and the shares
    do not depend on the order the factors are entered.
    """
    grand = frame[value].mean()
    sst = float(((frame[value] - grand) ** 2).sum())
    if sst <= 0:
        return {}
    shares = {}
    for factor in factors:
        means = frame.groupby(factor, observed=True)[value].agg(["mean", "size"])
        ssb = float((means["size"] * (means["mean"] - grand) ** 2).sum())
        shares[factor] = ssb / sst
    shares["Residual"] = 1.0 - sum(shares.values())
    return shares


def load_balanced_panel() -> pd.DataFrame:
    """Crop yields for country x crop series observed in every year."""
    raw = pd.read_csv(
        FAO_CSV,
        encoding="latin-1",
        low_memory=False,
        usecols=[
            "Area Code", "Area", "Item Code", "Item",
            "Element", "Year", "Value", "Unit",
        ],
    )
    yields = raw[
        (raw["Element"] == "Yield")
        & (raw["Unit"] == YIELD_UNIT)
        & (raw["Area Code"] < AREA_CODE_MAX)
        & (raw["Item Code"] < ITEM_CODE_MAX)
        & raw["Value"].notna()
        & (raw["Value"] > 0)
        & (raw["Year"] >= YEAR_MIN)
        & (raw["Year"] <= YEAR_MAX)
    ][["Area", "Item", "Year", "Value"]]

    observed = yields.groupby(["Area", "Item"]).Year.nunique()
    complete = observed[observed == N_YEARS].index
    panel = yields.set_index(["Area", "Item"]).loc[complete].reset_index()

    # Yields are strictly positive and multiplicative, so variance is taken on
    # the log scale. This also makes crops with different units comparable in
    # the within-crop step.
    panel["log_yield"] = np.log(panel["Value"])
    return panel.sort_values(["Item", "Area", "Year"]).reset_index(drop=True)


# --------------------------------------------------------------------- main
def main() -> None:
    RESULTS.mkdir(parents=True, exist_ok=True)
    panel = load_balanced_panel()

    # 1. Pooled: every crop in one model.
    pooled = eta_squared(panel, ["Area", "Item", "Year"], "log_yield")
    pooled_rows = pd.DataFrame(
        [
            {"source": FACTOR_LABELS.get(k, k), "eta_squared": v}
            for k, v in pooled.items()
        ]
    )
    pooled_rows.to_csv(RESULTS / "pooled_decomposition.csv", index=False)

    # 2. Within crop: crop identity removed, country against year.
    per_crop = []
    for crop, group in panel.groupby("Item", observed=True):
        if group["Area"].nunique() < MIN_COUNTRIES_PER_CROP:
            continue
        shares = eta_squared(group, ["Area", "Year"], "log_yield")
        if not shares:
            continue
        per_crop.append(
            {
                "crop": crop,
                "countries": int(group["Area"].nunique()),
                "observations": int(len(group)),
                "country_share": shares["Area"],
                "year_share": shares["Year"],
                "residual_share": shares["Residual"],
            }
        )
    within = pd.DataFrame(per_crop).sort_values("country_share", ascending=False)
    within.to_csv(RESULTS / "within_crop_decomposition.csv", index=False)

    provenance = {
        "source_file": FAO_CSV.name,
        "source": "FAOSTAT Production: Crops and livestock products",
        "element": "Yield",
        "unit": YIELD_UNIT,
        "years": [YEAR_MIN, YEAR_MAX],
        "balanced_panel": {
            "rows": int(len(panel)),
            "countries": int(panel["Area"].nunique()),
            "crops": int(panel["Item"].nunique()),
        },
        "within_crop": {
            "crops_analysed": int(len(within)),
            "min_countries_per_crop": MIN_COUNTRIES_PER_CROP,
            "median_country_share": float(within["country_share"].median()),
            "median_year_share": float(within["year_share"].median()),
            "median_residual_share": float(within["residual_share"].median()),
        },
        "pooled": {FACTOR_LABELS.get(k, k): float(v) for k, v in pooled.items()},
    }
    (RESULTS / "provenance.json").write_text(json.dumps(provenance, indent=2) + "\n")

    print(f"balanced panel   {len(panel):,} rows | "
          f"{panel['Area'].nunique()} countries | {panel['Item'].nunique()} crops")
    print("\npooled decomposition")
    for row in pooled_rows.itertuples():
        print(f"  {row.source:<10}{row.eta_squared:>7.1%}")
    print(f"\nwithin crop, median across {len(within)} crops")
    print(f"  Country   {within['country_share'].median():>7.1%}")
    print(f"  Year      {within['year_share'].median():>7.1%}")
    print(f"  Residual  {within['residual_share'].median():>7.1%}")
    print(f"\nwrote {RESULTS}/")


if __name__ == "__main__":
    main()
