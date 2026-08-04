#!/usr/bin/env Rscript
# Figures for "AI Studies Tomatoes More Than Wheat".
# Python fetches and computes; R draws, using the shared validated theme.

suppressPackageStartupMessages({
  library(dplyr); library(readr); library(forcats); library(scales); library(ggrepel)
})

script_path <- normalizePath(sub("--file=", "", grep("--file=", commandArgs(trailingOnly = FALSE), value = TRUE)[1]))
base      <- dirname(dirname(script_path))
repo_root <- dirname(base)
source(file.path(repo_root, "R", "theme_pps.R"))

RESULTS <- file.path(base, "results")
RAW     <- file.path(base, "data", "raw")
FIGS    <- file.path(base, "figures")
dir.create(FIGS, showWarnings = FALSE)

CAP_BOTH <- "Sources: OpenAlex (CC0) and FAOSTAT world production, 2023."
CAP_OA   <- "Source: OpenAlex (CC0), indexed literature."

df <- read_csv(file.path(RESULTS, "attention_vs_production.csv"), show_col_types = FALSE)

# Single series -> one colour, no legend. Highlight is a secondary encoding
# (label weight), not a second hue.
ONE <- pps_cat(1)

# ---- Figure 1: papers per tonne --------------------------------------------
d1 <- df |> mutate(crop = fct_reorder(crop, works_per_mt))

p1 <- ggplot(d1, aes(x = works_per_mt, y = crop)) +
  geom_col(fill = ONE, width = 0.68) +
  geom_text(aes(label = number(works_per_mt, accuracy = 0.1)),
            hjust = -0.2, size = 3.2, colour = PPS_INK) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.14))) +
  labs(
    title = "Research attention per tonne grown",
    subtitle = "Tomato, apple and grape sit far above the staples that feed the most people",
    x = "AI plant-disease papers per million tonnes produced", y = NULL, caption = CAP_BOTH
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(colour = PPS_INK))

pps_save(p1, file.path(FIGS, "papers_per_tonne.png"), 8.5, 5.6)

# ---- Figure 2: attention vs production --------------------------------------
p2 <- ggplot(df, aes(x = production_mt, y = ai_disease_works)) +
  geom_point(size = 3.2, colour = ONE, alpha = 0.9) +
  ggrepel::geom_text_repel(aes(label = crop), size = 3.2, colour = PPS_INK_MUTED,
                           seed = 42, min.segment.length = 0.4,
                           segment.colour = "#c9ced4", box.padding = 0.4) +
  scale_x_log10(labels = comma) +
  scale_y_continuous(labels = comma) +
  labs(
    title = "Research attention does not track how much we grow",
    subtitle = "If attention followed production, points would rise to the right",
    x = "World production, 2023 (million tonnes, log scale)",
    y = "AI plant-disease papers", caption = CAP_BOTH
  ) +
  theme_pps()

pps_save(p2, file.path(FIGS, "attention_vs_production.png"), 8.5, 5.4)

# ---- Figure 3: AI share over time -------------------------------------------
share <- read_csv(file.path(RAW, "ai_share_by_year.csv"), show_col_types = FALSE) |>
  filter(year >= 2005, !is.na(ai_share_pct))
last_pt <- share |> slice_max(year, n = 1)

p3 <- ggplot(share, aes(x = year, y = ai_share_pct)) +
  geom_area(fill = ONE, alpha = 0.12) +
  geom_line(colour = ONE, linewidth = 0.9) +
  geom_point(data = last_pt, colour = ONE, size = 3) +
  geom_text(data = last_pt, aes(label = paste0(number(ai_share_pct, accuracy = 0.1), "%")),
            vjust = -1.1, size = 3.6, fontface = "bold", colour = PPS_INK) +
  scale_y_continuous(labels = label_percent(scale = 1),
                     expand = expansion(mult = c(0, 0.16))) +
  labs(
    title = "AI's share of plant disease research",
    subtitle = "Measured as a share, so overall growth in publishing is already accounted for",
    x = NULL, y = NULL, caption = CAP_OA
  ) +
  theme_pps()

pps_save(p3, file.path(FIGS, "ai_share_over_time.png"), 8.5, 4.2)

cat("done\n")
