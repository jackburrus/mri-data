import type { Model } from "../schema";

export const claudeOpus45: Model = {
  slug: "claude-opus-4-5",
  displayName: "Claude Opus 4.5",
  provider: "Anthropic",
  family: "Claude 4",
  versionLabel: "claude-opus-4-5-20251101 via api.anthropic.com",
  endpoint: "api.anthropic.com",
  openWeight: false,
  releasedAt: "2025-11-24",
  reviewStatus: "reviewed",
  lifecycle: {
    status: "legacy",
    successor: "Claude Opus 5 (claude-opus-5, released 2026-07-24)",
    note: "Superseded through Opus 4.6/4.7/4.8 and then Opus 5; still served under the 60-day-notice deprecation policy.",
  },
  usageShare: {
    pct: 0.03,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only. Usage migrated to Opus 4.8/5; undercounts enterprise Bedrock/Vertex volume.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "strong",
      summary:
        "Constitutional-classifier safeguards and extensive internal plus external red-teaming; consistently among the top scorers in independent jailbreak-resistance testing.",
      evidence: [
        {
          label: "Claude Opus 4.5 announcement and system card",
          url: "https://www.anthropic.com/news/claude-opus-4-5",
          sourceId: "anthropic",
          retrievedAt: "2026-08-03",
        },
        {
          label: "F5 Labs CASI leaderboard",
          url: "https://www.f5.com/labs",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-03",
          note: "Top-tier composite security index at time of entry.",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Strong relative performance in Gray Swan agent red-teaming (run with UK AISI), but indirect injection in multi-step tool use still succeeds at non-trivial rates — as it does for every frontier model.",
      evidence: [
        {
          label: "Gray Swan agent red-teaming arena",
          url: "https://www.grayswan.ai/",
          sourceId: "gray-swan",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    dataHandling: {
      grade: "strong",
      summary:
        "API and enterprise inputs are not used for training by default, with documented retention controls. Note the consumer gap: claude.ai consumer accounts default to training opt-in (with opt-out) since late 2025.",
      evidence: [
        {
          label: "Anthropic privacy center",
          url: "https://privacy.anthropic.com/",
          sourceId: "anthropic",
          retrievedAt: "2026-08-03",
        },
        {
          label: "Anthropic trust portal",
          url: "https://trust.anthropic.com/",
          sourceId: "anthropic",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "Detailed system cards, the published Responsible Scaling Policy with ASL levels, external pre-deployment testing (UK AISI, third-party evaluators), and a transparency hub.",
      evidence: [
        {
          label: "Anthropic transparency hub",
          url: "https://www.anthropic.com/transparency",
          sourceId: "anthropic",
          retrievedAt: "2026-08-03",
          quote:
            "Based on our assessments, we have decided to deploy Claude Opus 4.5 under the ASL-3 Standard.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "SOC 2 Type 2, ISO 27001, ISO/IEC 42001 certification, HIPAA-eligible configurations; audit documentation via trust portal.",
      evidence: [
        {
          label: "Anthropic trust portal",
          url: "https://trust.anthropic.com/",
          sourceId: "anthropic",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Dated model snapshots and a documented deprecation policy; release notes exist but behavior-affecting changes to system prompts and safety filters are not always changelogged.",
      evidence: [
        {
          label: "Anthropic model deprecations documentation",
          url: "https://docs.anthropic.com/en/docs/about-claude/model-deprecations",
          sourceId: "anthropic",
          retrievedAt: "2026-08-03",
          quote:
            "This page lists all API deprecations, along with recommended replacements.",
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
        note: "UK AISI and third-party evaluators disclosed in the system card.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dated snapshots and release notes; safety-filter and system-prompt tuning is not always changelogged.",
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
      "Configurable; zero-data-retention agreements available for API",
    dataResidency: "US default; regional options via Bedrock and Vertex",
    euAiActNotes:
      "Signed the EU GPAI Code of Practice; publishes EU AI Act compliance documentation.",
    deprecationPolicy:
      "Documented deprecation policy with minimum notice windows",
    cloudAvailability: ["Anthropic API", "AWS Bedrock", "Google Vertex AI"],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: true,
    note: "US default on the first-party API; regional options via Bedrock and Vertex.",
  },
  consumerGap: {
    severity: "wide",
    note: "claude.ai consumer accounts default to training opt-in (with opt-out) since late 2025, while API and enterprise inputs carry a no-train default.",
  },
};
