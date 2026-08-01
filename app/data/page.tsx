import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllDataPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Open Data, Decoded",
  description:
    "Public datasets in plant science, read honestly. Reproducible analyses that turn raw open data into clear, defensible interpretation, with the code behind every figure.",
  alternates: { canonical: "/data" },
};

export default function DataPage() {
  const posts = getAllDataPosts();

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-10 bg-gradient-to-b from-muted to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Open Data, Decoded
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Public data, read honestly
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A lot of useful data in plant science sits in public databases, raw and
              rarely interpreted. Each piece here takes one open dataset and turns it
              into a clear, defensible reading, separating what the data shows from what
              it does not. Every figure is reproducible, with the code linked.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                return (
                  <Link
                    key={post.slug}
                    href={`/data/${post.slug}`}
                    className="group flex flex-col bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10" />
                      )}
                    </div>
                    <div className="flex flex-col flex-grow p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                        <time dateTime={post.date}>{formattedDate}</time>
                        {post.source && (
                          <>
                            <span>·</span>
                            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">
                              {post.source}
                            </span>
                          </>
                        )}
                        {typeof post.records === "number" && (
                          <>
                            <span>·</span>
                            <span>{post.records.toLocaleString()} records</span>
                          </>
                        )}
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                          {post.description}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read the analysis
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                First analyses coming soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Reproducible reads of public plant-science datasets are on the way.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
