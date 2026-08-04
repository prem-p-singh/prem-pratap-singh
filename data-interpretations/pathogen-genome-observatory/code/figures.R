#!/usr/bin/env Rscript
# Figures for the Plant Pathogen Genome Observatory.
#
# Reads the CSV produced by fetch_ncbi.py and renders the charts with ggplot2
# using the shared, validated theme. Python does the data pull; R does the
# drawing.

suppressPackageStartupMessages({
  library(dplyr)
  library(readr)
  library(forcats)
  library(stringr)
  library(scales)
})

# Resolve paths from this script's own location so it runs from anywhere.
script_path <- normalizePath(sub("--file=", "", grep("--file=", commandArgs(trailingOnly = FALSE), value = TRUE)[1]))
code_dir    <- dirname(script_path)              # .../<project>/code
base        <- dirname(code_dir)                 # .../<project>
repo_root   <- dirname(base)                     # .../data-interpretations
source(file.path(repo_root, "R", "theme_pps.R"))

RAW  <- file.path(base, "data", "raw", "pathogen_genomes.csv")
FIGS <- file.path(base, "figures")
dir.create(FIGS, showWarnings = FALSE)

CAPTION <- paste(
  "Source: NCBI genome assemblies, accessed August 2026.",
  "Panel from published Top 10 surveys (Dean 2012, Mansfield 2012, Kamoun 2015)."
)

df <- read_csv(RAW, show_col_types = FALSE) |>
  mutate(group = factor(group, levels = c("Bacterium", "Fungus", "Oomycete")))

group_cols <- setNames(pps_cat(3), levels(df$group))

# ---- Figure 1: assemblies per pathogen -------------------------------------
d1 <- df |> mutate(pathogen = fct_reorder(pathogen, assemblies))

# Clamp to 1 so a zero draws no bar on the log scale rather than spilling
# left of the axis; the "none" label carries the value instead.
p1 <- ggplot(d1, aes(x = pmax(assemblies, 1), y = pathogen, fill = group)) +
  geom_col(width = 0.68) +
  geom_text(aes(label = ifelse(assemblies == 0, "none", comma(assemblies))),
            hjust = -0.18, size = 3.1,
            colour = ifelse(d1$assemblies == 0, PPS_INK_MUTED, PPS_INK)) +
  scale_fill_manual(values = group_cols) +
  scale_x_log10(labels = comma, expand = expansion(mult = c(0, 0.22))) +
  labs(
    title = "Genomes are not shared out by importance",
    subtitle = "Every pathogen here was voted a global top-10 threat by the field",
    x = "Public genome assemblies (log scale)", y = NULL, caption = CAPTION
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(face = "italic", colour = PPS_INK))

pps_save(p1, file.path(FIGS, "assemblies_per_pathogen.png"), 8.5, 6.8)

# ---- Figure 2: median by group ---------------------------------------------
d2 <- df |>
  group_by(group) |>
  summarise(median_assemblies = median(assemblies), n = n(), .groups = "drop") |>
  mutate(group = fct_reorder(group, median_assemblies))

p2 <- ggplot(d2, aes(x = median_assemblies, y = group, fill = group)) +
  geom_col(width = 0.6, show.legend = FALSE) +
  geom_text(aes(label = paste0(comma(median_assemblies), "  (", n, " pathogens)")),
            hjust = -0.08, size = 3.3, colour = PPS_INK) +
  scale_fill_manual(values = group_cols) +
  scale_x_continuous(labels = comma, expand = expansion(mult = c(0, 0.42))) +
  labs(
    title = "Bacteria are sequenced far more than fungi or oomycetes",
    subtitle = "Small, cheap genomes get sequenced; large repetitive ones do not",
    x = "Median genome assemblies per pathogen", y = NULL, caption = CAPTION
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(colour = PPS_INK))

pps_save(p2, file.path(FIGS, "by_group.png"), 8.5, 3.4)

# ---- Figure 3: quality ------------------------------------------------------
d3 <- df |>
  filter(assemblies >= 5) |>
  mutate(pathogen = fct_reorder(pathogen, pct_well_assembled))

p3 <- ggplot(d3, aes(x = pct_well_assembled, y = pathogen, fill = group)) +
  geom_col(width = 0.68) +
  geom_text(aes(label = paste0(round(pct_well_assembled), "%  of ", comma(assemblies))),
            hjust = -0.08, size = 3, colour = PPS_INK) +
  scale_fill_manual(values = group_cols) +
  scale_x_continuous(limits = c(0, 100), breaks = seq(0, 100, 25),
                     expand = expansion(mult = c(0, 0.30)),
                     labels = label_percent(scale = 1)) +
  labs(
    title = "Many genomes, few good ones",
    subtitle = "Share of assemblies reaching chromosome level or better",
    x = NULL, y = NULL, caption = CAPTION
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(face = "italic", colour = PPS_INK))

pps_save(p3, file.path(FIGS, "quality.png"), 8.5, 6.2)

cat("done\n")
