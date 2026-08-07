import type { Model } from "../schema";

export const glm52: Model = {
  slug: "glm-5-2",
  displayName: "GLM-5.2",
  provider: "Z.ai (Zhipu)",
  family: "GLM-5",
  versionLabel: "glm-5.2 (open weights, MIT) via api.z.ai / self-hosted",
  endpoint: "api.z.ai",
  openWeight: true,
  releasedAt: "2026-06-16",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 5.0,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 7. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "NIST CAISI found GLM-5.2 more robust than other PRC open-weight models but confirmed its safeguards assist agentic cyber-exploit development and can be circumvented when self-hosted; F5 scored it CASI 46.58 against a frontier band of 85–95, and a public DAN-style jailbreak landed within weeks of release.",
      evidence: [
        {
          label: "NIST CAISI assessment of Z.ai's GLM-5.2",
          url: "https://www.nist.gov/news-events/news/2026/07/caisi-assessment-zais-glm-52",
          sourceId: "nist-caisi",
          retrievedAt: "2026-08-05",
          quote:
            "GLM-5.2’s safeguards allow assistance with agentic cyber exploit development.",
        },
        {
          label:
            "F5 Labs: Chinese open-weight AI models — cybersecurity risks and rewards",
          url: "https://www.f5.com/labs/articles/chinese-open-weight-ai-models-cybersecurity-risks-and-rewards",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Qwen3.5-397B-A17B scored 81.13 and Xiaomi’s MiMo-V2.5 scored 73.80, while Z.ai’s GLM-5.2 scored 46.58.",
        },
        {
          label: "InjectPrompt DAN jailbreak (GLM-5.2, MiniMax M3, Kimi K2.6)",
          url: "https://www.injectprompt.com/p/kimi-k26-glm-52-minimax-m3-dan-jailbreak",
          sourceId: "injectprompt",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "Marketed for agentic engineering, but no injection hardening or agent red-teaming has been published by the developer; CAISI's agent-hijacking findings are relative praise within a weak cohort.",
      evidence: [
        {
          label: "NIST CAISI assessment (agent hijacking findings)",
          url: "https://www.nist.gov/news-events/news/2026/07/caisi-assessment-zais-glm-52",
          sourceId: "nist-caisi",
          retrievedAt: "2026-08-05",
          quote:
            "However, GLM-5.2 appears potentially more robust against agent hijacking and jailbreaking attacks than other evaluated PRC open-weight models.",
        },
      ],
    },
    dataHandling: {
      grade: "partial",
      summary:
        "The api.z.ai privacy policy states zero retention by default for API content with Singapore processing — unusually clean terms on paper — but the PRC-platform sibling (bigmodel.cn) terms are unverified, and no certification backs the claims. Self-hosting the MIT weights sidesteps all of it.",
      evidence: [
        {
          label: "Z.ai API privacy policy",
          url: "https://docs.z.ai/legal-agreement/privacy-policy",
          sourceId: "zai",
          retrievedAt: "2026-08-05",
          quote:
            "The Company do not store any of the content the Customer or its End Users provide or generate while using our Services.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Genuine capability transparency — MIT-licensed weights and detailed technical reports — but zero safety disclosure: no safety section in the model card, no published safety evals, no provider-commissioned external testing.",
      evidence: [
        {
          label: "GLM-5.2 model card and weights",
          url: "https://huggingface.co/zai-org/GLM-5.2",
          sourceId: "zai",
          retrievedAt: "2026-08-05",
          quote:
            "An MIT open-source license — no regional limits, technical access without borders",
        },
        {
          label: "GLM-5 technical report",
          url: "https://arxiv.org/abs/2602.15763",
          sourceId: "academic",
          retrievedAt: "2026-08-05",
          quote:
            "We present GLM-5, a next-generation foundation model designed to transition the paradigm of vibe coding to agentic engineering.",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "No SOC 2, ISO, or equivalent certification claims published for the Z.ai API; no enterprise compliance documentation found.",
      evidence: [
        {
          label: "Z.ai legal documentation (no certifications listed)",
          url: "https://docs.z.ai/legal-agreement/privacy-policy",
          sourceId: "zai",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Open releases are dated at the aggregator level, but the first-party HuggingFace repo is a rolling main branch, and no changelog or deprecation policy exists for the hosted API.",
      evidence: [
        {
          label: "GLM-5.2 weights repository",
          url: "https://huggingface.co/zai-org/GLM-5.2",
          sourceId: "zai",
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
      enterpriseDataControls: {
        satisfied: true,
        note: "Zero-retention default and Singapore processing per the API privacy policy; PRC-platform terms unverified.",
      },
    },
    tier2: {
      externalPreDeploymentTesting: {
        satisfied: false,
        note: "Third-party testing exists (NIST CAISI, F5) but was independent and post-release, not disclosed pre-deployment testing.",
      },
      thirdPartyCertification: false,
      versionedWithChangelogs: {
        satisfied: false,
        note: "Rolling main branch on the first-party weights repo; no changelog.",
      },
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: false,
    retentionWindow:
      "API: zero retention by default per privacy policy (uncertified claim)",
    dataResidency:
      "Singapore (api.z.ai); PRC platform (bigmodel.cn) terms unverified",
    euAiActNotes:
      "No published EU AI Act posture; deployer obligations fall on the customer.",
    deprecationPolicy: null,
    cloudAvailability: [
      "api.z.ai",
      "Self-hosted (MIT weights)",
      "NVIDIA NIM",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["SG"],
    regionalOptions: false,
    note: "api.z.ai states Singapore processing; the PRC-platform sibling (bigmodel.cn) has unverified terms and is not graded here.",
  },
  notes:
    "Tier 0 despite MIT weights and clean API data terms: the checklist requires published safety evals and a documented safety policy, and Z.ai publishes neither. NIST CAISI's assessment is the most substantive third-party safety document — for a PRC-lab model, an unusual distinction.",
};
