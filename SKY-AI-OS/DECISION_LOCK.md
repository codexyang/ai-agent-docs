# DECISION LOCK

VERSION: SAOS v2.1

| Decision | Lock | Rule |
| --- | --- | --- |
| Production direct DB modification | YES | Forbidden. |
| Production `db push` | YES | Forbidden. |
| Production migration without approved plan | YES | Forbidden. |
| Backup as development DB | YES | Forbidden. |
| DR-Test purpose | YES | Restore Drill only. |
| Development / Staging separated from Production | YES | Must remain separate. |
| Staging parity definition | YES | Functional/schema/UI/API parity, not identical rows. |
| Secrets in Git/docs/chat output | YES | Forbidden. |
| Full repository scan at Agent startup | YES | Forbidden. |
| Brand/Supplier/Product schema destructive changes | WAIT | Do not DROP without explicit reviewed migration. |
| Production as Single Source of Truth | YES | Production routes/UI/API/features are authoritative baseline. |
| Enterprise V2 additive-only development | YES | New work must add capabilities without removing Production behavior unless approved. |
| Production Diff Report before merge/deploy | YES | Required before promotion. |
| Human Execution Gate for Prisma/build | YES | If sandbox fails once, stop and request human command result. |
| Production Baseline Lock | YES | Highest priority: every task starts by syncing/comparing current Production. |
| No old-branch architecture | YES | Forbidden to build new architecture from stale branches. |
| No old Dev overwrite | YES | Forbidden to overwrite Production from old Dev. |
| DR-Test role lock | YES | `kyzwwotjunouzegyfqgz` is Restore Drill only, not Staging. |
| Environment role changes | YES | No Agent may redefine Production / Backup / DR-Test / Development roles. |
| Codex DB Push | YES | Not recommended; do not continue DB Push workflow. |
| Recovery-first roadmap | YES | Production→Backup sync, Backup→DR-Test drill, one-click recovery before Enterprise V2/logistics. |
| Infrastructure Master Map authority | YES | `SKY_INFRASTRUCTURE_MASTER_MAP.md` is the only project/environment authority. |
| MEMORY_CACHE project inference | YES | Forbidden; cache is not authoritative. |
