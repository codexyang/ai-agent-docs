# AI Agent Sync

Last updated: 2026-06-25

## 2026-06-25 SKY Shopping DR-Test / Restore Drill 基線與接手文件

- 新增 `SKILL-SKY-SHOPPING-DR-RESTORE.md`，作為 SKY Shopping DR-Test / Restore Drill 的固定技能流程。
- 新增 `docs/SKY_SHOPPING_DR_TEST_RESTORE_BASELINE_MANIFEST.md`，定義 Restore Baseline Manifest：保留的 schema/table/bucket/functions/policies、可清除的測試資料範圍、DR-Test 完成後預期狀態、Restore 成功驗證清單。
- 新增 `docs/SKY_SHOPPING_DR_RESTORE_HANDOFF.md`，給下一位 Agent 直接接手。
- 目前 DR-Test 候選 Project 是 `kyzwwotjunouzegyfqgz`，Dashboard name `sky-shopping test dev`，URL `https://kyzwwotjunouzegyfqgz.supabase.co`。
- 已 read-only 盤點：public tables 共 12 張，精確 row counts：`Admin=1`、`AdminLog=59`、`Category=126`、`NotificationLog=1`、`Order=18`、`OrderItem=18`、`Product=123`、`Shipment=1`、`SiteStats=1`、`Supplier=10`、`TrackingEvent=3`、`logistics_store=4`。
- Storage：`product-images` bucket，public=true，8 files。
- SQL migration：Dashboard 顯示 no migrations；未看到 `_prisma_migrations`；只有 Supabase 內建 `auth/realtime/storage` migration tables。
- Vercel env 檢查：`sky-shopping-v1`、`sky-logistics-system`、`pegasustour-v1-5` 的 preview / production / development 均未找到 `kyzwwotjunouzegyfqgz` 或其 Supabase URL。
- 尚未完成：Auth Users count、Edge Functions list、Policies/RLS list、Storage object list、現況 DB dump。
- 結論：`kyzwwotjunouzegyfqgz` 只可列為 DR-Test 候選。未完成補查與使用者批准前，不得清理、不得改名、不得 restore、不得更動 env。

## 2026-06-17 SKY Shopping Production Safety Skill

- 新增 `SKILL-SKY-SHOPPING-PRODUCTION-SAFETY.md`，作為 SKY Shopping staging 推 production 前的固定安全檢查。
- 這份 SKILL 的任務不是部署，而是保護 Production：先檢查環境隔離、DB 風險、程式碼變更範圍、staging 功能測試、build、rollback。
- 沒有輸出完整 `Production Deployment Safety Report` 且全部 PASS，不可建議推 Production。
- 即使全部 PASS，也必須等使用者明確說「可以推 Production」後，才可進入 production 部署建議。
- `SKILL-STAGING-TO-PRODUCTION.md` 已補上：SKY Shopping production 前必須先執行本安全 SKILL。

## 2026-06-16 主控文件精簡與 Production SKILL 整理

- `AI_AGENT_MASTER.md` 已由歷史長文改為精簡接手總入口，只保留最新判定、專案速查、全域硬規則、handoff 更新規則。
- `ChatGPT-skill.md` 已精簡為跨 AI 速查文件，舊的重複歷史段落不再作為主要接手依據。
- 新增/整理 `SKILL-STAGING-TO-PRODUCTION.md`，把 SKY Logistics V2.5 從 Staging 推 Production 的實際踩坑整理成部署技能。
- Production 部署關鍵判定：先 localhost/build，確認 Vercel env，env 修改後必須 redeploy，部署後必測 health/login/page smoke test，最後更新 STABLE_LOCK 與 handoff。
- 主控文件原則：最新結論放 `CURRENT_STATUS.md` 與 `AI_AGENT_MASTER.md`；歷史紀錄放本文件，避免下一個 AI 重讀重複段落。

## 2026-06-14 SKY Logistics V2.5 正式部署與接手狀態

- 物流系統獨立專案路徑：`/Users/yangkean/Documents/物流系統建置`
- 物流 production URL：`https://sky-logistics-system.vercel.app`
- 外部客戶委託表單：`https://sky-logistics-system.vercel.app/external`
- Pegasustour production URL：`https://pegasustour-v1-5.vercel.app`
- Pegasustour「更多服務 -> 物流服務」已連到物流外部委託表單。
- 物流系統後台登入保護已啟用，正式登入由 Vercel env 控制。
- 2026-06-14 後台登入失敗已修復：Vercel `ADMIN_PASSWORD` 已同步並重新部署；`POST /api/login` 回傳 `200 OK`。
- 物流系統 V2.5 本機 commit：`6297113 feat: lock SKY logistics V2.5 production module`
- 物流系統 GitHub remote 尚未建立；`codexyang/sky-logistics-system` 查詢結果為 repository not found，需先建立 GitHub repo 後才能 push。
- Pegasustour GitHub 分支已建立：`codex/v2.5-logistics-service-link`
- Pegasustour GitHub PR 建立網址：`https://github.com/codexyang/pegasustour-v1.5/pull/new/codex/v2.5-logistics-service-link`
- 物流系統接手必讀：`/Users/yangkean/Documents/物流系統建置/AGENT_HANDOFF_V2.5.md`
- 不可亂改：booking/payment/email/LINE/Excel、Pegasustour `app/layout.tsx`、物流 `failed -> reviewing -> ready_to_ship`、外部表單公開入口。
- 2026-06-14 重新確認：Pegasustour production HTML 已包含 `https://sky-logistics-system.vercel.app/external`，表示「更多服務 -> 物流服務」已正確連到物流外部委託表單。
- 2026-06-14 重新確認：`https://sky-logistics-system.vercel.app`、`https://sky-logistics-system.vercel.app/external`、`https://pegasustour-v1-5.vercel.app` 皆回傳 HTTP 200。
- 2026-06-14 05:28 決策：目前選 A，只更新 `sky-logistics-system` 的 Supabase `logistics_store` table，且只做安全初始化。
- 安全初始化範圍：初始化物流商設定資料、建立 carrier 設定結構、保留 `mock` 為目前啟用 carrier、預留黑貓 / 宅配通 / 7-11 / 全家 / 郵局欄位但先設為 `disabled`。
- 禁止事項：不要把 `carrierCode` 從 `mock` 直接改成正式 carrier；不要接正式物流 API key；不要改 `sky-shopping-v1` 的 Supabase schema。
- 最新接手資訊：`sky-logistics-system` 本機程式碼在 `/Users/yangkean/Documents/物流系統建置`；本機程式碼、Vercel 部署、Supabase storage 已接起來。
- 2026-06-14 05:34 GitHub 狀態：目前還不能執行 logistics repo push，因為 `https://github.com/codexyang/sky-logistics-system.git` 回應 `Repository not found`。
- Mac 本機物流 repo 目前乾淨，最新 commits：`58afa87 docs: add safe carrier settings seed`、`6297113 feat: lock SKY logistics V2.5 production module`。
- 下一步必須先在 GitHub 建立 repo `codexyang/sky-logistics-system`，建立後才可在 Mac 執行 `git remote add origin https://github.com/codexyang/sky-logistics-system.git` 與 `git push -u origin main`。
- 在 GitHub repo 建立前，不要先加入 remote，避免 origin 指到不存在的 repo。

## 2026-06-12 文件整合狀態（最新優先）

- 新增 `CURRENT_STATUS.md` 作為所有 AI Agent 的最新整合入口。
- 若舊文件仍提到 SadTalker、AMY-B 模板自動套稿、產品資料自動生成介紹，以 `LOCKED_SCRIPT_MODE.md` 與 `AMY-CONTENT-GOVERNANCE.md` 覆蓋。
- AMY 目前最高規則：只能逐字朗讀 `amy-player/approved-scripts/{id}.txt`；禁止 AI rewrite、`build_script()`、商品推測、銷售文案自動生成。
- README 入口已從錯誤的 `AI-AGENT-MASTER.md` 修正為 `CURRENT_STATUS.md` / `AI_AGENT_MASTER.md`。
- `pegasus-booking/` 是獨立 Git repo，對應 `codexyang/pegasustour-v1.5`，不得作為外層 `ai-agent-docs` 的普通資料夾提交。
- `ai-agent-docs` 用於規格、交接、治理與同步文件；程式修改應進入各自專案 repo 操作。

## 🆕 SKY Shopping v1.0 上線鎖定（2026-06-08）

- **SKY Shopping v1.0 正式上線**：https://sky-shopping-v1.vercel.app（Vercel Ready ✅）
- 穩定 branch：`dev`，commit：`b4364e9`（已 push GitHub）
- 本地路徑：`/Users/yangkean/sky-shopping-v1`
- 桌面同步：`/Users/yangkean/Desktop/AI 助理/sky-shopping-v1/`（AGENTS.md / CORE-RULES.md / SKILLS.md / V2_TODO.md）
- V2.0 策略確認：**獨立連結 + API 互通**，不合併專案
- 🔒 禁止修改（sky-shopping）：`app/layout.tsx`、`lib/db.ts`、`prisma/schema.prisma`
- 待辦（v1.0 後）：ECPay/LINE Pay 金流、Email/LINE 通知、商品詳情頁、V2.0 API 互通
- 詳細待辦：`/Users/yangkean/Desktop/AI 助理/sky-shopping-v1/V2_TODO.md`

## Pegasustour-booking V1.53 穩定版（2026-06-07 鎖定）

- 正式版網址：https://pegasustour-v1-5.vercel.app
- 穩定 commit：`64a8f6f`
- 🔒 禁止修改：`app/layout.tsx`（全站崩潰風險）

---

## Latest Stage Update

- Official current version name is unified as `Pegasustour-booking V1.53 多語言版`.
- Cross-platform requirement added: Mac and Windows must use GitHub `main` as the shared source of truth, avoid OS-specific hard-coded source paths, and keep machine-specific paths in environment variables.
- Order backup default path is now project-relative `data/接送訂單` when `ORDER_BACKUP_DIR` is not set.
- Cross-platform verification passed: source scan found no Mac/Windows absolute paths in core source folders, and `npm run build` passed after the backup-path update.
- Local `main` merge from `feature/english-v1.53` is in progress and rule-file conflicts were resolved.
- Resolved shared rule files:
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/CORE-RULES.md`
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/AGENT-HANDOFF.md`
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/ChatGPT-skill.md`
- `components/LanguageMenu.tsx` remains locked and must not be changed without explicit user unlock.
- Next required actions: finish merge commit on `main`, run build/route checks, then push `main` to GitHub if authentication permits.
- Local merge commit completed: `b08eab2 AGENT HANDOFF: Merge Pegasustour-booking V1.53 多語言版`.
- Build after merge passed; local test server opened at `http://127.0.0.1:3006`.
- HTTP 200 confirmed after merge for `/`, `/travel`, `/en/booking`, `/ja/booking`, `/ko/booking`.
- GitHub PR opened: `https://github.com/codexyang/pegasustour-v1.5/pull/1`.
- GitHub merge is blocked because the PR is not mergeable remotely; local conflict resolution exists in commit `b08eab2`, but `git push origin main` failed due to GitHub HTTPS authentication: `could not read Username for 'https://github.com': Device not configured`.
- GitHub `main` is now synchronized to local V1.53 commit `5d1882f`.
- Windows/Vercel issue found: `/en/travel` used `components/LocalizedTravelPage.tsx`, which only rendered `Home` and `Airport Transfer`.
- Fix in progress/completed locally: multilingual home/travel navbars now render full menu sets:
  - Home
  - Vehicles
  - Tours
  - Airport Transfer
  - Contact
  - More dropdown
  - locked language dropdown
  - LINE
- JA/KO travel navbars were checked at desktop width and show their full localized menu sets.
- `components/LanguageMenu.tsx` remains locked and was not modified.
- GitHub `main` final remote sync commit: `bcdf5b5 AGENT HANDOFF: Restore multilingual nav consistency`.
- Vercel live check passed for `https://pegasustour-v1-5.vercel.app/en/travel`:
  - HTTP 200
  - `x-vercel-cache: MISS`
  - HTML contains `Home`, `Vehicles`, `Tours`, `Airport Transfer`, `Contact`, `More`, `中文 / EN/JA/KO`, and `LINE`.
- Cross-platform note: Windows should pull from GitHub `main` after commit `bcdf5b5` or refresh Vercel deployment to avoid stale short-navbar UI.

## Current Version Context

- Formal stable version: `pegasus-booking V1.5`
- Current working version: `Pegasustour-booking V1.53 多語言版`
- Package version in `pegasus-booking/package.json`: `1.5.3`
- Primary project path: `/Users/yangkean/Desktop/AI 助理/pegasus-booking`
- Current Pegasustour-booking V1.53 多語言版 goal: add English, Japanese, and Korean language support with consistent navbar / logo layout.
- Stable recovery branch: `stable/pegasus-booking-v1.5`
- Active Pegasustour-booking V1.53 多語言版 branch: `feature/english-v1.53`
- Shared core-rule files established in the project root for Codex, Claude Code, Cline, Cursor, and ChatGPT:
  - `CORE-RULES.md`
  - `AGENT-HANDOFF.md`
  - `ChatGPT-skill.md`
- Desktop mirror created:
  - `/Users/yangkean/Desktop/AI 助理/CORE-RULES.md`
- Rule-file GitHub upload scope: only the three project-root rule files should be committed/pushed for this stage.
- Current deployment/merge stage: use `Pegasustour-booking V1.53 多語言版` as the unified name across Mac, Windows, GitHub, Vercel, and AI handoff files.
- `package.json` name changed to `pegasustour-booking`; version remains `1.5.3`.
- Latest local verification:
  - `npm run build` passed.
  - Known Turbopack warning remains for `app/api/payment/paymentStore.ts` tracing through payment status route.
  - Local test server restarted at `http://127.0.0.1:3006`.
  - HTTP 200 confirmed for `/`, `/travel`, `/en`, `/en/booking`, `/ja/booking`, `/ko/booking`.

## Latest Check

- Command run: `npm run build`
- Result: passed
- Latest Pegasustour-booking V1.53 多語言版 build check passed after multilingual navbar consistency updates.
- Build generated routes including `/`, `/booking`, `/airport-pickup`, `/payment`, `/travel`, `/travel-admin`, and the booking/payment/travel API routes.
- Multilingual routes generated: `/en`, `/en/travel`, `/ja`, `/ja/travel`, `/ko`, `/ko/travel`.
- Multilingual booking routes generated: `/en/booking`, `/ja/booking`, `/ko/booking`.
- Local production test server for the latest Pegasustour-booking V1.53 多語言版 check is running on `http://127.0.0.1:3001`. Port `3000` had a permission-locked stale node listener during testing.
- Confirmed HTTP 200 for `/`, `/en`, `/travel`, `/en/travel`, `/en/booking`, `/ja/booking`, and `/ko/booking`.
- Navbar languages were consolidated into shared dropdown component `components/LanguageMenu.tsx`; duplicated inline `English` / `日本語` / `한국어` entries were removed from main navs.
- Latest language-button rule: keep one dropdown button. The button displays `中文/EN/JA/KO` in the same frame with an elegant brand-matched visual treatment for readability; exact colors are not fixed as long as the result is beautiful and consistent. Dropdown options and route behavior remain unchanged.
- Dropdown option labels must remain full readable names: `中文`, `English`, `Japanese`, `Korean`. Do not shorten dropdown options to `EN`, `JA`, `KO`; only the top button may use compact `EN/JA/KO`.
- LOCKED: This language switcher design is now locked for Pegasustour-booking V1.53 多語言版. Do not alter the button layout, dropdown labels, route behavior, color treatment, spacing, or component structure unless the user explicitly unlocks it.
- Logo sizing was standardized through `components/Logo.tsx`: mobile `w-[min(76vw,360px)]`; desktop `clamp(220px, 22vw, 360px)`.
- Booking flow multilingual work uses one shared `components/BookingForm.tsx`; route files are thin wrappers only, so the booking/payment/order logic is not duplicated.
- Fare estimate copy was localized via `components/FareEstimatePanel.tsx` locale prop; fare calculation logic was not changed.
- English/Japanese/Korean booking address display now uses English labels for city, district, airport, pickup, and drop-off through `app/data/locationLabels.ts`; backend submitted values remain Chinese to preserve payment, LINE, Email, Excel, and driver workflows.
- English/Japanese/Korean booking passenger and luggage dropdown display now removes Chinese units and uses short labels to save space: passenger labels use `pax`; luggage labels use `bag 28"+`. Internal option `value` strings remain Chinese on purpose to avoid breaking booking, payment, LINE, Email, Excel, and driver workflows.
- Global floating LINE button is now localized by route through `components/FloatingLineButton.tsx`: `/en` shows `LINE Support`, `/ja` shows `LINE サポート`, `/ko` shows `LINE 상담`, and Chinese pages keep `LINE 立即諮詢`.
- Cross-agent sync files updated:
  - `/Users/yangkean/Desktop/AI 助理/AI_AGENT_SYNC.md`
  - `/Users/yangkean/Desktop/AI 助理/ChatGPT-skill.md`
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/SKILL.md`
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/PROJECT_STATUS.md`
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/VERSION.md`
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/ENGLISH_VERSION_PLAN.md`
  - `/Users/yangkean/Desktop/AI 助理/pegasus-booking/V153_ISOLATION.md`

## Current Git / Worktree Notes

- Current working tree has uncommitted Pegasustour-booking V1.53 多語言版 multilingual and navbar consistency changes.
- Current working tree also includes handoff/sync documentation updates made during this check.
- The change appears limited to `/travel` navbar / marquee styling, shifting to white / amber styling.
- Core booking, payment, Email, LINE, and Excel files were not modified during this version-sync update.
- English/Japanese/Korean version implementation has started: `/en`, `/ja`, `/ko` and travel language routes were added.
- Multilingual booking implementation added: `/en/booking`, `/ja/booking`, `/ko/booking`.
- Structure note: keep multilingual booking pages thin; do not copy the full booking form per language.
- EN/JA/KO location display issue fixed: customers see English location labels such as `Taipei City`, `Zhongzheng District`, and `Taiwan Taoyuan International Airport Terminal 1` while stable internal values are preserved.
- Address UX rule updated: EN/JA/KO address display should follow Google Maps-style English names where possible. Booking pages now include Google Maps lookup links and prompts asking customers to paste the English address exactly as shown on Google Maps.
- Foreign-language booking UI rule updated: visible customer-facing labels must not show Chinese units or Chinese service helper text. Keep internal backend values stable unless the backend contract is intentionally migrated.
- Pegasustour-booking V1.53 多語言版 is now isolated on `feature/english-v1.53`; V1.5 recovery point is `stable/pegasus-booking-v1.5`.

## Latest Visual / Browser Verification

- `/en` opened successfully and displays English homepage copy, language dropdown, LINE/WhatsApp CTAs, and service cards.
- `/en/travel` opened successfully and displays English tour inquiry content, language dropdown, LINE/WhatsApp CTAs, and itinerary cards.
- `/ja`, `/ja/travel`, `/ko`, and `/ko/travel` are present in the production build route table.
- `/en/booking`, `/ja/booking`, and `/ko/booking` are present in the production build route table and return HTTP 200.
- `/en/booking`, `/ja/booking`, and `/ko/booking` were checked on `http://127.0.0.1:3001`; passenger/luggage visible labels and floating LINE button are localized. Chinese option values may still appear in HTML source as internal `value` attributes and must not be treated as a UI regression.
- `npm run build` passed after refining `components/LanguageMenu.tsx` to a more balanced brand-style single-frame language display. Existing Turbopack `paymentStore.ts` tracing warning remains.
- `npm run build` passed after restoring full dropdown option labels in `components/LanguageMenu.tsx`. Existing Turbopack `paymentStore.ts` tracing warning remains.
- Travel page carousel arrows fixed in `components/TravelPackageCatalog.tsx`: scroll distance now uses card width plus a fallback `scrollLeft` update so all left/right arrows reliably move their row.
- Latest clean local test server for the arrow fix: `http://127.0.0.1:3005/travel`; `/travel` returns HTTP 200.
- Travel page visual update: `熱門景點` section restored to the original black/dark background while preserving the same card dimensions and summary structure as the rest of the travel package cards.
- Latest clean local test server for this visual update: `http://127.0.0.1:3006/travel`; `/travel` returns HTTP 200.
- Travel page visual update: `推薦行程` section now uses a soft emerald-to-warm-gold gradient background to create visual contrast from black `熱門景點` while preserving card size and summary structure.
- User-requested test URL `http://127.0.0.1:3006/travel` is running the latest build and returns HTTP 200.
- Recommendation background was strengthened because the first gradient was too subtle: now uses stronger `#d8f5e6 → #fff7d6 → #f1df9a` gradient on `推薦行程`.
- Core-rules stage note: documentation-only stage. No source code changes should be included in the GitHub upload for this stage.
- English hero overlays were darkened to prevent Chinese text embedded in existing image assets from distracting from English copy.

## Warning To Preserve

- Build passes but Turbopack reports a warning:
  - Source: `app/api/payment/paymentStore.ts`
  - Trace path: `app/api/payment/status/route.ts`
  - Meaning: file tracing may be too broad because of filesystem/path operations.
- This is not a build blocker, but it should be reviewed before production deployment.

## Next Recommended Steps

1. Visually QA desktop and mobile navbars at `http://127.0.0.1:3000/`, `/travel`, `/en`, `/en/travel`, `/ja`, `/ja/travel`, `/ko`, `/ko/travel`, and multilingual booking pages.
2. Continue English/Japanese/Korean content QA.
3. Use `./node_modules/.bin/next start -H 127.0.0.1 -p 3000` after `npm run build` for stable local testing.
4. Before Pegasustour-booking V1.53 多語言版 deployment, confirm payment environment variables, payment flow, and multilingual language QA.
5. Keep `pegasus-booking V1.5` protected as the formal stable version while developing `Pegasustour-booking V1.53 多語言版`.
6. Do not merge Pegasustour-booking V1.53 多語言版 into `main` or `stable/pegasus-booking-v1.5` until explicitly approved.
