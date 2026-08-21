import { createFileRoute, Link } from "@tanstack/react-router";
import { Gamepad2 } from "lucide-react";
import { SoundcloudIcon, TwitchIcon } from "@/components/icons";
import { SOCIALS } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "robtiel — Hardtekk. Industrial. Gabber." },
      {
        name: "description",
        content:
          "Hardtekk, Industrial, Gabber. SoundCloud-Feed und Browser-Apps von robtiel. Est. 2021.",
      },
    ],
    links: [{ rel: "preload", as: "image", href: "/brand/hero.jpg" }],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-4">
      <h1 className="sr-only">robtiel</h1>

      <img
        src="/brand/wordmark.jpg"
        alt="robtiel"
        className="wordmark-mobile mt-4 w-full max-w-xl lg:hidden"
      />

      <div className="hidden min-h-24 flex-1 lg:block" aria-hidden="true" />

      <div className="my-6 flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:mb-1">
        <Link to="/feed" className="metal-btn w-full justify-center sm:w-auto sm:min-w-56">
          <span className="metal-btn-icon">
            <SoundcloudIcon className="size-5" />
          </span>
          SoundCloud Feed
        </Link>
        <Link to="/apps" className="metal-btn w-full justify-center sm:w-auto sm:min-w-56">
          <span className="metal-btn-icon">
            <Gamepad2 className="size-5" />
          </span>
          Apps / Games
        </Link>
        <a
          href={SOCIALS.twitch}
          target="_blank"
          rel="noopener noreferrer"
          className="metal-btn w-full justify-center sm:w-auto sm:min-w-56"
        >
          <span className="metal-btn-icon">
            <TwitchIcon className="size-5" />
          </span>
          Twitch Live
        </a>
      </div>
    </main>
  );
}
