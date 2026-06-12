import base64
import hashlib
import hmac
import json
from typing import Any

import requests

from .summarizer import summarize_text

LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply'


def verify_signature(channel_secret: str, body: bytes, signature: str) -> bool:
    if not channel_secret or not signature:
        return False

    hash_value = hmac.new(
        channel_secret.encode('utf-8'),
        body,
        hashlib.sha256
    ).digest()
    expected = base64.b64encode(hash_value).decode('utf-8')
    return hmac.compare_digest(expected, signature)


def create_line_auto_reply(text: str) -> str:
    summary = summarize_text(text, max_sentences=2)
    if not summary:
        return '已收到您的訊息，稍後會回覆您。'

    return (
        '您好，已收到您的訊息：\n'
        f'{summary}\n\n'
        '若您需要進一步協助，請告訴我更多細節。'
    )


def reply_message(channel_access_token: str, reply_token: str, text: str) -> bool:
    if not channel_access_token or not reply_token:
        return False

    payload = {
        'replyToken': reply_token,
        'messages': [
            {
                'type': 'text',
                'text': text
            }
        ]
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {channel_access_token}'
    }

    response = requests.post(LINE_REPLY_URL, headers=headers, json=payload, timeout=10)
    return response.ok


def extract_text_from_event(event: dict[str, Any]) -> str:
    message = event.get('message', {})
    if message.get('type') == 'text':
        return message.get('text', '')
    return ''
