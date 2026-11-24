// Extracts clean site screenshots from the laptop mockups in assets-src/work (Name_1..3.png)
// and writes web-ready WebP files to public/images/work/screens/, plus favicons.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src/work";
const OUT = "public/images/work/screens";
// screen area of the MacBook template (3883×2586), just below the macOS menu bar
const SCREEN = { left: 362, top: 250, width: 3154, height: 1946 };
const SLUGS = { Burak: "burak-technologies", Byte: "byte-forge-technologies", Product: "product-house", rpa: "reparametrize-ateliers" };

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  const m = file.match(/^(.+)_([123])\.png$/);
  if (!m || !SLUGS[m[1]]) continue;
  const out = path.join(OUT, `${SLUGS[m[1]]}-${m[2]}.webp`);
  await sharp(path.join(SRC, file)).extract(SCREEN).resize({ width: 1800 }).webp({ quality: 82 }).toFile(out);
  console.log("✓", out);
}

await sharp("assets-src/favicon.png").resize(512).png().toFile("app/icon.png");
await sharp("assets-src/favicon.png").resize(180).png().toFile("app/apple-icon.png");
