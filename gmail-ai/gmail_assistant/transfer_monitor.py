"""抓取 Gmail 匯款郵件，Claude 分析內容並分類通知"""

import json
import os
from datetime import datetime

import anthropic

from .auth import gmail_auth
from .gmail_service import fetch_recent_messages
from .notifications import send_line_notify

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", ""))

# Gmail 搜尋條件：抓匯款相關郵件
TRANSFER_QUERY = (
    "subject:(匯款 OR 轉帳 OR transfer OR payment OR 入帳 OR 付款 OR remittance) "
    "newer_than:1d"
)

CLASSIFY_PROMPT = """你是財務分析助理。分析以下郵件內容，回傳 JSON（不要有其他文字）：
{
  "category": "收款|付款|退款|待確認",
  "amount": "金額（找不到填 null）",
  "currency": "幣別（找不到填 TWD）",
  "payer": "付款方名稱（找不到填 null）",
  "summary": "一句話摘要（20字內）",
  "urgent": true/false
}"""


def analyze_transfer_email(subject: str, body: str) -> dict:
    content = f"主旨：{subject}\n內容：{body[:800]}"
    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=200,
            system=CLASSIFY_PROMPT,
            messages=[{"role": "user", "content": content}]
        )
        return json.loads(response.content[0].text.strip())
    except Exception:
        return {
            "category": "待確認",
            "amount": None,
            "currency": "TWD",
            "payer": None,
            "summary": subject[:20],
            "urgent": False
        }


def format_notification(email: dict, analysis: dict) -> str:
    urgent_tag = "🚨【緊急】" if analysis.get("urgent") else ""
    amount = f"{analysis.get('currency','')} {analysis.get('amount','')}" if analysis.get("amount") else "金額未知"
    payer = analysis.get("payer") or "未知"
    return (
        f"{urgent_tag}【{analysis.get('category','待確認')}】{analysis.get('summary','')}\n"
        f"金額：{amount}\n"
        f"來源：{payer}\n"
        f"主旨：{email.get('subject','')[:40]}"
    )


def run_transfer_monitor(config: dict) -> list[dict]:
    service = gmail_auth()
    messages = fetch_recent_messages(service, max_results=20, query=TRANSFER_QUERY)

    line_token = config.get("notify", {}).get("line_token", "")
    results = []

    for email in messages:
        analysis = analyze_transfer_email(email.get("subject", ""), email.get("body", ""))
        notification = format_notification(email, analysis)

        if line_token:
            send_line_notify(line_token, notification)

        results.append({
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "subject": email.get("subject", ""),
            "sender": email.get("from", ""),
            **analysis
        })

    return results
