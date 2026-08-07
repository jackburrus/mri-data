import type { Model } from "../schema";

export const mimoV25: Model = {
  slug: "mimo-v2-5",
  displayName: "Xiaomi MiMo v2.5",
  provider: "Xiaomi",
  family: "MiMo",
  versionLabel:
    "mimo-v2.5 (open weights, MIT) via mimo.mi.com / multiple hosts",
  endpoint: "mimo.mi.com",
  openWeight: true,
  releasedAt: "2026-04-22",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 8.8,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 2, driven by aggressive pricing and agentic marketing. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "First independent datapoint arrived in July 2026: CASI 73.80, bottom tier against a frontier band of 85–95 and near DeepSeek R1's historically poor score; Xiaomi publishes no safety evals and jailbreak system prompts circulate publicly.",
      evidence: [
        {
          label: "F5 Labs CASI/ARS leaderboards (MiMo-V2.5: 73.80)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote: "MiMo-V2.5 (MiMo) debuts in July at 73.8",
        },
        {
          label: "MiMo-V2.5 model card (no safety section)",
          url: "https://huggingface.co/XiaomiMiMo/MiMo-V2.5",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "Marketed on frontier-level agentic capability with 1,000+ tool-call runs in internal tests, yet no injection hardening or agent-security results have been published by anyone.",
      evidence: [
        {
          label:
            "MiMo-V2.5-Pro release notes (agentic claims, no safety results)",
          url: "https://mimo.xiaomi.com/mimo-v2-5-pro/",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-05",
          quote:
            "When paired with a proper harness, V2.5-Pro can sustain complex, long-horizon tasks spanning more than a thousand tool calls.",
        },
      ],
    },
    dataHandling: {
      grade: "under-review",
      summary:
        "The hosted platform publishes privacy and user-agreement pages, but their JS-rendered content could not be captured for verification; secondary reporting claims a no-train API default with 30-day prompt logging, unconfirmed against Xiaomi's own text. Residency undisclosed. Self-hosting the MIT weights is deployer-controlled.",
      evidence: [
        {
          label: "MiMo platform privacy policy (content pending verification)",
          url: "https://mimo.mi.com/docs/en-US/terms/privacy-policy",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-05",
          note: "JS-rendered page; requires browser capture (Phase 2 Browser Rendering) to archive terms.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "MIT open weights (310B MoE) and a maintained model-update log, but no technical report, no safety section, and no external pre-deployment testing.",
      evidence: [
        {
          label: "MiMo-V2.5 weights and model card",
          url: "https://huggingface.co/XiaomiMiMo/MiMo-V2.5",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "Xiaomi's corporate trust center lists company-level certifications, but nothing scopes the MiMo platform or API specifically.",
      evidence: [
        {
          label: "Xiaomi trust center (corporate-level only)",
          url: "https://trust.mi.com/compliance",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-05",
          quote:
            "We fully demonstrate the compliance of our practices through regular self-assessment, third-party audits and certifications.",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Genuinely mixed: dated checkpoints and a real update log with enforced dated deprecations (V2 series retired 2026-06-30) — but also documented silent in-place updates where 'model API call method and model name remain unchanged' while behavior shifted.",
      evidence: [
        {
          label:
            "MiMo model updates log (dated checkpoints, silent updates, deprecations)",
          url: "https://mimo.mi.com/docs/en-US/updates/model",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-05",
          quote: "The model API call method and model name remain unchanged",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: false,
      documentedSafetyPolicy: {
        satisfied: false,
        note: "Terms pages exist but content is unverifiable by capture; MIT weights carry no acceptable-use policy.",
      },
      enterpriseDataControls: {
        satisfied: false,
        note: "Hosted-API terms unverified; treated as unsatisfied pending Phase 2 browser capture.",
      },
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: false,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dated checkpoints and an update log — undermined in practice by documented silent updates under stable names.",
      },
      statedDeprecationPolicy: {
        satisfied: false,
        note: "Deprecations are announced with dates, but no formal policy or notice window is published.",
      },
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: null,
    retentionWindow:
      "Unverified (secondary reporting claims 30-day prompt logs)",
    dataResidency: "Undisclosed",
    euAiActNotes: "No published EU AI Act posture.",
    deprecationPolicy:
      "Dated deprecations announced per-release; no formal policy",
    cloudAvailability: [
      "mimo.mi.com (hosted)",
      "Self-hosted (MIT weights)",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["PRC"],
    regionalOptions: false,
    note: "Residency undisclosed; the provider's PRC home jurisdiction is used here explicitly as a placeholder pending verification of the hosted platform's terms.",
  },
  notes:
    "Second-largest tracked share. The under-review data-handling grade is honest, not evasive: the terms exist but resist automated capture, which makes this entry the first concrete requirement for the Phase 2 browser-rendering snapshot path. The closed sibling MiMo-V2.5-Pro (API-only, 1T params) is not covered by this entry.",
};
