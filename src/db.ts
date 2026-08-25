import pg from "pg";

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initSchema() {
  await pool.query("CREATE EXTENSION IF NOT EXISTS vector");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bullets (
      id SERIAL PRIMARY KEY,
      source TEXT NOT NULL,
      category TEXT NOT NULL,
      text TEXT NOT NULL,
      embedding VECTOR(1024) NOT NULL
    )
  `);
}

// pgvector expects its literal format, e.g. "[0.01,-0.02,0.03]" - not a JS
// array - so every insert/query that touches the embedding column goes
// through this instead of passing the number[] straight to `pg`.
export function toVectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}
