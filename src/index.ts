import "dotenv/config";
import { analyzePosting } from "./extract.js";

// Real posting, pulled from applications/2026-08-19_EmpowerPharmacy_SeniorSoftwareEngineer/
// in the Resume repo - a good first test case because it has multiple real
// signals at once: Java/Spring Boot-primary backend (one of Paul's documented
// pass-criteria flags), 5+ years, AND a genuine pharmacy-domain match that
// made him apply anyway. Good test of whether extraction surfaces signals
// without trying to make the pass/apply judgment call itself.
const jobPosting = `
Senior Software Engineer - Full Stack - Empower Pharmacy
Company: Empower Pharmacy - regulated compounding pharmacy (503A) and outsourcing facility (503B).
Location: US Remote.
Seniority: Senior, 5+ years required.
Compensation: Not specified.

Responsibilities: Designing backend systems for pharmacy operations, manufacturing, and logistics
within a regulated 503A/503B environment. Systems architecture, enterprise integration, performance
optimization, and mentoring junior engineers. Emphasis on using AI tools to accelerate engineering
velocity and system observability.

Required Skills:
- Backend: Java/Spring Boot (primary); Python or C# (optional)
- Distributed systems and microservices architecture
- GraphQL and/or Node.js development
- Frontend: React, Next.js, Tailwind CSS, TypeScript
- Performance optimization and system reliability
- Observability practices (distributed tracing, structured logging)
- Regulatory compliance and data integrity in healthcare settings
- Mentorship and technical leadership

Experience Requirements:
- 5+ years software engineering experience
- Production-grade backend systems in high-growth environments
- Experience in regulated industries (compliance-aware design)
- Demonstrated mentorship ability
- Bachelor's in Computer Science or related (Master's preferred)
`;

async function main() {
  const result = await analyzePosting(jobPosting);
  console.log(JSON.stringify(result, null, 2));
}

main();
