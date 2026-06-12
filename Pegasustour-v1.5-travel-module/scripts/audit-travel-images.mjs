import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MAX_BYTES = 2 * 1024 * 1024;
const TARGETS = {
  card: { width: 800, height: 600, bytes: 250 * 1024 },
  hero: { width: 1600, height: 900, bytes: 500 * 1024 },
  gallery: { width: 900, height: 675, bytes: 300 * 1024 },
};

const imageDir = process.argv[2] || path.join(process.cwd(), "public", "images", "travel");
const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function classify(file) {
  const lower = file.toLowerCase();
  if (lower.includes("-hero")) return "hero";
  if (lower.includes("-gallery")) return "gallery";
  return "card";
}

async function scanImage(filePath) {
  const stat = fs.statSync(filePath);
  const meta = await sharp(filePath).metadata();
  const type = classify(path.basename(filePath));
  const target = TARGETS[type];
  const warnings = [];

  if (stat.size > MAX_BYTES) warnings.push("OVER_2MB_HARD_LIMIT");
  if (stat.size > target.bytes) warnings.push(`above_${type}_target`);
  if ((meta.width || 0) > target.width || (meta.height || 0) > target.height) {
    warnings.push(`resize_to_${target.width}x${target.height}`);
  }

  return {
    file: path.relative(process.cwd(), filePath),
    type,
    width: meta.width,
    height: meta.height,
    kb: Math.round(stat.size / 1024),
    maxMbOk: stat.size <= MAX_BYTES,
    target,
    warnings,
  };
}

function collectImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectImages(fullPath);
      return allowed.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
    });
}

const files = collectImages(imageDir);
const results = [];

for (const file of files) {
  results.push(await scanImage(file));
}

console.table(
  results.map((item) => ({
    file: item.file,
    type: item.type,
    size: `${item.kb} KB`,
    dimensions: `${item.width}x${item.height}`,
    maxMbOk: item.maxMbOk,
    warnings: item.warnings.join(", ") || "OK",
  })),
);

if (results.some((item) => !item.maxMbOk)) {
  process.exitCode = 1;
}
