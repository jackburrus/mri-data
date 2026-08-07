import type { Model } from "../schema";
import { SHARED_NOTES } from "../shared";

export const kimiK2: Model = {
  slug: "kimi-k2",
  displayName: "Kimi K2",
  provider: "Moonshot AI",
  family: "Kimi K2",
  versionLabel: "Kimi-K2-Instruct (open weights, self-hosted reference)",
  endpoint: "self-hosted / multiple inference providers",
  openWeight: true,
  releasedAt: "2025-07-11",
  reviewStatus: "draft",
  lifecycle: {
    status: "legacy",
    successor: "Kimi K3 (released 2026-07-15, tracked separately)",
    note: "Open K2 checkpoints remain available; Moonshot usage and development have moved to K3, which launched hosted-first under a new custom license.",
  },
  usageShare: {
    pct: 0.05,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only. Aggregates K2/K2-0905/K2-thinking; successor Kimi K3 separately ranks #12 at ~2.4%.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "Bare weights jailbreak readily in independent testing; safety behavior is minimal relative to closed frontier peers.",
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
        "Marketed for agentic use, which raises the stakes, but no published injection hardening or agent red-teaming results.",
      evidence: [
        {
          label: "Kimi K2 technical report",
          url: "https://moonshotai.github.io/Kimi-K2/",
          sourceId: "moonshot",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    dataHandling: {
      grade: "not-applicable",
      summary:
        "Deployer property: open weights, self-hosted reference. Moonshot's hosted platform.moonshot.ai has separate PRC-jurisdiction terms not graded here.",
      evidence: [
        {
          label: "Kimi K2 weights and license",
          url: "https://huggingface.co/moonshotai/Kimi-K2-Instruct",
          sourceId: "moonshot",
          retrievedAt: "2026-08-03",
          quote:
            "Both the code repository and the model weights are released under the Modified MIT License",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Technical report and model card published; no safety evals or external testing.",
      evidence: [
        {
          label: "Kimi K2 technical report",
          url: "https://moonshotai.github.io/Kimi-K2/",
          sourceId: "moonshot",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    compliance: {
      grade: "not-applicable",
      summary:
        "Deployer property: no certifications attach to the weights; deployer inherits all obligations.",
      evidence: [
        {
          label: "Kimi K2 weights and license",
          url: "https://huggingface.co/moonshotai/Kimi-K2-Instruct",
          sourceId: "moonshot",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "strong",
      summary:
        "Immutable published checkpoints; versioned releases (K2, K2 Thinking) are explicit.",
      evidence: [
        {
          label: "Kimi K2 weights and license",
          url: "https://huggingface.co/moonshotai/Kimi-K2-Instruct",
          sourceId: "moonshot",
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
        note: "Basic safety coverage in the technical report; not a dedicated safety eval suite.",
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
      "Multiple inference providers",
      "platform.moonshot.ai (hosted, separate terms)",
    ],
  },
  jurisdiction: {
    zones: ["deployer"],
    regionalOptions: false,
    note: "Self-hosted reference deployment; Moonshot's hosted platform.moonshot.ai carries separate PRC-jurisdiction terms not graded here.",
  },
  consumerGap: {
    severity: "none",
    note: "No consumer tier exists for the self-hosted reference deployment; data handling is deployer-controlled.",
  },
};
