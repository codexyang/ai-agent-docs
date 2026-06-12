# SKY Shopping AMY 模組系統規格 v1.0

**最後更新：** 2026-06-10
**狀態：** 規劃確認，待執行
**負責人：** Yangkean

> **2026-06-12 整合註記：** 本文件是歷史規劃。任何「即時替換文字與商品資料」、「自動帶入產品名稱/特色/優惠」、「套模板生成介紹」均已被 `LOCKED_SCRIPT_MODE.md` 與 `AMY-CONTENT-GOVERNANCE.md` 覆蓋。AMY 只能逐字朗讀核准稿。

---

## 系統概念

**不是每件產品生成一支影片，而是：**

```
幾套固定 AMY 影片模組（Reusable Templates / legacy planning）
+
讀取已核准文字稿
+
Edge TTS 即時生成語音
=
支援十萬件以上產品，成本幾乎為零
```

---

## 第一階段：5 套 AMY 模組

| 模組 | 代號 | 動作風格 | 適用場景 | 狀態 |
|------|------|---------|---------|------|
| 開場推薦 | `AMY-A` | 微笑招手、熱情介紹 | 新品、主打商品 | 待生成 |
| 專業說明 | `AMY-B` | 點頭、手勢比劃 | 保健品、功能性商品 | 待生成 |
| 促銷限時 | `AMY-C` | 活潑、強調動作 | 特賣、折扣商品 | 待生成 |
| 精品推介 | `AMY-D` | 優雅、沉穩 | 高端商品 | 待生成 |
| 暖心分享 | `AMY-E` | 親切、像朋友 | 食品、生活類商品 | 待生成 |

---

## 文字模板格式（Legacy，禁止自動套用）

> 保留為歷史紀錄；不得用來自動生成 AMY 銷售台詞。

```
[開場]   大家好，我是 AMY！
[產品名] 今天要介紹的是【產品名稱】
[特色1]  這款產品的特色是【特色描述】
[特色2]  【第二特色，可選】
[適合]   非常適合【目標客群描述】
[促銷]   現在 SKY Shopping 有【優惠說明】
[結尾]   快來看看吧！
```

### 範例（牛樟芝滴丸）
```
大家好，我是 AMY！
今天要介紹的是【牛樟芝滴丸】
這款產品的特色是【天然台灣牛樟芝萃取、增強免疫力】
每天只需幾滴，輕鬆養生
非常適合【注重健康、工作忙碌的您】
現在 SKY Shopping 有特別優惠價
快來看看吧！
```

### 範例（古坑精品咖啡）
```
大家好，我是 AMY！
今天要介紹的是【古坑精品咖啡】
這款產品特色是【台灣古坑產地直送、香醇回甘】
每一口都是台灣山林的味道
非常適合【喜愛精品咖啡、支持台灣在地農業的您】
現在 SKY Shopping 特價優惠中
快來看看吧！
```

---

## 技術架構

### 運作流程
```
客人點擊產品
      ↓
系統確認是否存在 approved-scripts/{id}.txt
      ↓
存在核准稿才讀取；不存在則只說「請洽客服了解更多詳情」
      ↓
Edge TTS 即時生成語音（1-2秒）
      ↓
播放 AMY 影片 + 語音
      ↓
客人看到 AMY 介紹這件產品
```

### 產品類別對應模組
| 產品類別 | 使用模組 |
|---------|---------|
| 新品上架 | AMY-A |
| 保健養生 | AMY-B |
| 限時特賣 | AMY-C |
| 精品禮盒 | AMY-D |
| 食品飲料 | AMY-E |
| 生活用品 | AMY-E |

---

## 語音設定

| 項目 | 設定 |
|------|------|
| 主要聲音 | `zh-CN-XiaoxiaoNeural`（Edge TTS） |
| 備用聲音 | `zh-TW-HsiaoChenNeural`（台灣腔） |
| 語速 | 0.92–0.95 |
| 格式 | WAV 16000Hz mono |

### 生成指令
```bash
edge-tts --voice zh-CN-XiaoxiaoNeural \
  --rate "-5%" \
  --text "說詞內容" \
  --write-media ~/Desktop/amy_product.mp3

~/miniforge3/envs/sadtalker/bin/ffmpeg \
  -i ~/Desktop/amy_product.mp3 \
  -ar 16000 -ac 1 \
  ~/Desktop/amy_product.wav -y
```

---

## AMY 影片生成規格（SadTalker）

每套模組需生成兩個版本：

| 版本 | 參數 | 用途 |
|------|------|------|
| 全身版 | `--preprocess full --still` | 主頁、大視窗 |
| 半身版 | `--preprocess crop --still` | 側欄、彈出視窗 |

### 生成指令
```bash
cd ~/Desktop/SadTalker && conda activate sadtalker

# 全身版
caffeinate -d python inference.py \
  --driven_audio ~/Desktop/amy_module_X.wav \
  --source_image ~/Desktop/AI\ 機器人_Amy/S__11845643.jpg \
  --result_dir ./results/module_X \
  --preprocess full --still --enhancer gfpgan

# 半身版
caffeinate -d python inference.py \
  --driven_audio ~/Desktop/amy_module_X.wav \
  --source_image ~/Desktop/AI\ 機器人_Amy/S__11845643.jpg \
  --result_dir ./results/module_X \
  --preprocess crop --still --enhancer gfpgan
```

---

## 第一階段執行順序

- [ ] 1. 確認目前跑完的影片效果（全身/半身）
- [ ] 2. 撰寫 5 套模組的示範腳本
- [ ] 3. 用 Edge TTS 生成 5 套語音
- [ ] 4. 用 SadTalker 生成 5 套 AMY 影片（全身+半身各一）
- [ ] 5. 上傳影片到雲端（YouTube unlisted / Cloudinary）
- [ ] 6. 整合進 SKY Shopping 商品頁
- [ ] 7. 測試客人點產品時的播放效果

---

## 第二階段規劃（日後）

- 後台管理介面：輸入說詞 → 一鍵生成語音 → 自動上線
- 男專家模組（第二代言人）
- 多語言版本（英文、日文）
- 依瀏覽行為智能選擇模組

---

## 注意事項

- AMY 影片為 **固定資產**，不隨產品更新，只換語音
- 語音由 Edge TTS 即時生成，無額外費用
- 十萬件產品均可使用，容量不是問題
- 新增產品只需填入文字模板即可，無需重新生成影片
