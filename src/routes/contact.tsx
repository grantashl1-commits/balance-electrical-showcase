import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a Quote | Electrician Taupō | Balance Electrical" },
      { name: "description", content: "Request a quote from Victoria Grant, registered electrician in Taupō. New builds, solar, renovations, heat pumps, EV chargers and more across the Taupō district." },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "NZ-WKO" },
      { name: "geo.placename", content: "Taupo" },
      { property: "og:title", content: "Get a Quote | Balance Electrical" },
      { property: "og:description", content: "Request a quote from Victoria Grant, registered electrician in Taupō. New builds, solar, renovations, and more." },
      { property: "og:image", content: photos.fountainEntry },
    ],
    links: [
      { rel: "canonical", href: "https://www.balanceelectrical.co.nz/contact" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [serviceType, setServiceType] = useState("New residential build");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam) setServiceType(decodeURIComponent(serviceParam));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const full_name = (formData.get("name") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const suburb = (formData.get("location") as string || "").trim();
    const service_type = (formData.get("type") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    setFirstName(full_name.split(" ")[0]);

    try {
      const { error: invokeError } = await supabase.functions.invoke("send-balance-enquiry", {
        body: { full_name, phone, email, suburb, service_type, message },
      });

      if (invokeError) {
        console.error("Edge function error:", invokeError);
        setError(true);
        setLoading(false);
        return;
      }

      setSent(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError(true);
    }

    setLoading(false);
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <img src={photos.fountainEntry} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">Contact</p>
          <h1 className="font-display text-5xl md:text-7xl text-balance max-w-4xl leading-[1.05]">
            Tell us about your project.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            New build, renovation, or a single beautifully-lit room. A short note from you, a thoughtful reply from Victoria.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-[1.4fr_1fr] gap-14">
        <form
          onSubmit={handleSubmit}
          className="bg-card/70 border border-border/60 rounded-lg p-8 md:p-10 glow"
        >
          {loading ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl text-primary mb-3">Sending...</p>
              <p className="text-muted-foreground">One moment.</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl text-primary mb-3">Something went wrong.</p>
              <p className="text-muted-foreground">
                Call Victoria directly on{" "}
                <a href="tel:+64279162077" className="text-primary hover:underline">027 916 2077</a>.
              </p>
              <button
                type="button"
                onClick={() => setError(false)}
                className="mt-6 inline-flex items-center px-6 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all text-sm"
              >
                Try again
              </button>
            </div>
          ) : sent ? (
            <div className="py-12 text-center">
              <p className="font-display text-3xl text-primary mb-3">Thanks{firstName ? ` ${firstName}` : ""}.</p>
              <p className="text-muted-foreground">Victoria will be in touch within 24 hours.</p>
              <a href="tel:+64279162077" className="block mt-4 font-display text-xl text-foreground hover:text-primary">
                027 916 2077
              </a>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Location" name="location" placeholder="Taupō, Kinloch…" />
              </div>
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Project type
                </label>
                <select
                  name="type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-input/60 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>New residential build</option>
                  <option>Renovation or addition</option>
                  <option>Lighting design</option>
                  <option>Solar & battery storage</option>
                  <option>Air conditioning & heat pumps</option>
                  <option>EV charging</option>
                  <option>Heat pump installation</option>
                  <option>Pre-purchase report</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  About your project
                </label>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full bg-input/60 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="A few sentences — timing, scope, anyone else involved."
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-8 w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
              >
                Send to Victoria
              </button>
            </>
          )}
        </form>

        <aside className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Direct</p>
            <a href="mailto:enquire@balanceelectrical.co.nz" className="block font-display text-2xl text-foreground hover:text-primary">
              enquire@balanceelectrical.co.nz
            </a>
            <a href="tel:+64279162077" className="block font-display text-2xl text-foreground hover:text-primary mt-2">
              +64 27 916 2077
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Working across</p>
            <p className="text-muted-foreground">Taupō · Kinloch · Acacia Bay · Kuratau · Turangi · Taupō district.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Response</p>
            <p className="text-muted-foreground">Within 24 hours. Site visits booked from there.</p>
          </div>
          <img src={photos.ewrbLogo} alt="EWRB Registered" className="h-14 w-auto opacity-90" />
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}{required && <span className="text-primary"> ·</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-input/60 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
