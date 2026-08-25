import "dotenv/config";
import { pool, initSchema, toVectorLiteral } from "./db.js";
import { embedTexts } from "./embed.js";
import { bulletBank } from "./bullets.js";

async function seed() {
  await initSchema();
  await pool.query("DELETE FROM bullets"); // reseeding is idempotent, not additive

  const embeddings = await embedTexts(bulletBank.map((b) => b.text));

  for (let i = 0; i < bulletBank.length; i++) {
    const bullet = bulletBank[i];
    await pool.query(
      "INSERT INTO bullets (source, category, text, embedding) VALUES ($1, $2, $3, $4::vector)",
      [bullet.source, bullet.category, bullet.text, toVectorLiteral(embeddings[i])],
    );
  }

  console.log(`Seeded ${bulletBank.length} bullets.`);
  await pool.end();
}

seed();
