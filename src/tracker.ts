import { readFileSync } from "node:fs";

export interface TrackerEntry {
  date: string;
  company: string;
  role: string;
  folder: string | null;
  status: string;
}

const TRACKER_PATH = "C:\\Dev\\psoteropulos\\Resume\\applications\\tracker.md";

export function parseTracker(): TrackerEntry[] {
  const lines = readFileSync(TRACKER_PATH, "utf-8").split("\n");
  const entries: TrackerEntry[] = [];

  for (const line of lines) {
    if (!line.startsWith("|") || line.startsWith("|---") || line.startsWith("| Date")) continue;

    const cells = line.split("|").map((c) => c.trim());
    // cells[0] is "" (before the leading |); real columns start at index 1
    const [, date, company, role, folderCell, status] = cells;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;

    const folderMatch = folderCell?.match(/\[link\]\(\.\/(.+?)\/\)/);

    entries.push({
      date,
      company,
      role,
      folder: folderMatch ? folderMatch[1] : null,
      status: status ?? "",
    });
  }

  return entries;
}

export type OutcomeBucket = "positive" | "negative" | "neutral";

export function bucketOutcome(status: string): OutcomeBucket {
  const s = status.toLowerCase();
  if (s.includes("shortlisted") || s.includes("in process") || s.includes("interview") || s.includes("offer")) {
    return "positive";
  }
  if (s.includes("rejected")) {
    return "negative";
  }
  return "neutral";
}
