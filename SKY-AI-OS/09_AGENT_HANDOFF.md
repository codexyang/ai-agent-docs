# Agent Handoff

Version: SAOS v2.0  
Last updated: 2026-06-25

## Read First

Next Agent must start with:

1. `00_BOOTSTRAP.md`
2. `01_MASTER_INDEX.md`
3. `03_DATABASE_MAP.md`
4. `knowledge/CURRENT_STATE.md`
5. `08_PROJECT_STATUS.md`
6. This file

## Current Situation

The user wants a clear, reusable operating system for all AI Agents working on SKY Shopping. The goal is to avoid repeated exploration, reduce token usage, and prevent incorrect Supabase project usage.

## Important Safety Context

- Do not modify Production.
- Do not connect to Production DB for testing.
- DR-Test target is `kyzwwotjunouzegyfqgz`.
- DR-Test cleanup has not been approved yet.
- No DB destructive action has been performed in this phase.

## Current Next Step

Resolve DR-Test connection path/password. Two session pooler URLs provided by the user were each tested once on 2026-06-25; neither returned a DB identity response.

Dashboard SQL Editor verification was completed on 2026-06-27:

- DB identity: PASS
- table metadata: PASS
- storage bucket: PASS
- storage objects: PASS
- auth users: PASS
- extensions: PASS
- RLS policy metadata: PASS

External Transaction Pooler connection was verified on 2026-06-27 and Phase 3 pre-clean baseline completed.

Completed baseline files:

1. `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump`
2. `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump.sha256`
3. `dr-test-backups/20260627_184133/storage_buckets_manifest.tsv`
4. `dr-test-backups/20260627_184133/storage_objects_manifest.tsv`
5. `dr-test-backups/20260627_184133/storage_manifest.sha256`
6. `dr-test-backups/20260627_184133/PRE_CLEAN_REPORT.md`

Next step requires explicit user approval:

- cleanup test data, or
- run Restore Drill, or
- keep DR-Test as-is and only archive baseline.

Only after the user approves should cleanup proceed. Project has already been renamed in dashboard to `DR-test of sky-shopping`.

## Handoff Summary

Do not start by scanning the repository. Use SAOS knowledge files first, then inspect only task-specific files.
