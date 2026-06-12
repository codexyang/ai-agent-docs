import { NextResponse } from "next/server";
import {
  normalizeTravelPackage,
  readTravelPackages,
  writeTravelPackages,
} from "./travelPackageStore";

export async function GET() {
  const packages = await readTravelPackages();
  return NextResponse.json({ packages });
}

export async function POST(request: Request) {
  const body = await request.json();
  const nextPackage = normalizeTravelPackage(body);

  if (!nextPackage.name) {
    return NextResponse.json({ error: "行程名稱必填" }, { status: 400 });
  }

  const packages = await readTravelPackages();
  const index = packages.findIndex((item) => item.id === nextPackage.id);
  const nextPackages =
    index >= 0
      ? packages.map((item) => (item.id === nextPackage.id ? nextPackage : item))
      : [nextPackage, ...packages];

  await writeTravelPackages(nextPackages);

  return NextResponse.json({ package: nextPackage, packages: nextPackages });
}
