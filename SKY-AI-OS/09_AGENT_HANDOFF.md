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

Recommended next checks:

1. In Supabase Dashboard SQL Editor for `kyzwwotjunouzegyfqgz`, run:
   - `select current_database(), current_user;`
2. If dashboard SQL works, reset or confirm the DR-Test DB password.
3. Use one confirmed connection method only.

After connection PASS, perform:

1. Read-only identity check.
2. `pg_dump`.
3. SHA256 checksum.
4. Storage manifest.
5. Pre-clean report.

Only after the user approves should cleanup proceed. Project has already been renamed in dashboard to `DR-test of sky-shopping`.

## Handoff Summary

Do not start by scanning the repository. Use SAOS knowledge files first, then inspect only task-specific files.
