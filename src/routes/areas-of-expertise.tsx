import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Reveal, SplitReveal } from "@/components/motion/Reveal";
import { photos } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { useLenis } from "@/hooks/use-lenis";

export const Route = createFileRoute("/areas-of-expertise")({
  head: () => ({
    meta: [
      {
        title:
          "Electrical Services Taupō | Solar, New Builds, Renovations, EV Chargers | Balance Electrical",
      },
      {
        name: "description",
        content:
          "Registered electrical services in Taupō — new builds, renovations, solar & battery storage, heat pump installation, EV chargers, and commercial fit-outs. Balance Electrical, Victoria Grant.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "NZ-WKO" },
      { name: "geo.placename", content: "Taupo" },
      {
        name: "keywords",
        content:
          "solar panel installation Taupo, solar electrician Taupo, battery storage Taupo, EV charger Taupo, registered electrician Taupo",
      },
      { property: "og:title", content: "Areas of Expertise — Balance Electrical" },
      {
        property: "og:description",
        content: "Registered electrical services across Taupō and the surrounding district.",
      },
      { property: "og:image", content: photos.kitchen },
    ],
    links: [{ rel: "canonical", href: "https://www.balanceelectrical.co.nz/areas-of-expertise" }],
  }),
  component: AreasOfExpertise,
});

type Area = {
  num: string;
  heading: string;
  service: string;
  bg: string;
  intro: string;
  bullets: string[];
  closing?: string;
};

const sections: Area[] = [
  {
    num: "01",
    heading: "Residential",
    service: "Renovation or addition",
    bg: photos.img0004,
    intro:
      "Whether you're building new or upgrading an existing home, getting your electrical work done by a registered electrician isn't just about quality — it's a legal requirement in New Zealand. Balance Electrical handles the full scope of residential electrical work.",
    bullets: [
      "New build electrical fit-out — full installation from foundations to CCC",
      "Renovation wiring — additional circuits, partial rewires, room additions",
      "Switchboard upgrades — safety switches, modern distribution boards",
      "Lighting design and installation — interior, exterior, and garden lighting",
      "Network and data cabling — home offices and media rooms",
      "Air conditioning and heat pump installation",
      "General maintenance, fault finding, and repairs",
    ],
  },
  {
    num: "02",
    heading: "Commercial",
    service: "Commercial fit-out",
    bg: photos.img0004b,
    intro:
      "Whether you're tenanting, refurbishing, or upgrading, you can rely on Balance Electrical for all of your commercial electrical needs. We work with businesses, property managers, and developers across the Taupō district.",
    bullets: [
      "New office and retail fit-outs",
      "Warehouse and factory electrical installations",
      "3-phase power installations",
      "Commercial switchboard maintenance and upgrades",
      "Exit and emergency lighting — supply, install, and compliance testing",
      "Emergency breakdown and fault finding",
      "Data and voice cabling installations",
    ],
  },
  {
    num: "03",
    heading: "Air conditioning & heat pumps",
    service: "Air conditioning & heat pumps",
    bg: photos.living,
    intro:
      "Victoria is an experienced heat pump installer working with all major brands. Whether you need a single room unit or a multi-zone system for a larger home or commercial space, Balance Electrical handles supply, installation, and commissioning.",
    bullets: [
      "Residential heat pump installation",
      "Commercial multi-zone systems",
      "Heat pump servicing and maintenance",
      "All major brands supplied and installed",
    ],
  },
  {
    num: "04",
    heading: "EV charger installation",
    service: "EV charging",
    bg: photos.twilight,
    intro:
      "EV ownership is growing fast across New Zealand and the Taupō district. A dedicated home EV charger installed by a registered electrician means faster charging, safer wiring, and a future-proofed install that meets current standards.",
    bullets: [
      "Level 2 home EV charger installation",
      "Commercial charging points for businesses and rental properties",
      "Load management assessment",
      "All work certified and compliant with NZ electrical standards",
    ],
  },
  {
    num: "05",
    heading: "Maintenance & repairs",
    service: "Something else",
    bg: photos.img0003,
    intro:
      "Need something fixed? Balance Electrical handles all general residential and commercial electrical maintenance and repairs across Taupō.",
    bullets: [
      "Fault finding and diagnosis",
      "Safety switch installation and testing",
      "Landlord electrical inspections",
      "Power point and lighting additions",
      "General repairs and callouts",
    ],
  },
  {
    num: "06",
    heading: "New builds",
    service: "New residential build",
    bg: photos.fountainEntry,
    intro:
      "Balance Electrical works alongside builders, architects, and project managers to deliver the complete electrical fit-out for new residential builds — from first fix foundations through to final inspection and CCC.",
    bullets: [
      "Full new build electrical design and installation",
      "First and second fix wiring",
      "Switchboard design and installation",
      "Exterior and landscape lighting",
      "Smart home pre-wiring and automation-ready installations",
      "Coordination with all other trades throughout the build",
    ],
  },
  {
    num: "07",
    heading: "Solar & battery storage",
    service: "Solar & battery storage",
    bg: photos.sparrowhawkKinloch,
    intro:
      "Solar power is one of the smartest investments a Taupō homeowner can make — and getting it installed correctly from the start determines how well it performs for the next 25 years. As a registered electrician, Victoria handles the full electrical scope of your solar installation from inverter wiring through to grid connection approval.",
    bullets: [
      "Residential solar panel system wiring and installation",
      "Battery storage system installation — Powerwall and compatible systems",
      "Grid connection and meter upgrades",
      "Solar and EV charger combined installations",
      "Switchboard upgrades for solar-ready homes",
      "Existing system inspections and fault finding",
      "New build solar pre-wiring",
    ],
    closing:
      "Victoria works alongside your solar panel supplier or can recommend trusted local suppliers. The electrical installation, grid connection approval, and sign-off is handled entirely by Balance Electrical.",
  },
];

function AreasOfExpertise() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // The section crossing the middle of the viewport owns the sticky frame.
  useEffect(() => {
    const els = listRef.current?.querySelectorAll<HTMLElement>("[data-area]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.area));
        }),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => {
    const el = document.getElementById(`area-${sections[i].num}`);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -120, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <p className="eyebrow text-ink-soft">What we do</p>
        <SplitReveal
          as="h1"
          immediate
          delay={0.2}
          className="display-caps mt-6 text-[clamp(2.8rem,8.6vw,8.4rem)] leading-[0.95] tracking-[0.08em]"
        >
          Areas of expertise.
        </SplitReveal>
        <Reveal delay={0.5} className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink-soft md:col-span-6">
            Registered electrical services across Taupō and the surrounding district — seven
            circuits, one standard of work.
          </p>
          <div className="flex flex-wrap gap-2 md:col-span-6 md:justify-end">
            {sections.map((s, i) => (
              <button
                key={s.num}
                type="button"
                onClick={() => jump(i)}
                className="eyebrow h-10 rounded-full border border-ink/20 px-4 text-[10px] transition-colors hover:border-ink hover:bg-ink hover:text-stone-pale"
              >
                {s.num}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* sticky frame: one photograph per circuit, switching on in turn */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[104px] flex h-[calc(100svh-140px)] gap-6">
              <ol className="flex flex-col justify-center gap-4" aria-label="Circuits">
                {sections.map((s, i) => (
                  <li key={s.num}>
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      className={cn(
                        "eyebrow flex items-center gap-3 text-[10px] transition-opacity duration-500",
                        active === i ? "opacity-100" : "opacity-40 hover:opacity-80",
                      )}
                      aria-current={active === i ? "true" : undefined}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full transition-all duration-500",
                          active === i
                            ? "bg-glow-soft shadow-[0_0_10px_3px_rgb(255_231_194/0.9)]"
                            : "bg-ink/40",
                        )}
                      />
                      {s.num}
                    </button>
                  </li>
                ))}
              </ol>
              <div className="relative flex-1 overflow-hidden border-[10px] border-frame bg-frame">
                {sections.map((s, i) => (
                  <img
                    key={s.num}
                    src={s.bg}
                    alt=""
                    aria-hidden
                    loading={i < 2 ? "eager" : "lazy"}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-[opacity,filter,transform] duration-[1200ms] [transition-timing-function:var(--ease-out-expo)]",
                      active === i
                        ? "scale-100 opacity-100 [filter:brightness(1)]"
                        : "scale-[1.06] opacity-0 [filter:brightness(0.3)]",
                    )}
                  />
                ))}
                {/* a sweep of light each time the circuit changes */}
                <div
                  key={active}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 animate-[sweep_1.4s_var(--ease-out-expo)_both]"
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 35%, rgb(255 236 206 / 0.35) 50%, transparent 65%)",
                    mixBlendMode: "screen",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-6 text-ivory">
                  <p className="display-caps text-xl tracking-[0.14em]">
                    {sections[active].heading}
                  </p>
                  <p className="font-display text-3xl">{sections[active].num}</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={listRef} className="lg:col-span-6">
            {sections.map((s, i) => (
              <article
                key={s.num}
                id={`area-${s.num}`}
                data-area={i}
                className="scroll-mt-28 border-t border-ink/15 py-16 first:border-t-0 first:pt-0 md:py-24 lg:min-h-[80svh]"
              >
                <div className="relative mb-10 aspect-[4/3] overflow-hidden border-[6px] border-frame lg:hidden">
                  <img
                    src={s.bg}
                    alt={s.heading}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="eyebrow text-ink-soft">Circuit {s.num}</p>
                <h2 className="display-caps mt-4 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05] tracking-[0.1em]">
                  {s.heading}
                </h2>
                <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">{s.intro}</p>
                <ul className="mt-8 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-4 leading-relaxed">
                      <span className="mt-[0.7em] h-px w-5 shrink-0 bg-ink/50" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {s.closing && <p className="mt-8 leading-relaxed text-ink-soft">{s.closing}</p>}
                <Link
                  to="/contact"
                  search={{ service: s.service }}
                  className="beam-link eyebrow mt-10 inline-flex items-center gap-2 text-[10px]"
                >
                  Get a quote <ArrowUpRight className="size-3" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-night className="theme-night relative overflow-hidden bg-night">
        <div className="led-h opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[70vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, rgb(255 231 194 / 0.14), transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center md:py-40">
          <SplitReveal
            as="h2"
            className="display-caps text-[clamp(2.2rem,5vw,4.4rem)] leading-[1] tracking-[0.1em] text-ivory"
          >
            Not sure what you need?
          </SplitReveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted-foreground">
              Get in touch and Victoria will talk you through it. No obligation, no jargon.
            </p>
            <Button asChild variant="lux" size="xl" className="mt-10">
              <Link to="/contact">Get a quote</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
