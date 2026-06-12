# AI 旅遊行程產生器完整功能規格

Last updated: 2026-06-01

## 1. 產品定位

AI 旅遊行程產生器是 Pegasustour VIP 的獨立旅遊模組。

第一階段先建立國內旅遊套裝行程資料庫、統一頁面母板、後台維護、AI 草稿生成、縮圖式行程總覽。

未經使用者批准前，不得接入既有機場接送訂車、付款、LINE 派單、Gmail、Excel 訂單流程。

未來整合 Pegasus booking v1.12.0 後，目標版本為 v1.5.0。

## 2. 核心目標

- 自動產生行程。
- 產生有個性、個別化套裝。
- 每條路線格式一致。
- 支援圖文介紹。
- 支援每日行程。
- 控制每日用車時間。
- 支援後台管理。
- 支援行程模板管理。
- 支援熱門排行。
- 支援 SEO。
- 支援多語系。
- 支援資料庫擴充。
- 支援 API 架構。
- 未來可支援直接下單。
- 未來可支援機場接送加旅遊整合。

## 3. 統一行程格式

每條路線必須使用一致格式：

```text
package id
中文名稱
英文名稱
推薦標籤
適合客群
主題分類
縮圖
Hero 圖
價格區間
行程天數
每日用車時數
接送地點
行程亮點
圖文介紹
每日行程
順路景點推薦
車型建議
費用包含
費用不包含
注意事項
取消 / 改期規則
SEO title
SEO description
語系內容
狀態 active / draft
```

## 4. AI 自動生成規則

AI 產生行程時必須自動：

- 補齊統一格式欄位。
- 產生 3-5 個短亮點。
- 產生圖文介紹。
- 產生每日行程。
- 推薦順路景點。
- 推薦車型。
- 推薦適合客群。
- 推薦路線分類。
- 產生 SEO title / description。
- 產生中英文基本內容。
- 標記需要人工確認的欄位。

AI 不可直接寫入正式資料。

正確流程：

1. 工作人員輸入行程名稱或初稿。
2. AI 產生草稿。
3. 工作人員檢查。
4. 工作人員按下確認儲存。
5. 正式資料寫入 travel package store。

## 5. 每日用車時數限制

硬性規則：

- 每日用車不得超過 11 小時。
- 建議每日車程與景點停留總和控制在 8-10 小時。
- 超過 11 小時必須拆成多日行程或減少景點。

AI 必須自動：

- 控制駕駛時數。
- 安排休息。
- 避免過度拉車。
- 住宿地順路化。
- 避免跨區來回折返。
- 長距離移動時加入休息站或餐食停留。
- 多日行程應讓住宿點靠近隔日路線起點。

每日行程資料建議：

```json
{
  "day": 1,
  "driveHours": 6.5,
  "serviceHours": 9.5,
  "overnightArea": "嘉義 / 阿里山",
  "steps": [
    { "time": "09:00", "title": "出發", "detail": "飯店接送" }
  ],
  "restStops": ["午餐", "下午咖啡"],
  "warnings": []
}
```

## 6. 個性化推薦分類

首頁必須以不同客群呈現 AI 推薦，而不是只有地區分類。

### 適合高資產客

內容方向：

- 米其林。
- 高端住宿。
- 隱藏景點。
- VIP 車款。
- 私人接待。
- 頂級秘境。
- 商務尊榮。

### 適合親子

內容方向：

- 動物園。
- DIY。
- 牧場。
- 輕鬆路線。
- 少換車。
- 親子餐廳。
- 半日或一日輕旅行。

### 適合長輩

內容方向：

- 少步行。
- 舒適景點。
- 溫泉。
- 室內景點。
- 車程分段。
- 餐廳預約。
- 無障礙需求。

### 適合網美

內容方向：

- 打卡景點。
- 夕陽。
- 海岸。
- 花季。
- 咖啡廳。
- 夜景。
- 攝影路線。

## 7. 前台頁面架構

目前採單頁整合，不為 100 個行程建立 100 個頁面。

頁面順序：

1. 上方慢速跑馬燈。
2. Header。
3. Hero 主視覺。
4. 第二條慢速跑馬燈。
5. 分類搜尋。
6. 推薦行程。
7. 熱門行程。
8. AI 個性化推薦分區。
9. 全部行程縮圖卡。
10. 行程時間表母板。
11. 車款與價格母板。
12. 快速預約表單。
13. 服務保證。

行程縮圖卡顯示：

- 縮圖。
- 標籤。
- 行程名稱。
- 英文名稱。
- 亮點。
- 價格。
- 詢價按鈕。
- 同頁展開概要。

## 8. 後台管理

後台路由：

```text
/travel-admin
```

後台能力：

- 新增行程。
- 更新行程。
- 載入既有行程。
- 維護統一母板欄位。
- 維護圖片路徑。
- 維護每日行程。
- 維護費用包含 / 不包含。
- 維護車型方案。
- 維護取消與注意事項。
- 呼叫 AI 補齊母板草稿。
- 儲存到獨立 travel package store。

後台不得：

- 寫入機場接送 Excel。
- 觸發付款。
- 觸發 LINE 派單。
- 觸發 Gmail 訂單信。

## 9. 行程模板管理

模板類型：

- 半日遊。
- 一日遊。
- 二日遊。
- 三日遊。
- 機場接送加旅遊。
- VIP 高端客製。
- 親子。
- 長輩。
- 網美打卡。
- 商務接待。

模板欄位：

```text
template id
template name
days
max service hours per day
default vehicle
default itinerary rhythm
recommended customer type
default included / excluded
default SEO structure
```

## 10. 熱門排行

排行欄位：

- 人氣 NO.1。
- 人氣 NO.2。
- 季節限定。
- 親子推薦。
- 高端推薦。
- 熱門搜尋。
- 客服推薦。

排序來源第一階段可手動。

未來可由：

- 點擊數。
- 詢價數。
- 成交數。
- 季節權重。
- 後台置頂。

共同計算。

## 11. SEO 規格

每個行程即使不建立獨立頁，也必須保留 SEO 資料欄位，方便未來產生分頁或多網域頁面。

SEO 欄位：

```text
seoTitle
seoDescription
keywords
canonicalPath
locale
region
theme
customerType
```

多網域考量：

- 主品牌網域：高端 VIP 包車。
- 英文網域：Taiwan private tour / airport transfer plus tour。
- 中文市場頁：台灣國內包車旅遊。
- 日韓市場頁：短句、多圖、WhatsApp / LINE。

## 12. 多語系

第一階段：

- zh-TW。
- en basic subtitle。

第二階段：

- en。
- ja。
- ko。

多語系資料結構：

```json
{
  "locales": {
    "zh-TW": {
      "name": "九份十分包車一日遊",
      "description": "..."
    },
    "en": {
      "name": "Jiufen & Shifen Day Tour",
      "description": "..."
    }
  }
}
```

## 13. 資料庫設計

第一階段使用：

```text
data/travel-packages.json
```

未來正式上線建議改為：

- Supabase。
- PostgreSQL。
- Google Sheets。
- Headless CMS。

主要資料表：

```text
travel_packages
travel_package_days
travel_package_images
travel_templates
travel_inquiries
travel_rankings
travel_locales
travel_seo
```

## 14. API 架構

現有 API：

```text
GET  /api/travel-packages
POST /api/travel-packages
POST /api/travel-packages/ai-suggest
```

未來 API：

```text
GET    /api/travel-packages?category=&q=&locale=
GET    /api/travel-packages/:id
POST   /api/travel-packages
PATCH  /api/travel-packages/:id
POST   /api/travel-packages/ai-generate
POST   /api/travel-inquiries
POST   /api/travel-quotes
POST   /api/travel-images/audit
GET    /api/travel-rankings
```

AI API 必須採草稿模式，不直接覆蓋正式資料。

## 15. 圖片規格

硬限制：

- 單張圖片不可超過 2 MB。

建議目標：

- Card image: 800 x 600，250 KB 以下。
- Hero image: 1600 x 900，500 KB 以下。
- Gallery image: 900 x 675，300 KB 以下。

圖片不一次建立 100 組。

正確策略：

1. 先用共用壓縮圖。
2. 選定要上架的行程。
3. 製作該行程小圖。
4. 壓縮。
5. 上傳。
6. 後台更新 image path。

檢查指令：

```bash
npm run audit:travel-images
```

## 16. 直接下單與機場接送整合

第一階段不直接下單。

未來流程：

1. 旅客選行程。
2. AI 產生建議路線。
3. 工作人員確認最終報價。
4. 旅客確認。
5. 建立旅遊訂單。
6. 如包含機場接送，才串接機場接送模組。
7. 報價確認後才產生付款連結。

機場接送加旅遊整合規則：

- 機場接送可作為行程前後段。
- 不可自動寫入原本接送訂單。
- 必須有使用者批准與版本整合測試。

## 17. 實作優先順序

### Phase 1

- 100 筆國內行程資料。
- 單頁縮圖整合。
- 分類搜尋。
- 推薦 / 熱門區塊。
- AI 個性化推薦區塊。
- 後台維護。
- AI 草稿生成。
- 圖片大小限制。

### Phase 2

- 行程模板管理。
- 後台圖片管理。
- SEO 欄位。
- 多語系欄位。
- 每日用車時數驗證。
- AI 順路景點推薦。

### Phase 3

- 旅遊詢價單。
- 客服確認報價。
- 旅遊訂單資料表。
- 報價流程。
- 權限管理。

### Phase 4

- 機場接送加旅遊整合。
- 付款連結。
- LINE / WhatsApp 客服通知。
- 多網域 SEO。
- v1.5.0 整合發布。

## 18. 開發注意事項

- 保持檔案小。
- 不要一次上傳大量圖片。
- 不要建立 100 個獨立頁面。
- 不要影響 v1.12.0 穩定訂車系統。
- 每次修改後跑 `npm run build`。
- 圖片加入前跑 `npm run audit:travel-images`。
