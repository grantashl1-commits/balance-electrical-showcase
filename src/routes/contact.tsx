import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Balance Electrical" },
      { name: "description", content: "Request a quote or start a conversation with Victoria at Balance Electrical." },
      { property: "og:title", content: "Contact Balance Electrical" },
      { property: "og:description", content: "Request a quote or start a conversation with Victoria." },
      { property: "og:image", content: photos.fountainEntry },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

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
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-card/70 border border-border/60 rounded-lg p-8 md:p-10 glow"
        >
          {sent ? (
            <div className="py-12 text-center">
              <p className="font-display text-3xl text-primary mb-3">Thank you.</p>
              <p className="text-muted-foreground">Victoria will reply within two working days.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Location" name="location" placeholder="Queenstown, Wānaka…" />
              </div>
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Project type
                </label>
                <select
                  name="type"
                  className="w-full bg-input/60 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>New residential build</option>
                  <option>Renovation or addition</option>
                  <option>Lighting design</option>
                  <option>EV charging</option>
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
            <a href="mailto:victoria@balanceelectrical.co.nz" className="block font-display text-2xl text-foreground hover:text-primary">
              victoria@balanceelectrical.co.nz
            </a>
            <a href="tel:+64210000000" className="block font-display text-2xl text-foreground hover:text-primary mt-2">
              +64 21 000 000
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Working across</p>
            <p className="text-muted-foreground">Queenstown · Wānaka · Arrowtown · Hāwea · Cromwell · Central Otago.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Response</p>
            <p className="text-muted-foreground">Within two working days. Site visits booked from there.</p>
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
