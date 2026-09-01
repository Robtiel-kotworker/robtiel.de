import { createServerFn } from "@tanstack/react-start";
import { APPS, type AppSlug } from "./catalog";

export const TRAFFIC_COOKIE = "rt_traffic";

const SLUGS = new Set<string>(APPS.map((app) => app.slug));
const DEVICE_KEY = "rt_device";

function asSlug(value: unknown): AppSlug {
  if (typeof value !== "string" || !SLUGS.has(value)) {
    throw new Error("Unbekannte App");
  }
  return value as AppSlug;
}

export function visitorDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = window.crypto.randomUUID();
      window.localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export const recordAppHit = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const source = data && typeof data === "object" ? (data as { slug?: unknown; deviceId?: unknown }) : {};
    const deviceId =
      typeof source.deviceId === "string" && source.deviceId.length <= 80 ? source.deviceId : "";
    return { slug: asSlug(source.slug), deviceId };
  })
  .handler(async ({ data }) => {
    try {
      const { recordHit } = await import("./hits.server");
      await recordHit(data.slug, data.deviceId || undefined);
    } catch (error) {
      console.error("[hits] record failed", error);
    }
    return { ok: true as const };
  });

export const getTrafficPage = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTrafficPage } = await import("./hits.server");
  return loadTrafficPage();
});

export const unlockTraffic = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const password =
      data && typeof data === "object" && "password" in data
        ? String((data as { password: unknown }).password)
        : "";
    return { password };
  })
  .handler(async ({ data }) => {
    const { unlockWithPassword } = await import("./hits.server");
    return unlockWithPassword(data.password);
  });
