import type { Model } from "../schema";
import { SHARED_NOTES } from "../shared";

export const qwen3235b: Model = {
  slug: "qwen3-235b",
  displayName: "Qwen3 235B-A22B",
  provider: "Alibaba (Qwen)",
  family: "Qwen3",
  versionLabel:
    "Qwen3-235B-A22B-Instruct (open weights, self-hosted reference)",
  endpoint: "self-hosted / multiple inference providers",
  openWeight: true,
  releasedAt: "2025-04-29",
  reviewStatus: "draft",
  usageShare: {
    pct: 0.13,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only. Aggregates 235B variants; dominated by the 07-25 release.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "Independent testing shows high attack success on the bare weights; safety behavior is light and easily bypassed, consistent with most open-weight releases.",
      evidence: [
        {
          label: "F5 Labs CASI leaderboard",
          url: "https://www.f5.com/labs",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "No injection hardening or published agent-scenario safety results.",
      evidence: [
        {
          label: "Qwen3 technical report",
          url: "https://qwenlm.github.io/blog/qwen3/",
          sourceId: "qwen",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    dataHandling: {
      grade: "not-applicable",
      summary:
        "Deployer property: in the self-hosted reference deployment, data never leaves deployer infrastructure. Alibaba Cloud's hosted Model Studio has separate terms not graded here.",
      evidence: [
        {
          label: "Qwen3-235B-A22B weights and license",
          url: "https://huggingface.co/Qwen/Qwen3-235B-A22B",
          sourceId: "qwen",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Detailed technical report and model card, Apache 2.0 license; no safety evals of substance and no external testing.",
      evidence: [
        {
          label: "Qwen3 technical report",
          url: "https://qwenlm.github.io/blog/qwen3/",
          sourceId: "qwen",
          retrievedAt: "2026-08-03",
          quote:
            "While Qwen2.5 was pre-trained on 18 trillion tokens, Qwen3 uses nearly twice that amount, with approximately 36 trillion tokens covering 119 languages and dialects.",
        },
      ],
    },
    compliance: {
      grade: "not-applicable",
      summary:
        "Deployer property: no certification attaches to the weights; deployer inherits all compliance obligations.",
      evidence: [
        {
          label: "Qwen3-235B-A22B weights and license",
          url: "https://huggingface.co/Qwen/Qwen3-235B-A22B",
          sourceId: "qwen",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "strong",
      summary:
        "Immutable published checkpoints with explicit versioned releases; no silent-change surface in the self-hosted reference deployment.",
      evidence: [
        {
          label: "Qwen3-235B-A22B weights and license",
          url: "https://huggingface.co/Qwen/Qwen3-235B-A22B",
          sourceId: "qwen",
          retrievedAt: "2026-08-03",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: {
        satisfied: true,
        note: "Basic safety benchmarks in the technical report; not a dedicated safety eval suite.",
      },
      documentedSafetyPolicy: true,
      enterpriseDataControls: null,
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: {
        satisfied: false,
        note: SHARED_NOTES.openWeightNoCertPathway,
      },
      versionedWithChangelogs: true,
      statedDeprecationPolicy: {
        satisfied: true,
        note: SHARED_NOTES.weightsRemainAvailable,
      },
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: false,
    retentionWindow: "Deployer-controlled",
    dataResidency: "Deployer-controlled",
    euAiActNotes:
      "Open-weight GPAI provisions apply; deployer obligations dominate.",
    deprecationPolicy: "Weights remain available once released",
    cloudAvailability: [
      "Self-hosted",
      "Alibaba Cloud Model Studio",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["deployer"],
    regionalOptions: false,
    note: "Self-hosted reference deployment; Alibaba Cloud's hosted Model Studio has separate terms not graded here.",
  },
  consumerGap: {
    severity: "none",
    note: "No consumer tier exists for the self-hosted reference deployment; data handling is deployer-controlled.",
  },
};
