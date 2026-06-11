# AMY AI 內容治理規範 v1.0

> **制定者：** Yangkean  
> **生效日期：** 2026-06-11  
> **層級：** 法律層級，任何 AI Agent 不得違反  
> **GitHub：** https://github.com/codexyang/ai-agent-docs

---

## 核心聲明

AI 不得自行創作產品介紹內容。  
AMY 只能逐字朗讀正式核准稿（approved-scripts/）。  
AI 工具自行產生的內容，Yangkean 不承擔法律責任。

---

## 硬規則（Hard Rules）

### Rule 1 — 只能逐字朗讀正式文字稿

| 行為 | 狀態 |
|------|------|
| 改字 | ❌ 禁止 |
| 潤稿 | ❌ 禁止 |
| 摘要 | ❌ 禁止 |
| 加產品資訊 | ❌ 禁止 |
| 推測功效 | ❌ 禁止 |

### Rule 2 — 沒有提供資料 = 不准說

無 `approved-scripts/{id}.txt` → AMY 只說：「請洽客服了解更多詳情。」

### Rule 3 — 禁止生成銷售承諾

禁止輸出任何包含以下意涵的句子：
- 改善健康、提升免疫力
- 適合所有人、最有效
- 專家推薦
- 任何醫療效果暗示
- 任何財務保證

### Rule 4 — Script Diff 強制審查

生成任何語音或影片前：
```
AI 輸出稿 vs 正式核准稿
→ 逐字比對
→ 任何差異 → 直接退件，不得生成
```

### Rule 5 — AMY 開場白母版（Locked v1.1）

```
大家好，歡迎來到 SKY Shopping 商城精選館。
今天，很開心與您分享幾款來自台灣在地的特色精品。
包括牛樟芝滴丸、五葉松純露水，以及古坑精品咖啡。
我們希望，透過更安心、更透明的方式，陪您一起認識，真正適合自己的優質商品。
在 SKY Shopping，讓購物不只是選擇，更是一種安心與品質的體驗。
現在，就讓我們一起來看看今天的精選推薦吧。
```

禁止任何 Agent 修改以上文字。逐字鎖定。

---

## 已廢止功能（2026-06-11）

| 功能 | 廢止原因 |
|------|----------|
| `build_script()` in server.py | AI 自動生成介紹，違反 Rule 1 |
| AMY-B 模板自動套用 | AI 自動生成介紹，違反 Rule 1 |

---

## 核准稿管理流程

```
商家提交商品說明文件
↓
Yangkean 審核
↓
存入 approved-scripts/{id}.txt
↓
AMY 才可朗讀
```

---

## 適用系統

| 系統 | 路徑 |
|------|------|
| 本地播放器 | `C:\Users\USER\Desktop\AI 助理\amy-player\` (localhost:8899) |
| Next.js 商城 | `C:\Users\USER\Desktop\AI 助理\sky-shopping-next\` |
| 正式上線版 | https://sky-shopping-v1.vercel.app |

---

## 違規後果

1. AI Agent 若違反以上規則，生成的任何內容視為無效
2. 相關 TTS 音檔、影片檔需立即刪除
3. 事件記錄於 INCIDENT-REPORT.md

---

*最後更新：2026-06-11*
