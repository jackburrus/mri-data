import type { Model } from "../schema";

export const minimaxM3: Model = {
  slug: "minimax-m3",
  displayName: "MiniMax M3",
  provider: "MiniMax",
  family: "MiniMax M",
  versionLabel:
    "minimax-m3 (open weights, community license) via api.minimax.io / self-hosted",
  endpoint: "api.minimax.io",
  openWeight: true,
  releasedAt: "2026-06-01",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 3.2,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 9. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "weak",
      summary:
        "No developer safety evals exist; a public DAN-style jailbreak landed within a month of release, and the family's track record on F5's board is volatile — predecessor M2.5 collapsed 29 CASI points in a single month. M3 itself has no standalone third-party score yet.",
      evidence: [
        {
          label: "InjectPrompt DAN jailbreak (GLM-5.2, MiniMax M3, Kimi K2.6)",
          url: "https://www.injectprompt.com/p/kimi-k26-glm-52-minimax-m3-dan-jailbreak",
          sourceId: "injectprompt",
          retrievedAt: "2026-08-05",
        },
        {
          label: "F5 Labs CASI/ARS leaderboards (family-level history)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          note: "M3 not yet individually scored; M2 ~80, M2.5 fell 86.44 to 57.09 between April and May 2026.",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "Heavily marketed for agentic coding, with no published injection hardening or agent red-teaming results of any kind.",
      evidence: [
        {
          label: "MiniMax M3 model card (no safety section)",
          url: "https://huggingface.co/MiniMaxAI/MiniMax-M3",
          sourceId: "minimax",
          retrievedAt: "2026-08-05",
          quote:
            "Coding & Cowork Capability: M3 achieves frontier-level performance across long-horizon agentic benchmarks, excelling in both coding and cowork.",
        },
      ],
    },
    dataHandling: {
      grade: "weak",
      summary:
        "Platform terms permit using inputs and outputs to develop and improve services, with no general no-training promise, no documented opt-out, and no stated retention window. The operating entity is Singapore-domiciled but reporting indicates processing likely occurs in the PRC — corporate domicile is not data residency. Self-hosting the weights avoids all of this.",
      evidence: [
        {
          label: "MiniMax platform terms of service",
          url: "https://platform.minimax.io/protocol/terms-of-service",
          sourceId: "minimax",
          retrievedAt: "2026-08-05",
          quote:
            "We may use the input and generated content to provide, maintain, develop, and improve our Services, comply with applicable law, enforce our terms and policies, and keep our Services safe.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Open weights and a genuine architecture paper (MiniMax Sparse Attention), but zero safety disclosure: no safety section, no evals, no external testing — notable for a company that IPO'd on the HKEX in January 2026.",
      evidence: [
        {
          label: "MiniMax M3 weights and model card",
          url: "https://huggingface.co/MiniMaxAI/MiniMax-M3",
          sourceId: "minimax",
          retrievedAt: "2026-08-05",
        },
        {
          label: "MiniMax Sparse Attention technical report",
          url: "https://arxiv.org/abs/2606.13392",
          sourceId: "academic",
          retrievedAt: "2026-08-05",
          quote:
            "We introduce MiniMax Sparse Attention (MSA), a blockwise sparse attention built upon Grouped Query Attention (GQA).",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "No SOC 2, ISO, or equivalent certifications published for the API despite the public listing; the IPO prospectus remains the unchecked place such claims would live.",
      evidence: [
        {
          label: "MiniMax terms of service (no certifications listed)",
          url: "https://www.minimax.io/terms-of-service-v2.html",
          sourceId: "minimax",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Aggregator-level dated snapshots and stable pricing across the M-series, but a rolling first-party weights repo, no changelog, and no stated deprecation policy for the hosted API.",
      evidence: [
        {
          label: "MiniMax M3 weights repository",
          url: "https://huggingface.co/MiniMaxAI/MiniMax-M3",
          sourceId: "minimax",
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
      versionedWithChangelogs: {
        satisfied: false,
        note: "Dated slugs exist only at aggregators; first-party repo is rolling with no changelog.",
      },
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: true,
    retentionWindow: "Not documented",
    dataResidency:
      "Singapore-domiciled operator; processing likely PRC (unresolved residency paradox)",
    euAiActNotes: "No published EU AI Act posture.",
    deprecationPolicy: null,
    cloudAvailability: [
      "api.minimax.io",
      "Self-hosted (community license)",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["PRC"],
    regionalOptions: false,
    note: "Singapore-domiciled operator; processing likely PRC — corporate domicile is not data residency.",
  },
  consumerGap: {
    severity: "none",
    note: "No gap because the API tier is itself weak: platform terms permit using inputs and outputs to improve services with no opt-out.",
  },
  notes:
    "Dual-nature entry graded on the hosted first-party endpoint, DeepSeek-style: the tier reflects api.minimax.io's train-by-default terms and absent safety disclosure. Self-hosted deployments of the weights escape the data-handling failure but inherit the ungraded safety posture.",
};
