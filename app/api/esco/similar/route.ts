import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ error: "Missing q" }, { status: 400 });
    }

    const url = `https://ec.europa.eu/esco/api/search?text=${encodeURIComponent(
      q
    )}&type=occupation&language=en`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const data = await res.json();

    const results = (data?._embedded?.results || []).map((r: any) => ({
      uri: r?.uri,
      title: r?.title,
      description: r?.description || "",
    }));

    return NextResponse.json({ results });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
