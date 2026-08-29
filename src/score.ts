import Anthropic from "@anthropic-ai/sdk";
import { fitAssessmentSchema, type FitAssessment } from "./fitSchema.js";
import { candidateProfile } from "./candidateProfile.js";
import { findRelevantBullets, type RetrievedBullet } from "./retrieve.js";
import type { PostingAnalysis } from "./schema.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface FitResult {
  assessment: FitAssessment;
  matchedBullets: RetrievedBullet[];
}

export async function scorePostingFit(posting: PostingAnalysis): Promise<FitResult> {
  // Technical-stack fit and domain fit are different kinds of matching - a
  // single query built only from required/preferred skills never comes
  // close to a bullet like "PTCB-certified pharmacy technician" in vector
  // space, no matter how relevant that bullet actually is to a healthcare
  // posting. Retrieve for each concern separately, then merge.
  const stackQuery = [posting.role_title, ...posting.required_skills, ...posting.preferred_skills].join(
    ", ",
  );
  const queries = [findRelevantBullets(stackQuery, 6)];

  if (posting.healthcare_domain !== "none") {
    queries.push(
      findRelevantBullets("healthcare, pharmacy, regulatory compliance, PBM industry background", 3),
    );
  }

  const results = await Promise.all(queries);
  const seen = new Set<string>();
  const matchedBullets = results.flat().filter((b) => {
    if (seen.has(b.text)) return false;
    seen.add(b.text);
    return true;
  });

  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1500,
    tools: [
      {
        name: "record_fit_assessment",
        description: "Records a structured fit assessment for a job posting against the candidate's real background.",
        input_schema: fitAssessmentSchema,
      },
    ],
    tool_choice: { type: "tool", name: "record_fit_assessment" },
    messages: [
      {
        role: "user",
        content: `Assess this candidate's fit for this job posting.

CANDIDATE PROFILE (ground truth - do not contradict this):
${candidateProfile}

CANDIDATE'S MOST RELEVANT EXPERIENCE BULLETS (retrieved for this posting specifically):
${matchedBullets.map((b) => `- (${b.source}) ${b.text}`).join("\n")}

EXTRACTED POSTING ANALYSIS:
${JSON.stringify(posting, null, 2)}

Be conservative about what counts as a structural_blocker versus a severe_flag - only an
unobtainable requirement (like an active security clearance with no path to get one
independently) belongs in structural_blockers. A severe stack or tenure mismatch is a
severe_flag, not a structural_blocker, even if it looks disqualifying on its own - the
candidate has historically applied through single severe flags when another factor
(usually genuine domain relevance) offset them.`,
      },
    ],
  });

  const toolUseBlock = response.content.find((block) => block.type === "tool_use");

  if (!toolUseBlock || toolUseBlock.type !== "tool_use") {
    throw new Error("Expected a tool_use block back, got something else.");
  }

  return {
    assessment: toolUseBlock.input as FitAssessment,
    matchedBullets,
  };
}
