import type { ChangeEvent } from "./schema";

/**
 * Manually curated change feed (Phase 1). Reverse-chronological.
 * Same schema shape the automated detectors will write to in Phase 2.
 */
export const changeEvents: ChangeEvent[] = [
  {
    id: "mri-mimo-data-handling-resolved",
    date: "2026-08-07",
    modelSlugs: ["mimo-v2-5"],
    kind: "methodology",
    severity: "info",
    title:
      "MiMo-V2.5 data handling resolved: under-review → partial, and the URL we were citing was wrong",
    summary:
      "This entry sat at under-review on the stated grounds that the privacy policy was JS-rendered and could not be captured. That diagnosis was wrong. Rendered in a real browser, the cited URL (mimo.mi.com/docs/en-US/terms/privacy-policy) returns the marketing homepage for any path — it is a single-page app serving its shell, and no amount of rendering would ever have produced terms. The actual policy lives on Xiaomi's central privacy host. Reading it resolves the vector to partial: the no-training default is confirmed in Xiaomi's own words and stated categorically, and residency is disclosed as the Netherlands and Singapore under EU Standard Contractual Clauses. It stops short of strong because retention is committed only as 'the period necessary', with no defined window and no zero-retention control — which also means the 30-day prompt-logging figure our previous summary attributed to secondary reporting is still unconfirmed by the provider. The prior summary's claim that residency was undisclosed is corrected. Published rather than silently fixed, per the methodology.",
    evidence: [
      {
        label: "Xiaomi MiMo Privacy Policy — training use",
        url: "https://privacy.mi.com/XiaomiMiMoPlatform/en_GB/",
        sourceId: "xiaomi",
        retrievedAt: "2026-08-07",
        quote:
          "Xiaomi will not use the content you provide for model training or any other purposes.",
      },
    ],
  },
  {
    id: "mri-correction-nemotron-trial-terms",
    date: "2026-08-05",
    modelSlugs: ["nemotron-3-ultra", "gemini-3-pro", "gemini-3-1-pro"],
    kind: "methodology",
    severity: "warning",
    title: "Correction: two of our own claims did not survive verification",
    summary:
      "Binding claims to verbatim source text caught two errors in our published data. (1) We stated NVIDIA's hosted API trial carries a no-training clause; the Trial Terms in fact reserve use of submitted content 'to improve NVIDIA products and services, including AI models' — the opposite. The data-governance summary and retention field are corrected and the clause is now quoted directly. (2) Our Gemini transparency entries credited the model card with naming external testers (UK AISI, Apollo, Vaultis, Dreadnode); the archived card names none of them, so that requirement now rests on Google's release materials and is flagged as needing a better primary citation. Published rather than silently fixed, per the methodology.",
    evidence: [
      {
        label: "NVIDIA API Trial Terms of Service (§3.3)",
        url: "https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf",
        sourceId: "nvidia",
        retrievedAt: "2026-08-05",
        quote:
          "3.3 NVIDIA will collect the following data, without identifying specific users, to operate and improve the API Services and other products and services: (i) session metrics (e.g., the amount of processing power consumed, type of request made); (ii) error logs and execution logs relating to your session (e.g., whether your request was executed successfully); (iii) your feedback and ranking of specific API Services; and (iv) User Content and Generated Content to improve NVIDIA products and services, including AI models.",
      },
    ],
  },
  {
    id: "mri-pdf-extraction-pipeline",
    date: "2026-08-05",
    modelSlugs: [],
    kind: "methodology",
    severity: "info",
    title: "PDF extraction pipeline: system cards are now verifiable evidence",
    summary:
      "Frontier-lab system cards, model cards and technical reports are published as PDFs, which the archival monitor could hash but not read — so every claim citing one sat permanently unverified. A pypdf-based extraction pipeline now archives their text through the same internal ingest API the monitor uses, making the Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.5, GPT-5, Gemini, Grok 4.1, Nemotron and arXiv PDFs quotable and checkable for the first time.",
    evidence: [
      {
        label: "Verification status endpoint",
        url: "https://modelriskindex.com/api/v1/verification",
        sourceId: "modelriskindex",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "mri-quote-provenance-2026-08",
    date: "2026-08-05",
    modelSlugs: [],
    kind: "methodology",
    severity: "notice",
    title:
      "Quote-level provenance: claims are now bound to verbatim source text",
    summary:
      "Evidence references can now carry the exact sentence supporting a claim, verified against the archived snapshot of the cited page and re-checked after every monitor run. A provider editing the sentence a grade rests on now flags that claim as invalidated instead of leaving a live-but-hollow link. Coverage is published openly at /api/v1/verification and is being backfilled — an unbound claim is unverified, not wrong.",
    evidence: [
      {
        label: "Verification status endpoint",
        url: "https://modelriskindex.com/api/v1/verification",
        sourceId: "modelriskindex",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "mri-methodology-v0-3-five-vectors",
    date: "2026-08-05",
    modelSlugs: [],
    kind: "methodology",
    severity: "notice",
    title: "Methodology v0.3: framework collapsed from six vectors to five",
    summary:
      "Jailbreak and prompt-injection resistance now present as one Adversarial resistance vector, graded to the weaker facet, with both measures still shown on each model page. Composite scores are now computed over five vectors, and the risk rosette is a five-slot wheel. No underlying assessment changed — this is a presentation and scoring change, published like any other.",
    evidence: [
      {
        label: "Methodology page (v0.3 changelog)",
        url: "https://modelriskindex.com/methodology",
        sourceId: "modelriskindex",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "mri-tracked-set-expansion-2026-08",
    date: "2026-08-05",
    modelSlugs: [],
    kind: "methodology",
    severity: "notice",
    title:
      "Tracked set expanded from 12 to 25 models; OpenRouter top-10 coverage complete",
    summary:
      "Thirteen entries added with fetched evidence: DeepSeek V4 Flash and Pro, Xiaomi MiMo v2.5, Tencent HY3, GPT-5.6 (Sol/Terra/Luna), GLM-5.2, MiniMax M3, Nemotron 3 Ultra, Step 3.7 Flash, Kimi K3, Claude Sonnet 5, Claude Opus 5, and Gemini 3.1 Pro. This closes the coverage gap flagged on 2026-08-05: the current OpenRouter top 10 is now fully assessed. Five of the thirteen enter at Tier 0; two carry under-review grades where no security evidence exists in either direction.",
    evidence: [
      {
        label: "OpenRouter rankings (coverage basis)",
        url: "https://openrouter.ai/rankings",
        sourceId: "openrouter",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "deepseek-v4-flash-silent-swap",
    date: "2026-07-31",
    modelSlugs: ["deepseek-v4-flash"],
    kind: "version",
    severity: "warning",
    title:
      "DeepSeek V4 Flash retrained and swapped into the live alias in place",
    summary:
      "DeepSeek replaced the deepseek-v4-flash alias with a retrained build (0731) — 'the calling method remains unchanged' per their own release note — with drastically different agentic behavior (it now beats V4 Pro on all nine agent benchmarks). The dated open weights were published separately; API users were switched without action. The largest-share model on OpenRouter is also the clearest current example of the silent-swap failure mode.",
    evidence: [
      {
        label: "DeepSeek API news: V4 Flash 0731",
        url: "https://api-docs.deepseek.com/news/news260731/",
        sourceId: "deepseek",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "gpt-5-6-gated-launch",
    date: "2026-06-26",
    modelSlugs: ["gpt-5-6"],
    kind: "regulation",
    severity: "notice",
    title:
      "GPT-5.6 launch gated by White House request under June executive order",
    summary:
      "Under a voluntary pre-release review process created by a June 2 executive order, the White House asked OpenAI to restrict the GPT-5.6 preview to roughly twenty government-vetted US partners, citing Sol's cyber capabilities. Broad rollout cleared on July 9. The first instance of US government pre-release gating shaping a frontier model launch.",
    evidence: [
      {
        label:
          "TechCrunch: OpenAI limits GPT-5.6 rollout after government request",
        url: "https://techcrunch.com/2026/06/26/openai-limits-gpt-5-6-rollout-after-government-request-says-restrictions-shouldnt-be-the-norm/",
        sourceId: "tech-press",
        retrievedAt: "2026-08-05",
      },
      {
        label: "GPT-5.6 preview system card",
        url: "https://deploymentsafety.openai.com/gpt-5-6-preview",
        sourceId: "openai",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "claude-opus-5-release",
    date: "2026-07-24",
    modelSlugs: ["claude-opus-5", "claude-opus-4-5"],
    kind: "version",
    severity: "info",
    title:
      "Claude Opus 5 released under ASL-3 with four named external testers",
    summary:
      "System card names UK AISI, Trajectory Labs, 10a Labs, and Gray Swan; includes an adverse capability finding (agentic cyber-range success against weakly-secured networks) published against interest. Day-one availability on Bedrock, Vertex, and Foundry. The Opus 4.5 entry moves to legacy.",
    evidence: [
      {
        label: "Claude Opus 5 announcement",
        url: "https://www.anthropic.com/news/claude-opus-5",
        sourceId: "anthropic",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "hy3-free-tier-surge",
    date: "2026-07-06",
    modelSlugs: ["hy3"],
    kind: "version",
    severity: "notice",
    title:
      "Tencent HY3 GA: license loosened to Apache 2.0, free tier drives #1 weekly usage",
    summary:
      "Official release relicensed the weights from the preview's community license to Apache 2.0, and a two-week free OpenRouter tier pushed HY3 to #1 by weekly usage (6.13T tokens) — a ~8.6% share model with, at time of entry, zero independent security testing in either direction.",
    evidence: [
      {
        label: "Tencent HY3 release announcement",
        url: "https://www.tencent.com/en-us/articles/2202386.html",
        sourceId: "tencent",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "mri-verification-pass-2026-08",
    date: "2026-08-05",
    modelSlugs: ["gpt-5-1", "claude-sonnet-4-5", "gemini-3-pro"],
    kind: "methodology",
    severity: "notice",
    title:
      "Verification pass: top-3 entries re-verified against live sources; usage shares corrected",
    summary:
      "Every citation for GPT-5.1, Claude Sonnet 4.5, and Gemini 3 Pro was fetched and checked. Grades held; corrections were citations, migrated documentation domains (claude.com, developers.openai.com), and facts: ISO/IEC 42001 confirmed for OpenAI (previously unverified), lifecycle markers added (all three models are now legacy or retired), and seeded usage-share estimates replaced with measured OpenRouter daily data — under which every tracked model now sits below 1% share.",
    evidence: [
      {
        label: "OpenRouter rankings (measured shares)",
        url: "https://openrouter.ai/rankings",
        sourceId: "openrouter",
        retrievedAt: "2026-08-05",
      },
      {
        label: "OpenAI trust portal (ISO/IEC 42001 listing)",
        url: "https://trust.openai.com/",
        sourceId: "openai",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "tracked-set-coverage-gap-2026-08",
    date: "2026-08-05",
    modelSlugs: [],
    kind: "methodology",
    severity: "warning",
    title: "Coverage gap: the entire OpenRouter top 10 is currently untracked",
    summary:
      "Measured rankings show ~60% of OpenRouter token volume flowing through models this index does not yet cover — led by DeepSeek V4 Flash (~12%), Xiaomi MiMo v2.5, Tencent HY3, GPT-5.6 Luna, and GLM-5.2 — plus successors to tracked models (Claude Sonnet/Opus 5, Kimi K3, Gemini 3.1 Pro). Tracked-set expansion is planned; publishing the gap is preferable to implying coverage that does not exist.",
    evidence: [
      {
        label: "OpenRouter rankings API (top-15 by token share, 2026-08-04)",
        url: "https://openrouter.ai/rankings",
        sourceId: "openrouter",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "gemini-3-pro-preview-shutdown",
    date: "2026-03-09",
    modelSlugs: ["gemini-3-pro"],
    kind: "version",
    severity: "warning",
    title:
      "gemini-3-pro-preview shut down; model ID silently aliased to Gemini 3.1 Pro",
    summary:
      "Roughly four months after launch and without reaching a stable GA ID, Google shut down gemini-3-pro-preview and repointed the ID to gemini-3.1-pro-preview. Requests to the old ID now reach a different model — the canonical silent-version-swap failure mode this index tracks.",
    evidence: [
      {
        label: "Gemini API changelog",
        url: "https://ai.google.dev/gemini-api/docs/changelog",
        sourceId: "google",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "claude-sonnet-5-release",
    date: "2026-06-30",
    modelSlugs: ["claude-sonnet-4-5"],
    kind: "version",
    severity: "info",
    title: "Claude Sonnet 5 released; Sonnet 4.5 moves to Legacy",
    summary:
      "Anthropic released Claude Sonnet 5 (claude-sonnet-5) with a system card. Sonnet 4.5 is now listed under Legacy models with a tentative retirement floor of 2026-09-29 under the 60-day-notice policy.",
    evidence: [
      {
        label: "Claude Sonnet 5 announcement",
        url: "https://www.anthropic.com/news/claude-sonnet-5",
        sourceId: "anthropic",
        retrievedAt: "2026-08-05",
      },
      {
        label: "Anthropic model deprecations documentation",
        url: "https://platform.claude.com/docs/en/docs/about-claude/model-deprecations",
        sourceId: "anthropic",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "gpt-5-6-ga-and-5-1-shutdowns",
    date: "2026-07-09",
    modelSlugs: ["gpt-5-1"],
    kind: "version",
    severity: "warning",
    title:
      "GPT-5.6 family GA; GPT-5.1 variant shutdowns scheduled and executed",
    summary:
      "GPT-5.6 (Sol/Terra/Luna) reached general availability as OpenAI's flagship line. Per the deprecations page: gpt-5.1-codex and codex-max shut down 2026-07-23, gpt-5.1-chat-latest shuts down 2026-08-10, and GPT-5 base snapshots retire 2026-12-11. The dated gpt-5.1-2025-11-13 snapshot remains live, for now.",
    evidence: [
      {
        label: "OpenAI API deprecations page",
        url: "https://developers.openai.com/api/docs/deprecations",
        sourceId: "openai",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "nyt-openai-sanctions-motion",
    date: "2026-07-09",
    modelSlugs: ["gpt-5-1"],
    kind: "policy",
    severity: "notice",
    title:
      "NYT v. OpenAI: sanctions motion over log handling; retention promises remain litigation-entangled",
    summary:
      "After the blanket preservation order was narrowed in Sept 2025 and a court affirmed production of 20M de-identified chat logs in Jan 2026, NYT and Daily News filed a sanctions motion alleging OpenAI deleted logs subject to preservation. API zero-data-retention customers remain excluded, but buyers relying on OpenAI's retention story should track the case.",
    evidence: [
      {
        label: "Preservation order narrowed (Sept 2025)",
        url: "https://www.engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html",
        sourceId: "tech-press",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "mri-methodology-v0-2",
    date: "2026-08-04",
    modelSlugs: ["llama-4-maverick", "qwen3-235b", "kimi-k2"],
    kind: "methodology",
    severity: "notice",
    title: "Methodology v0.2: computed tiers and first-class N/A grades",
    summary:
      "Tiers are now derived from a per-requirement checklist rather than assigned, and not-applicable / under-review became first-class grade states excluded from the composite score. Deployer-property vectors on open-weight models (data handling, compliance) moved from graded to not-applicable, changing the composite scores of the tagged models.",
    evidence: [
      {
        label: "Methodology page (v0.2 changelog)",
        url: "https://modelriskindex.com/methodology",
        sourceId: "modelriskindex",
        retrievedAt: "2026-08-04",
      },
    ],
  },
  {
    id: "mri-methodology-v0-1",
    date: "2026-08-04",
    modelSlugs: [],
    kind: "methodology",
    severity: "info",
    title: "ModelRiskIndex methodology v0.1 published",
    summary:
      "Initial publication of the six-vector scoring framework, tier definitions, and evidence requirements. All initial grades are Phase 1 aggregation: sourced from public data, not first-party probes.",
    evidence: [
      {
        label: "Methodology page",
        url: "https://modelriskindex.com/methodology",
        sourceId: "modelriskindex",
        retrievedAt: "2026-08-04",
      },
    ],
  },
  {
    id: "gpt-5-1-router-tuning-2026-07",
    date: "2026-07-16",
    modelSlugs: ["gpt-5-1"],
    kind: "version",
    severity: "notice",
    title:
      "Developer reports of behavior shift on gpt-5.1 alias without changelog entry",
    summary:
      "Multiple developer reports of changed refusal behavior on the floating gpt-5.1 alias while dated snapshots remained stable. No corresponding entry on the deprecations/changelog pages. Illustrates the alias-vs-snapshot distinction this index tracks.",
    evidence: [
      {
        label: "OpenAI developer community thread",
        url: "https://community.openai.com/",
        sourceId: "openai-community",
        retrievedAt: "2026-07-16",
        note: "Curated manually; endpoint fingerprinting (Phase 2) will verify future occurrences.",
      },
    ],
  },
  {
    id: "eu-ai-act-gpai-first-anniversary",
    date: "2026-08-02",
    modelSlugs: [],
    kind: "regulation",
    severity: "notice",
    title: "EU AI Act GPAI obligations: one year in force",
    summary:
      "GPAI transparency and copyright obligations have applied since August 2025; high-risk system obligations continue phasing in. Deployer documentation duties are the driver for most enterprise buyers tracked here.",
    evidence: [
      {
        label: "EU AI Act implementation timeline",
        url: "https://artificialintelligenceact.eu/implementation-timeline/",
        sourceId: "eu-ai-act-tracker",
        retrievedAt: "2026-08-02",
      },
    ],
  },
  {
    id: "anthropic-consumer-training-default",
    date: "2025-09-28",
    modelSlugs: ["claude-opus-4-5", "claude-sonnet-4-5"],
    kind: "policy",
    severity: "warning",
    title:
      "Anthropic consumer terms: training default switched to opt-in-by-default",
    summary:
      "Consumer claude.ai accounts were transitioned to a training-permitted default with a five-year retention window (opt-out available). API and enterprise tiers unchanged. Widens the enterprise/consumer gap tracked under the data-handling vector.",
    evidence: [
      {
        label: "Anthropic consumer terms update",
        url: "https://www.anthropic.com/news/updates-to-our-consumer-terms",
        sourceId: "anthropic",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "grok-4-1-model-card",
    date: "2025-11-17",
    modelSlugs: ["grok-4-1"],
    kind: "model-card",
    severity: "info",
    title: "xAI publishes its first model card with Grok 4.1",
    summary:
      "First formal model card from xAI, alongside a risk-management framework. Moves Grok from Tier 0 to Tier 1 under this index's definitions.",
    evidence: [
      {
        label: "Grok 4.1 model card",
        url: "https://data.x.ai/2025-11-17-grok-4-1-model-card.pdf",
        sourceId: "xai",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "opus-4-5-system-card",
    date: "2025-11-24",
    modelSlugs: ["claude-opus-4-5"],
    kind: "model-card",
    severity: "info",
    title:
      "Claude Opus 4.5 released with system card and external pre-deployment testing",
    summary:
      "Release accompanied by a detailed system card including third-party evaluation results — the disclosure pattern Tier 2 requires.",
    evidence: [
      {
        label: "Claude Opus 4.5 announcement",
        url: "https://www.anthropic.com/news/claude-opus-4-5",
        sourceId: "anthropic",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "gemini-3-launch",
    date: "2025-11-18",
    modelSlugs: ["gemini-3-pro"],
    kind: "version",
    severity: "info",
    title: "Gemini 3 Pro launched with model card",
    summary:
      "Flagship release with published model card and Frontier Safety Framework coverage.",
    evidence: [
      {
        label: "Gemini 3 Pro model card",
        url: "https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf",
        sourceId: "google",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "deepseek-v3-2-release",
    date: "2025-09-29",
    modelSlugs: ["deepseek-v3-2"],
    kind: "version",
    severity: "notice",
    title: "DeepSeek V3.2 released; hosted alias updated in place",
    summary:
      "Open weights published with a technical report. The hosted deepseek-chat alias was cut over to the new version in place — users of the first-party API changed models without an account-level action.",
    evidence: [
      {
        label: "DeepSeek V3.2 weights and technical report",
        url: "https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp",
        sourceId: "deepseek",
        retrievedAt: "2026-08-03",
      },
    ],
  },
];
