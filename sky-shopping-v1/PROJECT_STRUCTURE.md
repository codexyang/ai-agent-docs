# SKY Shopping v1.0 — 專案目錄結構

```
sky-shopping-v1/
├── app/                          # Next.js App Router
│   ├── (shop)/                   # 前台購物
│   │   ├── page.tsx              # 首頁：商品列表
│   │   ├── products/
│   │   │   └── [id]/page.tsx     # 商品詳情頁
│   │   ├── cart/page.tsx         # 購物車頁
│   │   ├── checkout/page.tsx     # 結帳頁
│   │   └── order-success/page.tsx # 付款成功頁
│   ├── (admin)/                  # 後台（需登入）
│   │   ├── admin/
│   │   │   ├── page.tsx          # 後台首頁
│   │   │   ├── products/page.tsx # 商品管理
│   │   │   └── orders/page.tsx   # 訂單管理
│   │   └── layout.tsx            # 後台 Layout（含權限檢查）
│   └── api/                      # API Routes
│       ├── products/
│       │   ├── route.ts          # GET 商品列表
│       │   └── [id]/route.ts     # GET 單一商品
│       ├── orders/
│       │   ├── route.ts          # POST 建立訂單
│       │   └── [id]/route.ts     # GET 訂單詳情
│       └── payment/
│           ├── initiate/route.ts # POST 發起金流
│           └── callback/route.ts # 金流回調（webhook）
│
├── modules/                      # ⚠️ 核心模組，各自獨立
│   ├── product/
│   │   ├── types.ts              # Product 型別定義
│   │   ├── service.ts            # 商品資料存取邏輯
│   │   └── schema.ts             # DB Schema
│   ├── cart/
│   │   ├── types.ts
│   │   └── cartStore.ts          # Zustand store（純前端）
│   ├── checkout/
│   │   └── types.ts
│   ├── order/
│   │   ├── types.ts
│   │   └── service.ts            # 訂單建立 / 查詢
│   ├── payment/
│   │   ├── types.ts              # PaymentProvider 介面
│   │   ├── mockProvider.ts       # 測試用假金流
│   │   ├── ecpayProvider.ts      # 綠界（之後接）
│   │   └── index.ts              # 統一入口（切換 provider）
│   ├── notification/
│   │   ├── emailService.ts       # Email 通知
│   │   ├── lineService.ts        # LINE Notify / Messaging API
│   │   └── index.ts              # 統一觸發入口
│   └── ai/                       # ⚠️ 預留，v1.0 不實作
│       └── .gitkeep
│
├── components/                   # 共用 UI 元件
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   └── AdminOrderTable.tsx
│
├── lib/
│   ├── db.ts                     # DB 連線（Prisma / Supabase）
│   └── auth.ts                   # 後台驗證
│
├── prisma/
│   └── schema.prisma             # 資料庫 Schema
│
└── .env.example                  # 環境變數範本
```

## 環境變數（.env.example）
```
DATABASE_URL=
NEXTAUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=

# 金流（Phase 1 用 mock，之後填入真實值）
PAYMENT_PROVIDER=mock
ECPAY_MERCHANT_ID=
ECPAY_HASH_KEY=
ECPAY_HASH_IV=
LINE_PAY_CHANNEL_ID=
LINE_PAY_CHANNEL_SECRET=

# 通知
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
LINE_NOTIFY_TOKEN=
LINE_CHANNEL_ACCESS_TOKEN=
```
