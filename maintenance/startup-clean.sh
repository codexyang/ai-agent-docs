#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIRM="${1:-}"

PROJECTS=(
  "pegasus-booking"
  "AI智慧系統旅遊行程-new module"
)

if [[ "$CONFIRM" != "--yes" ]]; then
  cat <<'EOF'
Startup cleanup is intentionally confirmation-gated.

Run:
  maintenance/startup-clean.sh --yes

This removes only rebuildable local caches:
- Next.js .next folders
- Python __pycache__ folders

It does not remove:
- node_modules
- .git
- source code
- data/*.json
- booking Excel / CSV files
- payment, LINE, Gmail, or order data
EOF
  exit 1
fi

printf "\n== Startup cleanup: before ==\n"
df -h / /System/Volumes/Data 2>/dev/null || df -h

printf "\n== Removing rebuildable caches ==\n"
for project in "${PROJECTS[@]}"; do
  path="$ROOT_DIR/$project/.next"
  if [[ -d "$path" ]]; then
    du -sh "$path" || true
    echo "Removing $path"
    rm -rf "$path"
  else
    echo "Skip missing $path"
  fi
done

if [[ -d "$ROOT_DIR/gmail-ai" ]]; then
  find "$ROOT_DIR/gmail-ai" -type d -name "__pycache__" -print -exec rm -rf {} + 2>/dev/null || true
fi

printf "\n== Startup cleanup: after ==\n"
df -h / /System/Volumes/Data 2>/dev/null || df -h

cat <<'EOF'

Startup cleanup complete.

When you need to run a Next.js project again:
  cd "pegasus-booking"
  npm run build

or:
  npm run dev
EOF
