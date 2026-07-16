"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export const REALSCOUT_SCRIPT_SRC =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

/**
 * Loads RealScout once, after the page is idle — keeps the ~629KB UMD
 * off the LCP critical path (mobile PageSpeed).
 */
export function RealScoutScript() {
  return <Script src={REALSCOUT_SCRIPT_SRC} strategy="lazyOnload" />;
}

type DeferredRealScoutWidgetProps = {
  /** Raw custom-element markup for RealScout */
  html: string;
  /** Reserved height so deferred mount does not cause CLS */
  minHeight: string;
  className?: string;
  /** Extra rootMargin so widgets warm up just before scroll */
  rootMargin?: string;
};

/**
 * Mounts RealScout widget HTML only when near the viewport, then loads the script.
 */
export default function DeferredRealScoutWidget({
  html,
  minHeight,
  className = "",
  rootMargin = "240px",
}: DeferredRealScoutWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight }}
      data-realscout-deferred={active ? "ready" : "pending"}
    >
      {active ? (
        <>
          <RealScoutScript />
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </>
      ) : (
        <div
          className="h-full w-full animate-pulse rounded-lg bg-slate-200/70"
          style={{ minHeight }}
          aria-hidden
        />
      )}
    </div>
  );
}
