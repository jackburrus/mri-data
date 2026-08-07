/**
 * Cross-registry invariants — the checks per-record Zod validation cannot
 * express (L2Beat's config-test-suite pattern). Zod runs at registry import,
 * so simply importing the registry exercises schema validation too.
 */
import { describe, expect, it } from "vitest";
import { allEvents, allIncidents, allModels } from "../src/registry";
import { SOURCES } from "../src/sources";
import { VECTOR_KEYS, type EvidenceRef } from "../src/schema";

const TODAY = new Date().toISOString().slice(0, 10);

function everyEvidenceRef(): { ref: EvidenceRef; where: string }[] {
  const out: { ref: EvidenceRef; where: string }[] = [];
  for (const m of allModels) {
    for (const key of VECTOR_KEYS) {
      m.vectors[key].evidence.forEach((ref) =>
        out.push({ ref, where: `${m.slug}/${key}` }),
      );
    }
    if (m.usageShare)
      out.push({ ref: m.usageShare.evidence, where: `${m.slug}/usage` });
  }
  for (const e of allEvents)
    e.evidence.forEach((ref) => out.push({ ref, where: `event:${e.id}` }));
  for (const i of allIncidents)
    i.sources.forEach((ref) => out.push({ ref, where: `incident:${i.id}` }));
  return out;
}

describe("registry validity", () => {
  it("loads and validates (Zod runs at import)", () => {
    expect(allModels.length).toBeGreaterThan(0);
  });

  it("has unique model slugs, event ids, and incident ids", () => {
    const slugs = allModels.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const eventIds = allEvents.map((e) => e.id);
    expect(new Set(eventIds).size).toBe(eventIds.length);
    const incidentIds = allIncidents.map((i) => i.id);
    expect(new Set(incidentIds).size).toBe(incidentIds.length);
  });
});

describe("evidence discipline", () => {
  it("every evidence URL is https", () => {
    for (const { ref, where } of everyEvidenceRef()) {
      expect(ref.url, where).toMatch(/^https:\/\//);
    }
  });

  it("every evidence URL matches its source catalog entry's registered prefixes", () => {
    for (const { ref, where } of everyEvidenceRef()) {
      const source = SOURCES[ref.sourceId];
      const matches = source.urlPrefixes.some((p) => ref.url.startsWith(p));
      expect(
        matches,
        `${where}: ${ref.url} does not match prefixes of source "${ref.sourceId}"`,
      ).toBe(true);
    }
  });

  it("no retrieval date is in the future", () => {
    for (const { ref, where } of everyEvidenceRef()) {
      expect(ref.retrievedAt <= TODAY, `${where}: ${ref.retrievedAt}`).toBe(
        true,
      );
    }
  });
});

describe("temporal sanity", () => {
  it("release, event, and incident dates are not in the future", () => {
    for (const m of allModels) {
      if (m.releasedAt) expect(m.releasedAt <= TODAY, m.slug).toBe(true);
    }
    for (const e of allEvents) expect(e.date <= TODAY, e.id).toBe(true);
    for (const i of allIncidents) expect(i.date <= TODAY, i.id).toBe(true);
  });

  it("no event or incident predates the model's release by more than a year", () => {
    // Catches slug typos that attach an event to the wrong model era.
    const releasedAt = new Map(
      allModels.filter((m) => m.releasedAt).map((m) => [m.slug, m.releasedAt!]),
    );
    const yearBefore = (date: string) =>
      `${Number(date.slice(0, 4)) - 1}${date.slice(4)}`;
    for (const e of allEvents) {
      for (const slug of e.modelSlugs) {
        const rel = releasedAt.get(slug);
        if (rel)
          expect(e.date >= yearBefore(rel), `${e.id} vs ${slug}`).toBe(true);
      }
    }
  });
});

describe("editorial style", () => {
  it("vector summaries and tier notes read as sentences (end with a period)", () => {
    for (const m of allModels) {
      for (const key of VECTOR_KEYS) {
        expect(
          m.vectors[key].summary.trim(),
          `${m.slug}/${key} summary`,
        ).toMatch(/\.$/);
      }
    }
  });
});

describe("usage share plausibility", () => {
  it("total tracked usage share stays under 100%", () => {
    const total = allModels.reduce(
      (sum, m) => sum + (m.usageShare?.pct ?? 0),
      0,
    );
    expect(total).toBeLessThan(100);
  });
});
