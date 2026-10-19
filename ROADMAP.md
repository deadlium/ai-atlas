# AI Atlas Project Roadmap

This roadmap outlines the planned development trajectory of **AI Atlas**. All phases and deliverables outlined below represent active planning and future architecture rather than currently implemented features.

---

## Roadmap Overview

```
Phase 1: Repository Foundation ───────────► [Current Milestone]
Phase 2: Structured Catalog & Taxonomy ───► [Planned]
Phase 3: Validation & Automation ─────────► [Planned]
Phase 4: Verified Resource Collection ───► [Planned]
Phase 5: Searchable Web Interface ────────► [Planned]
Phase 6: Public API & Ecosystem ──────────► [Planned]
```

---

## Detailed Phases

### Phase 1: Repository Foundation (Active / In Progress)
*Objective: Establish community standards, governance, and contribution infrastructure.*
- [x] Multi-branch git workflow specification (`master` stable, `build` integration, `docs/*` / `feat/*` feature branches).
- [x] Community governance, code of conduct, and security disclosure policies.
- [x] Dual-licensing strategy documentation (MIT for software code, CC BY 4.0 for curated catalog content).
- [x] GitHub issue templates for resource suggestions and inaccuracy reports.
- [x] Pull request template with verification and licensing checklists.
- [x] Foundation documentation: README, CONTRIBUTING, ROADMAP, CHANGELOG.

### Phase 2: Structured Catalog and Category Taxonomy (Planned)
*Objective: Design an open, machine-readable schema for catalog data and establish hierarchical categories.*
- [ ] Define standard catalog schema (JSON Schema / YAML) capturing:
  - Resource identity (name, slugs, canonical URLs, official repositories).
  - Categorization (primary category, secondary tags).
  - Ecosystem classification (Foundation Models, Autonomous Agents, Developer Tooling, Infra & Serving, SDKs, Commercial Platforms).
  - Licensing & pricing model (Open Source, Open Weights, Commercial, Freemium, Free).
  - Upstream project attributes (primary language, framework dependencies, hosting status).
- [ ] Establish initial taxonomy and folder organization for catalog entries.
- [ ] Design metadata guidelines for concise, objective, non-promotional descriptions.

### Phase 3: Validation and Automation (Planned)
*Objective: Implement robust automated checks to protect catalog integrity and freshness.*
- [ ] Automated schema validator (linting all catalog JSON/YAML records against the defined schema).
- [ ] Automated URL and link checking workflow to detect 404s, domain redirects, and dead repositories.
- [ ] Formatting and consistency linters for catalog entries.
- [ ] Continuous Integration (CI) test suite running on all pull requests targeting the `build` branch.
- [ ] Duplicate detection tools to prevent repetitive entries.

### Phase 4: Verified Resource Collection (Planned)
*Objective: Build out the initial curated baseline of high-quality, verified AI resources.*
- [ ] Curate foundational models across modalities (LLMs, vision, audio, multimodal, embeddings).
- [ ] Catalog leading agent frameworks, orchestration engines, and memory architectures.
- [ ] Index core developer tooling (eval frameworks, vector databases, guardrails, inference servers).
- [ ] Establish criteria for "Verified" entries (active maintenance, verified repository ownership, accurate documentation).
- [ ] Community submission drive adhering to structured review processes.

### Phase 5: Searchable Website (Planned)
*Objective: Provide a responsive, high-performance web experience for exploring the catalog.*
- [ ] Static site / frontend application architecture (fast search, instant filtering by license and category).
- [ ] Category exploration, tag filtering, and side-by-side resource comparisons.
- [ ] Automated static build and deployment pipeline linked to the `master` branch.
- [ ] Dark and light theme support with modern design aesthetics.
- [ ] Mobile-responsive navigation and accessible UI components.

### Phase 6: Public API and Integrations (Planned)
*Objective: Allow external developers, tools, and platforms to consume AI Atlas data.*
- [ ] Pre-built static JSON datasets distributed via GitHub Pages or CDN.
- [ ] Programmatic REST / GraphQL endpoint for query-based retrieval.
- [ ] Integration plugins (e.g., CLI search tool, IDE extensions).
- [ ] Community syndication feeds (RSS/JSON) for newly cataloged resources and updates.

---

## Feedback and Proposing Roadmap Items

Roadmap priorities are discussed and refined openly. To suggest new roadmap priorities:
1. Review existing discussion threads or open an issue labeled `discussion`.
2. Ensure suggestions align with the AI Atlas mission of maintaining an open, non-promotional map of the AI ecosystem.
