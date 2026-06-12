# SKY Shopping — CORE RULES
> 任何 Agent 接手前必讀。這些規則由用戶親自確認鎖定，不得違反。

## ✅ 穩定版鎖定狀態（2026-06-08 確認）

| 項目 | 值 |
|------|-----|
| 正式版網址 | https://sky-shopping-v1.vercel.app |
| 穩定 branch | `dev` |
| 穩定 commit | `b4364e9` |
| 部署狀態 | Vercel Ready ✅，HTTP 200 |
| 本地路徑 | `/Users/yangkean/sky-shopping-v1` |

**🔒 以下檔案絕對禁止修改（未經用戶明確同意）：**
- `app/layout.tsx` — 全站崩潰風險
- `lib/db.ts` — PrismaPg adapter 設定正確，不動
- `prisma/schema.prisma` — 已與 Supabase 同步
- `prisma/prisma.config.ts` — Prisma v7 格式已確認
- `package.json` build script 中的 `prisma generate`

---

---

## 🔴 一、母版型式鎖定（2026-06-07 確認）

Header / Footer / 色系已鎖定，**除非用戶明確要求，否則不得修改**。

| 項目 | 規格 |
|------|------|
| Header 高度 | 160px |
| Logo | `pegasustour-logo-1.png`，height 148px |
| SKY 字體 | 36px，金色 `#c9a227`，letterSpacing 3px |
| Shopping 字體 | 34px，白色 `#ffffff` |
| 標語 | 11px，金色 70% 透明，letterSpacing 3px，uppercase |
| Header 背景 | `rgba(13,13,13,0.97)` + blur，金色下邊線 |
| 頂部跑馬燈 | 金底 `#c9a227`，黑字 |
| Navbar | 「首頁」「商品總覽」直接連結 + 「更多服務 ▼」下拉選單（hover 展開） |
| Hero 背景 | 暖白漸層 `#fffbf0 → #fff8e7 → #f0f4ff` |
| 特色橫幅 | 白底黑字 |
| 商品區背景 | 淺米色 `#f8f7f4` |
| 商品卡片 | 白底，各分類彩色漸層圖示區 |
| Footer 背景 | `#080808`，金色標題 |

**⚠️ 此版型已由用戶於 2026-06-07 二次確認鎖定。任何視覺修改必須先獲得用戶明確同意。**

---

## 🔴 二、Slogan 永久鎖定

```
"Let every trip be perfect."
```
必須出現在首頁 Footer 品牌描述區。任何情況下不得修改、刪除或移位。

---

## 🔴 三、禁止順手修改

- 只動用戶**明確點名**的檔案或元件
- 發現相關檔案需要一起改 → **先告知用戶，取得同意後再動手**
- 不得以「保持一致性」為由自行擴大修改範圍

---

## 🔴 四、色調規則

- **明亮色系為主軸**（Hero、商品區、特色橫幅）
- 深色只保留在必要位置：Header、Footer
- 主色：金色 `#c9a227`
- 不得全站套用深色背景

---

## 🔴 五、品牌命名規範

| 正確 | 錯誤 |
|------|------|
| `Pegasustour` | `PegasusTour` / `pegasus tour` |
| `SKY Shopping` | `Sky Shopping` / `sky shopping` |
| `SKY`（全大寫） | `Sky` |

---

## 🔴 六、安全規則（金流 / 後台）

- 金流設定 **不可寫死在前端**，必須透過環境變數 `PAYMENT_PROVIDER` 切換
- 任何 `NEXT_PUBLIC_` 開頭的變數**不得存放機敏資料**
- 後台 `/sky-admin` 所有 API 必須驗證 `x-admin-token`
- AI 模組不可直接修改訂單資料

---

## 🟡 七、開發流程規則

```
sky-shopping-v1 (localhost:3000)
  → 開發 → 測試通過
    → 合併 pegasustour-booking v1.53
      → 版本升級 V2.0
```

**合併前必須在 localhost 確認所有功能正常，不得直接推上主站。**

---

## 🟡 八、技術規範

- 框架：Next.js 15 App Router（TypeScript + Tailwind CSS v4）
- DB：Supabase PostgreSQL + Prisma 7（`prisma.config.ts` 模式，無 `url` in schema）
- 密碼：bcryptjs，Admin 帳號存 DB
- Session token：`base64(timestamp:username:passwordHash[:8])`，server-side 驗證
- `checkAdminToken()` 為 **async**，所有呼叫處必須 `await`

---

## 🔴 九、Vercel 部署必要條件（2026-06-07 確認）

**以下設定缺一不可，否則 build 失敗：**

| 項目 | 設定值 | 原因 |
|------|--------|------|
| `package.json` build script | `prisma generate && next build` | Vercel 不自動執行 prisma generate |
| `app/page.tsx` 首行 | `export const dynamic = 'force-dynamic'` | 防止 build 時嘗試連 DB（ENETUNREACH） |
| Vercel 環境變數 | `DATABASE_URL` = Supabase connection string | 缺少則所有 DB 查詢失敗 |
| Vercel 環境變數 | `ADMIN_PASSWORD` = bcrypt hash | 後台登入用，不得設為 NEXT_PUBLIC_ |

**`prisma.config.ts` 正確格式（Prisma v7）：**
```ts
import path from 'node:path'
import { defineConfig } from 'prisma/config'
export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
})
```
⚠️ 不得加 `earlyAccess: true` 或 `migrate: {}` — Prisma v7 已移除這些選項。

---

## 📁 核心檔案清單（不得隨意刪除或重構）

| 檔案 | 說明 |
|------|------|
| `app/page.tsx` | 首頁（母版已鎖定） |
| `app/sky-admin/page.tsx` | 後台管理頁 |
| `components/ProductCard.tsx` | 商品卡片（白底彩色版） |
| `lib/adminAuth.ts` | Admin token 驗證（async） |
| `lib/db.ts` | Prisma client singleton |
| `prisma/schema.prisma` | DB 結構 |
| `app/api/admin/auth/route.ts` | 登入 API |
| `public/pegasustour-logo-1.png` | Header Logo |
| `public/pegasustour-logo.png` | 浮水印 Logo |
