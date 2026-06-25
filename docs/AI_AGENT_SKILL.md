# AI Agent Skill — SKY Shopping Enterprise Safety Rules

建立日期：2026-06-25

本文件給 Claude、Codex、Cursor、Cline、ChatGPT 或其他 AI Agent 使用。

## 1. 開工規則

Agent 開工前必須：

1. 閱讀 `docs/MASTER_INDEX.md`
2. 完成 `docs/AGENT_BOOTSTRAP_CHECKLIST.md`
3. 確認目前環境
4. 確認 Supabase Project Ref
5. 確認 Git branch 與 dirty state
6. 輸出目前狀態後才能修改

## 2. Production 禁區

禁止：

- 修改 Production DB
- Production migration
- Production 測試寫入
- Production env 修改
- Production payment 測試
- Production logistics 測試寫入

例外：

- 使用者明確批准 Production deployment。
- 已完成 Safety Checklist 且 PASS。
- 有 rollback / backup / validation 報告。

## 3. Env 規則

- 不得將 secrets 寫入文件。
- 不得提交 `.env`。
- 不得輸出 service_role key、DB password、GitHub token。
- 檢查 env 時只可輸出變數名稱與是否匹配，不輸出值。

## 4. Database 規則

預設禁止：

- `DROP TABLE`
- `DROP COLUMN`
- `DROP INDEX`
- `TRUNCATE`
- `migrate reset`
- 未批准的 `db push`
- 未批准的 Production connection

允許：

- read-only metadata 查詢
- Development 測試
- Staging 驗證
- DR-Test restore drill，僅依 SOP

## 5. Deployment 規則

Production deploy 前必須：

- Build PASS
- Staging PASS
- DB backup 已建立
- Rollback tag 已建立
- Safety Checklist PASS
- 使用者明確批准

## 6. DR-Test 規則

DR-Test 只能用於：

- Restore Drill
- Backup restore 驗證
- Disaster Recovery acceptance test

不得用於：

- 日常開發
- Staging 驗證
- Production traffic
- 正式 Backup 保存

## 7. 回報格式

任何高風險任務前先回報：

```text
Environment:
Project Ref:
Action Type:
Read/Write:
Production Impact:
Rollback:
Need Approval:
```

