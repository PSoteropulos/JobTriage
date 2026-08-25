// Pulled verbatim from Paul_Soteropulos_Resume_Master_Full.txt (the "bank"
// version) in the Resume repo, 2026-08-25. If that file changes, re-sync
// this list and re-run seed.ts - this is a copy for embedding purposes, not
// a second source of truth. Never edit resume wording here; edit the master
// and re-sync instead.

export interface Bullet {
  source: string;
  category: string;
  text: string;
}

export const bulletBank: Bullet[] = [
  // Jeff Martin Auctioneers
  {
    source: "Jeff Martin Auctioneers",
    category: "Real-time systems",
    text: "Designed and built a custom WebSocket/SSE client library from scratch for two Next.js applications after determining no maintained Socket.io implementation existed for Go - implemented JWT-aware reconnection with proactive token refresh, exponential backoff, and a dynamic transport-selection layer that gated sensitive bid data from anonymous users while reducing connection overhead for non-authenticated traffic.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Real-time systems",
    text: "Co-designed a ~35-message real-time bidding protocol with a backend engineer, driving requirements for a custom Go connection hub while independently owning the entire client-side implementation across both frontends; later led a modularization refactor to improve maintainability and onboarding for new engineers.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Data modeling / taxonomy",
    text: "Led requirements-gathering directly with company leadership to extract a viable product-category taxonomy for a multi-vertical marketplace (heavy equipment through general merchandise) from a client with no existing structure and frequently-changing requirements; designed a governance model where attribute-level edits were self-service for business staff while structural category changes routed through engineering.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Data modeling / taxonomy",
    text: "Built code-generation tooling that produces Django models - with class inheritance mirroring the category hierarchy - DRF serializers, and a versioned JSON attribute-schema system supporting attribute inheritance with per-category overrides and exclusions, generated directly from a category-tree definition; avoided hand-maintenance of 1,900+ category-specific classes as the taxonomy repeatedly changed during discovery.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Code quality / testing",
    text: "Spearheaded both the linting/formatting stack (ruff, pre-commit hooks) and the automated testing stack (pytest, pytest-django, factory_boy) for Django services, replacing years-old, partially-bypassed setups; mentored a backend engineer who independently replicated both across two additional services within two weeks.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Code quality / testing",
    text: "Spearheaded ESLint, Prettier, and Husky-managed pre-commit rollout across both Next.js frontends, and collaborated with a frontend engineer on building out Vitest test coverage.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Backend / API",
    text: "Owned the REST API integration layer connecting the primary Next.js frontend to the backend microservices - authentication context and token handling, inventory CRUD service modules, and item creation/edit/view workflows.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Frontend",
    text: "Built the client application for a bidder-registration kiosk from zero as a technical proof-of-concept during the company's first weeks, implementing a webcam-based photo-capture flow with in-browser face detection (TensorFlow.js) and a QR-code pre-registration/check-in flow.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Frontend",
    text: "Integrated a third-party WebRTC live-streaming service (Dolby.io/Millicast) into the live-auction frontend, building the video player embedding, stream controls, and stats UI, and maintaining the integration through upstream API changes.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Process / product",
    text: "Authored and organized the majority of the team's 900+ Jira tickets and directed sprint scope with teammates, gathering requirements directly from company ownership, the VP of Technology, IT leadership, and auction-floor managers - including on-site observation at live auctions and hands-on equipment-yard inventory intake to ground requirements in real operational workflows - without a dedicated product owner on the team.",
  },
  {
    source: "Jeff Martin Auctioneers",
    category: "Maintenance / tooling",
    text: "Led a multi-repo dependency-remediation effort across two Next.js frontends, auditing and upgrading packages by risk tier and upgrading core tooling (ESLint).",
  },
  // Hunt Safe Technologies
  {
    source: "Hunt Safe Technologies LLC",
    category: "Full stack",
    text: "Debugged and iterated on map-based frontend features, helped shape backend data structures, and collaborated on the API layer connecting them.",
  },
  // Sojourn Creations
  {
    source: "Sojourn Creations LLC",
    category: "Real-time systems / AI",
    text: "Contributed to a Node.js/TypeScript real-time socket server powering multiplayer game sessions, including a major architectural refactor of the connection/session layer, alongside full-stack feature work integrating OpenAI's API to drive AI Dungeon Master narration.",
  },
  {
    source: "Sojourn Creations LLC",
    category: "DevOps / infrastructure",
    text: "Set up multi-environment DevOps tooling - Docker Compose, encrypted secret management, and Terraform-provisioned AWS infrastructure - across development, staging, and production.",
  },
  // Salish Marine
  {
    source: "Salish Marine Charters",
    category: "Full stack",
    text: "Independently designed and built a full-stack invoicing and dispatch management application (React, Node.js, MongoDB) for a marine charter/towing business as pro bono contract work, deployed to a staging environment for client testing.",
  },
  // Coding Dojo
  {
    source: "Coding Dojo (Colorado Technical University)",
    category: "Teaching / mentorship",
    text: "Balanced a developer role with a faculty instructor role, teaching full-stack fundamentals across JS, Python, Java, and C# stacks.",
  },
  // Technical Projects
  {
    source: "Portfolio",
    category: "Technical projects",
    text: "Personal portfolio site (psoteropulos.com) built with React/TypeScript/Vite, with full CI/CD (GitHub Actions build, GHCR image push, self-hosted deploy runner) and an automated pipeline that syncs the latest resume PDF from a separate private repo into the live site on every update.",
  },
  {
    source: "moodRING",
    category: "Technical projects",
    text: "Built a music-based social app (moodring.net) with Spotify Web/Embed API integration, JWT auth, and custom image-filter-based UI components; designed and deployed independently (AWS EC2).",
  },
  {
    source: "CookBook",
    category: "Technical projects",
    text: "Built the backend (Express, MongoDB, Mongoose) for a group recipe-collection app; led debugging efforts and JWT-based auth/session handling.",
  },
];
