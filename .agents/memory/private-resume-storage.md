---
name: Private resume storage
description: Deployment constraint for caregiver application resume files.
---

Caregiver resumes must be stored outside the app's publicly served files, and the configured upload directory must be backed by a persistent Dokploy volume.

**Why:** Container-local files disappear when a container is replaced or redeployed, while resumes contain personal information that must not be publicly addressable.

**How to apply:** Keep resume access behind administrator authentication. In Dokploy, mount persistent storage at the configured resume upload directory before accepting production applications.