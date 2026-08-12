import Image from "next/image";

interface VisualSummaryProps {
  src: string;
  alt: string;
  label?: string;
}

export default function VisualSummary({
  src,
  alt,
  label = "Visual summary",
}: VisualSummaryProps) {
  return (
    <figure className="not-prose my-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the ${label.toLowerCase()} at full size`}
        className="block bg-white"
      >
        <Image
          src={src}
          alt={alt}
          width={1672}
          height={941}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
        />
      </a>
      <figcaption className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:px-5">
        <span>{label}</span>
        <span className="font-medium text-foreground">Open full size ↗</span>
      </figcaption>
    </figure>
  );
}
