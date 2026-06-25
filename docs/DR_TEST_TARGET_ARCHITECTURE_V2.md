# SKY Shopping DR-Test Target Architecture V2

建立日期：2026-06-25  
來源：使用者提供之「SKY Shopping 資料庫結構知識全景圖（DR-Test 現況）」圖片  
重要聲明：本文件是目標架構 / 知識藍圖，不等於目前 Supabase `kyzwwotjunouzegyfqgz` 已存在的實際資料庫狀態。實際現況以 `docs/DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md` 為準。

## 1. 使用方式

後續 Claude / Codex / 其他 Agent 必須分清楚：

- **Current Verified**：已由 Supabase read-only 盤點確認存在。
- **Target / Desired**：圖片中的完整 Enterprise V2 / Production-like 目標架構。
- **Gap**：目前缺少，未來需由 migration / restore / schema design 建立。

不得把 Target 架構誤判為現有 DB 已存在，也不得因目前 DB 缺少 Target 表就重複設計或直接 DROP / CREATE。

## 2. Current Verified — DR-Test 目前已確認

Project：

| 項目 | 值 |
|---|---|
| Project Ref | `kyzwwotjunouzegyfqgz` |
| Project Name | `sky-shopping test dev` |
| Supabase URL | `https://kyzwwotjunouzegyfqgz.supabase.co` |
| 狀態 | DR-Test / Restore Drill 候選 |

已確認 public tables：

| Table | Rows |
|---|---:|
| `Admin` | 1 |
| `AdminLog` | 59 |
| `Category` | 126 |
| `NotificationLog` | 1 |
| `Order` | 18 |
| `OrderItem` | 18 |
| `Product` | 123 |
| `Shipment` | 1 |
| `SiteStats` | 1 |
| `Supplier` | 10 |
| `TrackingEvent` | 3 |
| `logistics_store` | 4 |

已確認 Storage：

| Bucket | Public | Files |
|---|---:|---:|
| `product-images` | true | 8 |

已確認 Auth / Edge / RLS：

| 項目 | 現況 |
|---|---|
| Auth Users | 0 |
| Edge Functions | 未看到已部署 functions |
| RLS | 多數 public tables disabled；`logistics_store` enabled |
| Policies | `logistics_store` 有一條 service role manage policy |

已確認 Extensions：

- `pg_stat_statements`
- `pgcrypto`
- `plpgsql`
- `supabase_vault`
- `uuid-ossp`

## 3. Target / Desired — 圖中目標架構

以下是圖片中呈現的 Enterprise V2 / Production-like 目標模組。

### 3.1 使用者與權限

Target tables：

- `profiles`
- `user_roles`
- `role_permissions`
- `merchants`
- `merchant_users`

用途：

- 使用者基本資料
- 使用者角色
- 角色權限
- 商家資料
- 商家使用者

### 3.2 商品與分類

Target tables：

- `categories`
- `products`
- `product_images`
- `product_variants`
- `brands`

用途：

- 商品分類
- 商品主資料
- 商品圖片
- 商品規格 / 變體
- 品牌

### 3.3 訂單系統

Target tables：

- `orders`
- `order_items`
- `order_payments`
- `order_status_history`
- `order_coupons`

用途：

- 訂單
- 訂單項目
- 付款紀錄
- 狀態歷史
- 優惠券使用

### 3.4 物流系統

Target tables：

- `shipments`
- `shipping_providers`
- `tracking_events`
- `shipping_rates`
- `shipping_addresses`

用途：

- 出貨單
- 物流商
- 追蹤紀錄
- 運費規則
- 地址

### 3.5 庫存與倉儲

Target tables：

- `warehouses`
- `inventory`
- `inventory_movements`
- `stock_adjustments`
- `warehouse_products`

用途：

- 倉庫
- 庫存
- 庫存移動
- 庫存調整
- 倉庫商品

### 3.6 購物與結帳

Target tables：

- `carts`
- `cart_items`
- `wishlists`
- `wishlist_items`
- `checkout_sessions`

用途：

- 購物車
- 購物車項目
- 收藏清單
- 收藏項目
- 結帳 session

### 3.7 行銷與優惠

Target tables：

- `coupons`
- `promotions`
- `banners`
- `campaigns`
- `campaign_targets`

用途：

- 優惠券
- 促銷活動
- 首頁 banner
- 行銷活動
- 活動對象

### 3.8 評價與內容

Target tables：

- `reviews`
- `review_images`
- `faqs`
- `faq_categories`
- `cms_pages`

用途：

- 商品評價
- 評價圖片
- 常見問題
- FAQ 分類
- 內容頁面

### 3.9 通知系統

Target tables：

- `notifications`
- `notification_templates`
- `user_notifications`
- `email_logs`
- `sms_logs`

用途：

- 通知紀錄
- 通知模板
- 使用者通知
- Email 紀錄
- SMS 紀錄

### 3.10 管理與日誌

Target tables：

- `admin_logs`
- `login_logs`
- `activity_logs`
- `system_settings`
- `audit_logs`

用途：

- 管理操作日誌
- 登入日誌
- 活動日誌
- 系統設定
- 稽核日誌

### 3.11 統計與報表

Target tables：

- `site_stats`
- `daily_stats`
- `sales_reports`
- `top_products`
- `traffic_sources`

用途：

- 網站統計
- 每日統計
- 銷售報表
- 熱門商品
- 流量來源

## 4. Target Storage Buckets

圖片中的目標 buckets：

| Bucket | 用途 | Public |
|---|---|---|
| `product-images` | 商品圖片 | 否 / 需依實際策略確認 |
| `avatars` | 使用者頭像 | 否 |
| `merchant-kyc` | 商家 KYC 文件 | 否 |
| `invoices` | 發票檔案 | 否 |
| `logistics-files` | 物流文件 | 否 |
| `banners` | 行銷橫幅 | 是 |
| `others` | 其他檔案 | 否 |

Current Verified 差異：

- 目前只確認 `product-images` 存在。
- 目前 `product-images` 是 public bucket，且有 8 files。
- 其他 buckets 目前未確認存在。

## 5. Target Edge Functions

圖片中的目標 Edge Functions：

- `send-order-confirmation`
- `update-order-status`
- `generate-invoice`
- `webhook-payment`
- `webhook-shipping`
- `image-optimizer`
- 其他約 10+ functions

Current Verified 差異：

- 目前 Dashboard 未看到已部署 Edge Functions。
- `Deploy a new function` 按鈕存在，但未執行。

## 6. Target Extensions

圖片中的目標 extensions：

- `pgcrypto`
- `uuid-ossp`
- `pgjwt`
- `pg_stat_statements`
- `pg_trgm`
- 其他 extension

Current Verified：

- 已存在：`pgcrypto`
- 已存在：`uuid-ossp`
- 已存在：`pg_stat_statements`
- 已存在：`plpgsql`
- 已存在：`supabase_vault`
- 未確認 / 未看到：`pgjwt`
- 未確認 / 未看到：`pg_trgm`

## 7. Target RLS / Policies

圖片目標：

- 所有主要資料表啟用 RLS。
- 使用者只能存取自己的資料。
- 商家只能存取自己的商品與訂單。
- 管理員有完整存取權限。
- 公開資料可讀，例如商品與分類。

Current Verified 差異：

- 多數 public tables 目前 RLS disabled。
- `logistics_store` RLS enabled。
- `logistics_store` 目前有 policy：`service role can manage logistics store`。

## 8. Gap Summary

| 區塊 | Current Verified | Target / Desired | Gap |
|---|---|---|---|
| Tables | 12 public tables | 40+ tables | 需要 schema design / migration / restore |
| Buckets | 1 bucket | 7 buckets | 需要 bucket strategy |
| Auth Users | 0 | Admin / Merchant / Customer | 需要 DR-Test users |
| Edge Functions | none visible | 10+ functions | 需要 deploy / restore |
| RLS | mostly disabled | RLS fully enabled | 需要 policy design |
| Extensions | 5 installed | additional pgjwt / pg_trgm | 需確認必要性 |
| Merchant | not present | merchant module | Enterprise V2 待設計 |
| Inventory | not present | warehouse / inventory | Enterprise V2 待設計 |
| Marketing | not present | campaigns / banners | Enterprise V2 待設計 |

## 9. Agent Rules

任何 Agent 使用本目標架構時：

1. 先讀 `docs/DR_TEST_PHASE2_READONLY_REPORT_2026-06-25.md`。
2. 再讀本文件。
3. 不得把 Target tables 當成已存在。
4. 不得直接對 DR-Test 建表或 migration，除非進入批准的 Enterprise V2 / Restore Drill SOP。
5. 所有 schema 新增必須先產出 migration plan、diff、rollback plan。
6. Production 不得受影響。

## 10. 下一步建議

Phase 3 真正執行前，建議先完成：

1. 現況 DB dump。
2. Storage object manifest。
3. Enterprise V2 target schema diff。
4. Restore Drill dry-run。
5. 使用者批准。

本文件目前只作為知識庫與目標藍圖，不觸發任何資料庫操作。
