"""AI 銷售機器人 — 單次 API call，輕量快速"""

import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", ""))

SYSTEM_PROMPT = """你是整合 Pegasus 旅遊 與 SKY Shopping 的 AI 銷售助理。

規則：
- 旅遊/行程/機票/飯店/訂位 → 以 Pegasus 旅遊顧問身份回覆，引導至 https://pegasus-booking.vercel.app
- 購物/商品/下單/價格/庫存 → 以 SKY Shopping 助理身份回覆，引導至商城下單
- 其他 → 簡短友善回覆，引導至對應服務

限制：每次回覆不超過 120 字，繁體中文。"""


def route_message(text: str) -> str:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=250,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": text}]
    )
    return response.content[0].text.strip()
