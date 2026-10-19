# Contributing to AI Atlas

Thank you for your interest in contributing to **AI Atlas**!

AI Atlas is a community-driven, open-source directory mapping AI products, open-source GitHub repositories, models, frameworks, autonomous agents, developer SDKs, and infrastructure tooling. Our goal is to provide an objective, high-trust, and machine-readable map of the global AI ecosystem.

Whether you are suggesting a new resource, reporting an outdated link, improving documentation, or building automated validation tooling, your contributions are welcome.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Git Workflow & Branching Strategy](#git-workflow--branching-strategy)
3. [Branch Naming Conventions](#branch-naming-conventions)
4. [Commit Message Guidelines](#commit-message-guidelines)
5. [How to Contribute](#how-to-contribute)
   - [Suggesting a New AI Resource](#1-suggesting-a-new-ai-resource)
   - [Reporting Inaccurate or Outdated Information](#2-reporting-inaccurate-or-outdated-information)
   - [Proposing Documentation or Policy Improvements](#3-proposing-documentation-or-policy-improvements)
   - [Contributing Code & Tooling](#4-contributing-code--tooling)
6. [Pull Request Standards & Review Process](#pull-request-standards--review-process)
7. [Licensing & Intellectual Property](#licensing--intellectual-property)

---

## Code of Conduct

All contributors and maintainers are expected to uphold the standards described in our **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)**. Please treat everyone with empathy, respect, and professionalism.

---

## Git Workflow & Branching Strategy

AI Atlas enforces a structured, multi-tier Git branching workflow to ensure that the production repository remains stable, thoroughly validated, and release-ready:

```text
master (Production / Stable Release)
  ^
  | Pull Request (Integration -> Release promotion)
  |
build (Integration & Verification)
  ^
  | Pull Request (Feature -> Integration)
  |
feature branches (e.g., feat/*, docs/*, fix/*)
```

### Key Branch Roles

1. **`master` (Stable Branch)**:
   - Represents the verified, production-ready state of the project.
   - **Never commit directly to `master`.**
   - Merges into `master` only occur via pull requests originating from `build` after integration testing.

2. **`build` (Integration Branch)**:
   - The primary integration branch where contributions are gathered, tested, and validated.
   - **Never commit directly to `build`.**
   - All community pull requests must target `build`.

3. **Feature Branches (`feat/*`, `docs/*`, `fix/*`, etc.)**:
   - All work must be conducted on dedicated feature branches branched from the latest `build`.
   - Feature branches are submitted to `build` via a Pull Request.

---

## Branch Naming Conventions

All feature and topic branches must use the following standard prefixes:

| Prefix | Description | Example |
| :--- | :--- | :--- |
| `feat/` | New features, taxonomy changes, or major additions | `feat/model-taxonomy` |
| `fix/` | Bug fixes, correcting catalog entries, broken links | `fix/broken-links-2026` |
| `docs/` | Documentation, repository policies, README improvements | `docs/initial-project-setup` |
| `chore/` | Maintenance tasks, dependency updates, tooling configuration | `chore/update-linters` |
| `refactor/` | Code or structural reorganization without functional changes | `refactor/catalog-schema` |
| `test/` | Adding or updating tests, fixtures, and schema validators | `test/schema-validation` |
| `ci/` | GitHub Actions and CI/CD workflow updates | `ci/setup-link-checker` |

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <short description in imperative mood>

[optional body explaining motivation and context]

[optional footer(s), e.g. Fixes #123]
```

### Allowed Types
- `feat`: A new feature, catalog entry, or taxonomy component.
- `fix`: A fix for a catalog inaccuracy, broken URL, or tooling bug.
- `docs`: Documentation changes only.
- `style`: Formatting, whitespace, or linting adjustments that do not affect code logic.
- `refactor`: Code or data structure refactoring.
- `test`: Adding or correcting tests and schema checks.
- `chore`: Tooling updates, dependency bumps, or repository administration.
- `ci`: Changes to CI/CD configurations and scripts.

### Examples
- `feat(catalog): add vllm inference engine under serving taxonomy`
- `fix(links): update renamed repository URL for fastchat`
- `docs(readme): clarify commercial vs open-source resource criteria`
- `ci(workflows): add automated yaml linting action`

---

## How to Contribute

### 1. Suggesting a New AI Resource
The easiest way to suggest a resource is through GitHub Issues:
1. Go to the [Issues tab](https://github.com/deadlium/ai-atlas/issues).
2. Click **New Issue** and choose the **[Suggest an AI Resource](.github/ISSUE_TEMPLATE/suggest-resource.yml)** template.
3. Fill out the required details (Name, URL, open-source repo if applicable, type, pricing tier, and a neutral summary).
4. Submit the issue for community and maintainer review.

### 2. Reporting Inaccurate or Outdated Information
If you encounter dead links, incorrect licensing, outdated pricing, or archived projects:
1. Open an issue using the **[Report Resource Issue or Inaccuracy](.github/ISSUE_TEMPLATE/report-resource.yml)** template.
2. Provide links to official upstream evidence demonstrating the required correction.

### 3. Proposing Documentation or Policy Improvements
1. Ensure your local `build` branch is up to date:
   ```bash
   git checkout build
   git pull origin build
   ```
2. Create a documentation branch:
   ```bash
   git checkout -b docs/clarify-taxonomy-guidelines
   ```
3. Make your edits and commit following Conventional Commits.
4. Push your branch and open a PR targeting `build`.

### 4. Contributing Code & Tooling
When automated tooling or web features are introduced:
- Always run local formatting and validation checks prior to submitting your PR.
- Ensure all automated checks pass cleanly.

---

## Pull Request Standards & Review Process

To ensure high quality across all contributions, every pull request must meet these standards:

### PR Checklist
- [ ] **Target Branch**: PR targets `build`, NOT `master`.
- [ ] **Clean History**: Commits are descriptive, atomic, and adhere to Conventional Commits.
- [ ] **Neutral Tone**: Resource descriptions avoid promotional marketing superlatives ("revolutionary", "best-in-class", "industry-leading") in favor of factual, concise statements.
- [ ] **Verified Sources**: All links point to official domains or upstream repositories.
- [ ] **Template Completed**: The [Pull Request Template](.github/pull_request_template.md) is filled out completely.

### Review Expectations
- Maintainers review incoming pull requests on a rolling basis.
- Constructive feedback may be requested before merging. Please monitor your pull request for questions or requested changes.
- Automated tests and link-checks (once configured) must pass prior to merge.

---

## Licensing & Intellectual Property

By contributing to AI Atlas, you agree to our dual-licensing model:
1. **Source code and tooling** are licensed under the **[MIT License](LICENSE)**.
2. **Original catalog descriptions, curated metadata, and taxonomies** are licensed under the **[CC BY 4.0 International License](CATALOG-LICENSE.md)**.
3. You warrant that your contributions are original or derived from factual, publicly available information, and do not violate third-party copyrights or trademarks.
