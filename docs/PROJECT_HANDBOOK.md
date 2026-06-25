# SKY Shopping Project Handbook

建立日期：2026-06-25

## 1. 專案用途

SKY Shopping 是 Pegasustour 旗下旅遊相關商城，包含：

- 商品瀏覽
- 分類 / 特賣
- 商品圖片
- 購物車
- 結帳
- 訂單
- 後台
- 物流 Bridge
- 未來 Merchant / Enterprise V2 功能

## 2. 主要 URL

| 系統 | URL |
|---|---|
| SKY Shopping Production | `https://sky-shopping-v1.vercel.app` |
| SKY Logistics Production | `https://sky-logistics-system.vercel.app` |
| Pegasustour | `https://pegasustour-v1-5.vercel.app` |

## 3. Repo / 路徑

| 路徑 | 用途 |
|---|---|
| `/Users/yangkean/sky-shopping-v1` | SKY Shopping 主 repo / Claude 可能工作區 |
| `/Users/yangkean/Desktop/AI 助理/sky-shopping-v1` | 文件鏡像 / 規格 |
| `/Users/yangkean/Desktop/AI 助理` | 跨 AI 文件與治理 |
| `/Users/yangkean/Documents/物流系統建置` | SKY Logistics |

## 4. Database

詳見 `docs/DATABASE_MAP.md`。

核心規則：

- Production 不可測試寫入。
- Development 可開發。
- Staging 可驗證。
- DR-Test 只用於 restore drill。
- Backup 不接流量、不開發。

## 5. Storage

已知：

- DR-Test 候選有 `product-images`

待確認：

- Production / Staging / Development 的完整 bucket map
- `banners`
- `uploads`

## 6. Git Flow

建議：

```text
feature/*
   ↓
staging / preview validation
   ↓
main production deploy
   ↓
tag / lock / backup
```

Production 相關變更必須先有 safety report。

## 7. 命名規範

| 類型 | 規範 |
|---|---|
| DR-Test Project Name | `SKY Shopping DR-Test Restore` |
| Production tag | `production-*` |
| Restore report | `DR_RESTORE_REPORT_YYYY-MM-DD.md` |
| Backup artifact | 含日期時間與 SHA256 |

## 8. 新 Agent 第一件事

執行 `docs/AGENT_BOOTSTRAP_CHECKLIST.md`，不要直接改 code 或 DB。

若任務涉及 Enterprise V2 / DR-Test 目標資料庫架構，另讀：

- `docs/DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md`
- `docs/DR_TEST_TARGET_ARCHITECTURE_V2.md`

注意：`DR_TEST_TARGET_ARCHITECTURE_V2.md` 是目標架構，不代表目前 DB 已存在。
