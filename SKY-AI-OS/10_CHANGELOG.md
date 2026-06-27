# Changelog

## 2026-06-25

- Added SKY AI Operating System (SAOS v2.0) structure.
- Added mandatory Agent bootstrap process.
- Added five-environment database topology.
- Added DR-Test / Restore Drill workflow.
- Added token optimization and no-full-repo-scan rule.
- Added Agent handoff and project status files.
- Upgraded SAOS bootstrap to v2.1 with `TASK.md`, `DECISION_LOCK.md`, `MEMORY_CACHE.md`, and `TOKEN_BUDGET.md`.
- DR-Test project observed as renamed to `DR-test of sky-shopping`.
- DR-Test session pooler connection tested twice with user-provided credentials; both attempts failed to return DB identity response. No DB writes performed.
- Completed DR-Test Dashboard SQL read-only verification:
  - identity PASS
  - table metadata PASS
  - storage bucket/object PASS
  - auth user count PASS
  - extension list PASS
  - RLS policy metadata PASS
- Completed DR-Test Phase 3 pre-clean baseline:
  - Transaction Pooler identity PASS
  - `pg_dump` PASS
  - dump SHA256 PASS
  - Storage manifest PASS
  - pre-clean report PASS
  - no DB writes / no Production access
