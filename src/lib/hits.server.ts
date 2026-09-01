import { getRequest } from "@tanstack/react-start/server";
import { APPS, type AppSlug } from "./catalog";

export const TRAFFIC_COOKIE = "rt_traffic";

export type AppHitStat = {
  slug: AppSlug;
  title: string;
  uniqueIps: number;
  uniqueDevices: number;
};

type HitSets = { ips: string[]; devices: string[] };
type HitMap = Record<string, HitSets>;

const CACHE_URL = "https://robtiel.internal/app-hits-v2";
const memory: HitMap = {};

function trafficSecret(): string {
  const fromEnv =
    typeof process !== "undefined" ? process.env.TRAFFIC_PASSWORD?.trim() : "";
  return fromEnv || "Hardtekk2021";
}

function hex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return hex(bytes);
}

export async function trafficToken(): Promise<string> {
  return sha(`rt-traffic-ok|${trafficSecret()}`);
}

function parseCookie(header: string | null, name: string): string {
  if (!header) return "";
  for (const part of header.split(";")) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (rawKey === name) return rest.join("=");
  }
  return "";
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length || a.length === 0) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function isTrafficUnlocked(): Promise<boolean> {
  const request = getRequest();
  const token = parseCookie(request?.headers.get("cookie") ?? null, TRAFFIC_COOKIE);
  return safeEqual(token, await trafficToken());
}

export async function unlockWithPassword(password: string): Promise<{ ok: true; token: string } | { ok: false }> {
  const expected = trafficSecret();
  const given = password.trim();
  if (!given || !safeEqual(given, expected)) return { ok: false };
  return { ok: true, token: await trafficToken() };
}

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

function emptySets(): HitSets {
  return { ips: [], devices: [] };
}

function emptyMap(): HitMap {
  return Object.fromEntries(APPS.map((app) => [app.slug, emptySets()]));
}

function asList(value: unknown): string[] {
  return Array.isArray(value) ? [...new Set(value.filter((item) => typeof item === "string"))] : [];
}

function mergeMap(raw: unknown): HitMap {
  const next = emptyMap();
  if (!raw || typeof raw !== "object") return next;
  const record = raw as Record<string, unknown>;
  for (const app of APPS) {
    const entry = record[app.slug];
    if (Array.isArray(entry)) {
      next[app.slug] = { ips: asList(entry), devices: [] };
    } else if (entry && typeof entry === "object") {
      const sets = entry as { ips?: unknown; devices?: unknown };
      next[app.slug] = { ips: asList(sets.ips), devices: asList(sets.devices) };
    }
  }
  return next;
}

async function trySqlRecord(slug: AppSlug, ipHash: string, deviceHash: string | null): Promise<boolean> {
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    await sql.query(
      "insert into app_hits (slug, ip_hash) values ($1, $2) on conflict (slug, ip_hash) do nothing",
      [slug, ipHash],
    );
    if (deviceHash) {
      await sql.query(
        "insert into app_devices (slug, device_hash) values ($1, $2) on conflict (slug, device_hash) do nothing",
        [slug, deviceHash],
      );
    }
    return true;
  } catch {
    return false;
  }
}

async function trySqlStats(): Promise<AppHitStat[] | null> {
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const ips = await sql.query<{ slug: string; unique_ips: number }>(
      "select slug, count(*)::int as unique_ips from app_hits group by slug",
    );
    let devices: { slug: string; unique_devices: number }[] = [];
    try {
      devices = await sql.query<{ slug: string; unique_devices: number }>(
        "select slug, count(*)::int as unique_devices from app_devices group by slug",
      );
    } catch {
      devices = [];
    }
    const ipBySlug = new Map(ips.map((row) => [row.slug, row.unique_ips]));
    const deviceBySlug = new Map(devices.map((row) => [row.slug, row.unique_devices]));
    return APPS.map((app) => ({
      slug: app.slug,
      title: app.title,
      uniqueIps: ipBySlug.get(app.slug) ?? 0,
      uniqueDevices: deviceBySlug.get(app.slug) ?? 0,
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
    return mergeMap(await hit.json());
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

function emptyStats(): AppHitStat[] {
  return APPS.map((app) => ({
    slug: app.slug,
    title: app.title,
    uniqueIps: 0,
    uniqueDevices: 0,
  }));
}

export async function recordHit(slug: AppSlug, deviceId?: string): Promise<void> {
  const ipHash = await sha(`robtiel-app-hit|${clientIp(getRequest() ?? null)}`);
  const deviceHash = deviceId ? await sha(`robtiel-device|${deviceId}`) : null;
  if (await trySqlRecord(slug, ipHash, deviceHash)) return;

  const map = await readCacheMap();
  const sets = map[slug] ?? emptySets();
  let changed = false;
  if (!sets.ips.includes(ipHash)) {
    sets.ips = [...sets.ips, ipHash];
    changed = true;
  }
  if (deviceHash && !sets.devices.includes(deviceHash)) {
    sets.devices = [...sets.devices, deviceHash];
    changed = true;
  }
  if (changed) {
    map[slug] = sets;
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
    uniqueIps: map[app.slug]?.ips.length ?? 0,
    uniqueDevices: map[app.slug]?.devices.length ?? 0,
  }));
}

export async function loadTrafficPage(): Promise<{ unlocked: boolean; stats: AppHitStat[] }> {
  if (!(await isTrafficUnlocked())) return { unlocked: false, stats: emptyStats() };
  try {
    return { unlocked: true, stats: await loadHitStats() };
  } catch (error) {
    console.error("[hits] stats failed", error);
    return { unlocked: true, stats: emptyStats() };
  }
}
