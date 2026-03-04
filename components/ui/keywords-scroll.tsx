"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface KeywordsScrollProps {
  heading?: string;
  keywords?: string[];
  className?: string;
}

const KeywordsScroll = ({
  heading = "Research Areas & Tools",
  keywords = [
    "Grapevine Virology",
    "GRBV",
    "RNA-seq",
    "GC-MS",
    "LC-MS/MS",
    "RT-qPCR",
    "Digital PCR",
    "Multi-omics",
    "Bioinformatics",
    "Nanoencapsulation",
    "Food Safety",
    "Plant Pathology",
    "DESeq2",
    "R / Bioconductor",
    "Python",
    "Molecular Docking",
    "Metabolomics",
    "Transcriptomics",
  ],
}: KeywordsScrollProps) => {
  return (
    <section className="py-16">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-lg font-medium text-[var(--muted-foreground)] tracking-wide uppercase">
          {heading}
        </h2>
      </div>
      <div className="pt-6">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 0.5 })]}
          >
            <CarouselContent className="ml-0">
              {keywords.map((keyword, index) => (
                <CarouselItem
                  key={index}
                  className="flex basis-auto justify-center pl-0"
                >
                  <div className="mx-2 flex shrink-0 items-center justify-center">
                    <span className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] border border-[var(--border)] rounded-full whitespace-nowrap hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-colors">
                      {keyword}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { KeywordsScroll };
