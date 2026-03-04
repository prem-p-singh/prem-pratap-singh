"use client";

import React from "react";
import { MovingBorder } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

export function ShinyCard({
  children,
  className,
  borderRadius = "0.75rem",
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
      {/* Animated glowing border */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--foreground)_40%,transparent_60%)]" />
        </MovingBorder>
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative bg-[var(--background)] border border-[var(--border)] backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}
