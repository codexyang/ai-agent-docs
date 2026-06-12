# AI智慧系統旅遊行程 New Module

此資料夾由桌面 `AI 助理/pegasus-booking` 拆出，只同步旅遊模組必要檔案。

## 包含內容
- `/travel` 旅遊行程前台
- `/travel-admin` 旅遊行程維護後台
- `/api/travel-packages` 旅遊行程資料 API
- `data/travel-packages.json` 行程資料
- `public/images/travel` 九份十分、北海岸、阿里山行程圖
- `Travel Module` 交接與設計規格文件

## 保護規則
此模組保持獨立，不連接原機場接送 Excel、LINE 派單、Gmail 或付款流程，直到正式核准整合。

## 啟動
```bash
npm install
npm run dev
```

建議先在獨立模組完成 UI 與資料維護驗證，再合併回 Pegasus booking v1.12，作為未來 v1.5.0 整合基礎。
