import type { Model } from "../schema";

/**
 * Tracked as one family entry: Sol/Terra/Luna share a single system card,
 * identical Preparedness classifications, context, cutoff, data posture,
 * and lifecycle. Per-variant divergences (injection scores, pricing) are
 * noted inline rather than hidden behind a collapsed average.
 */
export const gpt56: Model = {
  slug: "gpt-5-6",
  displayName: "GPT-5.6 (Sol · Terra · Luna)",
  provider: "OpenAI",
  family: "GPT-5",
  versionLabel:
    "gpt-5.6-sol / gpt-5.6-terra / gpt-5.6-luna via api.openai.com — no dated snapshots exist",
  endpoint: "api.openai.com",
  openWeight: false,
  releasedAt: "2026-07-09",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 6.3,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Aggregates Luna (~5.1%, rank 5) and Terra (~1.1%); Sol not separately ranked in the top 20. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "partial",
      summary:
        "The most heavily safeguarded OpenAI release to date — first family rated Preparedness-High for both cyber and bio across all sizes, with activation classifiers and 700K+ GPU-hours of automated red-teaming — yet UK AISI found universal jailbreaks in Sol unlocking autonomous cyber-exploitation pre-deployment (specific exploits mitigated), and public jailbreak claims landed within days of GA.",
      evidence: [
        {
          label:
            "GPT-5.6 system card (jailbreak robustness, Preparedness classifications)",
          url: "https://deploymentsafety.openai.com/gpt-5-6",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "Under our Preparedness Framework, we are treating Sol, Terra and Luna as High capability in both Cybersecurity and Biological and Chemical risk.",
        },
        {
          label: "Fortune: UK AISI universal jailbreaks in GPT-5.6 Sol",
          url: "https://fortune.com/2026/07/10/openai-gpt-5-6-sol-jailbreaks-cyber-attacks-similar-to-security-flaw-that-led-u-s-government-to-force-anthropic-to-disable-fable-5/",
          sourceId: "tech-press",
          retrievedAt: "2026-08-05",
          quote:
            "OpenAI markets its latest model, GPT-5.6 Sol, as its most secure to date, but the British government researchers who tested it prior to release say the model’s guardrails are susceptible to jailbreaks that can unlock dangerous cyber capabilities.",
        },
        {
          label: "F5 Labs CASI/ARS leaderboards",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Anthropic maintains dominance at the very top (93+ range), while OpenAI and Alibaba models show strong upward momentum in the 78-83 range, and new providers like nVidia are entering the competitive field.",
          note: "Not yet listed on the July 6 board (predates GA); GPT-5.x family has tested mid-tier.",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Rare quantitative per-variant disclosure: injection resistance 1.000 on Connectors but 0.910 (Sol) / 0.946 (Terra) / 0.897 (Luna) on search-plus-function-calling — the surface where agents actually operate, with the mid-tier Terra oddly beating the flagship. GPT-Red automated red-teaming (added to the card 2026-08-03) still finds working injection attacks.",
      evidence: [
        {
          label:
            "GPT-5.6 evaluations with challenging prompts (per-variant injection scores)",
          url: "https://deploymentsafety.openai.com/gpt-5-6/evaluations-with-challenging-prompts",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "The model is currently particularly strong at finding prompt injection attacks that utilize human-like strategies and can probe deeper into the defender model’s weaknesses.",
        },
      ],
    },
    dataHandling: {
      grade: "strong",
      summary:
        "Unchanged from the verified GPT-5.1 posture: no training on API business data by default, ~30-day abuse-monitoring retention, ZDR by approval. The NYT-litigation caveat on OpenAI's retention story (see the GPT-5.1 entry and change feed) applies family-wide.",
      evidence: [
        {
          label: "How we use your data (API platform docs)",
          url: "https://developers.openai.com/api/docs/guides/your-data",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "Eligible customers may have their customer content excluded from these abuse monitoring logs, subject to the limitations below, by getting approved for the Zero Data Retention or Modified Abuse Monitoring controls.",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "Arguably the strongest disclosure package of any tracked model: preview and GA system cards, six named external testers (UK AISI, US CAISI, SecureBio, Irregular, METR, Apollo Research), quantitative per-variant safety scores, and post-release red-teaming results appended to the card.",
      evidence: [
        {
          label: "GPT-5.6 system card",
          url: "https://deploymentsafety.openai.com/gpt-5-6",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "As part of our ongoing partnership with the UK AI Security Institute (UK AISI), we provided UK AISI with early access to GPT-5.6 Sol to support independent, pre-deployment evaluation of cyber capabilities.",
        },
        {
          label: "GPT-5.6 preview system card (limited-preview period)",
          url: "https://deploymentsafety.openai.com/gpt-5-6-preview",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "At their request, we are starting with a limited preview for a small group of trusted partners whose participation has been shared with the government, before releasing more broadly.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "SOC 2 Type 2, ISO/IEC 42001:2023, ISO 27001/27017/27018/27701, CSA STAR, PCI DSS, FedRAMP 20x per the trust portal; HIPAA BAAs for eligible API configurations.",
      evidence: [
        {
          label: "OpenAI trust portal",
          url: "https://trust.openai.com/",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "Our products are covered in our SOC 2 Type 2 report and have been evaluated by an independent third-party auditor to confirm that our controls align with industry standards for security, confidentiality, privacy and availability.",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Stated deprecation policy is good (≥6 months notice for GA models) — but no dated snapshots exist for any 5.6 variant. Users cannot pin a version, the gpt-5.6 alias floats to Sol, and a model update under these IDs would be indistinguishable from the outside. A regression from the dated-snapshot discipline of earlier GPT families.",
      evidence: [
        {
          label: "GPT-5.6 Sol model page (single undated snapshot)",
          url: "https://developers.openai.com/api/docs/models/gpt-5.6-sol",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote: "The gpt-5.6 alias routes requests to GPT-5.6 Sol.",
        },
        {
          label: "OpenAI API deprecations page (notice policy)",
          url: "https://developers.openai.com/api/docs/deprecations",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "Unless safety or compliance concerns require a faster timeline, we provide the following minimum notice periods before model retirement: Generally available models: At least 6 months.",
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
        note: "Six named external testers including UK AISI and US CAISI, disclosed in the system card.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: false,
        note: "No dated snapshots exist for any GPT-5.6 variant — versions cannot be pinned and updates under the floating IDs would be externally indistinguishable. Earlier GPT families satisfied this requirement; 5.6 does not.",
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
      "~30 days (API abuse monitoring); ZDR by approval; NYT-litigation preservation caveats apply to flagged accounts",
    dataResidency:
      "US default; regional storage options per the GPT-5.1 entry (eligibility-gated outside the US)",
    euAiActNotes:
      "Full EU GPAI Code of Practice signatory; enforcement-phase transparency gaps reported July 2026.",
    deprecationPolicy:
      "≥6 months notice for GA models; ~3 months specialized; as little as 2 weeks for previews",
    cloudAvailability: ["OpenAI API", "Microsoft Foundry (Azure AI Foundry)"],
  },
  jurisdiction: {
    zones: ["US", "EU", "UK", "AU", "CA", "JP", "IN", "SG", "KR", "AE"],
    regionalOptions: true,
    note: "US default; regional storage options per the GPT-5.1 entry, eligibility-gated outside the US.",
  },
  consumerGap: {
    severity: "narrow",
    note: "Same posture as GPT-5.1: API/enterprise no-train defaults are clean while consumer ChatGPT terms differ modestly.",
  },
  notes:
    "Current OpenAI flagship line. Launch was government-gated: a June 2026 executive order created a voluntary pre-release review process, and the White House asked OpenAI to restrict the June 26 preview to ~20 vetted US partners before the July 9 GA — recorded in the change feed. Tier note: this family fails Tier 2 solely on versioning (no dated snapshots), an assessment the checklist makes mechanical rather than editorial.",
};
