/**
 * Source catalog: every citation in the registry references one of these
 * entries by id. The catalog is where source-level facts live once —
 * publisher, trust tier, licensing posture, refresh cadence — instead of
 * being repeated on every evidence reference.
 *
 * Trust tiers follow the technical design's source hierarchy:
 *   A first-party probes · B primary provider artifacts · C independent
 *   evaluations · D institutional assessments · E usage/market data ·
 *   F incident streams and reporting.
 * Tier ordering encodes trust for conflict resolution; company-level (D)
 * sources never set model-level grades.
 */

export type SourceKind =
  | "provider"
  | "independent-eval"
  | "institutional"
  | "usage"
  | "incident"
  | "news"
  | "self";

export type SourceTier = "A" | "B" | "C" | "D" | "E" | "F";

export interface SourceDef {
  name: string;
  publisher: string;
  kind: SourceKind;
  tier: SourceTier;
  homepage: string;
  /** Citations with this sourceId must match one of these prefixes (CI-enforced). */
  urlPrefixes: string[];
  /** Reuse/licensing posture, per the PRD's licensing diligence item. */
  license: string;
  /** Expected refresh cadence for staleness policy. */
  refresh: string;
}

export const SOURCES = {
  openai: {
    name: "OpenAI provider artifacts",
    publisher: "OpenAI",
    kind: "provider",
    tier: "B",
    homepage: "https://openai.com",
    urlPrefixes: [
      "https://openai.com",
      "https://platform.openai.com",
      "https://developers.openai.com",
      "https://deploymentsafety.openai.com",
      "https://help.openai.com",
      "https://cdn.openai.com",
      "https://trust.openai.com",
    ],
    license:
      "Public provider documentation; cite and link, snapshot privately.",
    refresh: "daily diff watch (Phase 2)",
  },
  "openai-community": {
    name: "OpenAI developer community",
    publisher: "OpenAI forum users",
    kind: "news",
    tier: "F",
    homepage: "https://community.openai.com",
    urlPrefixes: ["https://community.openai.com"],
    license: "Public forum; cite and link only.",
    refresh: "continuous collection, human triage",
  },
  anthropic: {
    name: "Anthropic provider artifacts",
    publisher: "Anthropic",
    kind: "provider",
    tier: "B",
    homepage: "https://www.anthropic.com",
    urlPrefixes: [
      "https://www.anthropic.com",
      "https://trust.anthropic.com",
      "https://privacy.anthropic.com",
      "https://docs.anthropic.com",
      "https://assets.anthropic.com",
      "https://www-cdn.anthropic.com",
      "https://platform.claude.com",
      "https://privacy.claude.com",
      "https://claude.com",
    ],
    license:
      "Public provider documentation; cite and link, snapshot privately.",
    refresh: "daily diff watch (Phase 2)",
  },
  google: {
    name: "Google / DeepMind provider artifacts",
    publisher: "Google",
    kind: "provider",
    tier: "B",
    homepage: "https://deepmind.google",
    urlPrefixes: [
      "https://deepmind.google",
      "https://ai.google.dev",
      "https://cloud.google.com",
      "https://docs.cloud.google.com",
      "https://storage.googleapis.com",
      "https://support.google.com/gemini",
      "https://security.googleblog.com",
    ],
    license:
      "Public provider documentation; cite and link, snapshot privately.",
    refresh: "daily diff watch (Phase 2)",
  },
  meta: {
    name: "Meta / Llama provider artifacts",
    publisher: "Meta",
    kind: "provider",
    tier: "B",
    homepage: "https://www.llama.com",
    urlPrefixes: [
      "https://www.llama.com",
      "https://ai.meta.com",
      "https://github.com/meta-llama",
    ],
    license:
      "Public provider documentation; cite and link, snapshot privately.",
    refresh: "on release; checked weekly",
  },
  mistral: {
    name: "Mistral AI provider artifacts",
    publisher: "Mistral AI",
    kind: "provider",
    tier: "B",
    homepage: "https://mistral.ai",
    urlPrefixes: ["https://mistral.ai", "https://docs.mistral.ai"],
    license:
      "Public provider documentation; cite and link, snapshot privately.",
    refresh: "daily diff watch (Phase 2)",
  },
  deepseek: {
    name: "DeepSeek provider artifacts",
    publisher: "DeepSeek",
    kind: "provider",
    tier: "B",
    homepage: "https://www.deepseek.com",
    urlPrefixes: [
      "https://cdn.deepseek.com",
      "https://platform.deepseek.com",
      "https://api-docs.deepseek.com",
      "https://huggingface.co/deepseek-ai",
    ],
    license: "Public provider documentation and open-weight releases.",
    refresh: "on release; checked weekly",
  },
  xai: {
    name: "xAI provider artifacts",
    publisher: "xAI",
    kind: "provider",
    tier: "B",
    homepage: "https://x.ai",
    urlPrefixes: ["https://x.ai", "https://data.x.ai", "https://docs.x.ai"],
    license:
      "Public provider documentation; cite and link, snapshot privately.",
    refresh: "daily diff watch (Phase 2)",
  },
  qwen: {
    name: "Alibaba Qwen provider artifacts",
    publisher: "Alibaba",
    kind: "provider",
    tier: "B",
    homepage: "https://qwenlm.github.io",
    urlPrefixes: ["https://huggingface.co/Qwen", "https://qwenlm.github.io"],
    license:
      "Public provider documentation and open-weight releases (Apache 2.0 weights).",
    refresh: "on release; checked weekly",
  },
  moonshot: {
    name: "Moonshot AI provider artifacts",
    publisher: "Moonshot AI",
    kind: "provider",
    tier: "B",
    homepage: "https://moonshotai.github.io",
    urlPrefixes: [
      "https://huggingface.co/moonshotai",
      "https://moonshotai.github.io",
      "https://github.com/MoonshotAI",
      "https://platform.kimi.ai",
    ],
    license: "Public provider documentation and open-weight releases.",
    refresh: "on release; checked weekly",
  },
  aws: {
    name: "AWS / Amazon Nova provider artifacts",
    publisher: "Amazon",
    kind: "provider",
    tier: "B",
    homepage: "https://aws.amazon.com",
    urlPrefixes: ["https://aws.amazon.com", "https://docs.aws.amazon.com"],
    license:
      "Public provider documentation; cite and link, snapshot privately.",
    refresh: "daily diff watch (Phase 2)",
  },
  "f5-casi": {
    name: "F5 Labs CASI/ARS leaderboard",
    publisher: "F5 (formerly CalypsoAI)",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://www.f5.com/labs",
    urlPrefixes: ["https://www.f5.com"],
    license:
      "Vendor-published leaderboard. Cite and link; request reuse permission before republishing values (open diligence item).",
    refresh: "on release; checked weekly",
  },
  "gray-swan": {
    name: "Gray Swan agent red-teaming arena",
    publisher: "Gray Swan AI (with UK AISI)",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://www.grayswan.ai",
    urlPrefixes: ["https://www.grayswan.ai"],
    license:
      "Partially public results. Cite and link; request reuse permission before republishing values (open diligence item).",
    refresh: "on release; checked weekly",
  },
  "scale-seal": {
    name: "Scale SEAL adversarial robustness leaderboard",
    publisher: "Scale AI",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://scale.com/leaderboard",
    urlPrefixes: ["https://scale.com"],
    license:
      "Public leaderboard. Cite and link; request reuse permission before republishing values (open diligence item).",
    refresh: "on release; checked weekly",
  },
  "helm-safety": {
    name: "HELM Safety",
    publisher: "Stanford CRFM",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://crfm.stanford.edu/helm/safety/latest/",
    urlPrefixes: ["https://crfm.stanford.edu"],
    license: "Academic benchmark, permissive reuse with attribution.",
    refresh: "on release",
  },
  ailuminate: {
    name: "MLCommons AILuminate",
    publisher: "MLCommons",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://mlcommons.org/ailuminate/",
    urlPrefixes: ["https://mlcommons.org"],
    license: "Published benchmark, attribution required.",
    refresh: "on release",
  },
  "cisco-research": {
    name: "Cisco security research",
    publisher: "Cisco",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://blogs.cisco.com/security",
    urlPrefixes: ["https://blogs.cisco.com"],
    license: "Vendor research publication; cite and link.",
    refresh: "on release",
  },
  academic: {
    name: "Peer-reviewed / preprint research",
    publisher: "Various (arXiv et al.)",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://arxiv.org",
    urlPrefixes: ["https://arxiv.org"],
    license: "Open access; cite with attribution.",
    refresh: "on release",
  },
  lmarena: {
    name: "LMArena leaderboard statements",
    publisher: "LMSYS / LMArena",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://lmarena.ai",
    urlPrefixes: ["https://lmarena.ai"],
    license: "Public leaderboard and statements; cite and link.",
    refresh: "on release",
  },
  "fli-index": {
    name: "FLI AI Safety Index",
    publisher: "Future of Life Institute",
    kind: "institutional",
    tier: "D",
    homepage: "https://safetyindex.ai/",
    urlPrefixes: ["https://safetyindex.ai", "https://futureoflife.org"],
    license:
      "Published report; company-level only — never sets model-level grades.",
    refresh: "biannual",
  },
  "eu-ai-act-tracker": {
    name: "EU AI Act implementation tracker",
    publisher: "Future of Life Institute (artificialintelligenceact.eu)",
    kind: "institutional",
    tier: "D",
    homepage: "https://artificialintelligenceact.eu",
    urlPrefixes: ["https://artificialintelligenceact.eu"],
    license: "Public tracker; cite and link.",
    refresh: "on regulatory milestones",
  },
  openrouter: {
    name: "OpenRouter model rankings",
    publisher: "OpenRouter",
    kind: "usage",
    tier: "E",
    homepage: "https://openrouter.ai/rankings",
    urlPrefixes: ["https://openrouter.ai"],
    license:
      "Public rankings page and API; a proxy for usage, not total market share.",
    refresh: "weekly",
  },
  aiid: {
    name: "AI Incident Database",
    publisher: "Responsible AI Collaborative",
    kind: "incident",
    tier: "F",
    homepage: "https://incidentdatabase.ai",
    urlPrefixes: ["https://incidentdatabase.ai"],
    license: "Permissive license with attribution (per AIID terms).",
    refresh: "continuous collection, human triage",
  },
  zai: {
    name: "Z.ai (Zhipu) provider artifacts",
    publisher: "Z.ai",
    kind: "provider",
    tier: "B",
    homepage: "https://www.z.ai",
    urlPrefixes: [
      "https://www.z.ai",
      "https://docs.z.ai",
      "https://huggingface.co/zai-org",
    ],
    license:
      "Public provider documentation and MIT-licensed open-weight releases.",
    refresh: "on release; checked weekly",
  },
  minimax: {
    name: "MiniMax provider artifacts",
    publisher: "MiniMax",
    kind: "provider",
    tier: "B",
    homepage: "https://www.minimax.io",
    urlPrefixes: [
      "https://www.minimax.io",
      "https://platform.minimax.io",
      "https://huggingface.co/MiniMaxAI",
      "https://github.com/MiniMax-AI",
    ],
    license:
      "Public provider documentation and community-licensed open-weight releases.",
    refresh: "on release; checked weekly",
  },
  xiaomi: {
    name: "Xiaomi MiMo provider artifacts",
    publisher: "Xiaomi",
    kind: "provider",
    tier: "B",
    homepage: "https://mimo.mi.com",
    urlPrefixes: [
      "https://mimo.mi.com",
      "https://mimo.xiaomi.com",
      "https://huggingface.co/XiaomiMiMo",
      "https://trust.mi.com",
      // The MiMo platform privacy policy is served from Xiaomi's central
      // privacy host, not from mimo.mi.com. The path under mimo.mi.com that
      // this registry previously cited renders the marketing homepage.
      "https://privacy.mi.com",
    ],
    license:
      "Public provider documentation and MIT-licensed open-weight releases.",
    refresh: "on release; checked weekly",
  },
  tencent: {
    name: "Tencent Hunyuan provider artifacts",
    publisher: "Tencent",
    kind: "provider",
    tier: "B",
    homepage: "https://huggingface.co/tencent",
    urlPrefixes: [
      "https://huggingface.co/tencent",
      "https://github.com/Tencent-Hunyuan",
      "https://www.tencent.com",
      "https://www.tencentcloud.com",
    ],
    license:
      "Public provider documentation and Apache 2.0 open-weight releases.",
    refresh: "on release; checked weekly",
  },
  nvidia: {
    name: "NVIDIA Nemotron provider artifacts",
    publisher: "NVIDIA",
    kind: "provider",
    tier: "B",
    homepage: "https://build.nvidia.com",
    urlPrefixes: [
      "https://huggingface.co/nvidia",
      "https://huggingface.co/blog/nvidia",
      "https://build.nvidia.com",
      "https://developer.nvidia.com",
      "https://research.nvidia.com",
      "https://docs.api.nvidia.com",
      "https://assets.ngc.nvidia.com",
    ],
    license:
      "Public provider documentation and OpenMDW-licensed open-weight releases.",
    refresh: "on release; checked weekly",
  },
  stepfun: {
    name: "StepFun provider artifacts",
    publisher: "StepFun",
    kind: "provider",
    tier: "B",
    homepage: "https://platform.stepfun.ai",
    urlPrefixes: [
      "https://huggingface.co/stepfun-ai",
      "https://platform.stepfun.ai",
      "https://static.stepfun.com",
      "https://github.com/stepfun-ai",
    ],
    license:
      "Public provider documentation and Apache 2.0 open-weight releases.",
    refresh: "on release; checked weekly",
  },
  "far-ai": {
    name: "FAR.AI security research",
    publisher: "FAR.AI",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://www.far.ai",
    urlPrefixes: ["https://www.far.ai"],
    license: "Research publication; cite and link.",
    refresh: "on release",
  },
  "neo-research": {
    name: "Neo Research safety evaluations",
    publisher: "Neo Research",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://neoresearch.ai",
    urlPrefixes: ["https://neoresearch.ai"],
    license: "Research publication; cite and link.",
    refresh: "on release",
  },
  ubicloud: {
    name: "Ubicloud AI safety studies",
    publisher: "Ubicloud",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://www.ubicloud.com",
    urlPrefixes: ["https://www.ubicloud.com"],
    license: "Research publication; cite and link.",
    refresh: "on release",
  },
  "anthropic-alignment": {
    name: "Anthropic alignment research (cross-model evaluations)",
    publisher: "Anthropic",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://alignment.anthropic.com",
    urlPrefixes: ["https://alignment.anthropic.com"],
    license:
      "Lab research publication covering third-party models; cite and link.",
    refresh: "on release",
  },
  "nist-caisi": {
    name: "NIST CAISI assessments",
    publisher: "US Center for AI Standards and Innovation (NIST)",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://www.nist.gov",
    urlPrefixes: ["https://www.nist.gov"],
    license: "US government publication; public domain.",
    refresh: "on release",
  },
  "security-analysis": {
    name: "Independent security analysis blogs",
    publisher: "Various (Penligent, CometAPI, NeuralTrust)",
    kind: "news",
    tier: "F",
    homepage: "https://www.penligent.ai",
    urlPrefixes: [
      "https://www.penligent.ai",
      "https://www.cometapi.com",
      "https://neuraltrust.ai",
    ],
    license: "Public analysis; cite and link.",
    refresh: "continuous collection, human triage",
  },
  injectprompt: {
    name: "InjectPrompt jailbreak disclosures",
    publisher: "InjectPrompt",
    kind: "news",
    tier: "F",
    homepage: "https://www.injectprompt.com",
    urlPrefixes: ["https://www.injectprompt.com"],
    license: "Public disclosures; cite and link.",
    refresh: "continuous collection, human triage",
  },
  "uk-aisi": {
    name: "UK AI Security Institute publications",
    publisher: "UK AISI",
    kind: "independent-eval",
    tier: "C",
    homepage: "https://www.aisi.gov.uk",
    urlPrefixes: ["https://www.aisi.gov.uk"],
    license: "Government publication; cite and link.",
    refresh: "on release",
  },
  "tech-press": {
    name: "Technology press reporting",
    publisher: "Various (The Decoder, Vellum, Engadget)",
    kind: "news",
    tier: "F",
    homepage: "https://the-decoder.com",
    urlPrefixes: [
      "https://the-decoder.com",
      "https://www.vellum.ai",
      "https://www.engadget.com",
      "https://fortune.com",
      "https://techcrunch.com",
      "https://www.axios.com",
    ],
    license: "Standard copyright; cite and link only.",
    refresh: "continuous collection, human triage",
  },
  "radware-research": {
    name: "Radware security research",
    publisher: "Radware",
    kind: "news",
    tier: "F",
    homepage: "https://www.radware.com/blog/",
    urlPrefixes: ["https://www.radware.com"],
    license: "Vendor disclosure; cite and link.",
    refresh: "on release",
  },
  "safebreach-research": {
    name: "SafeBreach security research",
    publisher: "SafeBreach",
    kind: "news",
    tier: "F",
    homepage: "https://www.safebreach.com/blog/",
    urlPrefixes: ["https://www.safebreach.com"],
    license: "Vendor disclosure; cite and link.",
    refresh: "on release",
  },
  modelriskindex: {
    name: "ModelRiskIndex methodology",
    publisher: "ModelRiskIndex",
    kind: "self",
    tier: "A",
    homepage: "https://modelriskindex.com/methodology",
    urlPrefixes: [
      "https://modelriskindex.com",
      "https://modelriskindex.jupiterlabs.workers.dev",
    ],
    license: "Our own artifact.",
    refresh: "on methodology change",
  },
} as const satisfies Record<string, SourceDef>;

export type SourceId = keyof typeof SOURCES;

export const SOURCE_IDS = Object.keys(SOURCES) as [SourceId, ...SourceId[]];

export const SOURCE_KIND_LABEL: Record<SourceKind, string> = {
  provider: "provider artifact",
  "independent-eval": "independent eval",
  institutional: "institutional",
  usage: "usage data",
  incident: "incident record",
  news: "reporting",
  self: "first-party",
};
