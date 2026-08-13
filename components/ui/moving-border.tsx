"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "group bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--field)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        containerClassName
      )}
      style={{ borderRadius: borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-80 bg-[radial-gradient(var(--field)_38%,transparent_65%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative overflow-hidden bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] flex items-center justify-center w-full h-full text-sm antialiased shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_4%,transparent),0_12px_35px_-32px_color-mix(in_srgb,var(--foreground)_30%,transparent)] transition-[border-color,color,box-shadow] group-hover:border-[color-mix(in_srgb,var(--field)_58%,var(--border))] group-hover:text-[var(--field)] group-hover:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_5%,transparent),0_16px_34px_-28px_color-mix(in_srgb,var(--field)_55%,transparent)]",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <span
          className="pointer-events-none absolute -right-px -top-px h-[42%] min-h-6 w-1/4 min-w-14 border-r border-t border-[var(--field)] opacity-90"
          style={{ borderTopRightRadius: `calc(${borderRadius} * 0.96)` }}
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const reduceMotion = useReducedMotion();
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    if (reduceMotion) return;
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    try {
      return pathRef.current?.getPointAtLength(val)?.x ?? 0;
    } catch {
      return 0;
    }
  });
  const y = useTransform(progress, (val) => {
    try {
      return pathRef.current?.getPointAtLength(val)?.y ?? 0;
    } catch {
      return 0;
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
