# SKY Shopping v1.0 → V2.0 待辦清單

更新：2026-06-08

## 目前狀態
- ✅ 網站上線：https://sky-shopping-v1.vercel.app
- ✅ 主站連結：Pegasustour「更多服務」→「SKY SHOPPING」
- ✅ 穩定版鎖定：`dev` branch，commit `b4364e9`
- ✅ V2.0 策略確認（2026-06-08 用戶拍板）：**維持獨立連結，V2.0 只做 API 互通（旅遊加購），不合併專案**

---

## 🔴 優先修復（上線前必做）

### 商品管理
- [ ] 後台 `/sky-admin` 新增真實商品（目前為靜態假資料）
- [ ] 商品圖片上傳至 Supabase Storage 或 CDN
- [ ] 商品庫存數量設定

### 金流接入
- [ ] ECPay 綠界信用卡接入（需簽約）
  - 環境變數：`ECPAY_MERCHANT_ID`、`ECPAY_HASH_KEY`、`ECPAY_HASH_IV`
- [ ] LINE Pay 接入（需申請）
- [ ] ATM 虛擬帳號（ECPay）
- [ ] 付款成功 Webhook（`/api/payment/callback`）
- [ ] 訂單狀態更新（pending → paid）

### 通知系統
- [ ] 訂單成立 → 客戶 Email（Nodemailer）
- [ ] 訂單成立 → 管理員 LINE 通知
- [ ] 付款成功 → 客戶 Email 確認信
- [ ] 出貨通知 Email

---

## 🟡 功能完善

### 商品頁面
- [ ] 商品詳情頁 `/products/[id]`（目前無詳情頁）
- [ ] 商品分類篩選優化
- [ ] 商品搜尋功能

### 購物車 / 結帳
- [ ] 結帳表單驗證強化
- [ ] 訂單確認頁（下單後顯示完整訂單摘要）
- [ ] 訂單查詢（客戶用 Email + 訂單編號查詢）

### 後台管理 `/sky-admin`
- [ ] 商品 CRUD（新增、編輯、刪除、上下架）
- [ ] 訂單狀態批次更新
- [ ] 庫存預警提醒
- [ ] 基本銷售報表

---

## 🟢 V2.0 整合（API 互通）

### Pegasustour 旅遊行程加購
- [ ] 旅遊行程頁嵌入「推薦加購商品」卡片（SKY-10）
- [ ] 訂車結帳頁加入加購商品區塊
- [ ] SKY Shopping API 對外開放（需驗證 token）
- [ ] 一次結帳：旅遊金額 + 加購商品金額合計
- [ ] 訂單關聯：`bookingOrderId` 綁定旅遊訂單

---

## 🔵 未來規劃（v2.0 後）

- [ ] 中英雙語完整實作（SKILL-08，`messages/zh.json` + `en.json`）
- [ ] AI 客服整合（SKILL-11，預留位置已在 `/sky-admin`）
- [ ] 會員系統（登入、訂單歷史、收藏）
- [ ] 行銷功能（優惠碼、限時特價）
- [ ] Google Analytics / 訂單轉換追蹤

---

## 環境變數清單（Vercel sky-shopping-v1）

| 變數名稱 | 狀態 | 說明 |
|---------|------|------|
| `DATABASE_URL` | ✅ 已設定 | Supabase pooler (port 6543) |
| `ADMIN_PASSWORD` | ✅ 已設定 | bcrypt hash |
| `DIRECT_URL` | ⚠️ 未確認 | Supabase direct (port 5432)，migration 用 |
| `ECPAY_MERCHANT_ID` | ❌ 未設定 | 金流接入後加 |
| `ECPAY_HASH_KEY` | ❌ 未設定 | 金流接入後加 |
| `ECPAY_HASH_IV` | ❌ 未設定 | 金流接入後加 |
| `LINE_CHANNEL_ACCESS_TOKEN` | ❌ 未設定 | 通知用 |
| `NOTIFY_EMAIL` | ❌ 未設定 | 管理員收件 Email |
| `SMTP_*` | ❌ 未設定 | Nodemailer 設定 |
