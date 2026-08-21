import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { SOCIALS } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { SoundcloudIcon, TwitchIcon, YoutubeIcon } from "./icons";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/feed", label: "Feed" },
  { to: "/apps", label: "Apps / Games" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("relative z-30", overlay ? "bg-transparent" : "bg-bg/80 backdrop-blur-md")}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link to="/" className="flex min-h-11 items-center gap-3">
          <img
            src="/brand/rt-badge.jpg"
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-full"
          />
          <span className="leading-none">
            <span className="block font-display text-xl tracking-[0.18em] uppercase">robtiel</span>
            <span className="mt-1 block text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Hardtekk. Industrial. Raw.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Hauptnavigation">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn("nav-pill", active && "nav-pill-active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-0.5">
          <a
            href={SOCIALS.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-md text-muted transition-colors hover:text-orange-hi"
            aria-label="SoundCloud"
          >
            <SoundcloudIcon className="size-5" />
          </a>
          <a
            href={SOCIALS.twitch}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-md text-muted transition-colors hover:text-orange-hi"
            aria-label="Twitch"
          >
            <TwitchIcon className="size-5" />
          </a>
          <a
            href={SOCIALS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-md text-muted transition-colors hover:text-orange-hi"
            aria-label="YouTube"
          >
            <YoutubeIcon className="size-5" />
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-fg md:hidden"
            aria-expanded={open}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-bg/95 px-4 py-3 md:hidden" aria-label="Mobil">
          <ul className="grid gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-11 items-center font-display tracking-[0.16em] uppercase",
                    pathname === item.to ? "text-orange" : "text-fg",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SOCIALS.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center font-display tracking-[0.16em] text-muted uppercase"
              >
                Twitch
              </a>
            </li>
            <li>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center font-display tracking-[0.16em] text-muted uppercase"
              >
                YouTube
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
