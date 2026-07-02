# SKY AI Operating System

VERSION  
2.1

MISSION

- Protect Production
- Optimize Token
- Fast Handoff

## READ ORDER

1. `knowledge/CURRENT_STATE.md`
2. `SKY_INFRASTRUCTURE_MASTER_MAP.md`
3. `knowledge/DECISIONS.md`
4. `03_DATABASE_MAP.md`
5. `TASK.md`
6. `08_PROJECT_STATUS.md`
7. `09_AGENT_HANDOFF.md`
8. `DECISION_LOCK.md`
9. `MEMORY_CACHE.md`

## PROHIBITED

- Do not scan the entire Repository.
- Do not re-analyze architecture if SAOS already answers it.
- Do not re-explore Database unless the task requires it.
- Do not repeat project background.
- Do not write secrets into Git, docs, reports, or chat output.
- Do not treat Dev / Staging as source of truth over Production.
- Do not use destructive schema/data operations without explicit approval.
- Do not infer project roles from `MEMORY_CACHE.md`; use `SKY_INFRASTRUCTURE_MASTER_MAP.md`.

## SINGLE SOURCE OF TRUTH

Production is the single source of truth.

- Production features, routes, UI, and APIs are the baseline.
- Dev / Staging must not independently add or remove formal Production functionality.
- Enterprise V2 development must be additive.
- Every change must compare against Production and produce a Diff Report.
- Without approval, do not use `DROP`, `DELETE`, or `ALTER` to break existing structure.

## PRODUCTION BASELINE LOCK — HIGHEST PRIORITY

Production is always the only official version.

Before any Agent starts work, it must sync and compare against current Production.

All new features must be built on top of the latest Production version.

Forbidden:

- Starting new architecture from an old branch.
- Using old Dev to overwrite Production.
- Rebuilding existing Production functionality because it appears missing in Dev/Staging.
- Modifying UI, API, or Schema before comparing against Production.

Required startup output:

1. Production Commit
2. Working Branch Commit
3. Diff Summary
4. Additive: Yes / No
5. Production Impact: Yes / No

## ENVIRONMENT LOCK

| Environment | Role | Lock |
| --- | --- | --- |
| Production | Live operation; AI modification forbidden; only official baseline | Locked |
| Backup | Formal backup; sync only; no development | Locked |
| DR-Test `kyzwwotjunouzegyfqgz` | Restore Drill and disaster recovery validation; not general Staging | Locked |
| Development | Daily development, Enterprise V2, feature validation | Locked |

No Agent may change these roles independently.

## HUMAN EXECUTION GATE

If the task requires any of these commands and the AI sandbox cannot complete them once:

- `npx prisma generate`
- `prisma migrate`
- `npm run build`
- any local Node.js / Prisma Engine dependent command

The Agent must stop immediately and output the exact commands for the human to run locally.

Until the human returns results:

- no DB Push
- no Migration
- no Deploy
- no Git Push
- no Production modification

## RECOVERY-FIRST ROADMAP

Codex should not continue toward DB Push as the next valuable step.

Priority order:

1. Complete Production → Backup automatic sync.
2. Complete Backup → DR-Test Restore Drill.
3. Confirm one-click recovery workflow.
4. Only then continue Logistics integration and Enterprise V2.

This order protects the business before large-scale changes such as multi-merchant, logistics integration, and Enterprise V2.

## IF NEEDED

Search only related folders or files.

## COMMAND MODES

- `AUTO`: read SAOS, execute highest-priority `TASK.md`, update knowledge, stop.
- `FAST`: read bootstrap, execute, update, stop.
- `SAFE`: read only, report, stop.
- `BUILD`: generate, build, report.

## AGENT LEVELS

- `L0`: Read Only
- `L1`: Code
- `L2`: Build
- `L3`: Migration
- `L4`: Deploy
- `L5`: Production

Default level is `L0` unless the user explicitly grants more.

## COMPLETE THEN UPDATE

- `TASK.md`
- `08_PROJECT_STATUS.md`
- `09_AGENT_HANDOFF.md`
- `10_CHANGELOG.md`
- `MEMORY_CACHE.md`

STOP.
