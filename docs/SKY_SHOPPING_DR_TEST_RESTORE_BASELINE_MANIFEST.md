# SKY Shopping DR-Test Restore Baseline Manifest

狀態：已合併整理。  
最後更新：2026-06-25

本文件原本保存 DR-Test / Restore Drill 的完整基線清單。為避免 Agent 重複閱讀與資訊分歧，正式內容已合併到下列文件：

1. `docs/DATABASE_MAP.md` — Project、Table、Bucket、RLS / Policies、資料庫分布。
2. `docs/DR_RESTORE_PLAYBOOK.md` — Restore Drill SOP、清理前門檻、驗證清單、PASS / FAIL 標準。
3. `docs/PROJECT_HANDBOOK.md` — 新 Agent 接手總覽。
4. `docs/MASTER_INDEX.md` — 固定閱讀順序。

目前 DR-Test 候選：

| 項目 | 內容 |
|---|---|
| Project Ref | `kyzwwotjunouzegyfqgz` |
| Supabase URL | `https://kyzwwotjunouzegyfqgz.supabase.co` |
| Current Name | `sky-shopping test dev` |
| Target Name | `SKY Shopping DR-Test Restore` |
| 狀態 | 候選；尚未清理、尚未改名、尚未 restore |

下一位 Agent 請不要以本文件作為完整操作依據；請從 `docs/MASTER_INDEX.md` 開始。
