#!/usr/bin/env python3
"""World map of georeferenced Xylella fastidiosa records.

Uses a small Natural Earth 110m country GeoJSON (cached locally) plotted with
matplotlib, so no geopandas/cartopy dependency is needed. Points are records
with coordinates only (a minority of the dataset); the map shows where records
were placed, not disease extent.
"""
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
import requests

BASE = Path(__file__).resolve().parents[1]
RAW = BASE / "data" / "raw"
FIGS = BASE / "figures"
GEOJSON_URL = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/"
    "geojson/ne_110m_admin_0_countries.geojson"
)
LAND = "#eceff1"
EDGE = "#ffffff"
POINT = "#527089"
MUTED = "#6b7280"
INK = "#1f2937"
SOURCE = ("Source: GBIF.org (georeferenced Xylella fastidiosa records) + Natural Earth. "
          "Points show where records were placed, not disease extent.")


def load_world():
    cache = RAW / "world_110m.geojson"
    if not cache.exists():
        r = requests.get(GEOJSON_URL, timeout=60)
        r.raise_for_status()
        cache.write_bytes(r.content)
    import json
    return json.loads(cache.read_text(encoding="utf-8"))


def polygons(geom):
    """Yield exterior rings ([ [lon,lat], ... ]) for Polygon / MultiPolygon."""
    t = geom["type"]
    if t == "Polygon":
        yield geom["coordinates"][0]
    elif t == "MultiPolygon":
        for poly in geom["coordinates"]:
            yield poly[0]


def main() -> None:
    df = pd.read_csv(RAW / "occurrences.csv")
    pts = df.dropna(subset=["decimalLatitude", "decimalLongitude"])
    world = load_world()

    fig, ax = plt.subplots(figsize=(9, 4.8))
    for feat in world["features"]:
        for ring in polygons(feat["geometry"]):
            xs = [c[0] for c in ring]
            ys = [c[1] for c in ring]
            ax.fill(xs, ys, facecolor=LAND, edgecolor=EDGE, linewidth=0.4)

    ax.scatter(pts["decimalLongitude"], pts["decimalLatitude"],
               s=14, color=POINT, alpha=0.65, edgecolor="white", linewidth=0.3, zorder=3)

    ax.set_xlim(-170, 185)
    ax.set_ylim(-58, 84)
    ax.set_aspect("equal")
    ax.axis("off")
    ax.set_title(f"Where Xylella fastidiosa has been recorded ({len(pts):,} georeferenced records)",
                 fontsize=13, fontweight="bold", color=INK, pad=8)
    fig.text(0.01, 0.02, SOURCE, fontsize=7, color=MUTED, ha="left")
    fig.tight_layout(rect=(0, 0.03, 1, 1))
    fig.savefig(FIGS / "global_map.png", dpi=150, facecolor="white")
    plt.close(fig)
    print(f"wrote global_map.png ({len(pts)} points)")


if __name__ == "__main__":
    main()
