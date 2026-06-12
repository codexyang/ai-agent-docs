def build_reply_draft(subject: str, summary: str, category: str, sender: str) -> str:
    sender_name = sender.split('<')[0].strip()
    sender_name = sender_name or '您好'

    intro = (
        f'{sender_name}，\n\n感謝您的郵件。以下是我對這封信的快速摘要：\n{summary}\n\n'
    )

    action_map = {
        '財務': '我已確認相關財務資訊，若有需要我可以協助後續付款或開立憑證。',
        '會議': '我可以協助安排會議時間，請告知您方便的時段。',
        '報價': '我已收到您的報價需求，會盡快提供正式報價。',
        '客服': '我已了解問題內容，會儘速協助您處理。',
        '客戶': '感謝您的聯繫，我會安排專人跟進。',
        '社群': '感謝您的訊息，這部分我會轉交給社群團隊。',
        '其他': '我已收到您的郵件，若有需要會再進一步回覆。'
    }

    action = action_map.get(category, action_map['其他'])
    footer = '若您有其他補充資訊，歡迎隨時告知。\n\n謝謝，\nGmail AI 助手'

    return intro + action + '\n\n' + footer
