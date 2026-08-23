import { useState } from "react";

/** Unique paths Safari has never 404-cached. Badge/hero JPEGs already work as <img>. */
export const COVER_PRIMARY = {
  "cube-timer": "/g/v5/cube-timer.jpg",
  brettanien: "/g/v5/brettanien.jpg",
  hardtekkmon: "/g/v5/hardtekkmon.jpg",
  "koch-eleg-trieb": "/g/v5/koch-eleg-trieb.jpg",
} as const;

const COVER_FALLBACK = {
  "cube-timer": "/covers/v5/cube-timer.jpg",
  brettanien: "/covers/v5/brettanien.jpg",
  hardtekkmon: "/covers/v5/hardtekkmon.jpg",
  "koch-eleg-trieb": "/covers/v5/koch-eleg-trieb.jpg",
} as const;

export type CoverSlug = keyof typeof COVER_PRIMARY;

export function GameCover({ slug, title }: { slug: CoverSlug; title: string }) {
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
    </div>
  );
}
