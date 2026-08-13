import Image from "next/image";

const videos = [
  {
    title: "Method overview",
    duration: "1:16",
    src: "/methods/causal-mediation/causal-mediation-overview.mp4",
    description:
      "A visual introduction to causal mediation. One response is separated into a direct path and an indirect path that travels through a mediator, using the vineyard heat-virus-gene question and the crop land-production comparison.",
  },
  {
    title: "Splitting a trend",
    duration: "1:23",
    src: "/methods/causal-mediation/how-causal-mediation-splits-a-trend.mp4",
    description:
      "A step-by-step visual explanation of the signal split, the roles of the starting variable, mediator, and response, and why bootstrap uncertainty and causal caution are necessary when interpreting the result.",
  },
];

export function MethodVisualSummary() {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <a
          href="/methods/causal-mediation/causal-mediation-visual-guide.jpg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the causal mediation visual guide at full size"
          className="block bg-white"
        >
          <Image
            src="/methods/causal-mediation/causal-mediation-visual-guide.jpg"
            alt="Illustrated guide showing how causal mediation separates a response into direct and mediator-driven paths"
            width={2752}
            height={1536}
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
          />
        </a>
        <figcaption className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:px-5">
          <span>One-page visual summary</span>
          <span className="font-medium text-foreground">Open full size ↗</span>
        </figcaption>
    </figure>
  );
}

export function MethodVideos() {
  return (
    <section className="not-prose my-12" aria-labelledby="method-videos-title">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Watch the method
          </p>
          <h2
            id="method-videos-title"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground"
          >
            See the signal split
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">Two short videos</p>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {videos.map((video) => (
          <figure
            key={video.src}
            className="rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4"
          >
            <video
              controls
              playsInline
              preload="none"
              aria-label={video.title}
              className="mx-auto aspect-[9/16] w-full max-w-72 rounded-xl bg-black object-contain"
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <figcaption className="mt-3 flex items-center justify-between gap-3 px-1 text-sm">
              <span className="font-semibold text-foreground">{video.title}</span>
              <span className="tabular-nums text-muted-foreground">{video.duration}</span>
            </figcaption>
            <details className="mt-3 border-t border-border px-1 pt-3 text-sm">
              <summary className="cursor-pointer font-semibold text-foreground">Text alternative</summary>
              <p className="mt-2 leading-relaxed text-muted-foreground">{video.description}</p>
            </details>
          </figure>
        ))}
      </div>
    </section>
  );
}
