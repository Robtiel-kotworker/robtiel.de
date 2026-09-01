import { createFileRoute } from "@tanstack/react-router";
import { AppCard } from "@/components/app-card";
import { COVER_PRIMARY } from "@/components/game-cover";
import { HazardMarks } from "@/components/icons";
import { APPS } from "@/lib/catalog";
import { getAppHitStats } from "@/lib/hits";

export const Route = createFileRoute("/apps")({
  loader: () => getAppHitStats(),
  head: () => ({
    meta: [
      { title: "Apps / Games — robtiel" },
      {
        name: "description",
        content:
          "Digitale Werkzeuge. Hardtekk Mentalität. Countdown On Your Knees, Koch Eleg-Trieb, Hardtekkmon, Way to Brettanien, Cube Timer.",
      },
    ],
    links: Object.values(COVER_PRIMARY).map((href) => ({
      rel: "preload" as const,
      as: "image",
      href,
    })),
  }),
  component: AppsPage,
});

function AppsPage() {
  const stats = Route.useLoaderData();
  const uniqueBySlug = Object.fromEntries(stats.map((row) => [row.slug, row.uniqueIps]));

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8 md:py-12" data-covers="v5">
      <p className="mb-3 flex items-center gap-2 font-display text-xs tracking-[0.28em] text-orange uppercase">
        <HazardMarks className="h-3 w-7" />
        Digital
      </p>
      <h1 className="font-display text-4xl tracking-[0.08em] uppercase md:text-6xl">Apps / Games</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">Digitale Werkzeuge. Hardtekk Mentalität.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {APPS.map((app) => (
          <AppCard key={app.slug} app={app} uniqueIps={uniqueBySlug[app.slug] ?? 0} />
        ))}
      </div>
    </main>
  );
}
