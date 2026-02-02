import Link from "next/link";
import type { BlogPostMeta } from "@/lib/mdx";

interface BlogPostCardProps {
  post: BlogPostMeta;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="py-4 border-b border-border last:border-0 group-hover:border-transparent transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
          <h3 className="text-base font-medium text-foreground group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <time
            dateTime={post.date}
            className="text-sm text-muted-foreground shrink-0"
          >
            {formattedDate}
          </time>
        </div>
        {post.description && (
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}
