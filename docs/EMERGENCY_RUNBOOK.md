# SKY Shopping Emergency Runbook

建立日期：2026-06-25

## 1. 適用情境

- Production 網站壞掉
- Production API 壞掉
- DB migration 錯誤
- 商品 / 訂單 / 付款 / 物流流程中斷
- Storage 圖片大量失效
- Vercel deployment regression

## 2. 第一反應

1. 停止新的 deploy。
2. 不要直接改 Production DB。
3. 確認故障範圍：前端 / API / DB / Storage / Payment / Logistics。
4. 取得目前 Production deployment id。
5. 取得最近 stable tag / commit。
6. 查最近 backup artifact。

## 3. 快速 Rollback

若只是前端 / API deployment regression：

1. Vercel rollback 到上一個 Ready deployment。
2. 驗證首頁 / API / admin login。
3. 記錄 rollback deployment id。

## 4. DB 事故

若疑似 DB 被破壞：

1. 停止所有 migration。
2. 禁止執行 DROP / reset。
3. 找最近 backup。
4. 先 restore 到 DR-Test。
5. 在 DR-Test 完成 acceptance test。
6. 再決定 Production restore / cutover。

## 5. Restore / Cutover 流程

```text
Incident detected
   ↓
Freeze deploy
   ↓
Identify last good backup
   ↓
Restore to DR-Test
   ↓
Acceptance Test
   ↓
Decision: rollback / restore / hotfix
   ↓
Production recovery
   ↓
Postmortem
```

## 6. 必測恢復項目

- 首頁 HTTP 200
- 商品列表
- 商品詳情
- Storage 圖片
- Admin login
- 訂單查詢
- 下測試單（非 Production payment）
- 物流 Bridge
- Payment safe mode / provider status

## 7. 事故報告格式

```text
Incident Report

Detected At:
Affected System:
Impact:
Root Cause:
Rollback / Restore Action:
Recovery Time:
Data Loss:
Verification:
Follow-up:
```

