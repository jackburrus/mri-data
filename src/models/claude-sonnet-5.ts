import type { Model } from "../schema";

export const claudeSonnet5: Model = {
  slug: "claude-sonnet-5",
  displayName: "Claude Sonnet 5",
  provider: "Anthropic",
  family: "Claude 5",
  versionLabel:
    "claude-sonnet-5 via api.anthropic.com (dateless pinned snapshot)",
  endpoint: "api.anthropic.com",
  openWeight: false,
  releasedAt: "2026-06-30",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 1.8,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 15; OpenRouter materially undercounts enterprise Bedrock/Vertex/Foundry volume for Claude models.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "strong",
      summary:
        "#1 on F5's current board — CASI 93.08 and ARS 98.26, both first place — with a 145-page system card reporting a 0.19% bug-bounty attack success rate and default-on cyber safeguards matching the Opus line.",
      evidence: [
        {
          label: "F5 Labs CASI/ARS leaderboards (Sonnet 5: #1 on both)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "C laude-Sonnet-5 is a new July entry with a strong score of 93.08, competing for the #1 position",
        },
        {
          label: "Claude Sonnet 5 system card (PDF)",
          url: "https://www-cdn.anthropic.com/283ef97c476cf442c91d9a37d5b214242a55bb92/Claude%20Sonnet%205%20System%20Card.pdf",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Sonnet 5 tied with Claude Opus 4.8 for the strongest result in the bug bounty, with only 0.19% of unique attacks succeeding against each, a signiﬁcant improvement over Claude Sonnet 4.6 (1.41%) and other frontier models like GPT-5.5 (3.08%) or Gemini 3.5 Flash (6.66%).",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Near the top of the field with published numbers: 0.6% ASR single-attempt and 5.9% within 15 attempts on the Gray Swan-co-developed benchmark (0% with Auto Mode layered), coding-injection ASR down to 0.31% with extended thinking, browser-use to ~0% with safeguards — but the unlayered 15-attempt number stays material.",
      evidence: [
        {
          label: "Claude Sonnet 5 system card (injection evaluations)",
          url: "https://www-cdn.anthropic.com/283ef97c476cf442c91d9a37d5b214242a55bb92/Claude%20Sonnet%205%20System%20Card.pdf",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Claude Sonnet 5 showed the strongest robustness to prompt injection in coding environments among all models evaluated, with an attack success rate of 0.31% over all attempts with extended thinking and 0.29% without thinking.",
        },
      ],
    },
    dataHandling: {
      grade: "strong",
      summary:
        "Unchanged from the verified Sonnet 4.5 posture: API no-train default, ~30-day deletion, ZDR available, consumer-tier gap documented.",
      evidence: [
        {
          label: "Anthropic privacy center: organization data retention",
          url: "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "For Anthropic API users, we automatically delete inputs and outputs on our backend within 30 days of receipt or generation",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "145-page system card with named external testing (UK AISI among them) and quantitative agentic-safety results; RSP coverage; evaluation-awareness rates disclosed — the disclosure standard the tier framework asks for.",
      evidence: [
        {
          label: "Claude Sonnet 5 system card (PDF)",
          url: "https://www-cdn.anthropic.com/283ef97c476cf442c91d9a37d5b214242a55bb92/Claude%20Sonnet%205%20System%20Card.pdf",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "We also see a substantial increase in verbalized evaluation awareness, with nontrivial awareness appearing in about 6% of transcripts, generally involving the most extreme scenarios we test.",
        },
        {
          label: "Anthropic transparency hub",
          url: "https://www.anthropic.com/transparency",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Based on our assessments, we have decided to deploy Claude Sonnet 5 under CB-1 capabilities and autonomy threat model 1.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "Org-level certifications verified for the line: SOC 2 Type I & II, ISO 27001:2022, ISO/IEC 42001:2023, HIPAA-ready configurations (commercial scope).",
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
        "Dateless but pinned snapshot ID with a documented retirement floor (not sooner than 2027-06-30), 60-day notice policy, and published deprecation-preservation commitments; behavior-affecting tuning still isn't always changelogged.",
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
        note: "UK AISI named in the system card; full tester list pending a manual read of the 145-page PDF.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dateless but pinned snapshot with documented retirement floor — pinned is what matters.",
      },
      statedDeprecationPolicy: true,
    },
  },
  compliance: {
    soc2: true,
    iso42001: true,
    hipaaEligible: true,
    trainsOnCustomerDataByDefault: false,
    retentionWindow: "API: deleted within ~30 days; ZDR available",
    dataResidency:
      "Regional endpoints via Bedrock/Vertex/Foundry; first-party API residency unstated",
    euAiActNotes:
      "EU GPAI Code of Practice signatory. Note: Foundry GA initially not deployable for European enterprises.",
    deprecationPolicy:
      "60-day minimum notice; retirement not sooner than 2027-06-30",
    cloudAvailability: [
      "Anthropic API",
      "AWS Bedrock",
      "Microsoft Foundry (GA 2026-06-29)",
      "Google Vertex AI",
    ],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: true,
    note: "First-party API residency unstated (US provider home jurisdiction presumed); regional endpoints via Bedrock/Vertex/Foundry.",
  },
  consumerGap: {
    severity: "wide",
    note: "API no-train default versus the documented consumer-tier training opt-in — the gap carried over unchanged from the verified Sonnet 4.5 posture.",
  },
  notes:
    "Successor to the tracked Claude Sonnet 4.5 entry. Intro pricing ($2/$10) ends 2026-08-31. ASL designation not asserted here: no fetched source states it explicitly, and the system-card PDF exceeds automated capture limits — flagged for manual verification rather than assumed.",
};
