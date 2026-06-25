# SKY Shopping DR Restore Playbook

建立日期：2026-06-25

## 1. 目的

驗證 Production 故障時，是否能從 Backup 還原到 DR-Test 並啟動服務。

DR-Test 不是正式 Backup，不接正式流量。

## 2. 流程

```text
Backup Artifact
   ↓
Restore to DR-Test
   ↓
Deploy Preview / Local app to DR-Test env
   ↓
Acceptance Test
   ↓
PASS / FAIL Report
```

## 3. RTO / RPO

| 指標 | 定義 | 本階段狀態 |
|---|---|---|
| RTO | 從故障到可恢復服務所需時間 | 待 Restore Drill 量測 |
| RPO | 可接受資料遺失時間點 | 取決於 Backup 產生時間 |

每次演練需記錄：

- Backup artifact 時間
- Restore 開始時間
- Restore 完成時間
- App 啟動時間
- Acceptance Test 完成時間
- 實測 RTO
- 實測 RPO

## 4. 清理前門檻

在 DR-Test 清理或 restore 前，必須完成：

- Project Identity PASS
- Schema PASS
- Tables PASS
- Storage PASS
- Auth Users count
- Edge Functions list
- Policies / RLS list
- Storage Policies list
- Extensions list
- Storage object list
- 現況 DB dump
- Vercel env 再確認未引用 DR-Test ref
- GitHub references 再確認
- `docs/DR_TEST_ACCEPTANCE_CHECKLIST.md` 完成
- `docs/RESTORE_SCRIPT_DESIGN.md` 完成
- 使用者批准

## 4.1 Phase 3 進入門檻

只有以下項目全部 PASS / 完成後，才可開始真正改造 DR-Test：

| 項目 | 狀態 |
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
| Acceptance Checklist | 完成：`docs/DR_TEST_ACCEPTANCE_CHECKLIST.md` |
| Restore Script | 完成設計：`docs/RESTORE_SCRIPT_DESIGN.md` |

未達成前禁止：

- 清空 Database
- 刪除 Bucket
- 修改 API Keys
- 重新建立 Schema
- 大量 Migration
- 改 Project name
- 執行真實 restore

Phase 2 read-only 詳細報告：`docs/DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md`

Phase 3 執行前方案：`docs/DR_TEST_PHASE3_EXECUTION_PROPOSAL_2026-06-25.md`

## 5. Restore Drill Acceptance Test

詳細固定驗收標準見 `docs/DR_TEST_ACCEPTANCE_CHECKLIST.md`。

必測：

- 首頁
- 商品列表
- 商品詳情
- 分類 / 特賣
- Storage 圖片載入
- Admin login
- 購物車
- 結帳
- 訂單建立
- OrderItem 建立
- 物流 Bridge
- Tracking / Shipment
- Payment mock / disabled-safe mode
- API health
- RLS / anon access / service role boundary

## 6. PASS / FAIL 標準

PASS：

- App 指向 DR-Test，不指向 Production。
- Schema / FK / Index / Prisma 對齊。
- Restore 後核心流程可運作。
- Payment 不產生真實交易。
- Logistics 不連 Production。
- RLS / Policies 風險已列出。

FAIL：

- 任一 env 指向 Production。
- Restore 不完整。
- 核心流程不能啟動。
- 需要 DROP / destructive 操作但未批准。
- 無法確認資料來源。

## 7. 報告格式

```text
DR Restore Report

Project Ref:
Backup Artifact:
Restore Started:
Restore Completed:
RTO:
RPO:

Schema Check:
Storage Check:
Auth/Admin Check:
Product Check:
Order Check:
Payment Check:
Logistics Check:
RLS Check:

PASS / FAIL:
Risks:
Next Action:
```
