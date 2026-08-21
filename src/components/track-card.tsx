import { Heart, Play } from "lucide-react";
import type { Track } from "@/lib/catalog";
import { usePlayer } from "@/lib/player";
import { cn } from "@/lib/utils";

function hashSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function Waveform({ seed, tone }: { seed: string; tone: "orange" | "lime" }) {
  const bars = Array.from({ length: 36 }, (_, i) => {
    const h = hashSeed(`${seed}:${i}`);
    return 18 + (h % 82);
  });
  return (
    <div className="flex h-10 items-end gap-px" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-1 rounded-sm",
            tone === "lime" ? "bg-lime/80" : "bg-steel-hi/80",
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function TrackCard({
  track,
  tone = "orange",
  rank,
}: {
  track: Track;
  tone?: "orange" | "lime";
  rank?: number;
}) {
  const current = usePlayer((s) => s.current);
  const play = usePlayer((s) => s.play);
  const active = current?.id === track.id;

  return (
    <article
      className={cn(
        "metal-panel relative flex flex-col gap-3 p-4",
        tone === "lime" && "metal-panel-lime",
        active && "ring-1 ring-orange",
      )}
    >
      {rank != null ? (
        <span
          className={cn(
            "absolute top-3 right-3 grid size-7 place-items-center rounded-sm font-display text-sm",
            tone === "lime" ? "bg-lime text-bg" : "bg-orange text-bg",
          )}
        >
          {rank}
        </span>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => play(track)}
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-md",
            tone === "lime" ? "bg-lime text-bg" : "bg-orange text-bg",
          )}
          aria-label={`${track.title} abspielen`}
        >
          <Play className="size-4 ml-0.5" fill="currentColor" />
        </button>
        <Waveform seed={track.id} tone={tone} />
      </div>

      <div>
        <h3 className="font-display text-lg leading-tight tracking-wide uppercase">
          {track.title}
        </h3>
        <p className="mt-1 text-xs tracking-[0.14em] text-muted uppercase">
          {track.subtitle}
        </p>
      </div>

      <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-muted">
        {track.duration ? <span>{track.duration}</span> : null}
        <span>{track.genre}</span>
        <span aria-hidden="true">|</span>
        <span>{track.ago}</span>
      </p>

      {tone === "lime" && track.likes ? (
        <p className="flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Heart className="size-3.5 text-orange" />
            {track.likes}
          </span>
          {track.plays && track.plays !== "—" ? <span>▶ {track.plays}</span> : null}
        </p>
      ) : null}
    </article>
  );
}
