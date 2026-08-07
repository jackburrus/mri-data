import { z } from "zod";
import { SOURCE_IDS } from "./sources";

/**
 * Data-as-code schema for ModelRiskIndex.
 *
 * Core invariants (carried over from the technical design, hardened after
 * studying L2Beat's config package):
 *
 * 1. No grade, change event, or incident may exist without at least one
 *    evidence reference. In the simple form, evidence is a source URL +
 *    retrieval date; the shape leaves room for `snapshotKey` later.
 * 2. The tier is never stored. Models answer a typed requirements checklist
 *    and the tier — plus the "what's missing for the next tier" list — is
 *    computed from the blueprint below (L2Beat's stages pattern). Adding a
 *    requirement to the blueprint is a compile error for every model file
 *    until it is answered.
 * 3. "Not applicable" and "under review" are first-class epistemic states,
 *    distinct from a weak grade.
 */

export const evidenceRefSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  /**
   * Reference into the source catalog (sources.ts), which carries the
   * source-level facts once: publisher, kind, trust tier, licensing
   * posture, refresh cadence. CI verifies the URL matches the catalog
   * entry's registered prefixes.
   */
  sourceId: z.enum(SOURCE_IDS),
  retrievedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  note: z.string().optional(),
  /**
   * The exact sentence from the source that supports the claim — verbatim,
   * not paraphrased. This is the load-bearing verification primitive: it
   * turns "the link is alive" (weak) into "the specific supporting text
   * still exists" (strong), and lets the monitor invalidate a claim the day
   * a provider edits the sentence a grade rests on.
   *
   * Modelled on L2Beat's rule that you cannot cite a contract address the
   * discovery bot has not independently verified. Optional during backfill;
   * the verification status surfaces how much of the registry is bound.
   */
  quote: z.string().min(12).optional(),
  /** Content-addressed snapshot the quote was verified against. */
  snapshotKey: z.string().optional(),
});
export type EvidenceRef = z.infer<typeof evidenceRefSchema>;

/**
 * Normalization used on both sides of a quote check: the archived page text
 * and the stored quote are reduced the same way, so trivial differences in
 * whitespace, quote glyphs, or case never cause a false invalidation.
 */
export function decodeEntities(s: string): string {
  return s
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&lt;|&#60;/gi, "<")
    .replace(/&gt;|&#62;/gi, ">")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&mdash;/gi, "\u2014")
    .replace(/&ndash;/gi, "\u2013")
    .replace(/&amp;|&#38;/gi, "&");
}

export function normalizeForMatch(s: string): string {
  return decodeEntities(s)
    .toLowerCase()
    .replace(/[\u2018\u2019\u201a\u201b]/g, "'")
    .replace(/[\u201c\u201d\u201e\u201f]/g, '"')
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Does an archived/live page body contain the quote? */
export function quoteAppearsIn(haystack: string, quote: string): boolean {
  return normalizeForMatch(haystack).includes(normalizeForMatch(quote));
}

/* ---------------------------------------------------------------------------
 * Grades
 * ------------------------------------------------------------------------- */

/** The three applied grades. */
export const APPLIED_GRADES = ["strong", "partial", "weak"] as const;
export type AppliedGrade = (typeof APPLIED_GRADES)[number];

/**
 * Full grade vocabulary. `not-applicable` marks vectors that are properties
 * of the deployer rather than the graded artifact (e.g. data handling for
 * self-hosted open weights); `under-review` marks vectors we have not yet
 * assessed or where evidence is in dispute. Neither counts toward the
 * composite score in either direction.
 */
export const gradeSchema = z.enum([
  "strong",
  "partial",
  "weak",
  "under-review",
  "not-applicable",
]);
export type Grade = z.infer<typeof gradeSchema>;

export const vectorAssessmentSchema = z.object({
  grade: gradeSchema,
  summary: z.string().min(1),
  /**
   * Optional sort key within a grade band (higher = better), for ordering
   * two models that share a grade. Mirrors L2Beat's orderHint.
   */
  orderHint: z.number().optional(),
  evidence: z.array(evidenceRefSchema).min(1),
});
export type VectorAssessment = z.infer<typeof vectorAssessmentSchema>;

/**
 * Stored ("raw") measures — the shape each model file authors. Six measures,
 * because jailbreak and injection are gathered from different evidence and
 * often diverge. They are *presented* as one vector (see VECTOR_KEYS below),
 * the way L2Beat stores many sub-values but shows five risk cells.
 */
export const RAW_VECTOR_KEYS = [
  "jailbreak",
  "injection",
  "dataHandling",
  "transparency",
  "compliance",
  "operational",
] as const;
export type RawVectorKey = (typeof RAW_VECTOR_KEYS)[number];

const vectorsSchema = z.object({
  jailbreak: vectorAssessmentSchema,
  injection: vectorAssessmentSchema,
  dataHandling: vectorAssessmentSchema,
  transparency: vectorAssessmentSchema,
  compliance: vectorAssessmentSchema,
  operational: vectorAssessmentSchema,
});

/**
 * The five things this index checks — the presented vectors. Ordered by how
 * load-bearing each is to an enterprise buyer's decision. "Adversarial
 * resistance" folds jailbreak + injection into one graded slot; the two
 * remain visible as facets on the model page.
 */
export const VECTOR_KEYS = [
  "dataHandling",
  "operational",
  "adversarial",
  "transparency",
  "compliance",
] as const;
export type VectorKey = (typeof VECTOR_KEYS)[number];

export const VECTOR_META: Record<
  VectorKey,
  { name: string; short: string; description: string }
> = {
  dataHandling: {
    name: "Data governance",
    short: "Data",
    description:
      "What happens to your data: training-on-customer-data defaults, retention windows, residency options, and the enterprise-versus-consumer terms gap. A legal property, not a capability — it survives every model generation.",
  },
  operational: {
    name: "Operational stability",
    short: "Stability",
    description:
      "Whether it changes without warning: versioning discipline, changelog quality, deprecation policy, and observed silent changes. The signal no one else tracks.",
  },
  adversarial: {
    name: "Adversarial resistance",
    short: "Adversarial",
    description:
      "Whether an attacker can make it misbehave — direct jailbreaks against the model's own policies and indirect prompt injection in agentic tool use. Graded to the weaker of the two, because an attacker takes the easier path.",
  },
  transparency: {
    name: "Transparency",
    short: "Transparency",
    description:
      "Whether you can see how it was built and tested: model cards, published safety evals, external pre-deployment testing, and disclosure of changes. The mechanism behind the tier ladder.",
  },
  compliance: {
    name: "Compliance posture",
    short: "Compliance",
    description:
      "Whether it is certified and compliant: SOC 2, ISO/IEC 42001, HIPAA eligibility, EU AI Act readiness, and audit availability.",
  },
};

/** One facet of a composite vector (jailbreak / injection under adversarial). */
export interface VectorFacet {
  key: string;
  name: string;
  grade: Grade;
  summary: string;
}

/** The presented form of a vector: a grade plus, optionally, its facets. */
export interface DisplayVector {
  grade: Grade;
  summary: string;
  evidence: EvidenceRef[];
  facets?: VectorFacet[];
}
export type DisplayVectors = Record<VectorKey, DisplayVector>;

const APPLIED = new Set<Grade>(["strong", "partial", "weak"]);
const SEVERITY: Record<Grade, number> = {
  weak: 0,
  partial: 1,
  strong: 2,
  "under-review": 99,
  "not-applicable": 99,
};

/** Worst (attacker takes the easy path) of the applied grades; falls back to
 * under-review / not-applicable only when nothing is applied. */
function worstGrade(grades: Grade[]): Grade {
  const applied = grades.filter((g) => APPLIED.has(g));
  if (applied.length > 0) {
    return applied.reduce((a, b) => (SEVERITY[b] < SEVERITY[a] ? b : a));
  }
  return grades.includes("under-review") ? "under-review" : "not-applicable";
}

/** Fold the six stored measures into the five presented vectors. */
export function deriveDisplayVectors(raw: Model["vectors"]): DisplayVectors {
  const jb = raw.jailbreak;
  const inj = raw.injection;
  // De-duplicate on URL *and* quote: one document often backs both facets
  // with different supporting sentences (a system card's jailbreak section
  // and its injection section). Keying on URL alone would silently discard
  // the second quote — and with it, a verifiable claim.
  const seen = new Set<string>();
  const evidence = [...jb.evidence, ...inj.evidence].filter((e) => {
    const key = `${e.url}\u0000${e.quote ?? ""}`;
    return seen.has(key) ? false : (seen.add(key), true);
  });
  return {
    dataHandling: { ...raw.dataHandling },
    operational: { ...raw.operational },
    adversarial: {
      grade: worstGrade([jb.grade, inj.grade]),
      summary: `Combined across direct jailbreaks (${jb.grade}) and agentic prompt injection (${inj.grade}); graded to the weaker of the two.`,
      evidence,
      facets: [
        {
          key: "jailbreak",
          name: "Jailbreak resistance",
          grade: jb.grade,
          summary: jb.summary,
        },
        {
          key: "injection",
          name: "Prompt injection (agentic)",
          grade: inj.grade,
          summary: inj.summary,
        },
      ],
    },
    transparency: { ...raw.transparency },
    compliance: { ...raw.compliance },
  };
}

/* ---------------------------------------------------------------------------
 * Tier blueprint (computed tiers, L2Beat stages pattern)
 * ------------------------------------------------------------------------- */

export interface TierRequirementDef {
  /** Short label for checklist rows. */
  label: string;
  /** Prose when satisfied. */
  positive: string;
  /** Prose when missing — becomes the "what's missing" line. */
  negative: string;
}

export const TIER_BLUEPRINT = {
  tier1: {
    publishedModelCard: {
      label: "Published model card",
      positive:
        "A model card or equivalent technical documentation is published for this model.",
      negative:
        "No model card or equivalent technical documentation is published.",
    },
    publishedSafetyEvals: {
      label: "Published safety evals",
      positive: "Safety evaluations for this model are published.",
      negative: "No safety evaluations are published for this model.",
    },
    documentedSafetyPolicy: {
      label: "Documented safety policy",
      positive:
        "A documented safety, usage, or acceptable-use policy governs the model.",
      negative: "No documented safety or acceptable-use policy exists.",
    },
    enterpriseDataControls: {
      label: "Enterprise data controls",
      positive:
        "Customer data is not used for training by default, or a documented opt-out exists.",
      negative:
        "Terms permit training on customer data by default with no documented opt-out.",
    },
  },
  tier2: {
    externalPreDeploymentTesting: {
      label: "External pre-deployment testing",
      positive:
        "Independent external parties tested the model before deployment, and this is disclosed.",
      negative: "No disclosed external pre-deployment testing.",
    },
    thirdPartyCertification: {
      label: "Third-party certification",
      positive:
        "The operating organization holds verifiable third-party certification (e.g. SOC 2, ISO/IEC 42001).",
      negative: "No verifiable third-party certification.",
    },
    versionedWithChangelogs: {
      label: "Versioning with changelogs",
      positive:
        "Model versions are explicitly identified and changes are changelogged.",
      negative: "No versioning discipline or changelog for model changes.",
    },
    statedDeprecationPolicy: {
      label: "Stated deprecation policy",
      positive: "A deprecation policy with notice windows is published.",
      negative: "No stated deprecation policy.",
    },
  },
} as const satisfies Record<string, Record<string, TierRequirementDef>>;

/**
 * A requirement answer: `true`/`false`, `null` for not-applicable (counts
 * as satisfied but rendered as N/A), or an annotated boolean with a note.
 */
const tierAnswerSchema = z.union([
  z.boolean(),
  z.null(),
  z.object({ satisfied: z.boolean(), note: z.string().min(1) }),
]);
export type TierAnswer = z.infer<typeof tierAnswerSchema>;

/**
 * Mapped type over the blueprint: every model MUST answer every requirement.
 * Adding a requirement to TIER_BLUEPRINT breaks compilation of every model
 * file until answered — that is the migration mechanism, not a bug.
 */
export type TierChecklist = {
  [Stage in keyof typeof TIER_BLUEPRINT]: {
    [Req in keyof (typeof TIER_BLUEPRINT)[Stage]]: TierAnswer;
  };
};

const tierChecklistSchema = z.object({
  tier1: z
    .object({
      publishedModelCard: tierAnswerSchema,
      publishedSafetyEvals: tierAnswerSchema,
      documentedSafetyPolicy: tierAnswerSchema,
      enterpriseDataControls: tierAnswerSchema,
    })
    .strict(),
  tier2: z
    .object({
      externalPreDeploymentTesting: tierAnswerSchema,
      thirdPartyCertification: tierAnswerSchema,
      versionedWithChangelogs: tierAnswerSchema,
      statedDeprecationPolicy: tierAnswerSchema,
    })
    .strict(),
});

/** Compile-time proof the Zod schema and the blueprint stay in sync. */
type AssertExact<A, B> = A extends B ? (B extends A ? true : never) : never;
const _checklistSchemaMatchesBlueprint: AssertExact<
  z.infer<typeof tierChecklistSchema>,
  TierChecklist
> = true;
void _checklistSchemaMatchesBlueprint;

export type Tier = 0 | 1 | 2;

export const TIER0_DESCRIPTION =
  "Fails one or more Tier 1 requirements: no published model card or safety evals, or terms that permit training on customer API data by default with no opt-out.";

export interface TierRequirementState {
  key: string;
  label: string;
  description: string;
  state: "satisfied" | "missing" | "not-applicable";
  note?: string;
}

export interface TierAssessment {
  tier: Tier;
  stages: { forTier: 1 | 2; requirements: TierRequirementState[] }[];
  /** Unsatisfied requirements blocking the next tier; null at Tier 2. */
  missing: { forTier: 1 | 2; requirements: TierRequirementState[] } | null;
}

export function evaluateTier(checklist: TierChecklist): TierAssessment {
  const stages = (
    [
      ["tier1", 1],
      ["tier2", 2],
    ] as const
  ).map(([stageKey, forTier]) => ({
    forTier,
    requirements: Object.entries(
      TIER_BLUEPRINT[stageKey] as Record<string, TierRequirementDef>,
    ).map(([key, def]): TierRequirementState => {
      const answer = (checklist[stageKey] as Record<string, TierAnswer>)[key];
      const annotated = typeof answer === "object" && answer !== null;
      const satisfied =
        answer === null || answer === true || (annotated && answer.satisfied);
      const state =
        answer === null
          ? "not-applicable"
          : satisfied
            ? "satisfied"
            : "missing";
      return {
        key,
        label: def.label,
        description: state === "missing" ? def.negative : def.positive,
        state,
        note: annotated ? answer.note : undefined,
      };
    }),
  }));

  const stageSatisfied = stages.map((s) =>
    s.requirements.every((r) => r.state !== "missing"),
  );
  const tier: Tier = stageSatisfied[0] ? (stageSatisfied[1] ? 2 : 1) : 0;
  const nextStage = tier === 2 ? null : stages[tier];
  return {
    tier,
    stages,
    missing: nextStage
      ? {
          forTier: nextStage.forTier,
          requirements: nextStage.requirements.filter(
            (r) => r.state === "missing",
          ),
        }
      : null,
  };
}

/* ---------------------------------------------------------------------------
 * Model
 * ------------------------------------------------------------------------- */

/** Tri-state where `null` means "not yet verified", rendered distinctly from false. */
const knownBool = z.boolean().nullable();

export const complianceProfileSchema = z.object({
  soc2: knownBool,
  iso42001: knownBool,
  hipaaEligible: knownBool,
  trainsOnCustomerDataByDefault: knownBool,
  retentionWindow: z.string().nullable(),
  dataResidency: z.string().nullable(),
  euAiActNotes: z.string().nullable(),
  deprecationPolicy: z.string().nullable(),
  cloudAvailability: z.array(z.string()),
});
export type ComplianceProfile = z.infer<typeof complianceProfileSchema>;

/**
 * Where customer data physically goes. Structured so it can be shown as a
 * chip rather than buried in the free-text residency string — for an
 * enterprise buyer this is often the single most decisive fact on the page.
 * Optional: absent means not yet structured (renders as unknown, never as safe).
 */
export const DATA_ZONES = [
  "US",
  "EU",
  "UK",
  "PRC",
  "SG",
  "JP",
  "CA",
  "AU",
  "IN",
  "KR",
  "AE",
  "deployer",
] as const;
export type DataZone = (typeof DATA_ZONES)[number];

export const jurisdictionSchema = z.object({
  /** Zones where data is processed/stored. `deployer` = self-hosted, customer-controlled. */
  zones: z.array(z.enum(DATA_ZONES)).min(1),
  /** Can a customer pin processing to a chosen region? */
  regionalOptions: z.boolean(),
  note: z.string().optional(),
});
export type Jurisdiction = z.infer<typeof jurisdictionSchema>;

/**
 * The gap between what enterprise/API customers get and what consumer-tier
 * users get. Several providers have materially worse consumer defaults; the
 * gap is a real buyer signal and a common source of confusion.
 */
export const consumerGapSchema = z.object({
  severity: z.enum(["none", "narrow", "wide"]),
  note: z.string().min(1),
});
export type ConsumerGap = z.infer<typeof consumerGapSchema>;

/**
 * Dated third-party security-score readings (e.g. F5 CASI), used to render a
 * volatility sparkline. Only populated where multiple real, dated readings
 * exist — never interpolated or invented. Most models will have none until
 * the first-party probe battery lands.
 */
export const scoreReadingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  value: z.number().min(0).max(100),
  metric: z.string().min(1),
  sourceId: z.enum(SOURCE_IDS),
});
export type ScoreReading = z.infer<typeof scoreReadingSchema>;

export const modelSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  displayName: z.string().min(1),
  provider: z.string().min(1),
  family: z.string().min(1),
  /** e.g. "gpt-5.1-2025-11-13 via api.openai.com" — a fact, not a marketing name. */
  versionLabel: z.string().min(1),
  endpoint: z.string().min(1),
  openWeight: z.boolean(),
  releasedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  /**
   * draft = grades entered from known public sources but not yet re-verified
   * against a fresh snapshot of each cited page. Rendered with a visible badge.
   */
  reviewStatus: z.enum(["reviewed", "draft"]),
  /**
   * Provider-side lifecycle. Absent = active. `legacy` = still served but
   * superseded; `retired` = endpoint shut down or aliased away. Assessments
   * of non-active models remain published as history — silent disappearance
   * is what this site exists to prevent.
   */
  lifecycle: z
    .object({
      status: z.enum(["legacy", "retired"]),
      /** e.g. "Claude Sonnet 5 (claude-sonnet-5)" — may not itself be tracked yet. */
      successor: z.string().optional(),
      note: z.string().min(1),
    })
    .optional(),
  usageShare: z
    .object({
      pct: z.number().min(0).max(100),
      evidence: evidenceRefSchema,
    })
    .optional(),
  vectors: vectorsSchema,
  /** Answers to the tier blueprint. The tier itself is computed, never stored. */
  tierChecklist: tierChecklistSchema,
  compliance: complianceProfileSchema,
  /** Structured data residency (see jurisdictionSchema). */
  jurisdiction: jurisdictionSchema.optional(),
  /** Enterprise-vs-consumer terms gap (see consumerGapSchema). */
  consumerGap: consumerGapSchema.optional(),
  /** Dated third-party score readings for the volatility sparkline. */
  scoreHistory: z.array(scoreReadingSchema).optional(),
  notes: z.string().optional(),
});
export type Model = z.infer<typeof modelSchema>;

export const changeEventSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Empty array = ecosystem-wide event (regulation, methodology change). */
  modelSlugs: z.array(z.string()),
  kind: z.enum([
    "policy", // provider policy / terms change
    "model-card", // model card or eval publication
    "version", // version release, silent swap, or deprecation
    "incident", // jailbreak in the wild, leak, notable failure
    "regulation", // regulatory milestone
    "methodology", // change to our own scoring methodology
  ]),
  severity: z.enum(["info", "notice", "warning", "critical"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  evidence: z.array(evidenceRefSchema).min(1),
});
export type ChangeEvent = z.infer<typeof changeEventSchema>;

export const incidentSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  modelSlugs: z.array(z.string()).min(1),
  technique: z.string().optional(),
  title: z.string().min(1),
  summary: z.string().min(1),
  outcome: z.string().optional(),
  sources: z.array(evidenceRefSchema).min(1),
});
export type Incident = z.infer<typeof incidentSchema>;

/* ---------------------------------------------------------------------------
 * Composite score
 * ------------------------------------------------------------------------- */

const GRADE_POINTS: Record<AppliedGrade, number> = {
  strong: 2,
  partial: 1,
  weak: 0,
};

function isApplied(grade: Grade): grade is AppliedGrade {
  return (APPLIED_GRADES as readonly string[]).includes(grade);
}

/**
 * Composite security score, 0–100, over the five presented vectors, applied
 * grades only: `not-applicable` and `under-review` vectors are excluded from
 * both numerator and denominator. Returns null when nothing is graded.
 * Deliberately simple — the vectors and their evidence are the product; the
 * composite is only a sort key.
 */
export function compositeScore(dv: DisplayVectors): number | null {
  const applied = VECTOR_KEYS.map((k) => dv[k].grade).filter(isApplied);
  if (applied.length === 0) return null;
  const total = applied.reduce((sum, g) => sum + GRADE_POINTS[g], 0);
  return Math.round((total / (applied.length * 2)) * 100);
}
