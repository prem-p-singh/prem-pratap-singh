# Causal mediation, re-applied

The statistical model built for my grapevine work, pointed at public FAO data.

Live write-up: https://www.prempsingh.com/methods/causal-mediation

## The method

Product-of-coefficients decomposition:

```
mediator model:  M ~ X
outcome model:   Y ~ X + M
indirect (ab) = a * b        the part travelling through the mediator
direct  (c')  = coefficient on X in the outcome model
proportion mediated = ab / (ab + c')
```

Confidence intervals come from a 2,000-sample nonparametric bootstrap, because
`ab` is a product and its sampling distribution is skewed.

## Original application (GRBV, UC Davis)

Exposure = season temperature, mediator = viral titer, outcome = gene
expression. A sweep over the 2,000 most variable genes returned 39 mediators at
joint BH-FDR < 0.05. Top hit MBF1c, an HSF co-activator: 61.8% of temperature's
effect mediated by viral titer, joint p = 4.8e-11.

## Re-application (FAOSTAT, 1961-2023)

Exposure = year, mediator = area harvested, outcome = production. How much of
the growth in world crop production ran through farming more land rather than
raising yield?

| Crop | Mediated by area |
|---|---|
| Sugarcane | 97% |
| Maize | 73% |
| Cassava | 60% |
| Banana | 49% |
| Rice | 13% |

Four crops fell outside 0-100% and are reported separately rather than dropped:
wheat, potato and barley now use **less** land than in 1961 while producing more
(the land pathway opposes the total), while soybean and tomato expanded area
faster than output.

A first guess that collinearity caused this was wrong: sugarcane (r = 0.989
between year and area) is interpretable while tomato (r = 0.990) is not. The
cause is the direction and relative size of the two growth rates.

## Caveats

Year is not an assigned treatment, so this decomposes observational trends
rather than proving causation. Mediation also assumes no unmeasured confounder
of mediator and outcome, which fertiliser, irrigation and genetics certainly
violate here. World totals hide regional variation.

## Reproduce

```bash
Rscript code/mediation.R
```

Requires the FAOSTAT bulk CSV, downloadable per
`../ai-attention-vs-crop-importance/README.md`.
