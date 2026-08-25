// JSON Schema sent to the model as a tool's input_schema - this is what forces
// its response into a shape our code can trust instead of free-form prose.
export const postingAnalysisSchema = {
  type: "object",
  properties: {
    company: { type: "string" },
    role_title: { type: "string" },
    seniority_level: { type: ["string", "null"] },
    years_experience_required: { type: ["number", "null"] },
    years_experience_conditional_note: {
      type: ["string", "null"],
      description:
        "Hidden tenure traps, e.g. '5+ years with a degree, 8+ without' - the literal conditional clause if one exists.",
    },
    remote_status: {
      type: "string",
      enum: ["remote", "hybrid", "onsite", "unclear"],
    },
    location_restriction: {
      type: ["string", "null"],
      description: "e.g. 'India only', 'California residency required'",
    },
    citizenship_required: { type: "boolean" },
    clearance_level: {
      type: "string",
      enum: ["none", "willing_to_pursue", "public_trust", "active_required"],
    },
    backend_languages_required: {
      type: "array",
      items: { type: "string" },
    },
    backend_language_severity: {
      type: "string",
      enum: ["none_stated", "one_of_several", "majority_primary"],
      description:
        "majority_primary = the posting states this language as the bulk/entirety of the backend work, not just one option among several.",
    },
    ai_tooling_mention: {
      type: "string",
      enum: ["none", "preferred", "required"],
    },
    healthcare_domain: {
      type: "string",
      enum: ["none", "generic_healthcare", "pharmacy_pbm_specific"],
    },
    degree_requirement: {
      type: "string",
      enum: ["none_stated", "preferred", "required_no_carveout"],
    },
    required_skills: { type: "array", items: { type: "string" } },
    preferred_skills: { type: "array", items: { type: "string" } },
    comp_range: { type: ["string", "null"] },
  },
  required: [
    "company",
    "role_title",
    "seniority_level",
    "years_experience_required",
    "years_experience_conditional_note",
    "remote_status",
    "location_restriction",
    "citizenship_required",
    "clearance_level",
    "backend_languages_required",
    "backend_language_severity",
    "ai_tooling_mention",
    "healthcare_domain",
    "degree_requirement",
    "required_skills",
    "preferred_skills",
    "comp_range",
  ],
};

export interface PostingAnalysis {
  company: string;
  role_title: string;
  seniority_level: string | null;
  years_experience_required: number | null;
  years_experience_conditional_note: string | null;
  remote_status: "remote" | "hybrid" | "onsite" | "unclear";
  location_restriction: string | null;
  citizenship_required: boolean;
  clearance_level: "none" | "willing_to_pursue" | "public_trust" | "active_required";
  backend_languages_required: string[];
  backend_language_severity: "none_stated" | "one_of_several" | "majority_primary";
  ai_tooling_mention: "none" | "preferred" | "required";
  healthcare_domain: "none" | "generic_healthcare" | "pharmacy_pbm_specific";
  degree_requirement: "none_stated" | "preferred" | "required_no_carveout";
  required_skills: string[];
  preferred_skills: string[];
  comp_range: string | null;
}
