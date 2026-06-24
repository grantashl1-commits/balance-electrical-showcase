import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Balance Electrical" },
      { name: "description", content: "Residential electrical services: new builds, renovations, lighting design, EV charging and more across Queenstown, Wānaka and Central Otago." },
      { property: "og:title", content: "Services — Balance Electrical" },
      { property: "og:description", content: "From first conduit to final dim — considered residential electrical work." },
      { property: "og:image", content: photos.img0011 },
    ],
  }),
  component: Services,
});

const services = [
  {
    title: "New residential builds",
    body: "Full-house electrical design and installation, planned alongside your architect and builder from foundation up.",
    img: photos.img0003,
  },
  {
    title: "Renovations & additions",
    body: "Sensitive upgrades to existing homes — extending circuits, rethinking switch plans, retrofitting lighting without scarring the architecture.",
    img: photos.img0004,
  },
  {
    title: "Lighting design",
    body: "Layered, dimmable lighting schemes specified for how you actually live: morning, working, dinner, late.",
    img: photos.img0005,
  },
  {
    title: "EV charging",
    body: "Single and dual EV chargers, load-balanced to your existing supply, tucked where they belong.",
    img: photos.img0006,
  },
  {
    title: "Heat pump & HVAC wiring",
    body: "Clean install pathways and considered controls for heating, cooling and ventilation systems.",
    img: photos.img0011jpeg,
  },
  {
    title: "Pre-purchase reports",
    body: "Thorough, written electrical condition reports before you commit to a home.",
    img: photos.img0419,
  },
];

function Services() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">Services</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance max-w-4xl leading-[1.05]">
          From first conduit to final dim.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A focused list of what we do, all of it residential, all of it owner-operated.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-2 gap-x-10 gap-y-16">
        {services.map((s) => (
          <article key={s.title} className="group">
            <div className="overflow-hidden rounded-md">
              <img
                src={s.img}
                alt={s.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-2xl md:text-3xl mt-6 text-foreground">{s.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
          </article>
        ))}
      </section>

      <section className="border-t border-border/50 mt-16">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">How we work</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-10 text-left">
            {[
              { n: "01", t: "Walkthrough", b: "We meet on site, listen carefully, and sketch the electrical layer of the project alongside you." },
              { n: "02", t: "Specification", b: "A written scope: every fitting, every switch, every circuit — costed transparently before work starts." },
              { n: "03", t: "Install & finish", b: "One electrician on site. Clean lines, considered finishes, and a tidy hand-over." },
            ].map((step) => (
              <div key={step.n}>
                <p className="font-display text-primary text-3xl mb-3">{step.n}</p>
                <h4 className="font-display text-xl mb-2">{step.t}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.b}</p>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-14 inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
