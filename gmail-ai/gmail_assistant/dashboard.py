import json
import os

from flask import Flask, render_template_string, request, jsonify

from .line_bot import reply_message, verify_signature
from .sales_agent import route_message


TEMPLATE = '''
<!doctype html>
<html lang="zh-Hant">
<head>
    <meta charset="utf-8">
    <title>Gmail AI Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 24px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f4f4f4; }
        .summary { white-space: pre-wrap; }
    </style>
</head>
<body>
    <h1>Gmail AI Dashboard</h1>
    <p>最新資料來源：{{ timestamp }}</p>

    <h2>最新郵件摘要</h2>
    <table>
        <thead>
            <tr>
                <th>日期</th>
                <th>主旨</th>
                <th>寄件者</th>
                <th>分類</th>
            </tr>
        </thead>
        <tbody>
        {% for item in records[:20] %}
            <tr>
                <td>{{ item.timestamp }}</td>
                <td>{{ item.subject }}</td>
                <td>{{ item.sender }}</td>
                <td>{{ item.category }}</td>
            </tr>
        {% endfor %}
        </tbody>
    </table>

    <h2>回覆草稿</h2>
    {% for item in records[:5] %}
        <div>
            <h3>{{ item.subject }}</h3>
            <p class="summary">{{ item.reply }}</p>
            <hr>
        </div>
    {% endfor %}
</body>
</html>
'''


CHAT_TEMPLATE = '''<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI 銷售助理</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#f0f2f5;display:flex;justify-content:center;align-items:center;height:100vh}
.chat-box{width:380px;max-width:100%;background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.12);display:flex;flex-direction:column;height:560px}
.chat-header{background:#06c755;color:#fff;padding:16px;border-radius:16px 16px 0 0;font-size:16px;font-weight:bold;text-align:center}
.chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.msg{max-width:75%;padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.5;word-break:break-word}
.msg.bot{background:#f1f1f1;align-self:flex-start;border-bottom-left-radius:4px}
.msg.user{background:#06c755;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.chat-input{display:flex;padding:12px;border-top:1px solid #eee;gap:8px}
.chat-input input{flex:1;border:1px solid #ddd;border-radius:20px;padding:8px 14px;font-size:14px;outline:none}
.chat-input button{background:#06c755;color:#fff;border:none;border-radius:20px;padding:8px 18px;cursor:pointer;font-size:14px}
.typing{color:#999;font-size:12px;padding:0 16px 8px}
</style>
</head>
<body>
<div class="chat-box">
  <div class="chat-header">🤖 AI 銷售助理</div>
  <div class="chat-messages" id="msgs">
    <div class="msg bot">您好！我是 AI 銷售助理，可協助您旅遊行程規劃或商品購物，請問有什麼需要幫忙的？</div>
  </div>
  <div class="typing" id="typing" style="display:none">助理輸入中...</div>
  <div class="chat-input">
    <input id="inp" type="text" placeholder="輸入訊息..." />
    <button onclick="send()">送出</button>
  </div>
</div>
<script>
const msgs = document.getElementById("msgs");
const inp = document.getElementById("inp");
const typing = document.getElementById("typing");

inp.addEventListener("keydown", e => { if(e.key === "Enter") send(); });

async function send() {
  const text = inp.value.trim();
  if (!text) return;
  inp.value = "";
  addMsg(text, "user");
  typing.style.display = "block";
  try {
    const res = await fetch("/chat/send", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({message: text})
    });
    const data = await res.json();
    addMsg(data.reply, "bot");
  } catch(e) {
    addMsg("系統暫時無法回應，請稍後再試。", "bot");
  }
  typing.style.display = "none";
}

function addMsg(text, role) {
  const div = document.createElement("div");
  div.className = "msg " + role;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
</script>
</body>
</html>'''


def load_data(data_file: str) -> dict:
    if not os.path.exists(data_file):
        return {'records': [], 'timestamp': '尚無資料'}

    with open(data_file, 'r', encoding='utf-8') as handle:
        return json.load(handle)


def create_app(data_file: str = 'gmail_ai_data.json', config: dict | None = None) -> Flask:
    app = Flask(__name__)

    @app.route('/')
    def index():
        data = load_data(data_file)
        return render_template_string(TEMPLATE, records=data.get('records', []), timestamp=data.get('timestamp', ''))

    if config is None:
        config = {}

    line_bot_config = config.get('line_bot', {})
    channel_secret = line_bot_config.get('channel_secret', '')
    channel_access_token = line_bot_config.get('channel_access_token', '')
    enabled = line_bot_config.get('enabled', False)

    @app.route('/line_webhook', methods=['POST'])
    def line_webhook():
        if not enabled:
            return 'LINE Bot 未啟用', 404

        signature = request.headers.get('X-Line-Signature', '')
        body = request.get_data()

        if not verify_signature(channel_secret, body, signature):
            return 'Invalid signature', 400

        payload = request.get_json(silent=True)
        if not payload:
            return 'Bad request', 400

        events = payload.get('events', [])
        for event in events:
            if event.get('type') != 'message':
                continue

            reply_token = event.get('replyToken', '')
            message_text = event.get('message', {}).get('text', '')
            if not message_text or not reply_token:
                continue

            reply_text = route_message(message_text)
            reply_message(channel_access_token, reply_token, reply_text)

        return 'OK'

    @app.route('/chat', methods=['GET'])
    def chat_widget():
        return render_template_string(CHAT_TEMPLATE)

    @app.route('/chat/send', methods=['POST'])
    def chat_send():
        data = request.get_json(silent=True) or {}
        text = data.get('message', '').strip()
        if not text:
            return jsonify({'reply': '請輸入訊息'}), 400
        reply = route_message(text)
        return jsonify({'reply': reply})

    return app
