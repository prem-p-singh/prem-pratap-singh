#!/usr/bin/env Rscript
# Causal mediation, re-applied.
#
# In the GRBV study the question was: how much of temperature's effect on a
# host gene travels THROUGH viral titer? Here the same estimator is pointed at
# public FAO data to ask: how much of the growth in crop production travels
# THROUGH expanding land, rather than through rising yield?
#
# Estimator (product of coefficients, Baron & Kenny decomposition):
#   mediator model:  M ~ X
#   outcome model:   Y ~ X + M
#   indirect (ab) = a * b        effect running through the mediator
#   direct  (c')  = coefficient on X in the outcome model
#   proportion mediated = ab / (ab + c')
# Confidence intervals come from a nonparametric bootstrap, which is the
# appropriate choice because ab is a product and its sampling distribution is
# skewed.
#
# IMPORTANT: this is a decomposition of observational trends, not a randomised
# experiment. Year is not a manipulable treatment, so "mediation" here describes
# how the association partitions, not proof of causation.

suppressPackageStartupMessages({
  library(dplyr); library(readr); library(tidyr); library(forcats)
  library(boot); library(scales); library(ggrepel)
})

script_path <- normalizePath(sub("--file=", "", grep("--file=", commandArgs(trailingOnly = FALSE), value = TRUE)[1]))
base      <- dirname(dirname(script_path))
repo_root <- dirname(base)
source(file.path(repo_root, "R", "theme_pps.R"))

FAO <- file.path(repo_root, "ai-attention-vs-crop-importance", "data", "raw",
                 "Production_Crops_Livestock_E_All_Data_(Normalized).csv")
RESULTS <- file.path(base, "results"); dir.create(RESULTS, showWarnings = FALSE, recursive = TRUE)
FIGS    <- file.path(base, "figures");  dir.create(FIGS, showWarnings = FALSE, recursive = TRUE)

CROPS <- c("Maize (corn)", "Rice", "Wheat", "Soya beans", "Potatoes",
           "Sugar cane", "Cassava, fresh", "Bananas", "Tomatoes", "Barley")
LABEL <- c("Maize", "Rice", "Wheat", "Soybean", "Potato",
           "Sugarcane", "Cassava", "Banana", "Tomato", "Barley")
names(LABEL) <- CROPS

set.seed(42)   # reproducible bootstrap
YEARS <- 1961:2023
R_BOOT <- 2000

cat("Reading FAOSTAT (large file, please wait)...\n")
fao <- read_csv(FAO, locale = locale(encoding = "latin1"), show_col_types = FALSE,
                col_select = c(Area, Item, Element, Year, Unit, Value)) |>
  filter(Area == "World", Item %in% CROPS, Year %in% YEARS,
         Element %in% c("Production", "Area harvested")) |>
  select(Item, Element, Year, Value) |>
  pivot_wider(names_from = Element, values_from = Value) |>
  rename(production = Production, area = `Area harvested`) |>
  filter(!is.na(production), !is.na(area)) |>
  arrange(Item, Year)

cat("  rows:", nrow(fao), " crops:", n_distinct(fao$Item), "\n")

#' One mediation fit. Variables are standardised so the decomposition is on a
#' common scale and the proportion is interpretable across crops.
mediate_one <- function(d, idx = seq_len(nrow(d))) {
  s <- d[idx, ]
  X <- as.numeric(scale(s$Year))
  M <- as.numeric(scale(s$area))
  Y <- as.numeric(scale(s$production))
  a  <- coef(lm(M ~ X))[["X"]]
  om <- coef(lm(Y ~ X + M))
  b  <- om[["M"]]
  cp <- om[["X"]]
  ab <- a * b
  total <- ab + cp
  c(a = a, b = b, direct = cp, indirect = ab, total = total,
    prop_mediated = ab / total)
}

rows <- list()
for (crop in CROPS) {
  d <- fao |> filter(Item == crop)
  if (nrow(d) < 20) next
  est <- mediate_one(d)
  bs  <- boot(d, statistic = function(dd, i) mediate_one(dd, i)["prop_mediated"], R = R_BOOT)
  ci  <- tryCatch(boot.ci(bs, type = "perc")$percent[4:5], error = function(e) c(NA, NA))
  # Diagnostic: when the exposure and mediator are nearly collinear the
  # decomposition destabilises and the proportion can fall outside 0-100%.
  # Report it rather than quietly presenting an uninterpretable number.
  r_xm <- cor(d$Year, d$area)
  rows[[crop]] <- tibble(
    crop = LABEL[[crop]],
    a = est[["a"]], b = est[["b"]],
    direct = est[["direct"]], indirect = est[["indirect"]],
    total = est[["total"]], prop_mediated = est[["prop_mediated"]],
    ci_low = ci[1], ci_high = ci[2],
    cor_year_area = r_xm,
    interpretable = est[["prop_mediated"]] >= 0 & est[["prop_mediated"]] <= 1,
    n_years = nrow(d),
    production_growth = last(d$production) / first(d$production),
    area_growth = last(d$area) / first(d$area)
  )
  cat(sprintf("  %-10s prop mediated by area = %5.1f%%  [%.1f, %.1f]\n",
              LABEL[[crop]], 100 * est[["prop_mediated"]], 100 * ci[1], 100 * ci[2]))
}

res <- bind_rows(rows) |> arrange(desc(prop_mediated))
write_csv(res, file.path(RESULTS, "mediation_faostat.csv"))

# ---- Figure 1: proportion mediated, only where it is interpretable ----------
# Crops whose estimate falls outside 0-100% are shown separately below, not
# forced onto a scale where they cannot be read.
d1 <- res |> filter(interpretable) |> mutate(crop = fct_reorder(crop, prop_mediated))
ONE <- pps_cat(1); TWO <- pps_cat(2)[2]

p1 <- ggplot(d1, aes(x = prop_mediated * 100, y = crop)) +
  geom_vline(xintercept = 50, linetype = "22", colour = "#c9ced4") +
  geom_errorbar(aes(xmin = ci_low * 100, xmax = ci_high * 100),
                orientation = "y", width = 0, linewidth = 0.8, colour = "#b9c0c8") +
  geom_point(aes(colour = prop_mediated > 0.5), size = 3.4) +
  geom_text(aes(label = percent(prop_mediated, accuracy = 1)),
            vjust = -1.3, size = 3.1, colour = PPS_INK) +
  scale_colour_manual(values = c(`TRUE` = TWO, `FALSE` = ONE), guide = "none") +
  scale_x_continuous(labels = label_percent(scale = 1), limits = c(0, 105),
                     breaks = seq(0, 100, 25)) +
  labs(
    title = "How much of production growth came from more land?",
    subtitle = "Share of the rise in world production running through area harvested, 1961-2023.\nRight of the dashed line means growth came mainly from farming more land, not from higher yield.",
    x = "Proportion of the total effect mediated by area harvested",
    y = NULL,
    caption = "Source: FAOSTAT world totals. Bars are 2,000-sample bootstrap percentile intervals. A decomposition of observational trends, not a randomised experiment."
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(colour = PPS_INK))

pps_save(p1, file.path(FIGS, "proportion_mediated.png"), 8.5, 4.6)

# ---- Figure 3: why some estimates fall outside 0-100% ----------------------
# The cause is not collinearity: sugarcane (r = 0.989) is interpretable while
# tomato (r = 0.990) is not. It is the direction and relative size of the two
# growth rates, which this figure shows directly.
d3 <- res |>
  mutate(regime = case_when(
    prop_mediated < 0 ~ "Land shrank, yield did the work",
    prop_mediated > 1 ~ "Land grew faster than output",
    TRUE              ~ "Land and yield both contributed"))

p3 <- ggplot(d3, aes(x = area_growth, y = production_growth, colour = regime)) +
  geom_abline(slope = 1, intercept = 0, linetype = "22", colour = "#c9ced4") +
  geom_point(size = 3.6) +
  ggrepel::geom_text_repel(aes(label = crop), size = 3.1, seed = 7,
                           min.segment.length = 0.3, box.padding = 0.45,
                           segment.colour = "#c9ced4", show.legend = FALSE) +
  scale_colour_manual(values = pps_cat(3)) +
  scale_x_continuous(labels = label_number(suffix = "x"),
                     expand = expansion(mult = 0.09)) +
  scale_y_continuous(labels = label_number(suffix = "x"),
                     expand = expansion(mult = 0.10)) +
  labs(
    title = "Why some crops fall outside 0-100%",
    subtitle = "Growth since 1961, as a multiple. Above the dashed line, output outgrew land, so yield\nmattered more. Left of 1x, the land itself shrank.",
    x = "Area harvested, growth since 1961",
    y = "Production, growth since 1961",
    caption = "Source: FAOSTAT world totals, 1961-2023."
  ) +
  theme_pps()

pps_save(p3, file.path(FIGS, "growth_regimes.png"), 8.5, 5.2)

# ---- Figure 2: the two pathways ---------------------------------------------
d2 <- res |>
  select(crop, direct, indirect) |>
  pivot_longer(-crop, names_to = "path", values_to = "effect") |>
  mutate(path = recode(path,
                       indirect = "Through more land (indirect)",
                       direct   = "Through higher yield (direct)"),
         crop = fct_reorder(crop, effect * (path == "Through more land (indirect)")))

p2 <- ggplot(d2, aes(x = effect, y = crop, fill = path)) +
  geom_col(position = position_dodge(width = 0.72), width = 0.66) +
  scale_fill_manual(values = pps_cat(2)) +
  scale_x_continuous(expand = expansion(mult = c(0.02, 0.08))) +
  labs(
    title = "Two routes to a bigger harvest",
    subtitle = "Standardised effect of time on production, split into the land pathway and the yield pathway",
    x = "Standardised effect", y = NULL,
    caption = "Source: FAOSTAT world totals, 1961-2023."
  ) +
  theme_pps_barh() +
  theme(axis.text.y = element_text(colour = PPS_INK))

pps_save(p2, file.path(FIGS, "two_pathways.png"), 8.5, 5.2)

# ---- headline numbers -------------------------------------------------------
top <- res |> slice_max(prop_mediated, n = 1)
bot <- res |> slice_min(prop_mediated, n = 1)
jsonlite::write_json(list(
  crops = nrow(res),
  years = paste0(min(YEARS), "-", max(YEARS)),
  bootstrap_samples = R_BOOT,
  most_land_driven = top$crop, most_land_pct = round(100 * top$prop_mediated, 1),
  most_yield_driven = bot$crop, most_yield_pct = round(100 * (1 - bot$prop_mediated), 1),
  median_prop_mediated = round(100 * median(res$prop_mediated), 1)
), file.path(RESULTS, "headline_findings.json"), auto_unbox = TRUE, pretty = TRUE)

cat("\ndone\n")
