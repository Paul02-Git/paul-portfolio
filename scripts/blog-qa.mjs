#!/usr/bin/env node
/**
 * blog-qa.mjs — structural QA for a blog post in data/portfolio.ts.
 *
 * One command (so the /new-post pipeline doesn't need a compound shell line that
 * trips permission prompts). Checks the post identified by <slug>:
 *   - HTML tag balance (div/ul/ol/li/p/h2/h3/h4) + img is self-closing
 *   - at least 3 <h2> (renderer needs them for the mid-article CTA split)
 *   - every referenced image (hero + inline) exists under public/
 *   - every internal link (/blog/<slug> + routes) resolves
 *   - no "Think with Google" citation (house rule)
 *
 * Usage:  node scripts/blog-qa.mjs <slug>
 * Exits non-zero (and prints ✗ lines) if anything fails.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/blog-qa.mjs <slug>");
  process.exit(1);
}

const src = fs.readFileSync(path.join(ROOT, "data", "portfolio.ts"), "utf8");
const allSlugs = new Set([...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

const slugIdx = src.indexOf(`slug: "${slug}"`);
if (slugIdx === -1) {
  console.error(`✗ No post with slug "${slug}" found in data/portfolio.ts`);
  process.exit(1);
}

// Hero image: the `image:` field just above the slug in the same object.
const imageField = src.slice(0, slugIdx).match(/image:\s*"([^"]+)"(?![\s\S]*image:\s*")/);
const heroImage = imageField ? imageField[1] : null;

// Content: the template literal after this slug (content has no backticks inside).
const contentOpen = src.indexOf("content: `", slugIdx);
const contentStart = contentOpen + "content: `".length;
const contentEnd = src.indexOf("`", contentStart);
const content = src.slice(contentStart, contentEnd);

const problems = [];
const ok = (m) => console.log(`✓ ${m}`);

// 1) Tag balance
for (const tag of ["div", "ul", "ol", "li", "p", "h2", "h3", "h4"]) {
  const open = (content.match(new RegExp(`<${tag}[\\s>]`, "g")) || []).length;
  const close = (content.match(new RegExp(`</${tag}>`, "g")) || []).length;
  if (open !== close) problems.push(`<${tag}> unbalanced: ${open} open / ${close} close`);
}
if (/<\/img>/.test(content)) problems.push("<img> should be self-closing (found </img>)");
const h2count = (content.match(/<h2[\s>]/g) || []).length;
if (h2count < 3) problems.push(`only ${h2count} <h2> — need ≥3 for the mid-article CTA split`);
else ok(`${h2count} <h2> sections`);

// 2) Images exist (hero + inline)
const imgs = new Set();
if (heroImage) imgs.add(heroImage);
for (const m of content.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) imgs.add(m[1]);
for (const p of imgs) {
  const fileOk = p.startsWith("/") && fs.existsSync(path.join(ROOT, "public", p));
  if (fileOk) ok(`image exists: ${p}`);
  else problems.push(`missing image file: ${p}`);
}

// 3) Internal links resolve
const routeExists = (r) => {
  if (r === "/") return true;
  const seg = r.replace(/^\//, "").split("/");
  return (
    fs.existsSync(path.join(ROOT, "app", ...seg)) ||
    fs.existsSync(path.join(ROOT, "app", ...seg, "page.tsx"))
  );
};
for (const m of content.matchAll(/href="(\/[^"]*)"/g)) {
  const href = m[1].split("#")[0];
  if (!href || href === "/") continue;
  if (href.startsWith("/blog/")) {
    const s = href.slice("/blog/".length).replace(/\/$/, "");
    if (allSlugs.has(s)) ok(`internal link ok: ${href}`);
    else problems.push(`internal link to missing post: ${href}`);
  } else if (routeExists(href)) {
    ok(`internal route ok: ${href}`);
  } else {
    problems.push(`internal link to missing route: ${href}`);
  }
}

// 4) House rule: no Think with Google
if (/thinkwithgoogle|Think with Google/i.test(content)) {
  problems.push("cites Think with Google — banned source (house rule)");
}

console.log("");
if (problems.length) {
  console.error(`✗ QA FAILED (${problems.length} issue${problems.length > 1 ? "s" : ""}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ QA PASSED for /blog/${slug}`);
