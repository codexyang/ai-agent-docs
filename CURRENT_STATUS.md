# Current Status — AI Agent Docs

**最後整理：** 2026-06-14  
**用途：** 本文件是目前 GitHub / 本地文件整合後的最新入口。若舊文件內容與本文件衝突，以本文件、`LOCKED_SCRIPT_MODE.md`、`AMY-CONTENT-GOVERNANCE.md`、`CORE-RULES.md` 為準。

---

## 讀取順序

所有 AI Agent 開工前必讀：

1. `CURRENT_STATUS.md`
2. `LOCKED_SCRIPT_MODE.md`
3. `AMY-CONTENT-GOVERNANCE.md`
4. `AI_AGENT_MASTER.md`
5. `CORE-RULES.md`
6. `ChatGPT-skill.md`
7. 對應專案的 `AGENT-HANDOFF.md` / `PROJECT_STATUS.md`

---

## Repository 分工

| Repo / 路徑 | 用途 | 狀態 |
|---|---|---|
| `/Users/yangkean/Desktop/AI 助理` | `codexyang/ai-agent-docs`，跨 AI 文件與交接資料 | 主控文件庫，已推 GitHub |
| `/Users/yangkean/Desktop/AI 助理/pegasus-booking` | `codexyang/pegasustour-v1.5`，Pegasustour 訂車/旅遊主系統 | 獨立 Git repo，不要塞進外層 repo |
| `/Users/yangkean/Desktop/AI 助理/sky-shopping-v1` | SKY Shopping 文件鏡像/規格資料 | 依文件同步，正式站為獨立服務 |
| `/Users/yangkean/Documents/物流系統建置` | SKY Shopping Logistics System V2.5，獨立物流模組 | 已部署 Vercel production，GitHub remote 尚未建立 |

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
- 物流 Git 狀態：本機 commit `6297113 feat: lock SKY logistics V2.5 production module` 已建立；GitHub remote 尚未建立，`codexyang/sky-logistics-system` 目前不存在。

### SKY Shopping 資料庫防火牆（2026-06-13）

目前先採用 2 Supabase Project / 4 層邏輯防火牆：

```text
sky-shopping-prod
└── Production：正式客戶、正式訂單、正式金流

sky-shopping-lab
├── Backup：外部 pg_dump 或短期 mirror
├── Staging：付款 / 通知 / 訂單測試
└── Development：Claude / Codex / AI 工作區
```

硬規則：

- Production 既有 project 不動，不重設，不拿來測試。
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

1. 先把本文件與主控文件推上 GitHub，完成文件整合。
2. 後續若要動 `pegasus-booking`，進入它自己的 repo 操作，不在外層文件 repo 中直接提交。
3. 後續若要動 AMY，先確認 `approved-scripts/{id}.txt` 是否存在，再做逐字比對流程。
