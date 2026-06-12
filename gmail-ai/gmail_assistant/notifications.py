import requests


def send_line_notify(token: str, message: str) -> bool:
    """使用 LINE Notify 發送通知"""
    if not token:
        return False

    url = 'https://notify-api.line.me/api/notify'
    headers = {
        'Authorization': f'Bearer {token}'
    }
    data = {'message': message}

    try:
        response = requests.post(url, headers=headers, data=data, timeout=10)
        return response.status_code == 200
    except Exception as e:
        print(f'LINE Notify 發送失敗: {e}')
        return False


def send_line_official_account(channel_access_token: str, user_id: str, message: str) -> bool:
    """使用 LINE 官方帳號推送訊息給用戶"""
    if not channel_access_token or not user_id:
        return False

    url = 'https://api.line.me/v2/bot/message/push'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {channel_access_token}'
    }
    
    payload = {
        'to': user_id,
        'messages': [
            {
                'type': 'text',
                'text': message
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        return response.ok
    except Exception as e:
        print(f'LINE 官方帳號推送失敗: {e}')
        return False


def send_line_official_account_rich_menu(channel_access_token: str, user_id: str, 
                                         title: str, message: str, buttons: list = None) -> bool:
    """使用 LINE 官方帳號推送帶有按鈕的訊息"""
    if not channel_access_token or not user_id:
        return False

    url = 'https://api.line.me/v2/bot/message/push'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {channel_access_token}'
    }
    
    # 如果提供了按鈕，使用 Template Message
    if buttons:
        messages = [
            {
                'type': 'template',
                'altText': title,
                'template': {
                    'type': 'buttons',
                    'title': title,
                    'text': message,
                    'actions': buttons
                }
            }
        ]
    else:
        messages = [
            {
                'type': 'text',
                'text': f'{title}\n{message}'
            }
        ]
    
    payload = {
        'to': user_id,
        'messages': messages
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        return response.ok
    except Exception as e:
        print(f'LINE 官方帳號富文本推送失敗: {e}')
        return False


def send_telegram_message(bot_token: str, chat_id: str, message: str) -> bool:
    if not bot_token or not chat_id:
        return False

    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    payload = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }

    response = requests.post(url, json=payload, timeout=10)
    return response.ok


def send_discord_webhook(webhook_url: str, message: str) -> bool:
    if not webhook_url:
        return False

    payload = {'content': message}
    response = requests.post(webhook_url, json=payload, timeout=10)
    return response.status_code in (200, 204)
