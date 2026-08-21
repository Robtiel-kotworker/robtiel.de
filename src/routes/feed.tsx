import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HazardMarks } from "@/components/icons";
import { TrackCard } from "@/components/track-card";
import { LATEST_TRACKS, SOCIALS, TOP_TRACKS } from "@/lib/catalog";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "SoundCloud Feed — robtiel" },
      {
        name: "description",
        content: "Die neuesten Hardtekk Releases und die beliebtesten Tracks von robtiel.",
      },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8 md:py-12">
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 font-display text-xs tracking-[0.28em] text-orange uppercase">
              <HazardMarks className="h-3 w-7" />
              Feed
            </p>
            <h1 className="font-display text-3xl tracking-[0.08em] uppercase md:text-5xl">
              Letzte 5 Tracks
            </h1>
            <p className="mt-2 text-muted">Die neuesten Hardtekk Releases.</p>
          </div>
          <a
            href={SOCIALS.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-display text-sm tracking-[0.16em] text-orange uppercase hover:text-orange-hi"
          >
            Alle anzeigen
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LATEST_TRACKS.map((track) => (
            <TrackCard key={track.id} track={track} tone="orange" />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 font-display text-xs tracking-[0.28em] text-lime uppercase">
              <HazardMarks className="h-3 w-7" />
              Ranking
            </p>
            <h2 className="font-display text-3xl tracking-[0.08em] uppercase md:text-5xl">
              Top 5 beliebteste Tracks
            </h2>
            <p className="mt-2 text-muted">Am häufigsten geliked & gehört.</p>
          </div>
          <a
            href={SOCIALS.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-display text-sm tracking-[0.16em] text-lime uppercase hover:text-fg"
          >
            Alle anzeigen
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TOP_TRACKS.map((track, i) => (
            <TrackCard key={track.id} track={track} tone="lime" rank={i + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
