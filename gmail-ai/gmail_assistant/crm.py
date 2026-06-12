from openpyxl import Workbook

CATEGORY_KEYWORDS = {
    '財務': ['invoice', '付款', '發票', '帳單', '費用', '付款方式'],
    '會議': ['meeting', '會議', '排程', '時間', 'schedule', 'conference'],
    '報價': ['quotation', '報價', '估價', '價格', 'proposal'],
    '客服': ['support', '客服', '問題', 'help', 'assistance'],
    '客戶': ['client', '顧客', '客戶', 'customer', '合作'],
    '社群': ['linkedin', 'facebook', 'instagram', '社群', '社交'],
}


def classify_email(subject: str, body: str, sender: str) -> str:
    text = f'{subject}\n{body}\n{sender}'.lower()
    scores = {category: 0 for category in CATEGORY_KEYWORDS}

    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            scores[category] += text.count(keyword)

    category = max(scores, key=scores.get)
    return category if scores[category] > 0 else '其他'


def save_crm_records(records: list[dict], filename: str = 'gmail_summary.xlsx') -> None:
    workbook = Workbook()
    sheet = workbook.active
    sheet.title = 'Gmail CRM'
    headers = ['日期', '主旨', '寄件者', '分類', '摘要', '回覆草稿']
    sheet.append(headers)

    for record in records:
        sheet.append([
            record.get('timestamp', ''),
            record.get('subject', ''),
            record.get('sender', ''),
            record.get('category', ''),
            record.get('summary', ''),
            record.get('reply', '')
        ])

    workbook.save(filename)
