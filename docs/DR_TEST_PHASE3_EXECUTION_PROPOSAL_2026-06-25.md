# SKY Shopping DR-Test Phase 3 Execution Proposal

日期：2026-06-25  
目標 Project Ref：`kyzwwotjunouzegyfqgz`  
目前 Project Name：`sky-shopping test dev`  
目標 Project Name：`SKY Shopping DR-Test Restore`  
狀態：Phase 3 準備執行方案；尚未執行任何寫入、清理、改名或 restore。

## 0. 本文件目的

本文件將 Phase 3 拆成可批准、可驗證、可 rollback 的小步驟。

Phase 3 不是一次全部做完，而是：

1. Pre-flight backup / manifest。
2. Dry-run proposal。
3. 使用者批准。
4. 改名。
5. 清除測試資料（只清資料，不刪結構）。
6. Restore Drill。
7. Acceptance Checklist。
8. DR Restore Report。

## 1. 已完成前置條件

| Gate | Status |
|---|---|
| Project Identity | PASS |
| Schema | PASS |
| Tables | PASS |
| Storage | PASS |
| Auth Users | PASS |
| Edge Functions | PASS |
| Policies / RLS | PASS |
| Storage Policies | PASS |
| Extensions | PASS |
| Vercel References | PASS |
| GitHub References | PASS |
| Acceptance Checklist | PASS |
| Restore Script Design | PASS |

詳細：`docs/DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md`

## 2. Phase 3 嚴格禁止

未獲得每一步明確批准前，不得：

- 清空 Database
- 刪除 Bucket
- 修改 API Keys
- 重新建立 Schema
- 大量 Migration
- 執行 DROP / TRUNCATE / DELETE
- 改 Project name
- 執行真實 restore

## 3. Step A — 現況備份（必做）

### 3.1 DB Dump Command Template

> 注意：以下只是不含密碼的模板，不得把密碼或完整 DB URL 寫入文件或 commit。

```bash
mkdir -p /Users/yangkean/sky-shopping-backup/dr-test/2026-06-25

pg_dump "$DR_TEST_DATABASE_URL" \
  --format=plain \
  --no-owner \
  --no-privileges \
  --file="/Users/yangkean/sky-shopping-backup/dr-test/2026-06-25/kyzwwotjunouzegyfqgz_preclean.sql"

shasum -a 256 \
  "/Users/yangkean/sky-shopping-backup/dr-test/2026-06-25/kyzwwotjunouzegyfqgz_preclean.sql" \
  > "/Users/yangkean/sky-shopping-backup/dr-test/2026-06-25/kyzwwotjunouzegyfqgz_preclean.sql.sha256"
```

### 3.2 Backup 驗證

備份後必須記錄：

- file path
- file size
- SHA-256
- dump start time
- dump end time
- source project ref
- source project name

### 3.3 若無法取得 DB URL

若沒有 DR-Test database connection string：

- 停止，不進行清理。
- 回報「需要 DR-Test DB connection string / pooler password」。
- 不得用 Production DB URL 代替。

## 4. Step B — Storage Object Manifest

目前已知 bucket：

| Bucket | Public | Files |
|---|---:|---:|
| `product-images` | true | 8 |

Storage manifest 應輸出：

```json
{
  "project_ref": "kyzwwotjunouzegyfqgz",
  "bucket": "product-images",
  "objects": [
    {
      "name": "products/...",
      "created_at": "...",
      "size": null,
      "mime_type": null
    }
  ]
}
```

不得刪除 bucket 或 objects，除非後續清理步驟單獨批准。

## 5. Step C — 清理 SQL 草案（不得直接執行）

清理原則：

- 只清資料。
- 不刪 table / column / index / FK / policy / bucket。
- 不清 auth schema。
- `Admin` 不直接刪到 0；若要清，先建立 DR-Test admin 策略。

### 5.1 建議清理順序

依 FK 依賴，建議順序：

1. `TrackingEvent`
2. `Shipment`
3. `NotificationLog`
4. `OrderItem`
5. `Order`
6. `AdminLog`
7. `SiteStats`
8. `Product`
9. `Category`
10. `Supplier`
11. `logistics_store`（需確認是否可清）

### 5.2 SQL Draft

> 這是草案，不可直接執行。執行前必須先備份並取得批准。

```sql
begin;

-- Child / dependent data first
delete from public."TrackingEvent";
delete from public."Shipment";
delete from public."NotificationLog";
delete from public."OrderItem";
delete from public."Order";

-- Logs / stats
delete from public."AdminLog";
delete from public."SiteStats";

-- Catalog test data
delete from public."Product";
delete from public."Category";
delete from public."Supplier";

-- Logistics key/value data: only if separately approved
-- delete from public.logistics_store;

-- Admin is intentionally preserved unless separately approved
-- delete from public."Admin";

rollback;
```

此 SQL 預設使用 `rollback;`，用於 dry-run review。真正執行時才可改為 `commit;`，且必須再次批准。

## 6. Step D — Project 改名

目標名稱：

```text
SKY Shopping DR-Test Restore
```

改名前必須：

- DB dump 完成
- Storage manifest 完成
- 清理 SQL 已批准或確認暫不清理
- 使用者明確批准改名

## 7. Step E — Restore Drill

Restore Drill 不應與清理同一步完成。建議分開：

1. 清理 / 準備 DR-Test。
2. 匯入指定 Backup dump。
3. 啟動 DR-Test Preview / local app。
4. 執行 `docs/DR_TEST_ACCEPTANCE_CHECKLIST.md`。
5. 輸出 DR Restore Report。

## 8. Step F — Acceptance Checklist

每次 Restore Drill 必須使用：

`docs/DR_TEST_ACCEPTANCE_CHECKLIST.md`

必測：

- Database Restore
- Storage Restore
- Admin login
- Merchant login
- Customer login
- Product images
- Checkout
- Order creation
- Logistics
- Payment test mode
- API Health
- RLS

## 9. Step G — DR Restore Report

報告格式：

```text
DR Restore Report

Project Ref:
Project Name:
Backup Artifact:
Restore Started:
Restore Completed:
RTO:
RPO:

Database Restore:
Storage Restore:
Admin:
Merchant:
Customer:
Product Images:
Checkout:
Order:
Logistics:
Payment:
API Health:
RLS:

Overall: PASS / FAIL
Risks:
Next Action:
```

## 10. 下一步需要使用者批准的事項

請使用者逐項批准：

1. 是否允許建立 DR-Test 現況 DB dump。
2. 是否提供 / 確認 DR-Test DB connection string，不含 Production。
3. 是否允許產生 Storage manifest。
4. 是否允許改名為 `SKY Shopping DR-Test Restore`。
5. 是否允許清理測試資料。
6. 是否允許執行第一次 Restore Drill。

目前建議先批准 1～3：

- 建立現況 DB dump
- 產生 Storage manifest
- 產出 dry-run 清理報告

暫時不要直接批准 4～6，直到備份與 dry-run 報告確認無誤。
