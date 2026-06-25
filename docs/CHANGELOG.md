# SKY Shopping Enterprise Changelog

本文件記錄重大架構、部署、資料庫、備援與流程變更。

## 2026-06

### Production Header UI

- SKY Shopping Production header 更新為 `SKY SHOPPING MALL`。
- 副標更新為 `Pegasustoru VIP Exclusive Store`。
- Production tag：`production-header-ui-20260624`。
- Backup artifact：`/Users/yangkean/sky-shopping-backup/daily/mall_20260624_203600.sql`。

### Logistics Bridge

- SKY Shopping 與 SKY Logistics Bridge 已打通。
- SKY Logistics production：`https://sky-logistics-system.vercel.app`。
- Bridge 需檢查 Vercel env 與 secret，但不得輸出 secret。

### Staging / Development 重整

- Development：`rvrdlofcaerzxktqpbjk`
- Staging：`udfijsgvwihushsylglb`
- 新 Dev / Staging 可能在不同 Supabase 帳號中，不得用單一帳號 project 數推論架構不存在。

### Backup / DR-Test / Restore Drill

- 開始建立五層資料庫治理：
  - Production
  - Backup
  - Staging
  - Development
  - DR-Test
- `kyzwwotjunouzegyfqgz` 被列為 DR-Test / Restore Drill 候選。
- 已完成 read-only 初盤與 Vercel env 引用檢查。
- 新增 Restore Baseline Manifest。
- 新增 DR Restore Handoff。
- 新增本組 enterprise docs。

### Merchant / Enterprise V2

- 使用者規劃 Claude 後續建立商城 Enterprise V2 / merchant 功能。
- 前提：Staging/DR 文件與 database 分布必須清楚，避免誤判功能不存在而重複設計。

## 待補

- Auth Users count
- Edge Functions list
- Policies / RLS list
- Production full database map
- Backup project map
- Restore Drill 第一次實測報告

