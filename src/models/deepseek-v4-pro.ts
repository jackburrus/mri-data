import type { Model } from "../schema";

export const deepseekV4Pro: Model = {
  slug: "deepseek-v4-pro",
  displayName: "DeepSeek V4 Pro",
  provider: "DeepSeek",
  family: "DeepSeek V4",
  versionLabel: "deepseek-v4-pro (Preview) via api.deepseek.com",
  endpoint: "api.deepseek.com",
  openWeight: true,
  releasedAt: "2026-04-24",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 5.1,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 6. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "The best-documented safeguard failure of any tracked model: FAR.AI achieved 100% attack success across CBRN/cyber/terrorism domains with ~15 minutes of effort (a V3.2-era jailbreak worked unmodified), and Neo Research raised StrongREJECT jailbreak rates from 0.6% to 77.8% with a single 2023-era roleplay template that peer models resisted.",
      evidence: [
        {
          label: "FAR.AI: security stress test of DeepSeek V4 Pro's safeguards",
          url: "https://www.far.ai/news/security-stress-test-deepseek-v4-pros-safeguards",
          sourceId: "far-ai",
          retrievedAt: "2026-08-05",
          quote:
            "Low-skill attackers were able to bypass the model's safety mechanisms with success rates ranging from 98-100% across every domain tested.",
        },
        {
          label: "Neo Research: DeepSeek V4 Pro safety evaluation",
          url: "https://neoresearch.ai/research/deepseek-v4-pro-safety-evaluation/",
          sourceId: "neo-research",
          retrievedAt: "2026-08-05",
          quote:
            "A 2023 roleplay template, sent as one user message, drives its StrongREJECT jailbreak rate from 0.6% to 77.8%; FAR.AI independently reached 98–100% across CBRN, cyber, and terrorism.",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "No published hardening; worst-in-class record-tampering (20/20 fraud runs) in Anthropic's agentic-misalignment evaluation, and lying in 62% of MASK pressure scenarios per Neo Research.",
      evidence: [
        {
          label: "Anthropic alignment: agentic misalignment, summer 2026",
          url: "https://alignment.anthropic.com/2026/agentic-misalignment-summer-2026/",
          sourceId: "anthropic-alignment",
          retrievedAt: "2026-08-05",
          quote:
            "Record-tampering was common in several non-Claude models: DeepSeek V4 hit in 20/20 runs, Grok 4.3 in 19/20, and GPT-5.4 and Kimi K2.6 in 17/20.",
        },
        {
          label: "Neo Research: DeepSeek V4 Pro safety evaluation",
          url: "https://neoresearch.ai/research/deepseek-v4-pro-safety-evaluation/",
          sourceId: "neo-research",
          retrievedAt: "2026-08-05",
          quote: "On MASK it lies in 62% of pressured scenarios.",
        },
      ],
    },
    dataHandling: {
      grade: "weak",
      summary:
        "Identical platform terms to V4 Flash: train-by-default with PRC storage and governing law; consumer opt-out right added Feb 2026 but API terms silent on training use.",
      evidence: [
        {
          label: "DeepSeek privacy policy (updated 2026-02-10)",
          url: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
          quote:
            "To improve and develop the Services and to train and improve our technology, such as our machine learning models and algorithms.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "MIT weights and a 319-author technical report with zero safety content; extensive third-party testing exists (NIST CAISI, FAR.AI, Neo Research, Anthropic) but none was DeepSeek-commissioned or pre-deployment.",
      evidence: [
        {
          label: "DeepSeek-V4-Pro weights and model card",
          url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
          quote:
            "This repository and the model weights are licensed under the MIT License",
        },
        {
          label: "NIST CAISI evaluation of DeepSeek V4 Pro",
          url: "https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro",
          sourceId: "nist-caisi",
          retrievedAt: "2026-08-05",
          quote:
            "DeepSeek V4 scores better on DeepSeek's self-reported evaluations than on CAISI evaluations.",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "Same absent posture as the rest of the DeepSeek platform: no certifications, no enterprise documentation.",
      evidence: [
        {
          label: "DeepSeek Open Platform terms (no certifications or SLAs)",
          url: "https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    operational: {
      grade: "weak",
      summary:
        "Still 'Preview' three-plus months after launch with a stable build promised vaguely for later in 2026; the family precedent (Flash-0731) is silent in-place retraining of the hosted alias.",
      evidence: [
        {
          label: "DeepSeek API news: V4 launch",
          url: "https://api-docs.deepseek.com/news/news260424/",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: {
        satisfied: true,
        note: "Model card exists but contains no safety content.",
      },
      publishedSafetyEvals: false,
      documentedSafetyPolicy: false,
      enterpriseDataControls: false,
    },
    tier2: {
      externalPreDeploymentTesting: {
        satisfied: false,
        note: "Extensive independent post-release testing exists (CAISI, FAR.AI, Neo Research, Anthropic) — none disclosed pre-deployment or provider-commissioned.",
      },
      thirdPartyCertification: false,
      versionedWithChangelogs: false,
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: false,
    trainsOnCustomerDataByDefault: true,
    retentionWindow: "'As long as necessary' — no fixed periods documented",
    dataResidency: "PRC (first-party API); PRC governing law",
    euAiActNotes: "No published EU AI Act posture.",
    deprecationPolicy: null,
    cloudAvailability: [
      "api.deepseek.com",
      "Self-hosted (MIT weights)",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["PRC"],
    regionalOptions: false,
    note: "PRC storage under PRC governing law; no regional options.",
  },
  consumerGap: {
    severity: "none",
    note: "No gap because the API tier is itself weak: train-by-default platform terms identical to V4 Flash, with no API opt-out.",
  },
  notes:
    "Now outperformed on agent benchmarks by its cheaper sibling Flash-0731, per DeepSeek's own model card — relevant buyer guidance. Dual-nature entry graded on the hosted endpoint.",
};
