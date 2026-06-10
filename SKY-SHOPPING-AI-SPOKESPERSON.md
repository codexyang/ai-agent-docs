# SKY Shopping AI 代言人規格 v1.1

**最後更新：** 2026-06-10
**狀態：** 鎖定 v1.1 — 禁止未經授權修改
**適用：** Claude Code / Codex / ChatGPT / 所有 AI Agent

---

## ⚠️ Mandatory Startup Rule

Before doing anything related to SKY Shopping content:

1. Read `AI-AGENT-MASTER.md`
2. Read `CORE-RULES.md`
3. Read this file (`SKY-SHOPPING-AI-SPOKESPERSON.md`)

Do not ask repeated onboarding questions unless information is missing.
Preserve stability. Do not overwrite existing workflows. Follow locked standards.

---

## 1. 品牌名稱（Locked v1.1）

> ⛔ 正式鎖定名稱，不可任意更改。

**官方名稱：** `SKY Shopping 商城精選館`

**鎖定規則：**
- ❌ 不可改回「SKY Shopping 精選館」（缺少「商城」）
- ❌ 不可省略「商城」二字
- ❌ 不可未經授權修改

**適用範圍：**
- ✅ AI 代言人開場白
- ✅ 官網首頁影片
- ✅ 商品介紹影片
- ✅ 短影音
- ✅ AI 主持人口播
- ✅ 所有 Agent 規格文件
- ✅ SKY Shopping 品牌對外用語

---

## 2. 開場白（Locked v1.1）

> ⛔ 此開場白已正式鎖定 v1.1，禁止任意更改。如需修改，必須獲得用戶明確授權。

```
大家好，歡迎來到 SKY Shopping 商城精選館。
今天，很開心與您分享幾款來自台灣在地的特色精品。
包括牛樟芝滴丸、五葉松純露水，以及古坑精品咖啡。
我們希望，透過更安心、更透明的方式，陪您一起認識，真正適合自己的優質商品。
在 SKY Shopping，讓購物不只是選擇，更是一種安心與品質的體驗。
現在，就讓我們一起來看看今天的精選推薦吧。
```

**鎖定理由：**
- SKY Shopping 未來是多品類商城，「商城精選館」更完整
- AI 代言人口播語感更順暢、更像品牌級主持人
- 已在所有文件統一使用，保持一致性

---

## 2. AI 女主持人聲音風格（鎖定）

### 必須具備
- ✅ 友善
- ✅ 有親和力
- ✅ 陽光
- ✅ 專業
- ✅ 熱情
- ✅ 成熟精品感
- ✅ 適合商城代言人
- ✅ 適合 AI 對嘴影片（SadTalker）

### 語速
- 建議：**0.92–0.95**（略慢，清晰易懂）

### 禁止
- ❌ 不像直播主（不誇張）
- ❌ 不過度年輕聲線
- ❌ 不機械感
- ❌ 不像客服機器人

### 已確認可用語音
| 語音 | 平台 | 語言 | 評價 |
|------|------|------|------|
| `zh-CN-XiaoxiaoNeural` | Edge TTS | 普通話 | ✅ 已測試，效果良好 |
| `zh-TW-HsiaoChenNeural` | Edge TTS | 台灣腔 | 待測試 |
| Mei-Jia | Mac 內建 | 台灣國語 | 次選（語調偶有不自然） |

### 生成語音指令
```bash
# 普通話版（推薦）
edge-tts --voice zh-CN-XiaoxiaoNeural --text "文字內容" --write-media ~/Desktop/amy_edge.mp3

# 台灣腔版
edge-tts --voice zh-TW-HsiaoChenNeural --text "文字內容" --write-media ~/Desktop/amy_tw.mp3

# 轉 WAV
~/miniforge3/envs/sadtalker/bin/ffmpeg -i ~/Desktop/amy_edge.mp3 -ar 16000 -ac 1 ~/Desktop/amy_edge.wav -y
```

---

## 3. AI 代言人形象（AMY）

- **照片路徑：** `~/Desktop/AI 機器人_Amy/S__11845643.jpg`
- **外觀：** 白色西裝、珍珠耳環、專業親切
- **定位：** 中高端消費族群，精品商城代言人

### 影片生成指令（Mac）
```bash
cd ~/Desktop/SadTalker
conda activate sadtalker

# 全身版（適合主頁宣傳）
caffeinate -d python inference.py \
  --driven_audio ~/Desktop/amy_edge.wav \
  --source_image ~/Desktop/AI\ 機器人_Amy/S__11845643.jpg \
  --result_dir ./results \
  --preprocess full \
  --still \
  --enhancer gfpgan

# 半身版（適合側欄/小視窗）
caffeinate -d python inference.py \
  --driven_audio ~/Desktop/amy_edge.wav \
  --source_image ~/Desktop/AI\ 機器人_Amy/S__11845643.jpg \
  --result_dir ./results \
  --preprocess crop \
  --still \
  --enhancer gfpgan
```

---

## 4. AI 客服回答規則（鎖定）

所有 AI Agent 回答客人時：

### 必須
- ✅ 友善有親和力
- ✅ 有耐心
- ✅ 專業但不冰冷
- ✅ 容易理解
- ✅ 誠實說明產品特色

### 禁止
- ❌ 不可亂承諾（交期、效果、保證）
- ❌ 不可過度推銷
- ❌ 不可醫療誇大（如：治療、治癒）
- ❌ 不可金融保證（如：保證獲利）

---

## 5. 雙代言人方向（規劃中）

| 角色 | 性別 | 風格 | 功能 |
|------|------|------|------|
| AMY | 女 | 親切陽光 | 吸引力、親和力、導購 |
| 男專家 | 男 | 專業沉穩 | 專業解說、建立信任 |

---

## 6. Agent Consistency Rule

所有 Agent（Claude Code / Codex / ChatGPT / 未來 Agent）必須維持：

- ✅ 一致品質
- ✅ 一致品牌聲音
- ✅ 一致開場白（見第 1 節）
- ✅ 一致角色設定
- ❌ 禁止 silent overwrite（靜默覆蓋既有設定）
- ❌ 禁止自行修改鎖定內容

---

## 7. 相關文件連結

- 主控文件：[AI-AGENT-MASTER.md](./AI-AGENT-MASTER.md)
- 核心規則：[CORE-RULES.md](./CORE-RULES.md)
- Windows 安裝：[WINDOWS_SADTALKER_SETUP.md](./WINDOWS_SADTALKER_SETUP.md)
- SKY Shopping 專案：https://sky-shopping-v1.vercel.app
