# SKY Shopping System Architecture

建立日期：2026-06-25

## 1. 系統總覽

SKY Shopping 採分層環境：

```text
Development
   ↓
Staging / Preview
   ↓
Production

Backup  ← 從 Production 匯出 / 保存
DR-Test ← 從 Backup 還原演練，不接正式流量
```

## 2. 主要組件

| 組件 | 用途 |
|---|---|
| GitHub | Source code、branch、tag、rollback commit。 |
| Vercel | Frontend / API deploy：Production、Preview、Development env。 |
| Supabase | PostgreSQL、Auth、Storage、RLS、可能的 Edge Functions。 |
| Storage | 商品圖片、banner、uploads、restore drill 檔案驗證。 |
| SKY Logistics | 物流系統，獨立 Vercel production。 |
| Backup | Production dump / Storage list / restore artifacts。 |
| DR-Test | Restore Drill 專用環境。 |

## 3. 環境職責

| Environment | 主要用途 | 接流量 | AI 可修改 | 可清空 |
|---|---|---:|---:|---:|
| Production | 正式營運 | ✅ | ❌ | ❌ |
| Backup | 備份保存 | ❌ | ❌ | ❌ |
| Staging | 上線前驗證 | 僅測試 | ✅ 限 scope | 視情況，需批准 |
| Development | 開發 | ❌ | ✅ | 可，但需確認非 Production |
| DR-Test | 還原演練 | ❌ | ⚠️ 僅 Restore Drill | 僅依 SOP 並批准 |

## 4. Supabase 分布

| Ref / Project | 目前角色 | 備註 |
|---|---|---|
| codexyang's Project | Production | 禁止 AI 修改。實際 ref 可能在不同帳號中，需由使用者確認。 |
| `rvrdlofcaerzxktqpbjk` | Development | sky-shopping-dev。 |
| `udfijsgvwihushsylglb` | Staging | sky-shopping-staging。 |
| `kyzwwotjunouzegyfqgz` | DR-Test 候選 | 舊 Test/Staging 記錄，已 read-only 初盤。 |
| `iynhnfquzvzkvywaitoh` | 舊 DR-Test 候選 / 待確認 | 不得與 `kyz...` 混用。 |
| `yafykwpivreqexbcilfm` | 未確認 | 禁止操作。 |

## 5. Vercel 專案

目前已知 Vercel team `pegasustour-s-projects`：

| Project | Production URL | 用途 |
|---|---|---|
| `sky-shopping-v1` | `https://sky-shopping-v1.vercel.app` | SKY Shopping 商城 |
| `sky-logistics-system` | `https://sky-logistics-system.vercel.app` | 物流系統 |
| `pegasustour-v1-5` | `https://pegasustour-v1-5.vercel.app` | Pegasustour 旅遊/訂車 |

2026-06-25 檢查：以上三個 project 的 preview / production / development env 未找到 `kyzwwotjunouzegyfqgz`。

## 6. 還原演練關係

```text
Production DB / Storage
        ↓ backup dump / backup artifact
Backup Repository / Backup Storage
        ↓ restore drill
DR-Test Supabase
        ↓ preview/local app validation
Acceptance Test Report
```

DR-Test 不得成為新的正式 Backup，也不得被 Production / Staging Vercel 指向。

