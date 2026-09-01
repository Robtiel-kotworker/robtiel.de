import { getRequest } from "@tanstack/react-start/server";
import { APPS, type AppSlug } from "./catalog";

export type AppHitStat = {
  slug: AppSlug;
  title: string;
  uniqueIps: number;
};

type HitMap = Record<string, string[]>;

const CACHE_URL = "https://robtiel.internal/app-hits-v1";
const memory: HitMap = {};

function clientIp(request: Request | null): string {
  if (!request) return "unknown";
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
}

async function hashIp(ip: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`robtiel-app-hit|${ip}`));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function emptyMap(): HitMap {
  return Object.fromEntries(APPS.map((app) => [app.slug, [] as string[]]));
}

function mergeMap(raw: HitMap | null | undefined): HitMap {
  const next = emptyMap();
  if (!raw) return next;
  for (const app of APPS) {
    const list = raw[app.slug];
    next[app.slug] = Array.isArray(list) ? [...new Set(list.filter((h) => typeof h === "string"))] : [];
  }
  return next;
}

async function trySqlRecord(slug: AppSlug, ipHash: string): Promise<boolean> {
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    await sql.query(
      "insert into app_hits (slug, ip_hash) values ($1, $2) on conflict (slug, ip_hash) do nothing",
      [slug, ipHash],
    );
    return true;
  } catch {
    return false;
  }
}

async function trySqlStats(): Promise<AppHitStat[] | null> {
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql.query<{ slug: string; unique_ips: number }>(
      "select slug, count(*)::int as unique_ips from app_hits group by slug",
    );
    const bySlug = new Map(rows.map((row) => [row.slug, row.unique_ips]));
    return APPS.map((app) => ({
      slug: app.slug,
      title: app.title,
      uniqueIps: bySlug.get(app.slug) ?? 0,
    }));
  } catch {
    return null;
  }
}

function cacheApi(): Cache | null {
  try {
    const store = (globalThis as { caches?: { default?: Cache } }).caches?.default;
    return store ?? null;
  } catch {
    return null;
  }
}

async function readCacheMap(): Promise<HitMap> {
  const cache = cacheApi();
  if (!cache) return mergeMap(memory);
  const hit = await cache.match(new Request(CACHE_URL));
  if (!hit) return mergeMap(memory);
  try {
    return mergeMap((await hit.json()) as HitMap);
  } catch {
    return mergeMap(memory);
  }
}

async function writeCacheMap(map: HitMap): Promise<void> {
  Object.assign(memory, map);
  const cache = cacheApi();
  if (!cache) return;
  await cache.put(
    new Request(CACHE_URL),
    new Response(JSON.stringify(map), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=31536000",
      },
    }),
  );
}

export async function recordHit(slug: AppSlug): Promise<void> {
  const ipHash = await hashIp(clientIp(getRequest() ?? null));
  if (await trySqlRecord(slug, ipHash)) return;

  const map = await readCacheMap();
  const list = map[slug] ?? [];
  if (!list.includes(ipHash)) {
    map[slug] = [...list, ipHash];
    await writeCacheMap(map);
  }
}

export async function loadHitStats(): Promise<AppHitStat[]> {
  const fromSql = await trySqlStats();
  if (fromSql) return fromSql;
  const map = await readCacheMap();
  return APPS.map((app) => ({
    slug: app.slug,
    title: app.title,
    uniqueIps: map[app.slug]?.length ?? 0,
  }));
}
