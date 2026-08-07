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
      grade: "partial",
      summary:
        "Xiaomi's own text now confirms the no-training default, and states it categorically rather than as a configurable option: submitted content is not used for training or any other purpose. Residency is disclosed (Netherlands and Singapore) with EU Standard Contractual Clauses and a named EEA controller. What holds this short of strong is retention: the policy commits only to keeping data for 'the period necessary', with no defined window and no zero-retention option — so the 30-day prompt-logging figure carried by secondary reporting remains unconfirmed by the provider. Self-hosting the MIT weights is deployer-controlled.",
      evidence: [
        {
          label: "Xiaomi MiMo Privacy Policy §3.1 — training use",
          url: "https://privacy.mi.com/XiaomiMiMoPlatform/en_GB/",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-07",
          quote:
            "Xiaomi will not use the content you provide for model training or any other purposes.",
        },
        {
          label: "Xiaomi MiMo Privacy Policy §10 — data residency",
          url: "https://privacy.mi.com/XiaomiMiMoPlatform/en_GB/",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-07",
          quote:
            "Currently, Xiaomi has data centers in the Netherlands, and Singapore.",
        },
        {
          label: "Xiaomi MiMo Privacy Policy §6 — retention (undefined window)",
          url: "https://privacy.mi.com/XiaomiMiMoPlatform/en_GB/",
          sourceId: "xiaomi",
          retrievedAt: "2026-08-07",
          quote:
            "As a general rule, we retain personal information for the period necessary for the purposes described in this Privacy Policy, or as required by applicable law.",
          note: "The gap that keeps this partial rather than strong: no numeric retention window and no zero-retention control.",
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
        note: "The privacy policy is now verified, but it governs data handling only — no acceptable-use or safety policy is published, and the MIT weights carry none.",
      },
      enterpriseDataControls: {
        satisfied: true,
        note: "The privacy policy states categorically that submitted content is not used for training, and discloses residency with EU SCCs. No zero-retention control or defined retention window.",
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
    trainsOnCustomerDataByDefault: false,
    retentionWindow:
      "Undefined by the provider — 'the period necessary'; no zero-retention option. The 30-day figure from secondary reporting is not in Xiaomi's text.",
    dataResidency: "Netherlands and Singapore",
    euAiActNotes:
      "No published EU AI Act posture, but the privacy policy names Xiaomi Technology Netherlands B.V. as the EEA/UK/CH controller and commits to EU Standard Contractual Clauses for outbound transfers.",
    deprecationPolicy:
      "Dated deprecations announced per-release; no formal policy",
    cloudAvailability: [
      "mimo.mi.com (hosted)",
      "Self-hosted (MIT weights)",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["EU", "SG", "PRC"],
    regionalOptions: false,
    note: "The privacy policy discloses data centers in the Netherlands and Singapore, with Xiaomi Technology Netherlands B.V. as the EEA/UK/CH controller. PRC is retained because Xiaomi is a PRC-parented group and the policy does not exclude affiliate access; no user-selectable region is offered.",
  },
  notes:
    "Second-largest tracked share. The data-handling grade was under-review on the stated grounds that the terms resisted automated capture; that was a misdiagnosis — the URL cited was a SPA path returning the marketing homepage, and the real policy is served as plain HTML from Xiaomi's central privacy host. Resolved to partial on 2026-08-07. The closed sibling MiMo-V2.5-Pro (API-only, 1T params) is not covered by this entry.",
};
