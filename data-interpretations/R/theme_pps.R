# Shared chart theme for "Open Data, Decoded".
#
# Colours are NOT chosen by eye. They come from a validated categorical palette
# and were checked with the dataviz validator (lightness band, chroma floor,
# CVD separation, normal-vision floor, contrast). The previous hand-picked
# palette failed two hard checks: two hues read as gray, and the green/slate
# pair sat at deltaE 12 in normal vision, below the 15 floor.
#
# Rules encoded here:
#   - categorical hues assigned in fixed order, never cycled
#   - one series gets one colour and no legend; the title names it
#   - recessive grid and axes, no chart junk
#   - direct value labels (also the "relief" required where contrast < 3:1)
#   - text uses ink tokens, never the series colour

suppressPackageStartupMessages({
  library(ggplot2)
  library(scales)
})

# Validated categorical slots, in fixed order (light surface #fcfcfb)
PPS_CAT <- c(
  blue    = "#2a78d6",  # slot 1
  orange  = "#eb6834",  # slot 2
  aqua    = "#1baf7a",  # slot 3
  yellow  = "#eda100",  # slot 4
  magenta = "#e87ba4",  # slot 5
  green   = "#008300",  # slot 6
  violet  = "#4a3aa7",  # slot 7
  red     = "#e34948"   # slot 8
)

# Ink tokens: text never wears the series colour
PPS_INK        <- "#1f2937"
PPS_INK_MUTED  <- "#6b7280"
PPS_SURFACE    <- "#fcfcfb"
PPS_GRID       <- "#eceef0"

#' Fixed-order categorical colours.
#' @param n how many series
pps_cat <- function(n) unname(PPS_CAT[seq_len(n)])

#' Base theme: recessive everything, generous spacing, legible type.
theme_pps <- function(base_size = 12) {
  theme_minimal(base_size = base_size) +
    theme(
      plot.background    = element_rect(fill = PPS_SURFACE, colour = NA),
      panel.background   = element_rect(fill = PPS_SURFACE, colour = NA),
      panel.grid.major   = element_line(colour = PPS_GRID, linewidth = 0.4),
      panel.grid.minor   = element_blank(),
      axis.ticks         = element_blank(),
      axis.title         = element_text(colour = PPS_INK_MUTED, size = rel(0.85)),
      axis.text          = element_text(colour = PPS_INK_MUTED, size = rel(0.85)),
      plot.title         = element_text(colour = PPS_INK, face = "bold",
                                        size = rel(1.25), margin = margin(b = 4)),
      plot.subtitle      = element_text(colour = PPS_INK_MUTED, size = rel(0.9),
                                        margin = margin(b = 12)),
      plot.caption       = element_text(colour = PPS_INK_MUTED, size = rel(0.65),
                                        hjust = 0, margin = margin(t = 12)),
      plot.title.position   = "plot",
      plot.caption.position = "plot",
      legend.position    = "top",
      legend.justification = "left",
      legend.title       = element_blank(),
      legend.text        = element_text(colour = PPS_INK_MUTED, size = rel(0.85)),
      legend.key.size    = unit(10, "pt"),
      plot.margin        = margin(14, 18, 10, 14)
    )
}

#' Horizontal bars with no vertical grid noise (labels carry the values).
theme_pps_barh <- function(base_size = 12) {
  theme_pps(base_size) +
    theme(
      panel.grid.major.y = element_blank(),
      panel.grid.major.x = element_line(colour = PPS_GRID, linewidth = 0.4)
    )
}

#' Save at a consistent size and density using ragg for clean text.
pps_save <- function(plot, path, width = 8.5, height = 6) {
  ggsave(path, plot, width = width, height = height, dpi = 200,
         device = ragg::agg_png, bg = PPS_SURFACE)
  cat("  wrote", basename(path), "\n")
}
