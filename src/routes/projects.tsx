import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Reveal, SplitReveal } from "@/components/motion/Reveal";
import { TorchArea } from "@/components/motion/Torch";
import { Lightbox, type Shot } from "@/components/Lightbox";
import { photos } from "@/lib/photos";
import { getPhoto } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Electrician Taupō | Balance Electrical" },
      {
        name: "description",
        content:
          "A selection of recent residential electrical projects across Taupō and the Taupō district.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "NZ-WKO" },
      { name: "geo.placename", content: "Taupo" },
      { property: "og:title", content: "Projects — Balance Electrical" },
      {
        property: "og:description",
        content: "Recent residential electrical work across Taupō and the surrounding district.",
      },
      { property: "og:image", content: photos.fountainEntry },
    ],
    links: [{ rel: "canonical", href: "https://www.balanceelectrical.co.nz/projects" }],
  }),
  component: Projects,
});

function fromPortfolio(slug: string, index: number, span: string, aspect: string) {
  const p = getPhoto(slug, index);
  return { src: p.lg, title: p.title, place: p.project, note: p.caption, aspect, span };
}

// Spans give the grid an editorial rhythm on large screens.
const projects: (Shot & { span: string })[] = [
  {
    src: photos.twilight,
    title: "House at twilight",
    place: "Taupō",
    note: "Full new-build, layered exterior lighting.",
    aspect: "aspect-[16/10]",
    span: "lg:col-span-8",
  },
  {
    src: photos.fountainEntry,
    title: "Fountain entry",
    place: "Taupō",
    note: "Approach and entry lighting design.",
    aspect: "aspect-[4/5]",
    span: "lg:col-span-4",
  },
  {
    src: photos.kitchen,
    title: "Kitchen",
    place: "Taupō",
    note: "Joinery-integrated lighting and switching.",
    aspect: "aspect-[4/5]",
    span: "lg:col-span-4",
  },
  {
    src: photos.living,
    title: "Living room",
    place: "Kinloch",
    note: "Layered ambient & feature lighting.",
    aspect: "aspect-[4/5]",
    span: "lg:col-span-4",
  },
  // Verified project photographs, credited to the project they come from.
  fromPortfolio("the-curve-house", 2, "lg:col-span-4", "aspect-[4/5]"),
  fromPortfolio("the-curve-house", 4, "lg:col-span-4", "aspect-[4/5]"),
  fromPortfolio("the-kinloch-retreat", 0, "lg:col-span-4", "aspect-[4/5]"),
  fromPortfolio("the-curve-house", 0, "lg:col-span-4", "aspect-[4/5]"),
  fromPortfolio("oakleaf-residence", 0, "lg:col-span-8", "aspect-[16/10]"),
  fromPortfolio("the-curve-house", 1, "lg:col-span-4", "aspect-[4/5]"),
  fromPortfolio("oakleaf-residence", 2, "lg:col-span-4", "aspect-[4/5]"),
  {
    src: photos.img0419,
    title: "Detail",
    place: "Taupō district",
    note: "Brass plate, tight tolerances.",
    aspect: "aspect-[16/10]",
    span: "lg:col-span-8",
  },
];

function Projects() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
        <p className="eyebrow text-ink-soft">Projects</p>
        <SplitReveal
          as="h1"
          immediate
          delay={0.2}
          className="display-caps mt-6 max-w-5xl text-[clamp(2.6rem,7.4vw,7.2rem)] leading-[0.98] tracking-[0.08em]"
        >
          A small portfolio, slowly built.
        </SplitReveal>
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            A selection of recent residential work — kitchens, living rooms, entries, and the quiet
            details in between. Move through the room with your torch; tap any photograph to see it
            properly lit.
          </p>
          <Button asChild variant="luxOutline" size="xl" className="mt-10">
            <Link to="/portfolio">
              Browse project by project <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>

      <section
        data-night
        className="theme-night relative bg-night py-20 md:py-28"
        aria-label="Project gallery"
      >
        <div className="led-h absolute inset-x-0 top-0 opacity-70" />
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <TorchArea>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-12">
              {projects.map((p, i) => (
                <button
                  key={p.title + p.place}
                  type="button"
                  data-shot
                  data-cursor="View"
                  onClick={() => setOpen(i)}
                  className={cn("group relative block overflow-hidden text-left", p.span)}
                >
                  <img
                    src={p.src}
                    alt={`${p.title}, ${p.place}`}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "h-full w-full object-cover transition-[filter,transform] duration-[1200ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03] max-md:[filter:brightness(0.45)] max-md:group-data-[lit]:[filter:brightness(1)]",
                      p.aspect,
                      p.span.includes("8") && "lg:aspect-auto lg:h-full",
                    )}
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 md:translate-y-2 md:opacity-0 md:transition-all md:duration-700 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                    <span className="eyebrow block text-[10px] text-glow-soft/90">{p.place}</span>
                    <span className="mt-1 block font-display text-2xl text-ivory">{p.title}</span>
                    <span className="mt-1 block text-sm text-ivory/70">{p.note}</span>
                  </span>
                </button>
              ))}
            </div>
          </TorchArea>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid items-center gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <div className="border-[8px] border-frame md:border-[12px]">
              <img
                src={photos.media}
                loading="lazy"
                decoding="async"
                alt="Balance Electrical work as featured in media"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <p className="eyebrow text-ink-soft">Featured</p>
            <SplitReveal
              as="h2"
              className="display-caps mt-5 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1] tracking-[0.1em]"
            >
              In good company
            </SplitReveal>
            <Reveal>
              <p className="mt-6 leading-relaxed text-ink-soft">
                Our work has appeared alongside some of the architects, designers and builders we
                most admire across Taupō and the surrounding district — homes where the electrical
                layer is felt, not seen.
              </p>
              <Button asChild variant="lux" size="xl" className="mt-10">
                <Link to="/contact">
                  Talk to us about your project <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <Lightbox shots={projects} index={open} onIndex={setOpen} />
    </SiteLayout>
  );
}
