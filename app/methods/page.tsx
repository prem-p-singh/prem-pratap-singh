import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllMethodPosts } from "@/lib/methods";

export const metadata: Metadata = {
  title: "Methods That Travel",
  description:
    "Statistical models built for my own research, then re-applied to public data to show the method holds outside the study it was written for. Problem, method, answer, and the code behind each one.",
  alternates: { canonical: "/methods" },
};

export default function MethodsPage() {
  const posts = getAllMethodPosts();

  return (
    <div className="pt-16 min-h-screen">
      <section className="pt-16 pb-10 bg-gradient-to-b from-muted to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Methods That Travel
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Methods built for one problem, tested on another
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each case study starts with a statistical method I built for my own
              research: the problem it had to solve, how it works in plain terms, and
              what it answered. Then I point the same method at public data from a
              different field, to see whether it still holds up.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/methods/${post.slug}`}
                  className="group flex flex-col bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10" />
                    )}
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    {post.method && (
                      <span className="inline-flex self-start px-2 py-0.5 mb-2 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-primary/10 text-primary">
                        {post.method}
                      </span>
                    )}
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                        {post.description}
                      </p>
                    )}
                    {(post.origin || post.reappliedTo) && (
                      <p className="mt-4 text-xs text-muted-foreground">
                        {post.origin && (
                          <>
                            <span className="text-foreground/70">Built for:</span> {post.origin}
                          </>
                        )}
                        {post.origin && post.reappliedTo && <span className="mx-2">·</span>}
                        {post.reappliedTo && (
                          <>
                            <span className="text-foreground/70">Re-applied to:</span> {post.reappliedTo}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Case studies coming soon
              </h2>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
