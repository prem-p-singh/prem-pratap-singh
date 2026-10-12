import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogSearchList from "@/components/blog/BlogSearchList";
import { formatContentDate } from "@/lib/date";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Visual field notes on plant disease, grapevine virology, molecular signals, and multi-omics.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "Prem Pratap Singh",
    title: "Research Blog | Prem Pratap Singh",
    description: "Visual field notes on plant disease, grapevine virology, molecular signals, and multi-omics.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Prem Pratap Singh research blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Blog | Prem Pratap Singh",
    description: "Visual field notes on plant disease, grapevine virology, molecular signals, and multi-omics.",
    images: ["/opengraph-image"],
  },
};

const topicNodes = ["Field", "Signals", "Models"];

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const library = posts.slice(1);
  const featuredImage = featured?.visualSummary || featured?.image;

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-border pb-10 pt-10 sm:pt-12 lg:pb-14 lg:pt-14">
          <p className="section-kicker">Research notebook</p>
          <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            See the idea before reading the details
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            Visual field notes on plants, pathogens, measurements, and models.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {/* The arrows mark a real order: field observation, then signals, then models. */}
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {topicNodes.map((topic, index) => (
                <li key={topic} className="flex items-center gap-2">
                  {index > 0 && <ArrowRight className="size-4" aria-hidden="true" />}
                  {topic}
                </li>
              ))}
            </ol>
            <p>
              Published notes <span className="tabular-nums text-foreground">{posts.length}</span>
            </p>
          </div>
        </header>

        {featured && (
          <article
            className={`relative grid gap-x-8 gap-y-4 py-10 ${featuredImage ? "sm:grid-cols-3" : ""}`}
          >
            {featuredImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border">
                <Image
                  src={featuredImage}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
            )}
            <div className={featuredImage ? "sm:col-span-2" : undefined}>
              <p className="text-sm text-muted-foreground">Latest field note</p>
              <h2 className="mt-1 text-2xl leading-tight text-foreground sm:text-3xl">
                {/* The link's ::after covers the row, so the thumbnail is clickable too. */}
                <Link
                  href={`/blog/${featured.slug}`}
                  className="underline-offset-4 after:absolute after:inset-0 hover:underline"
                >
                  {featured.title}
                </Link>
              </h2>
              {featured.description && (
                <p className="mt-3 line-clamp-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              )}
              <p className="mt-3 flex items-center gap-2 text-sm tabular-nums text-muted-foreground">
                <time dateTime={featured.date}>
                  {formatContentDate(featured.date, { year: "numeric", month: "short", day: "numeric" })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{featured.readingTime}</span>
              </p>
              {featured.tags.length > 0 && (
                <p className="mt-1 text-sm text-muted-foreground">{featured.tags.join(", ")}</p>
              )}
            </div>
          </article>
        )}

        {library.length > 0 && <BlogSearchList posts={library} />}
      </div>
    </div>
  );
}
