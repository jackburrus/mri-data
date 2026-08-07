import {
  changeEventSchema,
  compositeScore,
  deriveDisplayVectors,
  evaluateTier,
  incidentSchema,
  modelSchema,
  VECTOR_KEYS,
  type ChangeEvent,
  type DisplayVectors,
  type Incident,
  type Model,
  type Tier,
  type TierAssessment,
} from "./schema";
import { changeEvents } from "./changelog";
import { incidents } from "./incidents";
import { gpt51 } from "./models/gpt-5-1";
import { claudeOpus45 } from "./models/claude-opus-4-5";
import { claudeSonnet45 } from "./models/claude-sonnet-4-5";
import { gemini3Pro } from "./models/gemini-3-pro";
import { gemini31Pro } from "./models/gemini-3-1-pro";
import { gpt56 } from "./models/gpt-5-6";
import { glm52 } from "./models/glm-5-2";
import { minimaxM3 } from "./models/minimax-m3";
import { deepseekV4Flash } from "./models/deepseek-v4-flash";
import { deepseekV4Pro } from "./models/deepseek-v4-pro";
import { mimoV25 } from "./models/mimo-v2-5";
import { hy3 } from "./models/hy3";
import { nemotron3Ultra } from "./models/nemotron-3-ultra";
import { step37Flash } from "./models/step-3-7-flash";
import { kimiK3 } from "./models/kimi-k3";
import { claudeSonnet5 } from "./models/claude-sonnet-5";
import { claudeOpus5 } from "./models/claude-opus-5";
import { gemini25Flash } from "./models/gemini-2-5-flash";
import { llama4Maverick } from "./models/llama-4-maverick";
import { mistralMedium31 } from "./models/mistral-medium-3-1";
import { deepseekV32 } from "./models/deepseek-v3-2";
import { grok41 } from "./models/grok-4-1";
import { qwen3235b } from "./models/qwen3-235b";
import { kimiK2 } from "./models/kimi-k2";
import { novaPremier } from "./models/nova-premier";

const rawModels: Model[] = [
  gpt51,
  claudeOpus45,
  claudeSonnet45,
  gemini3Pro,
  gemini31Pro,
  gemini25Flash,
  llama4Maverick,
  mistralMedium31,
  deepseekV32,
  grok41,
  qwen3235b,
  kimiK2,
  novaPremier,
  gpt56,
  glm52,
  minimaxM3,
  deepseekV4Flash,
  deepseekV4Pro,
  mimoV25,
  hy3,
  nemotron3Ultra,
  step37Flash,
  kimiK3,
  claudeSonnet5,
  claudeOpus5,
];

/**
 * Validate the whole dataset at module initialization. A schema violation
 * anywhere fails the build — data problems must never reach production
 * silently. This runs once per Worker isolate.
 */
function validate(): {
  models: Model[];
  events: ChangeEvent[];
  incidentRecords: Incident[];
} {
  const models = rawModels.map((m) => {
    const parsed = modelSchema.safeParse(m);
    if (!parsed.success) {
      throw new Error(
        `Invalid model entry "${m.slug}": ${parsed.error.message}`,
      );
    }
    return parsed.data;
  });

  const slugs = new Set(models.map((m) => m.slug));
  if (slugs.size !== models.length) {
    throw new Error("Duplicate model slugs in dataset");
  }

  const checkSlugRefs = (kind: string, id: string, refs: string[]) => {
    for (const slug of refs) {
      if (!slugs.has(slug)) {
        throw new Error(`${kind} "${id}" references unknown model "${slug}"`);
      }
    }
  };

  const events = changeEvents.map((e) => {
    const parsed = changeEventSchema.safeParse(e);
    if (!parsed.success) {
      throw new Error(
        `Invalid change event "${e.id}": ${parsed.error.message}`,
      );
    }
    checkSlugRefs("Change event", e.id, e.modelSlugs);
    return parsed.data;
  });

  const incidentRecords = incidents.map((i) => {
    const parsed = incidentSchema.safeParse(i);
    if (!parsed.success) {
      throw new Error(`Invalid incident "${i.id}": ${parsed.error.message}`);
    }
    checkSlugRefs("Incident", i.id, i.modelSlugs);
    return parsed.data;
  });

  return { models, events, incidentRecords };
}

const validated = validate();

export interface RankedModel extends Omit<Model, "vectors"> {
  /** The five presented vectors, derived from the six stored measures. */
  vectors: DisplayVectors;
  /** The six stored measures, kept for reference and the API. */
  rawVectors: Model["vectors"];
  /** Composite score over applied grades; null if nothing is graded. */
  score: number | null;
  /** Computed from the tier checklist — never stored. */
  tier: Tier;
  tierAssessment: TierAssessment;
  lastChangeAt: string | null;
}

const byDateDesc = <T extends { date: string }>(a: T, b: T) =>
  b.date.localeCompare(a.date);

export const allEvents: ChangeEvent[] = [...validated.events].sort(byDateDesc);
export const allIncidents: Incident[] = [...validated.incidentRecords].sort(
  byDateDesc,
);

/** Default ranking: usage share descending — "how risky is what people actually use." */
export const allModels: RankedModel[] = validated.models
  .map((m) => {
    const tierAssessment = evaluateTier(m.tierChecklist);
    const vectors = deriveDisplayVectors(m.vectors);
    const { vectors: rawVectors, ...rest } = m;
    return {
      ...rest,
      vectors,
      rawVectors,
      score: compositeScore(vectors),
      tier: tierAssessment.tier,
      tierAssessment,
      lastChangeAt:
        allEvents.find((e) => e.modelSlugs.includes(m.slug))?.date ?? null,
    };
  })
  .sort((a, b) => (b.usageShare?.pct ?? 0) - (a.usageShare?.pct ?? 0));

export function getModel(slug: string): RankedModel | undefined {
  return allModels.find((m) => m.slug === slug);
}

/* ---------------------------------------------------------------------------
 * Provenance — every claim the registry makes, and how well it is bound
 * ------------------------------------------------------------------------- */

export interface Claim {
  modelSlug: string;
  /** Which vector (or "usage") the claim supports. */
  vector: string;
  url: string;
  sourceId: string;
  retrievedAt: string;
  quote?: string;
}

/** Flatten every model-level evidence reference into a checkable claim. */
export function allClaims(): Claim[] {
  const out: Claim[] = [];
  for (const m of allModels) {
    for (const key of VECTOR_KEYS) {
      for (const e of m.vectors[key].evidence) {
        out.push({
          modelSlug: m.slug,
          vector: key,
          url: e.url,
          sourceId: e.sourceId,
          retrievedAt: e.retrievedAt,
          quote: e.quote,
        });
      }
    }
    if (m.usageShare) {
      const e = m.usageShare.evidence;
      out.push({
        modelSlug: m.slug,
        vector: "usage",
        url: e.url,
        sourceId: e.sourceId,
        retrievedAt: e.retrievedAt,
        quote: e.quote,
      });
    }
  }
  return out;
}

export interface ProvenanceStats {
  claims: number;
  quoted: number;
  /** 0–100; the share of claims bound to a verbatim supporting quote. */
  boundPct: number;
}

export function provenanceFor(slug: string): ProvenanceStats {
  const claims = allClaims().filter((c) => c.modelSlug === slug);
  const quoted = claims.filter((c) => c.quote).length;
  return {
    claims: claims.length,
    quoted,
    boundPct:
      claims.length === 0 ? 0 : Math.round((quoted / claims.length) * 100),
  };
}

export function provenanceOverall(): ProvenanceStats {
  const claims = allClaims();
  const quoted = claims.filter((c) => c.quote).length;
  return {
    claims: claims.length,
    quoted,
    boundPct:
      claims.length === 0 ? 0 : Math.round((quoted / claims.length) * 100),
  };
}

export function eventsForModel(slug: string): ChangeEvent[] {
  return allEvents.filter((e) => e.modelSlugs.includes(slug));
}

export function incidentsForModel(slug: string): Incident[] {
  return allIncidents.filter((i) => i.modelSlugs.includes(slug));
}

export const DATASET_VERSION = "2026-08-06.2";
