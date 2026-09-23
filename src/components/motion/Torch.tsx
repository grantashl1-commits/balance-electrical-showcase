import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * A dim room you explore with a torch: a layer of darkness with a soft hole
 * that follows the pointer. On touch (or reduced motion) the darkness is
 * dropped and each `[data-shot]` child gets `data-lit` as it scrolls into view.
 */
export function TorchArea({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const dark = el?.querySelector<HTMLElement>(":scope > [data-dark]");
    if (!el || !dark) return;

    if (!isFinePointer() || prefersReducedMotion()) {
      dark.style.display = "none";
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.target.toggleAttribute("data-lit", e.isIntersecting)),
        { threshold: 0.55 },
      );
      el.querySelectorAll("[data-shot]").forEach((s) => io.observe(s));
      return () => io.disconnect();
    }

    const setX = gsap.quickTo(dark, "--tx", { duration: 0.7, ease: "power3.out" });
    const setY = gsap.quickTo(dark, "--ty", { duration: 0.7, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setX(e.clientX - r.left);
      setY(e.clientY - r.top);
    };
    const onEnter = () => gsap.to(dark, { "--tr": 340, duration: 1.1, ease: "expo.out" });
    const onLeave = () => gsap.to(dark, { "--tr": 0, duration: 0.8, ease: "power2.inOut" });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
      <div
        data-dark
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          ["--tx" as string]: 0,
          ["--ty" as string]: 0,
          ["--tr" as string]: 0,
          // Beyond the circle the last stop extends, so the rest of the room stays dim.
          background:
            "radial-gradient(circle calc(var(--tr) * 1px + 1px) at calc(var(--tx) * 1px) calc(var(--ty) * 1px), transparent 0%, rgb(18 18 17 / 0.3) 55%, rgb(18 18 17 / 0.62) 100%)",
        }}
      />
    </div>
  );
}
