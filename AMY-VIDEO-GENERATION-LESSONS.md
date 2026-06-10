# AMY AI 影片生成 — 經驗總結（含失敗記錄）

**日期：** 2026-06-10
**負責人：** Yangkean
**重要性：** ⚠️ 所有 Agent 接手前必讀，避免重複走錯路

---

## ⛔ 重要警告

**不要再嘗試用 SadTalker 做全身數字人影片。**
**不要再嘗試在 Intel Mac 或 AMD GPU Windows 上本機跑 AI 影片生成。**
**直接用 Deevid AI 手機 App 生成。**

---

## 失敗嘗試完整記錄

### ❌ 失敗 1：SadTalker 全身版（--preprocess full）

**嘗試原因：** SadTalker 有 `--preprocess full` 參數，以為可以生成全身影片

**實際結果：** 
- 無論用什麼參數，輸出永遠是大頭照/臉部特寫
- `--preprocess full` 只是保留原圖比例，不是全身動作

**根本原因：**
- SadTalker 架構設計只做**臉部動畫**（facial animation）
- 它的核心是嘴型同步（lip sync）+ 頭部動作
- 從來不支援全身動作，這是工具本身的根本限制
- 不論怎麼調參數都無法解決

**浪費時間：** 約 8-10 小時測試

---

### ❌ 失敗 2：Intel Mac 本機跑 SadTalker

**嘗試原因：** 用戶有時沒有網路，希望離線使用

**實際結果：**
- 25 秒影片需要約 2 小時
- 十萬件產品 = 需要 20 萬小時，完全不可行
- 經常因 Mac 睡眠斷線中斷

**根本原因：**
- Intel Mac 無 GPU 加速
- SadTalker 需要 NVIDIA CUDA GPU 才能快速運行
- Apple Silicon (M1/M2/M3) 用 MPS 加速較好，但這台是 Intel

**已安裝環境（保留備用）：**
- SadTalker 路徑：`~/Desktop/SadTalker`
- Conda 環境：`sadtalker`（Python 3.10）
- 所有模型已下載完成
- 已修復 torchvision 相容問題

---

### ❌ 失敗 3：--enhancer gfpgan 最後步驟失敗

**症狀：** 
```
FileNotFoundError: [Errno 2] No such file or directory: 'xxxxx.mp4'
```

**原因：** GFPGAN 增強後的臨時檔案路徑問題，shutil.move 找不到 temp 檔

**臨時解決：** 去掉 `--enhancer gfpgan` 參數可以正常生成（無畫質增強）

**影片位置：** 結果在 `results/` 資料夾的 `S__11845643##amy_edge.mp4`（非 temp 檔）

---

### ❌ 失敗 4：llvmlite 編譯失敗

**症狀：** `ERROR: Failed building wheel for llvmlite`

**原因：** Intel Mac 上 llvmlite 需要從原始碼編譯，缺少 LLVM 依賴

**解決方式：** 
```bash
conda install -c conda-forge llvmlite numba librosa -y
# 然後 pip install 時加 --ignore-installed llvmlite numba librosa
```

---

### ❌ 失敗 5：wget SSL 憑證失敗

**症狀：** `錯誤：無法驗證 github.com 的憑證`

**解決方式：** 修改 download_models.sh 加入 `--no-check-certificate -c`

---

### ❌ 失敗 6：CapCut AI 數字人

**原因：** 需要付費，沒有足夠免費額度

---

### ❌ 失敗 7：HeyGen

**原因：** 免費版只有 1 分鐘，不夠用

---

### ❌ 失敗 8：Fish Audio

**原因：** 免費版有合成次數限制，無法大量使用

---

### ❌ 失敗 9：Kling AI / 即夢 AI

**原因：** 有每月免費額度限制，十萬件產品規模不可行

---

## ✅ 成功方案

### 語音生成：Edge TTS（完全免費）

```bash
pip install edge-tts

# 普通話（推薦）
edge-tts --voice zh-CN-XiaoxiaoNeural \
  --text "說詞內容" \
  --write-media ~/Desktop/amy_edge.mp3

# 台灣腔
edge-tts --voice zh-TW-HsiaoChenNeural \
  --text "說詞內容" \
  --write-media ~/Desktop/amy_tw.mp3

# 轉 WAV
~/miniforge3/envs/sadtalker/bin/ffmpeg \
  -i ~/Desktop/amy_edge.mp3 -ar 16000 -ac 1 \
  ~/Desktop/amy_edge.wav -y
```

---

### 全身數字人影片：Deevid AI（✅ 推薦）

**網址：** https://deevid.ai/zh-TW

**為什麼有效：**
- 雲端 GPU 伺服器處理，手機/電腦都能用
- 支援上傳自訂照片（AMY 照片可用）
- 全身動作 + 對嘴效果好
- 手機 App 操作簡單

**費用方案：**
| 方案 | 費用 | 每月影片數 | 畫質 |
|------|------|----------|------|
| 免費 | $0 | 4支（試用） | 有水印 |
| Lite | $10/月 | 40支 | 720P |
| Pro | $25/月 | 120支 | 1080P |
| Premium | $119/月 | 600支 | 1080P |

**注意：** 免費版有水印，商用需付費

**AMY 照片路徑：** `~/Desktop/AI 機器人_Amy/S__11845643.jpg`

---

## 正確的工作流程（2026-06-10 確認）

```
1. 確定產品說詞文字稿
        ↓
2. Edge TTS 生成語音（電腦，免費，1-2秒）
        ↓
3. Deevid AI 上傳 AMY 照片 + 語音（手機/電腦）
        ↓
4. 生成全身說話影片
        ↓
5. 上傳到 SKY Shopping 商品頁
```

---

## AMY 模組系統規劃

詳見：`SKY-SHOPPING-AMY-MODULE-SYSTEM.md`

**核心概念：**
- 5 套固定 AMY 影片模組（A/B/C/D/E）
- 只換語音和產品資料
- 支援十萬件以上產品
- Deevid 生成，Edge TTS 語音

---

## 硬體環境記錄

| 設備 | 規格 | AI 影片生成能力 |
|------|------|--------------|
| Mac Intel | macOS 12.7.6, 無 GPU | ❌ 太慢，不適合 |
| Windows | AMD 顯卡 | ❌ 大部分 AI 工具不支援 AMD |
| 雲端（Deevid） | NVIDIA GPU | ✅ 最佳選擇 |
| Google Colab | 免費 NVIDIA GPU | ✅ 備用選項 |

---

## 給下一個 Agent 的建議

1. **不要再裝任何本機 AI 影片工具**，直接用 Deevid
2. **語音用 Edge TTS**，已裝好在 sadtalker conda 環境
3. **SadTalker 保留但只用於嘴型同步測試**，不用於正式生產
4. **AMY 模組系統**見 `SKY-SHOPPING-AMY-MODULE-SYSTEM.md`
5. **所有規格**見 `SKY-SHOPPING-AI-SPOKESPERSON.md`
