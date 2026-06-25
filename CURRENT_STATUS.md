# Current Status — AI Agent Docs

**最後整理：** 2026-06-24（補記 Supabase Project 角色登記與存取限制）
**用途：** 本文件是目前 GitHub / 本地文件整合後的最新入口。若舊文件內容與本文件衝突，以本文件、`LOCKED_SCRIPT_MODE.md`、`AMY-CONTENT-GOVERNANCE.md`、`CORE-RULES.md` 為準。

---

## 讀取順序

所有 AI Agent 開工前必讀：

1. `CURRENT_STATUS.md`（本文件）
2. `LOCKED_SCRIPT_MODE.md`
3. `AMY-CONTENT-GOVERNANCE.md`
4. `AI_AGENT_MASTER.md`
5. `CORE-RULES.md`
6. `ChatGPT-skill.md`（已精簡，2026-06-16）
7. 對應專案的 `AGENT-HANDOFF.md` / `PROJECT_STATUS.md`

> 若有 Staging → Production 部署任務，必讀：`SKILL-STAGING-TO-PRODUCTION.md`
> 若是 SKY Shopping 推 Production，必須先讀並執行：`SKILL-SKY-SHOPPING-PRODUCTION-SAFETY.md`
> 若是 SKY Shopping DR-Test / Restore Drill，必讀：`SKILL-SKY-SHOPPING-DR-RESTORE.md`、`docs/SKY_SHOPPING_DR_TEST_RESTORE_BASELINE_MANIFEST.md`、`docs/SKY_SHOPPING_DR_RESTORE_HANDOFF.md`

2026-06-16 整理：`AI_AGENT_MASTER.md` 已改為精簡接手總控索引；歷史部署與舊流程移到 `AI_AGENT_SYNC.md`。`SKILL-STAGING-TO-PRODUCTION.md` 已整理為正式部署技能流程。
2026-06-17 新增：`SKILL-SKY-SHOPPING-PRODUCTION-SAFETY.md` 作為 SKY Shopping production 前安全閘門，沒有完整 PASS 報告不可建議部署。

---

## Repository 分工

| Repo / 路徑 | 用途 | 狀態 |
|---|---|---|
| `/Users/yangkean/Desktop/AI 助理` | `codexyang/ai-agent-docs`，跨 AI 文件與交接資料 | 主控文件庫，已推 GitHub |
| `/Users/yangkean/Desktop/AI 助理/pegasus-booking` | `codexyang/pegasustour-v1.5`，Pegasustour 訂車/旅遊主系統 | 獨立 Git repo，不要塞進外層 repo |
| `/Users/yangkean/Desktop/AI 助理/sky-shopping-v1` | SKY Shopping 文件鏡像/規格資料 | 依文件同步，正式站為獨立服務 |
| `/Users/yangkean/Documents/物流系統建置` | SKY Shopping Logistics System，獨立物流模組 | 已部署 Vercel production；GitHub `codexyang/sky-logistics-system` 已建立，main = Production |

---

## 最高規則

- 全部回覆使用繁體中文。
- 穩定優先，增量修改，不重構、不覆蓋鎖定內容。
- 視覺或程式修改必須先 localhost 驗證，再 push / deploy。
- 不確定是否超出範圍時先詢問。
- `pegasus-booking/app/layout.tsx` 永久禁止修改，除非使用者明確解除鎖定。
- 任何 Git commit 只包含本次任務相關檔案。

---

## AMY 內容治理現況

`LOCKED_SCRIPT_MODE = TRUE` 已於 2026-06-11 生效，是 AMY 相關工作的最高優先規則。

AMY 只能逐字朗讀核准稿：

```text
amy-player/approved-scripts/{id}.txt
```

硬性禁止：

- 禁止 AI rewrite / 潤稿 / 摘要 / 擴寫。
- 禁止 `build_script()` 或任何類似自動生成台詞功能。
- 禁止根據商品資料推測功效或銷售文案。
- 無核准稿時，AMY 只能說：「請洽客服了解更多詳情。」
- 生成語音或影片前必須做 Script Diff；差異超過 1 字即退件。

舊文件中提到的 SadTalker、AMY-B 模板自動套稿、產品資料自動生成介紹，全部視為 legacy planning，不得作為目前實作依據。

---

## SKY Shopping 現況

- 正式名稱：`SKY Shopping 商城精選館`
- 正式站：`https://sky-shopping-v1.vercel.app`
- 策略：維持獨立站，V2.0 只做 API 互通，不合併進 Pegasustour 主系統。
- 鎖定內容：AMY 開場白 v1.1、品牌名稱、內容治理規則。
- 待辦方向：商品詳情頁、商品 CRUD、金流、Email/LINE 通知、與旅遊/訂車流程的 API 加購互通。
- 物流狀態：SKY Logistics V2.5 已成為獨立物流模組，正式站 `https://sky-logistics-system.vercel.app`，外部客戶委託表單 `https://sky-logistics-system.vercel.app/external`。
- 物流接手文件：`/Users/yangkean/Documents/物流系統建置/AGENT_HANDOFF_V2.5.md`。
- 物流 Git 狀態：GitHub remote 已建立 `codexyang/sky-logistics-system`（2026-06-17），已連結 Vercel 自動部署，push main 即觸發部署。

### 2026-06-14 物流 repo 建立前歷史紀錄（已由 2026-06-17 狀態覆蓋）

- 本機 commit `6297113 feat: lock SKY logistics V2.5 production module` 曾先建立；當時 GitHub remote 尚未建立，`codexyang/sky-logistics-system` 回應 `Repository not found`。
- 物流資料更新決策：只做 `sky-logistics-system` 的 Supabase `logistics_store` 安全初始化，保留 `mock` 為目前啟用 carrier，正式物流 API key 暫不接。
- 最新有效狀態以 2026-06-17「GitHub remote 已建立、Vercel 自動部署已連結」為準。

### 2026-06-24 Production UI 版本鎖定與備份

- 發布內容：首頁標頭限定 UI 調整（`SKY SHOPPING MALL`、副標、字體尺寸與向左 8px）；無資料庫、migration、付款或物流變更。
- Vercel Production：`dpl_EVEL4LS9WNtrHRewAoeaed9bdrT4`，狀態 `Ready`，alias 為 `https://sky-shopping-v1.vercel.app`。
- Git lock：commit `b4d0f6b`（`fix(header): update SKY Shopping Mall branding`），branch `codex/header-copy-preview`，tag `production-header-ui-20260624` 已推送至 GitHub。
- Backup artifact：`/Users/yangkean/sky-shopping-backup/daily/mall_20260624_203600.sql`（79,926 bytes；SHA-256 `3dcc7ece6abfcf755154aa5ffc65b8e01750a802b2385be3d42a1996afeb2c24`）。
- Backup validation：Production 唯讀確認 `postgres` / `postgres`，`public` schema 為 9 tables；未對 Production 或 Backup DB 執行寫入。

### 2026-06-17 上線更新（物流 V3 UI + 訂單橋接）

**物流中心 V3 UI（production）**
- main HEAD `eddd283`；正式站 `https://sky-logistics-system.vercel.app`，`/api/health` 回 `logisticsEnv=production`。
- 改動：新增物流單區塊預設收合、查看改右側 Drawer（4 tab：配送資訊/Tracking/Notification/Audit）、列表固定高 560px。僅動前端 public/{index.html,app.js,styles.css}；底層 V2.5 Mock Carrier 流程未變（Feature Freeze）。

**SKY Shopping → 物流 Bridge（已打通並上 production）**
- ⚠️ 重要：bridge 程式（`sky-shopping-v1/lib/logisticsBridge.ts` + orders/[id] 觸發）原本只在本機未提交、production 從來沒有 bridge。已於 SKY Shopping main `b88b8a9` 補上並部署。
- 物流端整合接口 `POST /api/integrations/sky-shopping/shipments`，用 header `x-logistics-bridge-secret` 比對物流 env `LOGISTICS_BRIDGE_SECRET`（未設則 403）。
- env（皆 Production scope，共用同一把密鑰）：物流 `LOGISTICS_BRIDGE_SECRET`；SKY Shopping `SKY_LOGISTICS_BRIDGE_ENABLED=true` / `SKY_LOGISTICS_API_URL=https://sky-logistics-system.vercel.app` / `SKY_LOGISTICS_API_SECRET` / `SKY_LOGISTICS_ALLOW_PRODUCTION=true`。
- 觸發點：SKY Shopping admin 改訂單狀態 PUT，`paymentStatus='paid'` 或 shipping shipped/delivered 才送；下單/備貨中不送。
- 回補端點：`POST /api/admin/orders/sync-logistics`（admin auth，commit `f285b06`），帶 `{orderId}` 補單筆、不帶補全部已付款，冪等（物流端以 sourceOrderId 去重）。觸發用 sessionStorage 的 `sky_admin_token`。
- ⚠️ SKY Shopping Production branch = `main`（push main 即上正式站，2026-06-17 實測確認，非舊註的 dev）。
- 留存測試單 `BRIDGE_TEST_1781703625`（物流後台可刪）。

### ⏭️ 下一步規劃：Staging 平行版本（後續功能研發測試）
- 之後要在 **Staging** 開一條與 production 平行的版本，作為後續功能研發 / 測試環境，避免直接動 production。
- 防火牆對齊：依 DATABASE_FIREWALL，Staging 走 `sky-shopping-lab` 的 staging schema、sandbox 金流；物流 Preview(`VERCEL_ENV=preview`)會被判為 staging tier。
- 尚未開始（本次僅記錄規劃，未建立平行版本）。

### SKY Shopping 資料庫防火牆（2026-06-24）

> Project 可能分屬不同 Supabase 帳號；不得以目前登入帳號可見的 Project 數量推論四層架構是否存在。以下角色登記優先於舊文件中互相衝突的 Project Ref 描述。

| Project / Ref | 已登記角色 | Codex 存取規則 |
|---|---|---|
| codexyang's Project | SKY Shopping Production | 禁止修改、migration、測試連線寫入。 |
| `rvrdlofcaerzxktqpbjk` (`sky-shopping-dev`) | Development | 可供本機開發與 Dev-only 測試；不得用於 Production 或 Staging 驗證。 |
| `udfijsgvwihushsylglb` (`sky-shopping-staging`) | Staging | 可供 Preview／Staging 驗證；不得推送或連至 Production。 |
| `kyzwwotjunouzegyfqgz` (`sky-shopping test dev`) | DR-Test / Restore Drill 候選（舊 Test/Staging 登記） | 2026-06-25 已完成 read-only 初盤：12 public tables、`product-images` bucket、Vercel 三專案三環境未見引用。尚未清理、尚未改名；Auth Users / Edge Functions / Policies 尚待補查，未取得使用者批准前禁止清理。必讀 `SKILL-SKY-SHOPPING-DR-RESTORE.md`。 |
| `iynhnfquzvzkvywaitoh` | 舊 DR-Test 候選／待確認 | 使用者後續要求先處理 `kyzwwotjunouzegyfqgz`；不得混用。若要重新操作此 ref，必須重新登入確認 project ref、資料表、筆數、Storage buckets 與 Vercel 引用。 |
| `yafykwpivreqexbcilfm` | 未確認 | 禁止操作，須先查明用途。 |

> 注意：既有 Baseline Backup 報告另記錄 `iynhnfquzvzkvywaitoh`（第 15 字為 `w`）為 Backup Ref，並稱 `...vaitoh` 為舊誤植。2026-06-25 後續決策改為先清點 `kyzwwotjunouzegyfqgz` 作為 DR-Test / Restore Drill 候選；目前只完成 read-only 盤點與 Manifest / Handoff，不代表已批准清理或改名。

**憑證紀錄規則：** Dev 與 Staging 的 `DATABASE_URL`、`DIRECT_URL`、anon key、service-role key 僅存放在專案本機的 `.env.local`／`.env.staging`（皆被 Git 忽略），不得寫入本文件、提交版本控制或貼入交接紀錄。新 Agent 只能讀取鍵名與 Project Ref，需連線時先確認目標環境。

硬規則：

- Production 既有 project 不動、不重設、不拿來測試；不得因本機或單一帳號的可見 Project 清單推論環境架構。
- Backup 先建，確認可還原後再建 Staging / Development。
- Claude / Codex / AI 預設只能連 `Development`。
- 測試付款、訂單、Email/LINE 通知只能連 `Staging`，金流必須 sandbox。
- Backup 不接前台流量，只做每日備份或復原用途。
- 大量商品圖片、AI 語音、數字人影片應放 Object Storage / CDN，不放 PostgreSQL。
- 詳細規格在 SKY Shopping repo：`/Users/yangkean/sky-shopping-v1/DATABASE_FIREWALL.md`。

---

## Pegasustour 現況

- 正式品牌：`Pegasustour`
- 主要系統：訂車首頁 + 旅遊行程 + 多語言 + SKY Shopping 跨站連結。
- 版本文件目前同時保留 V1.5 / V1.53 / V2.0 歷史；最新整合狀態以 `pegasus-booking/VERSION.md` 的 V2.0 記錄與本文件為準。
- 正式站記錄：
  - 舊/既有：`https://pegasustour-v1-5.vercel.app`
  - V2.0 記錄：`https://pegasustour-vip.vercel.app`
- 保護範圍：booking、payment、LINE、Gmail/Email、Excel、order data、language switcher、navbar/logo 鎖定規格。
- 2026-06-14 V2.5 更新：首頁與旅遊頁「更多服務 -> 物流服務」已連到 `https://sky-logistics-system.vercel.app/external`。
- GitHub 分支：`codex/v2.5-logistics-service-link` 已推到 `codexyang/pegasustour-v1.5`。
- PR 建立網址：`https://github.com/codexyang/pegasustour-v1.5/pull/new/codex/v2.5-logistics-service-link`。
- 2026-06-14 重新確認：Pegasustour production HTML 已包含 `https://sky-logistics-system.vercel.app/external`，不再只看到 LINE 連結；物流系統首頁、外部委託表單、Pegasustour production 皆回傳 HTTP 200。

---

## 已知文件衝突處理

| 衝突 | 最新判定 |
|---|---|
| README / 舊文件連到 `AI-AGENT-MASTER.md` | 實際檔名是 `AI_AGENT_MASTER.md`，已改以底線檔名為準 |
| SadTalker 仍被標示為進行中 | 2026-06-11 後視為 legacy；AMY 目前以核准稿朗讀與內容治理為準 |
| AMY 商品頁規格仍寫 AMY-B 自動模板 | 被 `LOCKED_SCRIPT_MODE.md` 覆蓋，禁止自動套稿 |
| SKY Shopping 穩定 commit 有多個記錄 | 保留歷史；實作前以實際 repo Git 狀態確認 |
| Pegasustour V1.53 與 V2.0 並存 | V1.53 是多語言/穩定歷史，V2.0 是兩站整合記錄 |

---

## GitHub 上傳規則

本文件庫 `ai-agent-docs` 可上傳：

- 規格文件、交接文件、規則文件
- 非敏感圖片/PDF/試算表素材
- 可分享的程式碼範例與維護腳本

禁止上傳：

- `.env` / `.env.*`
- OAuth 憑證：`token.json`、`credentials.json`、`client_secret*.json`
- `node_modules/`、`.next/`、build cache
- 系統暫存檔：`.DS_Store`、`~$*`

---

## 下一步建議

1. 先把本文件、主控文件與 `SKILL-STAGING-TO-PRODUCTION.md` 推上 GitHub，完成文件整合。
2. 後續若要動 `pegasus-booking`，進入它自己的 repo 操作，不在外層文件 repo 中直接提交。
3. 後續若要動 AMY，先確認 `approved-scripts/{id}.txt` 是否存在，再做逐字比對流程。
