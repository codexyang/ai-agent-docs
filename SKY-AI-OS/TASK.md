# TASK

VERSION: SAOS v2.1  
Last updated: 2026-06-25

## Current

Await user approval for next DR-Test action after completed pre-clean baseline.

## Priority

P1

## Owner

Codex

## Blocked

Dashboard SQL read-only verification is PASS. Transaction Pooler identity check is PASS. Pre-clean dump, SHA256, Storage manifest, and report are complete.

## Next

1. Wait for explicit user approval.
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
