import type { ReactNode } from "react";
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PlayerDock } from "@/components/player-dock";
import { usePlayer } from "@/lib/player";
import { cn } from "@/lib/utils";
import appCss from "../styles.css?url";

const APP_NAME = "robtiel";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "robtiel — Hardtekk. Industrial. Raw. Est. 2021. Tracks, Sets und Browser-Apps.",
      },
      { name: "theme-color", content: "#070708" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="de" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg">
        <Shell>
          <Outlet />
        </Shell>
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const playing = usePlayer((s) => s.current);

  return (
    <div className="relative min-h-dvh">
      {isHome ? (
        <>
          <img
            src="/brand/hero.jpg"
            alt=""
            className="pointer-events-none fixed inset-0 hidden h-full w-full object-cover object-[center_38%] lg:block"
          />
          <img
            src="/brand/bunker.jpg"
            alt=""
            className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-55 lg:hidden"
          />
        </>
      ) : (
        <img
          src="/brand/bunker.jpg"
          alt=""
          className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-40"
        />
      )}
      <div
        className={cn(
          "pointer-events-none fixed inset-0",
          isHome
            ? "bg-gradient-to-b from-bg/55 via-bg/10 to-bg lg:from-bg/30 lg:via-transparent lg:to-bg"
            : "bg-gradient-to-b from-bg/88 via-bg/82 to-bg",
        )}
      />
      <div className="noise-layer" />
      <div className={cn("relative z-10 flex min-h-dvh flex-col", playing && "pb-28")}>
        <SiteHeader overlay={isHome} />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter cinematic={isHome} />
      </div>
      <PlayerDock />
    </div>
  );
}

function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-display text-xs tracking-[0.32em] text-orange uppercase">Sektor 404</p>
      <h1 className="mt-3 font-display text-4xl tracking-[0.08em] uppercase">Nicht gefunden</h1>
      <p className="mt-3 text-muted">Dieser Schacht ist leer. Zurück an die Oberfläche.</p>
      <Link to="/" className="metal-btn mt-8">
        Home
      </Link>
    </main>
  );
}
