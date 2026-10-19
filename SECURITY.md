# Security Policy

The **AI Atlas** maintainers take the security of this project, its automated tooling, and its community seriously. We appreciate responsible disclosure of security vulnerabilities.

---

## 1. Supported Scope

AI Atlas currently maintains the following security update policy:

| Component / Branch | Supported | Notes |
| :--- | :---: | :--- |
| `master` branch | :white_check_mark: | Production stable branch |
| `build` branch | :white_check_mark: | Integration branch |
| Older release tags | :x: | Fixes are released forward onto `build` and `master` |

### In Scope
- Vulnerabilities within repository scripts, validation tooling, and automated workflows.
- Content integrity and data verification flaws (e.g., malicious link injection, malicious payload distribution).
- Web application vulnerabilities in the AI Atlas frontend or API once implemented.

### Out of Scope
- Vulnerabilities, exploits, or defects in third-party products, models, or open-source repositories cataloged by AI Atlas. Please report those directly to the respective upstream project maintainers.
- Social engineering attacks against maintainers or contributors.
- Denial-of-service issues targeting external third-party resources.

---

## 2. Reporting a Vulnerability

**Please do NOT disclose security vulnerabilities via public GitHub issues, discussions, or pull requests.**

### Preferred Method: GitHub Private Vulnerability Reporting
1. Navigate to the **Security** tab of the [ai-atlas repository](https://github.com/deadlium/ai-atlas).
2. Click **Advisories** and then select **Report a vulnerability**.
3. Provide a detailed summary, including:
   - Type of vulnerability.
   - Affected files, workflows, or scripts.
   - Step-by-step reproduction instructions or a minimal Proof of Concept (PoC).
   - Potential impact if exploited.

### Alternative Method
If GitHub Private Vulnerability Reporting is unavailable, you may contact the maintainer directly:
- **Maintainer**: `@deadlium` on GitHub
- **Security Contact**: `security@ai-atlas.dev` (Monitored by core maintainers)

---

## 3. Vulnerability Handling Process

Once a vulnerability report is received:

1. **Acknowledgment**: The maintainers will acknowledge receipt of the report after initial verification.
2. **Investigation**: We will investigate and validate the severity and blast radius.
3. **Remediation**: A fix will be developed in a private security advisory branch.
4. **Coordination & Release**: Once verified, the patch will be merged to `build` and promoted to `master`. A public advisory will be published with credit to the reporter, unless anonymity is requested.

We request that reporters maintain confidentiality until a patched release or advisory is published.
