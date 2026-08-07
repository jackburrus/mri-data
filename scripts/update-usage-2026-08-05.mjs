// One-shot: replace seeded usage-share estimates with measured OpenRouter
// daily data (2026-08-04 window, retrieved 2026-08-05). The three re-verified
// models were already updated by hand.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const models = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "models",
);

const BASE_NOTE =
  "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only.";

const UPDATES = {
  "claude-opus-4-5.ts": {
    pct: 0.03,
    note: `${BASE_NOTE} Usage migrated to Opus 4.8/5; undercounts enterprise Bedrock/Vertex volume.`,
  },
  "gemini-2-5-flash.ts": {
    pct: 0.93,
    note: `${BASE_NOTE} Highest-share tracked model; Gemini 2.5 family retirement is set for 2026-10-16.`,
  },
  "deepseek-v3-2.ts": {
    pct: 0.71,
    note: `${BASE_NOTE} Aggregates v3.2 and v3.2-exp; DeepSeek's V4 family separately holds ~23% across three variants.`,
  },
  "llama-4-maverick.ts": {
    pct: 0.06,
    note: `${BASE_NOTE} Aggregated across hosted providers; excludes unmeasurable private self-hosted deployments.`,
  },
  "mistral-medium-3-1.ts": {
    pct: 0.01,
    note: BASE_NOTE,
  },
  "qwen3-235b.ts": {
    pct: 0.13,
    note: `${BASE_NOTE} Aggregates 235B variants; dominated by the 07-25 release.`,
  },
  "kimi-k2.ts": {
    pct: 0.05,
    note: `${BASE_NOTE} Aggregates K2/K2-0905/K2-thinking; successor Kimi K3 separately ranks #12 at ~2.4%.`,
  },
  "nova-premier.ts": {
    pct: 0.0001,
    note: `${BASE_NOTE} Near-zero on OpenRouter, which materially undercounts Bedrock-native enterprise usage; treat as a floor.`,
  },
};

const NEW_EVIDENCE = (pct, note) => `usageShare: {
    pct: ${pct},
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/rankings",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "${note}",
    },
  },`;

const BLOCK_RE = /usageShare: \{[\s\S]*?\n {2}\},/;

for (const [file, { pct, note }] of Object.entries(UPDATES)) {
  const path = join(models, file);
  const content = readFileSync(path, "utf8");
  if (!BLOCK_RE.test(content))
    throw new Error(`No usageShare block in ${file}`);
  writeFileSync(path, content.replace(BLOCK_RE, NEW_EVIDENCE(pct, note)));
  console.log(`updated ${file} -> ${pct}%`);
}

// Grok 4.1: gone from OpenRouter entirely; drop the stale share and mark legacy.
const grokPath = join(models, "grok-4-1.ts");
let grok = readFileSync(grokPath, "utf8");
if (!BLOCK_RE.test(grok)) throw new Error("No usageShare block in grok-4-1.ts");
grok = grok.replace(BLOCK_RE, "");
grok = grok.replace(
  /reviewStatus: "draft",/,
  `reviewStatus: "draft",
  lifecycle: {
    status: "legacy",
    successor: "Grok 4.3 / Grok 4.5 (per OpenRouter model listings)",
    note: "No longer appears in OpenRouter rankings as of 2026-08-04; xAI's current lineup there is Grok 4.3/4.5/4.20. Full re-verification of the successor lineup pending.",
  },`,
);
writeFileSync(grokPath, grok);
console.log("updated grok-4-1.ts -> usage removed, marked legacy");
