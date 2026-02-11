"use client";

import type { TimelineItem } from "@/components/Timeline";

export default function EducationTimeline({ items }: { items: TimelineItem[] }) {
  // Display oldest to newest (left to right)
  const sorted = [...items].sort((a, b) => {
    const yearA = parseInt(a.startDate);
    const yearB = parseInt(b.startDate);
    return yearA - yearB;
  });

  return (
    <div className="edu-timeline-wrapper">
      {/* Horizontal timeline */}
      <div className="edu-timeline">
        {/* Connecting line */}
        <div className="edu-timeline-line" />

        {sorted.map((edu, index) => (
          <div key={index} className="edu-timeline-item group">
            {/* Date badge on top */}
            <div className="edu-timeline-date">
              {edu.startDate} — {edu.endDate}
            </div>

            {/* Node on the line */}
            <div className="edu-timeline-node group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>

            {/* Card below the line */}
            <div className="edu-timeline-card">
              {/* Date shown inside card on mobile only */}
              <p className="md:hidden text-xs font-semibold text-primary mb-2">
                {edu.startDate} — {edu.endDate}
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 leading-snug group-hover:text-primary transition-colors">
                {edu.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">{edu.organization}</p>
              {edu.location && (
                <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {edu.location}
                </p>
              )}
              {edu.description && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
