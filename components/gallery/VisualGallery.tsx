"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type GalleryCategory = "All" | "Research illustrations" | "Data stories" | "Methods";

export type GalleryItem = {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  src: string;
  alt: string;
  sourceHref: string;
  sourceLabel: string;
};

const categories: GalleryCategory[] = ["All", "Research illustrations", "Data stories", "Methods"];

const supportingGalleryItems: GalleryItem[] = [
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

interface VisualGalleryProps {
  presentationItems: GalleryItem[];
}

export default function VisualGallery({ presentationItems }: VisualGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const galleryItems = useMemo(() => {
    const seenImages = new Set<string>();
    return [...presentationItems, ...supportingGalleryItems].filter((item) => {
      if (seenImages.has(item.src)) return false;
      seenImages.add(item.src);
      return true;
    });
  }, [presentationItems]);

  const visibleItems = useMemo(
    () => galleryItems.filter((item) => activeCategory === "All" || item.category === activeCategory),
    [activeCategory, galleryItems],
  );

  // A native modal dialog closes on Escape, keeps focus inside while open and
  // hands it back to the figure that opened it. Only the page scroll lock is ours.
  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const closeDialog = () => dialogRef.current?.close();

  return (
    <>
      <section
        className="border-t border-border py-16 lg:py-24"
        aria-labelledby="visual-gallery-title"
      >
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-kicker">Research, seen differently</p>
            <h2 id="visual-gallery-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
              Browse the evidence wall
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              Filter the collection, open any visual for a closer look, then follow it back to the full story.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1" role="group" aria-label="Filter gallery visuals">
              {categories.map((category) => {
                const count = category === "All"
                  ? galleryItems.length
                  : galleryItems.filter((item) => item.category === category).length;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    className="py-1.5 text-left text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground aria-pressed:text-accent aria-pressed:underline"
                  >
                    {category} <span className="tabular-nums">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <li key={item.id}>
              <figure>
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-md border border-border bg-card"
                >
                  <span className="sr-only">Enlarge: </span>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2"
                  />
                </button>
                <figcaption className="mt-3">
                  <p className="text-base font-semibold leading-snug text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                  <Link
                    href={item.sourceHref}
                    aria-label={`${item.sourceLabel}: ${item.title}`}
                    className="mt-1 inline-block text-sm text-accent underline-offset-4 hover:underline"
                  >
                    {item.sourceLabel}
                  </Link>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="gallery-dialog-title"
        onClose={() => setSelected(null)}
        // A click that lands on the dialog element itself is a click on the backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-5xl overflow-auto rounded-md border border-border bg-background p-0 text-foreground backdrop:bg-black/80"
      >
        {selected && (
          <>
            <div className="relative min-h-[300px] bg-card sm:min-h-[520px]">
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
                <p className="text-sm text-muted-foreground">{selected.category}</p>
                {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
                <h3 id="gallery-dialog-title" className="font-sans! mt-1 text-lg font-semibold leading-snug text-foreground">
                  {selected.title}
                </h3>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  href={selected.sourceHref}
                  onClick={closeDialog}
                  className="text-sm text-accent underline-offset-4 hover:underline"
                >
                  {selected.sourceLabel}
                </Link>
                <button type="button" onClick={closeDialog} aria-label="Close visual" className="btn-outline">
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
