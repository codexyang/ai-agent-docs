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

## AMY AI 銷售大使（新增 2026-06-10）
- SadTalker 已安裝：`~/Desktop/SadTalker`，Conda 環境：`sadtalker`
- AMY 照片：`~/Desktop/AI 機器人_Amy/S__11845643.jpg`
- 詳細流程見：`AI_AGENT_MASTER.md` 和 `project_amy_sadtalker.md`

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
