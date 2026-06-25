# SKY Shopping Restore Script Design

建立日期：2026-06-25  
用途：Restore 流程腳本設計。現階段只設計，不執行，不連 DB，不修改 Supabase。

## 0. 目前狀態

本文件不是可直接執行腳本。  
真正執行前，必須先完成 `docs/DR_RESTORE_PLAYBOOK.md` 的 Phase 3 門檻，並取得使用者批准。

## 1. Restore 流程

```text
Production
      ↓
Backup
      ↓
Restore 到 DR-Test
      ↓
執行 Acceptance Checklist
      ↓
輸出 PASS / FAIL 報告
```

## 2. Script 設計原則

- 預設 dry-run。
- 預設不連 Production。
- 目標只能是 DR-Test。
- 執行前列出 source / target / backup artifact / destructive risk。
- 不執行 DROP，除非 restore SOP 另有明確批准。
- 不輸出 secrets。
- 所有結果寫入報告，不覆蓋正式 Backup。

## 3. 預期輸入

```text
SOURCE_BACKUP_DUMP=/path/to/backup.sql
SOURCE_STORAGE_MANIFEST=/path/to/storage_manifest.json
TARGET_ENV=dr-test
TARGET_SUPABASE_REF=kyzwwotjunouzegyfqgz
DR_TEST_BASE_URL=<preview-or-local-url>
PAYMENT_MODE=mock
LOGISTICS_MODE=dr-test
```

注意：實際密碼、service_role key、DB URL 不得寫入本文件或 commit。

## 4. Pseudo Script

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "DR Restore Drill — DRY RUN BY DEFAULT"

# 1. Validate target
# - assert TARGET_ENV == dr-test
# - assert TARGET_SUPABASE_REF == expected DR-Test ref
# - assert not production

# 2. Validate backup artifact
# - check file exists
# - check checksum
# - record backup timestamp

# 3. Pre-restore snapshot
# - table list
# - row counts
# - bucket list
# - auth users count
# - edge functions list
# - policies / RLS list

# 4. Restore database to DR-Test
# - only after explicit approval
# - record start/end time
# - capture errors

# 5. Restore / verify storage
# - create missing buckets if SOP allows
# - sync objects if SOP allows
# - verify product images

# 6. Deploy / run DR-Test app
# - env points to DR-Test
# - payment mock/sandbox/disabled-safe
# - logistics dr-test mode

# 7. Run acceptance checklist
# - database
# - storage
# - auth
# - storefront
# - checkout
# - payment
# - logistics
# - API
# - RLS

# 8. Produce report
# - PASS / FAIL
# - RTO / RPO
# - risks
# - next actions
```

## 5. Phase 3 進入門檻

只有以下全部 PASS，才允許開始真正 Restore Drill 或 DR-Test 改造：

| 項目 | 狀態 |
|---|---|
| Project Identity | PENDING |
| Schema | PENDING |
| Tables | PENDING |
| Storage | PENDING |
| Auth Users | PENDING |
| Edge Functions | PENDING |
| Policies / RLS | PENDING |
| Storage Policies | PENDING |
| Extensions | PENDING |
| Vercel References | PENDING |
| GitHub References | PENDING |
| Acceptance Checklist | 完成 |
| Restore Script | 完成設計，未執行 |

## 6. 禁止在 Phase 2 前做的事

- 清空 Database
- 刪除 Bucket
- 修改 API Keys
- 重新建立 Schema
- 大量 Migration
- 改 Project name
- 執行真實 restore

## 7. 實際執行前回報格式

```text
Restore Execution Proposal

Source Backup:
Target Project:
Target URL:
Dry Run:
Destructive Operation:
Expected RTO:
Expected RPO:
Acceptance Checklist:
Rollback:
Need Approval:
```

