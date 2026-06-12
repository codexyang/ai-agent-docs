@echo off
title Gmail AI Assistant Installer

echo =====================================
echo    Gmail AI Assistant Installer
echo =====================================
echo.

python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Python not found!
    echo Please install Python first:
    echo https://www.python.org/downloads/
    echo.
    pause
    exit /b
)

echo Python detected:
python --version

echo.
echo Installing packages...
echo.

pip install --upgrade pip
pip install -r requirements.txt

echo.
echo =====================================
echo Installation complete!
echo =====================================
echo.

echo Next steps:
echo 1. Put credentials.json into this folder
echo 2. Copy config.template.json to config.json and fill in notify settings
echo 3. Run your gmail_ai.py with --run or --serve
echo.

pause

