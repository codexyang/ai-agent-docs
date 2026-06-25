# AI Agent 主控文件 — 接手總入口

**最後更新：** 2026-06-16
**負責人：** Yangkean（Pegasustour VIP）
**適用：** Claude Code / ChatGPT / Codex / 任何接手 AI Agent

> 本文件只保留「接手必須知道的最新判定」。詳細歷史、舊流程、部署紀錄請查 `AI_AGENT_SYNC.md` 與各專案 handoff 文件。若內容衝突，以 `CURRENT_STATUS.md`、`LOCKED_SCRIPT_MODE.md`、`AMY-CONTENT-GOVERNANCE.md`、`CORE-RULES.md` 為準。

---

## 1. 開工必讀順序

1. `CURRENT_STATUS.md` — 最新整合入口與衝突判定
2. `LOCKED_SCRIPT_MODE.md` — AMY 最高優先鐵規
3. `AMY-CONTENT-GOVERNANCE.md` — AMY 內容治理
4. `AI_AGENT_MASTER.md` — 本主控文件
5. `CORE-RULES.md` — 所有專案核心規則
6. `ChatGPT-skill.md` — 跨 AI 精簡同步技能
7. 對應專案的 `AGENT-HANDOFF.md` / `PROJECT_STATUS.md`
8. 若任務是 Staging → Production：加讀 `SKILL-STAGING-TO-PRODUCTION.md`
9. 若任務是 SKY Shopping 推 Production：先執行 `SKILL-SKY-SHOPPING-PRODUCTION-SAFETY.md`
10. 若任務是 SKY Shopping DR-Test / Restore Drill：先讀 `SKILL-SKY-SHOPPING-DR-RESTORE.md`、`docs/SKY_SHOPPING_DR_TEST_RESTORE_BASELINE_MANIFEST.md`、`docs/SKY_SHOPPING_DR_RESTORE_HANDOFF.md`

不要重複問已在文件中的 onboarding 問題；先讀完再執行。

---

## 2. 全域硬規則

- 所有回覆使用繁體中文。
- 穩定優先、增量修改，不重構、不覆蓋鎖定內容。
- 視覺或程式修改必須先 localhost 驗證，再 push / deploy。
- 不確定是否超出範圍時先問使用者。
- Git commit 只包含本次任務相關檔案。
- 禁止上傳 `.env`、token、credentials、client secret、build cache、`node_modules/`。

---

## 3. 專案速查

| 專案 | 正式站 / 入口 | 本地路徑 | 狀態 | 鎖定重點 |
|---|---|---|---|---|
| Pegasustour Booking | `https://pegasustour-vip.vercel.app`；歷史站 `https://pegasustour-v1-5.vercel.app` | `/Users/yangkean/Desktop/AI 助理/pegasus-booking` | V1.53 多語言歷史穩定 + V2.0 整合記錄並存 | `app/layout.tsx` 禁改；booking/payment/LINE/Email/Excel/order data 保護 |
| SKY Shopping | `https://sky-shopping-v1.vercel.app` | `/Users/yangkean/Desktop/AI 助理/sky-shopping-v1` 或 `/Users/yangkean/sky-shopping-v1` | v1.0 穩定鎖定，V2.0 只做 API 互通 | `app/layout.tsx`、`lib/db.ts`、`prisma/schema.prisma` 禁改 |
| SKY Logistics | `https://sky-logistics-system.vercel.app`；公開表單 `/external` | `/Users/yangkean/Documents/物流系統建置` | V2.5 Phase 1 已部署 Production | 外部表單不需登入；後台不可公開；異常流程 `failed -> reviewing -> ready_to_ship` 禁亂改 |
| AMY AI 銷售大使 | Windows 播放器 `localhost:8899` | `C:\Users\USER\Desktop\AI 助理\amy-player\` | `LOCKED_SCRIPT_MODE = TRUE` | 只能逐字朗讀 `approved-scripts/{id}.txt` |

---

## 4. AMY 內容治理

AMY 相關任務一律以 `LOCKED_SCRIPT_MODE.md` 和 `AMY-CONTENT-GOVERNANCE.md` 為最高規則。

- 只能逐字朗讀 `amy-player/approved-scripts/{id}.txt`
- 禁止 AI rewrite / 潤稿 / 摘要 / 擴寫
- 禁止 `build_script()` 或任何自動生成商品介紹稿
- 禁止根據商品資料推測功效或銷售文案
- 無核准稿時只能說：「請洽客服了解更多詳情」
- 生成音訊或影片前必須 Script Diff；差異超過 1 字即退件
- SadTalker / AMY-B 模板文件全部視為 legacy planning，不作為目前實作依據

---

## 5. Staging → Production 部署提醒

最近 SKY Logistics V2.5 從 staging 推 production 的關鍵經驗已整理成：

`SKILL-STAGING-TO-PRODUCTION.md`

部署任務必須特別確認：

- 本地 `npm run build` 與 localhost 核心頁/API 先通過。
- Vercel env 必須與 handoff 文件一致，尤其 `ADMIN_PASSWORD`。
- Vercel env 修改後一定要 redeploy，否則 production 不會吃到新值。
- Production DB 不拿來測試；AI 預設只連 Development / Staging。
- 部署後必測 `/api/health`、登入 API、公開入口、後台保護。
- 成功後更新 `STABLE_LOCK.md`、handoff、`CURRENT_STATUS.md`、本文件與 Claude memory。
- SKY Shopping production 前必須先輸出 `Production Deployment Safety Report`，所有項目 PASS 且使用者明確同意後才可建議部署。

---

## 6. 跨 AI 同步規則

每次工作結束前，依實際變更同步更新：

1. `CURRENT_STATUS.md` — 整體狀態、URL、待辦、衝突判定
2. `AI_AGENT_MASTER.md` — 本主控文件，僅更新最新判定
3. `ChatGPT-skill.md` — ChatGPT / 跨 AI 精簡同步
4. 對應專案的 `PROJECT_STATUS.md` 或 `AGENT-HANDOFF.md`
5. Claude memory：`/Users/yangkean/.claude/projects/-Users-yangkean/memory/`

文件原則：主控文件只放最新結論；歷史細節放 `AI_AGENT_SYNC.md`，避免接手 AI 被重複段落干擾。

---

## 7. 下次接手優先事項

- SKY Logistics：GitHub remote 尚未建立；建立後再 push production lock commit。
- SKY Logistics：執行 `seed-carrier-settings.sql`、建立 staging sandbox、規劃 Phase 2 管理員資料表。
- SKY Shopping：商品詳情頁、金流、Email/LINE 通知、旅遊/訂車 API 加購互通。
- SKY Shopping DR-Test：`kyzwwotjunouzegyfqgz` 已列為 Restore Drill 候選；補查 Auth Users / Edge Functions / Policies 後，再等使用者批准清理與改名。
- Pegasustour：金流與通知正式接入前，先確認 env、payment flow、多語言 QA。
- AMY：任何生成前先確認核准稿存在並做逐字比對。
