import type { Model } from "../schema";

export const step37Flash: Model = {
  slug: "step-3-7-flash",
  displayName: "StepFun Step 3.7 Flash",
  provider: "StepFun",
  family: "Step 3",
  versionLabel:
    "step-3.7-flash (open weights, Apache 2.0) via platform.stepfun.ai / multiple hosts",
  endpoint: "platform.stepfun.ai",
  openWeight: true,
  releasedAt: "2026-05-28",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 2.7,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 10. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "under-review",
      summary:
        "A complete testing vacuum: no F5 listing, no academic or third-party security testing found, and no developer safety evals. For a top-10 model by usage, the absence is the finding.",
      evidence: [
        {
          label: "F5 Labs CASI/ARS leaderboards (no StepFun models listed)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
        },
        {
          label: "Step 3.7 Flash model card (no safety content)",
          url: "https://huggingface.co/stepfun-ai/Step-3.7-Flash",
          sourceId: "stepfun",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    injection: {
      grade: "under-review",
      summary:
        "Marketed for coding agents and search workflows; no injection results or hardening documentation exist from StepFun or any third party.",
      evidence: [
        {
          label:
            "Step 3.7 Flash release blog (agentic positioning, no security results)",
          url: "https://static.stepfun.com/blog/step-3.7-flash/",
          sourceId: "stepfun",
          retrievedAt: "2026-08-05",
          quote:
            "Users can hand Step 3.7 Flash a complete piece of knowledge work and trust it to independently map out the plan, search across live sources, extract key information, and fluidly orchestrate tools to deliver a ready-to-ship result without intervention.",
        },
      ],
    },
    dataHandling: {
      grade: "weak",
      summary:
        "The global platform's privacy policy states US-located servers (a genuine plus) and 3-year IP retention — but is entirely silent on whether API inputs and outputs are used for training, with no opt-out documented and the terms-of-use page returning 404. Silence on training is a fail for a buyer. Self-hosting the Apache 2.0 weights is deployer-controlled.",
      evidence: [
        {
          label: "StepFun platform privacy policy (silent on training use)",
          url: "https://platform.stepfun.ai/docs/en/agreement/userprivacy",
          sourceId: "stepfun",
          retrievedAt: "2026-08-05",
          quote: "Our servers are located in the United States.",
        },
      ],
    },
    transparency: {
      grade: "weak",
      summary:
        "Open weights, but the thinnest documentation of any tracked model: a capability-only model card, a blog post standing in for a technical report, no safety content of any kind, and no external testing.",
      evidence: [
        {
          label: "Step 3.7 Flash weights and model card",
          url: "https://huggingface.co/stepfun-ai/Step-3.7-Flash",
          sourceId: "stepfun",
          retrievedAt: "2026-08-05",
          quote: "This project is open-sourced under the Apache 2.0 License",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "No certifications mentioned anywhere in platform documentation.",
      evidence: [
        {
          label: "StepFun platform documentation (no certification claims)",
          url: "https://platform.stepfun.ai/docs/en/guides/models/step-3.7-flash",
          sourceId: "stepfun",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    operational: {
      grade: "weak",
      summary:
        "Undated alias on the first-party API with no snapshot scheme (OpenRouter's date suffix is OpenRouter's, not StepFun's), no changelog, and no deprecation policy.",
      evidence: [
        {
          label: "Step 3.7 Flash model documentation (undated alias)",
          url: "https://platform.stepfun.ai/docs/en/guides/models/step-3.7-flash",
          sourceId: "stepfun",
          retrievedAt: "2026-08-05",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: {
        satisfied: true,
        note: "Capability-only card; no safety content.",
      },
      publishedSafetyEvals: false,
      documentedSafetyPolicy: false,
      enterpriseDataControls: {
        satisfied: false,
        note: "Privacy policy silent on training use of API data; no opt-out documented.",
      },
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
    trainsOnCustomerDataByDefault: null,
    retentionWindow:
      "Not documented for prompts; IP addresses retained 3 years",
    dataResidency:
      "US servers (global platform); China platform terms not assessed",
    euAiActNotes: "No published EU AI Act posture.",
    deprecationPolicy: null,
    cloudAvailability: [
      "platform.stepfun.ai",
      "Self-hosted (Apache 2.0 weights)",
      "NVIDIA NIM",
      "Baseten",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["US"],
    regionalOptions: false,
    note: "Global platform states US-located servers; the separate China platform's terms are not assessed.",
  },
  notes:
    "Composite score 0/100 over the four applied vectors — not because the model is proven unsafe, but because nothing about its safety posture is documented or tested. The distinction matters and both halves are on the record here.",
};
