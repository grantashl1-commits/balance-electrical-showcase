import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { photos } from "@/lib/photos";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Victoria Grant | Registered Electrician Taupō | Balance Electrical" },
      { name: "description", content: "Victoria Grant is the registered electrician and owner of Balance Electrical in Taupō. Hands-on residential and commercial electrical work across the Taupō district." },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "NZ-WKO" },
      { name: "geo.placename", content: "Taupo" },
      { property: "og:title", content: "About Victoria Grant | Balance Electrical" },
      { property: "og:description", content: "Meet Victoria Grant — the owner and registered electrician behind Balance Electrical in Taupō." },
      { property: "og:image", content: photos.victoria },
    ],
    links: [
      { rel: "canonical", href: "https://www.balanceelectrical.co.nz/about" },
    ],
  }),
  component: About,
});

function About() {
  useScrollReveal();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden spotlight-amber">
        <img
          src={photos.twilight}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        />
        <div className="absolute inset-0 spotlight-amber" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,147,58,0.18) 0%, transparent 65%), #0A0A0A", opacity: 0.85 }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-20">
          <p
            className="reveal text-[10px] uppercase tracking-[0.2em] text-[#C9933A] mb-4 font-sans"
            style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
          >
            ABOUT VICTORIA
          </p>
          <h1
            className="reveal font-display text-5xl md:text-7xl lg:text-8xl text-foreground italic font-light leading-[1.05]"
            style={{ fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif", fontWeight: 300 }}
          >
            Meet Victoria.
          </h1>
        </div>
      </section>
      <div className="led-strip-h" />

      {/* MAIN CONTENT — two column */}
      <section className="bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-[45fr_55fr]">
          {/* LEFT — portrait */}
          <div className="relative flex items-start">
            <div className="absolute left-0 top-0 bottom-0 led-strip-v" />
            <div className="pl-8 md:pl-12 reveal">
              <img
                src={photos.img0003}
                alt="Victoria Grant — owner and registered electrician"
                className="w-full max-w-md rounded-md object-cover aspect-[4/5]"
                style={{
                  boxShadow: "0 0 80px rgba(201,147,58,0.25), 0 0 160px rgba(201,147,58,0.08)",
                  border: "1px solid rgba(201,147,58,0.15)",
                  filter: "brightness(0.9) contrast(1.05)",
                }}
              />
            </div>
          </div>

          {/* RIGHT — bio */}
          <div className="relative mt-12 md:mt-0">
            <div className="absolute left-0 top-0 bottom-0 led-strip-v" />
            <div className="pl-8 md:pl-12 space-y-8">
              <div className="reveal" data-delay="80">
                <p
                  className="text-[9px] uppercase tracking-[0.25em] text-[#C9933A] mb-4"
                  style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                >
                  OWNER OPERATOR · REGISTERED ELECTRICIAN
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8]">
                  Victoria Grant
                </h2>
              </div>

              <div className="reveal space-y-5 text-[15px] leading-relaxed" data-delay="160">
                <p className="text-[#888880]" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
                  Growing up in Taupō, completing her electrical training in Wellington, and returning home to build something of her own — Victoria Grant's path to founding Balance Electrical was driven by one thing: a standard of work she wasn't willing to compromise on.
                </p>
                <p className="text-[#888880]" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
                  As a registered electrician with the EWRB, Victoria brings a hands-on, personal approach to every job. She's on the tools herself, which means the person you speak to is the person doing the work. No subcontractors, no hand-offs, no surprises.
                </p>
                <p className="text-[#888880]" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
                  From a single power point to a full new build fit-out, every job gets the same level of care and attention to detail. Victoria's clients don't just get quality electrical work — they get an electrician who answers the phone, shows up when she says she will, and leaves the site clean.
                </p>
              </div>

              {/* EWRB credential block */}
              <div className="reveal pt-2" data-delay="240">
                <a
                  href="https://www.ewrb.govt.nz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="credential-block no-underline"
                >
                  <img
                    src={photos.ewrbLogo}
                    alt="EWRB Registered Electrician"
                    style={{ height: "72px", width: "auto" }}
                  />
                  <span
                    className="text-[13px] text-[#888880]"
                    style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                  >
                    Registered Electrician — EWRB licence held
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#111111]">
        <div className="led-strip-h" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="text-center reveal mb-16">
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-[#C9933A] mb-4"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              WHAT WE STAND FOR
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8]">
              Our values.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {/* Value 01 */}
            <div className="relative px-8 py-10 reveal" data-delay="0">
              <div className="relative z-10">
                <p
                  className="absolute top-0 left-8 font-display text-[80px] leading-none select-none pointer-events-none"
                  style={{
                    color: "rgba(201,147,58,0.12)",
                    fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif",
                    fontWeight: 100,
                  }}
                >
                  01
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-[#F5F0E8] mt-4 mb-4">
                  Integrity
                </h3>
                <p
                  className="text-[14px] leading-relaxed text-[#888880]"
                  style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                >
                  We do what we say we'll do. You'll get an honest quote, clear communication, and workmanship we're proud to put our name on.
                </p>
              </div>
              <div className="led-strip-h mt-10 md:hidden" />
            </div>

            {/* LED strip vertical */}
            <div className="hidden md:block led-strip-v mx-auto" />

            {/* Value 02 */}
            <div className="relative px-8 py-10 reveal" data-delay="120">
              <div className="relative z-10">
                <p
                  className="absolute top-0 left-8 font-display text-[80px] leading-none select-none pointer-events-none"
                  style={{
                    color: "rgba(201,147,58,0.12)",
                    fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif",
                    fontWeight: 100,
                  }}
                >
                  02
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-[#F5F0E8] mt-4 mb-4">
                  Commitment
                </h3>
                <p
                  className="text-[14px] leading-relaxed text-[#888880]"
                  style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                >
                  Every project — whether it's a heat pump installation or a full new build fit-out — gets Victoria's full attention from the first call to final sign-off.
                </p>
              </div>
              <div className="led-strip-h mt-10 md:hidden" />
            </div>

            {/* LED strip vertical */}
            <div className="hidden md:block led-strip-v mx-auto" />

            {/* Value 03 */}
            <div className="relative px-8 py-10 reveal" data-delay="240">
              <div className="relative z-10">
                <p
                  className="absolute top-0 left-8 font-display text-[80px] leading-none select-none pointer-events-none"
                  style={{
                    color: "rgba(201,147,58,0.12)",
                    fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif",
                    fontWeight: 100,
                  }}
                >
                  03
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-[#F5F0E8] mt-4 mb-4">
                  Communication
                </h3>
                <p
                  className="text-[14px] leading-relaxed text-[#888880]"
                  style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                >
                  You'll always know what's happening, what it costs, and when we'll be there. We believe good communication is what separates a good tradesperson from a great one.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="led-strip-h" />
      </section>

      {/* CTA */}
      <section className="relative spotlight-amber">
        <div className="led-strip-h" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center">
          <div className="reveal" data-delay="0">
            <h2
              className="font-display text-4xl md:text-5xl text-foreground italic font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif", fontWeight: 300 }}
            >
              Ready to get started?
            </h2>
            <p
              className="text-[#888880] text-lg leading-relaxed mb-8"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Get in touch and Victoria will talk you through it. No obligation, no jargon.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-[#0A0A0A] font-medium transition-all duration-300 hover:shadow-[0_0_24px_rgba(201,147,58,0.4)]"
              style={{
                backgroundColor: "#C9933A",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              Get a quote →
            </Link>
          </div>

          <div className="reveal space-y-6" data-delay="100">
            <a
              href="tel:+64279162077"
              className="flex items-center gap-4 group"
            >
              <Phone className="w-6 h-6 text-[#C9933A]" />
              <span
                className="font-display text-[28px] text-[#F5F0E8] group-hover:text-[#C9933A] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif" }}
              >
                027 916 2077
              </span>
            </a>
            <a
              href="mailto:enquire@balanceelectrical.co.nz"
              className="block text-[14px] text-[#C9933A] hover:underline"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              enquire@balanceelectrical.co.nz
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
