import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Balance Electrical" },
      { name: "description", content: "A selection of recent residential electrical projects across Queenstown, Wānaka and Central Otago." },
      { property: "og:title", content: "Projects — Balance Electrical" },
      { property: "og:description", content: "Recent residential electrical work across the Southern Lakes." },
      { property: "og:image", content: photos.fountainEntry },
    ],
  }),
  component: Projects,
});

const projects = [
  { img: photos.twilight, title: "House at twilight", place: "Queenstown", note: "Full new-build, layered exterior lighting." },
  { img: photos.fountainEntry, title: "Fountain entry", place: "Arrowtown", note: "Approach and entry lighting design." },
  { img: photos.kitchen, title: "Kitchen", place: "Wānaka", note: "Joinery-integrated lighting and switching." },
  { img: photos.living, title: "Living room", place: "Speargrass Flat", note: "Layered ambient & feature lighting." },
  { img: photos.img0003, title: "Hall study", place: "Jacks Point", note: "Reading light, charging detail." },
  { img: photos.img0004, title: "Quiet bedroom", place: "Hāwea", note: "Bedside circuits, blackout integration." },
  { img: photos.img0004b, title: "Bedroom detail", place: "Hāwea", note: "Switching at hand height, in walnut." },
  { img: photos.img0005, title: "Pantry", place: "Queenstown", note: "Concealed strip in shadow-line." },
  { img: photos.img0006, title: "Pendant rhythm", place: "Wānaka", note: "Three pendants over stone." },
  { img: photos.img0011jpeg, title: "Bathroom", place: "Arrowtown", note: "IP-rated layered scheme." },
  { img: photos.img0011, title: "Stair", place: "Queenstown", note: "Tread-level wash, dimmed after 10pm." },
  { img: photos.img0419, title: "Detail", place: "Central Otago", note: "Brass plate, tight tolerances." },
];

function Projects() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">Projects</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance max-w-4xl leading-[1.05]">
          A small portfolio, slowly built.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A selection of recent residential work — kitchens, living rooms, entries, and the
          quiet details in between.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <figure key={p.title + p.place} className="group relative overflow-hidden rounded-md bg-card">
            <img
              src={p.img}
              alt={p.title}
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
              <p className="text-xs uppercase tracking-[0.25em] text-primary/90">{p.place}</p>
              <p className="font-display text-xl text-foreground mt-1">{p.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.note}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="border-t border-border/50 mt-16">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <img src={photos.media} alt="As featured in media" className="w-full aspect-[4/3] object-cover rounded-md" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Featured</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">In good company</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our work has appeared alongside some of the architects, designers and builders
              we most admire in the Southern Lakes — homes where the electrical layer is felt,
              not seen.
            </p>
            <Link to="/contact" className="mt-8 inline-flex text-primary hover:underline">
              Talk to us about your project →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
