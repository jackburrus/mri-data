import type { Model } from "../schema";

export const claudeOpus5: Model = {
  slug: "claude-opus-5",
  displayName: "Claude Opus 5",
  provider: "Anthropic",
  family: "Claude 5",
  versionLabel:
    "claude-opus-5 via api.anthropic.com (dateless pinned snapshot)",
  endpoint: "api.anthropic.com",
  openWeight: false,
  releasedAt: "2026-07-24",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 1.9,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 14; OpenRouter materially undercounts enterprise Bedrock/Vertex/Foundry volume for Claude models.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "strong",
      summary:
        "Deployed under ASL-3 with no critical-severity jailbreak found pre-release across external testing by UK AISI, Trajectory Labs, 10a Labs, and Gray Swan; not yet on F5's board (release postdates the July update), where its siblings hold the top three slots.",
      evidence: [
        {
          label: "Claude Opus 5 system card (PDF)",
          url: "https://www-cdn.anthropic.com/c5fbac3f0b1280a933ebd26d3cb8bb9f5bdeaf48/Claude%20Opus%205%20System%20Card.pdf",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "10a Labs spent around 16 hours testing a variety of attack techniques and did not ﬁnd a jailbreak that accomplished the tasks provided.",
        },
        {
          label: "Claude Opus 5 announcement",
          url: "https://www.anthropic.com/news/claude-opus-5",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "It adheres to Claude’s Constitution better than Opus 4.8, Sonnet 5, or Fable 5; exhibits the lowest rates of deceptive behavior; and is the least susceptible to being tricked into misuse.",
        },
      ],
    },
    injection: {
      grade: "strong",
      summary:
        "The first tracked model to earn a strong injection grade: 0.2% ASR single-attempt and 2.0% within 15 attempts on the Gray Swan-co-developed benchmark — best of all models tested (GPT-5.6 Sol 3.1%, Gemini 3.1 Pro 14.2%) — and 0% across all 1,290 browser-environment attacks with the two-layer Auto Mode defense (input injection probe plus tool-call classifier). The unlayered browser baseline of 3.7% is the caveat that keeps this grade honest.",
      evidence: [
        {
          label:
            "Claude Opus 5 system card (injection benchmark and browser suite)",
          url: "https://www-cdn.anthropic.com/c5fbac3f0b1280a933ebd26d3cb8bb9f5bdeaf48/Claude%20Opus%205%20System%20Card.pdf",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "On the IPI benchmark, Opus 5 improved over Opus 4.8, reducing the probability of an attacker succeeding within 15 attempts from 5.5% to 2.0%, and from 0.5% to 0.2% on 1 attempt.",
        },
      ],
    },
    dataHandling: {
      grade: "strong",
      summary:
        "Unchanged verified posture: API no-train default, no retention requirements for general access per the announcement, ZDR available, consumer gap documented.",
      evidence: [
        {
          label: "Claude Opus 5 announcement (retention statement)",
          url: "https://www.anthropic.com/news/claude-opus-5",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Consistent with prior Opus models, Opus 5 does not have data retention requirements for general access.",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "System card names four external testers and includes an adverse capability finding published against interest: UK AISI's agentic cyber-range showed the model capable of attacking weakly-secured small-enterprise networks when pre-positioned. Reported as Anthropic's most-aligned model on automated behavioral audit.",
      evidence: [
        {
          label: "Claude Opus 5 system card (PDF)",
          url: "https://www-cdn.anthropic.com/c5fbac3f0b1280a933ebd26d3cb8bb9f5bdeaf48/Claude%20Opus%205%20System%20Card.pdf",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "We judge that Opus 5 is capable of attacking small enterprise networks with weak security, where it has already gained access to the network.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "Org-level certifications verified for the line: SOC 2, ISO 27001, ISO/IEC 42001, HIPAA-ready configurations (commercial scope).",
      evidence: [
        {
          label: "Anthropic certifications (privacy center)",
          url: "https://privacy.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Anthropic is committed to the safety and security of our users' information and maintains the following compliance credentials: HIPAA-ready configuration (BAA available) ISO 27001:2022 (Information Security Management) ISO/IEC 42001:2023 (AI Management Systems) SOC 2 Type I & Type II",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Dateless pinned snapshot with retirement floor 2027-07-24, 60-day notice, preservation commitments, and day-one availability across Bedrock/Vertex/Foundry; the line's changelog culture for behavior-affecting tuning remains partial.",
      evidence: [
        {
          label: "Anthropic model deprecations documentation",
          url: "https://platform.claude.com/docs/en/docs/about-claude/model-deprecations",
          sourceId: "anthropic",
          retrievedAt: "2026-08-05",
          quote:
            "Anthropic notifies customers with active deployments for models with upcoming retirements, providing at least 60 days' notice before model retirement for publicly released models.",
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
        note: "UK AISI, Trajectory Labs, 10a Labs, and Gray Swan named; US CAISI participation unconfirmed.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dateless but pinned snapshot with documented retirement floor.",
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
      "API: no retention requirements for general access; ZDR available",
    dataResidency:
      "Regional endpoints via Bedrock/Vertex/Foundry; first-party API residency unstated",
    euAiActNotes: "EU GPAI Code of Practice signatory.",
    deprecationPolicy:
      "60-day minimum notice; retirement not sooner than 2027-07-24",
    cloudAvailability: [
      "Anthropic API",
      "AWS Bedrock (day one)",
      "Google Vertex AI",
      "Microsoft Foundry",
    ],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: true,
    note: "First-party API residency unstated (US provider home jurisdiction presumed); regional endpoints via Bedrock/Vertex/Foundry.",
  },
  consumerGap: {
    severity: "wide",
    note: "API carries a no-train default while consumer claude.ai defaults to training opt-in — the documented consumer gap applies to this model unchanged.",
  },
  notes:
    "Deployed under ASL-3 (driven by chem/bio thresholds, not cyber or autonomy). The strong injection grade reflects layered-defense results on published benchmarks, not immunity — the two injection figures in circulation (0.2% benchmark ASR vs 3.7% unlayered browser baseline) are different evaluations and are kept distinct here.",
};
