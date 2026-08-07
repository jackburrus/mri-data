/**
 * Named assessment vocabulary (L2Beat RISK_VIEW pattern, started small).
 * When the same judgment applies to multiple models, it lives here once:
 * changing a policy position is a one-line edit applied everywhere, and two
 * models sharing a judgment provably share the same words.
 */

export const SHARED_NOTES = {
  openWeightNoCertPathway:
    "No certification pathway currently exists for open weights — an open methodology question, not a gap unique to this provider.",
  weightsRemainAvailable: "Weights remain available once released.",
  immutableWeightsVersioning:
    "Immutable published checkpoints are the strongest possible versioning discipline.",
} as const;
