# SKILL — HANDOFF 交接文件標準（跨品牌、跨 Agent、跨廠牌）

**適用**：Claude Code、Codex、ChatGPT、Cursor、Cline，以及任何未來接手的 AI Agent
**位階**：與 `CORE-RULES.md` 同級，任何 Agent 開工前必讀
**建立**：2026-09-10（System Owner 指示）

---

## 0. 這條規則為什麼存在

交接文件寫得再詳細，**下一個 Agent 找不到就等於沒寫**。

已經發生過的實況：
- HANDOFF 只存在本機某個深層目錄，換一個 Agent 就說「找不到」
- 內容只留在對話記錄或 AI memory 裡，換一家廠牌完全讀不到
- 同一個專案在多個 worktree 各有一份 HANDOFF，不知道哪份是真的

結果就是**重做已經做完的事，浪費額度與時間**。這條規則就是為了終止這件事。

---

## 1. 🚨 存放位置（強制）

一份 HANDOFF 必須**同時**滿足三個條件才算數：

| # | 條件 | 理由 |
|---|------|------|
| 1 | 放在**專案 repo 根目錄**，檔名 `HANDOFF.md` | 與程式碼同生共死，checkout 到哪個版本就看到哪個版本的交接 |
| 2 | **已 commit 且已 push 到 GitHub** | 任何廠牌的 Agent 都能用 URL 或 clone 讀到，不依賴某台電腦 |
| 3 | 在 `HANDOFF-REGISTRY.md` 登記（本 repo 根目錄） | 不知道 repo 在哪的 Agent，從這裡找得到 |

### ⛔ 以下位置一律不算數

- 只存在本機、沒 push（別台電腦、別的 Agent 讀不到）
- 存在 AI memory / 對話記錄 / session transcript（換廠牌就消失）
- 存在單一廠牌的私有目錄：`~/.claude/`、Codex sandbox、Cursor 設定目錄
- 存在 Desktop、Documents 等 repo 以外的散落資料夾
- 只給了本機絕對路徑，沒有 GitHub URL

---

## 2. 寫給「不知道任何前情」的人

接手的 Agent 可能是別家廠牌、沒有你的記憶、沒有你的對話。所以：

- **路徑一律寫完整**：本機絕對路徑 **＋** GitHub URL **＋** branch 名稱。
  只寫 `HANDOFF.md` 或 `專案根目錄` 是無效的
- **不要寫「如同上次討論」「見先前對話」**——下一個人沒有那份對話
- **專有名詞第一次出現要解釋**：`A007`、`T001`、`standby` 對別人都不是常識
- 用**繁體中文**寫，與 System Owner 溝通語言一致

---

## 3. 必填欄位（沿用既有標準，不得減項）

Repository / Branch / HEAD Commit / Working Tree Status / Task / Files Changed /
Decisions Referenced / Current Status / Tests Performed / Test Results /
Known Problems / Pending Work / Production Impact / Commit-Push-Deploy Status /
Recommended Next Action

## 4. 額外必備兩節（實戰補上）

### 4.1 「已做完 —— 不要重做」清單

列出這次接手完成的事＋對應版本＋文件章節。接手的人先看這張表，不會重跑一次探索。

### 4.2 「已確認 —— 不用再查」結論

把查證過的結論寫死，含**判斷依據**。例如：

> OpenAI 是 `401`（帳戶沒錢），不是 429、不是金鑰失效 —— 依據：`wrangler tail` 實際 log。
> 充值後會自己恢復，程式不用改。

這一節最省額度：它擋掉的是「這個之前查過沒有？」的重複調查。

---

## 5. 版本與 rollback 表

每個版本一列：Tag / 檔案 SHA256 / 說明。

🚨 **SHA 必須實際比對後才寫入，禁止憑記憶填。** 驗證方式：

```bash
git show <tag>:<file> | sha256sum
```

一個錯的 SHA 會讓 rollback 回到錯的版本，比沒有這張表更危險。

---

## 6. 交接完成的定義

以下四項全部成立才可以說「交接完成」：

- [ ] `HANDOFF.md` 在專案 repo 根目錄，內容涵蓋 §3 全部欄位與 §4 兩節
- [ ] 已 commit 並 **push 到 GitHub**（`git status` 顯示與 origin 同步）
- [ ] 已在 `HANDOFF-REGISTRY.md` 登記／更新，URL 實際打得開
- [ ] 版本表的 SHA 逐一比對過

**只完成前兩項＝下一個 Agent 仍然找不到。**

---

相關：`CORE-RULES.md`、`HANDOFF-REGISTRY.md`、`docs/AGENT_BOOTSTRAP_CHECKLIST.md`、`docs/AI_AGENT_SKILL.md`
