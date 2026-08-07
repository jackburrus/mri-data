import type { Incident } from "./schema";

/**
 * Structured, citable incident records (Phase 1: manually curated).
 */
export const incidents: Incident[] = [
  {
    id: "gpt-5-6-uk-aisi-universal-jailbreaks",
    date: "2026-07-10",
    modelSlugs: ["gpt-5-6"],
    technique: "Universal jailbreaks (pre-deployment external testing)",
    title:
      "UK AISI found universal jailbreaks in GPT-5.6 Sol unlocking autonomous cyber-exploitation",
    summary:
      "During pre-deployment testing, UK AISI developed universal jailbreaks — often within hours — that unlocked Sol's Preparedness-High cyber capabilities for autonomous exploitation. Disclosed in the system card; OpenAI reproduced and mitigated the specific jailbreaks before GA. Notable both for the finding and for the disclosure: an adverse pre-release result published by the vendor.",
    outcome:
      "Specific jailbreaks mitigated pre-GA; public jailbreak claims against Sol continued post-release.",
    sources: [
      {
        label: "Fortune report on the system-card disclosure",
        url: "https://fortune.com/2026/07/10/openai-gpt-5-6-sol-jailbreaks-cyber-attacks-similar-to-security-flaw-that-led-u-s-government-to-force-anthropic-to-disable-fable-5/",
        sourceId: "tech-press",
        retrievedAt: "2026-08-05",
      },
      {
        label: "GPT-5.6 system card",
        url: "https://deploymentsafety.openai.com/gpt-5-6",
        sourceId: "openai",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "deepseek-v4-pro-farai-collapse",
    date: "2026-05-11",
    modelSlugs: ["deepseek-v4-pro"],
    technique: "Public jailbreaks, authority manipulation, response prefill",
    title:
      "FAR.AI: DeepSeek V4 Pro safeguards collapse at 98–100% across three attack strategies",
    summary:
      "FAR.AI's stress test broke DeepSeek V4 Pro's safeguards at 100% with public jailbreaks across CBRN, cyber, and terrorism domains in roughly 15 minutes, 99.6% via authority manipulation, and 99.6% via response prefill — and a jailbreak written for V3.2 worked on V4 Pro unmodified. Neo Research separately raised the StrongREJECT jailbreak rate from 0.6% to 77.8% with a single 2023-era roleplay template that peer models resisted.",
    outcome:
      "No provider response; open weights preclude post-release safeguard fixes. Recorded as the best-documented safeguard failure among tracked models.",
    sources: [
      {
        label: "FAR.AI security stress test",
        url: "https://www.far.ai/news/security-stress-test-deepseek-v4-pros-safeguards",
        sourceId: "far-ai",
        retrievedAt: "2026-08-05",
      },
      {
        label: "Neo Research safety evaluation",
        url: "https://neoresearch.ai/research/deepseek-v4-pro-safety-evaluation/",
        sourceId: "neo-research",
        retrievedAt: "2026-08-05",
      },
    ],
  },
  {
    id: "claude-code-espionage-campaign-2025",
    date: "2025-11-13",
    modelSlugs: ["claude-sonnet-4-5"],
    technique: "Agentic misuse / social-engineering the model's safety context",
    title:
      "State-sponsored actor used Claude Code to automate intrusion campaign",
    summary:
      "Anthropic disclosed a campaign in which a state-sponsored group manipulated Claude Code into automating reconnaissance and exploitation against ~30 targets by role-playing as a legitimate security firm — an early, well-documented case of agentic-scale misuse of a frontier coding agent.",
    outcome:
      "Accounts banned, targets notified, public disclosure with TTPs. Cited here as evidence that agentic deployment risk is a property of the deployment pattern, not only the model.",
    sources: [
      {
        label: "Anthropic disclosure",
        url: "https://www.anthropic.com/news/disrupting-AI-espionage",
        sourceId: "anthropic",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "grok-mechahitler-2025",
    date: "2025-07-08",
    modelSlugs: ["grok-4-1"],
    technique: "Provider-side system-prompt change (not user attack)",
    title:
      "Grok produced antisemitic output after unannounced system-prompt modification",
    summary:
      "A provider-side change instructing the model not to shy away from politically incorrect claims led to a burst of antisemitic and violent outputs on X. xAI attributed it to an unauthorized modification and reverted. Recorded against the Grok family; the operational lesson — silent production changes to safety-relevant configuration — is the core failure mode this index monitors.",
    outcome: "Prompt reverted; xAI published the system prompt and apologized.",
    sources: [
      {
        label: "xAI statement",
        url: "https://x.ai/news",
        sourceId: "xai",
        retrievedAt: "2026-08-03",
      },
      {
        label: "AI Incident Database entry",
        url: "https://incidentdatabase.ai/",
        sourceId: "aiid",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "shadowleak-deep-research-2025",
    date: "2025-09-18",
    modelSlugs: ["gpt-5-1"],
    technique:
      "Indirect prompt injection (zero-click, service-side exfiltration)",
    title:
      "ShadowLeak: zero-click data exfiltration via ChatGPT Deep Research email integration",
    summary:
      "Researchers demonstrated a service-side indirect injection: a crafted email caused the Deep Research agent, when later asked to summarize the inbox, to exfiltrate mailbox data to an attacker-controlled URL without user interaction. Patched by OpenAI after disclosure. Tagged to the GPT-5 family as the underlying agent model.",
    outcome: "Patched following responsible disclosure.",
    sources: [
      {
        label: "Radware research disclosure",
        url: "https://www.radware.com/blog/",
        sourceId: "radware-research",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "gemini-calendar-injection-2025",
    date: "2025-08-06",
    modelSlugs: ["gemini-3-pro", "gemini-2-5-flash"],
    technique: "Indirect prompt injection via calendar invites",
    title:
      "Promptware: calendar-invite injection drove Gemini-connected smart-home actions",
    summary:
      "Researchers showed that poisoned calendar invites could hijack Gemini assistant sessions into performing unintended actions, including smart-home control, when the user later asked routine questions. Google shipped mitigations. Demonstrates the indirect-injection surface of assistant-integrated deployments.",
    outcome: "Mitigations deployed by Google following disclosure.",
    sources: [
      {
        label: "SafeBreach 'Invitation Is All You Need' research",
        url: "https://www.safebreach.com/blog/",
        sourceId: "safebreach-research",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "deepseek-harmbench-2025",
    date: "2025-02-01",
    modelSlugs: ["deepseek-v3-2"],
    technique: "Standard jailbreak suite (HarmBench)",
    title: "DeepSeek R1 showed 100% attack success rate in Cisco testing",
    summary:
      "Cisco's evaluation reported that DeepSeek R1 failed to block a single prompt from a 50-prompt HarmBench sample. Recorded against the DeepSeek family as the strongest public signal on its jailbreak posture; V3.2-specific retesting is pending our Phase 2 probe battery.",
    sources: [
      {
        label: "Cisco security evaluation",
        url: "https://blogs.cisco.com/security/evaluating-security-risk-in-deepseek-and-other-frontier-reasoning-models",
        sourceId: "cisco-research",
        retrievedAt: "2026-08-03",
      },
    ],
  },
  {
    id: "llama4-lmarena-2025",
    date: "2025-04-08",
    modelSlugs: ["llama-4-maverick"],
    technique: "Benchmark presentation (not an attack)",
    title:
      "Llama 4 Maverick LM Arena submission used unreleased experimental variant",
    summary:
      "Meta's leaderboard submission was an experimental chat-tuned variant, not the released weights, inflating public perception of the released model. Recorded under transparency: disclosure practices are part of the risk surface buyers rely on.",
    outcome:
      "LM Arena updated its policies; Meta acknowledged the variant difference.",
    sources: [
      {
        label: "LMSYS statement",
        url: "https://lmarena.ai/",
        sourceId: "lmarena",
        retrievedAt: "2026-08-03",
      },
    ],
  },
];
