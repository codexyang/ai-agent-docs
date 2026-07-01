# MEMORY CACHE

VERSION: SAOS v2.1  
Last updated: 2026-06-25

## Fast Facts

Branch: `main`  
Latest SAOS commit before current task: `0dfc76f`  
Current mode: `AUTO`  
Agent level: `L0` for DB, `L1` for docs  

## Database

Target: DR-Test  
Project Ref: `kyzwwotjunouzegyfqgz`  
Project Name observed: `DR-test of sky-shopping`  
Supabase URL: `https://kyzwwotjunouzegyfqgz.supabase.co`

## Current Checkpoint

SAOS v2.1 added. DR-Test Dashboard SQL read-only verification completed on 2026-06-27. No DB write performed.

## Verified via Dashboard SQL

- `current_database`: `postgres`
- `current_user`: `postgres`
- metadata tables result count: 47
- storage bucket: `product-images`, public `true`
- storage object count: `product-images` = 8
- auth users: 0
- extensions: `pg_stat_statements`, `pgcrypto`, `plpgsql`, `supabase_vault`, `uuid-ossp`
- RLS policy: `public.logistics_store`, `service role can manage logistics store`, `ALL`

## Blocker

Phase 3 pre-clean baseline is complete. Wait for explicit user approval before cleanup or Restore Drill.

## Phase 3 Baseline Files

- `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump`
- `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump.sha256`
- `dr-test-backups/20260627_184133/storage_buckets_manifest.tsv`
- `dr-test-backups/20260627_184133/storage_objects_manifest.tsv`
- `dr-test-backups/20260627_184133/storage_manifest.sha256`
- `dr-test-backups/20260627_184133/PRE_CLEAN_REPORT.md`

## DR-Test Phase 1 Report

Status: WARNING

Files:

- `SKY-AI-OS/DR_TEST_REPORT.md`
- `SKY-AI-OS/DATABASE_MAP.md`
- `SKY-AI-OS/RESTORE_CHECKLIST.md`

WARNING items:

- Edge Functions cannot be fully proven via CLI without Supabase access token.
- External API key/service role references cannot be independently proven outside Vercel/local files with current tools.

## Production

Safe: no Production DB operation in this task.

## Formal Backup Baseline

Status: FAIL

File:

- `SKY-AI-OS/BACKUP_BASELINE_INVENTORY.md`

Reason:

- No verified formal SKY Shopping Production / Backup DB dump found.
- No formal Storage payload backup found.
- Existing `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump` is DR-Test self-baseline only.

## Long-term Rules

- Production is the single source of truth for routes, UI, APIs, and features.
- Dev / Staging cannot independently remove or redefine Production behavior.
- Enterprise V2 development is additive by default.
- Production Diff Report is required before merge/deploy.
- Human Execution Gate: if Prisma/build/Node engine commands fail in AI sandbox after one attempt, stop and ask human to run the command.

## Production Baseline Lock

Highest priority:

- Sync and compare current Production before starting work.
- Output Production Commit, Working Branch Commit, Diff Summary, Additive Yes/No, Production Impact Yes/No.
- Do not build from stale branches.
- Do not overwrite Production from old Dev.
- Do not rebuild Production-existing features due non-Production branch gaps.
- Do not modify UI/API/Schema before Production comparison.

## Environment Lock

- Production: official baseline, no AI modification.
- Backup: formal backup, sync only.
- DR-Test `kyzwwotjunouzegyfqgz`: Restore Drill only.
- Development: daily development / Enterprise V2.

## Recovery-first Roadmap

- Do not continue DB Push as next work.
- First complete Production → Backup automatic sync.
- Then complete Backup → DR-Test Restore Drill.
- Then confirm one-click recovery.
- Only after that continue Logistics integration and Enterprise V2.
