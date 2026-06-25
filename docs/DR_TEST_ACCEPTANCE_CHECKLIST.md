# SKY Shopping DR-Test Acceptance Checklist

建立日期：2026-06-25  
用途：每次 Restore Drill 完成後，使用同一份驗收標準輸出 PASS / FAIL。  
狀態：文件標準；尚未實際操作 DR-Test database。

## 0. 使用規則

- 本 checklist 只用於 DR-Test / Restore Drill。
- 不得用 Production 做驗收測試寫入。
- Payment 必須為 mock / sandbox / disabled-safe mode，不得產生真實交易。
- Logistics 不得連 Production logistics 寫入，除非另有明確 read-only 批准。
- 每一項必須填寫：`PASS` / `FAIL` / `N/A` / `PENDING`。

## 1. Identity / Safety

| 項目 | 標準 | 結果 |
|---|---|---|
| Project Ref | App / env 指向 DR-Test project，例如 `kyzwwotjunouzegyfqgz` | PENDING |
| Production 隔離 | 沒有連 Production DB / Storage / Payment / Logistics 寫入 | PENDING |
| Vercel References | Production / Staging / Preview env 未誤指 DR-Test，或明確為 DR-Test preview | PENDING |
| GitHub References | 文件與 repo 指向正確 branch / commit | PENDING |
| Secret Safety | 沒有在 log / 文件 / commit 輸出 secrets | PENDING |

## 2. Database Restore

| 項目 | 標準 | 結果 |
|---|---|---|
| Database Restore 成功 | Backup dump 可還原到 DR-Test | PENDING |
| Schema | Tables / Columns / Indexes / FK 與 baseline 一致 | PENDING |
| Prisma | Prisma schema / migration state 與 restore strategy 一致 | PENDING |
| Extensions | 所需 extensions 存在 | PENDING |
| Row Counts | 核心 table row count 合理且記錄 | PENDING |
| FK 驗證 | Order / OrderItem / Product / Category / Supplier FK 正常 | PENDING |

## 3. Storage Restore

| 項目 | 標準 | 結果 |
|---|---|---|
| Storage Restore 成功 | 必要 buckets 存在 | PENDING |
| Product Images | 商品圖片可讀取 | PENDING |
| Banner / Uploads | 若 Production-like app 需要，bucket 存在且 policy 正確 | PENDING |
| Missing Image Fallback | 缺圖時 UI 不崩潰 | PENDING |
| Storage Policies | public/private 設定符合 baseline | PENDING |

## 4. Auth / Roles

| 項目 | 標準 | 結果 |
|---|---|---|
| Admin 可登入 | DR-Test admin 登入成功 | PENDING |
| Merchant 可登入 | 若 Merchant 功能已啟用，merchant account 可登入 | PENDING |
| Customer 可登入 | 若會員系統已啟用，customer 可登入 | PENDING |
| Wrong Password | 錯誤密碼必須失敗 | PENDING |
| Session Boundary | Admin / Merchant / Customer 權限不互通 | PENDING |

## 5. Storefront / Checkout

| 項目 | 標準 | 結果 |
|---|---|---|
| 首頁 | 可開啟且核心 UI 正常 | PENDING |
| 商品列表 | 可讀取商品 | PENDING |
| 商品詳情 | 可開啟商品詳情 | PENDING |
| 商品圖片 | 圖片 URL 正常 | PENDING |
| 分類 / 特賣 | Category / flash sale 區塊正常 | PENDING |
| Cart | 可加入購物車 | PENDING |
| Checkout | 結帳流程可走到測試付款 / safe mode | PENDING |
| 建立訂單 | 可建立測試訂單 | PENDING |
| OrderItem | 訂單明細建立正常 | PENDING |

## 6. Payment

| 項目 | 標準 | 結果 |
|---|---|---|
| Payment 測試正常 | 使用 mock / sandbox / disabled-safe mode | PENDING |
| No Real Charge | 不產生真實付款 | PENDING |
| Payment Status | 測試訂單狀態可正確更新 | PENDING |
| Failure Path | 付款失敗流程不崩潰 | PENDING |

## 7. Logistics

| 項目 | 標準 | 結果 |
|---|---|---|
| Logistics 正常 | 物流 Bridge / shipment / tracking 可測 | PENDING |
| No Production Write | 不寫入 Production logistics | PENDING |
| Shipment | 可建立或讀取測試物流單 | PENDING |
| Tracking | Tracking events 正常 | PENDING |
| Notification Logs | 通知紀錄流程安全 | PENDING |

## 8. API Health

| 項目 | 標準 | 結果 |
|---|---|---|
| API Health Check | health endpoint 或核心 API 正常 | PENDING |
| Product API | 商品 API 正常 | PENDING |
| Order API | 訂單 API 正常 | PENDING |
| Admin API | 未授權不可用，授權後可用 | PENDING |
| Logistics API | DR-Test / safe mode 正常 | PENDING |

## 9. RLS / Policies

| 項目 | 標準 | 結果 |
|---|---|---|
| RLS 驗證正常 | RLS / policies 符合 baseline | PENDING |
| Anon Boundary | anon key 只能讀公開資料 | PENDING |
| Service Role Boundary | service role 只存在 server-side | PENDING |
| Admin Boundary | admin-only 資料需授權 | PENDING |
| Storage Policies | Storage 讀寫權限符合預期 | PENDING |

## 10. 最終判定

```text
DR-Test Acceptance Result

Project Ref:
Backup Artifact:
Restore Time:
RTO:
RPO:

Database Restore:
Storage Restore:
Auth:
Storefront:
Checkout:
Payment:
Logistics:
API:
RLS:

Overall: PASS / FAIL
Risks:
Next Action:
```

