import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import TravelPackageCatalog from "@/components/TravelPackageCatalog";
import { readTravelPackages } from "@/app/api/travel-packages/travelPackageStore";
import { readTravelMarquees } from "@/app/api/travel-marquees/travelMarqueeStore";
import { contactChannels } from "@/app/data/contactChannels";

export const dynamic = "force-dynamic";

const travelerOptions = ["2 位", "4 位", "6 位", "8 位以上"];
const serviceBadges = [
  ["專業司機", "熟悉路線，安全可靠"],
  ["合法車隊", "合法營運，保險齊全"],
  ["彈性客製", "行程可依需求調整"],
  ["貼心服務", "客服確認，旅程無憂"],
];

export default async function TravelPage() {
  const packages = (await readTravelPackages()).filter((item) => item.status === "active");
  const marquees = await readTravelMarquees();
  const featured = packages[0];
  const topMarqueeMessages = [...marquees.top, ...marquees.top];
  const bottomMarqueeMessages = [...marquees.bottom, ...marquees.bottom];

  return (
    <main className="min-h-screen bg-[#f7f0df] text-zinc-950">
      <section className="border-b border-amber-200 bg-white py-2 text-zinc-800">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track animate-marquee-slow gap-10 pr-10 text-xs font-black md:text-sm">
            {topMarqueeMessages.map((message, index) => (
              <span key={`top-marquee-${index}`} className="marquee-item">
                {message}
              </span>
            ))}
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-amber-200 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur md:px-8">
        <Logo />
        <div className="flex items-center gap-3 text-xs md:gap-6 md:text-sm">
          <Link href="/" className="font-bold text-zinc-700 transition hover:text-amber-700">
            首頁
          </Link>
          <Link href="/travel-admin" className="font-bold text-zinc-700 transition hover:text-amber-700">
            行程維護
          </Link>
          <a
            href={contactChannels.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#10b981] px-3 py-1.5 font-black text-white shadow-lg shadow-emerald-200 transition hover:scale-105"
          >
            LINE 諮詢
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[#06110f] text-white">
        <div className="absolute inset-0">
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06110f] to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-end gap-5 px-4 pb-6 pt-12 lg:grid-cols-[1fr_320px] lg:px-8">
          <div className="pb-4">
            <div className="inline-flex rounded-full border border-yellow-300/60 bg-yellow-300 px-3 py-1.5 text-xs font-black text-black shadow-xl shadow-yellow-900/25">
              ◇ {featured.tag}
            </div>
            <h1 className="mt-5 max-w-4xl text-[2.35rem] font-black leading-tight tracking-normal md:text-[3.35rem] lg:text-[3.75rem]">
              {featured.name}
            </h1>
            <p className="mt-4 text-base font-black uppercase tracking-[0.18em] text-yellow-200 md:text-lg">
              {featured.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <a className="rounded-xl bg-yellow-300 px-5 py-2.5 text-sm font-black text-black shadow-lg shadow-yellow-900/20" href="#package-library">
                查看全部行程
              </a>
              <a className="rounded-xl border border-white/55 bg-black/45 px-5 py-2.5 text-sm font-black text-white backdrop-blur" href={contactChannels.whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="rounded-xl bg-[#13a538] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-950/30" href={contactChannels.lineUrl} target="_blank" rel="noreferrer">
                LINE 諮詢
              </a>
            </div>

            <div className="mt-6 grid max-w-3xl grid-cols-4 gap-2">
              {featured.highlights.slice(0, 4).map((item) => (
                <div key={item} className="rounded-xl border border-yellow-300/35 bg-black/35 p-2 text-center backdrop-blur">
                  <div className="mx-auto grid size-9 place-items-center rounded-full border border-yellow-300/60 text-base font-black text-yellow-200">
                    {item.slice(0, 1)}
                  </div>
                  <p className="mt-2 text-sm font-black text-yellow-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[20px] border border-yellow-300/35 bg-black/65 p-4 shadow-2xl shadow-black/40 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-yellow-200">
              Quick Quote
            </p>
            <h2 className="mt-1 text-2xl font-black">包車詢價</h2>
            <div className="mt-4 rounded-xl border border-yellow-300/25 bg-yellow-300/10 p-3">
              <p className="text-sm text-white/70">建議售價</p>
              <strong className="mt-1 block text-2xl text-yellow-200">{featured.price}</strong>
              <p className="mt-2 text-sm text-white/70">{featured.confirmation}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["黑金高端", "明亮吸睛", "海岸清新", "森林奢旅"].map((style) => (
                <span key={style} className="rounded-full border border-yellow-300/30 px-3 py-1 text-xs font-black text-yellow-100">
                  {style}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-amber-300 bg-[#07110f] py-3 text-yellow-100">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track animate-marquee-reverse gap-8 pr-8 text-sm font-black tracking-normal">
            {bottomMarqueeMessages.map((message, index) => (
              <span key={`bottom-marquee-${index}`} className="marquee-item">
                {message}
              </span>
            ))}
          </div>
        </div>
      </section>

      <TravelPackageCatalog packages={packages} />

      <section className="mx-auto grid max-w-7xl gap-4 px-3 py-5 lg:grid-cols-[1fr_1.25fr_0.9fr] lg:px-8">
        <section className="rounded-[28px] border border-amber-300 bg-[#07110f] p-5 text-white shadow-xl shadow-amber-900/10">
          <h2 className="text-2xl font-black text-yellow-200">行程時間表</h2>
          <p className="mt-1 text-sm text-white/65">{featured.duration}</p>
          <ol className="mt-5 grid gap-3">
            {featured.itinerary.slice(0, 6).map((step) => (
              <li key={`${step.time}-${step.title}`} className="grid grid-cols-[64px_1fr] gap-3">
                <time className="font-black text-yellow-200">{step.time}</time>
                <div>
                  <p className="font-black">{step.title}</p>
                  <p className="text-sm text-white/62">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-white p-5 shadow-xl shadow-amber-900/10">
          <h2 className="text-2xl font-black">舒適車款選擇</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {featured.vehicleOptions.map((vehicle) => (
              <article key={vehicle.name} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center">
                <div className="mx-auto mb-3 h-20 rounded-2xl bg-gradient-to-br from-zinc-950 to-zinc-600" />
                <h3 className="font-black text-amber-700">{vehicle.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{vehicle.capacity}</p>
                <p className="mt-3 text-xl font-black">{vehicle.price}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-center text-sm font-bold text-zinc-600 md:grid-cols-4">
            {["冷氣舒適", "寬敞座椅", "大行李空間", "專業司機"].map((item) => (
              <span key={item} className="rounded-xl bg-amber-50 px-3 py-3">{item}</span>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-amber-300 bg-[#07110f] p-5 text-white shadow-xl shadow-amber-900/10">
          <h2 className="text-2xl font-black text-yellow-200">建議售價</h2>
          <div className="mt-5 grid gap-3">
            {featured.vehicleOptions.map((vehicle, index) => (
              <div key={vehicle.name} className={index === 2 ? "rounded-2xl border border-yellow-300 bg-yellow-300/10 p-4" : "rounded-2xl border border-yellow-300/30 p-4"}>
                <p className="font-black text-yellow-100">{vehicle.capacity}</p>
                <p className="text-sm text-white/70">{vehicle.name}</p>
                <p className="mt-2 text-2xl font-black text-yellow-200">{vehicle.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-white/65">費用包含：{featured.included.slice(0, 4).join("、")}。</p>
        </section>
      </section>

      <section id="quick-booking" className="mx-auto max-w-7xl px-3 pb-5 lg:px-8">
        <form className="grid gap-2 rounded-[18px] border border-amber-300 bg-[#07110f] p-3 text-white shadow-xl shadow-amber-900/10 md:grid-cols-[0.9fr_1fr_1.1fr_0.95fr_0.8fr_1fr_auto]">
          <input placeholder="姓名" className="rounded-lg border border-amber-400/40 bg-black px-3 py-2 text-sm outline-none placeholder:text-white/55" />
          <input placeholder="聯絡電話" className="rounded-lg border border-amber-400/40 bg-black px-3 py-2 text-sm outline-none placeholder:text-white/55" />
          <input placeholder="WhatsApp / LINE ID" className="rounded-lg border border-amber-400/40 bg-black px-3 py-2 text-sm outline-none placeholder:text-white/55" />
          <input type="date" className="rounded-lg border border-amber-400/40 bg-black px-3 py-2 text-sm outline-none" />
          <select className="rounded-lg border border-amber-400/40 bg-black px-3 py-2 text-sm outline-none">
            {travelerOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          <input placeholder="接送地點" className="rounded-lg border border-amber-400/40 bg-black px-3 py-2 text-sm outline-none placeholder:text-white/55" />
          <button type="button" className="rounded-lg bg-yellow-300 px-4 py-2 text-sm font-black text-black">送出</button>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-10">
        <div className="grid gap-3 rounded-[24px] border border-amber-200 bg-white p-4 shadow-lg shadow-amber-900/5 md:grid-cols-4">
          {serviceBadges.map(([title, copy]) => (
            <div key={title} className="rounded-2xl bg-amber-50 p-5 text-center">
              <p className="text-xl font-black text-amber-800">{title}</p>
              <p className="mt-2 text-sm text-zinc-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
