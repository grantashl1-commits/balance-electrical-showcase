import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/lib/photos";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SplitReveal } from "@/components/motion/Reveal";

const SERVICES = [
  {
    title: "Lighting design",
    service: "Lighting design",
    img: photos.img0006,
    copy: "Layered schemes planned with your architect — scenes, circuits and fittings chosen before the first stud goes up.",
  },
  {
    title: "New builds",
    service: "New residential build",
    img: photos.twilight,
    copy: "Complete electrical fit-out from foundations to CCC, coordinated with every trade on site.",
  },
  {
    title: "Renovations",
    service: "Renovation or addition",
    img: photos.kitchen,
    copy: "New circuits, rewires and switchboards threaded carefully through the home you already love.",
  },
  {
    title: "Commercial",
    service: "Commercial fit-out",
    img: photos.img0003,
    copy: "Office and retail fit-outs, three-phase power, emergency lighting and compliance testing.",
  },
  {
    title: "Solar & battery",
    service: "Solar & battery storage",
    img: photos.sparrowhawkKinloch,
    copy: "Inverter wiring through to grid connection approval, with battery storage sized for Taupō winters.",
  },
  {
    title: "Air conditioning",
    service: "Air conditioning & heat pumps",
    img: photos.living,
    copy: "Heat pumps from all major brands — single rooms to multi-zone systems, supplied and commissioned.",
  },
  {
    title: "EV charging",
    service: "EV charging",
    img: photos.fountainEntry,
    copy: "Level 2 home chargers with load management, installed neatly and certified to NZ standards.",
  },
];

export function Circuits() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const track = q("[data-track]")[0] as HTMLElement;
      const cards = q("[data-card]");
      const counter = q("[data-counter]")[0];
      const bar = q("[data-progress]")[0];

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
          },
        });
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: tween,
            start: "left 72%",
            end: "right 28%",
            onToggle: (self) => {
              card.toggleAttribute("data-lit", self.isActive);
              if (self.isActive) counter.textContent = String(i + 1).padStart(2, "0");
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Small screens: native swipe; the card in view switches on.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(min-width: 768px)").matches) return;
    const track = el.querySelector("[data-track]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-lit", e.isIntersecting)),
      { root: track, threshold: 0.6 },
    );
    el.querySelectorAll("[data-card]").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} aria-labelledby="circuits-title" className="relative">
      <div data-pin className="flex min-h-[100svh] flex-col justify-center py-24 md:py-0">
        <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-8 px-5 md:px-10">
          <div>
            <p className="eyebrow text-ink-soft">What we do</p>
            <SplitReveal
              as="h2"
              id="circuits-title"
              className="display-caps mt-5 text-[clamp(2rem,4.2vw,4rem)] leading-[1] tracking-[0.1em]"
            >
              Seven circuits. One standard.
            </SplitReveal>
          </div>
          <p className="eyebrow hidden shrink-0 text-ink-soft md:block">
            <span data-counter className="text-ink">
              01
            </span>{" "}
            / {String(SERVICES.length).padStart(2, "0")}
          </p>
        </div>

        <div
          data-track
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mt-12 md:snap-none md:gap-8 md:overflow-visible md:pl-[max(40px,calc((100vw-1440px)/2+40px))] md:pr-[12vw]"
        >
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              data-card
              className="group relative w-[78vw] shrink-0 snap-center sm:w-[46vw] md:w-[min(30vw,420px,calc((100svh-440px)*0.8))] md:min-w-[260px]"
            >
              <div className="flex items-center justify-between text-ink-soft">
                <span className="eyebrow text-[10px]">Ch {String(i + 1).padStart(2, "0")}</span>
                <span className="size-1.5 rounded-full bg-ink/30 transition-all duration-500 group-data-[lit]:bg-glow-soft group-data-[lit]:shadow-[0_0_10px_3px_rgb(255_231_194/0.9)]" />
              </div>
              <div className="relative mt-4 aspect-[4/5] overflow-hidden border-[6px] border-frame bg-frame">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-[filter,transform] duration-[1400ms] [filter:brightness(0.38)_saturate(0.45)] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:[filter:brightness(1)_saturate(1)] group-data-[lit]:[filter:brightness(1)_saturate(1)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-2/3 opacity-0 transition-opacity duration-[1400ms] group-hover:opacity-100 group-data-[lit]:opacity-100"
                  style={{
                    background:
                      "radial-gradient(45% 60% at 50% 0%, rgb(255 236 206 / 0.4), transparent 75%)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>
              <h3 className="display-caps mt-6 text-[1.55rem] tracking-[0.14em]">{s.title}</h3>
              <p className="mt-3 max-w-[36ch] text-[0.98rem] leading-relaxed text-ink-soft">
                {s.copy}
              </p>
              <Link
                to="/contact"
                search={{ service: s.service }}
                className="beam-link eyebrow mt-5 inline-flex items-center gap-2 text-[10px]"
              >
                Enquire <ArrowUpRight className="size-3" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 hidden w-full max-w-[1440px] px-10 md:block">
          <div className="relative h-px bg-ink/15">
            <div
              data-progress
              className="absolute inset-0 origin-left bg-ink"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
