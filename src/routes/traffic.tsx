import { useState, type FormEvent } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { HazardMarks } from "@/components/icons";
import { TRAFFIC_COOKIE, getTrafficPage, unlockTraffic } from "@/lib/hits";

export const Route = createFileRoute("/traffic")({
  loader: () => getTrafficPage(),
  head: () => ({
    meta: [
      { title: "Traffic — robtiel" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TrafficPage,
});

function TrafficPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await unlockTraffic({ data: { password } });
      if (!result.ok) {
        setError("Falsches Passwort.");
        return;
      }
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${TRAFFIC_COOKIE}=${result.token}; Path=/; Max-Age=2592000; SameSite=Lax${secure}`;
      setPassword("");
      await router.invalidate();
    } finally {
      setPending(false);
    }
  }

  if (!data.unlocked) {
    return (
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-10 md:px-8 md:py-14">
        <p className="mb-3 flex items-center gap-2 font-display text-xs tracking-[0.28em] text-orange uppercase">
          <HazardMarks className="h-3 w-7" />
          Gesperrt
        </p>
        <h1 className="font-display text-4xl tracking-[0.08em] uppercase">Traffic</h1>
        <p className="mt-3 text-muted">Nur mit Passwort.</p>
        <form onSubmit={onSubmit} className="metal-panel mt-8 flex flex-col gap-4 p-6">
          <label className="font-display text-xs tracking-[0.18em] text-muted uppercase">
            Passwort
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-md border border-border bg-bg px-3 text-base text-fg outline-none focus:border-orange"
            />
          </label>
          {error ? <p className="text-sm text-red">{error}</p> : null}
          <button type="submit" disabled={pending} className="metal-btn">
            {pending ? "Prüfen…" : "Öffnen"}
          </button>
        </form>
      </main>
    );
  }

  const { stats } = data;
  const totalIps = stats.reduce((sum, row) => sum + row.uniqueIps, 0);
  const totalDevices = stats.reduce((sum, row) => sum + row.uniqueDevices, 0);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:px-8 md:py-14">
      <p className="mb-3 flex items-center gap-2 font-display text-xs tracking-[0.28em] text-orange uppercase">
        <HazardMarks className="h-3 w-7" />
        Zähler
      </p>
      <h1 className="font-display text-4xl tracking-[0.08em] uppercase md:text-6xl">Traffic</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        Verschiedene IP-Adressen und Geräte, die von dieser Seite auf eine App geklickt haben.
        Dieselbe IP und dasselbe Gerät zählen pro App nur einmal.
      </p>
      <p className="mt-6 font-display text-sm tracking-[0.18em] text-orange uppercase">
        {totalIps} IPs · {totalDevices} Geräte
      </p>

      <div className="metal-panel mt-8 overflow-x-auto p-0">
        <table className="w-full min-w-[28rem] text-left">
          <thead>
            <tr className="border-b border-border font-display text-xs tracking-[0.18em] text-muted uppercase">
              <th className="px-5 py-4 font-medium">App</th>
              <th className="px-5 py-4 font-medium">IPs</th>
              <th className="px-5 py-4 font-medium">Geräte</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((row) => (
              <tr key={row.slug} className="border-b border-border/70 last:border-0">
                <td className="px-5 py-4 font-display text-lg tracking-[0.06em] uppercase">{row.title}</td>
                <td className="px-5 py-4 font-display text-xl text-orange">{row.uniqueIps}</td>
                <td className="px-5 py-4 font-display text-xl text-orange">{row.uniqueDevices}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
