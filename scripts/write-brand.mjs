import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  ["hero.jpg.b64", "public/brand/hero.jpg"],
  ["bunker.jpg.b64", "public/brand/bunker.jpg"],
  ["wordmark.jpg.b64", "public/brand/wordmark.jpg"],
  ["rt-badge.jpg.b64", "public/brand/rt-badge.jpg"],
  ["cube.jpg.b64", "public/brand/cube.jpg"],
  ["brettanien.jpg.b64", "public/brand/brettanien.jpg"],
  ["hardtekkmon.jpg.b64", "public/brand/hardtekkmon.jpg"],
  ["og.jpg.b64", "public/og.jpg"],
];

for (const [b64Name, destRel] of files) {
  const dest = join(root, destRel);
  mkdirSync(dirname(dest), { recursive: true });
  const b64 = readFileSync(join(root, "scripts/brand", b64Name), "utf8").replace(/\s+/g, "");
  writeFileSync(dest, Buffer.from(b64, "base64"));
  console.log("wrote", destRel);
}
