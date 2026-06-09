# ChatGPT-skill

## ⚠️ 所有 AI 接手必讀主控文件
**`/Users/yangkean/Desktop/AI 助理/AI_AGENT_MASTER.md`**
包含：所有專案狀態、AMY 影片生成流程、電腦環境、跨 AI 同步規則。每次工作結束必須更新。

---

## AMY AI 銷售大使（SKY Shopping 宣傳影片）— 新增 2026-06-10

- **SadTalker 已在本機安裝完成**（Intel Mac, macOS 12.7.6）
- **AMY 照片：** `~/Desktop/AI 機器人_Amy/S__11845643.jpg`
- **SadTalker 路徑：** `~/Desktop/SadTalker`
- **Conda 環境：** `sadtalker`（Python 3.10, Miniforge）
- **生成影片指令：**
  ```bash
  conda activate sadtalker
  cd ~/Desktop/SadTalker
  say -v Meijia "文字內容" -o ~/Desktop/amy_speech.aiff && \
  ~/miniforge3/envs/sadtalker/bin/ffmpeg -i ~/Desktop/amy_speech.aiff -ar 16000 -ac 1 ~/Desktop/amy_speech.wav -y
  caffeinate -d python inference.py --driven_audio ~/Desktop/amy_speech.wav --source_image ~/Desktop/AI\ 機器人_Amy/S__11845643.jpg --result_dir ./results --enhancer gfpgan
  ```
- **Intel Mac 速度：** 30 秒影片約需 2 小時
- **文字稿以用戶最新版本為主，AI 不得自行更改**

---

## SKY Shopping v1.0 穩定版鎖定（2026-06-08）

Updated: 2026-06-08 07:30 CST

- **SKY Shopping v1.0 已正式上線並鎖定為穩定版**
- 生產網址：https://sky-shopping-v1.vercel.app（Vercel Ready ✅，HTTP 200）
- 穩定 branch：`main`，穩定 commit：`3f30b8e`
- 本地路徑：`/Users/yangkean/sky-shopping-v1`
- 技術棧：Next.js 16.2.7 + Supabase + Prisma 7.8.0（PrismaPg adapter）+ Zustand
- 主站連結：Pegasustour 4個頁面「更多服務」→「SKY SHOPPING」已指向此網址
- 🔒 鎖定項目（不得修改）：`app/layout.tsx`、`lib/db.ts`、`prisma/schema.prisma`、build script 中的 `prisma generate`
- ✅ Vercel 已連結 GitHub（Pegasustour's projects），push `main` 自動部署
- ✅ 結帳頁 bug 修復：input 文字顏色、手機版單欄、TypeScript build error
- 待辦（v1.0 後）：ECPay/LINE Pay 金流接入、Email/LINE 訂單通知、商品詳情頁、全功能 localhost 確認 → 合併 V2.0

## Latest Pegasustour-booking V1.53 多語言版 Update

Updated: 2026-06-06 18:05 CST

- Official current version name is unified as `Pegasustour-booking V1.53 多語言版`.
- Cross-platform requirement: Mac and Windows must use GitHub `main` as the shared source of truth.
- Source code must avoid OS-specific hard-coded absolute paths.
- Machine-specific filesystem paths must be configured through environment variables such as `ORDER_BACKUP_DIR`.
- If `ORDER_BACKUP_DIR` is not set, local order backups default to project-relative `data/接送訂單`.
- Cross-platform verification passed: source scan found no Mac/Windows absolute paths in core source folders, and `npm run build` passed after the backup-path update.
- Project path: `/Users/yangkean/Desktop/AI 助理/pegasus-booking`
- Shared rules now live in the project root:
  - `CORE-RULES.md`
  - `AGENT-HANDOFF.md`
  - `ChatGPT-skill.md`
- All agents must read `CORD-RULES.md` if present, then `CORE-RULES.md`, `AGENT-HANDOFF.md`, and `ChatGPT-skill.md` before changes.
- `components/LanguageMenu.tsx` is locked. Top button stays `中文/EN/JA/KO`; dropdown labels stay `中文`, `English`, `Japanese`, `Korean`.
- Protected flows remain: booking, payment, email, LINE, Excel, order data, and stable V1.5 recovery branch.
- Merge to `main` is being completed; build and route checks must pass before final handoff.
- Local merge commit completed: `b08eab2 AGENT HANDOFF: Merge Pegasustour-booking V1.53 多語言版`.
- GitHub PR opened: `https://github.com/codexyang/pegasustour-v1.5/pull/1`.
- GitHub upload/merge is currently blocked by local GitHub HTTPS authentication for `git push origin main`; PR is not mergeable remotely until conflicts are resolved on GitHub or local commit `b08eab2` is pushed.
- 2026-06-06 16:24 CST update: GitHub `main` is synchronized to V1.53 commit `5d1882f`.
- Windows/Vercel navbar mismatch identified: multilingual travel page only rendered two nav items. Local fix completed in shared localized navbar components; EN/JA/KO travel navbars now show full desktop menu sets.
- `components/LanguageMenu.tsx` remains locked and was not modified.
- 2026-06-06 17:24 CST update: GitHub `main` final sync commit is `bcdf5b5 AGENT HANDOFF: Restore multilingual nav consistency`.
- Vercel live `/en/travel` returns HTTP 200 and contains the full English navbar.

## 目的

本 Skill 用於「AI 智慧機場接送訂車平台 / Pegasustour VIP / Pegasus booking 1.0」專案同步檢查。

主要任務是協助檢查：

- VS Code 專案狀態
- 桌面 AI 助理資料夾
- Skill / AGENTS / CLAUDE / README 文件
- Pegasus booking 1.0 系統版本
- package.json 與依賴狀態
- app / components / lib / data / public 結構
- Git 修改狀態

## 最高原則

除非使用者明確要求「修改」、「覆蓋」、「建立」、「刪除」、「重構」、「更新程式碼」，否則一律只做讀取與分析。

不得自行修改任何檔案。

不得自行覆蓋任何既有程式。

不得自行刪除任何資料。

不得自行執行會改變專案狀態的指令。

## 已知錯誤（禁止重蹈）

1. Travel page navbar 被錯誤改成黑色 — 原始設計是白色（`bg-white/95`），必須維持
2. 手機 Logo 被擅自修改去背 — 手機 logo 絕對禁止任何修改
3. 視覺調整多輪 push 浪費 token — 必須本地確認後一次 push
4. 修改視覺前未取得 FYR 參考 — 凡視覺改動必須先確認原始樣式或取得截圖參考

## Token 效率規則（使用者強制要求）

Token 過度消耗會影響使用者進度，造成實質損失，所有 AI agent 必須遵守：

- 視覺調整先 `npm run dev` 本地確認，不得靠反覆 push Vercel 測試
- 瀏覽器截圖工具非必要不啟用
- 修改前充分理解需求，一次到位，禁止多輪小修循環
- 圖片處理（裁切、去背）先確認規格再執行，不得試錯
- 每次 push 前確認所有改動已本地驗證完畢

## Logo / Navbar 一致性鎖定（2026-06-05 Pegasustour-booking V1.53 多語言版 更新）

使用者已要求所有頁面保持一致 Logo 尺寸與簡潔 Navbar。Logo 圖片檔不更換，但 `Logo.tsx` 尺寸規格已依 `Pegasustour-booking V1.53 多語言版` 重新鎖定：

- 手機：`pegasustour-navbar-logo.png`（1480×158）`w-[min(76vw,360px)]`
- 桌面：`pegasustour-navbar-logo-desktop.png`（1500×420）`clamp(220px, 22vw, 360px)`
- 中文文字：專屬旅程・品質服務・專業體驗（正確）
- 所有語言切換必須使用共用下拉選單 `components/LanguageMenu.tsx`，不得再把 `English` / `日本語` / `한국어` 同時塞進主選單與按鈕群造成重複。
- 最新指定：語言切換維持單一顆下拉按鈕，按鈕內顯示 `中文/EN/JA/KO` 在同一個框內，方便使用者閱讀；顏色不必固定為中文小一點或 EN/JA/KO 紅色，只要搭配品牌且美觀。下拉選項與路由功能不變。
- 語言下拉選單展開後的選項必須用完整名稱：`中文`、`English`、`Japanese`、`Korean`；不要把展開選項縮成 `EN`、`JA`、`KO`。
- 鎖定：上述語言切換按鈕與下拉選單已由使用者確認「正確」並要求「鎖定」。未經使用者明確解除鎖定，不得再修改外觀、文字、間距、結構或路由行為。
- Travel page carousel arrows must remain functional. `components/TravelPackageCatalog.tsx` uses card-width based `scrollBy` plus fallback direct `scrollLeft` update; do not replace with fragile fixed-only scrolling.
- Travel page `熱門景點` section should use the original black/dark visual treatment, while keeping the same card dimensions and summary structure as the other travel package sections.
- Travel page `推薦行程` section should have a distinct but soft background color from `熱門景點`; current Pegasustour-booking V1.53 多語言版 uses an emerald-to-warm-gold gradient and keeps card dimensions / summary structure unchanged.
- If the recommendation background is too subtle, prefer a visibly distinct but still refined emerald/gold gradient such as `#d8f5e6 → #fff7d6 → #f1df9a`.
- 不得再讓不同頁面的 Logo 忽大忽小；若要調整，必須同時檢查首頁、旅遊頁、多語首頁、多語旅遊頁。

## 版本穩定保護（Version Stability Lock）

**pegasus-booking V1.5 為目前正式穩定版；目前改版稱為 Pegasustour-booking V1.53 多語言版，目標是增加英文版。**

- Vercel 已部署：https://pegasustour-v1-5.vercel.app/
- 未經使用者明確指示，不得對 V1.5 已完成功能進行任何破壞性變更、重構、或覆蓋。
- 保護範圍同 v1.12：booking、payment、Email、LINE、Excel、Travel module 全部核心流程。
- 新功能只能增量加入，不得影響現有穩定功能。

## 跨平台規則（Mac / Windows）

- `Pegasustour-booking V1.53 多語言版` 必須能跨 Mac 與 Windows 使用。
- GitHub `main` 是 Mac、Windows、Vercel、AI agent 的共同資料來源。
- 程式碼不得寫死 Mac 或 Windows 的絕對路徑。
- 檔案路徑需使用 `path.join(...)`、`process.cwd()` 與環境變數。
- `ORDER_BACKUP_DIR` 可依每台機器設定；未設定時使用專案相對路徑 `data/接送訂單`。
- 共享資料若屬於系統狀態，必須透過 GitHub 同步，避免 Windows 與 Mac 選單或資料不同步。

## 專案名稱規則

未來專案命名與程式內品牌名稱，優先使用：

Pegasustour VIP

避免使用單獨的 Pegasus 作為正式品牌名稱。

## 目前專案進度同步

同步日期：2026-06-05

專案狀態：

- Formal stable version: `pegasus-booking V1.5`
- Current working version: `Pegasustour-booking V1.53 多語言版` (`package.json` version `1.5.3`)
- Stable recovery branch: `stable/pegasus-booking-v1.5`
- Active Pegasustour-booking V1.53 多語言版 branch: `feature/english-v1.53`
- Shared core-rule files established in project root for Codex, Claude Code, Cline, Cursor, and ChatGPT:
  - `CORE-RULES.md`
  - `AGENT-HANDOFF.md`
  - `ChatGPT-skill.md`
- Desktop mirror established:
  - `/Users/yangkean/Desktop/AI 助理/CORE-RULES.md`
- Every AI agent must read `CORE-RULES.md`, `AGENT-HANDOFF.md`, and `ChatGPT-skill.md` before making changes.
- Deployment/merge stage uses the unified official name `Pegasustour-booking V1.53 多語言版`.
- Latest local verification: `npm run build` passed; local `http://127.0.0.1:3006` returned HTTP 200 for `/`, `/travel`, `/en`, `/en/booking`, `/ja/booking`, `/ko/booking`.
- Completed:
  - Travel module
  - Email
  - Excel
  - Success page
  - Vercel 部署上線：https://pegasustour-v1-5.vercel.app/
- In Progress:
  - Payment integration（Vercel filesystem bug 已修復，待設定環境變數）
  - English / Japanese / Korean version support for `Pegasustour-booking V1.53 多語言版`
- Latest local verification（2026-06-05 13:41 CST）:
  - `npm run build` 通過；latest Pegasustour-booking V1.53 多語言版 build passed after navbar consistency and multilingual dropdown updates
  - Next.js routes successfully generated: `/`, `/booking`, `/airport-pickup`, `/payment`, `/travel`, `/travel-admin`, and API routes
  - Turbopack warning remains: `app/api/payment/paymentStore.ts` is traced through `app/api/payment/status/route.ts`; build still succeeds
  - Local production test server is running at `http://127.0.0.1:3000`
  - Current working tree has uncommitted Pegasustour-booking V1.53 多語言版 multilingual and navbar consistency changes
  - Version sync updated for `Pegasustour-booking V1.53 多語言版`; multilingual implementation has started with `/en`, `/ja`, `/ko` and travel routes
  - HTTP 200 confirmed for `/`, `/en`, `/travel`, `/en/travel`
  - Navbar languages consolidated into `LanguageMenu` dropdown; duplicate inline language links removed
  - Language button design corrected: keep one dropdown button, with visible button text `中文/EN/JA/KO`; dropdown options and routing remain unchanged
  - Logo sizing standardized across the shared `Logo` component
  - Multilingual booking routes added: `/en/booking`, `/ja/booking`, `/ko/booking`
  - Booking page structure is intentionally thin: one shared `components/BookingForm.tsx`, with language route wrappers only
  - Fare estimate panel copy localized through `components/FareEstimatePanel.tsx`; fare formulas unchanged
  - English/Japanese/Korean booking city/district/airport labels use English display through `app/data/locationLabels.ts`; submitted values remain stable Chinese backend values
  - English/Japanese/Korean booking passenger/luggage dropdown visible text must not show Chinese units. Use short labels such as `pax` and `bag 28"+` to save space. Internal option values may remain Chinese to protect backend, LINE, Email, Excel, and driver workflows.
  - Floating LINE button copy is route-localized through `components/FloatingLineButton.tsx`: English `LINE Support`, Japanese `LINE サポート`, Korean `LINE 상담`
  - Pegasustour-booking V1.53 多語言版 English work is isolated on `feature/english-v1.53`; do not merge into V1.5/main without explicit approval
- Payment Fix（2026-06-04）:
  - paymentStore.ts 加入 memory fallback，修復 Vercel 唯讀檔案系統問題
  - 待辦：Vercel 設定 NEXT_PUBLIC_BASE_URL
  - 正式金流待：PAYMENT_PROVIDER / ECPAY_* 環境變數
- Local branch:
  - `main`
- Latest commit:
  - `b86a26b` Sync troubleshooting handoff status
- Next step:
  - 若要現場確認頁面，啟動 `npm run dev` 並檢查 localhost
  - 檢查 `app/travel/page.tsx` 未提交樣式變更是否要保留
  - 完成 Payment integration
  - 繼續 QA 英文 / 日文 / 韓文入口與語言切換
  - QA 英文 / 日文 / 韓文訂車頁，確認使用者從對應語言首頁進入訂車時不回到中文介面
  - 英文 / 日文 / 韓文版地址顯示必須統一為英文地址；顯示可英文，後端值不可任意改成英文以免破壞司機與訂單流程
  - 英文 / 日文 / 韓文版訂車頁的可見下拉選項不得出現中文單位，例如 `9人以上`、`1件 28吋以上`；後端 value 可保留中文以維持系統穩定
  - 外語版地址以 Google Maps 英文名稱為優先參考；客戶自由輸入地址應提示貼上 Google Maps 顯示的英文地址
  - 保持 Pegasustour-booking V1.53 多語言版 與 V1.5 安全隔離，確認後才可合併
  - Vercel 正式版部署前確認環境變數

pegasus-booking V1.5 已作為正式穩定版完成的旅遊模組接入：

- 主系統首頁「旅遊行程」選單連到 `/travel`
- `/travel` 已換成新版旅遊模組
- `/travel-admin` 已接入旅遊後台
- 已接入 `/api/travel-packages`
- 已接入 `/api/travel-packages/ai-suggest`
- 已接入 `/api/travel-marquees`
- 已接入 100 筆國內旅遊套裝資料
- 已接入跑馬燈資料、圖片、新 Logo、carousel 左右箭頭

部署注意：

- Vercel 部署前需確認環境變數：
  - `BOOKING_NOTIFY_WEBHOOK_URL`
  - `LINE_CHANNEL_ACCESS_TOKEN`
  - `LINE_CHANNEL_SECRET`
  - `LINE_TARGET_ID`
- Payment integration 仍在進行中，`Pegasustour-booking V1.53 多語言版` 正式部署前必須完成 payment / env / English language 檢查。
- Travel admin 目前寫入 JSON 檔；Vercel serverless 上線後不適合當永久資料庫，正式可維護版建議改用資料庫或雲端儲存。
- 已要求保護訂車、付款、Email、LINE、Excel 核心流程，不可因旅遊模組合併而覆蓋。

## 只讀掃描指令

### 掃描 Pegasus booking 專案

```bash
cd ~/pegasus-booking
pwd
git status
ls -la
find app components lib data public -maxdepth 3 -type f | sort
cat package.json
```

### 掃描桌面 AI 助理資料夾

```bash
cd ~/Desktop
ls -la
find . -maxdepth 2 -iname "*AI*" -o -iname "*ai*" -o -iname "*助理*"
```

### 掃描 Skill / 專案規範文件

```bash
cd ~/pegasus-booking
find . -iname "*skill*" -o -iname "AGENTS.md" -o -iname "CLAUDE.md" -o -iname "README.md"
cat AGENTS.md
cat CLAUDE.md
cat README.md
```

### 確認套件與版本

```bash
cd ~/pegasus-booking
npm list --depth=0
```

### 啟動開發環境

```bash
npm run dev
```

## 禁止自動執行的指令

未經使用者明確確認，不得建議或執行：

```bash
rm -rf
git reset --hard
git clean -fd
npm audit fix --force
npm update
npm install 大量套件
pkill -9 node
```

除非使用者正在處理 localhost / port 卡死問題，且已確認需要重啟 node，才可建議：

```bash
pkill -9 node
```

## 同步檢查輸出格式

每次掃描後，回覆應包含：

1. 目前專案路徑
2. 目前 Git 狀態
3. 已修改檔案
4. 新增未追蹤檔案
5. 目前可用頁面
6. package.json 主要套件
7. 是否有明顯錯誤
8. 是否需要修改
9. 建議下一步

## Pegasus booking 1.0 目前核心頁面

建議維持以下頁面結構：

```text
app/
  page.tsx
  booking/page.tsx
  admin/page.tsx
  driver/page.tsx
  dispatch/page.tsx
  member/page.tsx
  payment/page.tsx
  ai-booking/page.tsx
```

## 推薦模組化架構

未來不要把所有功能塞進 app/page.tsx。

建議逐步整理成：

```text
components/
  Navbar.tsx
  Hero.tsx
  VehicleCard.tsx
  BookingForm.tsx
  Features.tsx
  Footer.tsx

lib/
  pricing.ts
  maps.ts

data/
  vehicles.ts
```

## 開發順序

第一階段：

- 首頁 UI
- Hero
- 車型卡
- 導航按鈕
- 基本頁面 routing

第二階段：

- Booking Form
- Google Maps
- AI 即時計價

第三階段：

- LINE LIFF
- LINE Login
- LINE Pay / Apple Pay

第四階段：

- Firebase / Supabase
- 後台管理
- 司機派遣
- 會員中心

## 回覆原則

當使用者要求「掃描」、「確認」、「同步」、「檢查」時：

只提供分析與建議，不修改檔案。

當使用者要求「直接改」、「貼上完整程式」、「覆蓋 page.tsx」時：

才提供可直接貼上的完整程式碼。

當系統出現 localhost 問題時：

優先確認目前 port：

```text
localhost:3000
localhost:3001
localhost:3002
```

不要重複啟動多個 npm run dev。

## 終端機注意事項

停止 Next.js 應使用：

```bash
control + c
```

不要使用：

```bash
control + z
```

因為 control + z 只是暫停，會造成 port 被占用。

## Google Maps 與金流原則

Google Maps、LINE LIFF、LINE Pay、Firebase / Supabase 不應一次全部加入。

應逐步導入，避免 MacBook Air 或本機開發環境過載。

## 完成狀態定義

若以下條件成立，代表專案同步狀態正常：

- npm run dev 可啟動
- localhost 可正常顯示首頁
- app/page.tsx 無 TSX 錯誤
- /booking 可進入
- /admin 可進入
- /driver 可進入
- /dispatch 可進入
- /member 可進入
- /payment 可進入
- package.json 無重大缺失
- Git 狀態可辨識
# 結束工作前固定執行（End-of-Session Handoff）

每次結束 Pegasus booking 專案工作前，必須把本次所有更動同步寫入：

1. `pegasus-booking/SKILL.md` — 規則、版本、範圍變更
2. `Desktop/AI 助理/ChatGPT-skill.md`（本檔）— 更新「目前專案進度同步」區塊
3. `pegasus-booking/PROJECT_STATUS.md` — 更新 Completed / In Progress / Next Step
4. 輸出 ChatGPT 同步摘要，確認交接完成

目的：讓後續接手的 Codex、ChatGPT、Claude Code 或其他 AI agent 讀到最新狀態，不需重新推斷。

---

# ChatGPT 專案同步規則（固定執行）

每次開始 Pegasus booking 專案工作前：

1. 優先檢查：

~/Desktop/AI 助理/ChatGPT-skill.md

2. 執行只讀同步檢查：

~/Desktop/AI 助理/sync-check.sh

3. 檢查：

- localhost 狀態
- npm run dev 是否正常
- Git status
- v1.12 是否維持穩定
- app/page.tsx
- booking/payment/member/admin
- 是否存在未同步修改

4. 若使用 Codex / Claude Code：

必須先輸出：

「ChatGPT 同步摘要」

包含：

- 目前版本
- 修改檔案
- 未修改核心檔案
- 是否仍為 v1.12
- 風險
- 下一步建議

5. 原則：

- 穩定優先
- 不重構
- 不推翻既有功能
- 不大幅架構修改
- 採增量更新
- 未確認不得覆蓋核心頁面
