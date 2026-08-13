"use client";

import { useEffect } from "react";

const DESKTOP_POINTER_QUERY = "(min-width: 1024px) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const GESTURE_RESET_MS = 180;
const GESTURE_THRESHOLD = 52;
const SETTLE_MS = 620;
const EDGE_TOLERANCE = 8;

function getScrollOffset() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--guided-scroll-offset")
    .trim();
  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed)) return 80;
  return value.endsWith("rem")
    ? parsed * Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    : parsed;
}

function hasScrollableAncestor(target: EventTarget | null, direction: 1 | -1) {
  let element = target instanceof Element ? target : null;

  while (element && element !== document.documentElement) {
    const style = getComputedStyle(element);
    const scrollable = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1;

    if (scrollable) {
      const canMoveDown = element.scrollTop + element.clientHeight < element.scrollHeight - 1;
      const canMoveUp = element.scrollTop > 1;
      if ((direction === 1 && canMoveDown) || (direction === -1 && canMoveUp)) return true;
    }

    element = element.parentElement;
  }

  return false;
}

function shouldKeepNativeScroll(target: EventTarget | null, direction: 1 | -1) {
  if (!(target instanceof Element)) return false;

  if (
    target.closest(
      "details[open], dialog, iframe, video, textarea, select, [role='menu'], [data-guided-scroll-ignore]"
    )
  ) {
    return true;
  }

  return hasScrollableAncestor(target, direction);
}

function updateSectionHash(section: HTMLElement) {
  const url = new URL(window.location.href);
  url.hash = section.id && section.id !== "intro" ? section.id : "";
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}

export default function GuidedSectionScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const desktopPointer = window.matchMedia(DESKTOP_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let gestureAmount = 0;
    let gestureDirection: 1 | -1 | 0 = 0;
    let lastGestureAt = 0;
    let settling = false;
    let settleTimer = 0;

    root.classList.add("guided-scroll-page");

    const resetGesture = () => {
      gestureAmount = 0;
      gestureDirection = 0;
    };

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-guided-scroll-section]"));

    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        reducedMotion.matches ||
        !desktopPointer.matches ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      ) {
        return;
      }

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;

      if (shouldKeepNativeScroll(event.target, direction)) {
        resetGesture();
        return;
      }

      if (settling) {
        event.preventDefault();
        return;
      }

      const sections = getSections();
      if (sections.length < 2) return;

      const offset = getScrollOffset();
      const scrollY = window.scrollY;
      const alignedY = scrollY + offset + EDGE_TOLERANCE;
      let currentIndex = 0;

      for (let index = 0; index < sections.length; index += 1) {
        const top = sections[index].getBoundingClientRect().top + scrollY;
        if (top <= alignedY) currentIndex = index;
        else break;
      }

      const current = sections[currentIndex];
      const currentTop = current.getBoundingClientRect().top + scrollY;
      const currentStart = Math.max(0, currentTop - offset);
      const currentEnd = Math.max(
        currentStart,
        currentTop + current.offsetHeight - window.innerHeight + EDGE_TOLERANCE
      );

      // Tall chapters keep ordinary scrolling until their content edge is reached.
      if (
        (direction === 1 && scrollY < currentEnd - EDGE_TOLERANCE) ||
        (direction === -1 && scrollY > currentStart + EDGE_TOLERANCE)
      ) {
        resetGesture();
        return;
      }

      const targetIndex = currentIndex + direction;
      if (targetIndex < 0 || targetIndex >= sections.length) {
        resetGesture();
        return;
      }

      event.preventDefault();

      const now = performance.now();
      if (gestureDirection !== direction || now - lastGestureAt > GESTURE_RESET_MS) {
        gestureAmount = 0;
      }
      gestureDirection = direction;
      lastGestureAt = now;

      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      gestureAmount += Math.abs(event.deltaY) * multiplier;
      if (gestureAmount < GESTURE_THRESHOLD) return;

      const targetSection = sections[targetIndex];
      const targetTop = targetSection.getBoundingClientRect().top + scrollY;
      settling = true;
      resetGesture();
      window.scrollTo({ top: Math.max(0, targetTop - offset), behavior: "smooth" });

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        settling = false;
        updateSectionHash(targetSection);
      }, SETTLE_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      root.classList.remove("guided-scroll-page");
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return null;
}
