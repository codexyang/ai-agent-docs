#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-report}"
CONFIRM="${2:-}"

print_memory() {
  printf "\n== Memory pressure ==\n"
  memory_pressure || true
}

print_top_apps() {
  printf "\n== Top memory processes ==\n"
  ps -axo pid,rss,comm | sort -nrk2 | head -15 || true
}

quit_app() {
  local app_name="$1"
  echo "Requesting graceful quit: $app_name"
  osascript -e "tell application \"$app_name\" to quit" >/dev/null 2>&1 || true
}

report() {
  print_memory
  print_top_apps
}

safe_relief() {
  if [[ "$CONFIRM" != "--yes" ]]; then
    cat <<'EOF'
Memory emergency relief is confirmation-gated.

Run:
  maintenance/memory-emergency.sh safe-relief --yes

This gracefully quits only apps that are safe to reopen:
- Visual Studio Code

It does not quit:
- Codex
- Claude
- ChatGPT
- LINE
- GitHub Desktop
- Terminal
EOF
    exit 1
  fi

  print_memory
  quit_app "Visual Studio Code"
  sleep 2
  print_memory
  print_top_apps
}

case "$MODE" in
  report)
    report
    ;;
  safe-relief)
    safe_relief
    ;;
  *)
    echo "Unknown mode: $MODE"
    echo "Use: maintenance/memory-emergency.sh report"
    echo "Use: maintenance/memory-emergency.sh safe-relief --yes"
    exit 1
    ;;
esac
