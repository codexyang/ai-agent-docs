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
- 新增 `DR_TEST_ACCEPTANCE_CHECKLIST.md` 作為每次 Restore Drill 固定驗收標準。
- 新增 `RESTORE_SCRIPT_DESIGN.md` 作為 Restore script 設計文件；目前只設計，不執行。
- 明確定義 Phase 3 進入門檻：Project Identity、Schema、Tables、Storage、Auth Users、Edge Functions、Policies/RLS、Storage Policies、Extensions、Vercel References、GitHub References、Acceptance Checklist、Restore Script 全部 PASS/完成後，才可真正改造 DR-Test。
- 完成 Phase 2 read-only 補查並新增 `DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md`：Auth Users = 0、Edge Functions 未見已部署 function、RLS / Policies / Storage Policies / Extensions 已盤點。
- 新增 `DR_TEST_PHASE3_EXECUTION_PROPOSAL_2026-06-25.md`，定義 Phase 3 執行前方案：現況 DB dump、Storage manifest、清理 SQL 草案、改名、Restore Drill、Acceptance Report；目前只建立方案，不執行寫入。
- 新增 `DR_TEST_TARGET_ARCHITECTURE_V2.md`，將使用者提供的 DR-Test / Enterprise V2 知識全景圖文字化，明確區分 Current Verified 與 Target / Desired，避免 Agent 把目標架構誤判為現有 DB。

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
