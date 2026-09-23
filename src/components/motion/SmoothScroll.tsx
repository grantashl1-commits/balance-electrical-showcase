import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { LenisContext } from "@/hooks/use-lenis";

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger scenes stay
 * frame-locked. Skipped entirely for reduced-motion users (native scroll).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Keep ScrollTrigger measurements honest as images load and sections mount.
  useEffect(() => {
    let last = document.body.scrollHeight;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - last) < 2) return;
      last = h;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 180);
    });
    ro.observe(document.body);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  // New route: let the router restore scroll, then re-measure everything.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
