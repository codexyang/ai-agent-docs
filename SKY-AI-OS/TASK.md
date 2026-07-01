# TASK

VERSION: SAOS v2.1  
Last updated: 2026-06-25

## Current

Resolve / accept DR-Test Phase 1 WARNING items, then await user approval for cleanup or Restore Drill.

## Priority

P1

## Owner

Codex

## Blocked

Dashboard SQL read-only verification is PASS. Transaction Pooler identity check is PASS. Pre-clean dump, SHA256, Storage manifest, and report are complete. DR-Test Phase 1 is WARNING because Edge Functions and external API key references cannot be fully proven from current CLI permissions/tools.

## Next

1. User decides whether to accept WARNING items or provide Supabase access token / external dashboard proof.
2. If approved, run cleanup/restore drill according to `06_DR_RESTORE_PLAYBOOK.md`.
3. If not approved, keep baseline archived and stop.

## Scope

DR-Test only.

## Explicitly Out of Scope

- Production
- Backup
- Staging
- Development
- DROP / DELETE / ALTER / TRUNCATE
- Migration
