import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/mdx-components";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import ShareButtons from "@/components/blog/ShareButtons";
import TldrCallout from "@/components/blog/TldrCallout";
import VisualSummary from "@/components/content/VisualSummary";
import { formatContentDate } from "@/lib/date";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Prem Pratap Singh"],
      tags: post.tags,
      url: `https://www.prempsingh.com/blog/${slug}`,
      siteName: "Prem Pratap Singh",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://www.prempsingh.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  if (!post) {
    notFound();
  }

  // Get related posts (same tags, excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 3);

  // Get next and previous posts in series
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const formattedDate = formatContentDate(post.date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const components = getMDXComponents({});

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Prem Pratap Singh",
      url: "https://www.prempsingh.com",
    },
    publisher: {
      "@type": "Person",
      name: "Prem Pratap Singh",
      url: "https://www.prempsingh.com",
    },
    url: `https://www.prempsingh.com/blog/${slug}`,
    keywords: post.tags,
    image: post.visualSummary
      ? `https://www.prempsingh.com${post.visualSummary}`
      : post.image
        ? `https://www.prempsingh.com${post.image}`
        : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.prempsingh.com/blog/${slug}`,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prempsingh.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.prempsingh.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.prempsingh.com/blog/${slug}` },
    ],
  };

  return (
    <article className="min-h-screen pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        {/* The header sits on the page wash; only the cards below are opaque. */}
        <header className="pt-10 sm:pt-12 lg:pt-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All Articles
          </Link>
          <h1 className="mt-5 max-w-4xl text-4xl leading-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}

          {/* gap-px over the border colour draws the dividers between cells. */}
          <div className="paper-panel mt-8">
            <div className="flex flex-wrap gap-px bg-border">
              <div className="flex min-w-64 flex-1 items-center gap-3 bg-card px-5 py-4 sm:px-6">
                <Image
                  src="/images/portrait.jpg"
                  alt="Prem Pratap Singh"
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <div className="text-sm leading-normal">
                  <p className="font-semibold text-foreground">Prem Pratap Singh</p>
                  <p className="tabular-nums text-muted-foreground">{formattedDate} · {post.readingTime}</p>
                </div>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex min-w-64 flex-[2] flex-wrap items-center gap-2 bg-card px-5 py-4 sm:px-6">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-field/20 bg-field-wash px-3 py-1 text-xs font-semibold text-field"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-1 py-1 text-xs font-semibold text-muted-foreground">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {post.visualSummary && (
            <VisualSummary
              src={post.visualSummary}
              alt={`Illustrated visual summary of ${post.title}`}
            />
          )}
        </header>

        {/* The card is as wide as the reading measure; share and related links sit beside it on desktop. */}
        <div className="mt-5 grid gap-5 lg:grid-cols-12 lg:items-start">
          <div className="paper-panel p-6 sm:p-10 lg:col-span-8">
            <div className="prose text-base text-foreground">
              {post.tldr && post.tldr.length > 0 && (
                <TldrCallout items={post.tldr} />
              )}
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkMath, remarkGfm],
                    rehypePlugins: [rehypeKatex],
                  },
                }}
              />
            </div>
          </div>

          <aside className="grid gap-5 lg:col-span-4">
            <div className="paper-panel p-6">
              <ShareButtons title={post.title} slug={slug} description={post.description} />
            </div>

            {relatedPosts.length > 0 && (
              <div className="paper-panel p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-field-wash text-field">
                    <svg className="size-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <h2 className="text-xl leading-tight text-foreground">Related Articles</h2>
                </div>
                <ul className="mt-4 divide-y divide-border">
                  {relatedPosts.map((relatedPost) => (
                    <li key={relatedPost.slug} className="py-4 last:pb-0">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="line-clamp-3 font-serif text-lg leading-snug text-foreground underline-offset-4 hover:underline"
                      >
                        {relatedPost.title}
                      </Link>
                      <p className="mt-1 text-sm tabular-nums text-muted-foreground">
                        {relatedPost.readingTime}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* Post navigation */}
        <nav className="mt-5 grid gap-5 sm:grid-cols-2" aria-label="More articles">
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="paper-panel group block p-6">
              <span className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
              <span className="mt-2 font-serif text-xl leading-snug text-foreground underline-offset-4 group-hover:underline sm:line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className={`paper-panel group block p-6 sm:text-right ${!prevPost ? "sm:col-start-2" : ""}`}
            >
              <span className="flex items-center gap-1 text-sm font-semibold text-muted-foreground sm:justify-end">
                Next
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="mt-2 font-serif text-xl leading-snug text-foreground underline-offset-4 group-hover:underline sm:line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
