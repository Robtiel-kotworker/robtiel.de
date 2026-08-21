import { X } from "lucide-react";
import { soundcloudEmbed, usePlayer } from "@/lib/player";

export function PlayerDock() {
  const current = usePlayer((s) => s.current);
  const stop = usePlayer((s) => s.stop);

  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-orange/40 bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2 md:px-8">
        <iframe
          title={`SoundCloud: ${current.title}`}
          allow="autoplay"
          src={soundcloudEmbed(current.url, true)}
          className="h-[92px] w-full rounded-md bg-surface"
        />
        <button
          type="button"
          onClick={stop}
          className="grid size-11 shrink-0 place-items-center rounded-md text-muted hover:text-fg"
          aria-label="Player schließen"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}
