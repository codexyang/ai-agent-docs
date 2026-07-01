# DR-Test Restore Checklist

Date: 2026-07-01  
Environment: DR-Test / Restore Drill  
Project Ref: `kyzwwotjunouzegyfqgz`

## Phase 1 — Read-only Validation

| Check | Status |
| --- | --- |
| Project Identity | PASS |
| Database Version | PASS |
| Extensions | PASS |
| Schemas | PASS |
| Tables | PASS |
| Views | PASS |
| Functions | PASS |
| Triggers | PASS |
| Policies / RLS | PASS |
| Auth Users | PASS |
| Storage Buckets | PASS |
| Storage Objects | PASS |
| Edge Functions | WARNING |
| Cron | PASS |
| Webhook | PASS |
| API Keys Reference | WARNING |

## Phase 2 — Pre-clean Baseline

| Check | Status |
| --- | --- |
| Transaction Pooler identity | PASS |
| `pg_dump` created | PASS |
| SHA256 created | PASS |
| Storage bucket manifest | PASS |
| Storage object manifest | PASS |
| Pre-clean report | PASS |
| Production untouched | PASS |

## Before Cleanup / Restore Drill

Do not proceed unless one of these is true:

1. Edge Functions and external API references are fully verified as unused, or
2. User explicitly accepts the WARNING items and approves proceeding.

## Restore Drill Steps

1. Confirm target is `kyzwwotjunouzegyfqgz`.
2. Confirm no Production / Backup / Staging / Development URL is in use.
3. Confirm latest baseline files exist.
4. Record current row counts and Storage counts.
5. If cleanup is approved, clean only approved DR-Test test data.
6. Restore approved dump into DR-Test.
7. Validate:
   - DB identity
   - public table counts
   - Storage bucket exists
   - Storage object metadata count
   - Auth users
   - RLS policies
   - Cron / webhook absence
8. Record PASS / WARNING / FAIL.
9. Update SAOS:
   - `TASK.md`
   - `08_PROJECT_STATUS.md`
   - `09_AGENT_HANDOFF.md`
   - `10_CHANGELOG.md`
   - `MEMORY_CACHE.md`

## Forbidden During Restore Drill

- Production DB connection
- Production env modification
- Vercel Production modification
- Backup overwrite
- Unapproved DROP / DELETE / ALTER / TRUNCATE
- Migration

