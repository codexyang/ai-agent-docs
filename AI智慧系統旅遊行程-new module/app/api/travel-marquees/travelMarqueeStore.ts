import { promises as fs } from "fs";
import path from "path";
import { defaultTravelMarquees, type TravelMarqueeData } from "@/app/data/travelMarqueeDefaults";

const dataFile = path.join(process.cwd(), "data", "travel-marquees.json");

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(defaultTravelMarquees, null, 2));
  }
}

function normalizeMessages(messages: unknown) {
  return Array.isArray(messages)
    ? messages.map((item) => String(item).trim()).filter(Boolean).slice(0, 12)
    : [];
}

export function normalizeTravelMarquees(input: Partial<TravelMarqueeData>): TravelMarqueeData {
  const top = normalizeMessages(input.top);
  const bottom = normalizeMessages(input.bottom);

  return {
    top: top.length ? top : defaultTravelMarquees.top,
    bottom: bottom.length ? bottom : defaultTravelMarquees.bottom,
  };
}

export async function readTravelMarquees() {
  await ensureDataFile();

  try {
    const content = await fs.readFile(dataFile, "utf8");
    return normalizeTravelMarquees(JSON.parse(content) as Partial<TravelMarqueeData>);
  } catch {
    return defaultTravelMarquees;
  }
}

export async function writeTravelMarquees(data: TravelMarqueeData) {
  await ensureDataFile();
  const normalized = normalizeTravelMarquees(data);
  await fs.writeFile(dataFile, JSON.stringify(normalized, null, 2));
  return normalized;
}
