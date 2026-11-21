// The Hedgerow palette for the share images. next/og draws outside the page's
// stylesheet, so it cannot read the CSS tokens; these are the same colours as
// app/tokens.css, converted from OKLCH to sRGB hex.
export const og = {
  paper: "#032615",
  paper2: "#001b0d",
  paper3: "#143423",
  ink: "#eee7d8",
  ink2: "#b2c8b5",
  muted: "#88a48d",
  rule: "#224230",
  accent: "#cae430",
  accentInk: "#012111",
} as const;
