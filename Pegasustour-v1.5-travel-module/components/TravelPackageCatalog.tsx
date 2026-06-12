"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type ReactNode } from "react";
import type { TravelPackage } from "@/app/data/travelPackageDefaults";

type Category = {
  id: string;
  label: string;
  keywords: string[];
};

const categories: Category[] = [
  { id: "all", label: "全部行程", keywords: [] },
  { id: "north", label: "北台灣", keywords: ["台北", "新北", "基隆", "九份", "十分", "平溪", "北海岸", "野柳", "淡水", "宜蘭", "陽明山", "北投", "烏來"] },
  { id: "taoyuan-hsinchu-miaoli", label: "桃竹苗", keywords: ["桃園", "大溪", "拉拉山", "新竹", "北埔", "司馬庫斯", "苗栗", "南庄", "三義", "大湖", "泰安"] },
  { id: "central", label: "中台灣", keywords: ["台中", "彰化", "鹿港", "南投", "日月潭", "清境", "溪頭", "杉林溪", "埔里", "奧萬大"] },
  { id: "southwest", label: "雲嘉南", keywords: ["雲林", "北港", "古坑", "嘉義", "阿里山", "梅山", "台南", "安平", "七股", "關子嶺"] },
  { id: "kaoping", label: "高屏", keywords: ["高雄", "港灣", "佛光山", "美濃", "旗山", "屏東", "墾丁", "小琉球", "霧台", "四重溪"] },
  { id: "east", label: "東台灣", keywords: ["花蓮", "太魯閣", "七星潭", "瑞穗", "台東", "熱氣球", "池上", "知本", "多良"] },
  { id: "islands", label: "離島", keywords: ["澎湖", "金門", "馬祖", "綠島", "蘭嶼"] },
  { id: "premium", label: "商務客製", keywords: ["米其林", "頂級", "商務", "尊榮", "客製", "機場"] },
];

const personaSections = [
  {
    title: "適合季節性",
    subtitle: "花季、夕陽、溫泉、賞楓、雲海",
    keywords: ["花季", "夕陽", "溫泉", "賞楓", "雲海", "季節", "櫻花", "螢火蟲"],
  },
  {
    title: "適合親子",
    subtitle: "動物園、DIY、牧場、輕鬆路線",
    keywords: ["親子", "牧場", "動物園", "DIY", "家庭", "樂園", "採果"],
  },
  {
    title: "適合長輩",
    subtitle: "少步行、舒適景點、溫泉慢旅",
    keywords: ["長輩", "溫泉", "慢旅", "輕鬆", "北投", "礁溪", "知本", "四重溪"],
  },
  {
    title: "適合網美",
    subtitle: "打卡、夕陽、花季、海岸咖啡",
    keywords: ["網美", "打卡", "夕陽", "花季", "咖啡", "夜景", "海岸", "攝影"],
  },
];

const searchSuggestions = [
  "九份",
  "阿里山",
  "親子",
  "長輩",
  "溫泉",
  "夕陽",
  "VIP",
  "機場接送",
  "網美打卡",
  "一日遊",
];

function haystack(item: TravelPackage) {
  return [
    item.id,
    item.name,
    item.subtitle,
    item.tag,
    item.price,
    item.duration,
    item.pickup,
    item.confirmation,
    item.cancellation,
    item.notice,
    item.highlights.join(" "),
    item.packageOptions.join(" "),
    item.included.join(" "),
    item.excluded.join(" "),
    item.itinerary.map((step) => `${step.time} ${step.title} ${step.detail}`).join(" "),
    item.vehicleOptions.map((vehicle) => `${vehicle.name} ${vehicle.capacity} ${vehicle.price} ${vehicle.note}`).join(" "),
  ].join(" ");
}

function matchCategory(item: TravelPackage, category: Category) {
  if (category.id === "all") return true;
  const text = haystack(item);
  return category.keywords.some((keyword) => text.includes(keyword));
}

function PackageCarouselCard({
  item,
  compact = false,
  dark = false,
}: {
  item: TravelPackage;
  compact?: boolean;
  dark?: boolean;
}) {
  return (
    <a
      href="#quick-booking"
      className={`group block shrink-0 snap-start overflow-hidden rounded-2xl shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-xl ${
        compact ? "w-[178px] sm:w-[200px]" : "w-[220px] sm:w-[250px]"
      } ${dark ? "bg-white/8 ring-yellow-300/20" : "bg-white ring-amber-200"}`}
    >
      <div className={compact ? "relative h-28" : "relative h-36"}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={compact ? "200px" : "250px"}
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute left-2 top-2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-black">
          {item.tag}
        </span>
        <strong className="absolute bottom-2 left-2 right-2 line-clamp-2 text-sm font-black leading-tight text-white">
          {item.name}
        </strong>
      </div>
      <div className={compact ? "p-2" : "p-3"}>
        <p className={`truncate text-xs font-black ${dark ? "text-yellow-100" : "text-amber-700"}`}>
          {item.highlights.slice(0, 2).join(" × ")}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className={`truncate text-[11px] font-bold ${dark ? "text-white/70" : "text-zinc-500"}`}>
            {item.duration}
          </span>
          <strong className={`shrink-0 text-xs ${dark ? "text-yellow-200" : "text-zinc-950"}`}>
            {item.price}
          </strong>
        </div>
      </div>
    </a>
  );
}

function ScrollableCarousel({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scrollRow(direction: -1 | 1) {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * Math.max(row.clientWidth * 0.82, 260), behavior: "smooth" });
  }

  const buttonClass = dark
    ? "border-yellow-300/40 bg-black/70 text-yellow-200 hover:bg-yellow-300 hover:text-black"
    : "border-zinc-200 bg-white/90 text-zinc-950 hover:bg-zinc-950 hover:text-yellow-200";

  return (
    <div className={`carousel-shell relative ${className}`}>
      <button
        type="button"
        aria-label="上一組"
        onClick={() => scrollRow(-1)}
        className={`carousel-arrow left-1 ${buttonClass}`}
      >
        ‹
      </button>
      <div ref={rowRef} className="carousel-row flex snap-x gap-3 overflow-x-auto pb-3">
        {children}
      </div>
      <button
        type="button"
        aria-label="下一組"
        onClick={() => scrollRow(1)}
        className={`carousel-arrow right-1 ${buttonClass}`}
      >
        ›
      </button>
    </div>
  );
}

export default function TravelPackageCatalog({ packages }: { packages: TravelPackage[] }) {
  const [categoryId, setCategoryId] = useState("all");
  const [query, setQuery] = useState("");
  const activeCategory = categories.find((category) => category.id === categoryId) || categories[0];

  const filteredPackages = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return packages.filter((item) => {
      const categoryMatched = matchCategory(item, activeCategory);
      if (!cleanQuery) return categoryMatched;
      return categoryMatched && haystack(item).toLowerCase().includes(cleanQuery);
    });
  }, [activeCategory, packages, query]);
  const cleanQuery = query.trim();
  const recommendedPackages = filteredPackages.slice(0, 5);
  const hotPackages = filteredPackages.slice(5, 15);
  const personaPackages = personaSections.map((section, sectionIndex) => {
    const matched = packages.filter((item) =>
      section.keywords.some((keyword) => haystack(item).includes(keyword)),
    );
    const fallbackStart = sectionIndex * 5;
    return {
      ...section,
      packages: (matched.length ? matched : packages.slice(fallbackStart, fallbackStart + 8)).slice(0, 5),
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-3 py-5 sm:px-5 lg:px-8">
      <div className="grid gap-3">
        <aside className="rounded-[16px] border border-amber-200 bg-white px-3 py-2 shadow-lg shadow-amber-900/5">
          <div className="flex items-center gap-3 overflow-x-auto">
            <p className="shrink-0 text-xs font-black uppercase tracking-[0.18em] text-amber-700">分類搜尋</p>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-left text-sm font-black transition ${
                  category.id === categoryId
                    ? "bg-zinc-950 text-yellow-200"
                    : "bg-amber-50 text-zinc-700 hover:bg-amber-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 rounded-[20px] border border-amber-200 bg-white p-3 shadow-lg shadow-amber-900/5 sm:p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Package Library</p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">100 個國內旅遊套裝</h2>
            </div>
            <span className="rounded-xl bg-amber-100 px-3 py-2 text-center text-sm font-black text-amber-800">
              {filteredPackages.length} 筆符合
            </span>
          </div>

          <div className="mt-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white p-3">
            <div className="grid gap-2 md:grid-cols-[1fr_auto]">
              <div className="relative">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="輸入地區、景點、主題、族群，例如：阿里山、親子、溫泉、VIP、機場接送"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 pr-20 text-sm font-bold text-zinc-950 outline-none focus:border-amber-400"
                />
                {cleanQuery && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-black text-yellow-200"
                  >
                    清除
                  </button>
                )}
              </div>
              <a
                href="#package-library"
                className="rounded-xl bg-zinc-950 px-4 py-3 text-center text-sm font-black text-yellow-200"
              >
                搜尋行程
              </a>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {searchSuggestions.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => setQuery(keyword)}
                  className="shrink-0 rounded-full border border-amber-200 bg-white px-3 py-1.5 text-xs font-black text-zinc-700 transition hover:border-amber-400 hover:bg-yellow-100"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {hotPackages.length > 0 && (
            <div className="mt-4 min-w-0 rounded-2xl border border-zinc-200 bg-zinc-950 p-3 text-white">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-black text-yellow-200">熱門景點</h3>
                <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black">HOT</span>
              </div>
              <ScrollableCarousel dark className="mt-3">
                {hotPackages.map((item) => (
                  <PackageCarouselCard key={item.id} item={item} compact dark />
                ))}
              </ScrollableCarousel>
            </div>
          )}

          {recommendedPackages.length > 0 && (
            <div className="mt-4 min-w-0 rounded-2xl border border-yellow-300 bg-gradient-to-r from-yellow-100 to-white p-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-black text-zinc-950">推薦行程</h3>
                <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-yellow-200">精選</span>
              </div>
              <ScrollableCarousel className="mt-3">
                {recommendedPackages.map((item) => (
                  <PackageCarouselCard key={item.id} item={item} />
                ))}
              </ScrollableCarousel>
            </div>
          )}

          <div className="mt-4 min-w-0 rounded-2xl border border-amber-300 bg-gradient-to-br from-[#fff6cf] via-white to-[#eefaf5] p-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">AI Personalized Planner</p>
                <h3 className="mt-1 text-2xl font-black text-zinc-950">AI 個性化推薦系統</h3>
              </div>
              <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-yellow-200">依旅客屬性分區</span>
            </div>
            <div className="mt-3 grid gap-3">
              {personaPackages.map((section) => (
                <section key={section.title} className="min-w-0 rounded-2xl border border-amber-200 bg-white p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-black text-zinc-950">{section.title}</h4>
                      <p className="text-xs font-bold text-amber-800">{section.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">AI 推薦</span>
                  </div>
                  <ScrollableCarousel className="mt-3">
                    {section.packages.map((item) => (
                      <PackageCarouselCard key={`${section.title}-${item.id}`} item={item} compact />
                    ))}
                  </ScrollableCarousel>
                </section>
              ))}
            </div>
          </div>

          {filteredPackages.length === 0 && (
            <div className="mt-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-6 text-center">
              <h3 className="text-xl font-black text-zinc-950">找不到完全符合的行程</h3>
              <p className="mt-2 text-sm font-bold text-zinc-600">
                可改用較短關鍵字，例如地區、景點、親子、長輩、溫泉或 VIP。
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategoryId("all");
                  setQuery("");
                }}
                className="mt-4 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-black text-yellow-200"
              >
                查看全部行程
              </button>
            </div>
          )}

          <div id="package-library">
            <ScrollableCarousel className="mt-4">
              {filteredPackages.map((item) => (
                <article key={item.id} className="w-[185px] shrink-0 snap-start overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl sm:w-[210px]">
                  <div className="relative h-28">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="210px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    <span className="absolute left-2 top-2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-black">
                      {item.tag}
                    </span>
                    <strong className="absolute bottom-2 left-2 right-2 line-clamp-2 text-sm font-black leading-tight text-white">
                      {item.name}
                    </strong>
                  </div>
                  <div className="p-3">
                    <p className="truncate text-[10px] font-black uppercase tracking-[0.1em] text-amber-700">
                      {item.subtitle}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.highlights.slice(0, 2).map((highlight) => (
                        <small key={highlight} className="rounded-full border border-zinc-300 px-2 py-0.5 text-[11px] font-bold text-zinc-600">
                          {highlight}
                        </small>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <strong className="text-base text-zinc-950">{item.price}</strong>
                      <a href="#quick-booking" className="rounded-lg bg-zinc-950 px-2.5 py-1.5 text-xs font-black text-yellow-200">
                        詢價
                      </a>
                    </div>
                    <details className="mt-2 rounded-lg border border-zinc-200 bg-white p-2 text-xs">
                      <summary className="cursor-pointer font-black text-zinc-800">概要</summary>
                      <div className="mt-2 grid gap-1.5 text-zinc-600">
                        <p>{item.duration}</p>
                        <p>{item.itinerary.slice(0, 2).map((step) => step.title).join(" → ")}</p>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </ScrollableCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}
