# Localhost 優先測試規則（全專案強制）

> **Locked 2026-06-10 | 負責人：Yangkean**
> 適用於所有 AI Agent：Claude Code / Codex / ChatGPT / 未來 Agent

---

## 核心規則

**任何修改，必須先在 localhost 本機測試確認無誤，才能部署到正式站。**

❌ 禁止未經 localhost 測試直接 `git push` 到 main/production  
❌ 禁止未經 localhost 測試直接更新 Vercel 正式版  
❌ 禁止任何 AI Agent 自行跳過測試流程  

---

## 各專案測試流程

### SKY Shopping
```
本地修改
↓
cd sky-shopping-next && npm run dev
↓
瀏覽器 http://localhost:3000 確認
↓
確認無誤 → git push → Vercel 自動部署
```

### Pegasustour Booking
```
本地修改
↓
cd pegasustour-v1.5-fixed && npm run dev
↓
瀏覽器 http://localhost:3000 確認
↓
確認無誤 → git push → Vercel 自動部署
```

### AMY AI 模組
```
本地生成語音/影片
↓
localhost 商品頁測試 AmyCard 元件
↓
確認無誤 → 整合到正式商品頁
```

---

## Why

曾因直接修改 `app/layout.tsx` 未經測試，導致 Pegasustour 全站崩潰。此規則為防止類似事故的硬性規定。

---

## 部署前 Checklist

- [ ] `npm run dev` 啟動成功，無 console error
- [ ] 目標功能在瀏覽器正常運作
- [ ] 未破壞其他現有頁面
- [ ] 備份當前版本（重大更新前）
- [ ] 確認品牌命名正確（SKY Shopping 商城精選館）

---

*此規則寫入：AGENTS.md（sky-shopping-next）、CORE-RULES.md、AI_AGENT_MASTER.md*
