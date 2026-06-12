# AI Agent 主控文件 — 所有 AI 接手必讀

> **2026-06-12 整合更新：** 開工前先讀 `CURRENT_STATUS.md`。若本文件中任何舊資訊與 `CURRENT_STATUS.md`、`LOCKED_SCRIPT_MODE.md`、`AMY-CONTENT-GOVERNANCE.md` 或 `CORE-RULES.md` 衝突，以較新的鎖定規則為準。

**最後更新：** 2026-06-12
**負責人：** Yangkean（Pegasustour VIP 負責人）
**適用：** Claude Code / ChatGPT / Codex / 任何 AI Agent

---

## ⚡ Mandatory Startup Rule — 所有 Agent 必須遵守

```
Before doing ANYTHING:

1. Read CURRENT_STATUS.md          ← 最新整合入口
2. Read LOCKED_SCRIPT_MODE.md      ← AMY 最高優先鐵規
3. Read AMY-CONTENT-GOVERNANCE.md  ← AMY 法律層級內容治理
4. Read AI_AGENT_MASTER.md         ← 你正在讀這份
5. Read CORE-RULES.md              ← 所有專案核心規則
6. Read ChatGPT-skill.md           ← 跨 AI 同步狀態
7. Read 對應專案的 AGENT-HANDOFF.md

Do NOT ask repeated onboarding questions.
Do NOT overwrite locked content.
Do NOT modify without user authorization.
Preserve stability. Follow locked standards.
```

---

## 使用者基本資訊

| 項目 | 內容 |
|------|------|
| 身份 | Pegasustour VIP 旅遊公司負責人 |
| 溝通語言 | 繁體中文（必須用繁中回覆） |
| 工作習慣 | 增量更新、穩定優先、不重構 |
| 使用的 AI | Claude Code + ChatGPT + Codex（同時並行） |
| 電腦環境 | MacBook Air Intel x86_64, macOS 12.7.6 |
| 同步機制 | 每次工作結束必須更新本文件 + ChatGPT-skill.md |

---

## 所有進行中專案總覽

### 1. Pegasustour Booking / V2.0 整合
- **狀態：** V1.53 多語言穩定歷史 + V2.0 兩站整合記錄並存；最新判定見 `CURRENT_STATUS.md`
- **網址記錄：** https://pegasustour-v1-5.vercel.app / https://pegasustour-vip.vercel.app
- **本地路徑：** `/Users/yangkean/Desktop/AI 助理/pegasus-booking`
- **穩定 commit：** `64a8f6f`
- **技術棧：** Next.js / TypeScript / Supabase / Prisma / Tailwind
- **🔒 禁止修改：** `app/layout.tsx`（全站崩潰風險）
- **待辦：** ECPay/LINE Pay 金流接入、Email/LINE 訂單通知

### 2. 🛒 SKY Shopping v1.0（購物平台）
- **狀態：** 穩定鎖定（2026-06-08）
- **網址：** https://sky-shopping-v1.vercel.app
- **本地路徑：** `/Users/yangkean/Desktop/AI 助理/sky-shopping-v1`（或 `/Users/yangkean/sky-shopping-v1`）
- **穩定 commit：** `6d471c6`（後台特賣管理 + SKU 批量補全）
- **技術棧：** Next.js 15 / TypeScript / Prisma / Supabase / Tailwind CSS v4 / Zustand
- **🔒 禁止修改：** `app/layout.tsx`、`lib/db.ts`、`prisma/schema.prisma`
- **允許微調：** UI 調整、文字修改、bug 修復
- **待辦：** 商品詳情頁、金流接入、Email/LINE 通知、V2.0 API 互通

### 3. AMY AI 銷售大使（SKY Shopping）
- **狀態：** 2026-06-11 起進入 `LOCKED_SCRIPT_MODE = TRUE`
- **最高規則：** 只能逐字朗讀 `amy-player/approved-scripts/{id}.txt`
- **禁止：** AI 自創台詞、rewrite、`build_script()`、根據商品推測功效或銷售文案
- **無核准稿：** 只能說「請洽客服了解更多詳情」
- **舊 SadTalker / 模板文件：** 視為 legacy planning，不得覆蓋內容治理鐵規

---

## AMY 影片生成歷史流程（Legacy）

> 下列 SadTalker 流程保留為歷史紀錄。任何 AMY 語音/影片生成前，必須先通過 `LOCKED_SCRIPT_MODE.md` 與 `AMY-CONTENT-GOVERNANCE.md` 的核准稿逐字比對規則。

```bash
# 第一步：啟動環境
cd ~/Desktop/SadTalker
conda activate sadtalker

# 第二步：文字轉語音（用 Edge TTS，效果最自然）
edge-tts --voice zh-CN-XiaoxiaoNeural --text "你的文字內容" --write-media ~/Desktop/amy_edge.mp3 && \
~/miniforge3/envs/sadtalker/bin/ffmpeg -i ~/Desktop/amy_edge.mp3 -ar 16000 -ac 1 ~/Desktop/amy_edge.wav -y

# 試聽
afplay ~/Desktop/amy_edge.mp3

# 備用：Mac 內建語音（語調較不自然）
# say -v Mei-Jia "你的文字內容" -o ~/Desktop/amy_speech.aiff && \
# ~/miniforge3/envs/sadtalker/bin/ffmpeg -i ~/Desktop/amy_speech.aiff -ar 16000 -ac 1 ~/Desktop/amy_speech.wav -y

# 第三步：生成影片（防斷線）
caffeinate -d python inference.py \
  --driven_audio ~/Desktop/amy_speech.wav \
  --source_image ~/Desktop/AI\ 機器人_Amy/S__11845643.jpg \
  --result_dir ./results \
  --enhancer gfpgan
```

**Intel Mac 速度：** 約每 5 秒影片需 19 分鐘，30 秒影片需 2 小時

---

## AMY 宣傳文字稿（最新版）

> 大家好，歡迎來到 SKY Shopping 商城精選館。今天想跟您分享幾款台灣在地特色精品，包括牛樟芝滴丸、五葉松純露水，以及古坑精品咖啡。我們希望透過精選與把關，讓您更安心地認識適合自己的產品。接下來，我也會陸續介紹更多台灣特色好物。

⚠️ 文字稿由用戶決定，以用戶最新口頭/文字說明為準，AI 不得自行更改。

---

## 電腦環境紀錄

| 工具 | 版本/路徑 | 狀態 |
|------|----------|------|
| macOS | 12.7.6 Intel x86_64 | ✅ |
| Homebrew | v5.1.15, `/usr/local/bin/brew` | ✅ |
| Miniforge | `~/miniforge3` | ✅ |
| Conda 環境 sadtalker | Python 3.10 | ✅ |
| ffmpeg | `~/miniforge3/envs/sadtalker/bin/ffmpeg` | ✅ |
| SadTalker | `~/Desktop/SadTalker` | ✅ 模型全下載 |
| Node.js / npm | 系統預設 | ✅ |
| Git | `/usr/local/bin/git` v2.54.0 | ✅ |
| 磁碟可用空間 | 約 49GB（2026-06-10 清理後） | ✅ |

---

## 已知問題與永久修復記錄

| 問題 | 修復位置 | 修復方式 |
|------|---------|---------|
| torchvision functional_tensor | `~/miniforge3/envs/sadtalker/lib/.../basicsr/data/degradations.py` line 8 | 改為 `from torchvision.transforms.functional import rgb_to_grayscale` |
| llvmlite 編譯失敗 | conda sadtalker 環境 | `conda install -c conda-forge llvmlite numba librosa` |
| wget SSL 憑證失敗 | `~/Desktop/SadTalker/scripts/download_models.sh` | 已加 `--no-check-certificate -c` |
| Mac 睡眠斷網 | 執行指令前加 `caffeinate -d` | 防止系統睡眠 |

---

## 跨 AI 同步規則

### 每次工作結束前必須更新：
0. `CURRENT_STATUS.md`（若整體狀態、衝突判定、repo 分工有變）
1. 本文件 `AI_AGENT_MASTER.md`
2. `ChatGPT-skill.md`（ChatGPT 讀這個）
3. `CORE-RULES.md`（專案規則）
4. Claude memory：`/Users/yangkean/.claude/projects/-Users-yangkean/memory/`
   - `MEMORY.md`（索引）
   - 對應的 `project_xxx.md`

### 各 AI 讀哪個文件：
| AI | 主要讀取文件 |
|----|------------|
| Claude Code | `~/.claude/projects/.../memory/` + 本文件 |
| ChatGPT | `ChatGPT-skill.md` + 本文件 |
| Codex | `AGENT-HANDOFF.md` + 本文件 |
| 任何新 AI | 本文件優先，再讀專案專屬文件 |

---

## 工作原則（所有 AI 必須遵守）

1. **繁中溝通** — 所有回覆必須用繁體中文
2. **增量更新** — 不重構、不大改、穩定優先
3. **詢問再動** — 不確定是否超出範圍，先問用戶
4. **同步文件** — 每次工作結束必須更新所有記憶文件
5. **token 效率** — 本地確認後才 push，禁止多輪小修循環
6. **鎖定保護** — 鎖定的 commit/檔案絕對不動

---

## 下次接手 Agent 待辦事項

- [ ] 確認 AMY `approved-scripts/{id}.txt` 是否存在且已核准
- [ ] 任何 AMY 音訊/影片生成前執行 Script Diff
- [ ] SKY Shopping 商品詳情頁開發
- [ ] 金流接入評估（ECPay / LINE Pay）
