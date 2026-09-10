# HANDOFF 登記簿 —— 所有專案交接文件的固定入口

**用途**：任何 AI Agent（Claude / Codex / ChatGPT / Cursor / Cline，任何廠牌）要接手任何一個專案時，
**先來這裡查該專案的 HANDOFF 在哪**，不要憑印象找、不要問「找不到」。

**規則見** `SKILL-HANDOFF.md`。新專案完成交接後**必須回來這裡登記**，否則視為交接未完成。

**最後驗證**：2026-09-10（下表每一列都以 `git cat-file -e origin/<branch>:<path>` 實際確認過檔案存在於遠端）

---

## 登記表

| 專案 | GitHub Repo | Branch | HANDOFF 路徑 | 狀態 |
|------|-------------|--------|--------------|------|
| **Pegasustour LINE AI 客服 Worker** | `codexyang/pegasustour-line-ai`（private） | `main` | `HANDOFF.md` | ✅ 最新 v2.8.0（2026-09-10） |
| **SKY Shopping** | `codexyang/sky-shopping-v1` | `main`／`dev`／各 feature branch | `HANDOFF.md`、`HANDOFF-V2.53.md` | ✅ 四個分支內容相同（blob `28f7e2e3`） |
| **Pegasustour 業務雷達** | `codexyang/pegasustour-ai-business-radar` | `master`（非 main） | `HANDOFF_WINDOWS_V1.55.md` | ✅ 在遠端 |
| **SKY Shopping DR / Restore** | `codexyang/ai-agent-docs`（本 repo） | `main` | `docs/SKY_SHOPPING_DR_RESTORE_HANDOFF.md` | ✅ 在遠端 |
| **Travel Module（Pegasustour v1.5）** | `codexyang/ai-agent-docs`（本 repo） | `main` | `Pegasustour-v1.5-travel-module/Travel Module/NEW_MODULE_HANDOFF.md` | ✅ 在遠端 |
| **SKY-AI-OS** | `codexyang/ai-agent-docs`（本 repo） | `main` | `SKY-AI-OS/09_AGENT_HANDOFF.md` | ✅ 在遠端 |
| **AI STUDY LAB 線上教育平台** | `codexyang/ai-study-lab`（private） | `main` | `COURSE-CATALOG.md`（教材總覽） | ✅ 2026-09-10 建立 |
| **每日備份自動化（Guardian）** | 未進 repo | — | 本機 `C:\Users\USER\sky-backup\HANDOFF-GUARDIAN.md` | ⚠️ **只在本機，其他 Agent 讀不到**，待補 |

---

## 讀取方式（不必 clone 整包）

```bash
# 已有本機 clone
git fetch origin && git show origin/<branch>:<path>

# 沒有本機 clone，直接抓（private repo 需 gh auth）
gh api repos/codexyang/<repo>/contents/<path> --jq '.content' | base64 -d
```

---

## ⚠️ 找 HANDOFF 時容易踩的坑

1. **分支不是都叫 `main`** —— 業務雷達是 `master`。用錯分支會說「檔案不存在」。
2. **同一個 repo 有多個本機 worktree**，各自 checkout 不同分支。
   SKY Shopping 至少有 `sky-shopping-v1`／`-staging`／`-hardening`／`-parity`／`-release-docs`
   五個目錄，**內容目前相同**，但仍以 GitHub 上的版本為準，不要拿本機某個目錄當真相。
3. **AI STUDY LAB 的平台程式碼還沒上 GitHub** —— repo 目前只有教材與治理文件。
   Next.js app、產線腳本、影片母檔仍只在本機
   `C:\Users\USER\Documents\Codex\ai-study-lab-release`（50 commits，**無 remote**）。
   要動平台程式碼先確認來源。
4. **Pegasustour LINE Worker 不在 Desktop**，在
   `C:\Users\USER\Documents\Codex\2026-09-08\referenced-chatgpt-conversation-this-is-an\work\pegasustour-line-worker`。
   找不到就直接從 GitHub 讀，不要在硬碟裡亂翻。
5. 有 HANDOFF 不代表它是最新的 —— **先看文件開頭的「最後更新」與 Production 版本**，
   再跟該 repo 的實際 HEAD 對照。

---

## 登記一個新專案

1. 依 `SKILL-HANDOFF.md` 在該專案 repo 根目錄寫 `HANDOFF.md`
2. commit + **push 到 GitHub**
3. 回來這張表加一列，把 branch 與路徑寫清楚
4. 用上面的讀取指令**實際驗證一次讀得到**，才更新「最後驗證」日期
