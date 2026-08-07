import type { Model } from "../schema";

export const mistralMedium31: Model = {
  slug: "mistral-medium-3-1",
  displayName: "Mistral Medium 3.1",
  provider: "Mistral AI",
  family: "Mistral Medium",
  versionLabel: "mistral-medium-2508 via api.mistral.ai",
  endpoint: "api.mistral.ai",
  openWeight: false,
  releasedAt: "2025-08-12",
  reviewStatus: "draft",
  usageShare: {
    pct: 0.01,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "Independent security indexes have consistently placed Mistral's hosted models in the lower tier for attack resistance; moderation is available as a separate API rather than built into model behavior.",
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
        "No published agentic-injection hardening or agent red-teaming results at time of entry.",
      evidence: [
        {
          label: "Mistral AI documentation (guardrailing)",
          url: "https://docs.mistral.ai/capabilities/guardrailing/",
          sourceId: "mistral",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    dataHandling: {
      grade: "partial",
      summary:
        "EU residency and GDPR posture are genuine strengths; paid La Plateforme traffic is not used for training by default, but free-tier and some product-surface defaults are less clean, and documentation is thinner than the majors'.",
      evidence: [
        {
          label: "Mistral AI terms and privacy policy",
          url: "https://mistral.ai/terms",
          sourceId: "mistral",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Model announcements and basic cards exist, but no external pre-deployment testing and sparse published safety evals. Mistral publicly disputes the framing of company-level safety indexes.",
      evidence: [
        {
          label: "Mistral Medium 3.1 announcement",
          url: "https://mistral.ai/news/mistral-medium-3",
          sourceId: "mistral",
          retrievedAt: "2026-08-03",
          quote:
            "Performance accuracy on all benchmarks were obtained through the same internal evaluation pipeline.",
        },
        {
          label: "FLI AI Safety Index (company-level context)",
          url: "https://safetyindex.ai/",
          sourceId: "fli-index",
          retrievedAt: "2026-08-03",
          note: "Company-level assessment shown as context only; never sets model-level grades.",
        },
      ],
    },
    compliance: {
      grade: "partial",
      summary:
        "SOC 2 attested; EU AI Act code-of-practice signatory with EU jurisdiction as a structural advantage; thinner certification stack than hyperscaler-hosted rivals.",
      evidence: [
        {
          label: "Mistral AI trust and terms",
          url: "https://mistral.ai/terms",
          sourceId: "mistral",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Dated version labels (e.g. -2508) and a deprecation table in docs; changelog quality is inconsistent.",
      evidence: [
        {
          label: "Mistral AI model lifecycle documentation",
          url: "https://docs.mistral.ai/getting-started/models/",
          sourceId: "mistral",
          retrievedAt: "2026-08-03",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: {
        satisfied: true,
        note: "Model documentation is thinner than frontier-lab system cards.",
      },
      publishedSafetyEvals: {
        satisfied: true,
        note: "Limited: moderation benchmarks and policy documentation rather than a full safety eval suite.",
      },
      documentedSafetyPolicy: true,
      enterpriseDataControls: true,
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dated version labels (e.g. -2508); changelog quality is inconsistent.",
      },
      statedDeprecationPolicy: true,
    },
  },
  compliance: {
    soc2: true,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: false,
    retentionWindow: "Documented retention for abuse monitoring; EU-hosted",
    dataResidency: "EU (primary selling point)",
    euAiActNotes: "EU-headquartered; GPAI Code of Practice signatory.",
    deprecationPolicy: "Deprecation table maintained in API documentation",
    cloudAvailability: [
      "La Plateforme (api.mistral.ai)",
      "Azure AI Foundry",
      "AWS Bedrock",
    ],
  },
  jurisdiction: {
    zones: ["EU"],
    regionalOptions: false,
    note: "EU-hosted La Plateforme (primary selling point); hyperscaler deployments via Azure and Bedrock follow those platforms' regions.",
  },
  consumerGap: {
    severity: "narrow",
    note: "Paid La Plateforme traffic is not used for training by default, but free-tier and some product-surface defaults are less clean.",
  },
};
