/**
 * Evidence link checker — network-dependent, so it is a standalone report
 * script rather than part of the unit test suite. Run on demand or as a
 * scheduled CI job. Until Phase 2 snapshots exist, a dead link means a
 * claim whose receipt has rotted; those must be fixed or re-evidenced.
 */
import { allEvents, allIncidents, allModels } from "../src/registry";
import { VECTOR_KEYS, type EvidenceRef } from "../src/schema";

const refs = new Map<string, string[]>(); // url -> where used

function add(ref: EvidenceRef, where: string) {
  const list = refs.get(ref.url) ?? [];
  list.push(where);
  refs.set(ref.url, list);
}

for (const m of allModels) {
  for (const key of VECTOR_KEYS) {
    m.vectors[key].evidence.forEach((r) => add(r, `${m.slug}/${key}`));
  }
  if (m.usageShare) add(m.usageShare.evidence, `${m.slug}/usage`);
}
for (const e of allEvents) e.evidence.forEach((r) => add(r, `event:${e.id}`));
for (const i of allIncidents)
  i.sources.forEach((r) => add(r, `incident:${i.id}`));

const urls = [...refs.keys()];
console.log(`Checking ${urls.length} unique evidence URLs...\n`);

async function check(
  url: string,
): Promise<{ url: string; status: number | string }> {
  const attempt = async (method: "HEAD" | "GET") => {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
      headers: {
        "user-agent":
          "ModelRiskIndex-link-check/0.1 (+https://modelriskindex.com)",
      },
    });
    return res.status;
  };
  try {
    let status = await attempt("HEAD");
    if (status === 405 || status === 403 || status === 404) {
      status = await attempt("GET");
    }
    return { url, status };
  } catch (err) {
    return { url, status: err instanceof Error ? err.name : "error" };
  }
}

const results: { url: string; status: number | string }[] = [];
const CONCURRENCY = 8;
for (let i = 0; i < urls.length; i += CONCURRENCY) {
  results.push(
    ...(await Promise.all(urls.slice(i, i + CONCURRENCY).map(check))),
  );
}

const bad = results.filter((r) => r.status !== 200);
const ok = results.length - bad.length;
console.log(`OK: ${ok}/${results.length}`);
if (bad.length > 0) {
  console.log(`\nProblems (${bad.length}):`);
  for (const r of bad.sort((a, b) =>
    String(a.status).localeCompare(String(b.status)),
  )) {
    console.log(`  [${r.status}] ${r.url}`);
    for (const where of refs.get(r.url) ?? [])
      console.log(`         used by ${where}`);
  }
}
