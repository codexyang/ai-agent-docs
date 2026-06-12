#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-report}"
CONFIRM="${2:-}"

PROJECTS=(
  "pegasus-booking"
  "AI智慧系統旅遊行程-new module"
)

print_header() {
  printf "\n== %s ==\n" "$1"
}

print_disk() {
  print_header "Disk"
  df -h / /System/Volumes/Data 2>/dev/null || df -h
}

print_project_sizes() {
  print_header "AI assistant folder sizes"
  du -sh "$ROOT_DIR" "$ROOT_DIR"/pegasus-booking "$ROOT_DIR"/"AI智慧系統旅遊行程-new module" "$ROOT_DIR"/Pegasustour-v1.5-travel-module "$ROOT_DIR"/gmail-ai 2>/dev/null || true

  print_header "Rebuildable cache sizes"
  for project in "${PROJECTS[@]}"; do
    for dir in ".next" "node_modules"; do
      path="$ROOT_DIR/$project/$dir"
      if [[ -d "$path" ]]; then
        du -sh "$path"
      fi
    done
  done
}

print_safe_actions() {
  print_header "Safe cleanup policy"
  cat <<'EOF'
Default mode only reports.

Safe to remove when you need space:
- .next build folders. They are rebuildable with npm run build/dev.
- Python __pycache__ folders. They are tiny here.

Do not remove automatically:
- node_modules, unless you are ready to reinstall dependencies.
- data/*.json, Excel files, payment files, LINE targets, or booking records.
- .git, source files, public images, or Travel Module handoff docs.

To clean rebuildable build caches:
  maintenance/local-health.sh clean-build-cache --yes
EOF
}

clean_build_cache() {
  if [[ "$CONFIRM" != "--yes" ]]; then
    echo "Refusing to clean without explicit confirmation."
    echo "Run: maintenance/local-health.sh clean-build-cache --yes"
    exit 1
  fi

  print_header "Cleaning rebuildable build caches"
  for project in "${PROJECTS[@]}"; do
    path="$ROOT_DIR/$project/.next"
    if [[ -d "$path" ]]; then
      echo "Removing $path"
      rm -rf "$path"
    fi
  done

  find "$ROOT_DIR/gmail-ai" -type d -name "__pycache__" -print -exec rm -rf {} + 2>/dev/null || true
  echo "Done. Rebuild Next.js projects with npm run build or npm run dev when needed."
}

case "$MODE" in
  report)
    print_disk
    print_project_sizes
    print_safe_actions
    ;;
  clean-build-cache)
    clean_build_cache
    print_disk
    print_project_sizes
    ;;
  *)
    echo "Unknown mode: $MODE"
    echo "Use: maintenance/local-health.sh report"
    echo "Use: maintenance/local-health.sh clean-build-cache --yes"
    exit 1
    ;;
esac
