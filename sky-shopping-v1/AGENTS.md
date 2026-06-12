# SKY Shopping v1.0 — Agent 接手說明

> **任何 Agent 接手前必讀此文件。不要重覆其他 Agent 已完成的工作。**
>
> ⚠️ **必讀：[CORE-RULES.md](./CORE-RULES.md)** — 母版型式、色調、品牌命名、安全規則全部在此，違反即視為錯誤。

---

## ⚠️ 最高優先規則：Localhost 優先，確認後才合併

## ✅ V2.0 策略確認（2026-06-08 用戶拍板）

**維持獨立連結，V2.0 只做 API 互通（旅遊加購），不合併專案。**

```
sky-shopping-v1（獨立運作）
  ↕ API 互通
pegasustour-booking（獨立運作）
  → 旅遊行程頁嵌入「推薦加購」→ 呼叫 SKY Shopping API → 一次結帳
```

**不需要合併原因：**
- 各自獨立部署，互不影響
- SKY Shopping 可自由更新金流/商品，不影響主站訂車
- 故障隔離：任一掛掉不影響另一個

**API 互通做法（V2.0 實作重點）：**
- SKY Shopping 開放 `/api/products/addons`（旅遊加購商品）
- pegasustour 旅遊頁呼叫此 API 顯示推薦加購卡片
- 結帳時加入 `bookingOrderId` 綁定旅遊訂單
- 需要加入 API token 驗證（`PEGASUSTOUR_API_KEY`）

---

```
開發流程（V1.0 功能完善）：
sky-shopping-v1 (localhost:3000)
  → 開發 → 測試 → 確認沒問題
    → push dev → Vercel 自動部署
```

**在 localhost 確認以下項目後才能上線：**
- [ ] 商品展示正常（中英雙語）
- [ ] 購物車可加入、修改、刪除
- [ ] 結帳表單可送出
- [ ] 訂單寫入 DB 成功
- [ ] 付款流程（mock）正常
- [ ] 付款成功頁正常顯示
- [ ] 後台訂單可查看
- [ ] Email / LINE 通知正常送出
- [ ] RWD 手機版正常
- [ ] 無 console error

**合併前必做：**
1. 備份 `pegasustour-booking v1.53`（zip 或 git tag）
2. 確認上方清單全部勾選
3. 合併後版本號改為 V2.0

---

## ✅ 穩定版本鎖定（2026-06-08 確認）

**生產網址：** https://sky-shopping-v1.vercel.app  
**狀態：** Vercel Ready ✅，HTTP 200，正常運作  
**穩定 branch：** `dev`  
**穩定 commit：** `b4364e9`  
**主站入口：** Pegasustour 主站「更多服務」→「SKY SHOPPING」已連結  
**主站 repo：** `pegasus-booking/` (GitHub: codexyang/pegasustour-v1.5, main branch)

### 🔒 鎖定規則
- 不得修改 `app/layout.tsx`（曾導致全站崩潰）
- 不得修改 `lib/db.ts`（PrismaPg adapter 設定正確，不動）
- 不得修改 `prisma/schema.prisma`（已與 Supabase 同步）
- 不得移除 `prisma generate` build script
- 需修改以上鎖定項目時，必須先取得使用者明確同意

---

## 當前進度（每次 push 更新這裡）

- [x] Step 0：需求規格確認（SKY_SHOPPING_SPEC.md）
- [x] Step 1：專案骨架、模組型別定義、金流介面、Prisma Schema
- [x] Step 1b：Next.js App Router 專案建立（TypeScript + Tailwind）
- [x] Step 1c：安裝 prisma, @prisma/client, supabase-js, zustand, nodemailer
- [x] Step 2：Prisma 連線 Supabase（`lib/db.ts` + `prisma.config.ts`）
- [x] Step 3：首頁 + 商品列表（母版鎖定，詳情頁待做）
- [x] Step 4：購物車（Zustand persist + CartDrawer + CartButton）
- [x] Step 5：結帳頁（中文表單，mock 付款）
- [x] Step 6：訂單 API + 寫入 Supabase（`/api/orders`）
- [x] Step 7：金流（mock，等待 ECPay/LINE Pay 簽約）
- [x] Step 8：付款成功頁（`/order-success`）
- [x] Step 9：後台訂單管理（`/sky-admin`，訂單展開 + 狀態修改）
- [x] Step 10：AI 客服預留位置（浮動按鈕，Coming Soon）
- [x] 部署至 Vercel（`https://sky-shopping-v1.vercel.app`）
- [x] 主站選單連結（pegasustour-v1.5 更多服務 → SKY SHOPPING）

**⏳ 待完成（v1.0 後）：**
- [ ] Step 7b：金流實際接入（ECPay / LINE Pay）— 等待簽約
- [ ] Step 8b：付款成功 Webhook 處理
- [ ] 商品詳情頁（`/products/[id]`）
- [ ] Email / LINE 訂單通知
- [ ] 全功能 localhost 確認清單 → 合併 V2.0

---

## 已有哪些 Agent 做過什麼（避免重工）

| 專案資料夾 | 負責的 Agent | 已完成內容 | SKY Shopping 可複用 |
|-----------|-------------|-----------|-------------------|
| `pegasustour-v1.5-fixed/` | Pegasus Agent | 旅遊訂單系統、Auth、後台 layout | Auth 邏輯參考、Admin UI 風格 |
| `pegasus-booking/` | Booking Agent | 訂單建立流程、LINE 通知 | 通知模組寫法參考 |
| `gmail-ai/` | Gmail Agent | Email 整合 | Nodemailer 設定參考 |
| `sky-shopping-v1/` | SKY Agent | 本專案（見進度） | — |

**規則：讀取上述專案的邏輯再寫，不要 copy 檔案，只學習模式。**

---

## 技術棧

```
框架：     Next.js 15 App Router (TypeScript)
樣式：     Tailwind CSS v4
資料庫：   Supabase (PostgreSQL) + Prisma ORM
狀態管理：  Zustand（購物車）
金流：     Phase 1 = mock，Phase 2 = 綠界 ECPay / LINE Pay
通知：     Nodemailer (Email) + LINE Notify / Messaging API
語言：     中文（預設）+ English（i18n 切換）
部署：     Vercel（前台）+ Supabase（DB）
```

---

## 跨平台規範（Mac / Windows / 手機）

### RWD 斷點（Tailwind）
```
mobile:   < 640px   → 單欄、底部固定購物車按鈕
tablet:   640–1024px → 雙欄商品卡
desktop:  > 1024px  → 三欄商品卡、側邊購物車
```

### 平台相容注意事項
- 路徑分隔符：永遠用 `/`，不用 `\`（Windows 開發但部署到 Linux）
- 字型：使用 `next/font` 載入 Noto Sans（中文）+ Inter（英文）
- 圖片：全部用 `next/image`，支援 WebP 自動轉換
- 觸控：所有可點擊元素 min-height 44px（iOS 規範）

---

## 中英雙語（i18n）

### 架構：`/messages/` 靜態 JSON（不用 i18next，保持輕量）
```
messages/
  zh.json    ← 中文（預設）
  en.json    ← English
```

### URL 設計
```
/              → 中文首頁（預設）
/en            → English homepage
/en/products   → English product list
/checkout      → 結帳（語系跟隨 cookie）
```

### 國際化商品欄位
Product 模型加入：
```typescript
nameEn: string        // English product name
descriptionEn: string // English description
```

---

## 目錄結構（完整版）

```
sky-shopping-v1/
├── app/
│   ├── [lang]/                    ← 語系動態路由 (zh | en)
│   │   ├── page.tsx               ← 首頁
│   │   ├── products/
│   │   │   └── [id]/page.tsx      ← 商品詳情
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── order-success/page.tsx
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── products/page.tsx
│   │   │   └── orders/page.tsx
│   │   └── layout.tsx             ← ⚠️ 後台 layout，需 auth
│   └── api/
│       ├── products/route.ts
│       ├── orders/route.ts
│       └── payment/
│           ├── initiate/route.ts
│           └── callback/route.ts
├── modules/                       ← ⚠️ 核心模組，各自獨立
│   ├── product/types.ts           ✅ 完成
│   ├── cart/types.ts              ✅ 完成
│   ├── order/types.ts             ✅ 完成
│   ├── payment/                   ✅ 介面 + mock 完成
│   ├── notification/              ✅ 骨架完成
│   └── ai/                        ⚠️ 預留，不實作
├── messages/
│   ├── zh.json                    ← 中文語系
│   └── en.json                    ← English
├── components/
│   ├── ProductCard.tsx            ← RWD，支援中英
│   ├── CartDrawer.tsx             ← 手機底部抽屜
│   ├── CheckoutForm.tsx
│   └── admin/OrderTable.tsx
├── lib/
│   ├── db.ts                      ← Prisma client singleton
│   ├── auth.ts                    ← 後台驗證
│   └── i18n.ts                    ← 語系工具函數
├── prisma/schema.prisma           ✅ 完成
├── messages/zh.json
├── messages/en.json
├── .env.example                   ✅ 完成
├── AGENTS.md                      ← 本文件
├── SKILLS.md                      ← 所有可複用技能清單
└── SKY_SHOPPING_SPEC.md           ← 完整規格
```

---

## 如何啟動

```bash
# 1. 安裝套件（已完成）
npm install

# 2. 設定環境變數
cp .env.example .env.local
# 填入 DATABASE_URL（Supabase connection string）

# 3. 初始化資料庫
npx prisma migrate dev --name init
npx prisma db seed

# 4. 啟動開發
npm run dev
# → http://localhost:3000    中文版
# → http://localhost:3000/en English 版
```

---

## Git 分支規則

```
main  → 穩定版，可上線
dev   → 開發中，每個 Step 在這裡
```

**每個 Step 完成後必做：**
1. 更新本文件的進度勾選
2. `git add . && git commit -m "feat: Step X — ..."`
3. `git push origin dev`

---

## 核心規則（不可違反）

1. `modules/` 各模組獨立，不可跨模組直接 import 繞過介面
2. 金流透過 `PAYMENT_PROVIDER` 環境變數切換，**不寫死前端**
3. `modules/ai/` 只預留，v1.0 不實作，不動
4. 後台路由 `(admin)/` 必須有 auth 保護
5. 每個 Step 完成後 commit + push
6. **不重覆其他 Agent 的工作**，先讀本文件再動手
