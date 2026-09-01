import { createFileRoute } from "@tanstack/react-router";
import { HazardMarks } from "@/components/icons";
import { getAppHitStats } from "@/lib/hits";

export const Route = createFileRoute("/traffic")({
  loader: () => getAppHitStats(),
  head: () => ({
    meta: [
      { title: "Traffic — robtiel" },
      {
        name: "description",
        content: "Verschiedene IP-Adressen pro App. Jede IP zählt nur einmal.",
      },
    ],
  }),
  component: TrafficPage,
});

function TrafficPage() {
  const stats = Route.useLoaderData();
  const total = stats.reduce((sum, row) => sum + row.uniqueIps, 0);
  const max = Math.max(1, ...stats.map((row) => row.uniqueIps));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:px-8 md:py-14">
      <p className="mb-3 flex items-center gap-2 font-display text-xs tracking-[0.28em] text-orange uppercase">
        <HazardMarks className="h-3 w-7" />
        Zähler
      </p>
      <h1 className="font-display text-4xl tracking-[0.08em] uppercase md:text-6xl">Traffic</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        Verschiedene IP-Adressen, die von dieser Seite auf eine App geklickt haben. Dieselbe IP zählt
        pro App nur einmal — egal wie oft sie den Button drückt.
      </p>

      <p className="mt-6 font-display text-sm tracking-[0.18em] text-orange uppercase">
        {total} verschiedene IPs insgesamt
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {stats.map((row) => {
          const width = Math.max(4, Math.round((row.uniqueIps / max) * 100));
          return (
            <li key={row.slug} className="metal-panel p-5">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-xl tracking-[0.08em] uppercase">{row.title}</h2>
                <p className="shrink-0 font-display text-2xl tracking-[0.06em] text-orange">
                  {row.uniqueIps}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {row.uniqueIps === 1 ? "verschiedene IP" : "verschiedene IPs"}
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg">
                <div className="h-full rounded-full bg-orange" style={{ width: `${width}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
