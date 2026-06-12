#!/bin/bash

# Gmail AI Assistant - 啟動腳本
# 支援的命令：run | serve | schedule | check

cd "$(dirname "$0")"

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}       Gmail AI Assistant 啟動程式${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""

# 檢查必要的檔案
check_files() {
    local missing=0
    
    if [ ! -f "credentials.json" ]; then
        echo -e "${RED}✗ 缺少: credentials.json${NC}"
        echo "  請從 Google Cloud Console 下載 OAuth 2.0 Client ID (Desktop application)"
        echo "  並將其保存為 credentials.json"
        missing=1
    else
        echo -e "${GREEN}✓ credentials.json 已找到${NC}"
    fi
    
    if [ ! -f "config.json" ]; then
        echo -e "${YELLOW}⚠ 缺少: config.json (使用默認配置)${NC}"
        cp config.template.json config.json
        echo -e "${GREEN}✓ 已從 config.template.json 複製配置${NC}"
    else
        echo -e "${GREEN}✓ config.json 已找到${NC}"
    fi
    
    return $missing
}

# 檢查 Python 版本
check_python() {
    local py_version=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
    local required="3.10"
    
    if [ "$(printf '%s\n' "$required" "$py_version" | sort -V | head -n1)" = "$required" ]; then
        echo -e "${GREEN}✓ Python $py_version (需要 3.10+)${NC}"
        return 0
    else
        echo -e "${RED}✗ Python $py_version (需要 3.10+)${NC}"
        return 1
    fi
}

# 檢查依賴
check_dependencies() {
    echo ""
    echo "檢查 Python 依賴..."
    
    python3 -c "import google_auth" 2>/dev/null && \
    python3 -c "import googleapiclient" 2>/dev/null && \
    python3 -c "import bs4" 2>/dev/null && \
    python3 -c "import flask" 2>/dev/null && \
    python3 -c "import schedule" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 所有依賴已安裝${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠ 缺少依賴，嘗試安裝...${NC}"
        pip3 install -r requirements.txt || pip install -r requirements.txt
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ 依賴安裝成功${NC}"
            return 0
        else
            echo -e "${RED}✗ 依賴安裝失敗${NC}"
            return 1
        fi
    fi
}

# 顯示用法
show_help() {
    echo ""
    echo -e "${YELLOW}用法:${NC}"
    echo "  bash RUN.sh [command]"
    echo ""
    echo -e "${YELLOW}命令:${NC}"
    echo "  run        - 執行一次 Gmail 讀取、摘要、分類與回覆草稿"
    echo "  serve      - 啟動 Web Dashboard (http://127.0.0.1:5000)"
    echo "  schedule   - 啟用每日排程自動執行"
    echo "  check      - 檢查系統配置與連線"
    echo "  help       - 顯示此幫助信息"
    echo ""
    echo -e "${YELLOW}範例:${NC}"
    echo "  bash RUN.sh run"
    echo "  bash RUN.sh serve"
    echo "  bash RUN.sh schedule"
    echo ""
}

# 主程式流程
main() {
    check_python || exit 1
    echo ""
    
    check_files
    local files_ok=$?
    
    echo ""
    if ! check_dependencies; then
        exit 1
    fi
    
    echo ""
    
    # 如果缺少 credentials.json，提示使用者
    if [ $files_ok -ne 0 ]; then
        echo -e "${YELLOW}⚠ 請先配置 credentials.json 後再執行!${NC}"
        echo ""
        show_help
        exit 1
    fi
    
    # 根據命令執行
    case "${1:-help}" in
        run)
            echo -e "${GREEN}執行: Gmail 讀取、摘要與分類${NC}"
            echo ""
            python3 gmail_ai.py --run
            ;;
        serve)
            echo -e "${GREEN}執行: 啟動 Web Dashboard${NC}"
            echo "Dashboard 地址: http://127.0.0.1:5000"
            echo "按 Ctrl+C 可停止服務"
            echo ""
            python3 gmail_ai.py --serve
            ;;
        schedule)
            echo -e "${GREEN}執行: 啟用每日排程${NC}"
            echo "按 Ctrl+C 可停止排程"
            echo ""
            python3 gmail_ai.py --schedule
            ;;
        check)
            echo -e "${GREEN}執行: 驗收檢查${NC}"
            echo ""
            python3 acceptance_check.py
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}✗ 未知命令: $1${NC}"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
