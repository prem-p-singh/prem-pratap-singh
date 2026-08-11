import type { Metadata } from "next";
import VisualGallery from "@/components/gallery/VisualGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual collection of research illustrations, data stories, and methods from plant pathology and grapevine virology.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-b from-muted to-background pb-6 pt-14 sm:pb-8 sm:pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
            Charts · maps · mechanisms · research illustrations
          </p>
          <h1 className="section-title mb-4">The Visual Lab</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Twelve visual entry points into the work—from global pathogen maps to causal pathways and the molecular conversations between plants and microbes.
          </p>
        </div>
      </section>
      <VisualGallery />
    </div>
  );
}
