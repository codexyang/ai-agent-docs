# SKY Shopping — SKILLS 技能清單

## ⚠️ SKILL-00：品牌命名規範（全站強制）

| 正確寫法 | 錯誤寫法（禁用） |
|---------|----------------|
| `Pegasustour VIP` | `PegasusTour` `Pegasustour` `pegasustour VIP` |
| `SKY Shopping` | `Sky Shopping` `sky shopping` |
| `Pegasustour VIP × SKY Shopping` | `Pegasus × SKY` `PegasusTour Shopping` |

**規則：**
- `Pegasustour VIP` — P 大寫，t 小寫，VIP 全大寫，三字固定組合
- `SKY` — 永遠全大寫
- `Shopping` — 首字母大寫
- 每次新增頁面或元件，先 grep `PegasusTour` 確認沒有錯誤大小寫

```bash
# 驗證指令（每次修改後執行）
grep -rn "PegasusTour" app/ components/
# 應該無任何結果
```

---

> Agent 接手時先查此清單，找到對應技能再動手，避免重工。

---

## SKILL-01：商品展示 (Product Display)
**狀態：** ✅ 完成（v1.0 已上線）  
**平台：** Mac / Windows / Mobile (RWD)  
**語言：** 中文 + English  
**功能：**
- 商品卡片 Grid（手機 1 欄 / 平板 2 欄 / 桌機 3 欄）
- 分類 Tabs 篩選
- 商品詳情頁（圖片、名稱、價格、規格選擇、加入購物車）
- 商品名稱 / 描述支援中英雙欄位（nameZh/nameEn）
- `next/image` 自動 WebP 轉換

**檔案位置：**
```
app/[lang]/page.tsx
app/[lang]/products/[id]/page.tsx
components/ProductCard.tsx
modules/product/types.ts  ← 已完成
```

---

## SKILL-02：購物車 (Cart)
**狀態：** ✅ 完成（Zustand persist + CartDrawer）  
**平台：** Mac / Windows / Mobile  
**功能：**
- Zustand store（純前端，不需 API）
- 桌機：側邊 Drawer
- 手機：底部固定欄（已選 N 件｜總額 NT$xxx｜下一步）
- 加入 / 修改數量 / 刪除
- 小計 + 總金額即時計算
- 可選擇「Standalone 獨立購物」或「Booking 加購」模式

**檔案位置：**
```
modules/cart/types.ts      ← 已完成
modules/cart/cartStore.ts  ← 待實作
components/CartDrawer.tsx  ← 待實作
app/[lang]/cart/page.tsx   ← 待實作
```

---

## SKILL-03：結帳 (Checkout)
**狀態：** ✅ 完成（含收件地址必填、手機 RWD、input 16px 防縮放）  
**平台：** Mac / Windows / Mobile  
**語言：** 中文 + English  
**功能：**
- 結帳表單（姓名、電話、Email、地址、付款方式、備註）
- 欄位 placeholder 支援中英切換
- 付款方式選擇（mock → ECPay / LINE Pay）
- 訂單摘要即時顯示
- Booking 整合：旅遊訂單金額 + 加購商品金額 + 總金額

**檔案位置：**
```
app/[lang]/checkout/page.tsx
components/CheckoutForm.tsx
modules/order/types.ts   ← 已完成
```

---

## SKILL-04：金流 (Payment)
**狀態：** mock 完成，真實待接  
**規則：** 金流不可寫死前端，透過 `PAYMENT_PROVIDER` env 切換  
**Phase 1（v1.0）：** mock provider（直接跳成功頁）  
**Phase 2：** 綠界 ECPay（信用卡 + ATM + 超商）  
**Phase 3：** LINE Pay  

**檔案位置：**
```
modules/payment/types.ts        ← 完成（PaymentProvider 介面）
modules/payment/mockProvider.ts ← 完成
modules/payment/index.ts        ← 完成（env 切換）
modules/payment/ecpayProvider.ts ← 待實作
app/api/payment/initiate/route.ts ← 待實作
app/api/payment/callback/route.ts ← 待實作（Webhook）
```

---

## SKILL-05：訂單系統 (Order)
**狀態：** ✅ 完成（訂單 API + 寫入 Supabase）  
**功能：**
- 建立訂單 API（POST /api/orders）
- 訂單編號自動產生（cuid）
- 客戶資料快照（不因資料變更影響歷史）
- 商品明細快照（不因改價影響歷史）
- 付款狀態：pending / paid / failed
- 出貨狀態：pending / shipped / delivered
- 可選擇性綁定 Booking Order（booking_order_id）

**檔案位置：**
```
modules/order/types.ts     ← 完成
modules/order/service.ts   ← 待實作
app/api/orders/route.ts    ← 待實作
prisma/schema.prisma       ← 完成
```

---

## SKILL-06：通知系統 (Notification)
**狀態：** 骨架完成，TODO 填入  
**通道：** Email (Nodemailer) + LINE Notify / LINE Messaging API  
**觸發時機：**
- 訂單成立 → 客戶 Email + LINE
- 付款成功 → 客戶 Email + LINE
- 出貨 → 客戶 Email + LINE
- 任何新訂單 → 管理員通知
**參考：** `pegasus-booking/` 的 LINE 通知寫法

**檔案位置：**
```
modules/notification/index.ts  ← 骨架完成
modules/notification/types.ts  ← 完成
```

---

## SKILL-07：後台管理 (Admin)
**狀態：** ✅ 完成（/sky-admin，訂單展開 + 狀態修改）  
**設計原則：** 一頁三 Tab（商品｜庫存｜訂單），不拆太多選單  
**功能：**
- 商品 CRUD（上下架、圖片、價格、庫存）
- 訂單查詢與狀態更新
- 庫存數量管理
- 需 Auth 保護（沿用 Pegasus 的 auth 邏輯）
**參考：** `pegasustour-v1.5-fixed/` 的後台 auth 和 layout 寫法

**後台路由：**
```
/admin/skyshopping          → Tab 商品
/admin/skyshopping?tab=inventory → Tab 庫存
/admin/skyshopping?tab=orders   → Tab 訂單
```

**檔案位置：**
```
app/(admin)/admin/orders/page.tsx     ← 待實作
app/(admin)/admin/products/page.tsx   ← 待實作
components/admin/OrderTable.tsx       ← 待實作
```

---

## SKILL-08：中英雙語 i18n
**狀態：** ⚠️ 架構設計完成，JSON 待填寫（v1.0 後）  
**方式：** 靜態 JSON（輕量，不用 i18next）  
**URL 設計：**
```
/          → 中文（預設）
/en        → English
```
**商品欄位：** nameZh + nameEn，descriptionZh + descriptionEn  
**切換：** Cookie `NEXT_LOCALE`，語言選擇器在 Header

**檔案位置：**
```
messages/zh.json   ← 待填寫
messages/en.json   ← 待填寫
lib/i18n.ts        ← 待實作
app/[lang]/layout.tsx ← 待實作
```

---

## SKILL-09：RWD 跨平台
**狀態：** 規範定義完成，實作隨各頁面進行  
**斷點：**
```
mobile  < 640px   : 單欄、底部固定購物車
tablet  640-1024px: 雙欄商品卡
desktop > 1024px  : 三欄商品卡、側邊購物車 Drawer
```
**規則：**
- 所有可點擊元素 min-h-[44px]（iOS 觸控規範）
- 圖片全用 next/image（自動 WebP）
- 字型：Noto Sans TC（中文）+ Inter（英文）
- 路徑分隔符永遠用 `/`

---

## SKILL-10：Booking 加購整合
**狀態：** ⏳ 待實作（V2.0 整合時）  
**功能：**
- 旅遊行程頁嵌入「推薦加購」卡片
- Booking checkout 中嵌入加購商品區塊
- sky_orders 可綁定 booking_order_id
- 付款前清楚顯示：旅遊金額 + 加購金額 + 總金額
**參考：** `pegasus-booking/` 的訂單資料結構

---

## SKILL-11：AI 客服預留
**狀態：** 預留，v1.0 不實作  
**未來規劃：**
```
AI 客服 → 讀商品資料 → 回答問題 → 推薦商品 → 轉人工
AI CRM、回購提醒、商品推薦、業務雷達、客戶分級
```
**規則：** AI 模組不可直接修改訂單資料  
**位置：** `modules/ai/`

---

## 跨 Agent 參考地圖

| 需要的功能 | 參考的現有專案 | 參考什麼 |
|-----------|--------------|---------|
| Auth 後台驗證 | `pegasustour-v1.5-fixed/` | auth.ts 邏輯 |
| LINE 通知 | `pegasus-booking/` | LINE Messaging API 寫法 |
| Email 通知 | `gmail-ai/` | Nodemailer 設定 |
| 後台 UI 風格 | `pegasustour-v1.5-fixed/` | Admin layout、Table 樣式 |
| 訂單資料結構 | `pegasus-booking/` | 訂單欄位設計 |

**使用方式：讀取參考，理解模式，用 SKY Shopping 的模組重寫，不要直接 copy 檔案。**
