import { NextResponse } from "next/server";
import { readTravelMarquees, writeTravelMarquees } from "./travelMarqueeStore";

export async function GET() {
  const marquees = await readTravelMarquees();
  return NextResponse.json({ marquees });
}

export async function POST(request: Request) {
  const body = await request.json();
  const marquees = await writeTravelMarquees(body);
  return NextResponse.json({ marquees });
}
