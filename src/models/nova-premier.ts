import type { Model } from "../schema";

export const novaPremier: Model = {
  slug: "nova-premier",
  displayName: "Amazon Nova Premier",
  provider: "Amazon",
  family: "Nova",
  versionLabel: "amazon.nova-premier-v1 via bedrock-runtime.*.amazonaws.com",
  endpoint: "bedrock-runtime.*.amazonaws.com",
  openWeight: false,
  releasedAt: "2025-04-30",
  reviewStatus: "draft",
  usageShare: {
    pct: 0.0001,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only. Near-zero on OpenRouter, which materially undercounts Bedrock-native enterprise usage; treat as a floor.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "partial",
      summary:
        "Built-in responsible-AI training plus optional Bedrock Guardrails; independent testing places it mid-tier, with the guardrail layer doing significant work when enabled.",
      evidence: [
        {
          label: "Amazon Nova responsible AI documentation",
          url: "https://docs.aws.amazon.com/nova/",
          sourceId: "aws",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Bedrock Guardrails includes prompt-attack filters as a configurable layer; the bare model's agentic-injection behavior lacks published independent results.",
      evidence: [
        {
          label: "Amazon Bedrock Guardrails documentation",
          url: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
          sourceId: "aws",
          retrievedAt: "2026-08-03",
          quote:
            "Filtering is done based on detection of certain predefined harmful content categories: Hate, Insults, Sexual, Violence, Misconduct and Prompt Attack.",
        },
      ],
    },
    dataHandling: {
      grade: "strong",
      summary:
        "Bedrock does not use customer content to train models, does not share it with model providers, and offers regional processing with private connectivity — among the cleanest enterprise data postures tracked.",
      evidence: [
        {
          label: "Amazon Bedrock data protection documentation",
          url: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html",
          sourceId: "aws",
          retrievedAt: "2026-08-03",
          quote:
            "Because the model providers don't have access to those accounts, they don't have access to Amazon Bedrock logs or to customer prompts and completions.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Nova model cards and a technical report exist; external pre-deployment testing and detailed safety evals are not published.",
      evidence: [
        {
          label: "Amazon Nova technical documentation",
          url: "https://aws.amazon.com/ai/generative-ai/nova/",
          sourceId: "aws",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "Inherits AWS's certification stack: SOC, ISO (including ISO/IEC 42001 for covered AI services), HIPAA eligibility, FedRAMP paths, extensive residency options.",
      evidence: [
        {
          label: "AWS compliance programs",
          url: "https://aws.amazon.com/compliance/",
          sourceId: "aws",
          retrievedAt: "2026-08-03",
          quote:
            "AWS supports 143 security standards and compliance certifications, including PCI-DSS, HIPAA/HITECH, FedRAMP, GDPR, FIPS 140-3, and NIST 800-171, helping customers satisfy compliance requirements around the globe.",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Versioned model IDs with Bedrock lifecycle/deprecation policy; changelog granularity for behavior changes is limited.",
      evidence: [
        {
          label: "Amazon Bedrock model lifecycle documentation",
          url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html",
          sourceId: "aws",
          retrievedAt: "2026-08-03",
          quote:
            "Once a model launches on Amazon Bedrock, it will remain on Amazon Bedrock for at least 12 months before the EOL date.",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: {
        satisfied: true,
        note: "Responsible-AI documentation and technical report; less detailed than frontier-lab system cards.",
      },
      documentedSafetyPolicy: true,
      enterpriseDataControls: true,
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: true,
      versionedWithChangelogs: true,
      statedDeprecationPolicy: true,
    },
  },
  compliance: {
    soc2: true,
    iso42001: true,
    hipaaEligible: true,
    trainsOnCustomerDataByDefault: false,
    retentionWindow:
      "No content retention for model improvement; CloudWatch/logging under customer control",
    dataResidency: "Extensive regional options via Bedrock",
    euAiActNotes: "AWS publishes EU AI Act guidance for Bedrock deployers.",
    deprecationPolicy: "Published Bedrock model lifecycle with EOL dates",
    cloudAvailability: ["AWS Bedrock"],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: true,
    note: "Processing occurs in the customer's chosen AWS region; extensive regional options via Bedrock.",
  },
  consumerGap: {
    severity: "none",
    note: "No consumer tier exists — Nova Premier is served only through Bedrock under enterprise terms.",
  },
};
