# SKY Shopping Database Map

建立日期：2026-06-25

## 1. Project 權限總表

| Project | Project Ref | 用途 | AI 可修改 | 可部署 | 可清空 |
|---|---|---|---:|---:|---:|
| Production | 待使用者確認 / codexyang's Project | 正式營運 | ❌ | ✅ 僅批准後 | ❌ |
| Backup | 待確認 | 備份保存 | ❌ | ❌ | ❌ |
| Staging | `udfijsgvwihushsylglb` | 上線前驗證 | ✅ 限 Staging | 僅 Preview / test | 視情況，需批准 |
| Development | `rvrdlofcaerzxktqpbjk` | 開發 | ✅ | ❌ | 可，需確認 |
| DR-Test | `kyzwwotjunouzegyfqgz` | Restore Drill 候選 | ⚠️ 僅 Restore Drill | ❌ | 僅依 SOP 並批准 |
| Unknown | `yafykwpivreqexbcilfm` | 未確認 | ❌ | ❌ | ❌ |

## 2. DR-Test 候選資料庫現況

Project Ref：`kyzwwotjunouzegyfqgz`  
URL：`https://kyzwwotjunouzegyfqgz.supabase.co`  
Name：`sky-shopping test dev`

### Tables

| Table | Rows | 用途推定 |
|---|---:|---|
| `Admin` | 1 | 後台管理員 |
| `AdminLog` | 59 | 後台操作紀錄 |
| `Category` | 126 | 商品分類 |
| `NotificationLog` | 1 | 通知紀錄 |
| `Order` | 18 | 訂單 |
| `OrderItem` | 18 | 訂單明細 |
| `Product` | 123 | 商品 |
| `Shipment` | 1 | 物流單 |
| `SiteStats` | 1 | 統計 |
| `Supplier` | 10 | 供應商 |
| `TrackingEvent` | 3 | 物流追蹤 |
| `logistics_store` | 4 | 物流 key/value 或橋接資料 |

### Buckets

| Bucket | Public | Files |
|---|---:|---:|
| `product-images` | true | 8 |

### Migration

- Dashboard：No migrations
- `_prisma_migrations`：未看到
- Supabase system migrations：存在於 `auth` / `realtime` / `storage`

### RLS / Policies

狀態：待補查。  
已知：Dashboard Advisor 曾顯示部分 public tables RLS disabled。

不得在補查前修改 RLS / Policies。

## 3. Logistics 表狀態

DR-Test 候選中不存在以下 snake_case 表：

- `shipments`
- `tracking_events`
- `notification_logs`
- `logistics_carriers`

存在舊/Prisma 命名：

- `Shipment`
- `TrackingEvent`
- `NotificationLog`
- `logistics_store`

Restore 後應以 Production-like schema 為準，不得手動猜測建表。

## 4. 待補查

- Auth Users count：PASS，`auth.users` = 0（2026-06-25）
- Edge Functions list：PASS，Dashboard 未見已部署 function（2026-06-25）
- Policies / RLS list：PASS，已盤點；多數 public tables RLS disabled，`logistics_store` RLS enabled（2026-06-25）
- Storage object list：PASS，`product-images` 8 files sample 已記錄（2026-06-25）
- Production DB 真正 ref 與 schema
- Backup project ref 與 artifact 流程

詳細報告：`docs/DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md`
