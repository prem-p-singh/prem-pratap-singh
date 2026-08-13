import type { Metadata } from "next";
import VisualGallery, { type GalleryItem } from "@/components/gallery/VisualGallery";
import { getAllPosts } from "@/lib/mdx";
import { getAllMethodPosts } from "@/lib/methods";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual collection of research illustrations, data stories, and methods from plant pathology and grapevine virology.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  const blogPresentations: GalleryItem[] = getAllPosts()
    .filter((post) => post.visualSummary)
    .map((post) => ({
      id: `blog-${post.slug}`,
      title: post.title,
      category: "Research illustrations",
      src: post.visualSummary!,
      alt: `Illustrated presentation for ${post.title}`,
      sourceHref: `/blog/${post.slug}`,
      sourceLabel: "Read the blog",
    }));

  const methodPresentations: GalleryItem[] = getAllMethodPosts()
    .filter((post) => post.visualSummary)
    .map((post) => ({
      id: `method-${post.slug}`,
      title: post.title,
      category: "Methods",
      src: post.visualSummary!,
      alt: `Visual presentation for ${post.title}`,
      sourceHref: `/methods/${post.slug}`,
      sourceLabel: "Open the method report",
    }));

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-b from-muted to-background pb-6 pt-14 sm:pb-8 sm:pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-kicker">
            Charts · maps · mechanisms · research illustrations
          </p>
          <div className="mt-5">
            <h1 className="section-title !mb-0">The Visual Lab</h1>
          </div>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A presentation wall for every blog and method visual, alongside the charts and maps that support the underlying evidence.
          </p>
        </div>
      </section>
      <VisualGallery presentationItems={[...blogPresentations, ...methodPresentations]} />
    </div>
  );
}
