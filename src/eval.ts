import "dotenv/config";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { parseTracker, bucketOutcome } from "./tracker.js";
import { analyzePosting } from "./extract.js";
import { scorePostingFit } from "./score.js";
import { pool } from "./db.js";

const APPLICATIONS_DIR = "C:\\Dev\\psoteropulos\\Resume\\applications";

interface EvalRow {
  company: string;
  role: string;
  status: string;
  outcome: string;
  composite_score: number;
  recommendation: string;
  structural_blockers: string[];
}

async function main() {
  const limitArg = process.argv[2] ? parseInt(process.argv[2], 10) : undefined;
  const entries = parseTracker().filter((e) => e.folder);
  const toRun = limitArg ? entries.slice(0, limitArg) : entries;

  const rows: EvalRow[] = [];

  for (const entry of toRun) {
    const postingPath = `${APPLICATIONS_DIR}\\${entry.folder}\\job_posting.md`;
    if (!existsSync(postingPath)) {
      console.log(`skip (no job_posting.md): ${entry.company}`);
      continue;
    }

    const postingText = readFileSync(postingPath, "utf-8");

    try {
      const posting = await analyzePosting(postingText);
      const { assessment } = await scorePostingFit(posting);
      const outcome = bucketOutcome(entry.status);

      rows.push({
        company: entry.company,
        role: entry.role,
        status: entry.status,
        outcome,
        composite_score: assessment.composite_score,
        recommendation: assessment.recommendation,
        structural_blockers: assessment.structural_blockers,
      });

      console.log(
        `[${outcome.padEnd(8)}] score=${String(assessment.composite_score).padStart(3)} rec=${assessment.recommendation.padEnd(12)} ${entry.company}`,
      );
    } catch (err) {
      console.error(`FAILED: ${entry.company} - ${(err as Error).message}`);
    }
  }

  writeFileSync("eval-results.json", JSON.stringify(rows, null, 2));

  console.log("\n--- Summary by outcome bucket ---");
  for (const bucket of ["positive", "negative", "neutral"] as const) {
    const bucketRows = rows.filter((r) => r.outcome === bucket);
    if (bucketRows.length === 0) continue;
    const avgScore = bucketRows.reduce((sum, r) => sum + r.composite_score, 0) / bucketRows.length;
    console.log(`${bucket}: n=${bucketRows.length}, avg composite_score=${avgScore.toFixed(1)}`);
  }

  await pool.end();
}

main();
