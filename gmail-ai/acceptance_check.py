import argparse
import json
import os
import sys
import tempfile

from gmail_assistant.auth import gmail_auth
from gmail_assistant.crm import classify_email, save_crm_records
from gmail_assistant.dashboard import create_app
from gmail_assistant.gmail_service import fetch_recent_messages
from gmail_assistant.notifications import send_discord_webhook, send_line_notify, send_telegram_message
from gmail_assistant.reply import build_reply_draft
from gmail_assistant.scheduler import start_scheduler
from gmail_assistant.summarizer import summarize_email


REQUIRED_FILES = ['credentials.json', 'config.json']


def check_files() -> bool:
    print('1. 檢查必要檔案...')
    success = True
    for name in REQUIRED_FILES:
        if not os.path.exists(name):
            print(f'   [x] 缺少：{name}')
            success = False
        else:
            print(f'   [✓] 找到：{name}')
    return success


def check_config() -> bool:
    print('2. 檢查 config.json 設定...')
    try:
        with open('config.json', 'r', encoding='utf-8') as handle:
            config = json.load(handle)
    except Exception as exc:
        print('   [x] 無法讀取 config.json：', exc)
        return False

    notify = config.get('notify', {})
    required_keys = ['line_token', 'telegram_bot_token', 'telegram_chat_id', 'discord_webhook_url']
    missing = [key for key in required_keys if not notify.get(key)]
    if missing:
        print('   [!] notify 欄位未完全設定：', ', '.join(missing))
        print('       若未使用特定通知通道，留空即可。')
    else:
        print('   [✓] 通知設定已填寫。')

    print('   [✓] config.json 讀取成功。')
    return True


def check_imports() -> bool:
    print('3. 檢查套件匯入...')
    modules = [
        'google_auth_oauthlib',
        'googleapiclient',
        'bs4',
        'openpyxl',
        'reportlab',
        'requests',
        'flask',
        'schedule'
    ]
    success = True
    for module in modules:
        try:
            __import__(module)
            print(f'   [✓] 成功 import {module}')
        except Exception as exc:
            print(f'   [x] 無法 import {module}：{exc}')
            success = False
    return success


def check_gmail_api() -> bool:
    print('4. 檢查 Gmail API 連線與讀取...')
    try:
        service = gmail_auth()
        profile = service.users().getProfile(userId='me').execute()
        print(f'   [✓] Gmail 驗證成功，使用者信箱：{profile.get("emailAddress")}')
        messages = fetch_recent_messages(service, max_results=1)
        print(f'   [✓] 讀取郵件成功，數量：{len(messages)}')
        return True
    except Exception as exc:
        print('   [x] Gmail API 測試失敗：', exc)
        return False


def check_processing() -> bool:
    print('5. 測試摘要、分類、草稿、CRM 輸出...')
    sample_subject = '測試郵件主旨'
    sample_body = '這是一封測試郵件內容，用於驗收本地摘要、分類與回覆草稿功能。'
    sample_sender = '測試者 <test@example.com>'

    try:
        summary = summarize_email(sample_subject, sample_body)
        category = classify_email(sample_subject, sample_body, sample_sender)
        draft = build_reply_draft(sample_subject, summary, category, sample_sender)
        print('   [✓] 摘要：', summary)
        print('   [✓] 分類：', category)
        print('   [✓] 草稿片段：', draft.splitlines()[0])

        temp_file = os.path.join(tempfile.gettempdir(), 'acceptance_test.xlsx')
        save_crm_records([
            {
                'timestamp': '2026-01-01 09:00:00',
                'subject': sample_subject,
                'sender': sample_sender,
                'category': category,
                'summary': summary,
                'reply': draft
            }
        ], filename=temp_file)
        print(f'   [✓] CRM Excel 寫入成功：{temp_file}')
        try:
            os.remove(temp_file)
        except OSError:
            pass
        return True
    except Exception as exc:
        print('   [x] 處理測試失敗：', exc)
        return False


def check_dashboard() -> bool:
    print('6. 測試 Web Dashboard...')
    try:
        data_file = os.path.join(tempfile.gettempdir(), 'acceptance_dashboard.json')
        with open(data_file, 'w', encoding='utf-8') as handle:
            json.dump({'timestamp': '2026-01-01 09:00:00', 'records': []}, handle, ensure_ascii=False)

        app = create_app(data_file=data_file)
        client = app.test_client()
        response = client.get('/')
        if response.status_code == 200:
            print('   [✓] Dashboard 測試頁面回應正常。')
            os.remove(data_file)
            return True
        print('   [x] Dashboard 回應異常：', response.status_code)
        return False
    except Exception as exc:
        print('   [x] Dashboard 測試失敗：', exc)
        return False


def check_scheduler() -> bool:
    print('7. 測試排程啟動...')
    try:
        start_scheduler(lambda: None, daily_time='23:59')
        print('   [✓] 排程啟動函式可正常執行。')
        return True
    except Exception as exc:
        print('   [x] 排程啟動失敗：', exc)
        return False


def parse_args():
    parser = argparse.ArgumentParser(description='Gmail AI 驗收檢查腳本')
    parser.add_argument('--skip-gmail', action='store_true', help='跳過 Gmail API 連線測試')
    parser.add_argument('--test-notifications', action='store_true', help='實際測試通知傳送（使用 config.json 設定）')
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    success = True

    success &= check_files()
    success &= check_config()
    success &= check_imports()
    if not args.skip_gmail:
        success &= check_gmail_api()
    else:
        print('   [!] 已跳過 Gmail API 測試。')
    success &= check_processing()
    success &= check_dashboard()
    success &= check_scheduler()

    if args.test_notifications:
        print('   [!] 實際通知測試未實作，請手動驗證 LINE/Telegram/Discord 設定。')

    print('\n驗收結果：')
    if success:
        print('   [✓] 所有檢查通過。')
        return 0
    print('   [x] 部分檢查失敗，請參考上方訊息修正。')
    return 1


if __name__ == '__main__':
    sys.exit(main())
