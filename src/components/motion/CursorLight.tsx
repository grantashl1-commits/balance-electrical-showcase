import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * The cursor carries a soft pool of 2700K light across the stone, like a
 * torch on a textured wall. Elements with `data-cursor="Label"` show a
 * small caption beside the pointer. Fine pointers only; native cursor stays.
 *
 * Each light layer is its own fixed element so its blend mode reaches the page
 * (a blended child inside a z-indexed wrapper would only blend with the wrapper).
 */
export function CursorLight() {
  const washRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const wash = washRef.current;
    const core = coreRef.current;
    const label = labelRef.current;
    if (!wash || !core || !label) return;

    const lights = [wash, core];
    const wx = gsap.quickTo(lights, "x", { duration: 0.9, ease: "power3.out" });
    const wy = gsap.quickTo(lights, "y", { duration: 0.9, ease: "power3.out" });
    const lx = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3.out" });
    const ly = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3.out" });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([...lights, label], { x: e.clientX, y: e.clientY });
        gsap.to(lights, { autoAlpha: 1, duration: 1.2 });
      }
      wx(e.clientX);
      wy(e.clientY);
      lx(e.clientX);
      ly(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const text = target?.dataset.cursor;
      if (text) {
        label.textContent = text;
        gsap.to(label, { autoAlpha: 1, scale: 1, duration: 0.4 });
        gsap.to(lights, { scale: 1.3, duration: 0.8 });
      } else {
        gsap.to(label, { autoAlpha: 0, scale: 0.6, duration: 0.3 });
        gsap.to(lights, { scale: 1, duration: 0.8 });
      }
    };
    const onLeave = () => {
      shown = false;
      gsap.to([...lights, label], { autoAlpha: 0, duration: 0.5 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const layer =
    "pointer-events-none invisible fixed left-0 top-0 z-[80] hidden rounded-full opacity-0 [@media(hover:hover)]:block";

  return (
    <>
      <div
        ref={washRef}
        aria-hidden
        className={`${layer} size-[760px]`}
        style={{
          marginLeft: -380,
          marginTop: -380,
          mixBlendMode: "soft-light",
          background:
            "radial-gradient(closest-side, rgb(255 238 212 / 0.6), rgb(255 226 186 / 0.18) 45%, transparent 72%)",
        }}
      />
      <div
        ref={coreRef}
        aria-hidden
        className={`${layer} size-[420px]`}
        style={{
          marginLeft: -210,
          marginTop: -210,
          mixBlendMode: "screen",
          background:
            "radial-gradient(closest-side, rgb(255 228 190 / 0.14), rgb(255 228 190 / 0.05) 50%, transparent)",
        }}
      />
      <div
        ref={labelRef}
        aria-hidden
        className="eyebrow pointer-events-none invisible fixed left-0 top-0 z-[81] hidden whitespace-nowrap rounded-full bg-frame/90 px-3.5 py-1.5 text-[10px] text-stone-pale opacity-0 shadow-[0_0_30px_rgb(242_200_139/0.35)] backdrop-blur-sm [@media(hover:hover)]:block"
        style={{ marginLeft: 20, marginTop: 20 }}
      />
    </>
  );
}
