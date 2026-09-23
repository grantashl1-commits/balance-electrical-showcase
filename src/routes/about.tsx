import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CONTACT } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { LightWords, Reveal, SplitReveal } from "@/components/motion/Reveal";
import { photos } from "@/lib/photos";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Victoria Grant | Registered Electrician Taupō | Balance Electrical" },
      {
        name: "description",
        content:
          "Victoria Grant is the registered electrician and owner of Balance Electrical in Taupō. Hands-on residential and commercial electrical work across the Taupō district.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "NZ-WKO" },
      { name: "geo.placename", content: "Taupo" },
      { property: "og:title", content: "About Victoria Grant | Balance Electrical" },
      {
        property: "og:description",
        content:
          "Meet Victoria Grant — the owner and registered electrician behind Balance Electrical in Taupō.",
      },
      { property: "og:image", content: photos.victoria },
    ],
    links: [{ rel: "canonical", href: "https://www.balanceelectrical.co.nz/about" }],
  }),
  component: About,
});

const VALUES = [
  {
    title: "Integrity",
    copy: "We do what we say we'll do. You'll get an honest quote, clear communication, and workmanship we're proud to put our name on.",
  },
  {
    title: "Commitment",
    copy: "Every project — whether it's a heat pump installation or a full new build fit-out — gets Victoria's full attention from the first call to final sign-off.",
  },
  {
    title: "Communication",
    copy: "You'll always know what's happening, what it costs, and when we'll be there. Good communication is what separates a good tradesperson from a great one.",
  },
];

function About() {
  return (
    <SiteLayout>
      <AboutHero />

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-ink-soft">Her story</p>
            <div className="mt-4 h-px w-14 bg-ink/40" />
          </Reveal>
          <div className="md:col-span-9">
            <LightWords
              className="font-display text-[clamp(1.8rem,3.8vw,3.4rem)] leading-[1.15]"
              text="Growing up in Taupō, training in Wellington, and returning home to build something of her own — Victoria's path to Balance was driven by one thing: a standard of work she wasn't willing to compromise on."
            />
            <Reveal
              stagger={0.12}
              className="mt-16 grid gap-10 text-[1.05rem] leading-relaxed text-ink-soft md:grid-cols-2"
            >
              <p>
                As a registered electrician with the EWRB, Victoria brings a hands-on, personal
                approach to every job. She's on the tools herself, which means the person you speak
                to is the person doing the work. No subcontractors, no hand-offs, no surprises.
              </p>
              <p>
                From a single power point to a full new build fit-out, every job gets the same care
                and attention to detail. Victoria's clients don't just get quality electrical work —
                they get an electrician who answers the phone, shows up when she says she will, and
                leaves the site clean.
              </p>
            </Reveal>
            <Reveal className="mt-14">
              <a
                href="https://www.ewrb.govt.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-5 border border-ink/20 px-5 py-4 transition-[border-color,box-shadow] duration-500 hover:border-ink/50 hover:shadow-[0_20px_50px_-30px_rgb(28_26_24/0.6)]"
              >
                <img
                  src={photos.ewrbLogo}
                  alt="EWRB Registered Electrician"
                  loading="lazy"
                  className="h-14 w-auto"
                />
                <span className="eyebrow text-[10px] leading-relaxed">
                  Registered electrician
                  <br />
                  EWRB licence held
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Values />

      <section className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid items-end gap-12 md:grid-cols-2">
          <div>
            <SplitReveal
              as="h2"
              className="display-caps text-[clamp(2.2rem,5vw,4.6rem)] leading-[1] tracking-[0.1em]"
            >
              Ready to get started?
            </SplitReveal>
            <Reveal>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
                Get in touch and Victoria will talk you through it. No obligation, no jargon.
              </p>
              <Button asChild variant="lux" size="xl" className="mt-10">
                <Link to="/contact">
                  Get a quote <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:justify-self-end">
            <a
              href={CONTACT.tel}
              data-cursor="Call"
              className="flex items-center gap-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none"
            >
              <Phone className="size-6" strokeWidth={1.25} />
              {CONTACT.phoneLocal}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="beam-link mt-4 inline-block text-ink-soft hover:text-ink"
            >
              {CONTACT.email}
            </a>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

/** The portrait hangs on the stone like a gallery piece, under a picture light. */
function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      gsap.set(q("[data-picture-light]"), { opacity: 0 });
      gsap.set(q("[data-frame]"), { autoAlpha: 0, y: 40 });
      const tl = gsap.timeline({ paused: true });
      tl.to(q("[data-frame]"), { autoAlpha: 1, y: 0, duration: 1.4, ease: "expo.out" }, 0.2).to(
        q("[data-picture-light]"),
        { keyframes: { opacity: [0, 1, 0.3, 1] }, duration: 0.6, ease: "none" },
        0.9,
      );
      const off = onIntroDone(() => tl.play());
      gsap.to(q("[data-frame]"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      return off;
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-36 md:px-10 md:pt-44"
    >
      <div className="grid items-end gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow text-ink-soft">About Victoria</p>
          <SplitReveal
            as="h1"
            immediate
            delay={0.3}
            className="display-caps mt-6 text-[clamp(2.6rem,6.3vw,6.4rem)] leading-[0.95] tracking-[0.08em]"
          >
            Meet Victoria.
          </SplitReveal>
          <Reveal delay={0.6}>
            <p className="eyebrow mt-10 text-ink-soft">
              Owner-operator · Registered electrician · Taupō
            </p>
          </Reveal>
        </div>
        <div className="relative md:col-span-5 md:col-start-8">
          {/* picture light */}
          <div
            data-picture-light
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-10 z-10 flex justify-center"
          >
            <span className="h-2 w-1/3 rounded-full bg-frame shadow-[0_6px_22px_rgb(255_231_194/0.9)]" />
          </div>
          <div
            data-picture-light
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -top-10 bottom-[40%]"
            style={{
              background:
                "radial-gradient(50% 70% at 50% 0%, rgb(255 244 226 / 0.9), rgb(255 232 200 / 0.25) 50%, transparent 80%)",
              mixBlendMode: "soft-light",
            }}
          />
          <div
            data-frame
            className="relative border-[8px] border-frame bg-frame shadow-[0_50px_100px_-45px_rgb(0_0_0/0.7)] md:border-[12px]"
          >
            <img
              src={photos.victoria}
              alt="Victoria Grant — owner and registered electrician"
              className="aspect-[4/5] w-full object-cover"
            />
            <div
              data-picture-light
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 0%, rgb(255 236 206 / 0.4), transparent 75%)",
                mixBlendMode: "soft-light",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Three wall switches that flip on as they come into view. */
function Values() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const card = e.target as HTMLElement;
          setTimeout(() => card.setAttribute("data-on", ""), Number(card.dataset.delay ?? 0));
          io.unobserve(card);
        }),
      { threshold: 0.5 },
    );
    el.querySelectorAll("[data-switch-card]").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-night
      className="theme-night relative overflow-hidden bg-night py-28 md:py-40"
      aria-labelledby="values-title"
    >
      <div className="led-h absolute inset-x-0 top-0 opacity-70" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="eyebrow text-muted-foreground">What we stand for</p>
        <SplitReveal
          as="h2"
          id="values-title"
          className="display-caps mt-5 text-[clamp(2.2rem,5vw,4.6rem)] leading-[1] tracking-[0.1em] text-ivory"
        >
          Our values.
        </SplitReveal>
        <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3 md:gap-8">
          {VALUES.map((v, i) => (
            <article
              key={v.title}
              data-switch-card
              data-delay={i * 220}
              className="group relative overflow-hidden border border-ivory/10 p-8 transition-[border-color] duration-700 data-[on]:border-glow/25 md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-3/4 opacity-0 transition-opacity duration-[1400ms] group-data-[on]:opacity-100"
                style={{
                  background:
                    "radial-gradient(60% 70% at 50% 0%, rgb(255 231 194 / 0.14), transparent 75%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <span className="font-display text-6xl leading-none text-ivory/15 transition-colors duration-700 group-data-[on]:text-glow-soft/60">
                  0{i + 1}
                </span>
                {/* rocker switch */}
                <span
                  aria-hidden
                  className="relative flex h-14 w-9 justify-center rounded-md border border-ivory/25 bg-black/30 p-1"
                >
                  <span className="h-1/2 w-full rounded-sm bg-ivory/25 transition-[transform,background-color,box-shadow] duration-500 [transition-timing-function:var(--ease-out-expo)] group-data-[on]:translate-y-full group-data-[on]:bg-glow-soft group-data-[on]:shadow-[0_0_14px_rgb(255_231_194/0.8)]" />
                </span>
              </div>
              <h3 className="display-caps relative mt-12 text-2xl tracking-[0.16em] text-ivory">
                {v.title}
              </h3>
              <p className="relative mt-4 leading-relaxed text-muted-foreground">{v.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
