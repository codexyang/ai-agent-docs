import { NextResponse } from "next/server";
import { normalizeTravelPackage } from "../travelPackageStore";
import type { TravelPackage } from "@/app/data/travelPackageDefaults";

const presetRules = [
  {
    keywords: ["九份", "十分", "平溪"],
    highlights: ["天燈", "山城", "瀑布", "老街美食"],
    options: ["一日包車", "親子家庭", "VIP 車款升級", "機場接送加購"],
    itinerary: [
      ["09:00", "台北出發", "飯店或指定地點接送，確認人數與行李。"],
      ["10:00", "十分老街", "天燈體驗、鐵道街景拍照。"],
      ["11:30", "十分瀑布", "步道散策與瀑布觀景。"],
      ["13:00", "九份老街", "自由午餐、山城小吃與茶樓停留。"],
      ["16:30", "彈性加點", "依天候可調整為茶樓、夜景或瑞芳周邊。"],
      ["18:30", "返回台北", "送回飯店、車站或指定下車點。"],
    ],
    notice: "山區與老街路線可能因天候、交通或管制微調停留順序。",
  },
  {
    keywords: ["北海岸", "野柳", "淡水"],
    highlights: ["野柳地質公園", "漁港風情", "淡水老街", "淡水夕陽"],
    options: ["一日包車", "夕陽攝影", "親子家庭", "海鮮午餐代訂"],
    itinerary: [
      ["09:00", "台北出發", "指定地點接送，沿北海岸移動。"],
      ["10:00", "野柳地質公園", "女王頭、奇岩海岸與步道拍照。"],
      ["11:40", "漁港午餐", "可安排富基、龜吼或周邊海味餐廳。"],
      ["13:30", "北海岸景點", "石門洞、老梅、白沙灣依季節彈性安排。"],
      ["15:30", "淡水老街", "河岸散策、小吃與伴手禮。"],
      ["17:00", "淡水夕陽", "漁人碼頭或河岸最佳夕陽時段停留。"],
    ],
    notice: "海岸路線受風雨與日落時間影響，行程順序可由客服協助調整。",
  },
  {
    keywords: ["宜蘭", "礁溪", "溫泉"],
    highlights: ["溫泉", "田野", "咖啡", "包車"],
    options: ["一日慢旅", "溫泉代訂", "咖啡景觀", "親子輕旅行"],
    itinerary: [
      ["09:00", "台北出發", "走雪隧前往宜蘭，沿途視路況調整。"],
      ["10:30", "礁溪溫泉", "溫泉街散策或湯屋代訂。"],
      ["12:30", "在地午餐", "宜蘭料理、無菜單或親子友善餐廳。"],
      ["14:00", "田野景點", "傳藝中心、員山景觀咖啡或季節景點。"],
      ["16:30", "伴手禮停靠", "可安排糕餅、鴨賞或在地小店。"],
      ["18:30", "返回台北", "依塞車狀況調整回程時間。"],
    ],
    notice: "溫泉與餐廳需依現場席次預約，建議提前 3-5 天詢價。",
  },
];

function findPreset(name: string) {
  return presetRules.find((rule) => rule.keywords.some((keyword) => name.includes(keyword))) || presetRules[0];
}

function toTitleCaseSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<TravelPackage>;
  const name = String(body.name || "客製化包車一日遊").trim();
  const preset = findPreset(name);
  const id = body.id || toTitleCaseSlug(String(body.subtitle || "")) || `travel-${Date.now()}`;
  const suggestion = normalizeTravelPackage({
    ...body,
    id,
    name,
    subtitle: body.subtitle || `${name} Private Tour`,
    tag: body.tag || "AI 建議",
    highlights: body.highlights?.length ? body.highlights : preset.highlights,
    price: body.price || "專人報價",
    image: body.image || "/images/travel/jiufen-shifen-reference.jpg",
    duration: body.duration || "約 8-10 小時",
    pickup: body.pickup || "台北 / 新北市區指定地點",
    confirmation: body.confirmation || "客服確認路線、車型與可預約時段後成立",
    cancellation: body.cancellation || "出發前 24 小時可免費改期一次，特殊預約依店家規則為準",
    notice: body.notice || preset.notice,
    packageOptions: body.packageOptions?.length ? body.packageOptions : preset.options,
    itinerary: body.itinerary?.length
      ? body.itinerary
      : preset.itinerary.map(([time, title, detail]) => ({ time, title, detail })),
    included: body.included?.length
      ? body.included
      : ["專業司機", "車資與油資", "停車與過路費", "乘客保險", "客服行前確認"],
    excluded: body.excluded?.length
      ? body.excluded
      : ["餐食", "景點門票", "導遊服務", "私人消費", "超時與臨時加點費用"],
    vehicleOptions: body.vehicleOptions?.length
      ? body.vehicleOptions
      : [
          { name: "五人座轎車", capacity: "1-3 位旅客", price: "專人報價", note: "適合小家庭與輕行李。" },
          { name: "九人座商務車", capacity: "4-8 位旅客", price: "專人報價", note: "推薦家庭與朋友同行。" },
          { name: "VIP 商務車", capacity: "1-6 位旅客", price: "專人報價", note: "適合高端接待與舒適旅程。" },
        ],
  });

  return NextResponse.json({
    mode: "draft",
    message: "AI 已產生更新草稿，需由工作人員確認後儲存。",
    package: suggestion,
  });
}
