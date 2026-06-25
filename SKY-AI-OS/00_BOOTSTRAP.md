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
