import type { Model } from "../schema";

export const grok41: Model = {
  slug: "grok-4-1",
  displayName: "Grok 4.1",
  provider: "xAI",
  family: "Grok 4",
  versionLabel: "grok-4-1 via api.x.ai",
  endpoint: "api.x.ai",
  openWeight: false,
  releasedAt: "2025-11-17",
  reviewStatus: "draft",
  lifecycle: {
    status: "legacy",
    successor: "Grok 4.3 / Grok 4.5 (per OpenRouter model listings)",
    note: "No longer appears in OpenRouter rankings as of 2026-08-04; xAI's current lineup there is Grok 4.3/4.5/4.20. Full re-verification of the successor lineup pending.",
  },

  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "Public jailbreaks land quickly after each release; permissive persona modes materially weaken the model's own stated policies, and independent indexes place it near the bottom among frontier labs.",
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
        "No published agentic-injection defenses or agent red-teaming results; deep X-platform integration creates a large indirect-injection surface.",
      evidence: [
        {
          label: "xAI API documentation",
          url: "https://docs.x.ai/",
          sourceId: "xai",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    dataHandling: {
      grade: "partial",
      summary:
        "Enterprise API states a no-train default; consumer X integration defaults to data use for training with opt-out buried in settings — one of the widest enterprise/consumer gaps tracked.",
      evidence: [
        {
          label: "xAI privacy policy",
          url: "https://x.ai/legal/privacy-policy",
          sourceId: "xai",
          retrievedAt: "2026-08-03",
          quote:
            "To develop and improve our Service and to conduct research: For example to develop new product features, to train our models, to identify usage trends, to operate and expand our business activities, to identify new customers, and for data analysis.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Published its first model card with Grok 4.1 and a risk-management framework — real movement — but no external pre-deployment testing and a history of unannounced system-prompt changes.",
      evidence: [
        {
          label: "Grok 4.1 model card",
          url: "https://data.x.ai/2025-11-17-grok-4-1-model-card.pdf",
          sourceId: "xai",
          retrievedAt: "2026-08-03",
          quote:
            "In line with our Risk Management Framework (RMF), we measure safety-relevant behaviors across three categories: abuse potential, concerning propensities, and dual-use capabilities.",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "Certification claims are not independently verifiable at time of entry; no public trust portal with audit artifacts.",
      evidence: [
        {
          label: "xAI legal and policy pages",
          url: "https://x.ai/legal",
          sourceId: "xai",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "weak",
      summary:
        "Repeated silent behavior changes in production — including system-prompt modifications acknowledged only after public incidents — and no changelog discipline.",
      evidence: [
        {
          label: "xAI statement on July 2025 Grok incident",
          url: "https://x.ai/news",
          sourceId: "xai",
          retrievedAt: "2026-08-03",
          note: "See linked incident record for the July 2025 unauthorized-modification episode.",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: {
        satisfied: true,
        note: "xAI's first model card, published with Grok 4.1 in November 2025.",
      },
      publishedSafetyEvals: {
        satisfied: true,
        note: "Published alongside the 4.1 model card and risk-management framework.",
      },
      documentedSafetyPolicy: true,
      enterpriseDataControls: true,
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: {
        satisfied: false,
        note: "Certification claims not independently verifiable at time of entry — no public trust portal with audit artifacts.",
      },
      versionedWithChangelogs: false,
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: false,
    retentionWindow:
      "Enterprise API: stated no-train default; consumer: training default with opt-out",
    dataResidency: "US",
    euAiActNotes:
      "Did not sign the EU GPAI Code of Practice safety chapter in full; posture unclear.",
    deprecationPolicy: "None stated",
    cloudAvailability: ["xAI API", "Azure AI Foundry"],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: false,
  },
  consumerGap: {
    severity: "wide",
    note: "Enterprise API states a no-train default while the consumer X integration defaults to training on user data with an opt-out buried in settings — one of the widest gaps tracked.",
  },
};
