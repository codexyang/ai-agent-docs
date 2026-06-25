# SKY Shopping Enterprise Documentation — Master Index

建立日期：2026-06-25  
用途：所有 Claude、Codex、Cursor、Cline 或其他 AI Agent 接手 SKY Shopping / Logistics / DR 工作前的固定入口。

## 必讀順序

1. `docs/MASTER_INDEX.md`（本文件）
2. `docs/AGENT_BOOTSTRAP_CHECKLIST.md`
3. `docs/PROJECT_HANDBOOK.md`
4. `docs/SYSTEM_ARCHITECTURE.md`
5. `docs/DATABASE_MAP.md`
6. `docs/DEPLOYMENT_RULES.md`
7. `docs/AI_AGENT_SKILL.md`
8. 任務若涉及還原 / 備援：`docs/DR_RESTORE_PLAYBOOK.md`
9. 任務若涉及 Restore Drill 驗收：`docs/DR_TEST_ACCEPTANCE_CHECKLIST.md`
10. 任務若涉及 Restore Script：`docs/RESTORE_SCRIPT_DESIGN.md`
11. 任務若涉及事故：`docs/EMERGENCY_RUNBOOK.md`
12. `docs/CHANGELOG.md`

## 文件地圖

| 文件 | 用途 |
|---|---|
| `SYSTEM_ARCHITECTURE.md` | Production / Backup / Staging / Development / DR-Test 與 GitHub、Vercel、Supabase、Storage、Edge Functions 的關係。 |
| `DATABASE_MAP.md` | Supabase Project 分布、用途、可否修改、tables、buckets、RLS 狀態。 |
| `DEPLOYMENT_RULES.md` | Development → Staging → Production 的部署規則、禁止事項與 rollback 原則。 |
| `DR_RESTORE_PLAYBOOK.md` | Restore Drill SOP、RTO/RPO、驗證清單與報告格式。 |
| `DR_TEST_ACCEPTANCE_CHECKLIST.md` | 每次 Restore Drill 固定驗收標準。 |
| `RESTORE_SCRIPT_DESIGN.md` | Restore script 設計版；只文件化，不代表可執行。 |
| `DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md` | DR-Test Phase 2 唯讀盤點結果：Auth、Edge Functions、RLS、Storage Policies、Extensions。 |
| `DR_TEST_PHASE3_EXECUTION_PROPOSAL_2026-06-25.md` | Phase 3 改造前執行方案：備份、manifest、清理 SQL 草案、改名、restore drill。 |
| `DR_TEST_TARGET_ARCHITECTURE_V2.md` | 使用者提供之 DR-Test / Enterprise V2 目標架構圖的文字化版本，區分 Current Verified 與 Target / Desired。 |
| `AI_AGENT_SKILL.md` | AI Agent 固定行為規則：Production 禁區、migration 禁區、env 禁區、安全檢查。 |
| `PROJECT_HANDBOOK.md` | 新 Agent 第一天讀的專案手冊：用途、repo、deployment、database、storage、git flow、命名規範。 |
| `EMERGENCY_RUNBOOK.md` | Production 出事時的救援流程：停止 deploy、restore、切換、驗證、重新開放。 |
| `CHANGELOG.md` | 重大架構與流程修改記錄。 |
| `AGENT_BOOTSTRAP_CHECKLIST.md` | Agent 開工前必做 checklist。 |

## 目前最高判定

- Production 不得被 AI 直接修改、migration、測試寫入。
- Staging / Development 可用於測試，但必須先確認 env 指向正確 project。
- DR-Test 目前候選為 `kyzwwotjunouzegyfqgz`，尚未清理、尚未改名、尚未 restore。
- `kyzwwotjunouzegyfqgz` 可作 Restore Drill 候選，但 Auth Users / Edge Functions / Policies 仍待補查。
- Backup 是備份用途，不是開發或 staging，不接前台流量。

## 重要補充文件

- `docs/SKY_SHOPPING_DR_TEST_RESTORE_BASELINE_MANIFEST.md`
- `docs/SKY_SHOPPING_DR_RESTORE_HANDOFF.md`
- `docs/DR_TEST_ACCEPTANCE_CHECKLIST.md`
- `docs/RESTORE_SCRIPT_DESIGN.md`
- `docs/DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md`
- `docs/DR_TEST_PHASE3_EXECUTION_PROPOSAL_2026-06-25.md`
- `docs/DR_TEST_TARGET_ARCHITECTURE_V2.md`
- `SKILL-SKY-SHOPPING-DR-RESTORE.md`
- `SKILL-SKY-SHOPPING-PRODUCTION-SAFETY.md`
- `SKILL-STAGING-TO-PRODUCTION.md`
