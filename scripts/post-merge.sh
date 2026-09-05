#!/usr/bin/env bash
set -euo pipefail

# Restore the exact dependency versions committed with the merged task.
npm ci --no-audit --no-fund

# Confirm merged code still produces a deployable production bundle.
npm run build