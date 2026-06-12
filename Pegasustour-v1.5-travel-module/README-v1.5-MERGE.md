# Pegasustour v1.5 Travel Module Merge Pack

Last updated: 2026-06-01

此資料夾是「AI智慧系統旅遊行程-new module」整理出的獨立合併包，用於準備整合到 Pegasus booking 主系統，目標版本為 Pegasustour v1.5。

## 合併原則

- 只合併旅遊行程模組。
- 不覆蓋既有訂車、機場接送、付款、LINE、Gmail、Excel 訂單流程。
- 先以獨立路由 `/travel`、`/travel-admin`、`/api/travel-*` 方式接入。
- 客人端下單正式串接前，仍以客服確認為準。
- 圖片單檔上限維持 2MB，卡片圖建議 250KB 以內。

## 主要檔案

```text
app/travel/page.tsx
app/travel-admin/page.tsx
app/api/travel-packages/*
app/api/travel-marquees/*
app/data/travelPackageDefaults.ts
app/data/travelMarqueeDefaults.ts
app/data/contactChannels.ts
components/TravelPackageCatalog.tsx
components/Logo.tsx
data/travel-packages.json
data/travel-marquees.json
public/images/travel/*
public/images/pegasustour-travel-platform-logo.png
scripts/audit-travel-images.mjs
app/travel-globals-required.css
Travel Module/*
```

## 合併時注意

`components/Logo.tsx` 若主系統已有同名元件，請不要直接覆蓋。建議改名為 `TravelLogo.tsx` 或只取用圖片資產。

`app/travel-globals-required.css` 不是要整份覆蓋主系統 CSS，只需合併其中與以下功能相關的樣式：

- `.marquee-track`
- `.marquee-item`
- `.carousel-row`
- `.carousel-arrow`
- `@keyframes marquee`
- `@keyframes marquee-reverse`

## 目前功能

- 旅遊首頁 `/travel`
- 旅遊後台 `/travel-admin`
- 100 個國內旅遊套裝資料
- 分類搜尋
- 關鍵字搜尋
- 熱門景點 carousel
- 推薦行程 carousel
- AI 個性化推薦 carousel
- 上下跑馬燈
- 後台跑馬燈維護
- 後台行程資料維護
- AI 行程草稿補齊 API
- WhatsApp / LINE 入口

## 下一步

1. 在主系統新分支建立 v1.5 合併版本。
2. 先複製本合併包到主系統，保留相同相對路徑。
3. 合併必要 CSS，不覆蓋主系統既有全域樣式。
4. 執行 `npm run build`。
5. 檢查 `/travel`、`/travel-admin`、訂車首頁、付款、LINE、Gmail、Excel 流程。
6. 使用者確認後，再正式標記 Pegasustour v1.5。
