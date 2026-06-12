# Gmail AI Assistant

這個專案將你原本的 Gmail AI 升級成完整本地化的自動化系統，支援：

- 本地式郵件摘要與分類（不需 OpenAI）
- 自動回信草稿產生
- LINE Notify、Telegram Bot、Discord 通知
- 自動 CRM 客戶分類並輸出 Excel
- 每日排程自動執行
- 本地 Flask Web Dashboard
- LINE 官方帳號 AI 自動回覆

## 目錄

- [環境需求](#環境需求)
- [安裝步驟](#安裝步驟)
- [設定說明](#設定說明)
- [執行方式](#執行方式)
- [LINE 官方帳號自動回覆](#line-官方帳號自動回覆)
- [驗收檢查](#驗收檢查)
- [常見問題](#常見問題)

## 環境需求

- Python 3.10+
- `credentials.json`（Google Cloud Console 的 Gmail API OAuth 用戶端憑證）
- 可連線的 Gmail 帳號

## 安裝步驟

1. 將 `credentials.json` 放到專案根目錄。
2. 複製 `config.template.json` 為 `config.json`：
   ```bash
   copy config.template.json config.json
   ```
3. 編輯 `config.json`，填入通知與 LINE Bot 相關設定。
4. 執行 `install.bat` 安裝 Python 依賴：
   ```bash
   install.bat
   ```

如果你要手動安裝，請執行：

```bash
pip install -r requirements.txt
```

## 設定說明

請根據你的需求修改 `config.json`：

- `daily_time`：每日自動執行的時間（例如 `09:00`）。
- `max_results`：每次讀取 Gmail 郵件數量。
- `dashboard_host` / `dashboard_port`：Dashboard 監聽位址與連接埠。

### 通知設定

- `notify.line_token`：LINE Notify 權杖。
- `notify.telegram_bot_token`：Telegram 機器人 Token。
- `notify.telegram_chat_id`：Telegram 聊天 ID。
- `notify.discord_webhook_url`：Discord Webhook URL。

### LINE 官方帳號設定

- `line_bot.enabled`：是否啟用 LINE 官方帳號自動回覆。
- `line_bot.channel_access_token`：LINE 官方帳號的 Channel Access Token。
- `line_bot.channel_secret`：LINE 官方帳號的 Channel Secret。

## 執行方式

### 1. 一次性執行 Gmail 讀取與處理

```bash
python gmail_ai.py --run
```

執行後會：

- 讀取 Gmail 郵件
- 生成本地摘要
- 自動分類
- 產生回覆草稿
- 輸出 `gmail_summary.xlsx`
- 輸出 `gmail_ai_data.json`
- 發送 LINE/Telegram/Discord 通知（若設定完整）

### 2. 啟動 Web Dashboard

```bash
python gmail_ai.py --serve
```

開啟瀏覽器並造訪：

```text
http://127.0.0.1:5000
```

你可以看到：
- 最新郵件摘要
- 郵件分類
- 回覆草稿

### 3. 啟用每日排程

```bash
python gmail_ai.py --schedule
```

系統會依 `config.json` 中 `daily_time` 的時間每天自動執行一次。

### 4. 同時啟用 Dashboard 與排程

```bash
python gmail_ai.py --serve --schedule
```

## LINE 官方帳號自動回覆

當你啟用 `line_bot.enabled`，系統會啟動 LINE webhook：

- 監聽路由：`/line_webhook`
- 當 LINE 官方帳號收到文字訊息時，自動回覆
- 回覆內容會使用本地摘要邏輯生成簡短回應

### LINE webhook 設定步驟

1. 登入 LINE Developers，選擇你的 Channel。
2. 在 Messaging API 設定中填入 `Webhook URL`：
   ```text
   https://<你的公開域名>/line_webhook
   ```
3. 啟用 `Use webhook`。
4. 填入 `line_bot.channel_access_token` 及 `line_bot.channel_secret`。
5. 若本機測試，請使用 `ngrok` 或其他反向代理將本機服務公開。

### 本機測試範例（ngrok）

```bash
ngrok http 5000
```

將 `https://xxxxxx.ngrok.io/line_webhook` 設為 LINE webhook。

## 驗收檢查

可執行驗收腳本檢查系統是否正常：

```bash
python acceptance_check.py
```

若你只想跳過 Gmail API 連線測試：

```bash
python acceptance_check.py --skip-gmail
```

驗收腳本會檢測：

- 必要檔案是否存在
- `config.json` 是否可讀取
- 依賴套件是否可 import
- Gmail API 是否可驗證與讀取
- 本地摘要、分類、回覆草稿、CRM Excel 寫入
- Dashboard 是否可回應
- 排程啟動是否正常

## 常見問題

### 1. `credentials.json` 要去哪裡取得？

請從 Google Cloud Console 建立 OAuth 用戶端憑證，並下載 `credentials.json`。

### 2. LINE 設定後沒有回應？

- 確認 `line_bot.enabled` 已設為 `true`。
- 確認 `channel_access_token`、`channel_secret` 無誤。
- 確認 webhook URL 可從外部存取。
- 檢查 Flask 服務是否正在執行。

### 3. 如何查看通知是否發送成功？

目前系統會直接呼叫 LINE Notify、Telegram API 和 Discord Webhook，若設定正確應該會送達。可以先透過瀏覽器或 `curl` 逐一測試各個通道。

### 4. 我可以只用 Gmail 摘要功能嗎？

可以。只要執行 `python gmail_ai.py --run`，即可產生摘要與分類，通知設定可留空。
