import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDataPostBySlug, getAllDataSlugs } from "@/lib/data";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/mdx-components";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { KeyStats, MythReality, Takeaway, Methods } from "@/components/data/DataBlocks";
import PathogenTable from "@/components/data/PathogenTable";
import { formatContentDate } from "@/lib/date";
import DataGuess from "@/components/data/DataGuess";
import VisualSummary from "@/components/content/VisualSummary";
import {
  AIAdoptionTrend,
  AttentionIntensityChart,
  GrowthStrategyMatrix,
  LandContributionChart,
  OutbreakReadinessChart,
  ResearchOpportunityMatrix,
  SurveillanceRankingChart,
} from "@/components/charts/IndustryEvidenceCharts";

const REPO = "https://github.com/prem-p-singh/prem-pratap-singh/tree/main";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDataSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getDataPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/data/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://www.prempsingh.com/data/${slug}`,
    },
  };
}

export default async function DataReportPage({ params }: Props) {
  const { slug } = await params;
  const post = getDataPostBySlug(slug);
  if (!post) notFound();

  const components = getMDXComponents({});
  const formattedDate = formatContentDate(post.date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const reportUrl = `https://www.prempsingh.com/data/${slug}`;
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: post.dataset || post.title,
    description: post.description,
    url: reportUrl,
    creator: {
      "@type": "Person",
      name: "Prem Pratap Singh",
      url: "https://www.prempsingh.com",
    },
    dateModified: post.date,
    isBasedOn: post.sourceLinks?.map((source) => source.url) || (post.sourceUrl ? [post.sourceUrl] : undefined),
    license: post.license,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prempsingh.com" },
      { "@type": "ListItem", position: 2, name: "Data", item: "https://www.prempsingh.com/data" },
      { "@type": "ListItem", position: 3, name: post.title, item: reportUrl },
    ],
  };

  return (
    <article className="min-h-screen pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        {/* The header sits on the page wash; only the cards below are opaque. */}
        <header className="pt-10 sm:pt-12 lg:pt-14">
          <Link
            href="/data"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Open Data, Decoded
          </Link>

          {/* On the bare page the tag text takes the -strong variant. */}
          {post.source && (
            <p className="mt-5 w-fit rounded-full border border-data/20 bg-data-wash px-3 py-1 text-xs font-semibold text-data-strong">
              {post.source}
            </p>
          )}

          <h1 className="mt-4 max-w-4xl text-4xl leading-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}

          {/* gap-px over the border colour draws the dividers between cells. */}
          <div className="paper-panel mt-8">
            <dl className="flex flex-wrap gap-px bg-border text-sm leading-normal">
              <div className="min-w-56 flex-1 bg-card px-5 py-4 sm:px-6">
                <dt className="font-semibold text-foreground">Published</dt>
                <dd className="mt-1 tabular-nums text-muted-foreground">
                  {formattedDate} · {post.readingTime}
                </dd>
              </div>
              {typeof post.records === "number" && (
                <div className="min-w-56 flex-1 bg-card px-5 py-4 sm:px-6">
                  <dt className="font-semibold text-foreground">Records analyzed</dt>
                  <dd className="mt-1 tabular-nums text-muted-foreground">{post.records.toLocaleString()}</dd>
                </div>
              )}
              {post.accessDate && (
                <div className="min-w-56 flex-1 bg-card px-5 py-4 sm:px-6">
                  <dt className="font-semibold text-foreground">Data accessed</dt>
                  <dd className="mt-1 tabular-nums text-muted-foreground">{post.accessDate}</dd>
                </div>
              )}
              {post.license && (
                <div className="min-w-56 flex-1 bg-card px-5 py-4 sm:px-6">
                  <dt className="font-semibold text-foreground">Data terms</dt>
                  <dd className="mt-1 text-muted-foreground">{post.license}</dd>
                </div>
              )}
            </dl>
          </div>

          {post.visualSummary && (
            <VisualSummary
              src={post.visualSummary}
              alt={`Illustrated visual summary of ${post.title}`}
              label="Report at a glance"
            />
          )}
        </header>

        <div className="paper-panel mt-5 p-6 sm:p-10">
          {post.keyStats && post.keyStats.length > 0 && (
            <KeyStats stats={post.keyStats} />
          )}

          <div className="prose text-base text-foreground">
            <MDXRemote
              source={post.content}
              components={{
                ...components,
                KeyStats,
                MythReality,
                Takeaway,
                Methods,
                PathogenTable,
                DataGuess,
                AIAdoptionTrend,
                AttentionIntensityChart,
                GrowthStrategyMatrix,
                LandContributionChart,
                OutbreakReadinessChart,
                ResearchOpportunityMatrix,
                SurveillanceRankingChart,
              }}
              options={{ mdxOptions: { remarkPlugins: [remarkMath, remarkGfm], rehypePlugins: [rehypeKatex] } }}
            />
          </div>
        </div>

        {post.methods && post.methods.length > 0 && (
          <Methods items={post.methods}>{post.methodsNote}</Methods>
        )}

        {/* Dataset provenance and reproducibility details */}
        <div className="paper-panel mt-5 p-6 sm:px-10 sm:py-8">
          <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
            Every figure on this page was produced by the linked code from the raw
            public data. Numbers reflect the data as accessed on the date shown and may
            change as the source is updated.
          </p>
          <dl className="mt-5 divide-y divide-border border-t border-border text-sm leading-normal">
            {post.dataset && (
              <div className="grid gap-x-4 gap-y-1 py-4 sm:grid-cols-[12rem_1fr]">
                <dt className="font-semibold text-foreground">Dataset</dt>
                <dd className="text-muted-foreground">{post.dataset}</dd>
              </div>
            )}
            <div className="grid gap-x-4 gap-y-1 py-4 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold text-foreground">Source</dt>
              <dd className="text-muted-foreground">
                {post.sourceLinks && post.sourceLinks.length > 0 ? (
                  <ul className="space-y-1">
                    {post.sourceLinks.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-data underline underline-offset-4">
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : post.sourceUrl ? (
                  <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-data underline underline-offset-4">
                    {post.source || post.sourceUrl}
                  </a>
                ) : (
                  post.source
                )}
              </dd>
            </div>
            {post.codePath && (
              <div className="grid gap-x-4 gap-y-1 py-4 last:pb-0 sm:grid-cols-[12rem_1fr]">
                <dt className="font-semibold text-foreground">Reproducible code</dt>
                <dd>
                  <a href={`${REPO}/${post.codePath}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-data underline underline-offset-4">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    View analysis code
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </article>
  );
}
