import type { Model } from "../schema";

export const gemini25Flash: Model = {
  slug: "gemini-2-5-flash",
  displayName: "Gemini 2.5 Flash",
  provider: "Google",
  family: "Gemini 2.5",
  versionLabel: "gemini-2.5-flash via generativelanguage.googleapis.com",
  endpoint: "generativelanguage.googleapis.com",
  openWeight: false,
  releasedAt: "2025-06-17",
  reviewStatus: "draft",
  usageShare: {
    pct: 0.93,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only. Highest-share tracked model; Gemini 2.5 family retirement is set for 2026-10-16.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "partial",
      summary:
        "Smaller/faster tier of the Gemini line; safety training is shared with Pro but independent testing shows higher attack success rates than the flagship.",
      evidence: [
        {
          label: "Gemini 2.5 model card",
          url: "https://deepmind.google/models/gemini/flash/",
          sourceId: "google",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "Widely deployed in high-volume agentic and summarization pipelines where indirect injection demonstrations have repeatedly succeeded; fewer defensive layers than flagship deployments.",
      evidence: [
        {
          label: "Independent research on Gemini-surface prompt injection",
          url: "https://arxiv.org/abs/2302.12173",
          sourceId: "academic",
          retrievedAt: "2026-08-03",
          note: "Indirect prompt injection literature; specific Gemini demonstrations tracked in the incident feed.",
        },
      ],
    },
    dataHandling: {
      grade: "partial",
      summary:
        "Same posture as the rest of the Gemini API: paid tier not trained on; free tier may be used for improvement.",
      evidence: [
        {
          label: "Gemini API terms of service",
          url: "https://ai.google.dev/gemini-api/terms",
          sourceId: "google",
          retrievedAt: "2026-08-03",
          quote:
            "To help with quality and improve our products, human reviewers may read, annotate, and process your API input and output.",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "Model card published, covered by the Frontier Safety Framework and Google's external testing arrangements.",
      evidence: [
        {
          label: "Google DeepMind Frontier Safety Framework",
          url: "https://deepmind.google/about/responsibility-safety/",
          sourceId: "google",
          retrievedAt: "2026-08-03",
          quote:
            "We also introduced, and continue to update, our Frontier Safety Framework - a set of protocols to help us stay ahead of possible severe risks from powerful frontier AI models.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "Same Google Cloud certification stack as Gemini 3 Pro when deployed via Vertex.",
      evidence: [
        {
          label: "Google Cloud compliance resource center",
          url: "https://cloud.google.com/security/compliance",
          sourceId: "google",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Stable versioned endpoint with lifecycle dates, but the Flash tier has seen in-place quality/behavior tuning flagged by developers between dated releases.",
      evidence: [
        {
          label: "Gemini API changelog and model versions",
          url: "https://ai.google.dev/gemini-api/docs/changelog",
          sourceId: "google",
          retrievedAt: "2026-08-03",
          quote:
            "Released gemini-2.5-flash , our first stable 2.5 Flash model.",
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
        note: "Covered by the same organizational external-testing arrangements as the Gemini flagship.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Versioned endpoint with lifecycle dates; in-place tuning has been reported by developers between dated releases.",
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
      "Paid tier: limited abuse-monitoring retention; free tier: data may be used for improvement",
    dataResidency: "Extensive regional options via Vertex AI",
    euAiActNotes: "Signed the EU GPAI Code of Practice.",
    deprecationPolicy:
      "Published model lifecycle and discontinuation dates on Vertex AI",
    cloudAvailability: ["Gemini API", "Google Vertex AI"],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: true,
    note: "Global serving by default (US provider home jurisdiction presumed); extensive regional pinning available via Vertex AI.",
  },
  consumerGap: {
    severity: "wide",
    note: "Paid API tier is not trained on, but the free tier may be used for improvement and consumer Gemini Apps default to data use.",
  },
};
