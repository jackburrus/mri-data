import type { Model } from "../schema";
import { SHARED_NOTES } from "../shared";

export const llama4Maverick: Model = {
  slug: "llama-4-maverick",
  displayName: "Llama 4 Maverick",
  provider: "Meta",
  family: "Llama 4",
  versionLabel:
    "Llama-4-Maverick-17B-128E-Instruct (open weights, self-hosted reference)",
  endpoint: "self-hosted / multiple inference providers",
  openWeight: true,
  releasedAt: "2025-04-05",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 0.06,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Measured from OpenRouter's rankings API, single-day window; OpenRouter traffic only. Aggregated across hosted providers; excludes unmeasurable private self-hosted deployments.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "The bare model jailbreaks readily in independent testing. Meta ships Llama Guard and Prompt Guard as separate optional layers, but the graded artifact — the weights as released — carries little built-in resistance.",
      evidence: [
        {
          label: "F5 Labs CASI leaderboard",
          url: "https://www.f5.com/labs",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-03",
          note: "Bottom-quartile composite security index among tracked frontier models.",
        },
        {
          label: "Llama Protections (Llama Guard, Prompt Guard)",
          url: "https://www.llama.com/trust-and-safety/",
          sourceId: "meta",
          retrievedAt: "2026-08-03",
          quote:
            "Our comprehensive system-level protections framework proactively identifies and mitigates potential risks, empowering developers to more easily deploy generative AI responsibly.",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "No built-in agentic injection hardening; Prompt Guard exists as an add-on classifier but is off by default and trivially omitted by deployers.",
      evidence: [
        {
          label: "Llama Protections (Llama Guard, Prompt Guard)",
          url: "https://www.llama.com/trust-and-safety/",
          sourceId: "meta",
          retrievedAt: "2026-08-03",
          quote:
            "LlamaFirewall can orchestrate across guard models and work with our suite of protection tools to detect and prevent risks such as prompt injection, insecure code and risky tool interactions.",
        },
      ],
    },
    dataHandling: {
      grade: "not-applicable",
      summary:
        "Deployer property, not a property of the weights: in the self-hosted reference deployment, prompts and outputs never leave deployer infrastructure. Hosted providers' terms vary and are not graded here.",
      evidence: [
        {
          label: "Llama 4 license and download terms",
          url: "https://www.llama.com/llama4/",
          sourceId: "meta",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Model card and benchmark disclosures exist, but no external pre-deployment testing, and the launch-time LM Arena benchmark episode (an experimental variant submitted to the public leaderboard) damaged disclosure credibility.",
      evidence: [
        {
          label: "Llama 4 model card",
          url: "https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md",
          sourceId: "meta",
          retrievedAt: "2026-08-03",
          quote:
            "Capability evaluations measure vulnerabilities of Llama models inherent to specific capabilities, for which were crafted dedicated benchmarks including long context, multilingual, coding or memorization.",
        },
      ],
    },
    compliance: {
      grade: "not-applicable",
      summary:
        "Deployer property: no certification attaches to open weights; compliance posture is entirely inherited from whichever deployer or host runs the model.",
      evidence: [
        {
          label: "Llama 4 license and download terms",
          url: "https://www.llama.com/llama4/",
          sourceId: "meta",
          retrievedAt: "2026-08-03",
        },
      ],
    },
    operational: {
      grade: "strong",
      summary:
        "Published immutable weights are the strongest possible versioning discipline: a given checkpoint cannot change silently, ever. Releases are explicit and diffable.",
      evidence: [
        {
          label: "Llama 4 release announcement",
          url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
          sourceId: "meta",
          retrievedAt: "2026-08-03",
          quote:
            "We're making Llama 4 Scout and Llama 4 Maverick available for download today on llama.com and Hugging Face so everyone can continue to build new experiences using our latest technology.",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: {
        satisfied: true,
        note: "Safety section in the model card is thin but present; Llama Protections documentation supplements it.",
      },
      documentedSafetyPolicy: true,
      enterpriseDataControls: null,
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: {
        satisfied: false,
        note: SHARED_NOTES.openWeightNoCertPathway,
      },
      versionedWithChangelogs: {
        satisfied: true,
        note: SHARED_NOTES.immutableWeightsVersioning,
      },
      statedDeprecationPolicy: {
        satisfied: true,
        note: "Weights remain available once released; hosted-provider availability varies.",
      },
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: false,
    retentionWindow: "Deployer-controlled",
    dataResidency: "Deployer-controlled",
    euAiActNotes:
      "Open-weight GPAI models have reduced obligations under the EU AI Act; deployer obligations apply.",
    deprecationPolicy:
      "Weights remain available once released; hosted-provider availability varies",
    cloudAvailability: [
      "Self-hosted",
      "AWS Bedrock",
      "Google Vertex AI",
      "Azure AI Foundry",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["deployer"],
    regionalOptions: false,
    note: "Self-hosted reference deployment: data never leaves deployer infrastructure; hosted providers' terms vary and are not graded here.",
  },
  consumerGap: {
    severity: "none",
    note: "No consumer tier exists for the self-hosted reference deployment; data handling is deployer-controlled.",
  },
  notes:
    "Graded as the self-hosted reference deployment. The Mistral objection to company-level safety indexes applies here with full force: the deployer controls fine-tuning, guardrails, and data handling. Vectors that are deployer properties are marked as such.",
};
