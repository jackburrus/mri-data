import type { Model } from "../schema";

export const gpt51: Model = {
  slug: "gpt-5-1",
  displayName: "GPT-5.1",
  provider: "OpenAI",
  family: "GPT-5",
  versionLabel: "gpt-5.1-2025-11-13 via api.openai.com",
  endpoint: "api.openai.com",
  openWeight: false,
  releasedAt: "2025-11-13",
  reviewStatus: "reviewed",
  lifecycle: {
    status: "legacy",
    successor: "GPT-5.6 family (gpt-5.6-sol flagship, GA 2026-07-09)",
    note: "Superseded through a rapid cadence (5.2, 5.3-Codex, 5.4, 5.5, 5.6). Variant shutdowns already underway: gpt-5.1-codex/codex-max shut down 2026-07-23; gpt-5.1-chat-latest shuts down 2026-08-10. The base dated snapshot remains live but deprecation should be expected (~8-month snapshot-to-shutdown cadence observed for GPT-5 base).",
  },
  usageShare: {
    pct: 0.04,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Aggregated across gpt-5.1 base and codex variants; single-day window, OpenRouter traffic only — materially undercounts first-party API and Azure volume.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "partial",
      summary:
        "Safe-completions training documented in the GPT-5 system card; the GPT-5.x family sits mid-tier on F5's CASI board (GPT-5.5 at 78.47 in July 2026, against Claude leaders above 89). GPT-5.1 itself has rotated off the current board — family-level scores stand in.",
      evidence: [
        {
          label:
            "GPT-5 system card (safe-completions, jailbreaks, instruction hierarchy)",
          url: "https://cdn.openai.com/gpt-5-system-card.pdf",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "All of the GPT-5 models additionally feature safe-completions, our latest approach to safety training to prevent disallowed content.",
        },
        {
          label: "F5 Labs CASI/ARS leaderboards (July 2026 update)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Anthropic maintains dominance at the very top (93+ range), while OpenAI and Alibaba models show strong upward momentum in the 78-83 range, and new providers like nVidia are entering the competitive field.",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Instruction-hierarchy training is documented, but on Gray Swan's agentic prompt-injection benchmark GPT-5.1 recorded a 21.9% attack success rate — versus 12.5% for Gemini 3 Pro and 4.7% for Claude Opus 4.5.",
      evidence: [
        {
          label:
            "Gray Swan agentic injection benchmark results (GPT-5.1 ASR 21.9%)",
          url: "https://the-decoder.com/claude-opus-4-5-resists-prompt-injections-better-than-rivals-but-still-falls-to-strong-attacks-alarmingly-often/",
          sourceId: "tech-press",
          retrievedAt: "2026-08-05",
          quote:
            'A benchmark by the security firm Gray Swan found that a single "very strong" prompt injection attack breaks through Opus 4.5\'s safeguards 4.7 percent of the time.',
          note: "Reporting on Gray Swan benchmark data published alongside the Opus 4.5 release, Nov 2025.",
        },
        {
          label: "GPT-5 system card (prompt injections section)",
          url: "https://cdn.openai.com/gpt-5-system-card.pdf",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "To mitigate this, we use a multilayered defense stack including teaching models to ignore prompt injections in web or connector contents.",
        },
      ],
    },
    dataHandling: {
      grade: "strong",
      summary:
        "API inputs not used for training by default; ~30-day abuse-monitoring retention; ZDR by approval for eligible endpoints. Litigation caveat: the NYT-case blanket preservation order was lifted 2025-09-26 (ZDR customers were always excluded), but a court affirmed production of 20M de-identified chat logs in Jan 2026 and a July 2026 sanctions motion disputes OpenAI's log handling — retention promises are currently entangled with active litigation.",
      evidence: [
        {
          label: "How we use your data (API platform docs)",
          url: "https://developers.openai.com/api/docs/guides/your-data",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "As of March 1, 2023, data sent to the OpenAI API is not used to train or improve OpenAI models (unless you explicitly opt in to share data with us).",
        },
        {
          label: "Preservation order narrowed (NYT v. OpenAI)",
          url: "https://www.engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html",
          sourceId: "tech-press",
          retrievedAt: "2026-08-05",
          quote:
            "However, this latest decision means the AI giant no longer has to preserve chat logs as of September 26, except for some.",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "System cards for the family (now hosted on a dedicated deployment-safety hub), a published Model Spec, and disclosed pre-deployment access for US CAISI and UK AISI — continued through GPT-5.5, whose cyber-capability evaluation UK AISI published itself.",
      evidence: [
        {
          label:
            "OpenAI deployment safety hub (system cards, external evaluations)",
          url: "https://deploymentsafety.openai.com/",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "Sharing the technical work we do to make our systems safe, including how deployed models perform in evaluations, the risks we measure, and the steps we take to improve over time.",
        },
        {
          label: "UK AISI: evaluation of GPT-5.5 cyber capabilities",
          url: "https://www.aisi.gov.uk/blog/our-evaluation-of-openais-gpt-5-5-cyber-capabilities",
          sourceId: "uk-aisi",
          retrievedAt: "2026-08-05",
          quote:
            "Separately, we conducted expert red-teaming on GPT-5.5’s cyber safeguards.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "Trust portal lists SOC 2 Type 2, SOC 3, CSA STAR, ISO/IEC 42001:2023, ISO 27001/27017/27018/27701, PCI DSS, FedRAMP 20x; HIPAA BAAs available for ZDR/modified-retention-eligible API endpoints.",
      evidence: [
        {
          label: "OpenAI trust portal",
          url: "https://trust.openai.com/",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "Our products are covered in our SOC 2 Type 2 report and have been evaluated by an independent third-party auditor to confirm that our controls align with industry standards for security, confidentiality, privacy and availability.",
        },
        {
          label: "HIPAA BAA eligibility (help center)",
          url: "https://help.openai.com/en/articles/8660679-how-can-i-get-a-business-associate-agreement-baa-with-openai",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
          quote:
            "Most API services are covered, with a few exceptions listed here",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Dated snapshots and a maintained deprecations page with stated replacements — genuinely good hygiene — but the observed cadence is aggressive: GPT-5.1's codex variants went from release to shutdown in about eight months, and alias-level behavior changes still ship without changelog entries.",
      evidence: [
        {
          label: "OpenAI API deprecations page",
          url: "https://developers.openai.com/api/docs/deprecations",
          sourceId: "openai",
          retrievedAt: "2026-08-05",
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
        note: "US CAISI and UK AISI pre-deployment access disclosed for the GPT-5 family; UK AISI published its own GPT-5.5 evaluation.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dated snapshots and a deprecations page; alias-level behavior changes are not always changelogged.",
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
      "~30 days (API abuse monitoring); ZDR by approval for eligible endpoints; litigation-related preservation applies to flagged accounts and an Apr–Sep 2025 corpus",
    dataResidency:
      "US default; regional storage in EEA/CH, UK, AU, CA, JP, IN, SG, KR, UAE (most non-US regions require eligibility approval)",
    euAiActNotes:
      "Full signatory of the EU GPAI Code of Practice (all three chapters, July 2025); enforcement phase began Aug 2026 with reported gaps in training-data transparency disclosure.",
    deprecationPolicy:
      "Published deprecations page with dated timelines and stated replacement models",
    cloudAvailability: ["OpenAI API", "Microsoft Foundry (Azure AI Foundry)"],
  },
  jurisdiction: {
    zones: ["US", "EU", "UK", "AU", "CA", "JP", "IN", "SG", "KR", "AE"],
    regionalOptions: true,
    note: "US default; regional storage in EEA/CH, UK, AU, CA, JP, IN, SG, KR, UAE — most non-US regions require eligibility approval.",
  },
  consumerGap: {
    severity: "narrow",
    note: "API and enterprise tiers carry clean no-train defaults; consumer ChatGPT terms differ but the gap is narrower than peer providers'.",
  },
  notes:
    "Re-verified against live sources 2026-08-05. OpenAI's platform docs migrated to developers.openai.com; citations updated. ISO/IEC 42001 was 'not verified' at seeding and is now confirmed via the trust portal.",
};
