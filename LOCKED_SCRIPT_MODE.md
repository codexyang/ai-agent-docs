# LOCKED_SCRIPT_MODE = TRUE
# 鐵規 — 任何 AI Agent 不得違反，不得繞過，不得覆蓋

**制定者：** Yangkean  
**生效日期：** 2026-06-11  
**適用範圍：** Claude Code / Codex / ChatGPT / 未來所有 AI Agent  

---

## 鐵規清單

```
LOCKED_SCRIPT_MODE = TRUE

1. 所有影片必須讀 approved_script.txt
2. 禁止 AI rewrite
3. 禁止 build_script()
4. 禁止根據商品推測
5. 禁止自動生成銷售文案
6. Script mismatch > 1字 即退件
```

---

## 執行細則

| 規則 | 說明 | 違反後果 |
|------|------|----------|
| 1. 讀 approved_script.txt | 每次播放前從檔案讀取，不得使用記憶體快取的舊版 | 退件，不得播放 |
| 2. 禁止 AI rewrite | 不得潤稿、改字、重新排列、摘要、擴寫 | 退件，記錄違規 |
| 3. 禁止 build_script() | 此函數已廢止，不得重新加入任何類似函數 | 強制刪除，退件 |
| 4. 禁止商品推測 | 無核准稿的商品，AMY 只說「請洽客服了解更多詳情」 | 退件 |
| 5. 禁止銷售文案 | 禁止生成任何促銷語、功效聲稱、推薦語 | 退件，記錄違規 |
| 6. 1字退件制 | AI輸出 vs approved_script 差異超過1字，直接退件 | 立即停止，記錄diff |

---

## 核准稿路徑

```
amy-player/approved-scripts/{id}.txt
```

- `1.txt` — 牛樟芝滴丸
- `2.txt` — 五葉松純露水
- `3.txt` — 古坑精品咖啡

**無檔案 = 無聲音。禁止例外。**

---

## AMY 開場白（唯一母版，Locked v1.1）

```
大家好，歡迎來到 SKY Shopping 商城精選館。
今天，很開心與您分享幾款來自台灣在地的特色精品。
包括牛樟芝滴丸、五葉松純露水，以及古坑精品咖啡。
我們希望，透過更安心、更透明的方式，陪您一起認識，真正適合自己的優質商品。
在 SKY Shopping，讓購物不只是選擇，更是一種安心與品質的體驗。
現在，就讓我們一起來看看今天的精選推薦吧。
```

---

## Agent 接手必讀順序

```
1. LOCKED_SCRIPT_MODE.md   ← 本文件（最高優先）
2. AGENTS.md               ← 操作規範
3. AMY-CONTENT-GOVERNANCE.md ← 完整治理規則
```

**任何 Agent 未讀本文件即開始操作，視為違規。**

---

*最後更新：2026-06-11 | 負責人：Yangkean*
