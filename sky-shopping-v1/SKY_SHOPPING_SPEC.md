# SKY Shopping v1.0 — 最小可上線版本規格書

## 核心規則（不可違反）
1. Core 核心模組不可亂改
2. 商品、金流、訂單要分開
3. AI 模組不可直接改訂單資料
4. 金流不可寫死在前端
5. 後台操作需有權限控管
6. 先穩定收單，再做 AI 自動化
7. 每次修改前先備份版本

---

## 模組清單

### 1. 商品模組 `/modules/product`
| 欄位 | 型別 | 說明 |
|------|------|------|
| name | string | 商品名稱 |
| images | string[] | 商品圖片 URL |
| category | string | 商品分類 |
| price | number | 商品價格 |
| description | string | 商品描述 |
| stock | number | 庫存數量 |
| isPublished | boolean | 上下架狀態 |

### 2. 購物車模組 `/modules/cart`
- 加入商品
- 修改數量
- 刪除商品
- 計算小計 (price × qty)
- 計算總金額

### 3. 結帳模組 `/modules/checkout`
| 欄位 | 型別 |
|------|------|
| name | string |
| phone | string |
| email | string |
| address | string |
| paymentMethod | 'credit_card' \| 'line_pay' \| 'atm' |
| note | string |

### 4. 訂單模組 `/modules/order`
| 欄位 | 說明 |
|------|------|
| orderId | 訂單編號 (自動產生) |
| customer | 客戶資料快照 |
| items | 商品明細快照 |
| paymentStatus | pending / paid / failed |
| shippingStatus | pending / shipped / delivered |
| createdAt | 訂單時間 |

### 5. 金流模組 `/modules/payment` ⚠️ 獨立，不寫死前端
- Phase 1：信用卡、LINE Pay、ATM 虛擬帳號
- 介面：`PaymentProvider` (可替換)
- 測試階段可用 mock provider

### 6. 通知模組 `/modules/notification`
觸發時機：
- 付款成功 → 客戶 Email + LINE
- 訂單成立 → 客戶 Email + LINE
- 出貨 → 客戶 Email + LINE
- 任何新訂單 → 管理員通知

### 7. AI 模組 `/modules/ai` ⚠️ v1.0 預留，不實作
```
AI 客服 → 讀商品資料 → 回答問題 → 推薦商品 → 轉人工
```
未來擴充：AI CRM、回購提醒、商品推薦、業務雷達、客戶分級

---

## 建議開發順序
```
Step 1  建立專案骨架
Step 2  建立商品資料 (DB schema + seed)
Step 3  首頁 + 商品頁
Step 4  購物車
Step 5  結帳頁
Step 6  訂單資料
Step 7  接金流
Step 8  付款成功頁
Step 9  後台訂單管理
Step 10 AI 客服預留位置
```
