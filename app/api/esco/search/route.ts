import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "Missing title" }, { status: 400 });
  }

  const url = `https://ec.europa.eu/esco/api/search?text=${encodeURIComponent(
    title
  )}&type=occupation&language=en`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  const results = (data?._embedded?.results || []).map((r: any) => ({
    uri: r?.uri,
    title: r?.title,
    description: r?.description || "",
  }));

  return NextResponse.json({ results });
}
