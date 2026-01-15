// import { NextResponse } from "next/server";

// async function fetchJson(url: string) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: { Accept: "application/json" },
//   });

//   if (!res.ok) {
//     const txt = await res.text();
//     throw new Error(`ESCO failed ${res.status}: ${txt.slice(0, 200)}`);
//   }

//   return res.json();
// }

// function pickLabel(item: any) {
//   return (
//     item?.preferredLabel?.en ||
//     item?.title ||
//     item?.label ||
//     item?.name ||
//     "Unknown"
//   );
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     const occupationUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en&view=full`;

//     const occ = await fetchJson(occupationUrl);

//     const links = occ?._links || {};

//     // These are common hierarchy keys
//     const possibleKeys = [
//       "broaderOccupation",
//       "narrowerOccupation",
//       "relatedOccupation",
//       "broaderConcept",
//       "narrowerConcept",
//       "relatedConcept",
//     ];

//     let related: any[] = [];

//     for (const key of possibleKeys) {
//       const href = links?.[key]?.href;
//       if (!href) continue;

//       const data = await fetchJson(href);

//       const results = data?._embedded?.results || [];
//       related = related.concat(
//         results.map((r: any) => ({
//           uri: r?.uri,
//           title: pickLabel(r),
//         }))
//       );
//     }

//     // remove duplicates
//     const unique = Array.from(
//       new Map(related.map((x) => [x.uri, x])).values()
//     ).filter((x) => x.uri);

//     return NextResponse.json({ related: unique });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";

async function fetchJson(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`ESCO failed ${res.status}: ${txt.slice(0, 200)}`);
  }

  return res.json();
}

function pickLabel(item: any) {
  return (
    item?.preferredLabel?.en ||
    item?.title ||
    item?.label ||
    item?.name ||
    "Unknown"
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uri = searchParams.get("uri");

    if (!uri) {
      return NextResponse.json({ error: "Missing uri" }, { status: 400 });
    }

    const occupationUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
      uri
    )}&language=en&view=full`;

    const occ = await fetchJson(occupationUrl);

    const links = occ?._links || {};

    const possibleKeys = [
      "broaderOccupation",
      "narrowerOccupation",
      "relatedOccupation",
      "broaderConcept",
      "narrowerConcept",
      "relatedConcept",
    ];

    let related: any[] = [];

    for (const key of possibleKeys) {
      const href = links?.[key]?.href;
      if (!href) continue;

      // ✅ Force English
      const hrefWithLang = href.includes("language=")
        ? href
        : href + (href.includes("?") ? "&" : "?") + "language=en";

      const data = await fetchJson(hrefWithLang);

      const results = data?._embedded?.results || [];
      related = related.concat(
        results.map((r: any) => ({
          uri: r?.uri,
          title: pickLabel(r),
        }))
      );
    }

    // ✅ Unique by URI
    const unique = Array.from(
      new Map(related.map((x) => [x.uri, x])).values()
    ).filter((x) => x.uri);

    return NextResponse.json({ related: unique });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
