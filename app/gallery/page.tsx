import type { Metadata } from "next";
import VisualGallery, {
  GalleryCollections,
  type GalleryItem,
} from "@/components/gallery/VisualGallery";
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="grid gap-x-8 gap-y-8 pb-10 pt-10 sm:pt-12 lg:grid-cols-12 lg:items-end lg:pb-14 lg:pt-14">
          <div className="lg:col-span-7">
            <p className="section-kicker">Charts, maps, mechanisms and research illustrations</p>
            <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              The Visual Lab
            </h1>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              A presentation wall for every blog and method visual, alongside the charts and maps that support the underlying evidence.
            </p>
          </div>

          <ul className="paper-panel grid grid-cols-3 gap-2 p-5 sm:p-6 lg:col-span-5">
            <GalleryCollections />
          </ul>
        </header>

        {/* The gallery section opens with its own top rule, which also closes the header. */}
        <VisualGallery presentationItems={[...blogPresentations, ...methodPresentations]} />
      </div>
    </div>
  );
}
