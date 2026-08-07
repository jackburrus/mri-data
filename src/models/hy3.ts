import type { Model } from "../schema";

export const hy3: Model = {
  slug: "hy3",
  displayName: "Tencent Hunyuan HY3",
  provider: "Tencent",
  family: "Hunyuan",
  versionLabel: "hy3 (open weights, Apache 2.0) via TokenHub / multiple hosts",
  endpoint: "tokenhub.tencentmaas.com",
  openWeight: true,
  releasedAt: "2026-07-06",
  reviewStatus: "reviewed",
  usageShare: {
    pct: 8.6,
    evidence: {
      label: "OpenRouter rankings API (daily token share, 2026-08-04)",
      url: "https://openrouter.ai/api/frontend/v1/rankings/models",
      sourceId: "openrouter",
      retrievedAt: "2026-08-05",
      note: "Rank 3, inflated by a two-week free tier at launch that made it #1 by weekly usage. Single-day window, OpenRouter only.",
    },
  },
  vectors: {
    jailbreak: {
      grade: "under-review",
      summary:
        "Not yet assessable: no independent security testing exists (absent from F5's board as of July 2026 — likely too new), and Tencent publishes no safety evals — only internal reliability metrics like hallucination rates. A ~8.6%-share model with zero security evidence either way.",
      evidence: [
        {
          label: "HY3 model card (reliability metrics only, no safety evals)",
          url: "https://huggingface.co/tencent/Hy3",
          sourceId: "tencent",
          retrievedAt: "2026-08-05",
          quote:
            "In internal evaluations based on real-world scenarios, Hy3's hallucination rate dropped from 12.5% to 5.4%, and commonsense error rates fell from 25.4% to 12.7%.",
        },
        {
          label: "F5 Labs CASI/ARS leaderboards (HY3 not yet listed)",
          url: "https://www.f5.com/labs/casi",
          sourceId: "f5-casi",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    injection: {
      grade: "under-review",
      summary:
        "Marketed on stable tool-calling across agent scaffoldings, with no published injection results from Tencent or any third party.",
      evidence: [
        {
          label: "HY3 repository (agentic claims, no injection results)",
          url: "https://github.com/Tencent-Hunyuan/Hy3",
          sourceId: "tencent",
          retrievedAt: "2026-08-05",
          quote:
            "Stability of tool calls and output formats : We fixed multiple baseline reliability issues, bringing the model to production-grade standards across tool configurations and output constraints.",
        },
      ],
    },
    dataHandling: {
      grade: "under-review",
      summary:
        "English-language training-default, retention, and residency terms for the first-party TokenHub API could not be located; third-party analyses flag GDPR concerns and recommend self-hosting for sensitive data. The Apache 2.0 weights make self-hosting fully deployer-controlled.",
      evidence: [
        {
          label:
            "Tencent Cloud TokenHub product page (terms not surfaced in English)",
          url: "https://www.tencentcloud.com/act/pro/tokenhub",
          sourceId: "tencent",
          retrievedAt: "2026-08-05",
        },
      ],
    },
    transparency: {
      grade: "partial",
      summary:
        "Apache 2.0 weights (a license loosening from the preview's community license) with benchmark-rich model card and repo — but no technical report, no safety section, and no external testing.",
      evidence: [
        {
          label: "HY3 weights and model card",
          url: "https://huggingface.co/tencent/Hy3",
          sourceId: "tencent",
          retrievedAt: "2026-08-05",
          quote: "Hy3 is released under the Apache License 2.0",
        },
        {
          label: "Tencent HY3 official release announcement",
          url: "https://www.tencent.com/en-us/articles/2202386.html",
          sourceId: "tencent",
          retrievedAt: "2026-08-05",
          quote:
            "On the open-source front, Hy3 is available under the commercially friendly Apache 2.0 license, allowing developers worldwide to download and use it.",
        },
      ],
    },
    compliance: {
      grade: "weak",
      summary:
        "Tencent Cloud holds platform-level ISO 27001:2022, but whether it scopes TokenHub is unverified, and nothing model- or service-specific is published.",
      evidence: [
        {
          label: "Tencent Cloud compliance documentation",
          url: "https://www.tencentcloud.com/document/product/363/2408",
          sourceId: "tencent",
          retrievedAt: "2026-08-05",
          quote:
            "Tencent Cloud has obtained certification for the upgraded ISO27001:2022 information security management system standard.",
        },
      ],
    },
    operational: {
      grade: "partial",
      summary:
        "Distinct dated releases (preview April, GA July) with separate IDs — better discipline than most peers — but no changelog, no deprecation policy, and an opaque preview-period serving history.",
      evidence: [
        {
          label: "HY3 preview repository (dated release lineage)",
          url: "https://github.com/Tencent-Hunyuan/Hy3-preview",
          sourceId: "tencent",
          retrievedAt: "2026-08-05",
          quote:
            "[2026-04-23] 🔥 We open-source Hy3 preview model weights on Hugging Face , ModelScope , and GitCode",
        },
      ],
    },
  },
  tierChecklist: {
    tier1: {
      publishedModelCard: true,
      publishedSafetyEvals: false,
      documentedSafetyPolicy: {
        satisfied: false,
        note: "Apache 2.0 weights carry no acceptable-use policy; hosted-API policy unverified in English.",
      },
      enterpriseDataControls: {
        satisfied: false,
        note: "TokenHub terms unlocatable in English; treated as unsatisfied pending verification.",
      },
    },
    tier2: {
      externalPreDeploymentTesting: false,
      thirdPartyCertification: {
        satisfied: false,
        note: "Platform-level Tencent Cloud ISO 27001 exists; TokenHub scope unverified.",
      },
      versionedWithChangelogs: {
        satisfied: true,
        note: "Dated preview/GA releases with separate IDs; no formal changelog.",
      },
      statedDeprecationPolicy: false,
    },
  },
  compliance: {
    soc2: null,
    iso42001: null,
    hipaaEligible: null,
    trainsOnCustomerDataByDefault: null,
    retentionWindow: "Unverified",
    dataResidency:
      "Unverified; Tencent (PRC) processing presumed by third-party analyses",
    euAiActNotes:
      "No published EU AI Act posture; third-party analyses flag GDPR concerns for hosted use.",
    deprecationPolicy: null,
    cloudAvailability: [
      "Tencent Cloud TokenHub",
      "Self-hosted (Apache 2.0 weights)",
      "Multiple inference providers",
    ],
  },
  jurisdiction: {
    zones: ["PRC"],
    regionalOptions: false,
    note: "Unverified: PRC processing presumed by third-party analyses of Tencent's TokenHub; no first-party residency statement located in English.",
  },
  notes:
    "Three of six vectors are under review — the honest description of a month-old model with ~8.6% share and no security evidence in either direction. That gap is itself the finding: usage arrived (via a free tier) far ahead of any safety scrutiny.",
};
