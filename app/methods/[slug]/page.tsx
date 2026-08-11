import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getMethodPostBySlug, getAllMethodSlugs } from "@/lib/methods";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/mdx-components";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { KeyStats, Takeaway, Methods } from "@/components/data/DataBlocks";
import {
  CropGrowthExplorer,
  VineyardCaseFile,
} from "@/components/methods/MediationExplorer";
import { formatContentDate } from "@/lib/date";

const REPO = "https://github.com/prem-p-singh/prem-pratap-singh/tree/main";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMethodSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getMethodPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/methods/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://www.prempsingh.com/methods/${slug}`,
    },
  };
}

export default async function MethodPage({ params }: Props) {
  const { slug } = await params;
  const post = getMethodPostBySlug(slug);
  if (!post) notFound();

  const components = getMDXComponents({});
  const formattedDate = formatContentDate(post.date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="pt-16">
      <section className="py-12 bg-gradient-to-b from-muted to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/methods"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Methods That Travel
          </Link>

          {/* Wrapped in a block so it does not sit inline beside the back link */}
          {post.method && (
            <div className="mb-4">
              <span className="inline-flex px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-primary/10 text-primary">
                {post.method}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {formattedDate} · {post.readingTime}
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.keyStats && post.keyStats.length > 0 && <KeyStats stats={post.keyStats} />}

          <div className="prose prose-lg prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
            prose-p:leading-relaxed prose-p:text-foreground/90
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:bg-white prose-img:shadow-sm
            prose-strong:text-foreground
            prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          ">
            <MDXRemote
              source={post.content}
              components={{
                ...components,
                KeyStats,
                Takeaway,
                Methods,
                VineyardCaseFile,
                CropGrowthExplorer,
              }}
              options={{ mdxOptions: { remarkPlugins: [remarkMath, remarkGfm], rehypePlugins: [rehypeKatex] } }}
            />
          </div>

          {post.toolkit && post.toolkit.length > 0 && (
            <Methods items={post.toolkit}>
              Every figure and number on this page is produced by the linked code.
            </Methods>
          )}

          {/* Provenance: where it came from, where it went, and the code */}
          <div className="mt-12 rounded-xl border border-border bg-card p-5 grid sm:grid-cols-2 gap-4 text-sm">
            {post.origin && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Built for</p>
                <p className="text-foreground">{post.origin}</p>
              </div>
            )}
            {post.reappliedTo && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Re-applied to</p>
                <p className="text-foreground">{post.reappliedTo}</p>
              </div>
            )}
            {post.paperUrl && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Original work</p>
                <a href={post.paperUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {post.paperLabel || "View the paper"}
                </a>
              </div>
            )}
            {post.codePath && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Reproducible code</p>
                <a href={`${REPO}/${post.codePath}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  View analysis code
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
