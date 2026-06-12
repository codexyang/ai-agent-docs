export type TravelPackage = {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  highlights: string[];
  price: string;
  image: string;
  duration: string;
  pickup: string;
  confirmation: string;
  cancellation: string;
  notice: string;
  packageOptions: string[];
  itinerary: {
    time: string;
    title: string;
    detail: string;
  }[];
  included: string[];
  excluded: string[];
  vehicleOptions: {
    name: string;
    capacity: string;
    price: string;
    note: string;
  }[];
  status: "active" | "draft";
};

export const defaultTravelPackages: TravelPackage[] = [
  {
    id: "jiufen-shifen-day-tour",
    name: "九份十分包車一日遊",
    subtitle: "Jiufen & Shifen Day Tour",
    tag: "人氣 NO.1",
    highlights: ["天燈", "山城", "瀑布", "老街美食"],
    price: "NT$5,800 起",
    image: "/images/travel/jiufen-shifen-home-hero.jpg",
    duration: "約 9 小時",
    pickup: "台北市區飯店 / 車站可接送",
    confirmation: "客服確認路線與車型後成立",
    cancellation: "出發前 24 小時可免費改期一次",
    notice: "山區與老街路線可能因天候、交通或管制微調停留順序。",
    packageOptions: ["一日包車", "親子家庭", "VIP 車款升級", "機場接送加購"],
    itinerary: [
      { time: "09:00", title: "台北出發", detail: "飯店或指定地點接送，確認人數與行李。" },
      { time: "10:00", title: "十分老街", detail: "天燈體驗、鐵道街景拍照。" },
      { time: "11:30", title: "十分瀑布", detail: "步道散策與瀑布觀景。" },
      { time: "13:00", title: "九份老街", detail: "自由午餐、山城小吃與茶樓停留。" },
      { time: "16:30", title: "彈性加點", detail: "依天候可調整為茶樓、夜景或瑞芳周邊。" },
      { time: "18:30", title: "返回台北", detail: "送回飯店、車站或指定下車點。" },
    ],
    included: ["專業司機", "車資與油資", "停車與過路費", "乘客保險", "客服行前確認"],
    excluded: ["餐食", "景點門票", "天燈費用", "導遊服務", "超時與臨時加點費用"],
    vehicleOptions: [
      { name: "五人座轎車", capacity: "1-3 位旅客", price: "NT$5,800 起", note: "適合情侶、小家庭與輕行李。" },
      { name: "九人座商務車", capacity: "4-8 位旅客", price: "NT$7,800 起", note: "推薦家庭與朋友同行。" },
      { name: "VIP 商務車", capacity: "1-6 位旅客", price: "NT$9,800 起", note: "重視舒適與高端接待。" },
    ],
    status: "active",
  },
  {
    id: "north-coast-yehliu-tamsui-sunset",
    name: "北海岸野柳淡水夕陽一日遊",
    subtitle: "North Coast Yehliu & Tamsui Sunset Tour",
    tag: "人氣 NO.2 行程",
    highlights: ["野柳地質公園", "漁港風情", "淡水老街", "淡水夕陽"],
    price: "NT$5,800 起",
    image: "/images/travel/jiufen-shifen-reference.jpg",
    duration: "約 9 小時",
    pickup: "台北 / 新北市區指定地點",
    confirmation: "客服確認潮汐、日落時間與車型後成立",
    cancellation: "出發前 24 小時可免費改期一次",
    notice: "海岸路線受風雨與日落時間影響，行程順序可由客服協助調整。",
    packageOptions: ["一日包車", "夕陽攝影", "親子家庭", "海鮮午餐代訂"],
    itinerary: [
      { time: "09:00", title: "台北出發", detail: "指定地點接送，沿北海岸移動。" },
      { time: "10:00", title: "野柳地質公園", detail: "女王頭、奇岩海岸與步道拍照。" },
      { time: "11:40", title: "漁港午餐", detail: "可安排富基、龜吼或周邊海味餐廳。" },
      { time: "13:30", title: "北海岸景點", detail: "石門洞、老梅、白沙灣依季節彈性安排。" },
      { time: "15:30", title: "淡水老街", detail: "河岸散策、小吃與伴手禮。" },
      { time: "17:00", title: "淡水夕陽", detail: "漁人碼頭或河岸最佳夕陽時段停留。" },
    ],
    included: ["專業司機", "車資與油資", "停車與過路費", "乘客保險", "客服行前確認"],
    excluded: ["餐食", "景點門票", "導遊服務", "私人消費", "超時與臨時加點費用"],
    vehicleOptions: [
      { name: "五人座轎車", capacity: "1-3 位旅客", price: "NT$5,800 起", note: "適合輕鬆海岸小旅行。" },
      { name: "九人座商務車", capacity: "4-8 位旅客", price: "NT$7,800 起", note: "推薦家庭、長輩同行。" },
      { name: "VIP 商務車", capacity: "1-6 位旅客", price: "NT$9,800 起", note: "適合攝影行程與高端接待。" },
    ],
    status: "active",
  },
  {
    id: "yilan-hot-spring",
    name: "宜蘭溫泉慢旅",
    subtitle: "Yilan Hot Spring Escape",
    tag: "慢旅推薦",
    highlights: ["溫泉", "田野", "咖啡", "包車"],
    price: "專人報價",
    image: "/images/travel/jiufen-shifen-reference.jpg",
    duration: "約 8-10 小時",
    pickup: "台北 / 新北 / 宜蘭可接送",
    confirmation: "客服確認溫泉、餐廳與停留時間後報價",
    cancellation: "依店家預約規則與車隊確認為準",
    notice: "溫泉與餐廳需依現場席次預約，建議提前 3-5 天詢價。",
    packageOptions: ["一日慢旅", "溫泉代訂", "咖啡景觀", "親子輕旅行"],
    itinerary: [
      { time: "09:00", title: "台北出發", detail: "走雪隧前往宜蘭，沿途視路況調整。" },
      { time: "10:30", title: "礁溪溫泉", detail: "溫泉街散策或湯屋代訂。" },
      { time: "12:30", title: "在地午餐", detail: "宜蘭料理、無菜單或親子友善餐廳。" },
      { time: "14:00", title: "田野景點", detail: "伯朗大道、傳藝中心或員山景觀咖啡。" },
      { time: "16:30", title: "伴手禮停靠", detail: "可安排奕順軒、鴨賞或糕餅店。" },
      { time: "18:30", title: "返回台北", detail: "依塞車狀況調整回程時間。" },
    ],
    included: ["專業司機", "車資與油資", "停車與過路費", "乘客保險", "客服行前確認"],
    excluded: ["餐食", "湯屋費用", "景點門票", "導遊服務", "超時與臨時加點費用"],
    vehicleOptions: [
      { name: "五人座轎車", capacity: "1-3 位旅客", price: "專人報價", note: "適合雙人與小家庭慢旅行。" },
      { name: "九人座商務車", capacity: "4-8 位旅客", price: "專人報價", note: "推薦家庭與長輩同行。" },
      { name: "VIP 商務車", capacity: "1-6 位旅客", price: "專人報價", note: "適合溫泉餐廳預約行程。" },
    ],
    status: "active",
  },
];
