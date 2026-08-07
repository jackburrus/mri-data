import type { Model } from "../schema";

export const kimiK3: Model = {
  slug: "kimi-k3",
  displayName: "Kimi K3",
  provider: "Moonshot AI",
  family: "Kimi K3",
  versionLabel:
    "kimi-k3 via platform.kimi.ai (weights published 2026-07-26, custom Kimi K3 License)",
  endpoint: "platform.kimi.ai",
  openWeight: true,
  releasedAt: "2026-07-15",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 2.4,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 12. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "Pliny-style jailbreaks circulated within days of launch; third-party analysis reports no external safety classifiers with remaining safeguards falling to persona and rephrasing attacks; no CASI listing yet and no developer safety evals — a regression in evidence terms from K2, which at least had eval history.",
      evidence: [
        {
          label: "Penligent analysis: Kimi K3 jailbreak surface",
          url: "https://www.penligent.ai/hackinglabs/kimi-k3-jailbreak/",
          sourceId: "security-analysis",
          retrievedAt: "2026-08-05",
          quote:
            "At publication time, Moonshot AI's official K3 materials do not describe a universal K3-specific jailbreak, a CVE assigned to the K3 model, or a dedicated public prompt-injection evaluation for the model.",
          note: "Third-party security analysis; success-rate specifics not independently confirmed.",
        },
        {
          label: "Kimi K3 model card (no safety content)",
          url: "https://huggingface.co/moonshotai/Kimi-K3",
          sourceId: "moonshot",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "Heavily agentic positioning (Kimi Code, tool use, 1M context) with no published injection results for K3; academic evaluation of predecessor K2.5 found meaningful risks in tool-enabled agentic settings.",
      evidence: [
        {
          label:
            "Academic safety evaluation of Kimi K2.5 (agentic risks; family-level evidence)",
          url: "https://arxiv.org/pdf/2604.03121",
          sourceId: "academic",
          retrievedAt: "2026-08-05",
          quote:
            "Across diverse benchmarks covering CBRNE, cybersecurity, misalignment, bias, and harmfulness aspects, we identify patterns suggesting that Kimi K2.5 poses meaningful risks in tool-enabled agentic settings, and can be used to enable serious harm.",
        },
      ],
    },
    dataHandling: {
      grade: "weak",
      summary:
        "Hosted-platform privacy policy permits training on prompts, files, and outputs with no documented in-product opt-out; PRC processing; retention unspecified; enterprise restrictions by negotiation only. The published weights offer a deployer-controlled alternative.",
      evidence: [
        {
          label:
            "Moonshot/Kimi privacy policy analysis (training use, no opt-out)",
          url: "https://www.cometapi.com/is-kimi-safe-to-use/",
          sourceId: "security-analysis",
          retrievedAt: "2026-08-05",
          quote:
            "Moonshot AI's privacy policy says user prompts and uploaded content may be used to improve and train its models, personal information may be shared with service providers and affiliates, and AI output may be inaccurate.",
          note: "Secondary analysis; first-party policy page pending direct capture by the snapshot pipeline.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Weights published (1.5TB, one day ahead of pledge) with a 47-page technical report — but the report is architecture and benchmarks only: no safety or red-teaming section, training data and cutoff undisclosed, no external testing.",
      evidence: [
        {
          label: "Kimi K3 weights",
          url: "https://huggingface.co/moonshotai/Kimi-K3",
          sourceId: "moonshot",
          retrievedAt: "2026-08-05",
          quote:
            "We release the full Kimi K3 model weights under the Kimi K3 License, making frontier intelligence openly available for research, deployment, and further innovation.",
        },
        {
          label: "Kimi K3 technical report (repository)",
          url: "https://github.com/MoonshotAI/Kimi-K3",
          sourceId: "moonshot",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "No SOC 2, ISO 27001, or ISO 42001 certifications found for the hosted platform.",
      evidence: [
        {
          label: "Kimi platform documentation (no certification claims)",
          url: "https://platform.kimi.ai/docs/guide/kimi-k3-quickstart",
          sourceId: "moonshot",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    operational: {
      grade: "weak",
      summary:
        "Dateless kimi-k3 API ID with no snapshot scheme, no changelog, and no published deprecation policy — weaker versioning than the K2 open-checkpoint era.",
      evidence: [
        {
          label: "Kimi K3 API quickstart (dateless model ID)",
          url: "https://platform.kimi.ai/docs/guide/kimi-k3-quickstart",
          sourceId: "moonshot",
          retrievedAt: "2026-08-05",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: false,
      documentedSafetyPolicy: false,
      enterpriseDataControls: false,
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: false,
      versionedWithChangelogs: false,
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: true,
    retentionWindow: "Not documented",
    dataResidency: "PRC (hosted platform)",
    euAiActNotes: "No published EU AI Act posture.",
    deprecationPolicy: null,
    cloudAvailability: [
      "platform.kimi.ai",
      "Self-hosted (Kimi K3 License weights)",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["PRC"],
    regionalOptions: false,
    note: "Hosted platform processes data in the PRC; no regional options.",
  },
  consumerGap: {
    severity: "none",
    note: "No gap because there is no better tier: the hosted platform itself permits training on prompts, files, and outputs with no documented opt-out.",
  },
  notes:
    "Graded on the hosted endpoint, unlike the K2 entry's self-hosted reference — Moonshot shifted to a hosted-first commercial launch (API two weeks before weights) and a custom license with revenue and attribution triggers replacing K2's modified-MIT. That shift moves the graded surface, and the tier, with it: K2 reached Tier 1 on the self-hosted convention; K3's hosted terms fail Tier 1 on data controls and safety disclosure.",
};
