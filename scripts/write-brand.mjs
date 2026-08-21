import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandDir = join(root, "scripts/brand");

const files = [
  ["hero.jpg", "public/brand/hero.jpg"],
  ["bunker.jpg", "public/brand/bunker.jpg"],
  ["wordmark.jpg", "public/brand/wordmark.jpg"],
  ["rt-badge.jpg", "public/brand/rt-badge.jpg"],
  ["cube.jpg", "public/brand/cube.jpg"],
  ["brettanien.jpg", "public/brand/brettanien.jpg"],
  ["hardtekkmon.jpg", "public/brand/hardtekkmon.jpg"],
  ["og.jpg", "public/og.jpg"],
];

function readB64(name) {
  const whole = join(brandDir, `${name}.b64`);
  if (existsSync(whole)) {
    return readFileSync(whole, "utf8").replace(/\s+/g, "");
  }
  const parts = [];
  for (let i = 0; i < 50; i += 1) {
    const p = join(brandDir, `${name}.b64.${String(i).padStart(2, "0")}`);
    if (!existsSync(p)) break;
    parts.push(readFileSync(p, "utf8").replace(/\s+/g, ""));
  }
  if (!parts.length) throw new Error(`missing brand asset ${name}`);
  return parts.join("");
}

for (const [name, destRel] of files) {
  const dest = join(root, destRel);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(readB64(name), "base64"));
  console.log("wrote", destRel);
}
