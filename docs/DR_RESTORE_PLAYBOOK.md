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

- Auth Users count
- Edge Functions list
- Policies / RLS list
- Storage object list
- 現況 DB dump
- Vercel env 再確認未引用 DR-Test ref
- 使用者批准

## 5. Restore Drill Acceptance Test

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

