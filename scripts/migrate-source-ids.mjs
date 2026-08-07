// One-shot migration: replace `sourceKind: "..."` on evidence refs with
// `sourceId: "..."` derived from the ref's URL via ordered prefix matching.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "..", "src");

const MAP = [
  ["https://community.openai.com", "openai-community"],
  ["https://openai.com", "openai"],
  ["https://platform.openai.com", "openai"],
  ["https://cdn.openai.com", "openai"],
  ["https://trust.openai.com", "openai"],
  ["https://www.anthropic.com", "anthropic"],
  ["https://trust.anthropic.com", "anthropic"],
  ["https://privacy.anthropic.com", "anthropic"],
  ["https://docs.anthropic.com", "anthropic"],
  ["https://assets.anthropic.com", "anthropic"],
  ["https://deepmind.google", "google"],
  ["https://ai.google.dev", "google"],
  ["https://cloud.google.com", "google"],
  ["https://storage.googleapis.com", "google"],
  ["https://www.llama.com", "meta"],
  ["https://ai.meta.com", "meta"],
  ["https://github.com/meta-llama", "meta"],
  ["https://mistral.ai", "mistral"],
  ["https://docs.mistral.ai", "mistral"],
  ["https://cdn.deepseek.com", "deepseek"],
  ["https://platform.deepseek.com", "deepseek"],
  ["https://api-docs.deepseek.com", "deepseek"],
  ["https://huggingface.co/deepseek-ai", "deepseek"],
  ["https://huggingface.co/Qwen", "qwen"],
  ["https://qwenlm.github.io", "qwen"],
  ["https://huggingface.co/moonshotai", "moonshot"],
  ["https://moonshotai.github.io", "moonshot"],
  ["https://data.x.ai", "xai"],
  ["https://docs.x.ai", "xai"],
  ["https://x.ai", "xai"],
  ["https://aws.amazon.com", "aws"],
  ["https://docs.aws.amazon.com", "aws"],
  ["https://www.f5.com", "f5-casi"],
  ["https://www.grayswan.ai", "gray-swan"],
  ["https://openrouter.ai", "openrouter"],
  ["https://futureoflife.org", "fli-index"],
  ["https://blogs.cisco.com", "cisco-research"],
  ["https://incidentdatabase.ai", "aiid"],
  ["https://www.radware.com", "radware-research"],
  ["https://www.safebreach.com", "safebreach-research"],
  ["https://lmarena.ai", "lmarena"],
  ["https://artificialintelligenceact.eu", "eu-ai-act-tracker"],
  ["https://arxiv.org", "academic"],
  ["https://modelriskindex.com", "modelriskindex"],
];

function sourceIdFor(url) {
  const hit = MAP.find(([prefix]) => url.startsWith(prefix));
  if (!hit) throw new Error(`No source mapping for URL: ${url}`);
  return hit[1];
}

const files = [
  ...readdirSync(join(src, "models")).map((f) => join(src, "models", f)),
  join(src, "changelog.ts"),
  join(src, "incidents.ts"),
];

let total = 0;
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  let lastUrl = null;
  const out = lines.map((line) => {
    const urlMatch = line.match(/^\s*url: "([^"]+)",?\s*$/);
    if (urlMatch) lastUrl = urlMatch[1];
    const kindMatch = line.match(/^(\s*)sourceKind: "[a-z-]+",\s*$/);
    if (kindMatch) {
      if (!lastUrl) throw new Error(`sourceKind before url in ${file}`);
      total++;
      return `${kindMatch[1]}sourceId: "${sourceIdFor(lastUrl)}",`;
    }
    return line;
  });
  writeFileSync(file, out.join("\n"));
}
console.log(`Rewrote ${total} evidence refs across ${files.length} files.`);
