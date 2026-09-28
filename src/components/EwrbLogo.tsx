import { photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

/*
  The EWRB logo ships as blue + navy on transparent. A filter flattens it to one
  site colour (it works on a cross-origin <img>, unlike a CSS mask):
  brightness(0) → solid silhouette, invert → grey level, sepia/saturate → warm tone.
*/
const TONES = {
  // Stone-pale on the dark footer and night panels.
  light: "[filter:brightness(0)_invert(0.72)_sepia(0.55)_saturate(0.55)]",
  // Ink on the stone pages.
  dark: "[filter:brightness(0)_invert(0.11)_sepia(0.4)]",
} as const;

export function EwrbLogo({
  tone,
  className,
  alt = "Licensed Electrical Worker — EWRB Registered",
}: {
  tone: keyof typeof TONES;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={photos.ewrbLogo}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn("w-auto", TONES[tone], className)}
    />
  );
}
