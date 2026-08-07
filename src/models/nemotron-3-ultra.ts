import type { Model } from "../schema";

export const nemotron3Ultra: Model = {
  slug: "nemotron-3-ultra",
  displayName: "NVIDIA Nemotron 3 Ultra",
  provider: "NVIDIA",
  family: "Nemotron 3",
  versionLabel:
    "NVIDIA-Nemotron-3-Ultra-550B-A55B (open weights, OpenMDW-1.1; self-hosted NIM reference)",
  endpoint: "self-hosted (NIM) / build.nvidia.com trial",
  openWeight: true,
  releasedAt: "2026-06-04",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 4.1,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 8. Excludes self-hosted NIM deployments, which are the intended production path and unmeasurable.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "partial",
      summary:
        "A genuinely split verdict: debuted at CASI 83.68 — #4 overall and the highest security score ever recorded for open weights — with 99.5% jailbreak robustness on static benchmarks; but Ubicloud's adaptive red-teaming collapsed it to a 50.2/100 adaptive index with 33% harmful-refusal resistance, including refusals whose reasoning traces still worked through the disallowed content.",
      evidence: [
        {
          label: "F5 Labs CASI/ARS leaderboards (Nemotron 3 Ultra: 83.68, #4)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
          quote:
            "Nemotron-3-Ultra-550B (nVidia) enters in July at 83.68, a strong mid-tier performance",
        },
        {
          label: "Ubicloud AI safety study (adaptive red-teaming collapse)",
          url: "https://www.ubicloud.com/blog/ai-safety-study-for-deepseek-v4-kimi-k2-6-and-nemotron-3-ultra",
          sourceId: "ubicloud",
          retrievedAt: "2026-08-05",
          quote:
            "The reasoning trace, in both replication runs, works through the disallowed synthesis in technical detail, the exact content the refusal was meant to withhold.",
        },
      ],
    },
    injection: {
      grade: "weak",
      summary:
        "Training includes synthetic indirect-injection data, yet Ubicloud measured 8.3% injection resistance under adaptive attack (99.4% on static benchmarks — the gap is the lesson). NVIDIA's real defenses are external add-ons: the Nemotron 3.5 Content Safety guard model and NeMo Guardrails, both trivially omitted by deployers.",
      evidence: [
        {
          label:
            "Ubicloud AI safety study (adaptive injection resistance 8.3%)",
          url: "https://www.ubicloud.com/blog/ai-safety-study-for-deepseek-v4-kimi-k2-6-and-nemotron-3-ultra",
          sourceId: "ubicloud",
          retrievedAt: "2026-08-05",
        },
        {
          label:
            "Nemotron 3.5 Content Safety guard model (external defense layer)",
          url: "https://huggingface.co/blog/nvidia/nemotron-3-5-content-safety",
          sourceId: "nvidia",
          retrievedAt: "2026-08-05",
          quote:
            "Today, we are releasing Nemotron 3.5 Content Safety , which completes that arc: a single model that unifies multimodal input, multilingual reach, custom enterprise policy enforcement, and auditable reasoning into one inference call.",
        },
      ],
    },
    dataHandling: {
      grade: "not-applicable",
      summary:
        "Deployer property in the self-hosted NIM reference deployment, which is the intended production path. Note the hosted build.nvidia.com trial is the opposite of a safe default: its Trial Terms reserve the right to use submitted content to improve NVIDIA products including AI models, so the trial endpoint should not be treated as a no-train surface.",
      evidence: [
        {
          label: "NVIDIA API Trial Terms of Service (\u00a73.3 data collection)",
          url: "https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf",
          sourceId: "nvidia",
          retrievedAt: "2026-08-05",
          quote:
            "3.3 NVIDIA will collect the following data, without identifying specific users, to operate and improve the API Services and other products and services: (i) session metrics (e.g., the amount of processing power consumed, type of request made); (ii) error logs and execution logs relating to your session (e.g., whether your request was executed successfully); (iii) your feedback and ranking of specific API Services; and (iv) User Content and Generated Content to improve NVIDIA products and services, including AI models.",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "The best open-weight disclosure tracked: Model Card++ with safety/bias/privacy subcards, a technical report, and training-data disclosure (~20T tokens) — held back from strong because quantitative safety results are thinner than closed-lab system cards and external testing was not a disclosed pre-deployment program.",
      evidence: [
        {
          label:
            "Nemotron 3 Ultra model card (Model Card++ with safety subcards)",
          url: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16",
          sourceId: "nvidia",
          retrievedAt: "2026-08-05",
          quote:
            "For more detailed information on ethical considerations for this model, please see the Model Card++ Bias , and Privacy Subcards.",
        },
        {
          label: "Nemotron 3 Ultra technical report",
          url: "https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Ultra-Technical-Report.pdf",
          sourceId: "nvidia",
          retrievedAt: "2026-08-05",
          quote:
            "We pretrained our base model in NVFP4 with 20 trillion text tokens using a Warmup-Stable-Decay learning rate schedule.",
        },
      ],
    },
    compliance: {
      grade: "not-applicable",
      summary:
        "Deployer property: no certification attaches to open weights, and none is published for the hosted trial endpoint.",
      evidence: [
        {
          label:
            "Nemotron 3 Ultra on build.nvidia.com (no certification claims)",
          url: "https://build.nvidia.com/nvidia/nemotron-3-ultra-550b-a55b/modelcard",
          sourceId: "nvidia",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Immutable dated HF checkpoints and a v1.0-GA versioned card; but NVIDIA's own naming is undated, there is no changelog, and no deprecation policy is stated.",
      evidence: [
        {
          label: "Nemotron 3 Ultra weights repository",
          url: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16",
          sourceId: "nvidia",
          retrievedAt: "2026-08-05",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: {
        satisfied: true,
        note: "Model Card++ safety subcards and technical report; quantitative depth below closed-lab system cards.",
      },
      documentedSafetyPolicy: {
        satisfied: true,
        note: "Trustworthy-AI subcards plus an explicit guardrail-circumvention warning in the license terms.",
      },
      enterpriseDataControls: null,
    },
    tier2: {
      externalPreDeploymentTesting: {
        satisfied: false,
        note: "NR Labs' pre-release disclosure on the Nano sibling informed hardening, and F5/Ubicloud tested post-release — but no disclosed pre-deployment testing program exists.",
      },
      thirdPartyCertification: {
        satisfied: false,
        note: "No certification pathway currently exists for open weights.",
      },
      versionedWithChangelogs: {
        satisfied: true,
        note: "Immutable dated checkpoints; no changelog.",
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
      "Deployer-controlled (self-hosted NIM). Hosted trial: Trial Terms \u00a73.3 reserve use of submitted content to improve NVIDIA products including AI models",
    dataResidency: "Deployer-controlled",
    euAiActNotes:
      "Open-weight GPAI provisions apply; deployer obligations dominate.",
    deprecationPolicy: "None stated; weights remain available once released",
    cloudAvailability: [
      "Self-hosted (NIM)",
      "build.nvidia.com (trial)",
      "OpenRouter and other hosts",
      "Perplexity Pro",
    ],
  },
  jurisdiction: {
    zones: ["deployer"],
    regionalOptions: false,
    note: "Graded on the self-hosted NIM reference deployment; the build.nvidia.com trial endpoint carries separate trial terms.",
  },
  consumerGap: {
    severity: "none",
    note: "No consumer tier exists; production use is self-hosted by design.",
  },
  notes:
    "The static-versus-adaptive gap (99.4% → 8.3% injection resistance) is this entry's headline and a general caution about benchmark-based grades — exactly why the methodology weighs adaptive results over static suites. Graded on the self-hosted reference deployment.",
};
