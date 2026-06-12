# SKY Shopping v1.0 完整規格（用戶確認版）

更新：2026-06-08

---

## 六、v1.0 必做模組

### 1. 商品模組
| 欄位 | 說明 |
|------|------|
| 商品名稱 | 中英雙語（nameZh / nameEn） |
| 商品圖片 | next/image，支援 WebP |
| 商品分類 | 接送 / SIM卡 / 保險 / 一日遊 / 伴手禮 / 票券 |
| 商品價格 | Float，NT$ |
| 商品描述 | 中英雙語（descriptionZh / descriptionEn） |
| 庫存數量 | Int，0 = 無庫存 |
| 上下架狀態 | isPublished: Boolean |

### 2. 購物車模組
| 功能 | 狀態 |
|------|------|
| 加入商品 | ✅ 完成 |
| 修改數量 | ✅ 完成 |
| 刪除商品 | ✅ 完成 |
| 計算小計 | ✅ 完成 |
| 計算總金額 | ✅ 完成 |

實作：Zustand persist（`store/cartStore.ts`）

### 3. 結帳模組
| 欄位 | 必填 |
|------|------|
| 姓名 | ✅ |
| 電話 | ✅ |
| Email | ✅ |
| 收件地址 | ✅（目前為選填，需改為必填） |
| 付款方式 | ✅ |
| 備註 | 選填 |

**待補：** 收件地址欄位目前缺少，需加入 `customerAddress` 必填欄位。

流程：`/cart → /checkout → 建立訂單(pending) → /payment → 付款成功 → /order-success`

### 4. 訂單模組
| 欄位 | 說明 |
|------|------|
| 訂單編號 | cuid() 自動產生 |
| 客戶資料 | 快照（不因資料變更影響歷史） |
| 商品明細 | 快照（不因改價影響歷史） |
| 付款狀態 | pending_payment → paid → failed |
| 出貨狀態 | pending → processing → shipped → completed → cancelled |
| 訂單時間 | createdAt DateTime |

**完整訂單狀態流程：**
```
pending_payment → paid → processing → shipped → completed
                ↓
              cancelled / refund
```

### 5. 金流模組（第一階段）
| 方式 | 狀態 |
|------|------|
| 信用卡（ECPay） | ⏳ 待接入（需簽約） |
| LINE Pay | ⏳ 待接入（需申請） |
| ATM / 虛擬帳號（ECPay） | ⏳ 待接入 |

**架構規則（不可違反）：**
- 金流模組獨立放在 `modules/payment/` 或 `core/payment/`
- 不寫死在前端、不寫死在商品頁
- 只能透過 3 個介面操作：`createPayment()` / `verifyPayment()` / `updateOrderStatus()`
- 透過 `PAYMENT_PROVIDER` 環境變數切換金流
- 未來換金流商只改 provider，不改訂單邏輯

### 6. 通知模組
| 事件 | 客戶 Email | 管理員 LINE |
|------|-----------|------------|
| 訂單成立 | ✅ 需實作 | ✅ 需實作 |
| 付款成功 | ✅ 需實作 | ✅ 需實作 |
| 出貨通知 | ✅ 需實作 | — |

參考：`pegasus-booking/` 的 Nodemailer + LINE Messaging API 做法，不重新發明。

---

## 七、AI 模組預留（v1.0 不實作）

```
AI 客服 → 讀取商品資料 → 回答商品問題 → 推薦商品 → 轉人工客服
```

未來擴充：AI CRM、AI 回購提醒、AI 商品推薦、AI 業務雷達、AI 客戶分級

**規則：`modules/ai/` 只預留，AI 模組不可直接修改訂單資料。**

---

## 八、建議開發順序（v1.0 剩餘）

| 步驟 | 項目 | 狀態 |
|------|------|------|
| Step 1 | 建立專案骨架 | ✅ 完成 |
| Step 2 | 建立商品資料 | ✅ 完成（靜態，待後台真實商品） |
| Step 3 | 首頁 + 商品頁 | ✅ 完成 |
| Step 4 | 購物車 | ✅ 完成 |
| Step 5 | 結帳頁完整化 | ⚠️ 需補收件地址必填 |
| Step 6 | 訂單資料 + API | ✅ 基本完成，需補完整狀態流 |
| Step 7 | 金流接入 | ❌ 待 ECPay/LINE Pay 簽約 |
| Step 8 | 付款成功頁 | ✅ 基本完成 |
| Step 9 | 後台訂單管理 | ⚠️ 基本完成，需補搜尋+狀態流 |
| Step 10 | AI 客服預留 | ✅ 完成（placeholder） |

---

## 九、核心規則（不可違反）

1. Core 核心模組不可亂改
2. 商品、金流、訂單要分開模組
3. AI 模組不可直接改訂單資料
4. 金流不可寫死在前端
5. 後台操作需有權限控管（`x-admin-token` 驗證）
6. 先穩定收單，再做 AI 自動化
7. 每次修改前先備份版本（git commit）

---

## 十、v1.0 最小可上線版本（MVP checklist）

- [ ] 商品展示（首頁 + 商品列表）
- [ ] 加入購物車
- [x] 結帳表單（補收件地址）
- [ ] 金流付款（ECPay 信用卡）
- [ ] 訂單成立（confirmed 狀態）
- [ ] 後台查看訂單
- [ ] Email 訂單通知（客戶 + 管理員）
- [ ] LINE 訂單通知（管理員）

AI 客服、CRM、推薦系統放第二階段。

---

## 目前最優先任務（依現況）

1. **結帳補完** — 加入收件地址必填欄位
2. **訂單狀態流完整化** — pending_payment → paid → processing → shipped
3. **金流接入** — 等 ECPay 簽約，先建好架構
4. **通知模組** — Email（Nodemailer）+ LINE 通知
5. **後台強化** — 訂單搜尋、狀態批次更新
