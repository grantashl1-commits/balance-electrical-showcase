import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Reveal, SplitReveal } from "@/components/motion/Reveal";
import { TorchArea } from "@/components/motion/Torch";
import { Lightbox, type Shot } from "@/components/Lightbox";
import { photos } from "@/lib/photos";
import { PORTFOLIO, photoTags } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Gallery | Electrician Taupō | Balance Electrical" },
      {
        name: "description",
        content:
          "Every project photograph in one place — lighting, new builds, renovations, commercial, solar, heating and pre-wiring across Taupō and the Taupō district.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "NZ-WKO" },
      { name: "geo.placename", content: "Taupo" },
      { property: "og:title", content: "Gallery — Balance Electrical" },
      {
        property: "og:description",
        content: "Browse Balance Electrical's work by type — lighting, commercial, solar and more.",
      },
      { property: "og:image", content: photos.fountainEntry },
    ],
    links: [{ rel: "canonical", href: "https://www.balanceelectrical.co.nz/projects" }],
  }),
  component: Gallery,
});

type Tile = Shot & { tags: string[]; smSrc: string; w?: number; h?: number; afterDark: boolean };

// Photos from the original site that aren't tied to a portfolio chapter.
const EARLIER: Tile[] = [
  {
    src: photos.twilight,
    title: "House at twilight",
    note: "Full new build, layered exterior lighting.",
    aspect: "aspect-[16/10]",
  },
  {
    src: photos.fountainEntry,
    title: "Fountain entry",
    note: "Approach and entry lighting design.",
    aspect: "aspect-[4/5]",
  },
  {
    src: photos.kitchen,
    title: "Kitchen",
    note: "Joinery-integrated lighting and switching.",
    aspect: "aspect-[4/5]",
  },
  {
    src: photos.living,
    title: "Living room",
    note: "Layered ambient and feature lighting.",
    aspect: "aspect-[4/5]",
  },
  {
    src: photos.img0419,
    title: "Detail",
    note: "Brass plate, tight tolerances.",
    aspect: "aspect-[16/10]",
  },
].map((t) => ({
  ...t,
  place: "Taupō district",
  smSrc: t.src,
  tags: ["Residential"],
  afterDark: t.title === "House at twilight",
}));

const TILES: Tile[] = [
  ...PORTFOLIO.flatMap((project) =>
    project.photos.map((ph) => ({
      src: ph.lg,
      smSrc: ph.sm,
      w: ph.w,
      h: ph.h,
      title: ph.title,
      place: project.title,
      note: ph.caption,
      tags: photoTags(project, ph),
      afterDark: /dusk|sunset|night/.test(ph.name),
    })),
  ),
  ...EARLIER,
];

const AFTER_DARK = "After dark";
const ORDER = [
  "Residential",
  "New build",
  "Renovation",
  "Commercial",
  "Solar",
  "Heating",
  "Pool",
  "First fix",
];
const FILTERS = ["All", AFTER_DARK, ...ORDER.filter((f) => TILES.some((t) => t.tags.includes(f)))];

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = TILES.filter((t) =>
    filter === "All" ? true : filter === AFTER_DARK ? t.afterDark : t.tags.includes(filter),
  );
  const count = (f: string) =>
    f === "All"
      ? TILES.length
      : f === AFTER_DARK
        ? TILES.filter((t) => t.afterDark).length
        : TILES.filter((t) => t.tags.includes(f)).length;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-36 md:px-10 md:pb-20 md:pt-48">
        <p className="eyebrow text-ink-soft">Gallery</p>
        <SplitReveal
          as="h1"
          immediate
          delay={0.2}
          className="display-caps mt-6 max-w-5xl text-[clamp(2.6rem,7.4vw,7.2rem)] leading-[0.98] tracking-[0.08em]"
        >
          Browse by the work.
        </SplitReveal>
        <Reveal delay={0.5} className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft md:col-span-7">
            Every photograph from our projects in one place. Filter by the kind of work — or see
            only what happens after dark — and tap any image to see it properly lit. For the story
            behind each project, read the portfolio.
          </p>
          <div className="md:col-span-5 md:justify-self-end">
            <Button asChild variant="luxOutline" size="xl">
              <Link to="/portfolio">
                Read the project stories <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section
        data-night
        className="theme-night relative bg-night py-16 md:py-24"
        aria-label="Project gallery"
      >
        <div className="led-h absolute inset-x-0 top-0 opacity-70" />
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div role="toolbar" aria-label="Filter by type of work" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "eyebrow inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[10px] transition-[color,background-color,border-color,box-shadow] duration-500",
                  filter === f
                    ? "border-glow/60 bg-glow-soft text-ink shadow-[0_0_24px_-6px_rgb(255_231_194/0.8)]"
                    : "border-ivory/20 text-ivory/75 hover:border-ivory/50 hover:text-ivory",
                )}
              >
                {f}
                <span className="opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>

          {/* Remount per filter so touch devices observe the new set of photos. */}
          <TorchArea key={filter} className="mt-10 md:mt-14">
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {shown.map((t, i) => (
                <button
                  key={t.src}
                  type="button"
                  data-shot
                  data-cursor="View"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full break-inside-avoid overflow-hidden text-left"
                >
                  <img
                    src={t.smSrc}
                    width={t.w}
                    height={t.h}
                    alt={`${t.title}, ${t.place}`}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "h-auto w-full object-cover transition-[filter,transform] duration-[1200ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03] max-md:[filter:brightness(0.45)] max-md:group-data-[lit]:[filter:brightness(1)]",
                      !t.w && t.aspect,
                    )}
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 md:translate-y-2 md:opacity-0 md:transition-all md:duration-700 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                    <span className="eyebrow block text-[10px] text-glow-soft/90">{t.place}</span>
                    <span className="mt-1 block font-display text-2xl text-ivory">{t.title}</span>
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

      <Lightbox shots={shown} index={open} onIndex={setOpen} />
    </SiteLayout>
  );
}
