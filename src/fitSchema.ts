// Deliberately NOT a single opaque percentage - see the schema fields below.
// Paul's own historical judgment (e.g. applying to Empower Pharmacy despite a
// severe backend-language mismatch, because the pharmacy-domain match
// outweighed it) shows a flat weighted average would hide exactly the
// nuance that makes his manual judgment valuable. This keeps the parts
// visible: near-absolute blockers are separated from strong-but-negotiable
// flags, which are separated from things counting in favor.
export const fitAssessmentSchema = {
  type: "object",
  properties: {
    structural_blockers: {
      type: "array",
      items: { type: "string" },
      description:
        "Near-absolute disqualifiers the candidate cannot overcome regardless of other factors - e.g. an active security clearance requirement with no existing sponsorship, or a citizenship/location restriction the candidate doesn't meet. Empty array if none.",
    },
    severe_flags: {
      type: "array",
      items: { type: "string" },
      description:
        "Strong negative signals that historically are sometimes outweighed by other factors (e.g. a severe backend-language mismatch offset by a genuine domain match) - real gaps, but not automatic disqualifiers. Empty array if none.",
    },
    positive_signals: {
      type: "array",
      items: { type: "string" },
      description: "Concrete things counting in favor of this posting. Empty array if none.",
    },
    tenure_gap_severity: {
      type: "string",
      enum: ["none", "mild", "moderate", "severe"],
    },
    stack_overlap_score: {
      type: "number",
      description: "0-10, how much of the posting's required/preferred stack the candidate's real experience covers.",
    },
    composite_score: {
      type: "number",
      description:
        "0-100 directional summary score, for sorting/scanning many postings quickly. Not a substitute for reading the fields above.",
    },
    recommendation: {
      type: "string",
      enum: ["strong_apply", "apply", "consider", "long_shot", "pass"],
    },
    summary: {
      type: "string",
      description: "1-3 sentence plain-language summary of the assessment.",
    },
  },
  required: [
    "structural_blockers",
    "severe_flags",
    "positive_signals",
    "tenure_gap_severity",
    "stack_overlap_score",
    "composite_score",
    "recommendation",
    "summary",
  ],
} as const;

export interface FitAssessment {
  structural_blockers: string[];
  severe_flags: string[];
  positive_signals: string[];
  tenure_gap_severity: "none" | "mild" | "moderate" | "severe";
  stack_overlap_score: number;
  composite_score: number;
  recommendation: "strong_apply" | "apply" | "consider" | "long_shot" | "pass";
  summary: string;
}
