import { pool, toVectorLiteral } from "./db.js";
import { embedTexts } from "./embed.js";

export interface RetrievedBullet {
  source: string;
  category: string;
  text: string;
  distance: number;
}

export async function findRelevantBullets(
  query: string,
  limit = 5,
): Promise<RetrievedBullet[]> {
  const [queryEmbedding] = await embedTexts([query]);

  const result = await pool.query(
    `SELECT source, category, text, embedding <-> $1::vector AS distance
     FROM bullets
     ORDER BY embedding <-> $1::vector
     LIMIT $2`,
    [toVectorLiteral(queryEmbedding), limit],
  );

  return result.rows;
}
