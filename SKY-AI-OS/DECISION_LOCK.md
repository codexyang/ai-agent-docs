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

