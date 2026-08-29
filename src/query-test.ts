import "dotenv/config";
import { findRelevantBullets } from "./retrieve.js";
import { pool } from "./db.js";

const query = process.argv[2] ?? "Docker containerization, CI/CD pipelines, self-hosted deployment infrastructure";

const results = await findRelevantBullets(query, 5);
console.log(`Query: "${query}"\n`);
for (const r of results) {
  console.log(`[${r.distance.toFixed(4)}] (${r.source} - ${r.category})`);
  console.log(`  ${r.text}\n`);
}
await pool.end();
