import type { MDXComponents } from "mdx/types";

// Article typography lives in the .prose rules in app/globals.css. Only the
// elements that need different markup, not different styling, are mapped here.
export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children }) => {
      const safeHref = href && /^(https?:\/\/|\/|#|mailto:)/.test(href) ? href : "#";
      const isExternal = safeHref.startsWith("http");
      return (
        <a
          href={safeHref}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    // Tables come from remark-gfm. Wrapped so wide tables scroll inside their
    // own box instead of forcing the page to scroll sideways.
    table: ({ children }) => (
      <div className="prose-table">
        <table>{children}</table>
      </div>
    ),
    ...components,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
