/**
 * Quote-backfill helper. Reads the ARCHIVED snapshot text for an evidence URL
 * out of D1 and surfaces candidate supporting sentences — so a quote is always
 * copied from the archive rather than reconstructed from memory. That is what
 * makes it verify.
 *
 *   node packages/mri-data/scripts/find-quote.mjs <url> [keyword ...]
 *   node packages/mri-data/scripts/find-quote.mjs --check <url> "<quote>"
 *
 * --check reports PRESENT / MISSING using the same normalization the Worker
 * uses, so you can confirm a quote before writing it into a model file.
 */
import { execFileSync } from "node:child_process";

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();

function archivedText(url) {
  const sql = `SELECT b.content_text AS t FROM watch_state w JOIN snapshot_bodies b ON b.content_hash = w.last_hash WHERE w.url = '${url.replace(/'/g, "''")}'`;
  const out = execFileSync(
    "npx",
    [
      "wrangler",
      "d1",
      "execute",
      "mri-observations",
      "--remote",
      "--json",
      "--command",
      sql,
    ],
    {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    },
  );
  const start = out.indexOf("[");
  if (start === -1) return null;
  const rows = JSON.parse(out.slice(start))[0]?.results ?? [];
  return rows[0]?.t ?? null;
}

const args = process.argv.slice(2);

if (args[0] === "--check") {
  const [, url, quote] = args;
  const text = archivedText(url);
  if (!text) {
    console.log("NO-SNAPSHOT — this URL has not been archived yet.");
    process.exit(2);
  }
  console.log(norm(text).includes(norm(quote)) ? "PRESENT" : "MISSING");
  process.exit(0);
}

const [url, ...keywords] = args;
if (!url) {
  console.error("usage: find-quote.mjs <url> [keyword ...]");
  process.exit(1);
}

const text = archivedText(url);
if (!text) {
  console.log("NO-SNAPSHOT — nothing archived for this URL yet.");
  process.exit(2);
}

console.log(`# archived text: ${text.length} chars\n`);
const sentences = text.split(/(?<=[.!?])\s+/);
const kws = keywords.map((k) => k.toLowerCase());
const seen = new Set();
let shown = 0;
for (const s of sentences) {
  const clean = s.trim().replace(/\s+/g, " ");
  if (clean.length < 40 || clean.length > 260) continue;
  const low = clean.toLowerCase();
  if (kws.length && !kws.some((k) => low.includes(k))) continue;
  const key = clean.slice(0, 60);
  if (seen.has(key)) continue;
  seen.add(key);
  console.log(` * ${clean}`);
  if (++shown >= 25) break;
}
if (shown === 0) console.log("(no candidate sentences matched)");
