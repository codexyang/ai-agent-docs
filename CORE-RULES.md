# Pegasustour + SKY Shopping Core Rules

> **2026-06-12 整合更新：** 最新整體入口為 `CURRENT_STATUS.md`。若本文件與 `CURRENT_STATUS.md`、`LOCKED_SCRIPT_MODE.md`、`AMY-CONTENT-GOVERNANCE.md` 衝突，以後三者較新的鎖定規則為準。

## ⛔ LOCKED_SCRIPT_MODE = TRUE（鐵規）

```
1. 所有影片必須讀 approved_script.txt
2. 禁止 AI rewrite
3. 禁止 build_script()
4. 禁止根據商品推測
5. 禁止自動生成銷售文案
6. Script mismatch > 1字 即退件
```
適用：Claude Code / Codex / ChatGPT / 未來所有 AI  
詳見 `LOCKED_SCRIPT_MODE.md`

---

This desktop copy mirrors the project root `pegasus-booking/CORE-RULES.md`.

## Project
- Current working version: `Pegasustour-booking V1.53 多語言版`.
- Brand name must use: `Pegasustour` (not `Pegasus`, not `PegasusTour`).
- Do not use old `Pegasus` naming in customer-facing UI.

## SKY Shopping v1.0 穩定版（2026-06-08 鎖定）
- 生產網址：https://sky-shopping-v1.vercel.app（Vercel Ready ✅）
- 穩定 branch：`dev`，穩定 commit：`b4364e9`
- 本地路徑：`/Users/yangkean/sky-shopping-v1`
- 主站連結：Pegasustour 4個頁面「更多服務」→「SKY SHOPPING」已指向此網址
- 🔒 禁止修改：`app/layout.tsx`、`lib/db.ts`、`prisma/schema.prisma`

## Pegasustour-booking V1.53 穩定版（2026-06-07 鎖定）
- 正式版網址：https://pegasustour-v1-5.vercel.app
- 最新穩定 commit：`64a8f6f`
- 本地路徑：`/Users/yangkean/pegasus-booking`
- 🔒 禁止修改：`app/layout.tsx`（全站崩潰風險）

## AMY AI 銷售助理（更新 2026-06-11）
- 本地播放器：`C:\Users\USER\Desktop\AI 助理\amy-player\`（localhost:8899）
- 核准稿資料夾：`amy-player\approved-scripts\{id}.txt`
- SadTalker 已廢棄（GT 750M 硬體限制，4-5小時/段，不可用）
- 詳細規範：`AMY-CONTENT-GOVERNANCE.md`（**必讀**）

## 🚨 AMY 內容治理（法律層級，2026-06-11 生效）
**AI 禁止自創台詞。只能逐字朗讀 approved-scripts/{id}.txt 正式核准稿。**
- 無核准稿 → AMY 只說「請洽客服了解更多詳情」
- build_script() 已廢止，不得重新啟用
- 生成前必須 Script Diff（AI稿 vs 正式稿，一字一句比對）
- 詳見：`AMY-CONTENT-GOVERNANCE.md`

## Required Reading
Before making changes, read these project-root files:

1. `CURRENT_STATUS.md`（**最新整合入口**）
2. `LOCKED_SCRIPT_MODE.md`（AMY 最高優先鐵規）
3. `AMY-CONTENT-GOVERNANCE.md`
4. `AI_AGENT_MASTER.md`
5. `CORE-RULES.md`
6. `AGENT-HANDOFF.md`
7. `ChatGPT-skill.md`

## Fixed Opening Instruction

```text
Before making any changes, read CORE-RULES.md, AGENT-HANDOFF.md, and ChatGPT-skill.md.
Also read CURRENT_STATUS.md, LOCKED_SCRIPT_MODE.md, and AMY-CONTENT-GOVERNANCE.md.
Follow Pegasus-booking V1.53 多語言服務版本 rules.
Do not modify unrelated files.
Do not rewrite architecture.
Show git diff before finalizing.
```

## Sync Rule
- Every completed work stage must keep the project-root core rules and this desktop copy aligned when core rules change.
