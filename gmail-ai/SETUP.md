# Gmail AI Assistant - 快速設定指南

本指南將幫助你快速配置和啟動 Gmail AI 助理。

## 前置需求

- **Python 3.10+** (已安裝)
- **Google Account** (用於 Gmail API)
- **網路連線**

## 步驟 1: 獲取 Google Credentials

### A. 創建 Google Cloud Project

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 點選 **建立專案** (Create Project)
3. 輸入專案名稱（例如：`Gmail AI Helper`）
4. 點選 **建立**

### B. 啟用 Gmail API

1. 在 Google Cloud Console 中，搜索 **Gmail API**
2. 點選搜尋結果中的 **Gmail API**
3. 點選 **啟用** (Enable)

### C. 創建 OAuth 2.0 Client ID

1. 點選左側 **認證** (Credentials)
2. 點選 **+ 建立憑證** (+ Create Credentials)
3. 選擇 **OAuth 2.0 Client ID**
4. 選擇應用程式類型為 **Desktop application**
5. 點選 **建立**
6. 點選下載按鈕（下載 JSON 檔案）

### D. 放置憑證檔案

1. 將下載的 JSON 檔案重命名為 `credentials.json`
2. 將其放置在 **gmail-ai 資料夾根目錄** 中

## 步驟 2: 配置 config.json

### 複製配置模板

從 `config.template.json` 複製為 `config.json`：

```bash
# macOS/Linux
cp config.template.json config.json

# Windows
copy config.template.json config.json
```

### 配置說明

編輯 `config.json`，以下是主要設定：

```json
{
  "daily_time": "09:00",           // 每日自動執行時間
  "max_results": 10,               // 每次讀取郵件數量
  "dashboard_host": "127.0.0.1",   // Dashboard 監聽位址
  "dashboard_port": 5000,          // Dashboard 連接埠
  "notify": {
    "line_token": "",              // LINE Notify Token (選填)
    "telegram_bot_token": "",      // Telegram Bot Token (選填)
    "telegram_chat_id": "",        // Telegram Chat ID (選填)
    "discord_webhook_url": ""      // Discord Webhook URL (選填)
  },
  "line_bot": {
    "enabled": false,              // 是否啟用 LINE Bot
    "channel_access_token": "",    // LINE Channel Access Token (選填)
    "channel_secret": ""           // LINE Channel Secret (選填)
  }
}
```

## 步驟 3: 安裝依賴 (自動)

運行啟動腳本會自動檢查並安裝依賴：

### macOS/Linux

```bash
bash RUN.sh check
```

### Windows

```bash
RUN.bat check
```

## 步驟 4: 執行 Gmail AI 助理

### macOS/Linux

```bash
# 執行一次讀取與分類
bash RUN.sh run

# 啟動 Web Dashboard
bash RUN.sh serve

# 啟用每日排程
bash RUN.sh schedule

# 驗收檢查系統配置
bash RUN.sh check
```

### Windows

```batch
# 執行一次讀取與分類
RUN.bat run

# 啟動 Web Dashboard
RUN.bat serve

# 啟用每日排程
RUN.bat schedule

# 驗收檢查系統配置
RUN.bat check
```

## 功能詳解

### 1. 執行一次讀取 (`run`)

讀取 Gmail 最新郵件，進行摘要、分類、生成回覆草稿：

- 輸出 `gmail_summary.xlsx` - Excel CRM 檔案
- 輸出 `gmail_ai_data.json` - JSON 數據檔案
- 發送通知（若已配置）

### 2. Web Dashboard (`serve`)

啟動本地 Flask Web 服務，提供郵件摘要和管理界面：

- 訪問地址：http://127.0.0.1:5000
- 按 `Ctrl+C` 停止服務

### 3. 每日排程 (`schedule`)

按設定的時間自動執行郵件讀取和分類：

- 根據 `config.json` 中 `daily_time` 設定的時間執行
- 按 `Ctrl+C` 停止排程

### 4. 驗收檢查 (`check`)

檢查系統配置、依賴和 Gmail 連線：

- 驗證 credentials.json 和 config.json
- 檢查 Python 套件
- 測試 Gmail API 連線
- 測試摘要、分類、CRM 功能

## 通知設定 (選填)

### LINE Notify

1. 前往 [LINE Notify](https://notify-bot.line.me/)
2. 登入後點選 **個人頁面**
3. 點選 **發行權杖**
4. 複製權杖，填入 `config.json` 的 `notify.line_token`

### Telegram Bot

1. 在 Telegram 中搜尋 **@BotFather**
2. 發送 `/start` 並按指示建立 Bot
3. 複製 Token，填入 `config.json` 的 `notify.telegram_bot_token`
4. 在 Telegram 中發送訊息給 bot，取得 Chat ID

### Discord Webhook

1. 進入 Discord 伺服器設定
2. 進入 **整合** → **Webhook**
3. 建立新 Webhook，複製 URL
4. 填入 `config.json` 的 `notify.discord_webhook_url`

## 常見問題

### Q: 啟動時出現 "credentials.json not found"

**A:** 檢查 `credentials.json` 是否在 gmail-ai 資料夾中，並確保檔案名稱完全正確。

### Q: 無法連線到 Gmail API

**A:** 
- 確認 Google Cloud Project 中已啟用 Gmail API
- 檢查 credentials.json 是否有效
- 嘗試重新下載最新的 credentials.json

### Q: 依賴安裝失敗

**A:**
```bash
# macOS/Linux
pip3 install -r requirements.txt --upgrade

# Windows
pip install -r requirements.txt --upgrade
```

### Q: 如何停止排程或 Dashboard

**A:** 按 `Ctrl+C` 可停止任何運行中的服務。

### Q: 可以同時啟動 Dashboard 和排程嗎？

**A:** 不建議在同一個終端中同時運行。建議開啟兩個終端，分別運行：
- 終端 1: `bash RUN.sh serve`
- 終端 2: `bash RUN.sh schedule`

## 輸出文件說明

### gmail_summary.xlsx

Excel 檔案，包含：
- 郵件主旨
- 寄件者信息
- 自動分類結果
- 郵件摘要
- 建議回覆草稿
- CRM 客戶分類

### gmail_ai_data.json

JSON 檔案，包含：
- 執行時間戳
- 每封郵件的詳細數據
- 摘要和分類結果
- 建議回覆

### Daily_Report.pdf

(若已生成) 每日報告 PDF

## 後續步驟

1. ✅ 配置 credentials.json
2. ✅ 設定 config.json
3. ✅ 執行 `bash RUN.sh check` 驗證配置
4. ✅ 執行 `bash RUN.sh run` 測試功能
5. ✅ 配置通知 (選填)
6. ✅ 部署排程或 Dashboard

## 支援

遇到問題？

1. 檢查 `acceptance_check.py` 的驗收結果
2. 查看 README.md 詳細文檔
3. 查看控制台輸出的錯誤信息

---

**祝你使用愉快！**
