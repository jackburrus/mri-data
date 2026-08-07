import type { Model } from "../schema";

export const gemini3Pro: Model = {
  slug: "gemini-3-pro",
  displayName: "Gemini 3 Pro",
  provider: "Google",
  family: "Gemini 3",
  versionLabel:
    "gemini-3-pro-preview via generativelanguage.googleapis.com (retired 2026-03-09; ID now aliases gemini-3.1-pro-preview)",
  endpoint: "generativelanguage.googleapis.com",
  openWeight: false,
  releasedAt: "2025-11-18",
  reviewStatus: "reviewed",
  lifecycle: {
    status: "retired",
    successor: "Gemini 3.1 Pro (gemini-3.1-pro-preview, released 2026-02-19)",
    note: "gemini-3-pro-preview was shut down 2026-03-09 — roughly four months after launch, never reaching a GA/stable ID — and the model ID was silently aliased to gemini-3.1-pro-preview. Requests to the old ID now reach a different model.",
  },
  vectors: {
    jailbreak: {
      grade: "partial",
      summary:
        "Model card reports internal safety evaluations and red-teaming, but F5's monthly CASI leaderboard shows the Gemini 3.x line mid-to-low tier and strikingly volatile — a 55.7-point CASI swing between Feb and May 2026, with one month at 19.14 — against a top-10 threshold around 86.",
      evidence: [
        {
          label: "Gemini 3 Pro model card (May 2026 revision)",
          url: "https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "A range of evaluations and red teaming activities were conducted to help improve the model and inform decision-making.",
        },
        {
          label: "F5 Labs CASI/ARS leaderboards",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Gemini 3 performed strongly on raw capability but weakly on security, scoring only around 50 , up from previous versions’ low-40s but still far behind OpenAI and Anthropic.",
        },
        {
          label: "F5 Labs: The Small Model Cliff (Gemini volatility analysis)",
          url: "https://www.f5.com/labs/articles/the-small-model-cliff",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Gemini 3 Pro preview moved 55.7 points across the period, ending close to the volatile cohort.",
        },
      ],
    },
    injection: {
      grade: "partial",
      summary:
        "Google publishes genuine layered defenses — model hardening against indirect injection, an agentic security architecture — yet researcher demonstrations against Gemini-connected surfaces keep landing, most recently a voice-assistant injection exploit.",
      evidence: [
        {
          label: "Advancing Gemini's security safeguards (DeepMind)",
          url: "https://deepmind.google/blog/advancing-geminis-security-safeguards/",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "This model hardening has significantly boosted Gemini’s ability to identify and ignore injected instructions, lowering its attack success rate.",
        },
        {
          label:
            "Lessons from Defending Gemini Against Indirect Prompt Injections (white paper)",
          url: "https://storage.googleapis.com/deepmind-media/Security%20and%20Privacy/Gemini_Security_Paper.pdf",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "This is another reason we advocate for adversarial training as a necessary but not sufficient protection mechanism, and encourage the research community to focus on defense in depth approaches that provide mitigations at both the model and system level.",
        },
        {
          label: "SafeBreach: Gemini voice-assistant prompt-injection exploit",
          url: "https://www.safebreach.com/blog/gemini-voice-assistant-prompt-injection-exploit/",
          sourceId: "safebreach-research",
          retrievedAt: "2026-08-05",
          quote:
            "SafeBreach Labs researchers discovered a new security vulnerability that allows attackers to exploit Google Gemini through notification-based indirect prompt injections from messaging apps like WhatsApp, Slack, and SMS.",
        },
      ],
    },
    dataHandling: {
      grade: "partial",
      summary:
        "Paid API tier is not used for product improvement (abuse logging only, 55 days); unpaid tier content is used for improvement including human review (EEA/CH/UK get paid-tier terms); consumer Gemini Apps default to data use unless disabled. A zero-data-retention option now exists by approval.",
      evidence: [
        {
          label: "Gemini API terms of service",
          url: "https://ai.google.dev/gemini-api/terms",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "To help with quality and improve our products, human reviewers may read, annotate, and process your API input and output.",
        },
        {
          label: "Gemini API zero-data-retention documentation",
          url: "https://ai.google.dev/gemini-api/docs/zdr",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "When your request for ZDR for a particular project is approved, all user content (prompts and responses) and identifiable metadata (such as IP addresses and Google Account IDs) are cleared prior to logging.",
        },
        {
          label: "Gemini Apps privacy hub (consumer defaults)",
          url: "https://support.google.com/gemini",
          sourceId: "google",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    transparency: {
      grade: "strong",
      summary:
        "Published model card with Frontier Safety Framework evaluation, and disclosed external pre-deployment testing for Gemini 3: UK AISI early access plus independent assessments by Apollo Research, Vaultis, and Dreadnode.",
      evidence: [
        {
          label: "Gemini 3 Pro model card (safety evaluations and red teaming)",
          url: "https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf",
          sourceId: "google",
          retrievedAt: "2026-08-05",
        },
        {
          label:
            "Google DeepMind responsibility & safety (Frontier Safety Framework)",
          url: "https://deepmind.google/about/responsibility-safety/",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "We also introduced, and continue to update, our Frontier Safety Framework - a set of protocols to help us stay ahead of possible severe risks from powerful frontier AI models.",
        },
      ],
    },
    compliance: {
      grade: "strong",
      summary:
        "Google Cloud holds accredited ISO/IEC 42001:2023 certification with Vertex generative AI in scope, alongside SOC 1/2/3, ISO 27001/27017/27018, and HIPAA support.",
      evidence: [
        {
          label: "Google Cloud ISO/IEC 42001 certification",
          url: "https://cloud.google.com/security/compliance/iso-42001",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "Google Cloud Platform, Google Workspace, and Gemini (App) are certified as ISO/IEC 42001:2023 compliant.",
        },
        {
          label: "Google Cloud compliance resource center",
          url: "https://cloud.google.com/security/compliance",
          sourceId: "google",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Vertex publishes stable-version lifecycles with retirement dates, but the preview churn is severe: this model was shut down four months after launch with its ID silently repointed to a different model — precisely the failure mode this index monitors.",
      evidence: [
        {
          label: "Gemini API changelog (alias repointing and shutdown records)",
          url: "https://ai.google.dev/gemini-api/docs/changelog",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "The gemini-3-pro-preview now points to gemini-3.1-pro-preview",
        },
        {
          label: "Vertex AI model versions and lifecycle",
          url: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions",
          sourceId: "google",
          retrievedAt: "2026-08-05",
          quote:
            "The following tables list the available models and their retirement dates.",
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
        note: "External tester names (UK AISI, Apollo Research, Vaultis, Dreadnode) come from Google's release materials and secondary reporting; the archived model card PDF does not name them, so this requirement is satisfied on weaker evidence than the rest of the entry and needs a better primary citation.",
      },
      thirdPartyCertification: true,
      versionedWithChangelogs: {
        satisfied: true,
        note: "Changelog and lifecycle pages are real, but the 3-pro-preview shutdown-and-alias episode shows preview IDs offer no version stability.",
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
      "Paid tier: 55-day abuse-monitoring logs; ZDR by approval (sanitized logs); unpaid tier: content used for improvement incl. human review",
    dataResidency:
      "Vertex regional/jurisdictional endpoints (US, EU; expanding) with in-region ML processing; global endpoint carries no residency guarantee",
    euAiActNotes: "Signed the EU GPAI Code of Practice (2025-07-30).",
    deprecationPolicy:
      "Published Vertex model lifecycle with retirement dates; preview-tier IDs excluded in practice",
    cloudAvailability: ["Gemini API", "Google Vertex AI"],
  },
  jurisdiction: {
    zones: ["US", "EU"],
    regionalOptions: true,
    note: "Vertex regional/jurisdictional endpoints (US, EU; expanding) with in-region ML processing; the global endpoint carries no residency guarantee.",
  },
  consumerGap: {
    severity: "wide",
    note: "Paid API tier is abuse-logging only, while unpaid-tier content is used for improvement including human review and consumer Gemini Apps default to data use unless disabled.",
  },
  notes:
    "Re-verified against live sources 2026-08-05. This assessment covers a retired model kept published as history: its ID now silently serves Gemini 3.1 Pro Preview, tracked separately as gemini-3-1-pro. Grades assess the Gemini API / Vertex deployment; consumer Gemini Apps have materially different data-handling defaults.",
};
