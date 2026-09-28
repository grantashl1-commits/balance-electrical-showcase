import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { photos } from "@/lib/photos";
import { Button } from "@/components/ui/button";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Reveal, SplitReveal } from "@/components/motion/Reveal";

const STATS = [
  { value: "1", label: "set of hands on every job" },
  { value: "EWRB", label: "registered & licensed" },
  { value: "Gold", label: "2025 House of the Year home" },
];

export function Victoria() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      // A spotlight opening on the portrait, like an iris.
      gsap.fromTo(
        q("[data-portrait]"),
        { clipPath: "circle(9% at 50% 36%)", scale: 1.18 },
        {
          clipPath: "circle(100% at 50% 36%)",
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "center 55%", scrub: 0.6 },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44"
      aria-labelledby="victoria-title"
    >
      <div className="grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border-[6px] border-frame bg-frame md:border-[10px]">
            <img
              data-portrait
              src={photos.victoria}
              alt="Victoria Grant, owner and registered electrician at Balance Electrical"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 55% at 30% 0%, rgb(255 236 206 / 0.35), transparent 70%)",
                mixBlendMode: "soft-light",
              }}
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-ink-soft">Owner-operator · Registered electrician</p>
          <SplitReveal
            as="h2"
            id="victoria-title"
            className="display-caps mt-5 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1] tracking-[0.1em]"
          >
            Meet Victoria
          </SplitReveal>
          <Reveal>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              Balance Electrical is led — and run — by Victoria Grant. Raised in Taupō, trained in
              Wellington, back home to build something of her own. From a Gold Award-winning lake
              home to a commercial headquarters, every quote, every visit and every cable run passes
              through one set of hands. That's why clients return, and why the finishes are quiet.
            </p>
          </Reveal>
          <Reveal
            stagger={0.1}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/15 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-none">{s.value}</p>
                <p className="eyebrow mt-3 text-[10px] leading-relaxed text-ink-soft">{s.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-12">
            <Button asChild variant="luxOutline" size="xl">
              <Link to="/about">
                Read her story <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
