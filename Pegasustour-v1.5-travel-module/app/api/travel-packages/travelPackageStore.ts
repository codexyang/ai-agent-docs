import { promises as fs } from "fs";
import path from "path";
import { defaultTravelPackages, type TravelPackage } from "@/app/data/travelPackageDefaults";

const dataFile = path.join(process.cwd(), "data", "travel-packages.json");
const fallbackPackage = defaultTravelPackages[0];

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(defaultTravelPackages, null, 2));
  }
}

export async function readTravelPackages() {
  await ensureDataFile();

  try {
    const content = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(content) as Partial<TravelPackage>[];
    return parsed.length ? parsed.map(normalizeTravelPackage) : defaultTravelPackages;
  } catch {
    return defaultTravelPackages;
  }
}

export async function writeTravelPackages(packages: TravelPackage[]) {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(packages, null, 2));
}

export function normalizeTravelPackage(input: Partial<TravelPackage>): TravelPackage {
  const name = String(input.name || "").trim();
  const id =
    String(input.id || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `travel-${Date.now()}`;
  const itinerary = Array.isArray(input.itinerary)
    ? input.itinerary
        .map((item) => ({
          time: String(item.time || "").trim(),
          title: String(item.title || "").trim(),
          detail: String(item.detail || "").trim(),
        }))
        .filter((item) => item.time && item.title)
        .slice(0, 8)
    : fallbackPackage.itinerary;
  const vehicleOptions = Array.isArray(input.vehicleOptions)
    ? input.vehicleOptions
        .map((item) => ({
          name: String(item.name || "").trim(),
          capacity: String(item.capacity || "").trim(),
          price: String(item.price || "").trim(),
          note: String(item.note || "").trim(),
        }))
        .filter((item) => item.name)
        .slice(0, 5)
    : fallbackPackage.vehicleOptions;

  return {
    id,
    name,
    subtitle: String(input.subtitle || "").trim(),
    tag: String(input.tag || "新行程").trim(),
    highlights: Array.isArray(input.highlights)
      ? input.highlights.map((item) => String(item).trim()).filter(Boolean).slice(0, 5)
      : [],
    price: String(input.price || "專人報價").trim(),
    image: String(input.image || fallbackPackage.image).trim(),
    duration: String(input.duration || fallbackPackage.duration).trim(),
    pickup: String(input.pickup || fallbackPackage.pickup).trim(),
    confirmation: String(input.confirmation || fallbackPackage.confirmation).trim(),
    cancellation: String(input.cancellation || fallbackPackage.cancellation).trim(),
    notice: String(input.notice || fallbackPackage.notice).trim(),
    packageOptions: Array.isArray(input.packageOptions)
      ? input.packageOptions.map((item) => String(item).trim()).filter(Boolean).slice(0, 6)
      : fallbackPackage.packageOptions,
    itinerary,
    included: Array.isArray(input.included)
      ? input.included.map((item) => String(item).trim()).filter(Boolean).slice(0, 8)
      : fallbackPackage.included,
    excluded: Array.isArray(input.excluded)
      ? input.excluded.map((item) => String(item).trim()).filter(Boolean).slice(0, 8)
      : fallbackPackage.excluded,
    vehicleOptions,
    status: input.status === "draft" ? "draft" : "active",
  };
}
