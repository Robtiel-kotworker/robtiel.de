import { createServerFn } from "@tanstack/react-start";
import { APPS, type AppSlug } from "./catalog";

const SLUGS = new Set<string>(APPS.map((app) => app.slug));

function asSlug(value: unknown): AppSlug {
  if (typeof value !== "string" || !SLUGS.has(value)) {
    throw new Error("Unbekannte App");
  }
  return value as AppSlug;
}

export const recordAppHit = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const slug = asSlug(
      data && typeof data === "object" && "slug" in data ? (data as { slug: unknown }).slug : null,
    );
    return { slug };
  })
  .handler(async ({ data }) => {
    try {
      const { recordHit } = await import("./hits.server");
      await recordHit(data.slug);
    } catch (error) {
      console.error("[hits] record failed", error);
    }
    return { ok: true as const };
  });

export const getAppHitStats = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { loadHitStats } = await import("./hits.server");
    return await loadHitStats();
  } catch (error) {
    console.error("[hits] stats failed", error);
    return APPS.map((app) => ({ slug: app.slug, title: app.title, uniqueIps: 0 }));
  }
});
