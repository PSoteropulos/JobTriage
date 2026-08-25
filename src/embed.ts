// No official Voyage SDK is needed here - it's a plain REST endpoint, so a
// direct fetch call is all that's required (a good reminder that not every
// API integration needs a package; sometimes it's just HTTP + JSON).
const VOYAGE_URL = "https://api.voyageai.com/v1/embeddings";

interface VoyageResponse {
  data: { embedding: number[] }[];
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const response = await fetch(VOYAGE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({ input: texts, model: "voyage-3" }),
  });

  if (!response.ok) {
    throw new Error(`Voyage API error ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as VoyageResponse;
  return data.data.map((d) => d.embedding);
}
