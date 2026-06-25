# SKY Shopping Deployment Rules

建立日期：2026-06-25

## 1. 標準路徑

```text
Development
   ↓
Staging / Preview
   ↓
Production
```

Backup 與 DR-Test 不在正常部署路徑中。

```text
Production → Backup → DR-Test Restore Drill
```

## 2. 環境規則

| 環境 | 可開發 | 可測試 | 可部署 | 可 Migration | 備註 |
|---|---:|---:|---:|---:|---|
| Development | ✅ | ✅ | ❌ | ✅ 限 dev | 可重建，但需確認 ref。 |
| Staging | ⚠️ 限驗證 | ✅ | Preview only | ⚠️ 需批准 | 用於上線前驗證。 |
| Production | ❌ | ❌ | ✅ 僅批准後 | ❌ 預設禁止 | 正式營運，不拿來試錯。 |
| Backup | ❌ | ❌ | ❌ | ❌ | 只保存備份。 |
| DR-Test | ❌ | ✅ Restore only | ❌ | ⚠️ 僅 restore SOP | 不接正式流量。 |

## 3. Production Deploy 前置條件

必須全部通過：

- Build PASS
- Staging Preview PASS
- Mobile / Desktop smoke test PASS
- Login PASS
- 商品頁 / 購物車 / 結帳 / 訂單 PASS
- OrderItem / FK PASS
- 物流 Bridge PASS
- Payment safe / sandbox 確認
- Production DB backup 已建立
- Rollback tag 已建立
- 使用者明確 Production Approval

## 4. 禁止事項

- 禁止直接在 Production DB 上測試。
- 禁止 AI 自行修改 Production env。
- 禁止未批准 migration。
- 禁止 destructive migration。
- 禁止將 DR-Test / Backup 設為 Production env。
- 禁止因 Preview 正常就直接推 Production。

## 5. Rollback 原則

Rollback 優先順序：

1. Vercel rollback 到上一個 Ready deployment。
2. Git rollback 到已知 tag / commit。
3. 若 DB 已被破壞，停止 deploy，進入 `EMERGENCY_RUNBOOK.md`。
4. 若需 restore，依 `DR_RESTORE_PLAYBOOK.md` 先在 DR-Test 驗證，再決定 Production 恢復方案。

## 6. 版本鎖定

每次 Production deploy 完成後，必須記錄：

- commit hash
- tag
- Vercel deployment id
- Production URL
- DB backup artifact
- validation result
- rollback procedure

