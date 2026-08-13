"use client";

import React from "react";
import { MovingBorder } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

export function ShinyCard({
  children,
  className,
  borderRadius = "1.5rem",
  duration = 6000,
  as: Component = "div",
  ...otherProps
}: {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
  as?: any;
  [key: string]: any;
}) {
  return (
    <Component
      className="relative bg-transparent p-[1px] overflow-hidden"
      style={{ borderRadius }}
      {...otherProps}
    >
      {/* The same quiet travelling highlight used by primary actions. */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className="h-16 w-16 opacity-60 bg-[radial-gradient(var(--field)_32%,transparent_65%)]" />
        </MovingBorder>
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative overflow-hidden bg-[var(--card)] border border-[var(--border)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_4%,transparent),0_12px_35px_-32px_color-mix(in_srgb,var(--foreground)_30%,transparent)]",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <span
          className="pointer-events-none absolute -right-px -top-px h-[42%] min-h-6 w-1/4 min-w-14 border-r border-t border-[var(--field)] opacity-90"
          style={{ borderTopRightRadius: `calc(${borderRadius} * 0.96)` }}
          aria-hidden="true"
        />
        <div className="relative z-10">{children}</div>
      </div>
    </Component>
  );
}
