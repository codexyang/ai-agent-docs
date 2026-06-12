import argparse
import json
import os
import time
from datetime import datetime

from .auth import gmail_auth
from .crm import classify_email, save_crm_records
from .transfer_monitor import run_transfer_monitor
from .dashboard import create_app
from .gmail_service import fetch_recent_messages
from .notifications import send_discord_webhook, send_line_notify, send_telegram_message
from .reply import build_reply_draft
from .scheduler import start_scheduler
from .summarizer import summarize_email

DEFAULT_CONFIG = {
    'daily_time': '09:00',
    'max_results': 10,
    'dashboard_host': '127.0.0.1',
    'dashboard_port': 5000,
    'notify': {
        'line_token': '',
        'telegram_bot_token': '',
        'telegram_chat_id': '',
        'discord_webhook_url': ''
    },
    'line_bot': {
        'enabled': False,
        'channel_access_token': '',
        'channel_secret': ''
    }
}


def load_config(config_path: str = 'config.json') -> dict:
    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as handle:
            config = json.load(handle)
        return {**DEFAULT_CONFIG, **config}

    return DEFAULT_CONFIG


def write_data(records: list[dict], data_file: str = 'gmail_ai_data.json') -> None:
    payload = {
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'records': records
    }

    with open(data_file, 'w', encoding='utf-8') as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)


def notify_records(records: list[dict], config: dict) -> None:
    line_token = config.get('notify', {}).get('line_token', '')
    telegram_token = config.get('notify', {}).get('telegram_bot_token', '')
    telegram_chat_id = config.get('notify', {}).get('telegram_chat_id', '')
    discord_url = config.get('notify', {}).get('discord_webhook_url', '')

    for record in records:
        message = (
            f"【Gmail AI】{record['category']} 新郵件\n"
            f"主旨：{record['subject']}\n"
            f"寄件者：{record['sender']}\n"
            f"摘要：{record['summary']}"
        )

        if line_token:
            send_line_notify(line_token, message)
        if telegram_token and telegram_chat_id:
            send_telegram_message(telegram_token, telegram_chat_id, message)
        if discord_url:
            send_discord_webhook(discord_url, message)


def process_gmail(max_results: int = 10) -> list[dict]:
    service = gmail_auth()
    messages = fetch_recent_messages(service, max_results=max_results)
    results = []

    for message in messages:
        subject = message.get('subject', '')
        body = message.get('body', '')
        sender = message.get('from', '')

        summary = summarize_email(subject, body)
        category = classify_email(subject, body, sender)
        draft = build_reply_draft(subject, summary, category, sender)

        record = {
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'subject': subject,
            'sender': sender,
            'category': category,
            'summary': summary,
            'reply': draft
        }
        results.append(record)

    save_crm_records(results)
    write_data(results)
    return results


def run_scheduled_job(config: dict) -> None:
    records = process_gmail(config.get('max_results', 10))
    notify_records(records, config)


def main() -> None:
    parser = argparse.ArgumentParser(description='Gmail AI Assistant')
    parser.add_argument('--run', action='store_true', help='執行一次 Gmail 摘要與 CRM 分類')
    parser.add_argument('--serve', action='store_true', help='啟動 Web Dashboard')
    parser.add_argument('--schedule', action='store_true', help='啟用每日排程自動執行')
    parser.add_argument('--transfers', action='store_true', help='掃描匯款郵件並分類通知')
    parser.add_argument('--config', default='config.json', help='設定檔路徑')
    args = parser.parse_args()

    config = load_config(args.config)

    if args.transfers:
        print('掃描匯款郵件中...')
        records = run_transfer_monitor(config)
        for r in records:
            print(f"[{r.get('category')}] {r.get('summary')} — {r.get('amount')} {r.get('currency')}")
        print(f'共處理 {len(records)} 封匯款郵件')

    if args.run:
        print('開始執行 Gmail 讀取與分析...')
        records = process_gmail(config.get('max_results', 10))
        notify_records(records, config)
        print(f'已處理 {len(records)} 封郵件，並輸出 CRM 檔案。')

    if args.schedule:
        print(f'啟用每日排程：每天 {config.get("daily_time")} 自動執行。')
        start_scheduler(lambda: run_scheduled_job(config), config.get('daily_time', '09:00'))

    if args.serve:
        app = create_app(config=config)
        print(f'啟動 Web Dashboard：http://{config.get("dashboard_host")}:{config.get("dashboard_port")}')
        app.run(host=config.get('dashboard_host', '127.0.0.1'), port=config.get('dashboard_port', 5000))

    if args.schedule and not args.serve:
        print('排程已啟動，按 Ctrl+C 可停止。')
        try:
            while True:
                time.sleep(30)
        except KeyboardInterrupt:
            print('已停止排程')

    if not any([args.run, args.schedule, args.serve]):
        parser.print_help()
