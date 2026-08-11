import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllMethodPosts } from "@/lib/methods";

export const metadata: Metadata = {
  title: "Methods That Travel",
  description:
    "Interactive statistical methods tested across crop research and public data.",
  alternates: { canonical: "/methods" },
};

export default function MethodsPage() {
  const posts = getAllMethodPosts();

  return (
    <div className="pt-16 min-h-screen">
      <section className="bg-gradient-to-b from-muted to-background pb-8 pt-14 sm:pb-10 sm:pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Methods
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Methods, made visible.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              One model · two datasets · interactive results
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
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
                      <span className="inline-flex self-start px-2 py-0.5 mb-2 text-xs font-semibold uppercase tracking-wider rounded-md bg-primary/10 text-primary">
                        {post.method}
                      </span>
                    )}
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    {(post.origin || post.reappliedTo) && (
                      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-border pt-4">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Built in</p>
                          <p className="mt-1 truncate text-xs font-medium text-foreground">{post.origin || "Original study"}</p>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground/50" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">Re-tested on</p>
                          <p className="mt-1 truncate text-xs font-medium text-foreground">{post.reappliedTo || "Public data"}</p>
                        </div>
                      </div>
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
