import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/areas-of-expertise")({
  head: () => ({
    meta: [
      { title: "Electrical Services Taupō | Solar, New Builds, Renovations, EV Chargers | Balance Electrical" },
      { name: "description", content: "Registered electrical services in Taupō — new builds, renovations, solar & battery storage, heat pump installation, EV chargers, and commercial fit-outs. Balance Electrical, Victoria Grant." },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "NZ-WKO" },
      { name: "geo.placename", content: "Taupo" },
      { name: "keywords", content: "solar panel installation Taupo, solar electrician Taupo, battery storage Taupo, EV charger Taupo, registered electrician Taupo" },
      { property: "og:title", content: "Areas of Expertise — Balance Electrical" },
      { property: "og:description", content: "Registered electrical services across Taupō and the surrounding district." },
      { property: "og:image", content: photos.kitchen },
    ],
    links: [
      { rel: "canonical", href: "https://www.balanceelectrical.co.nz/areas-of-expertise" },
    ],
  }),
  component: AreasOfExpertise,
});

const sections = [
  {
    num: "01",
    heading: "Residential",
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
    bg: photos.twilight,
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
  useScrollReveal();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={photos.kitchen}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(138, 144, 112,0.18) 0%, transparent 65%), #3A3E30",
            opacity: 0.85,
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-20">
          <p
            className="reveal text-[10px] uppercase tracking-[0.2em] text-[#8A9070] mb-4"
            style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
          >
            WHAT WE DO
          </p>
          <h1
            className="reveal font-display text-4xl md:text-6xl lg:text-7xl text-foreground italic font-light leading-[1.05]"
            style={{ fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif", fontWeight: 300 }}
          >
            Areas of expertise.
          </h1>
          <p
            className="reveal mt-4 text-[18px] text-[#C4C0B4] max-w-2xl"
            style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", fontWeight: 300 }}
          >
            Registered electrical services across Taupō and the surrounding district.
          </p>
        </div>
      </section>
      <div className="led-strip-h" />

      {/* SERVICE SECTIONS */}
      {sections.map((s, i) => {
        const even = i % 2 === 0;

        return (
          <section key={s.num} className="relative overflow-hidden bg-[#3A3E30]">
            {/* Subtle background image */}
            <img
              src={s.bg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: 0.08 }}
            />
            <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${even ? "" : "md:[direction:rtl]"}`}>
                {/* Content side */}
                <div className={`relative ${even ? "" : "md:[direction:ltr]"}`}>
                  <div className={`absolute top-0 bottom-0 led-strip-v ${even ? "left-0" : ""}`} />
                  <div className={even ? "pl-8 md:pl-12" : ""}>
                    <p
                      className="reveal text-[10px] uppercase tracking-[0.25em] text-[#8A9070] mb-4"
                      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {s.num}
                    </p>
                    <h2 className="reveal font-display text-3xl md:text-4xl lg:text-5xl text-[#F5F2EC] mb-5" data-delay="60">
                      {s.heading}
                    </h2>
                    <p
                      className="reveal text-[16px] leading-relaxed text-[#C4C0B4] mb-8"
                      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", fontWeight: 300 }}
                      data-delay="120"
                    >
                      {s.intro}
                    </p>
                    <ul className="space-y-3" data-delay="180">
                      {s.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="reveal flex items-start gap-3"
                          data-delay={String(180 + bi * 60)}
                        >
                          <span
                            className="mt-[7px] flex-shrink-0"
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              backgroundColor: "#8A9070",
                            }}
                          />
                          <span
                            className="text-[14px] leading-relaxed text-[#C4C0B4]"
                            style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {"closing" in s && (
                      <p
                        className="reveal mt-6 text-[14px] leading-relaxed text-[#C4C0B4]"
                        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                        data-delay={String(180 + s.bullets.length * 60)}
                      >
                        {(s as typeof s & { closing: string }).closing}
                      </p>
                    )}
                    <div className="reveal mt-8" data-delay={String(240 + s.bullets.length * 60)}>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 text-[#8A9070] text-sm hover:gap-2 transition-all"
                        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                      >
                        Get a quote
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Image side (placeholder for visual rhythm) */}
                <div className={`relative ${even ? "" : "md:[direction:ltr]"}`}>
                  <div className="reveal">
                    <img
                      src={s.bg}
                      alt={s.heading}
                      className="w-full rounded-md object-cover aspect-[4/3]"
                      style={{
                        opacity: 0.65,
                        boxShadow: "0 0 0 1px rgba(138, 144, 112,0.10), 0 8px 40px -15px rgba(138, 144, 112,0.12)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="relative spotlight-amber">
        <div className="led-strip-h" />
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
          <h2
            className="reveal font-display text-4xl md:text-5xl text-foreground italic font-light mb-6"
            style={{ fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif", fontWeight: 300 }}
          >
            Not sure what you need?
          </h2>
          <p
            className="reveal text-[#C4C0B4] text-lg leading-relaxed mb-10"
            style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            data-delay="100"
          >
            Get in touch and Victoria will talk you through it. No obligation, no jargon.
          </p>
          <div className="reveal" data-delay="200">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-[#3A3E30] font-medium transition-all duration-300 hover:shadow-[0_0_24px_rgba(138, 144, 112,0.4)]"
              style={{
                backgroundColor: "#8A9070",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              Get a quote →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
