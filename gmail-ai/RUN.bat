@echo off
REM Gmail AI Assistant - 啟動腳本 (Windows)

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo ================================================
echo       Gmail AI Assistant 啟動程式
echo ================================================
echo.

REM 檢查 Python 版本
echo 檢查 Python 版本...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [✗] 未找到 Python，請先安裝 Python 3.10+
    pause
    exit /b 1
)
python --version
echo.

REM 檢查必要的檔案
echo 檢查必要檔案...
if not exist "credentials.json" (
    color 0C
    echo [✗] 缺少: credentials.json
    echo     請從 Google Cloud Console 下載 OAuth 2.0 Client ID (Desktop application)
    echo     並將其保存為 credentials.json
    echo.
) else (
    echo [OK] credentials.json 已找到
)

if not exist "config.json" (
    echo [!] 缺少: config.json (使用默認配置)
    copy config.template.json config.json >nul
    echo [OK] 已從 config.template.json 複製配置
) else (
    echo [OK] config.json 已找到
)
echo.

REM 檢查依賴
echo 檢查 Python 依賴...
python -c "import google_auth" >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] 缺少依賴，嘗試安裝...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        color 0C
        echo [✗] 依賴安裝失敗
        pause
        exit /b 1
    )
)
echo [OK] 所有依賴已安裝
echo.

REM 檢查 credentials.json
if not exist "credentials.json" (
    color 0C
    echo [✗] 請先配置 credentials.json 後再執行!
    echo.
    call :show_help
    pause
    exit /b 1
)

REM 根據參數執行
if "%1%"=="run" (
    echo 執行: Gmail 讀取、摘要與分類
    echo.
    python gmail_ai.py --run
) else if "%1%"=="serve" (
    echo 執行: 啟動 Web Dashboard
    echo Dashboard 地址: http://127.0.0.1:5000
    echo 按 Ctrl+C 可停止服務
    echo.
    python gmail_ai.py --serve
) else if "%1%"=="schedule" (
    echo 執行: 啟用每日排程
    echo 按 Ctrl+C 可停止排程
    echo.
    python gmail_ai.py --schedule
) else if "%1%"=="check" (
    echo 執行: 驗收檢查
    echo.
    python acceptance_check.py
) else (
    call :show_help
)

pause
exit /b 0

:show_help
echo 用法:
echo   RUN.bat [command]
echo.
echo 命令:
echo   run        - 執行一次 Gmail 讀取、摘要、分類與回覆草稿
echo   serve      - 啟動 Web Dashboard (http://127.0.0.1:5000)
echo   schedule   - 啟用每日排程自動執行
echo   check      - 檢查系統配置與連線
echo.
echo 範例:
echo   RUN.bat run
echo   RUN.bat serve
echo   RUN.bat schedule
echo.
exit /b 0
