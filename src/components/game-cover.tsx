import { useState } from "react";

/** Unique paths Safari has never 404-cached. Badge/hero JPEGs already work as <img>. */
export const COVER_PRIMARY = {
  "countdown-on-your-knees": "/g/v5/countdown-on-your-knees.jpg",
  "koch-eleg-trieb": "/g/v5/koch-eleg-trieb.jpg",
  hardtekkmon: "/g/v5/hardtekkmon.jpg",
  brettanien: "/g/v5/brettanien.jpg",
  "cube-timer": "/g/v5/cube-timer.jpg",
} as const;

const COVER_FALLBACK = {
  "countdown-on-your-knees": "/covers/v5/countdown-on-your-knees.jpg",
  "koch-eleg-trieb": "/covers/v5/koch-eleg-trieb.jpg",
  hardtekkmon: "/covers/v5/hardtekkmon.jpg",
  brettanien: "/covers/v5/brettanien.jpg",
  "cube-timer": "/covers/v5/cube-timer.jpg",
} as const;

export type CoverSlug = keyof typeof COVER_PRIMARY;

export function GameCover({
  slug,
  title,
  fsk18 = false,
}: {
  slug: CoverSlug;
  title: string;
  fsk18?: boolean;
}) {
  const primary = COVER_PRIMARY[slug];
  const fallback = COVER_FALLBACK[slug];
  const [src, setSrc] = useState(primary);

  return (
    <div
      data-cover={slug}
      className="relative aspect-square overflow-hidden rounded-md bg-[#0a0a0c]"
      style={{
        backgroundImage: `url("${fallback}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={src}
        alt={title}
        width={800}
        height={800}
        decoding="async"
        loading="eager"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          const el = event.currentTarget;
          if (src !== fallback) {
            setSrc(fallback);
            return;
          }
          el.style.opacity = "0";
        }}
      />
      {fsk18 ? <Fsk18Marker /> : null}
    </div>
  );
}

function Fsk18Marker() {
  return (
    <div
      className="pointer-events-none absolute right-3 top-3 z-10 grid size-[3.25rem] place-items-center rounded-full bg-red text-white shadow-[0_0_0_2px_#fff,0_6px_18px_rgb(0_0_0/0.45)] md:right-4 md:top-4 md:size-16"
      aria-label="Freigegeben ab 18 Jahren"
      title="FSK 18"
    >
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-[0.5rem] tracking-[0.22em] md:text-[0.6rem]">FSK</span>
        <span className="font-display text-[1.55rem] tracking-tight md:text-[1.85rem]">18</span>
      </span>
    </div>
  );
}
