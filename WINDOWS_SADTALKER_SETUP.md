# Windows SadTalker 安裝指南 — AMY AI 銷售大使

**最後更新：** 2026-06-10
**給：** Windows 電腦上的 AI Agent

---

## 你的任務

在 Windows 電腦安裝 SadTalker，生成 SKY Shopping AMY AI 銷售大使說話影片。
素材已在 Mac 準備好，需要傳輸到 Windows。

---

## 需要從 Mac 傳到 Windows 的檔案

| 檔案 | Mac 路徑 | 說明 |
|------|---------|------|
| AMY 照片 | `~/Desktop/AI 機器人_Amy/S__11845643.jpg` | 人像照片 |
| 語音檔A | `~/Desktop/amy_edge.wav` | Edge TTS 普通話女聲 |
| 語音檔B | `~/Desktop/amy_tw.wav` | 台灣腔女聲（如已生成） |

傳輸方式：USB隨身碟 / Google Drive / AirDrop to iPhone then to Windows

---

## Windows 安裝步驟

### 第一步：安裝必要工具

1. 下載安裝 **Git for Windows**
   - 網址：https://git-scm.com/download/win
   - 全部預設選項安裝

2. 下載安裝 **Miniconda（Windows 64-bit）**
   - 網址：https://docs.conda.io/en/latest/miniconda.html
   - 安裝時勾選「Add Miniconda to PATH」

### 第二步：開啟 Anaconda Prompt（以系統管理員執行）

搜尋「Anaconda Prompt」→ 右鍵 → 以系統管理員身分執行

### 第三步：下載 SadTalker

```bash
cd C:\
git clone https://github.com/OpenTalker/SadTalker.git
cd SadTalker
```

### 第四步：建立 Conda 環境

```bash
conda create -n sadtalker python=3.10 -y
conda activate sadtalker
conda install -c conda-forge llvmlite numba librosa -y
```

### 第五步：安裝 PyTorch

**如果有 NVIDIA GPU（推薦，速度快10倍）：**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

**如果沒有 GPU（CPU only）：**
```bash
pip install torch torchvision torchaudio
```

### 第六步：安裝其他套件

建立 requirements_win.txt（複製以下內容）：
```
numpy==1.23.4
face_alignment==1.3.5
imageio==2.19.3
imageio-ffmpeg==0.4.7
resampy==0.3.1
pydub==0.25.1
scipy==1.10.1
kornia==0.6.8
tqdm
yacs==0.1.8
pyyaml
joblib==1.1.0
scikit-image==0.19.3
basicsr==1.4.2
facexlib==0.3.0
gradio
gfpgan
av
safetensors
```

```bash
pip install -r requirements_win.txt --ignore-installed llvmlite numba librosa
```

### 第七步：修復 torchvision 相容問題

```bash
python -c "import site; print(site.getsitepackages())"
```

找到 site-packages 路徑，然後編輯：
`{site-packages}\basicsr\data\degradations.py` 第 8 行

將：
```python
from torchvision.transforms.functional_tensor import rgb_to_grayscale
```
改為：
```python
from torchvision.transforms.functional import rgb_to_grayscale
```

### 第八步：下載 AI 模型

```bash
# 安裝 wget for Windows
pip install wget

# 執行下載腳本（需要網路）
python scripts/download_models.py
```

若沒有 download_models.py，手動下載模型到對應資料夾：
- `checkpoints/` 資料夾：SadTalker_V0.0.2_256.safetensors, SadTalker_V0.0.2_512.safetensors, mapping_00109-model.pth.tar, mapping_00229-model.pth.tar
- `gfpgan/weights/` 資料夾：alignment_WFLW_4HG.pth, detection_Resnet50_Final.pth, GFPGANv1.4.pth, parsing_parsenet.pth

---

## 生成 AMY 影片指令

素材放好後，在 Anaconda Prompt 執行：

```bash
cd C:\SadTalker
conda activate sadtalker

# 全身版
python inference.py --driven_audio C:\AMY\amy_edge.wav --source_image C:\AMY\S__11845643.jpg --result_dir C:\AMY\results --preprocess full --still --enhancer gfpgan

# 半身版
python inference.py --driven_audio C:\AMY\amy_edge.wav --source_image C:\AMY\S__11845643.jpg --result_dir C:\AMY\results --preprocess crop --still --enhancer gfpgan
```

---

## 文字稿（如需重新生成語音）

```
大家好，歡迎來到 SKY Shopping 商城精選館。今天想跟您分享幾款台灣在地特色精品，包括牛樟芝滴丸、五葉松純露水，以及古坑精品咖啡。我們希望透過精選與把關，讓您更安心地認識適合自己的產品。接下來，我也會陸續介紹更多台灣特色好物。
```

Windows 生成語音指令（需先安裝 edge-tts）：
```bash
pip install edge-tts
edge-tts --voice zh-CN-XiaoxiaoNeural --text "大家好，歡迎來到 SKY Shopping 商城精選館。今天想跟您分享幾款台灣在地特色精品，包括牛樟芝滴丸、五葉松純露水，以及古坑精品咖啡。我們希望透過精選與把關，讓您更安心地認識適合自己的產品。接下來，我也會陸續介紹更多台灣特色好物。" --write-media C:\AMY\amy_edge.mp3
ffmpeg -i C:\AMY\amy_edge.mp3 -ar 16000 -ac 1 C:\AMY\amy_edge.wav
```

---

## 速度參考

| 設備 | 25秒影片所需時間 |
|------|----------------|
| Intel Mac（無GPU） | 約 2 小時 |
| Windows CPU only | 約 1-2 小時 |
| Windows NVIDIA GPU | 約 5-10 分鐘 |

---

## 完成後

影片存在 `C:\AMY\results\` 資料夾，傳回 Mac 或直接在 Windows 使用。
