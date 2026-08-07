import type { Model } from "../schema";

export const gemini31Pro: Model = {
  slug: "gemini-3-1-pro",
  displayName: "Gemini 3.1 Pro",
  provider: "Google",
  family: "Gemini 3",
  versionLabel: "gemini-3.1-pro-preview via generativelanguage.googleapis.com",
  endpoint: "generativelanguage.googleapis.com",
  openWeight: false,
  releasedAt: "2026-02-19",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 0.28,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Aggregates gemini-3.1-pro-preview variants; includes traffic arriving via the silently-repointed gemini-3-pro-preview ID. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "partial",
      summary:
        "Own model card with full Frontier Safety Framework evaluation across five risk domains; but F5's monthly CASI board places the Gemini 3.x line mid-to-low tier and strikingly volatile — the Gemini 3 Pro preview moved 55.7 CASI points across a four-month period, against a top-10 threshold near 86.",
      evidence: [
        {
          label: "Gemini 3.1 Pro model card",
          url: "https://deepmind.google/models/model-cards/gemini-3-1-pro/",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "Our Frontier Safety Framework includes rigorous evaluations that address risks of severe harm from frontier models, covering five risk domains: CBRN (chemical, biological, radiological and nuclear information risks), cyber, harmful manipulation, machine learning R&D and misalignment.",
        },
        {
          label: "F5 Labs CASI/ARS leaderboards",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
        },
        {
          label: "F5 Labs: The Small Model Cliff (Gemini volatility analysis)",
          url: "https://www.f5.com/labs/articles/the-small-model-cliff",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Gemini 3 Pro preview moved 55.7 points across the period, ending close to the volatile cohort.",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Inherits Google's layered defenses (model hardening against indirect injection, agentic security architecture); researcher demonstrations against Gemini-connected surfaces continue to land.",
      evidence: [
        {
          label: "Advancing Gemini's security safeguards (DeepMind)",
          url: "https://deepmind.google/blog/advancing-geminis-security-safeguards/",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "This model hardening has significantly boosted Gemini’s ability to identify and ignore injected instructions, lowering its attack success rate.",
        },
        {
          label:
            "Lessons from Defending Gemini Against Indirect Prompt Injections (white paper)",
          url: "https://storage.googleapis.com/deepmind-media/Security%20and%20Privacy/Gemini_Security_Paper.pdf",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "However, such adversarial training will not render the model immune to indirect prompt injection and successful attacks remain possible, particularly with increased adversarial effort, novel techniques, or highly tailored exploits.",
        },
      ],
    },
    dataHandling: {
      grade: "partial",
      summary:
        "Same Gemini API posture verified for the 3 Pro entry: paid tier not used for improvement (55-day abuse logs, ZDR by approval), unpaid tier used for improvement including human review, consumer Gemini Apps default to data use.",
      evidence: [
        {
          label: "Gemini API terms of service",
          url: "https://ai.google.dev/gemini-api/terms",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "To help with quality and improve our products, human reviewers may read, annotate, and process your API input and output.",
        },
        {
          label: "Gemini API zero-data-retention documentation",
          url: "https://ai.google.dev/gemini-api/docs/zdr",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "When your request for ZDR for a particular project is approved, all user content (prompts and responses) and identifiable metadata (such as IP addresses and Google Account IDs) are cleared prior to logging.",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "Dedicated model card published at release (2026-02-19) with a full Frontier Safety Framework evaluation; Google's external-testing arrangements (UK AISI early access, independent assessors) carried forward from Gemini 3.",
      evidence: [
        {
          label: "Gemini 3.1 Pro model card",
          url: "https://deepmind.google/models/model-cards/gemini-3-1-pro/",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "Our Frontier Safety Framework includes rigorous evaluations that address risks of severe harm from frontier models, covering five risk domains: CBRN (chemical, biological, radiological and nuclear information risks), cyber, harmful manipulation, machine learning R&D and misalignment.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "Google Cloud's accredited ISO/IEC 42001:2023 certification covers Vertex generative AI, alongside SOC 1/2/3, ISO 27001 family, and HIPAA support.",
      evidence: [
        {
          label: "Google Cloud ISO/IEC 42001 certification",
          url: "https://cloud.google.com/security/compliance/iso-42001",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "Google Cloud Platform, Google Workspace, and Gemini (App) are certified as ISO/IEC 42001:2023 compliant.",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Still a preview-suffixed ID nearly six months after release, and it inherited traffic via a silent alias repoint from its predecessor. Vertex stable-version lifecycle discipline exists but has yet to apply to this flagship line.",
      evidence: [
        {
          label: "Gemini API changelog",
          url: "https://ai.google.dev/gemini-api/docs/changelog",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "The gemini-3-pro-preview now points to gemini-3.1-pro-preview",
        },
        {
          label: "Vertex AI model versions and lifecycle",
          url: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "The following tables list the available models and their retirement dates.",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: true,
      documentedSafetyPolicy: true,
      enterpriseDataControls: true,
    },
    tier2: {
      externalPreDeploymentTesting: {
        satisfied: true,
        note: "Frontier Safety Framework evaluation is disclosed in the model card; the archived card does not name external assessors, so the external-testing element rests on Google's release materials rather than the card itself.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Changelog exists, but the preview-only ID and the inherited silent alias repoint weaken version stability in practice.",
      },
      statedDeprecationPolicy: true,
    },
  },
  compliance: {
    soc2: true,
    iso42001: true,
    hipaaEligible: true,
    trainsOnCustomerDataByDefault: false,
    retentionWindow:
      "Paid tier: 55-day abuse-monitoring logs; ZDR by approval; unpaid tier: content used for improvement incl. human review",
    dataResidency:
      "Vertex regional/jurisdictional endpoints (US, EU; expanding) with in-region ML processing; global endpoint carries no residency guarantee",
    euAiActNotes: "Signed the EU GPAI Code of Practice (2025-07-30).",
    deprecationPolicy:
      "Published Vertex model lifecycle with retirement dates; preview-tier IDs excluded in practice",
    cloudAvailability: ["Gemini API", "Google Vertex AI"],
  },
  jurisdiction: {
    zones: ["US", "EU"],
    regionalOptions: true,
    note: "Vertex regional/jurisdictional endpoints (US, EU; expanding) with in-region ML processing; the global endpoint carries no residency guarantee.",
  },
  consumerGap: {
    severity: "wide",
    note: "Paid API tier is not used for improvement, but the unpaid tier is (including human review) and consumer Gemini Apps default to data use.",
  },
  notes:
    "Google's current flagship as of Aug 2026 (no 3.5 Pro exists; newer releases are Flash-tier). Succeeded Gemini 3 Pro via the alias repoint recorded in the change feed.",
};
