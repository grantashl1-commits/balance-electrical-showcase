import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Victoria & Balance Electrical" },
      { name: "description", content: "Owner-operated by Victoria. Considered residential electrical work across Taupō and the Taupō district." },
      { property: "og:title", content: "About Balance Electrical" },
      { property: "og:description", content: "Meet Victoria — the owner-operator behind Balance Electrical." },
      { property: "og:image", content: photos.victoria },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">About</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance max-w-4xl leading-[1.05]">
          A small studio for considered electrical work.
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-[1.1fr_1.4fr] gap-14 items-start">
        <div className="md:sticky md:top-28">
          <img
            src={photos.victoria}
            alt="Victoria, owner of Balance Electrical"
            className="w-full rounded-md object-cover aspect-[4/5] glow"
          />
          <p className="text-sm text-muted-foreground mt-4 italic">Victoria — Owner-Operator</p>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          <p className="font-display text-3xl md:text-4xl text-foreground leading-snug">
            "I started Balance because the homes I most admired all had the same quiet thing in common: someone had cared about every detail you couldn't see."
          </p>
          <p className="text-muted-foreground">
            Victoria founded Balance Electrical to do residential work differently — slowly, carefully,
            and with one tradesperson on every project from first walkthrough to final commissioning.
          </p>
          <p className="text-muted-foreground">
            A licensed electrician with more than a decade on premium residential builds across
            Taupō and the surrounding district, she works directly with architects, interior designers
            and a handful of trusted builders. Every switch position, every drop, every dimming curve
            is discussed before a single conduit is run.
          </p>
          <p className="text-muted-foreground">
            The result: homes that feel calm at every hour. The kind of finish where, at night, the
            light just sits where it should.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/60">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Based</p>
              <p className="mt-1">Taupō</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Working across</p>
              <p className="mt-1">Taupō district</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Registered</p>
              <p className="mt-1">EWRB Licensed Electrical Worker</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Projects / year</p>
              <p className="mt-1">A small, selected number</p>
            </div>
          </div>

          <div className="pt-8">
            <img src={photos.ewrbLogo} alt="EWRB Registered" className="h-14 w-auto opacity-90" />
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 mt-12">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-6">
          <img src={photos.kitchen} alt="" className="w-full aspect-[4/5] object-cover rounded-md" />
          <img src={photos.living} alt="" className="w-full aspect-[4/5] object-cover rounded-md" />
          <img src={photos.fountainEntry} alt="" className="w-full aspect-[4/5] object-cover rounded-md" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-6">Work with Victoria</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          New build, renovation, or a single beautifully-lit room — get in touch and let's talk about it.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
        >
          Start a conversation
        </Link>
      </section>
    </SiteLayout>
  );
}
