# SKY AI Operating System

VERSION  
2.1

MISSION

- Protect Production
- Optimize Token
- Fast Handoff

## READ ORDER

1. `knowledge/CURRENT_STATE.md`
2. `knowledge/DECISIONS.md`
3. `03_DATABASE_MAP.md`
4. `TASK.md`
5. `08_PROJECT_STATUS.md`
6. `09_AGENT_HANDOFF.md`
7. `DECISION_LOCK.md`
8. `MEMORY_CACHE.md`

## PROHIBITED

- Do not scan the entire Repository.
- Do not re-analyze architecture if SAOS already answers it.
- Do not re-explore Database unless the task requires it.
- Do not repeat project background.
- Do not write secrets into Git, docs, reports, or chat output.
- Do not treat Dev / Staging as source of truth over Production.
- Do not use destructive schema/data operations without explicit approval.

## SINGLE SOURCE OF TRUTH

Production is the single source of truth.

- Production features, routes, UI, and APIs are the baseline.
- Dev / Staging must not independently add or remove formal Production functionality.
- Enterprise V2 development must be additive.
- Every change must compare against Production and produce a Diff Report.
- Without approval, do not use `DROP`, `DELETE`, or `ALTER` to break existing structure.

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
