import { Globe } from "lucide-react";
import type { APPS, AppTone } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { GameCover } from "./game-cover";
import { HazardMarks } from "./icons";

const TONE_BTN: Record<AppTone, string> = {
  orange: "text-orange",
  lime: "text-lime",
  red: "text-red",
};

const TONE_PANEL: Record<AppTone, string> = {
  orange: "",
  lime: "metal-panel-lime",
  red: "metal-panel-red",
};

export function AppCard({ app }: { app: (typeof APPS)[number] }) {
  return (
    <article className={cn("metal-panel flex flex-col p-5 md:p-6", TONE_PANEL[app.tone])}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="font-display text-2xl leading-none tracking-[0.08em] uppercase md:text-3xl">
          {app.title}
        </h2>
        <HazardMarks className={cn("mt-1 h-3 w-8 shrink-0", TONE_BTN[app.tone])} />
      </div>

      <div className="mb-5">
        <GameCover slug={app.slug} title={app.title} />
      </div>

      <p className="mb-6 text-base leading-relaxed text-muted">{app.description}</p>

      <a
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-bg/70 px-4 font-display text-sm tracking-[0.18em] uppercase",
          "shadow-[0_0_0_1px_rgb(255_255_255/0.08)] transition-shadow hover:shadow-[0_0_0_1px_currentColor]",
          TONE_BTN[app.tone],
        )}
      >
        <Globe className="size-4" />
        Im Browser spielen
      </a>
    </article>
  );
}
