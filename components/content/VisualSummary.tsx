import Image from "next/image";
import { ExternalLink } from "lucide-react";

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
    <figure className="paper-panel not-prose mt-5">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the ${label.toLowerCase()} at full size`}
        className="block bg-card"
      >
        <Image
          src={src}
          alt={alt}
          width={1672}
          height={941}
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="h-auto w-full"
        />
      </a>
      <figcaption className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:px-5">
        <span>{label}</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
          Open full size <ExternalLink className="size-4" strokeWidth={1.7} aria-hidden="true" />
        </span>
      </figcaption>
    </figure>
  );
}
