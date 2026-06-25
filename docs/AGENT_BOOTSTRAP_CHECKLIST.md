# Agent Bootstrap Checklist

任何 AI Agent 在開始修改 SKY Shopping / Logistics / DR-Test 前，必須先完成本清單。

## 1. 文件讀取

- [ ] 閱讀 `docs/MASTER_INDEX.md`
- [ ] 閱讀 `docs/PROJECT_HANDBOOK.md`
- [ ] 閱讀 `docs/SYSTEM_ARCHITECTURE.md`
- [ ] 閱讀 `docs/DATABASE_MAP.md`
- [ ] 閱讀 `docs/DEPLOYMENT_RULES.md`
- [ ] 閱讀 `docs/AI_AGENT_SKILL.md`
- [ ] 閱讀 `docs/CHANGELOG.md`
- [ ] 若任務涉及 DR / restore，閱讀 `docs/DR_RESTORE_PLAYBOOK.md`
- [ ] 若任務涉及事故，閱讀 `docs/EMERGENCY_RUNBOOK.md`

## 2. 環境確認

- [ ] 確認目前任務環境：Development / Staging / Production / Backup / DR-Test
- [ ] 確認目前 Supabase Project Ref
- [ ] 確認 `.env` 或 Vercel env 指向正確 Project
- [ ] 確認沒有使用 Production DB 做測試
- [ ] 確認沒有將 Backup 當作開發 DB
- [ ] 確認 DR-Test 只用於 Restore Drill

## 3. Git / Deploy 狀態

- [ ] 確認目前 Git repo 路徑
- [ ] 確認目前 Git branch
- [ ] 執行 `git status`
- [ ] 確認是否有使用者或其他 Agent 未完成變更
- [ ] 確認目前 Vercel project 與 environment
- [ ] 若要部署，先確認部署目標不是 Production，除非使用者明確批准

## 4. Database / Migration 狀態

- [ ] 確認 Prisma schema 是否與目標 DB 一致
- [ ] 確認是否有未完成 migration
- [ ] 確認是否有 destructive migration
- [ ] 不得執行 `db push`、`migrate deploy`、`migrate reset`、DROP、TRUNCATE，除非使用者明確批准且目標非 Production
- [ ] 若任務涉及 DR-Test，先確認 Manifest 中待補查項目是否已完成

## 5. Health Check

- [ ] Build 可通過
- [ ] Local / Preview 可開啟
- [ ] 主要 API 可回應
- [ ] Admin login 狀態清楚
- [ ] 商品、訂單、付款、物流、Storage 相關風險已列出

## 6. 開工前回報格式

開始修改前，Agent 必須先輸出：

```text
Current Environment:
Supabase Project Ref:
Vercel Project / Env:
Git Branch:
Pending Migrations:
Production Safety:
Known Risks:
Planned Scope:
```

未完成本清單，不得開始修改。

