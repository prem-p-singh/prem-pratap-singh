#!/usr/bin/env Rscript
# Figures for "Can Free Data Spot a Plant Disease Outbreak?".
# The world map stays in Python (map.py) since it draws from a GeoJSON;
# everything else is drawn here with the shared validated theme.

suppressPackageStartupMessages({
  library(dplyr); library(readr); library(forcats); library(scales); library(tidyr)
})

script_path <- normalizePath(sub("--file=", "", grep("--file=", commandArgs(trailingOnly = FALSE), value = TRUE)[1]))
base      <- dirname(dirname(script_path))
repo_root <- dirname(base)
source(file.path(repo_root, "R", "theme_pps.R"))

RESULTS <- file.path(base, "results")
FIGS    <- file.path(base, "figures")
dir.create(FIGS, showWarnings = FALSE)

CAP <- paste("Source: GBIF.org occurrence records for Xylella fastidiosa.",
             "Counts reflect sampling and digitisation, not disease incidence.")

ONE <- pps_cat(1)                       # single-series blue
cols2 <- pps_cat(2)                     # blue + orange for the two-state dumbbell
HIT   <- cols2[1]
MISS  <- cols2[2]

# ---- Figure 1: validation timeline (dumbbell) -------------------------------
val <- read_csv(file.path(RESULTS, "validation_eu.csv"), show_col_types = FALSE) |>
  mutate(
    # Earliest outbreak at the top: ggplot puts level 1 at the bottom, so
    # order levels by ascending year.
    country = fct_reorder(country, documented_first_detection),
    found   = !is.na(first_record),
    status  = ifelse(!found, "Never recorded",
               ifelse(abs(lag_years) <= 1, "Recorded within a year", "Recorded late")),
    lbl     = ifelse(!found, "never recorded",
               paste0(ifelse(lag_years > 0, "+", ""), lag_years, " yr")),
    lbl_x   = pmax(documented_first_detection, ifelse(found, first_record, documented_first_detection))
  )

p1 <- ggplot(val) +
  geom_segment(data = filter(val, found),
               aes(x = documented_first_detection, xend = first_record,
                   y = country, yend = country,
                   colour = status), linewidth = 1.6, lineend = "round") +
  geom_point(data = filter(val, found),
             aes(x = first_record, y = country, colour = status), size = 3.4) +
  geom_point(aes(x = documented_first_detection, y = country),
             shape = 21, fill = PPS_SURFACE, colour = PPS_INK, stroke = 0.9, size = 2.8) +
  # nudge_x keeps the label clear even when the segment has zero length (Italy)
  geom_text(aes(x = lbl_x, y = country, label = lbl, colour = status),
            hjust = 0, nudge_x = 0.4, size = 3.1, show.legend = FALSE) +
  scale_colour_manual(values = c("Recorded within a year" = HIT,
                                 "Recorded late" = MISS,
                                 "Never recorded" = PPS_INK_MUTED)) +
  scale_x_continuous(limits = c(2011, 2030), breaks = seq(2012, 2028, 4),
                     expand = expansion(mult = c(0.02, 0.02))) +
  labs(
    title = "Did the free data notice the outbreak?",
    subtitle = "Hollow marker = confirmed outbreak, filled marker = first public record",
    x = NULL, y = NULL, caption = CAP
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(colour = PPS_INK))

pps_save(p1, file.path(FIGS, "validation_timeline.png"), 8.5, 4.0)

# ---- Figure 2: effort-corrected ranking -------------------------------------
eff <- read_csv(file.path(RESULTS, "effort_corrected.csv"), show_col_types = FALSE) |>
  slice_max(per_million, n = 10) |>
  mutate(countryCode = fct_reorder(countryCode, per_million),
         is_us = countryCode == "US")

p2 <- ggplot(eff, aes(x = per_million, y = countryCode)) +
  geom_col(aes(fill = is_us), width = 0.68, show.legend = FALSE) +
  geom_text(aes(label = paste0(number(per_million, accuracy = 0.1),
                               "   (", comma(records), " records)")),
            hjust = -0.08, size = 3.1, colour = PPS_INK) +
  scale_fill_manual(values = c(`FALSE` = ONE, `TRUE` = cols2[2])) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.34))) +
  labs(
    title = "After correcting for how much each country records",
    subtitle = "The United States (orange) falls from first place to seventh",
    x = "Xylella records per million total GBIF records for that country",
    y = NULL, caption = CAP
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(colour = PPS_INK))

pps_save(p2, file.path(FIGS, "effort_corrected.png"), 8.5, 4.4)

cat("done\n")
