import type { Model } from "../schema";

export const claudeSonnet45: Model = {
  slug: "claude-sonnet-4-5",
  displayName: "Claude Sonnet 4.5",
  provider: "Anthropic",
  family: "Claude 4",
  versionLabel: "claude-sonnet-4-5-20250929 via api.anthropic.com",
  endpoint: "api.anthropic.com",
  openWeight: false,
  releasedAt: "2025-09-29",
  reviewStatus: "reviewed",
  lifecycle: {
    status: "legacy",
    successor: "Claude Sonnet 5 (claude-sonnet-5, released 2026-06-30)",
    note: "Still served, but listed under Legacy models after Sonnet 4.6 (Feb 2026) and Sonnet 5 (June 2026). Tentative retirement floor 2026-09-29 under Anthropic's 60-day-notice deprecation policy.",
  },
  usageShare: {
    pct: 0.13,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window. Usage migrated to Sonnet 4.6/5; OpenRouter traffic only, undercounts enterprise Bedrock/Vertex volume.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "strong",
      summary:
        "Constitutional-classifier safeguards under an ASL-3 precautionary deployment; historically top-tier on F5's CASI index (95.86), and Anthropic models still hold the top three CASI slots as of July 2026. Sonnet 4.5 itself has rotated off the current board in favor of Sonnet 5.",
      evidence: [
        {
          label:
            "Anthropic model report (Sonnet 4.5 section, ASL-3 deployment)",
          url: "https://www.anthropic.com/transparency/model-report",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Based on our assessments of the model’s demonstrated capabilities, we determined that Claude Sonnet 4.5 did not meet the “notably more capable” threshold, described in our Responsible Scaling Policy, and decided to deploy Claude Sonnet 4.5 under the ASL-3 Standard.",
        },
        {
          label: "F5 Labs CASI/ARS leaderboards (July 2026 update)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Claude Sonnet 4.5 — 95.86 CASI, 49.6% performance, $18.78 CoS: delivers top-tier security without the traditional capability tradeoff.",
          note: "Sonnet 4.5 historical CASI 95.86; current board leads with Claude Sonnet 5 (93.08), Haiku 4.5, Opus 4.8.",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Anthropic's model report states Sonnet 4.5 achieved the lowest successful prompt-injection rate in an external red-team exercise across MCP, computer-use, and tool-use scenarios — best-in-class, but injections still succeed at nonzero rates.",
      evidence: [
        {
          label: "Anthropic model report (external injection red-team results)",
          url: "https://www.anthropic.com/transparency/model-report",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "In an externally conducted red team exercise that evaluated 23 models from multiple AI developers, Claude Sonnet 4.5 achieved the lowest rate of successful prompt injection attacks.",
        },
        {
          label:
            "Gray Swan × UK AISI agent red-teaming (background: every model tested was broken)",
          url: "https://www.grayswan.ai/news/uk-aisi-x-gray-swan-agent-red-teaming-challenge-results-snapshot",
          sourceId: "gray-swan",
          retrievedAt: "2026-08-05",
          quote:
            "While all models were broken many times for all behaviors, measuring the attack success rate (ASR) by calculating Total Breaks / Total Chats gives a sense of each model’s relative robustness",
          note: "Mar–Apr 2025 challenge predates Sonnet 4.5 (covers Claude 3.5/3.7 era); cited as field context, not model-specific evidence.",
        },
      ],
    },
    dataHandling: {
      grade: "strong",
      summary:
        "API inputs/outputs deleted from backend within ~30 days by default, not used for training; ZDR agreements and enterprise retention controls available. Consumer gap: claude.ai Free/Pro/Max training toggle was pre-selected On in a mandatory choice (deadline 2025-10-08) with 5-year retention when enabled — API and commercial tiers explicitly excluded.",
      evidence: [
        {
          label: "Anthropic privacy center: organization data retention",
          url: "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "For Anthropic API users, we automatically delete inputs and outputs on our backend within 30 days of receipt or generation",
        },
        {
          label: "Consumer terms update (training choice)",
          url: "https://www.anthropic.com/news/updates-to-our-consumer-terms",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "We are also extending data retention to five years, if you allow us to use your data for model training.",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "Dedicated system card, model report with published eval results, RSP/ASL framework, and disclosed external pre-deployment testing by UK AISI and Apollo Research. US CAISI was notably absent for this model.",
      evidence: [
        {
          label: "Claude Sonnet 4.5 system card (PDF)",
          url: "https://assets.anthropic.com/m/12f214efcc2f457a/original/Claude-Sonnet-4-5-System-Card.pdf",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "We shared late pre-deployment snapshots of Claude Sonnet 4.5 with two organizations that are building up specialized functions for model behavior evaluation: The UK AI Security Institute (AISI) and the independent nonproﬁt Apollo Research.",
        },
        {
          label: "Anthropic transparency hub",
          url: "https://www.anthropic.com/transparency",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "The following are summaries of key safety evaluations from our Claude Sonnet 4.5 system card",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "SOC 2 Type I & II, ISO 27001:2022, ISO/IEC 42001:2023, HIPAA-ready configuration with BAA — scoped to commercial products (Claude for Work, API), not consumer plans.",
      evidence: [
        {
          label: "Anthropic certifications (privacy center)",
          url: "https://privacy.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "maintains the following compliance credentials: HIPAA-ready configuration (BAA available) ISO 27001:2022 (Information Security Management) ISO/IEC 42001:2023 (AI Management Systems) SOC 2 Type I & Type II",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Dated pinned snapshots, documented lifecycle states (Active/Legacy/Deprecated/Retired), 60-day minimum retirement notice, and published deprecation-preservation commitments; behavior-affecting safety-filter and system-prompt tuning is still not always changelogged.",
      evidence: [
        {
          label: "Anthropic model deprecations documentation",
          url: "https://platform.claude.com/docs/en/docs/about-claude/model-deprecations",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Anthropic provides a recommended replacement and assigns a retirement date.",
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
        note: "UK AISI and Apollo Research pre-deployment testing disclosed in the system card; US CAISI absent for this model.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dated pinned snapshots and release notes; safety-filter and system-prompt tuning is not always changelogged.",
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
      "API: deleted within ~30 days; ZDR agreements available; trust-and-safety-flagged content up to 2 years",
    dataResidency:
      "Regional endpoints via Bedrock (global+regional) and Vertex (global/multi-region/regional); first-party API residency unstated",
    euAiActNotes: "Signed the EU GPAI Code of Practice (July 2025).",
    deprecationPolicy:
      "Documented lifecycle with 60-day minimum retirement notice; deprecation-preservation commitments published",
    cloudAvailability: [
      "Anthropic API",
      "AWS Bedrock",
      "Google Vertex AI",
      "Microsoft Foundry (Azure, preview Nov 2025)",
    ],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: true,
    note: "First-party API residency unstated (US provider home jurisdiction presumed); regional endpoints via Bedrock and Vertex.",
  },
  consumerGap: {
    severity: "wide",
    note: "claude.ai Free/Pro/Max training toggle was pre-selected On (5-year retention when enabled) while API and commercial tiers are explicitly excluded.",
  },
  notes:
    "Re-verified against live sources 2026-08-05. Anthropic's documentation and privacy portals migrated to claude.com domains in 2026; citations updated accordingly.",
};
