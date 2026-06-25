# SKILL — SKY Shopping DR-Test / Restore Drill

建立：2026-06-25  
狀態：精簡版；詳細內容已合併到 `/docs` 正式文件組。

> 觸發條件：使用者提到「DR-Test」「Restore Drill」「還原演練」「Production 壞掉如何復原」「Backup restore」「清理舊 Staging」「改成 DR-Test」時，必須先讀本 SKILL，然後依序讀 `/docs/MASTER_INDEX.md`。

## 必讀文件

1. `docs/MASTER_INDEX.md`
2. `docs/AGENT_BOOTSTRAP_CHECKLIST.md`
3. `docs/DATABASE_MAP.md`
4. `docs/DR_RESTORE_PLAYBOOK.md`
5. `docs/AI_AGENT_SKILL.md`

## 目前 DR-Test 候選

| 項目 | 內容 |
|---|---|
| Project Ref | `kyzwwotjunouzegyfqgz` |
| Supabase URL | `https://kyzwwotjunouzegyfqgz.supabase.co` |
| Current Name | `sky-shopping test dev` |
| Target Name | `SKY Shopping DR-Test Restore` |
| 狀態 | 候選；尚未清理、尚未改名、尚未 restore |

## 不可跳過的規則

- 不得修改 Production。
- 不得連接 Production DB 做測試。
- 不得覆蓋正式 Backup。
- 不得 DROP / TRUNCATE / 清空資料，除非使用者明確批准且目標為非 Production。
- DR-Test 只用於 Restore Drill，不是 Staging、不是 Development、不是正式 Backup。
- 清理前必須補查 Auth Users、Edge Functions、Policies / RLS、Storage object list。
- 所有 env 檢查只能輸出變數名稱或匹配結果，不得輸出 secret 值。

## 下一步標準

依 `docs/DR_RESTORE_PLAYBOOK.md` 執行。若任何文件與本 SKILL 衝突，以 `docs/MASTER_INDEX.md` 指向的正式文件為準。
