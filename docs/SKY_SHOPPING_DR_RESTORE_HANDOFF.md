# SKY Shopping DR Restore Handoff

狀態：已合併整理。  
最後更新：2026-06-25

本文件原本是 DR-Test / Restore Drill 的詳細接手紀錄。為避免重複與版本分歧，正式接手內容已合併到：

1. `docs/PROJECT_HANDBOOK.md` — 新 Agent 第一份專案手冊。
2. `docs/DATABASE_MAP.md` — Project / DB / Table / Bucket map。
3. `docs/DR_RESTORE_PLAYBOOK.md` — Restore Drill SOP。
4. `docs/AI_AGENT_SKILL.md` — AI Agent 禁區與行為規則。
5. `docs/AGENT_BOOTSTRAP_CHECKLIST.md` — 開工前 checklist。

目前不可跳過的結論：

- `kyzwwotjunouzegyfqgz` 是 DR-Test / Restore Drill 候選。
- 尚未清理、尚未改名、尚未 restore。
- 尚待補查 Auth Users、Edge Functions、Policies / RLS、Storage object list。
- 未取得使用者批准前，不得清理、DROP、改名、改 env、restore。

下一位 Agent 請從 `docs/MASTER_INDEX.md` 開始，不要只讀本文件。
