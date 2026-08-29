// Facts needed to judge fit that aren't retrievable "bullets" - years of
// experience, degree status, known real gaps. Pulled from the Full master
// resume and Paul's own documented job-search criteria (Resume repo
// CLAUDE.md), 2026-08-27. Keep in sync manually, same as bullets.ts.
export const candidateProfile = `
- Real total professional software engineering experience: ~3.5 years (Apr 2024 - present at JMA,
  plus earlier bootcamp-era and part-time/contract work). Treat any "5+ years required" as a real
  gap, not a rounding error.
- No completed bachelor's degree (some college, Mechanical Engineering, incomplete). Treat "degree
  required, no equivalent-experience carveout" as a real gap, not just a formality.
- Remote-only constraint by default (on-site/hybrid requirements are a real conflict unless there's
  a specific reason to think otherwise - unknown to this tool, flag it rather than assume).
- Real backend depth: Python/Django, Go, Node.js/Express. Java, C#, and Spring Boot/MVC are
  "familiar with" only (bootcamp/coursework-level), not production depth - do not treat these as a
  real match if a posting requires production-level proficiency in them.
- No Ruby/Rails experience at all. No Angular experience at all (React/Next.js is the real depth).
  No production Kubernetes experience.
- Does not currently hold any security clearance and cannot obtain one independently - an "active
  clearance required" posting is a structural blocker (clearance requires existing government
  sponsorship), not a stretch-fit situation.
`;
