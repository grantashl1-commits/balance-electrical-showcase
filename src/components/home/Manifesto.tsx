import { LightWords, Reveal } from "@/components/motion/Reveal";

export function Manifesto() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow text-ink-soft">Quiet craft</p>
          <div className="mt-4 h-px w-14 bg-ink/40" />
        </Reveal>
        <LightWords
          className="font-display text-[clamp(1.9rem,4.4vw,4.1rem)] leading-[1.12] text-ink md:col-span-9"
          text="We build the electrical layer of beautiful homes — the part you never notice, that makes everything else feel effortless. Light is the last thing you add and the first thing you feel."
        />
      </div>
    </section>
  );
}
