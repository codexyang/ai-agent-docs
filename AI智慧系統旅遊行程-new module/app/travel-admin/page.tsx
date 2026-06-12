"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { TravelPackage } from "@/app/data/travelPackageDefaults";

type TravelMarqueeForm = {
  top: string;
  bottom: string;
};

type TravelPackageForm = {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  highlights: string;
  price: string;
  image: string;
  duration: string;
  pickup: string;
  confirmation: string;
  cancellation: string;
  notice: string;
  packageOptions: string;
  itinerary: string;
  included: string;
  excluded: string;
  vehicleOptions: string;
  status: TravelPackage["status"];
};

const blankForm: TravelPackageForm = {
  id: "",
  name: "",
  subtitle: "",
  tag: "新行程",
  highlights: "",
  price: "專人報價",
  image: "/images/travel/jiufen-shifen-reference.jpg",
  duration: "約 9 小時",
  pickup: "台北市區飯店 / 車站可接送",
  confirmation: "客服確認路線與車型後成立",
  cancellation: "出發前 24 小時可免費改期一次",
  notice: "行程可能因天候、交通或景點管制調整順序。",
  packageOptions: "一日包車、親子家庭、VIP 車款升級",
  itinerary: "09:00｜台北出發｜飯店或指定地點接送\n10:00｜第一景點｜停留拍照與自由活動\n12:30｜在地午餐｜可由客服協助建議\n15:00｜主景點｜深度停留\n18:30｜返回台北｜送回飯店或車站",
  included: "專業司機、車資與油資、停車與過路費、乘客保險、客服行前確認",
  excluded: "餐食、景點門票、導遊服務、私人消費、超時與臨時加點費用",
  vehicleOptions: "五人座轎車｜1-3 位旅客｜NT$5,800 起｜適合小家庭與輕行李\n九人座商務車｜4-8 位旅客｜NT$7,800 起｜推薦家庭與朋友同行\nVIP 商務車｜1-6 位旅客｜NT$9,800 起｜重視舒適與高端接待",
  status: "active",
};

const blankMarqueeForm: TravelMarqueeForm = {
  top: "",
  bottom: "",
};

function splitList(value: string) {
  return value
    .split(/[、,，\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function serializePackage(item: TravelPackage): TravelPackageForm {
  return {
    id: item.id,
    name: item.name,
    subtitle: item.subtitle,
    tag: item.tag,
    highlights: item.highlights.join("、"),
    price: item.price,
    image: item.image,
    duration: item.duration,
    pickup: item.pickup,
    confirmation: item.confirmation,
    cancellation: item.cancellation,
    notice: item.notice,
    packageOptions: item.packageOptions.join("、"),
    itinerary: item.itinerary.map((step) => `${step.time}｜${step.title}｜${step.detail}`).join("\n"),
    included: item.included.join("、"),
    excluded: item.excluded.join("、"),
    vehicleOptions: item.vehicleOptions
      .map((vehicle) => `${vehicle.name}｜${vehicle.capacity}｜${vehicle.price}｜${vehicle.note}`)
      .join("\n"),
    status: item.status,
  };
}

function parseItinerary(value: string) {
  return value
    .split("\n")
    .map((line) => {
      const [time = "", title = "", detail = ""] = line.split("｜").map((part) => part.trim());
      return { time, title, detail };
    })
    .filter((item) => item.time && item.title);
}

function parseVehicles(value: string) {
  return value
    .split("\n")
    .map((line) => {
      const [name = "", capacity = "", price = "", note = ""] = line.split("｜").map((part) => part.trim());
      return { name, capacity, price, note };
    })
    .filter((item) => item.name);
}

export default function TravelAdminPage() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [form, setForm] = useState(blankForm);
  const [marqueeForm, setMarqueeForm] = useState(blankMarqueeForm);
  const [message, setMessage] = useState("載入旅遊行程資料中...");
  const [marqueeMessage, setMarqueeMessage] = useState("載入跑馬燈資料中...");

  useEffect(() => {
    fetch("/api/travel-packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data.packages || []);
        setMessage("可維護平台式旅遊商品資料");
      })
      .catch(() => setMessage("資料讀取失敗，請稍後再試"));

    fetch("/api/travel-marquees")
      .then((res) => res.json())
      .then((data) => {
        setMarqueeForm({
          top: (data.marquees?.top || []).join("\n"),
          bottom: (data.marquees?.bottom || []).join("\n"),
        });
        setMarqueeMessage("首頁宣傳跑馬燈可由此更新");
      })
      .catch(() => setMarqueeMessage("跑馬燈資料讀取失敗"));
  }, []);

  const slugPreview = useMemo(
    () =>
      form.id ||
      form.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    [form.id, form.name],
  );

  async function savePackage() {
    setMessage("儲存中...");
    const payload = {
      ...form,
      id: slugPreview,
      highlights: splitList(form.highlights),
      packageOptions: splitList(form.packageOptions),
      itinerary: parseItinerary(form.itinerary),
      included: splitList(form.included),
      excluded: splitList(form.excluded),
      vehicleOptions: parseVehicles(form.vehicleOptions),
    };

    const res = await fetch("/api/travel-packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "儲存失敗");
      return;
    }

    setPackages(data.packages || []);
    setForm(blankForm);
    setMessage("已更新旅遊行程資料");
  }

  async function suggestPackage() {
    setMessage("AI 產生更新草稿中...");
    const payload = {
      ...form,
      id: slugPreview,
      highlights: splitList(form.highlights),
      packageOptions: splitList(form.packageOptions),
      itinerary: parseItinerary(form.itinerary),
      included: splitList(form.included),
      excluded: splitList(form.excluded),
      vehicleOptions: parseVehicles(form.vehicleOptions),
    };

    const res = await fetch("/api/travel-packages/ai-suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "AI 草稿產生失敗");
      return;
    }

    setForm(serializePackage(data.package));
    setMessage(data.message || "AI 已產生更新草稿，請確認後儲存");
  }

  async function saveMarquees() {
    setMarqueeMessage("儲存跑馬燈中...");

    const res = await fetch("/api/travel-marquees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        top: splitLines(marqueeForm.top),
        bottom: splitLines(marqueeForm.bottom),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setMarqueeMessage(data.error || "跑馬燈儲存失敗");
      return;
    }

    setMarqueeForm({
      top: (data.marquees?.top || []).join("\n"),
      bottom: (data.marquees?.bottom || []).join("\n"),
    });
    setMarqueeMessage("已更新首頁跑馬燈宣傳資訊");
  }

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white md:px-10">
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-yellow-500/15 pb-6">
        <div>
          <p className="text-sm font-black tracking-[0.3em] text-yellow-300">TRAVEL ADMIN</p>
          <h1 className="mt-2 text-3xl font-black text-yellow-400 md:text-5xl">
            旅遊商品維護後台
          </h1>
        </div>
        <div className="flex gap-3">
          <Link href="/travel" className="rounded-xl bg-yellow-400 px-4 py-3 font-black text-black">
            查看前台
          </Link>
        </div>
      </nav>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-[24px] border border-yellow-500/25 bg-zinc-950 p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-yellow-300">新增 / 更新行程</h2>
              <p className="mt-2 text-sm text-zinc-400">{message}</p>
            </div>
            <button
              onClick={() => setForm(blankForm)}
              className="rounded-xl border border-yellow-500/30 px-4 py-3 font-bold text-yellow-300"
            >
              清空新增
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="行程名稱" className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <input value={form.subtitle} onChange={(event) => setForm({ ...form, subtitle: event.target.value })} placeholder="英文副標" className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <input value={form.tag} onChange={(event) => setForm({ ...form, tag: event.target.value })} placeholder="標籤，例如 人氣 NO.1" className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="價格，例如 NT$5,800 起" className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <input value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} placeholder="行程時間，例如 約 9 小時" className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <input value={form.pickup} onChange={(event) => setForm({ ...form, pickup: event.target.value })} placeholder="接送資訊" className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
            </div>

            <input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="Hero 圖片路徑" className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
            <input value={form.id} onChange={(event) => setForm({ ...form, id: event.target.value })} placeholder={`網址代碼，可留空自動產生：${slugPreview || "travel-package"}`} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />

            <div className="grid gap-4 lg:grid-cols-2">
              <textarea value={form.highlights} onChange={(event) => setForm({ ...form, highlights: event.target.value })} placeholder="商品亮點，用頓號或換行分隔" rows={4} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <textarea value={form.packageOptions} onChange={(event) => setForm({ ...form, packageOptions: event.target.value })} placeholder="方案選項，用頓號或換行分隔" rows={4} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <textarea value={form.included} onChange={(event) => setForm({ ...form, included: event.target.value })} placeholder="費用包含，用頓號或換行分隔" rows={4} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <textarea value={form.excluded} onChange={(event) => setForm({ ...form, excluded: event.target.value })} placeholder="費用不包含，用頓號或換行分隔" rows={4} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
            </div>

            <textarea value={form.itinerary} onChange={(event) => setForm({ ...form, itinerary: event.target.value })} placeholder="每日行程：時間｜標題｜說明，每行一筆" rows={7} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
            <textarea value={form.vehicleOptions} onChange={(event) => setForm({ ...form, vehicleOptions: event.target.value })} placeholder="車型方案：車型｜容量｜價格｜說明，每行一筆" rows={5} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />

            <div className="grid gap-4 lg:grid-cols-3">
              <textarea value={form.confirmation} onChange={(event) => setForm({ ...form, confirmation: event.target.value })} placeholder="確認規則" rows={3} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <textarea value={form.cancellation} onChange={(event) => setForm({ ...form, cancellation: event.target.value })} placeholder="取消 / 改期規則" rows={3} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
              <textarea value={form.notice} onChange={(event) => setForm({ ...form, notice: event.target.value })} placeholder="注意事項" rows={3} className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none" />
            </div>

            <div className="grid gap-3 lg:grid-cols-[0.8fr_1fr]">
              <button
                onClick={suggestPackage}
                className="rounded-2xl border border-cyan-300 bg-cyan-50 px-6 py-4 text-lg font-black text-cyan-900 transition hover:scale-[1.01]"
              >
                AI 補齊母板草稿
              </button>
              <button
                onClick={savePackage}
                className="rounded-2xl bg-yellow-400 px-6 py-4 text-lg font-black text-black transition hover:scale-[1.01]"
              >
                確認並儲存行程資料
              </button>
            </div>
          </div>
        </div>

        <aside className="grid gap-6">
          <section className="rounded-[24px] border border-yellow-500/25 bg-zinc-950 p-5 md:p-6">
            <h2 className="text-2xl font-black text-yellow-300">跑馬燈維護</h2>
            <p className="mt-2 text-sm text-zinc-400">{marqueeMessage}</p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-zinc-300">
                首頁頂部跑馬燈
                <textarea
                  value={marqueeForm.top}
                  onChange={(event) => setMarqueeForm({ ...marqueeForm, top: event.target.value })}
                  rows={6}
                  placeholder="每行一則宣傳更新資訊"
                  className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-zinc-300">
                行程區塊跑馬燈
                <textarea
                  value={marqueeForm.bottom}
                  onChange={(event) => setMarqueeForm({ ...marqueeForm, bottom: event.target.value })}
                  rows={6}
                  placeholder="每行一則分類、優惠或重要提醒"
                  className="rounded-2xl border border-yellow-500/30 bg-black px-4 py-4 text-white outline-none"
                />
              </label>
              <button
                onClick={saveMarquees}
                className="rounded-2xl bg-yellow-400 px-5 py-3 font-black text-black transition hover:scale-[1.01]"
              >
                儲存跑馬燈
              </button>
            </div>
          </section>

          <section className="rounded-[24px] border border-yellow-500/25 bg-zinc-950 p-5 md:p-6">
            <h2 className="text-2xl font-black text-yellow-300">目前行程資料</h2>
            <p className="mt-2 text-sm text-zinc-400">點擊項目可載入編輯。</p>
            <div className="mt-6 grid gap-4">
              {packages.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setForm(serializePackage(item))}
                  className="rounded-2xl border border-yellow-500/15 bg-black p-5 text-left transition hover:border-yellow-400"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-white">{item.name}</h3>
                    <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-black text-black">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-yellow-300">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 text-zinc-400">{item.duration} · {item.pickup}</p>
                  <p className="mt-4 text-lg font-black text-yellow-400">{item.price}</p>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
