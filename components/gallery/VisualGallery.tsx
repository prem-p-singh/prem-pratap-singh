"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type GalleryCategory = "All" | "Research illustrations" | "Data stories" | "Methods";

type GalleryItem = {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  src: string;
  alt: string;
  sourceHref: string;
  sourceLabel: string;
};

const categories: GalleryCategory[] = ["All", "Research illustrations", "Data stories", "Methods"];

const galleryItems: GalleryItem[] = [
  {
    id: "lipid-vines",
    title: "From lipid signaling to 3D vines",
    category: "Research illustrations",
    src: "/blog/from-lipid-signaling-to-3d-vines-new-clues-for-smarter-plant-disease-research/lipid-to-3d-vines.png",
    alt: "Research illustration connecting lipid signaling with three-dimensional grapevine analysis",
    sourceHref: "/blog/from-lipid-signaling-to-3d-vines-new-clues-for-smarter-plant-disease-research",
    sourceLabel: "Read the research note",
  },
  {
    id: "disease-signals",
    title: "Building better plant disease signals",
    category: "Research illustrations",
    src: "/blog/from-orchard-lesions-to-airborne-spores-building-better-plant-disease-signals/disease-signals-infographic.jpg",
    alt: "Infographic about connecting orchard lesions, airborne spores, and plant disease signals",
    sourceHref: "/blog/from-orchard-lesions-to-airborne-spores-building-better-plant-disease-signals",
    sourceLabel: "Read the research note",
  },
  {
    id: "point-clouds",
    title: "From point clouds to pathogens",
    category: "Research illustrations",
    src: "/blog/from-point-clouds-to-pathogens-what-new-plant-research-suggests-for-smarter-grapevine-dise/point-clouds-to-pathogens.png",
    alt: "Research illustration connecting point-cloud measurements with pathogen questions",
    sourceHref: "/blog/from-point-clouds-to-pathogens-what-new-plant-research-suggests-for-smarter-grapevine-dise",
    sourceLabel: "Read the research note",
  },
  {
    id: "precision-scales",
    title: "Plant protection across scales",
    category: "Research illustrations",
    src: "/blog/from-xylem-recovery-to-genome-mining-connecting-plant-disease-biology-across-scales/precision-plant-protection-scales.jpg",
    alt: "Illustration of precision plant protection across biological scales",
    sourceHref: "/blog/from-xylem-recovery-to-genome-mining-connecting-plant-disease-biology-across-scales",
    sourceLabel: "Read the research note",
  },
  {
    id: "rna-virulence",
    title: "Cross-kingdom RNA virulence",
    category: "Research illustrations",
    src: "/blog/pathogen-rnas-are-crossing-kingdoms-and-plant-disease-research-needs-to-catch-up/rna-virulence.jpg",
    alt: "Illustration of RNA signals moving between a pathogen and plant host",
    sourceHref: "/blog/pathogen-rnas-are-crossing-kingdoms-and-plant-disease-research-needs-to-catch-up",
    sourceLabel: "Read the research note",
  },
  {
    id: "xylella-map",
    title: "Global records of Xylella fastidiosa",
    category: "Data stories",
    src: "/data/xylella-fastidiosa-spread/global_map.png",
    alt: "World map showing occurrence records for Xylella fastidiosa",
    sourceHref: "/data/xylella-fastidiosa-spread",
    sourceLabel: "Explore the data story",
  },
  {
    id: "xylella-timeline",
    title: "How Xylella records accumulated",
    category: "Data stories",
    src: "/data/xylella-fastidiosa-spread/cumulative_records.png",
    alt: "Chart showing cumulative Xylella fastidiosa records over time",
    sourceHref: "/data/xylella-fastidiosa-spread",
    sourceLabel: "Explore the data story",
  },
  {
    id: "ai-attention",
    title: "AI attention versus crop importance",
    category: "Data stories",
    src: "/data/ai-attention-vs-crop-importance/attention_vs_production.png",
    alt: "Chart comparing artificial intelligence research attention with crop production",
    sourceHref: "/data/ai-attention-vs-crop-importance",
    sourceLabel: "Explore the data story",
  },
  {
    id: "pathogen-assemblies",
    title: "Genome assemblies by pathogen",
    category: "Data stories",
    src: "/data/pathogen-genome-observatory/assemblies_per_pathogen.png",
    alt: "Chart comparing available genome assemblies across plant pathogens",
    sourceHref: "/data/pathogen-genome-observatory",
    sourceLabel: "Explore the data story",
  },
  {
    id: "two-pathways",
    title: "Two pathways to a disease outcome",
    category: "Methods",
    src: "/methods/causal-mediation/two_pathways.png",
    alt: "Causal mediation diagram showing direct and indirect pathways",
    sourceHref: "/methods/causal-mediation",
    sourceLabel: "Open the methods lab",
  },
  {
    id: "growth-regimes",
    title: "Growth under contrasting regimes",
    category: "Methods",
    src: "/methods/causal-mediation/growth_regimes.png",
    alt: "Chart comparing plant growth under contrasting experimental regimes",
    sourceHref: "/methods/causal-mediation",
    sourceLabel: "Open the methods lab",
  },
  {
    id: "proportion-mediated",
    title: "Reading the mediated proportion",
    category: "Methods",
    src: "/methods/causal-mediation/proportion_mediated.png",
    alt: "Chart explaining the proportion of an effect carried through a mediator",
    sourceHref: "/methods/causal-mediation",
    sourceLabel: "Open the methods lab",
  },
];

export default function VisualGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const visibleItems = useMemo(
    () => galleryItems.filter((item) => activeCategory === "All" || item.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    if (!selected) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  return (
    <>
      <section className="py-6 sm:py-8" aria-labelledby="visual-gallery-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Research, seen differently
              </p>
              <h2 id="visual-gallery-title" className="mt-3 text-3xl font-bold text-foreground">
                Browse the evidence wall
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Filter the collection, open any visual for a closer look, then follow it back to the full story.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery visuals">
            {categories.map((category) => {
              const selectedCategory = activeCategory === category;
              const count = category === "All"
                ? galleryItems.length
                : galleryItems.filter((item) => item.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/15"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {category}
                  <span className={`text-xs tabular-nums ${selectedCategory ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/70 bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path strokeLinecap="round" d="m20 20-4-4M11 8v6M8 11h6" />
                    </svg>
                  </span>
                </span>
                <span className="block border-t border-border p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {item.category}
                  </span>
                  <span className="mt-1.5 block font-semibold leading-snug text-foreground group-hover:text-primary">
                    {item.title}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-dialog-title"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-3xl border border-white/15 bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground backdrop-blur transition-colors hover:bg-muted"
              aria-label="Close visual"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="relative min-h-[300px] bg-white sm:min-h-[520px]">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                priority
                sizes="(max-width: 1024px) 95vw, 1024px"
                className="object-contain p-3 sm:p-6"
              />
            </div>
            <div className="flex flex-col gap-4 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {selected.category}
                </p>
                <h3 id="gallery-dialog-title" className="mt-1 text-xl font-bold text-foreground">
                  {selected.title}
                </h3>
              </div>
              <Link
                href={selected.sourceHref}
                onClick={() => setSelected(null)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {selected.sourceLabel}
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
