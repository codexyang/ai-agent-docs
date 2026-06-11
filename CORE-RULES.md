# Pegasustour Core Rules

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

1. `AI_AGENT_MASTER.md`（**最優先**，跨專案主控）
2. `CORE-RULES.md`
3. `AGENT-HANDOFF.md`
4. `ChatGPT-skill.md`

## Fixed Opening Instruction

```text
Before making any changes, read CORE-RULES.md, AGENT-HANDOFF.md, and ChatGPT-skill.md.
Follow Pegasus-booking V1.53 多語言服務版本 rules.
Do not modify unrelated files.
Do not rewrite architecture.
Show git diff before finalizing.
```

## Sync Rule
- Every completed work stage must keep the project-root core rules and this desktop copy aligned when core rules change.
