import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { photos } from "@/lib/photos";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={photos.logo} alt="Balance Electrical" className="h-9 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-9 text-sm tracking-wide">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 inline-flex items-center px-5 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Request a quote
            </Link>
          </nav>
          <button
            className="md:hidden text-foreground/80 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border/60 bg-background/95">
            <nav className="flex flex-col px-6 py-4 gap-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-muted-foreground hover:text-primary"
                  activeProps={{ className: "py-2 text-primary" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={photos.logo} alt="Balance Electrical" className="h-10 w-auto mb-5" />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Considered residential electrical work across Taupō and the surrounding district.
              Owner-operated by Victoria — every detail measured, every finish quiet.
            </p>
            <img
              src={photos.ewrbLogo}
              alt="Licensed Electrical Worker — EWRB Registered"
              className="h-12 w-auto mt-6 opacity-80"
            />
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-primary transition-colors">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:enquire@balanceelectrical.co.nz" className="hover:text-primary">enquire@balanceelectrical.co.nz</a></li>
              <li><a href="tel:+64279162077" className="hover:text-primary">+64 27 916 2077</a></li>
              <li>Taupō · Central North Island · New Zealand</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Balance Electrical Ltd. All rights reserved.</p>
            <p>Licensed Electrical Worker · EWRB Registered</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
