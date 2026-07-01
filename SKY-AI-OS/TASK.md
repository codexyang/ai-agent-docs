# TASK

VERSION: SAOS v2.1  
Last updated: 2026-06-25

## Current

Establish recovery-first foundation before Enterprise V2 or logistics integration.

## Priority

P1

## Owner

Codex

## Blocked

Codex should not continue DB Push. Formal Backup Baseline inventory is FAIL because no verified SKY Shopping Production / Backup DB dump or Storage payload backup exists in the workspace. Existing DR-Test pre-clean dump is not a formal Production Backup and must not be used as `Backup → DR-Test` proof.

## Next

1. Complete Production → Backup automatic sync.
2. Complete Backup → DR-Test Restore Drill.
3. Confirm one-click recovery workflow.
4. Only then continue Logistics integration and Enterprise V2.

## Scope

DR-Test only.

## Explicitly Out of Scope

- Production
- Backup
- Staging
- Development
- DROP / DELETE / ALTER / TRUNCATE
- Migration

## Required Startup Baseline Report

Before any future implementation task, output:

1. Production Commit
2. Working Branch Commit
3. Diff Summary
4. Additive: Yes / No
5. Production Impact: Yes / No
