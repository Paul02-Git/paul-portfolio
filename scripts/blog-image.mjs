#!/usr/bin/env node
/**
 * blog-image.mjs — source + optimize a blog image from Pexels.
 *
 * Searches the Pexels API, downloads the best landscape match, and writes an
 * optimized .webp into public/images/blog/ at the site's display widths.
 * Used by the /new-post skill, but runnable standalone.
 *
 * Usage:
 *   node scripts/blog-image.mjs "<search query>" <output-slug> [--width 1600] [--index 0] [--orientation landscape]
 *   node scripts/blog-image.mjs "<search query>" --list        # preview candidates (with descriptions), download nothing
 *
 * Examples:
 *   node scripts/blog-image.mjs "filipino developer working" --list
 *   node scripts/blog-image.mjs "filipino developer working" hire-ph-developer-hero --width 1600 --index 2
 *
 * RELEVANCE: always run --list first and pick the --index whose description best
 * matches the post's title/section. Don't ship a generic image that doesn't fit.
 *
 * Requires a free Pexels API key (https://www.pexels.com/api/) in the env:
 *   PEXELS_API_KEY=xxxxxxxx   (or set it in .env.local)
 *
 * Notes:
 * - Always pick a NEW, unique output-slug when replacing an image (never reuse a
 *   filename) so Next/CDN/browser caches can't serve a stale image. (House rule.)
 * - Prints photographer + source URL so attribution can be recorded if needed.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "blog");

// --- tiny arg parser -------------------------------------------------------
const BOOL_FLAGS = new Set(["list"]);
const argv = process.argv.slice(2);
const positionals = [];
const flags = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith("--")) {
    const name = argv[i].slice(2);
    if (BOOL_FLAGS.has(name)) {
      flags[name] = true;
    } else {
      flags[name] = argv[i + 1];
      i++;
    }
  } else {
    positionals.push(argv[i]);
  }
}
const [query, slug] = positionals;
const listMode = Boolean(flags.list);
const width = Number(flags.width ?? 1600);
const index = Number(flags.index ?? 0);
const orientation = flags.orientation ?? "landscape";
const quality = Number(flags.quality ?? 78);

if (!query || (!listMode && !slug)) {
  console.error(
    'Usage: node scripts/blog-image.mjs "<search query>" <output-slug> [--width 1600] [--index 0]\n' +
      '       node scripts/blog-image.mjs "<search query>" --list   (preview candidates)'
  );
  process.exit(1);
}

// --- load PEXELS_API_KEY (env or .env.local) -------------------------------
function readApiKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  for (const file of [".env.local", ".env"]) {
    const p = path.join(ROOT, file);
    if (fs.existsSync(p)) {
      const m = fs.readFileSync(p, "utf8").match(/^\s*PEXELS_API_KEY\s*=\s*(.+)\s*$/m);
      if (m) return m[1].replace(/^["']|["']$/g, "").trim();
    }
  }
  return null;
}

const apiKey = readApiKey();
if (!apiKey) {
  console.error(
    "✗ No PEXELS_API_KEY found.\n" +
      "  Get a free key at https://www.pexels.com/api/ and add to .env.local:\n" +
      "  PEXELS_API_KEY=your_key_here"
  );
  process.exit(2);
}

// --- search + download + optimize ------------------------------------------
const searchUrl =
  `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}` +
  `&per_page=15&orientation=${encodeURIComponent(orientation)}`;

const res = await fetch(searchUrl, { headers: { Authorization: apiKey } });
if (!res.ok) {
  console.error(`✗ Pexels API error ${res.status}: ${await res.text()}`);
  process.exit(3);
}
const data = await res.json();
const photos = data.photos ?? [];
if (photos.length === 0) {
  console.error(`✗ No Pexels results for "${query}". Try a broader query.`);
  process.exit(4);
}

// --- --list: preview candidates so the caller can judge relevance ----------
if (listMode) {
  console.log(`Candidates for "${query}" (orientation=${orientation}):`);
  photos.forEach((p, i) => {
    console.log(`[${i}] ${p.alt || "(no description)"}`);
    console.log(`     by ${p.photographer} — ${p.url}`);
  });
  console.log("\nPick the --index whose description best fits the post, then re-run without --list.");
  process.exit(0);
}

if (index >= photos.length) {
  console.error(`✗ --index ${index} out of range (only ${photos.length} results).`);
  process.exit(5);
}

const slugSafe = slug.replace(/[^a-z0-9-]+/gi, "-").replace(/(^-|-$)/g, "").toLowerCase();
const outPath = path.join(OUT_DIR, `${slugSafe}.webp`);

const photo = photos[index];
const srcUrl = photo.src?.original ?? photo.src?.large2x;

const imgRes = await fetch(srcUrl);
if (!imgRes.ok) {
  console.error(`✗ Failed to download image: ${imgRes.status}`);
  process.exit(6);
}
const buf = Buffer.from(await imgRes.arrayBuffer());

fs.mkdirSync(OUT_DIR, { recursive: true });
const meta = await sharp(buf)
  .resize({ width, withoutEnlargement: true })
  .webp({ quality })
  .toFile(outPath);

const kb = Math.round(fs.statSync(outPath).size / 1024);
console.log("✓ Saved", path.relative(ROOT, outPath));
console.log(`  ${meta.width}x${meta.height}  ${kb}KB  webp q${quality}`);
console.log(`  public path: /images/blog/${slugSafe}.webp`);
console.log(`  description: ${photo.alt || "(none)"}`);
console.log(`  attribution: Photo by ${photo.photographer} on Pexels (${photo.url})`);
// Emit a machine-readable line the skill can parse if needed.
console.log(`__RESULT__ ${JSON.stringify({ publicPath: `/images/blog/${slugSafe}.webp`, width: meta.width, height: meta.height, kb, alt: photo.alt ?? "", photographer: photo.photographer, source: photo.url })}`);
