"use client";

import { useState } from "react";
import type { Publication } from "@/components/PublicationCard";

const INITIAL_COUNT = 6;

export default function PublicationsList({ publications }: { publications: Publication[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? publications : publications.slice(0, INITIAL_COUNT);

  return (
    <>
      <div className="space-y-6">
        {displayed.map((pub, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 border border-border card-hover"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {pub.authors.join(", ")}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-primary font-medium">{pub.venue}</span>
                  <span className="text-sm text-muted-foreground">({pub.year})</span>
                  {pub.links?.paper && pub.links.paper !== "#" && (
                    <a
                      href={pub.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Paper
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {publications.length > INITIAL_COUNT && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-outline inline-flex items-center gap-2"
          >
            {showAll ? (
              <>
                Show Less
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Show More ({publications.length - INITIAL_COUNT} more)
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
