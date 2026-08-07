/**
 * Contribution gate — the rules a pull request must satisfy before a human
 * ever looks at it.
 *
 * Runs against two *built* dataset artifacts (base and head) rather than
 * against a text diff. That matters: a text diff can be gamed by formatting,
 * and it cannot see a change that propagates through the computed tier. The
 * artifact is what consumers actually receive, so it is what we gate on.
 *
 *   tsx scripts/gate.ts <base-dataset.json> <head-dataset.json>
 *
 * Exit 0 = mergeable (see verdict for whether a human is required).
 * Exit 1 = rejected; the PR cannot merge and no human needs to read it.
 *
 * Every rule here is deterministic. Nothing in this file asks a model for a
 * judgment — the LLM pass is a separate, advisory step that can only ever
 * *add* a reason to reject, never remove one.
 */
import { readFileSync } from "node:fs";
import { normalizeForMatch } from "../src/schema";

type Json = Record<string, any>;

const [, , basePath, headPath] = process.argv;
if (!basePath || !headPath) {
  console.error(
    "usage: tsx scripts/gate.ts <base.json> <head.json> [--author=<association>]",
  );
  process.exit(2);
}

/**
 * GitHub's `author_association` for the PR author. Only OWNER and MEMBER may
 * change the source catalog (R1) — someone has to be able to add a source, or
 * the registry can never cite a publisher it does not already know.
 *
 * Defaults to CONTRIBUTOR when absent, so running this locally or in any
 * context that forgets to pass it gets the strict behaviour rather than the
 * permissive one. A gate that fails open is not a gate.
 */
const authorArg = process.argv.find((a) => a.startsWith("--author="));
const author = (authorArg?.split("=")[1] ?? "CONTRIBUTOR").toUpperCase();
const isMaintainer = author === "OWNER" || author === "MEMBER";

const base: Json = JSON.parse(readFileSync(basePath, "utf8"));
const head: Json = JSON.parse(readFileSync(headPath, "utf8"));

const rejections: string[] = [];
const reviewReasons: string[] = [];

/* ------------------------------------------------------------------ utils */

/** Collect every value at a given key, deep, with a readable path. */
function collect(
  node: unknown,
  key: string,
  path = "",
  out = new Map<string, any>(),
): Map<string, any> {
  if (Array.isArray(node)) {
    node.forEach((v, i) => collect(v, key, `${path}[${i}]`, out));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      const p = path ? `${path}.${k}` : k;
      if (k === key) out.set(p, v);
      collect(v, key, p, out);
    }
  }
  return out;
}

/** Index models by slug for stable path-independent comparison. */
function bySlug(d: Json): Map<string, Json> {
  return new Map((d.models ?? []).map((m: Json) => [m.slug, m]));
}

/** Every evidence ref under a node, deep. */
function evidenceOf(node: unknown): Json[] {
  const out: Json[] = [];
  (function walk(n: unknown) {
    if (Array.isArray(n)) return n.forEach(walk);
    if (n && typeof n === "object") {
      const o = n as Json;
      if (typeof o.url === "string" && typeof o.sourceId === "string")
        out.push(o);
      Object.values(o).forEach(walk);
    }
  })(node);
  return out;
}

/* ------------------------------------------------------------------ rules */

/**
 * R1 — The source catalog is owner-only.
 *
 * Every other evidence rule leans on sources.ts: the prefix check proves a URL
 * belongs to the publisher it claims, and the trust tier decides which source
 * wins a conflict. A contributor who can add `my-blog` at tier A has defeated
 * all of it in one commit. This is the rule that makes the others load-bearing.
 */
if (JSON.stringify(base.sources) !== JSON.stringify(head.sources)) {
  if (isMaintainer) {
    // Allowed, but never silent. A tier change is one of the highest-leverage
    // edits possible here — it decides which source wins a conflict — so it is
    // always surfaced for review even when the author could merge it anyway.
    reviewReasons.push(
      "source catalog changed (maintainer) — verify tiers and URL prefixes deliberately",
    );
  } else {
    rejections.push(
      "R1 source-catalog-locked: this PR changes the source catalog (sources.ts). " +
        "Source definitions, trust tiers and URL prefixes are maintainer-only, because " +
        "every other evidence rule depends on them. Open an issue proposing the source instead.",
    );
  }
}

/**
 * R2 — A changed grade must be quote-bound.
 *
 * `quote` is optional in the schema to allow backfill of pre-existing entries.
 * For anything a contribution *changes*, it is mandatory: a grade whose
 * evidence is only a URL can be checked for liveness, never for truth, and
 * "the link is alive" is exactly the weak guarantee this registry exists to
 * replace.
 */
const baseModels = bySlug(base);
const headModels = bySlug(head);

const changedGradeSlugs = new Set<string>();

for (const [slug, hm] of headModels) {
  const bm = baseModels.get(slug);
  const hGrades = collect(hm, "grade");
  const bGrades = bm ? collect(bm, "grade") : new Map();

  for (const [path, hGrade] of hGrades) {
    const bGrade = bGrades.get(path);
    if (bGrade === hGrade) continue;

    changedGradeSlugs.add(slug);

    // The vector this grade belongs to is the object one level up.
    const vectorPath = path.replace(/\.grade$/, "");
    const vector = vectorPath
      .split(".")
      .reduce<any>((acc, k) => (acc == null ? acc : acc[k]), hm);
    const refs = evidenceOf(vector);

    if (refs.length === 0) {
      rejections.push(
        `R2 grade-needs-evidence: ${slug} ${vectorPath} changed ${bGrade ?? "(new)"} → ${hGrade} with no evidence.`,
      );
      continue;
    }
    const unquoted = refs.filter(
      (r) => typeof r.quote !== "string" || r.quote.trim().length < 12,
    );
    if (unquoted.length > 0) {
      rejections.push(
        `R2 grade-needs-quotes: ${slug} ${vectorPath} changed ${bGrade ?? "(new)"} → ${hGrade}, ` +
          `but ${unquoted.length} of ${refs.length} evidence refs carry no verbatim quote ` +
          `(${unquoted.map((r) => r.url).join(", ")}). A changed grade must be quote-bound.`,
      );
    }
  }
}

/**
 * R3 — No silent fixes.
 *
 * An operating principle, not a preference: "corrections ship as visible,
 * dated dataset changes". A grade that moves without a change-feed entry is
 * precisely the silent edit this project was built to catch providers making.
 * Holding ourselves to a lower bar than we hold them to would be fatal to the
 * only asset here that matters.
 */
const baseEventIds = new Set((base.change_events ?? []).map((e: Json) => e.id));
const newEvents: Json[] = (head.change_events ?? []).filter(
  (e: Json) => !baseEventIds.has(e.id),
);

for (const slug of changedGradeSlugs) {
  const covered = newEvents.some((e) => (e.modelSlugs ?? []).includes(slug));
  if (!covered) {
    rejections.push(
      `R3 no-silent-fixes: ${slug} has a changed grade but no new change-feed entry lists it. ` +
        `Add a changeEvent to src/changelog.ts whose modelSlugs includes "${slug}".`,
    );
  }
}

/**
 * R4 — Quotes must be verbatim-checkable offline before we spend a network
 * call on them. A quote that is not present in its own evidence object, or is
 * too short to be distinctive, fails here rather than in the fetch step.
 */
for (const [slug, hm] of headModels) {
  for (const ref of evidenceOf(hm)) {
    if (ref.quote == null) continue;
    if (
      typeof ref.quote !== "string" ||
      normalizeForMatch(ref.quote).length < 12
    ) {
      rejections.push(
        `R4 quote-too-short: ${slug} ${ref.url} has a quote under 12 normalized characters. ` +
          `Short quotes match incidentally and prove nothing.`,
      );
    }
  }
}

/**
 * R5 — The tier is computed, never stored.
 *
 * Storing a tier would let a contribution assert a rank directly instead of
 * earning it through the requirements checklist. The schema computes it; a
 * literal `tier` on a model is an attempt to route around that.
 */
for (const [slug, hm] of headModels) {
  if (
    Object.prototype.hasOwnProperty.call(hm, "tier") &&
    typeof hm.tier !== "object"
  ) {
    const bm = baseModels.get(slug);
    if (!bm || bm.tier !== hm.tier) {
      rejections.push(
        `R5 tier-is-computed: ${slug} sets a literal tier. Tier is derived from the ` +
          `requirements checklist and must not be asserted.`,
      );
    }
  }
}

/* --------------------------------------------------------------- classify */

/**
 * What is left is mergeable. The remaining question is whether it needs a
 * human — and the default is yes. Auto-merge is reserved for changes that
 * cannot alter what the registry asserts.
 */
const gradeChanged = changedGradeSlugs.size > 0;
const modelSetChanged =
  baseModels.size !== headModels.size ||
  [...headModels.keys()].some((s) => !baseModels.has(s));

// Usage share is a ranking input, so it is judgment-bearing even though it is
// not a grade.
const usageChanged = [...headModels].some(([slug, hm]) => {
  const bm = baseModels.get(slug);
  return (
    JSON.stringify(bm?.usageShare?.value) !==
    JSON.stringify(hm?.usageShare?.value)
  );
});

if (gradeChanged)
  reviewReasons.push(`grades changed: ${[...changedGradeSlugs].join(", ")}`);
if (modelSetChanged) reviewReasons.push("models added or removed");
if (usageChanged) reviewReasons.push("usage share changed");
if (newEvents.length > 0)
  reviewReasons.push(`${newEvents.length} new change-feed entrie(s)`);

/* ----------------------------------------------------------------- report */

const line = "─".repeat(70);
if (rejections.length > 0) {
  console.error(
    `\n${line}\nREJECTED — ${rejections.length} rule violation(s)\n${line}`,
  );
  rejections.forEach((r) => console.error(`\n  ✗ ${r}`));
  console.error(
    `\n${line}\nNo maintainer review is needed; fix the above and push again.\n${line}\n`,
  );
  process.exit(1);
}

if (reviewReasons.length > 0) {
  console.log(
    `\n${line}\nPASSES ALL RULES — maintainer review required\n${line}`,
  );
  reviewReasons.forEach((r) => console.log(`  • ${r}`));
  console.log(`${line}\n`);
  console.log("verdict=review");
} else {
  console.log(
    `\n${line}\nPASSES ALL RULES — no judgment-bearing change detected\n${line}`,
  );
  console.log("  Eligible for auto-merge once quote verification passes.");
  console.log(`${line}\n`);
  console.log("verdict=auto");
}
