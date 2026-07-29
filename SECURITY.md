# Security notes

## Dependency audit status

The production dependency audit currently reports one upstream advisory through both `react-router-dom@7.18.2` and its `react-router@7.18.2` dependency:

- [GHSA-qwww-vcr4-c8h2 — RSC Mode CSRF bypass](https://github.com/advisories/GHSA-qwww-vcr4-c8h2)

This project is a static, client-rendered Vite SPA. It does not enable React Server Components, React Router framework mode, action endpoints, server-side loaders, or server actions—the execution path described by the advisory is therefore not present in this implementation.

The audit-proposed downgrade to 7.11.0 was evaluated and rejected because that version carries older XSS, open-redirect, deserialization, and denial-of-service advisories. The current release is retained until React Router publishes a version that resolves the RSC advisory without restoring those older findings.

Before a production deployment, rerun:

```bash
npm audit --omit=dev
```

Upgrade React Router when a patched release is available, then repeat the typecheck, test, and production-build gates.
