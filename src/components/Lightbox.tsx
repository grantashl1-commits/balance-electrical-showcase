import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export type Shot = { src: string; title: string; place: string; note: string; aspect?: string };

/** Full-screen viewer for project photographs; arrow keys step through the set. */
export function Lightbox({
  shots,
  index,
  onIndex,
}: {
  shots: Shot[];
  index: number | null;
  onIndex: (i: number | null) => void;
}) {
  const shot = index === null ? null : shots[index];
  const step = (d: number) => index !== null && onIndex((index + d + shots.length) % shots.length);

  return (
    <Dialog open={index !== null} onOpenChange={(o) => !o && onIndex(null)}>
      <DialogContent
        className="theme-night max-w-[min(94vw,1200px)] gap-0 border-none bg-night p-0 text-ivory sm:rounded-none [&>button]:right-3 [&>button]:top-3 [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:p-2"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {shot && (
          <figure>
            <img
              src={shot.src}
              alt={`${shot.title}, ${shot.place}`}
              className="max-h-[78vh] w-full object-contain"
            />
            <figcaption className="flex items-center justify-between gap-6 p-5 md:p-6">
              <div>
                <DialogTitle className="display-caps text-xl font-normal tracking-[0.14em] text-ivory">
                  {shot.title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">
                  {shot.place} — {shot.note}
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="luxOutline"
                  size="icon"
                  className="size-11"
                  onClick={() => step(-1)}
                  aria-label="Previous"
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="luxOutline"
                  size="icon"
                  className="size-11"
                  onClick={() => step(1)}
                  aria-label="Next"
                >
                  <ArrowRight />
                </Button>
              </div>
            </figcaption>
          </figure>
        )}
      </DialogContent>
    </Dialog>
  );
}
