# 本機維護與清理規則

目標：讓 Codex、Claude Code、ChatGPT 相關工作能穩定運作，同時避免誤刪系統、訂單、付款、LINE、Gmail、Excel 或旅遊資料。

## 目前觀察

- 系統磁碟可用空間約 10GiB，偏低。
- `AI 助理` 資料夾約 1.8G。
- 主要可重建空間：
  - `pegasus-booking/.next`
  - `AI智慧系統旅遊行程-new module/.next`
- `node_modules` 也佔空間，但不建議自動刪，因為刪除後需要重新安裝依賴。

## 安全原則

可以清理：

- `.next`：Next.js build/dev cache，可重新產生。
- `__pycache__`：Python cache，可重新產生。
- 小型 `.DS_Store`：可刪，但節省很少，通常不必處理。

不要自動清理：

- `node_modules`
- `.git`
- `data/*.json`
- 訂車 Excel / CSV
- `pending-payments.json`
- `line-targets.json`
- `public/images`
- `Travel Module` 文件
- 任何付款、LINE、Gmail、Excel 訂單流程檔案

## 使用方式

只檢查，不刪除：

```bash
maintenance/local-health.sh
```

清理可重建 build cache：

```bash
maintenance/local-health.sh clean-build-cache --yes
```

每次啟動 Codex / Claude Code / ChatGPT 開發工作前，建議先跑：

```bash
maintenance/startup-clean.sh --yes
```

這會清掉可重建的 Next.js `.next` build 產物與 Python cache，留出本機空間。

清理後如果要繼續開發，進入專案再跑：

```bash
npm run build
```

或：

```bash
npm run dev
```

## 建議操作節奏

- 每次大量 build 或 Vercel 上線前，先跑 `maintenance/local-health.sh` 看剩餘空間。
- 可用空間低於 8GiB 時，先清 `.next`。
- 可用空間低於 5GiB 時，暫停新增圖片或大型檔案，先整理 Downloads / Desktop 其他大檔。
- 不在未確認情況下刪 `node_modules`，避免 Codex/Claude Code 工作中斷。

## 啟動前自動清理設計

目前採「手動確認啟動清理」，原因是這比 macOS 登入自動刪除更安全。

固定啟動流程：

1. 開始 Codex / Claude Code / ChatGPT 開發工作前，先進入 `AI 助理` 資料夾。
2. 執行 `maintenance/startup-clean.sh --yes`。
3. 需要跑專案時，再進入 `pegasus-booking` 執行 `npm run dev` 或 `npm run build`。

不建議把清理寫成完全無提示的系統登入項，因為如果剛好有 build 或 dev server 在跑，可能會中斷工作。若未來要做 macOS LaunchAgent，應先確認它只在開機後、專案未啟動前執行。

## 記憶體保護

只檢查記憶體：

```bash
maintenance/memory-guard.sh
```

手動清一次 macOS inactive file cache：

```bash
maintenance/memory-guard.sh clean --yes
```

開一個背景監控視窗，每 5 分鐘檢查一次，低於 25% free memory 才清：

```bash
maintenance/memory-guard.sh watch --yes 300
```

注意：這個工具不會自動殺掉 Codex、Claude Code、ChatGPT、瀏覽器或 Node 程式；只做系統可釋放快取清理。

## 記憶體不足急救

當 macOS 跳出「您的系統已用完應用程式記憶體」時，先跑：

```bash
maintenance/memory-emergency.sh
```

如果畫面顯示 VS Code / Code 無回應，可執行：

```bash
maintenance/memory-emergency.sh safe-relief --yes
```

這會正常要求 Visual Studio Code 退出，保留 Codex、Claude、ChatGPT、LINE、GitHub Desktop、Terminal。

若 LINE 佔用超過 800MB 且當下不需要客服通訊，手動重開 LINE 通常能再釋放更多記憶體；腳本預設不會自動關 LINE，避免中斷通訊。

如果要做成 macOS 登入後常駐，可使用：

```text
maintenance/com.pegasus.memory-guard.plist
```

但安裝到 `~/Library/LaunchAgents` 前應先確認，避免在你正在 build 或展示系統時自動執行。
