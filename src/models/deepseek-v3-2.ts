import type { Model } from "../schema";

export const deepseekV32: Model = {
  slug: "deepseek-v3-2",
  displayName: "DeepSeek V3.2",
  provider: "DeepSeek",
  family: "DeepSeek V3",
  versionLabel: "deepseek-chat (V3.2) via api.deepseek.com",
  endpoint: "api.deepseek.com",
  openWeight: true,
  releasedAt: "2025-09-29",
  reviewStatus: "draft",
  usageShare: {
    pct: 0.71,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only. Aggregates v3.2 and v3.2-exp; DeepSeek's V4 family separately holds ~23% across three variants.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "Independent security testing of the DeepSeek family has reported near-total attack success with standard jailbreak suites; no evidence of a substantial safety-training investment comparable to frontier peers.",
      evidence: [
        {
          label: "Cisco: security evaluation of DeepSeek reasoning models",
          url: "https://blogs.cisco.com/security/evaluating-security-risk-in-deepseek-and-other-frontier-reasoning-models",
          sourceId: "cisco-research",
          retrievedAt: "2026-08-03",
          quote:
            "Compared to other frontier models, DeepSeek R1 lacks robust guardrails, making it highly susceptible to algorithmic jailbreaking and potential misuse.",
          note: "Reported 100% attack success rate on DeepSeek R1 with the HarmBench suite; family-level signal pending model-specific retest.",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "No published injection hardening or agent-scenario safety results.",
      evidence: [
        {
          label: "DeepSeek V3.2 technical report",
          url: "https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp",
          sourceId: "deepseek",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    dataHandling: {
      grade: "weak",
      summary:
        "First-party API terms permit using inputs to improve services with no documented opt-out; data is stored in the PRC. Self-hosting the open weights avoids this entirely — this grade applies to the hosted endpoint.",
      evidence: [
        {
          label: "DeepSeek privacy policy",
          url: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html",
          sourceId: "deepseek",
          retrievedAt: "2026-08-03",
          quote:
            "We retain Personal Data for as long as necessary to provide our Services and for the other purposes set out in this Privacy Policy.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Genuinely open weights and detailed technical reports — real transparency about capability — but no safety evals, no model-card safety section of substance, no external testing.",
      evidence: [
        {
          label: "DeepSeek V3.2 weights and technical report",
          url: "https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp",
          sourceId: "deepseek",
          retrievedAt: "2026-08-03",
          quote:
            "This repository and the model weights are licensed under the MIT License",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "No third-party certifications, no HIPAA pathway, no enterprise compliance documentation for the first-party API.",
      evidence: [
        {
          label: "DeepSeek platform documentation",
          url: "https://platform.deepseek.com/",
          sourceId: "deepseek",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Open-weight releases are explicit and versioned (a strength), but the hosted endpoint serves an alias that has been updated in place between releases.",
      evidence: [
        {
          label: "DeepSeek API model documentation",
          url: "https://api-docs.deepseek.com/",
          sourceId: "deepseek",
          retrievedAt: "2026-08-03",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: {
        satisfied: true,
        note: "Technical report and open weights; safety documentation is minimal.",
      },
      publishedSafetyEvals: false,
      documentedSafetyPolicy: {
        satisfied: false,
        note: "Usage terms exist, but no documented safety policy or evaluation process.",
      },
      enterpriseDataControls: false,
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: false,
      versionedWithChangelogs: {
        satisfied: false,
        note: "Open releases are versioned, but the hosted alias is updated in place.",
      },
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: false,
    trainsOnCustomerDataByDefault: true,
    retentionWindow: "Not documented",
    dataResidency: "PRC (first-party API)",
    euAiActNotes:
      "No published EU AI Act posture; deployer obligations fall entirely on the customer.",
    deprecationPolicy: "None stated for the hosted API",
    cloudAvailability: [
      "api.deepseek.com",
      "Self-hosted (open weights)",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["PRC"],
    regionalOptions: false,
    note: "First-party API stores data in the PRC; no regional options.",
  },
  consumerGap: {
    severity: "none",
    note: "No gap because there is no better enterprise tier: the hosted API itself permits training on inputs with no documented opt-out.",
  },
  notes:
    "Dual-nature entry: the tier grades the hosted first-party endpoint, where usage concentrates. Self-hosted deployments of the same weights escape the data-handling failure but inherit the weak jailbreak/injection posture.",
};
