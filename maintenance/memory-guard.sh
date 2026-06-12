#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-report}"
CONFIRM="${2:-}"
INTERVAL="${3:-300}"
FREE_THRESHOLD="${MEMORY_GUARD_FREE_THRESHOLD:-25}"
LOG_FILE="$ROOT_DIR/maintenance/memory-guard.log"

timestamp() {
  date "+%Y-%m-%d %H:%M:%S"
}

memory_free_percent() {
  memory_pressure 2>/dev/null | awk -F': ' '/System-wide memory free percentage/ { gsub(/%/, "", $2); print $2 }'
}

print_report() {
  printf "\n== Memory report %s ==\n" "$(timestamp)"
  memory_pressure || true
  printf "\n== VM summary ==\n"
  vm_stat | awk '
    /Pages free|Pages purgeable|Pages occupied by compressor|Pages stored in compressor|Swapins|Swapouts/ { print }
  '
}

safe_purge() {
  if ! command -v purge >/dev/null 2>&1; then
    echo "purge command not found; report only."
    return 0
  fi

  echo "Running safe macOS purge for inactive file cache..."
  purge || true
}

clean_once() {
  if [[ "$CONFIRM" != "--yes" ]]; then
    cat <<'EOF'
Memory cleanup is confirmation-gated.

Run:
  maintenance/memory-guard.sh clean --yes

This uses macOS purge to release inactive file cache.
It does not kill apps or delete project files.
EOF
    exit 1
  fi

  print_report
  safe_purge
  print_report
}

watch_loop() {
  if [[ "$CONFIRM" != "--yes" ]]; then
    cat <<'EOF'
Memory watch is confirmation-gated.

Run:
  maintenance/memory-guard.sh watch --yes 300

The last number is the interval in seconds.
Default free-memory threshold is 25%.
Override with:
  MEMORY_GUARD_FREE_THRESHOLD=20 maintenance/memory-guard.sh watch --yes 300
EOF
    exit 1
  fi

  echo "Memory guard started at $(timestamp), interval=${INTERVAL}s, threshold=${FREE_THRESHOLD}%" | tee -a "$LOG_FILE"
  while true; do
    free_percent="$(memory_free_percent || true)"
    if [[ -z "$free_percent" ]]; then
      echo "$(timestamp) memory_pressure unavailable" | tee -a "$LOG_FILE"
    elif (( free_percent < FREE_THRESHOLD )); then
      echo "$(timestamp) free=${free_percent}% below threshold; purging inactive cache" | tee -a "$LOG_FILE"
      safe_purge >>"$LOG_FILE" 2>&1 || true
    else
      echo "$(timestamp) free=${free_percent}% ok" >>"$LOG_FILE"
    fi

    # Keep log small enough for long-running Codex/Claude work sessions.
    if [[ -f "$LOG_FILE" ]] && [[ "$(wc -l < "$LOG_FILE")" -gt 300 ]]; then
      tail -120 "$LOG_FILE" > "$LOG_FILE.tmp"
      mv "$LOG_FILE.tmp" "$LOG_FILE"
    fi

    sleep "$INTERVAL"
  done
}

case "$MODE" in
  report)
    print_report
    ;;
  clean)
    clean_once
    ;;
  watch)
    watch_loop
    ;;
  *)
    echo "Unknown mode: $MODE"
    echo "Use: maintenance/memory-guard.sh report"
    echo "Use: maintenance/memory-guard.sh clean --yes"
    echo "Use: maintenance/memory-guard.sh watch --yes 300"
    exit 1
    ;;
esac
