import Anthropic from "@anthropic-ai/sdk";
import { postingAnalysisSchema, type PostingAnalysis } from "./schema.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function analyzePosting(postingText: string): Promise<PostingAnalysis> {
  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    tools: [
      {
        name: "record_posting_analysis",
        description:
          "Records structured analysis of a job posting's requirements and potential red flags.",
        input_schema: postingAnalysisSchema,
      },
    ],
    // Forcing tool_choice (instead of leaving it to the model's judgment)
    // is what turns this from "the model might call a tool" into "the
    // model must respond in exactly this shape."
    tool_choice: { type: "tool", name: "record_posting_analysis" },
    messages: [
      {
        role: "user",
        content: `Analyze this job posting and record your findings:\n\n${postingText}`,
      },
    ],
  });

  const toolUseBlock = response.content.find((block) => block.type === "tool_use");

  if (!toolUseBlock || toolUseBlock.type !== "tool_use") {
    throw new Error("Expected a tool_use block back, got something else.");
  }

  return toolUseBlock.input as PostingAnalysis;
}
