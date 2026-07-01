# TASK

VERSION: SAOS v2.1  
Last updated: 2026-06-25

## Current

Establish formal SKY Shopping Backup Baseline before first real Restore Drill.

## Priority

P1

## Owner

Codex

## Blocked

Formal Backup Baseline inventory is FAIL because no verified SKY Shopping Production / Backup DB dump or Storage payload backup exists in the workspace. Existing DR-Test pre-clean dump is not a formal Production Backup and must not be used as `Backup → DR-Test` proof.

## Next

1. Provide or create a formal SKY Shopping Production / Backup DB dump.
2. Provide Storage backup payload and manifest for `product-images`.
3. Pair backup with matching Prisma schema / migrations.
4. Only then run first real `Backup → DR-Test` Restore Drill.

## Scope

DR-Test only.

## Explicitly Out of Scope

- Production
- Backup
- Staging
- Development
- DROP / DELETE / ALTER / TRUNCATE
- Migration
