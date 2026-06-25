# SKY Shopping DR-Test Phase 2 Read-only Report

日期：2026-06-25  
Project Ref：`kyzwwotjunouzegyfqgz`  
Project Name：`sky-shopping test dev`  
Supabase URL：`https://kyzwwotjunouzegyfqgz.supabase.co`  
範圍：唯讀盤點；沒有清理、沒有 DROP、沒有 DELETE、沒有 ALTER、沒有 migration、沒有改名。

## 1. Project Identity

| 項目 | 結果 |
|---|---|
| Project Ref | PASS：`kyzwwotjunouzegyfqgz` |
| Project Name | PASS：`sky-shopping test dev` |
| SQL Role | `postgres` |
| Database | `postgres` |

## 2. Auth Users

| 項目 | 結果 |
|---|---:|
| `auth.users` count | 0 |

判定：PASS（已完成盤點）。  
備註：目前沒有 Supabase Auth Users。後續若 DR-Test 需要 admin / merchant / customer 登入，應建立 DR-Test 專用帳號，不得使用 Production 密碼。

## 3. Edge Functions

Dashboard `Edge Functions` 頁面已檢查：

| 項目 | 結果 |
|---|---|
| Edge Functions list | PASS：未看到已部署 function |
| Deploy action | 未執行 |

判定：PASS（已完成盤點）。  
備註：若後續 Production-like app 需要 Edge Functions，應由 restore / deploy SOP 補齊。

## 4. Policies / RLS

### 4.1 Public Tables RLS

| Table | RLS Enabled | RLS Forced |
|---|---:|---:|
| `Admin` | false | false |
| `AdminLog` | false | false |
| `Category` | false | false |
| `NotificationLog` | false | false |
| `Order` | false | false |
| `OrderItem` | false | false |
| `Product` | false | false |
| `Shipment` | false | false |
| `SiteStats` | false | false |
| `Supplier` | false | false |
| `TrackingEvent` | false | false |
| `logistics_store` | true | false |

### 4.2 Policies

| Schema | Table | Policy | Command | Roles |
|---|---|---|---|---|
| `public` | `logistics_store` | `service role can manage logistics store` | ALL | public |

判定：PASS（盤點完成），但安全姿態需在 restore baseline 中明確記錄。  
備註：大多數 public tables 目前 RLS disabled；這是現況，不代表應在本階段修改。清理 / restore 前不得自行調整 RLS。

## 5. Storage / Storage Policies

### 5.1 Buckets

| Bucket | Public | Files |
|---|---:|---:|
| `product-images` | true | 8 |

### 5.2 Object Sample

`product-images` bucket 目前前 8 筆 object：

- `products/1780906335882-kjho7ft3sk.png`
- `products/1780906419447-hyanxfqfsga.png`
- `products/1780906678474-2in2kqxzq1c.png`
- `products/1780909371115-lw1chcsqfg.png`
- `products/1780913709156-5x72am3cci6.png`
- `products/1780914813352-fck2cmqlv4.png`
- `products/1780917964381-4jh76yko93q.jpeg`
- `products/1780918030841-g3ds3yynars.jpg`

### 5.3 Storage Policies

`pg_policies` 中未列出 `storage` schema policies。  
目前 bucket 為 public bucket。

判定：PASS（盤點完成）。  
備註：Restore Drill 驗收時仍需測試圖片 URL 可讀與缺圖 fallback。

## 6. Extensions

| Extension | Version |
|---|---|
| `pg_stat_statements` | 1.11 |
| `pgcrypto` | 1.3 |
| `plpgsql` | 1.0 |
| `supabase_vault` | 0.3.1 |
| `uuid-ossp` | 1.1 |

判定：PASS。

## 7. Triggers / Functions

| 項目 | 結果 |
|---|---|
| public triggers | none |
| public functions | none listed |
| storage functions | Supabase system storage functions present |

判定：PASS（盤點完成）。

## 8. Phase 3 Gate Status

| Gate | Status | Evidence |
|---|---|---|
| Project Identity | PASS | Supabase dashboard / SQL identity |
| Schema | PASS | Tables previously inventoried |
| Tables | PASS | 12 public tables inventoried |
| Storage | PASS | `product-images` bucket, 8 files |
| Auth Users | PASS | `auth.users` count = 0 |
| Edge Functions | PASS | Dashboard shows no deployed functions |
| Policies / RLS | PASS | RLS / policies inventoried |
| Storage Policies | PASS | No storage policies listed; bucket public |
| Extensions | PASS | 5 extensions inventoried |
| Vercel References | PASS | Prior check found no `kyzwwotjunouzegyfqgz` in known Vercel projects/envs |
| GitHub References | PASS | Docs pushed to `codexyang/ai-agent-docs` main |
| Acceptance Checklist | PASS | `docs/DR_TEST_ACCEPTANCE_CHECKLIST.md` created |
| Restore Script | PASS | `docs/RESTORE_SCRIPT_DESIGN.md` created; not executed |

## 9. Recommendation

Phase 2 read-only inventory is now complete enough to request explicit approval for Phase 3 planning.

Do not start actual Phase 3 operations until user approves a specific action plan.

Phase 3 actual operations still require:

1. 現況 DB dump。
2. Storage object manifest。
3. 清理 SQL / restore command dry-run proposal。
4. 使用者明確批准。

仍禁止：

- 清空 Database
- 刪除 Bucket
- 修改 API Keys
- 重新建立 Schema
- 大量 Migration
- 改 Project name
- 執行真實 restore
