// No official Voyage SDK is needed here - it's a plain REST endpoint, so a
// direct fetch call is all that's required (a good reminder that not every
// API integration needs a package; sometimes it's just HTTP + JSON).
const VOYAGE_URL = "https://api.voyageai.com/v1/embeddings";

interface VoyageResponse {
  data: { embedding: number[] }[];
}

const MAX_RETRIES = 6;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(VOYAGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({ input: texts, model: "voyage-code-4" }),
    });

    if (response.ok) {
      const data = (await response.json()) as VoyageResponse;
      return data.data.map((d) => d.embedding);
    }

    // 429 = rate limited, not a real failure - the free tier without a
    // payment method on file caps this at 3 requests/minute, so back off
    // and retry rather than aborting the whole batch over a temporary limit.
    if (response.status === 429 && attempt < MAX_RETRIES) {
      const delayMs = Math.min(2 ** attempt * 1000, 30000);
      console.log(`  (Voyage rate limited, retrying in ${delayMs / 1000}s...)`);
      await sleep(delayMs);
      continue;
    }

    throw new Error(`Voyage API error ${response.status}: ${await response.text()}`);
  }
}
