# AI Atlas

> **The open map of the AI ecosystem.**

An open-source, community-driven directory cataloging AI products, open-source repositories, foundation models, agent frameworks, developer SDKs, serving engines, and infrastructure tooling.

---

## Table of Contents

- [Overview](#overview)
- [Mission & Vision](#mission--vision)
- [Why AI Atlas?](#why-ai-atlas)
  - [How We Differ from Generic Directories](#how-we-differ-from-generic-directories)
- [What We Catalog](#what-we-catalog)
- [Planned Category Navigation](#planned-category-navigation)
- [Quality & Trust Principles](#quality--trust-principles)
- [Planned Architecture & Roadmap](#planned-architecture--roadmap)
- [Contributing](#contributing)
- [Repository Branching Strategy](#repository-branching-strategy)
- [Community & Communication](#community--communication)
- [Licensing](#licensing)
- [Third-Party Disclaimers & Trademarks](#third-party-disclaimers--trademarks)

---

## Overview

The artificial intelligence landscape is expanding at unprecedented speed. Thousands of models, autonomous frameworks, vector systems, and SaaS platforms emerge across disparate platforms and repositories every month. Navigating this landscape has become fragmented and overwhelming.

**AI Atlas** provides a structured, objective, and community-maintained navigation system for the entire AI ecosystem. From bleeding-edge research checkpoints and battle-tested open-source libraries to enterprise developer platforms and commercial productivity tools, AI Atlas maps what exists, what it does, and how it fits together.

---

## Mission & Vision

- **Transparency**: Provide unbiased, accurate technical overviews without pay-to-play promotions or marketing exaggeration.
- **Interoperability**: Structure catalog metadata in open, machine-readable formats so developers, agents, and researchers can programmatically query the ecosystem.
- **Dual Coverage**: Bridge the gap between commercial AI solutions and open-source infrastructure to give developers an honest, complete picture of available tooling.
- **Community Governance**: Keep the atlas open, collaborative, and peer-reviewed under open-source governance.

---

## Why AI Atlas?

### How We Differ from Generic Directories

| Dimension | Generic Commercial Directories | AI Atlas |
| :--- | :--- | :--- |
| **Governance** | Proprietary, ad-supported, pay-for-placement | 100% open-source, community-governed, peer-reviewed |
| **Scope** | Often limited to commercial consumer apps | Covers models, frameworks, SDKs, infra, and commercial tools |
| **Data Access** | Locked behind web interfaces or proprietary paywalls | Open, machine-readable data (JSON/YAML) under CC BY 4.0 |
| **Objectivity** | Promotional marketing copy and affiliate links | Factual, concise technical descriptions and verified upstream links |
| **Freshness** | Frequent link rot and unmonitored entries | Automated validation pipelines and community inaccuracy reporting |
| **Licensing Clarity** | Obscured license and access tiers | Explicit separation of open source, open weights, and proprietary models |

---

## What We Catalog

AI Atlas indexes both commercial products and open-source repositories across the following domains:

- **Foundation Models & Weights**: LLMs, vision, speech, multimodal, diffusion, and embedding models.
- **Autonomous Agents & Orchestration**: Agent frameworks, memory layers, tool-use runtimes, and multi-agent coordination engines.
- **Inference & Serving Engines**: High-throughput serving systems, kernel runtimes, quantization libraries, and hardware accelerators.
- **Vector Databases & Retrieval**: Vector indexes, semantic search engines, hybrid search engines, and RAG pipelines.
- **Developer SDKs & Client Libraries**: Multi-language SDKs, prompt engineering libraries, and API wrappers.
- **Evaluation, Observability & Guardrails**: LLM evaluation benchmarks, telemetry, tracing, safety filters, and guardrails.
- **Training & Fine-Tuning**: Distributed training frameworks, PEFT tooling, synthetic data generators, and RLHF toolkits.
- **Developer Products & Commercial Platforms**: AI developer platforms, code completion copilots, and end-user productivity applications.

---

## Planned Category Navigation

The catalog structure is designed to expand systematically. Planned top-level taxonomies include:

| Category Domain | Focus Areas | Planned Entry Types |
| :--- | :--- | :--- |
| **Models & Weights** | LLMs, multimodal, speech, image/video generation | Open weights, hosted APIs, base & instruct checkpoints |
| **Agent Runtimes** | Multi-agent coordination, autonomous execution, planning | Frameworks, memory systems, agent platforms |
| **Serving & Inference** | Low-latency serving, quantization, kernel optimization | Serving engines, local runtimes, inference servers |
| **Retrieval & Storage** | High-dimensional vector search, knowledge retrieval | Vector databases, RAG toolkits, indexing libraries |
| **Evaluation & Safety** | Benchmarking, tracing, content guardrails, red-teaming | Eval harnesses, monitoring suites, safety layers |
| **Developer Tooling** | API clients, UI components, prompt management | Official SDKs, CLI tools, IDE extensions |
| **Commercial Applications**| Enterprise AI platforms, developer assistants, SaaS | Commercial products, freemium developer tools |

*(Note: Category taxonomy schemas and folder structures are under active development as part of [Phase 2 of our Roadmap](ROADMAP.md).)*

---

## Quality & Trust Principles

To maintain high standards of utility and trustworthiness, all listings in AI Atlas adhere to the following principles:

1. **Factual Neutrality**: Descriptions focus on architectural capabilities, primary use cases, and technical characteristics. Marketing buzzwords ("revolutionary", "unrivaled", "best-in-the-world") are disallowed.
2. **Official Upstream Sources**: Links must resolve to official project documentation, verified repositories, or primary domain websites.
3. **Transparent Licensing & Pricing**: Entries clearly designate their licensing status (e.g., Apache 2.0, MIT, Llama Community, Proprietary) and pricing model (Open Source, Freemium, Paid).
4. **No Paid Placement**: AI Atlas accepts no paid promotions, sponsored listings, or affiliate compensation. Inclusion and placement are determined solely by relevance and quality.
5. **Continuous Verification**: Outdated entries, broken URLs, and archived repositories are systematically updated or flagged through community issue reporting and automated validation.

---

## Planned Architecture & Roadmap

AI Atlas is being built in phased milestones to ensure a solid architectural foundation:

- **[Phase 1: Repository Foundation](ROADMAP.md#phase-1-repository-foundation-active--in-progress)** *(Active)* — Governance, licensing, contribution guidelines, and issue templates.
- **[Phase 2: Structured Catalog & Taxonomy](ROADMAP.md#phase-2-structured-catalog-and-category-taxonomy-planned)** *(Planned)* — JSON/YAML data schemas and hierarchical category definitions.
- **[Phase 3: Validation & Automation](ROADMAP.md#phase-3-validation-and-automation-planned)** *(Planned)* — Automated schema linting, dead-link detection, and CI integration.
- **[Phase 4: Verified Resource Collection](ROADMAP.md#phase-4-verified-resource-collection-planned)** *(Planned)* — Curated baseline dataset of foundational AI tools and models.
- **[Phase 5: Searchable Web Interface](ROADMAP.md#phase-5-searchable-website-planned)** *(Planned)* — Fast, modern web application for visual exploration and filtering.
- **[Phase 6: Public API & Ecosystem](ROADMAP.md#phase-6-public-api-and-integrations-planned)** *(Planned)* — Machine-readable dataset distribution and programmatic API endpoints.

Read the complete development plan in **[ROADMAP.md](ROADMAP.md)**.

---

## Contributing

We welcome contributions from developers, researchers, and AI practitioners worldwide!

- **Suggest a Resource**: Open an issue using our [Suggest an AI Resource](.github/ISSUE_TEMPLATE/suggest-resource.yml) form.
- **Report an Inaccuracy or Broken Link**: Use our [Report Resource Issue](.github/ISSUE_TEMPLATE/report-resource.yml) form.
- **Submit Pull Requests**: Read our **[CONTRIBUTING.md](CONTRIBUTING.md)** for branch rules, commit standards, and review guidelines.

Please review our **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** before participating in project spaces.

---

## Repository Branching Strategy

To maintain a clean and reliable release history, AI Atlas follows a strict three-tier branching workflow:

```text
master ◄── (Pull Request) ── build ◄── (Pull Request) ── feature branch
```

- **`master`**: Stable production release branch. Never commit directly to `master`.
- **`build`**: Primary integration and testing branch. Never commit directly to `build`.
- **`feat/*`, `docs/*`, `fix/*`**: All contributions originate on topic branches created from `build` and submit pull requests back to `build`.

See [CONTRIBUTING.md: Git Workflow](CONTRIBUTING.md#git-workflow--branching-strategy) for complete branch and commit standards.

---

## Community & Communication

- **Discussions & Ideas**: Join our [GitHub Discussions](https://github.com/deadlium/ai-atlas/discussions) to discuss taxonomy proposals, tooling architecture, and ecosystem trends.
- **Security Disclosures**: Please report security vulnerabilities responsibly following our **[SECURITY.md](SECURITY.md)** guidelines.
- **Maintainers**: Core maintenance is led by [@deadlium](https://github.com/deadlium) and the open-source community.

---

## Licensing

AI Atlas employs a dual-licensing framework to distinguish code from curated content:

- **Software Code & Automation**: All original software, scripts, and build tooling are licensed under the **[MIT License](LICENSE)**.
- **Curated Catalog Content**: All original catalog descriptions, taxonomy metadata, and documentation are licensed under the **[Creative Commons Attribution 4.0 International License (CC BY 4.0)](CATALOG-LICENSE.md)**.

---

## Third-Party Disclaimers & Trademarks

- **No Endorsement**: Listing a project, product, model, or organization within AI Atlas is strictly for informational and navigational purposes. Inclusion does not imply endorsement, security validation, code audit, or guarantee of uptime or service availability by AI Atlas or its maintainers.
- **Trademarks**: All product names, company names, trademarks, service marks, and logos referenced within this catalog belong to their respective owners. Their mention in AI Atlas is strictly nominative to identify the tools and services described.
- **Upstream Licenses**: Software and models indexed in AI Atlas remain governed solely by their upstream authors' respective licenses. Always review upstream terms of service and licensing before using third-party AI assets in your projects.
