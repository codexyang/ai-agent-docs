# Windows SadTalker 安裝評估報告
**日期：** 2026-06-10  
**評估機器：** Windows 10 Home（舊機，無 NVIDIA GPU）  
**目標：** 生成 AMY AI 銷售代言人說話影片

---

## 已完成的工作（舊 Windows 機器）

| 步驟 | 狀態 | 路徑 |
|------|------|------|
| Miniconda 下載安裝 | ✅ 完成 | `C:\miniconda3`（靜默安裝） |
| SadTalker clone | ✅ 完成 | `C:\SadTalker` |
| Python venv 建立 | ✅ 完成 | `C:\SadTalker\venv` |
| PyTorch CPU 版安裝 | ✅ 完成 | torch 2.0.1+cpu |
| requirements.txt | ⏳ 安裝中 | — |

---

## 硬體評估：舊機（不建議用於正式生產）

- **CPU：** Intel（型號未知）
- **顯卡：** Intel HD Graphics 4000 + AMD Radeon HD 7600M
- **CUDA：** ❌ 不支援（SadTalker 的 GPU 加速僅支援 NVIDIA CUDA）
- **執行模式：** CPU only
- **預估速度：** 25 秒影片 → 約 1-2 小時
- **結論：** 可以跑，但速度不適合規模化生產

---

## 新機器建議（Windows i7 + 獨顯）

### 安裝前請確認
```powershell
# 確認 NVIDIA GPU
nvidia-smi

# 確認 CUDA 版本
nvcc --version
```

### 安裝步驟（從零開始）

#### 1. 安裝 Miniconda（若未安裝）
```powershell
curl -o miniconda.exe https://repo.anaconda.com/miniconda/Miniconda3-py310_23.5.2-0-Windows-x86_64.exe
Start-Process -Wait -FilePath ".\miniconda.exe" -ArgumentList "/S /D=C:\miniconda3"
```

#### 2. Clone SadTalker
```powershell
cd C:\
git clone https://github.com/OpenTalker/SadTalker.git
cd SadTalker
```

#### 3. 建立 conda 環境
```powershell
C:\miniconda3\Scripts\conda.exe create -n sadtalker python=3.10 -y
C:\miniconda3\Scripts\conda.exe activate sadtalker
```

#### 4. 安裝 PyTorch（GPU 版，CUDA 11.8）
```powershell
# CUDA 11.8 版本
C:\miniconda3\envs\sadtalker\Scripts\pip.exe install torch==2.0.1 torchvision==0.15.2 torchaudio==2.0.2 --index-url https://download.pytorch.org/whl/cu118

# 若 CUDA 12.1：
# pip install torch==2.0.1 torchvision==0.15.2 --index-url https://download.pytorch.org/whl/cu121
```

#### 5. 安裝依賴
```powershell
C:\miniconda3\envs\sadtalker\Scripts\pip.exe install -r requirements.txt
```

#### 6. 修復 torchvision 相容問題
找到並修改：`C:\SadTalker\src\utils\preprocess.py` 或 `basicsr/data/degradations.py`

```python
# 舊（會報錯）
from torchvision.transforms.functional_tensor import rgb_to_grayscale
# 改成
from torchvision.transforms.functional import rgb_to_grayscale
```

#### 7. 下載模型 Checkpoints
```powershell
# 方法一：執行腳本
python scripts/download_correct_model.py

# 方法二：手動下載到 checkpoints/ 資料夾
# 所需模型：
# - SadTalker_V0.0.2_256.safetensors
# - mapping_00109-model.pth.tar
# - mapping_00229-model.pth.tar
# 下載來源：https://github.com/OpenTalker/SadTalker/releases/tag/v0.0.2-rc
```

#### 8. 下載 GFPGAN 增強模型（可選，畫質更好）
```powershell
mkdir gfpgan\weights
curl -L "https://github.com/xinntao/facexlib/releases/download/v0.1.0/detection_Resnet50_Final.pth" -o gfpgan\weights\detection_Resnet50_Final.pth
curl -L "https://github.com/TencentARC/GFPGAN/releases/download/v1.3.4/GFPGANv1.4.pth" -o gfpgan\weights\GFPGANv1.4.pth
```

---

## 生成 AMY 影片指令

### 素材路徑（複製到新機器）
- 照片：`S__11853828.jpg`（白西裝半身商務照）
- 音檔：`802657332.875435.mp4`（語音）→ 需先轉 WAV

### 音檔轉換（若有 ffmpeg）
```powershell
ffmpeg -i 802657332.875435.mp4 -ar 16000 -ac 1 amy_voice.wav -y
```

### 執行 SadTalker
```powershell
cd C:\SadTalker
C:\miniconda3\envs\sadtalker\Scripts\python.exe inference.py `
  --driven_audio "C:\AMY\amy_voice.wav" `
  --source_image "C:\AMY\S__11853828.jpg" `
  --result_dir "C:\AMY\results" `
  --preprocess full `
  --still `
  --enhancer gfpgan
```

---

## 預估速度對比

| 機器 | GPU | 25 秒影片 |
|------|-----|-----------|
| 舊 Windows（這台）| 無 CUDA | 1-2 小時 |
| Mac Intel | 無 CUDA | ~2 小時 |
| **新 Windows i7 + 獨顯** | **NVIDIA CUDA** | **5-10 分鐘** |

---

## 注意事項

1. **素材需複製到新機器** — AMY 照片 + 音檔從舊機或 Mac 帶過去
2. **確認 NVIDIA 驅動版本** — CUDA 11.8 需要 driver ≥ 452.39
3. **SadTalker 是臉部+頭部動作** — 不是全身動作，但半身照效果佳
4. **第一次跑會自動下載額外模型** — 確保網路暢通
5. **結果影片** 在 `C:\AMY\results\` 或 `--result_dir` 指定路徑

---

## AMY 模組系統（未來規劃）

根據 `SKY-SHOPPING-AMY-MODULE-SYSTEM.md`，未來將建立 5 個 AMY 模組：
- AMY-A：開場推薦（新品/主打）
- AMY-B：專業說明（保健品）
- AMY-C：促銷限時
- AMY-D：精品推介
- AMY-E：暖心分享（食品/生活）

GPU 機器就位後，批量生產這 5 支模板影片，再配合 Edge TTS 動態生成語音，支援 10 萬件以上商品。

---

*本文件由 Claude Code（Windows 端）評估撰寫，2026-06-10*
