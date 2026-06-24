import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balance Electrical — Residential electrical, considered" },
      { name: "description", content: "Owner-operated by Victoria. Premium residential electrical design and installation across Taupō and the surrounding district." },
      { property: "og:title", content: "Balance Electrical" },
      { property: "og:description", content: "Considered residential electrical work across Taupō and the Taupō district." },
      { property: "og:image", content: photos.twilight },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={photos.twilight}
          alt="A lit home at twilight"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-24 md:pb-32">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">Balance Electrical</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground max-w-4xl leading-[1.05] text-balance">
            Light, measured. Wiring, considered.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Residential electrical design and installation across Queenstown,
            Wānaka and Central Otago — owner-operated by Victoria.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-7 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
            >
              Start a project
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center px-7 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-300"
            >
              See recent work
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="warm-vignette">
        <div className="mx-auto max-w-5xl px-6 py-28 md:py-36 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-8">Quiet craft</p>
          <p className="font-display text-3xl md:text-5xl leading-snug text-balance text-foreground">
            We build the electrical layer of beautiful homes — the part you never
            notice, that makes everything else feel effortless.
          </p>
        </div>
      </section>

      {/* WORK GRID */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Recent work</p>
            <h2 className="font-display text-4xl md:text-5xl">Selected residences</h2>
          </div>
          <Link to="/projects" className="hidden md:inline text-sm text-primary hover:underline">
            View all projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { src: photos.kitchen, label: "Kitchen", place: "Queenstown" },
            { src: photos.living, label: "Living", place: "Wānaka" },
            { src: photos.fountainEntry, label: "Entry", place: "Arrowtown" },
            { src: photos.img0005, label: "Joinery lighting", place: "Speargrass" },
            { src: photos.img0419, label: "Stair detail", place: "Jacks Point" },
            { src: photos.img0006, label: "Pendant rhythm", place: "Hāwea" },
          ].map((p) => (
            <figure key={p.src} className="group relative overflow-hidden rounded-md bg-card">
              <img
                src={p.src}
                alt={p.label}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background/90 to-transparent">
                <p className="text-xs uppercase tracking-[0.25em] text-primary/90">{p.place}</p>
                <p className="font-display text-xl text-foreground mt-1">{p.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <img src={photos.img0011} alt="Detail of finished electrical work" className="rounded-md w-full aspect-[4/5] object-cover" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">What we do</p>
            <h2 className="font-display text-4xl md:text-5xl text-balance mb-6">
              From first conduit to final dim
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              New builds, renovations and considered lighting design. We work alongside
              architects, designers and builders to make every switch, socket and luminaire
              feel inevitable.
            </p>
            <ul className="space-y-3 text-foreground/90">
              {["New residential builds", "Renovations & additions", "Lighting design & specification", "EV charging", "Heat pump & HVAC wiring", "Pre-purchase electrical reports"].map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-primary" />
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="mt-10 inline-flex items-center px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all"
            >
              Full service list →
            </Link>
          </div>
        </div>
      </section>

      {/* OWNER */}
      <section className="border-t border-border/50 bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-[1fr_1.4fr] gap-14 items-center">
          <img src={photos.victoria} alt="Victoria, owner of Balance Electrical" className="rounded-md w-full aspect-square object-cover glow" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Owner-operator</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Meet Victoria</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Balance Electrical is led — and run — by Victoria. Every quote, every visit,
              every cable run passes through one set of hands. That's why our clients
              return, and why our finishes are quiet.
            </p>
            <Link to="/about" className="text-primary hover:underline">Read her story →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center">
        <h2 className="font-display text-4xl md:text-6xl text-balance mb-6">
          Planning something considered?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          We take on a small number of residential projects each year. Let's see if yours is the right fit.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
        >
          Get in touch
        </Link>
      </section>
    </SiteLayout>
  );
}
