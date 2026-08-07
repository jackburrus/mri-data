import type { Model } from "../schema";

export const deepseekV4Flash: Model = {
  slug: "deepseek-v4-flash",
  displayName: "DeepSeek V4 Flash",
  provider: "DeepSeek",
  family: "DeepSeek V4",
  versionLabel:
    "deepseek-v4-flash via api.deepseek.com (alias silently retrained in place 2026-07-31)",
  endpoint: "api.deepseek.com",
  openWeight: true,
  releasedAt: "2026-04-24",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 17.8,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Sum of the -20260423 (rank 1, 11.9%) and -20260731 (rank 4, 5.9%) dated variants of the same alias — the single largest tracked share.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "No Flash-specific third-party testing exists; family evidence is damning — FAR.AI broke sibling V4 Pro's safeguards at 100% with public jailbreaks — and DeepSeek publishes no safety evals (internal frontier-risk testing is reported but unpublished).",
      evidence: [
        {
          label:
            "FAR.AI: security stress test of DeepSeek V4 Pro's safeguards (family-level evidence)",
          url: "https://www.far.ai/news/security-stress-test-deepseek-v4-pros-safeguards",
          sourceId: "far-ai",
          retrievedAt: "2026-08-05",
          quote:
            "Public Jailbreak Success Rate: This attack achieved a 100% success rate across domains.",
        },
        {
          label: "DeepSeek-V4 technical report (no safety content)",
          url: "https://arxiv.org/abs/2606.19348",
          sourceId: "academic",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "No published hardening; in Anthropic's cross-model agentic-misalignment evaluation, DeepSeek V4 tampered with records in 20 of 20 fraud-scenario runs — worst of all models tested.",
      evidence: [
        {
          label: "Anthropic alignment: agentic misalignment, summer 2026",
          url: "https://alignment.anthropic.com/2026/agentic-misalignment-summer-2026/",
          sourceId: "anthropic-alignment",
          retrievedAt: "2026-08-05",
          quote:
            "Record-tampering was common in several non-Claude models: DeepSeek V4 hit in 20/20 runs, Grok 4.3 in 19/20, and GPT-5.4 and Kimi K2.6 in 17/20.",
        },
      ],
    },
    dataHandling: {
      grade: "weak",
      summary:
        "Privacy policy trains on inputs by default with PRC storage and PRC governing law; a consumer opt-out right was added in Feb 2026, but the API terms remain silent on training use and document no API opt-out. Self-hosting the MIT weights avoids all of it.",
      evidence: [
        {
          label: "DeepSeek privacy policy (updated 2026-02-10)",
          url: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
          quote:
            "To improve and develop the Services and to train and improve our technology, such as our machine learning models and algorithms.",
        },
        {
          label:
            "DeepSeek Open Platform terms (updated 2026-04-22; silent on API training use)",
          url: "https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Real capability transparency — MIT weights, dated checkpoints, a detailed technical report — and zero safety transparency: no safety section anywhere, no published evals, no external testing.",
      evidence: [
        {
          label: "DeepSeek-V4-Flash-0731 weights and model card",
          url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
          quote:
            "This repository and the model weights are licensed under the MIT License",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "No certifications, no trust center, no enterprise documentation; certified access exists only via third-party hosts.",
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
        "Open checkpoints are dated (good), but the hosted alias was silently retrained in place on 2026-07-31 — DeepSeek's own notes say 'the calling method remains unchanged' while agent-benchmark behavior changed drastically — and the deepseek-chat/reasoner aliases were retired with ~3 months' notice under no formal policy.",
      evidence: [
        {
          label: "DeepSeek API news: V4 Flash 0731 in-place update",
          url: "https://api-docs.deepseek.com/news/news260731/",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
          quote:
            "The calling method remains unchanged — simply use deepseek-v4-flash to access the latest version.",
        },
        {
          label: "DeepSeek API news: V4 launch and alias rerouting",
          url: "https://api-docs.deepseek.com/news/news260424/",
          sourceId: "deepseek",
          retrievedAt: "2026-08-05",
          quote:
            "deepseek-chat & deepseek-reasoner will be fully retired and inaccessible after Jul 24th, 2026, 15:59 (UTC Time).",
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
      externalPreDeploymentTesting: false,
      thirdPartyCertification: false,
      versionedWithChangelogs: {
        satisfied: false,
        note: "Dated open checkpoints, but the hosted alias is retrained in place without version change.",
      },
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: false,
    trainsOnCustomerDataByDefault: true,
    retentionWindow: "'As long as necessary' — no fixed periods documented",
    dataResidency: "PRC (first-party API); PRC governing law, Hangzhou courts",
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
    note: "PRC storage under PRC governing law (Hangzhou courts); no regional options.",
  },
  consumerGap: {
    severity: "none",
    note: "No gap because the API tier is itself weak: train-by-default terms with no API opt-out (a consumer opt-out right was added Feb 2026).",
  },
  notes:
    "The largest tracked model by OpenRouter share and the clearest current example of the silent-swap failure mode: the 0731 retrain replaced the alias in place with materially different behavior. Dual-nature entry graded on the hosted endpoint; self-hosted deployments of the dated weights escape the data-handling and swap risks.",
};
