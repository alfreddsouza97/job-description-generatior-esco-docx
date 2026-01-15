// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const uri = searchParams.get("uri");

//   if (!uri) {
//     return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//   }

//   const res = await fetch(uri, { cache: "no-store" });
//   const data = await res.json();

//   const label = data?.preferredLabel?.en || "Unknown";
//   const description = data?.description?.en || "";

//   // Essential skills
//   const essentialSkills =
//     data?._embedded?.hasEssentialSkill?.map((s: any) => s?.preferredLabel?.en) ||
//     [];

//   // Optional skills (we treat them like tasks sometimes)
//   const optionalSkills =
//     data?._embedded?.hasOptionalSkill?.map((s: any) => s?.preferredLabel?.en) ||
//     [];

//   return NextResponse.json({
//     label,
//     description,
//     skills: essentialSkills.filter(Boolean),
//     tasks: optionalSkills.filter(Boolean),
//   });
// }


// new == working except skills shows as zero

// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     // ✅ IMPORTANT: Use ESCO API occupation endpoint (it guarantees JSON)
//     const escoApiUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en`;

//     const res = await fetch(escoApiUrl, {
//       cache: "no-store",
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     // ✅ If ESCO responds with an error
//     if (!res.ok) {
//       const txt = await res.text();
//       return NextResponse.json(
//         { error: `ESCO API failed: ${res.status}`, details: txt.slice(0, 300) },
//         { status: 500 }
//       );
//     }

//     // ✅ Make sure response is JSON
//     const contentType = res.headers.get("content-type") || "";
//     if (!contentType.includes("application/json")) {
//       const txt = await res.text();
//       return NextResponse.json(
//         {
//           error: "ESCO response is not JSON",
//           contentType,
//           preview: txt.slice(0, 300),
//         },
//         { status: 500 }
//       );
//     }

//     const data = await res.json();

//     const label = data?.preferredLabel?.en || "Unknown";
//     const description = data?.description?.en || "";

//     // ✅ ESCO embeds data differently, safe extraction
//     const skills =
//       data?._embedded?.hasEssentialSkill?.map(
//         (s: any) => s?.preferredLabel?.en
//       ) || [];

//     const tasks =
//       data?._embedded?.hasOptionalSkill?.map(
//         (t: any) => t?.preferredLabel?.en
//       ) || [];

//     return NextResponse.json({
//       label,
//       description,
//       skills: skills.filter(Boolean),
//       tasks: tasks.filter(Boolean),
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }


// exp

// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     // ✅ IMPORTANT: ask ESCO for FULL view so _embedded contains skills/tasks
//     const escoApiUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en&view=full`;

//     const res = await fetch(escoApiUrl, {
//       cache: "no-store",
//       headers: { Accept: "application/json" },
//     });

//     if (!res.ok) {
//       const txt = await res.text();
//       return NextResponse.json(
//         { error: `ESCO API failed: ${res.status}`, details: txt.slice(0, 300) },
//         { status: 500 }
//       );
//     }

//     const data = await res.json();

//     const label = data?.preferredLabel?.en || "Unknown";
//     const description = data?.description?.en || "";

//     // ✅ Now these will be present in most cases
//     const skills =
//       data?._embedded?.hasEssentialSkill?.map(
//         (s: any) => s?.preferredLabel?.en
//       ) || [];

//     const tasks =
//       data?._embedded?.hasOptionalSkill?.map(
//         (t: any) => t?.preferredLabel?.en
//       ) || [];

//     return NextResponse.json({
//       label,
//       description,
//       skills: skills.filter(Boolean),
//       tasks: tasks.filter(Boolean),
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }


// exp 2

// import { NextResponse } from "next/server";

// async function fetchJson(url: string) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: { Accept: "application/json" },
//   });

//   if (!res.ok) {
//     const txt = await res.text();
//     throw new Error(`Failed ${res.status}: ${txt.slice(0, 200)}`);
//   }

//   return res.json();
// }

// function extractLabelsFromEmbeddedSkills(data: any): string[] {
//   // ESCO sometimes gives skills in _embedded.results, sometimes directly in array
//   if (Array.isArray(data?._embedded?.results)) {
//     return data._embedded.results
//       .map((x: any) => x?.preferredLabel?.en || x?.title || x?.label)
//       .filter(Boolean);
//   }

//   if (Array.isArray(data)) {
//     return data
//       .map((x: any) => x?.preferredLabel?.en || x?.title || x?.label)
//       .filter(Boolean);
//   }

//   return [];
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     // ✅ Occupation details (JSON)
//     const occupationUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en`;

//     const occData = await fetchJson(occupationUrl);

//     const label = occData?.preferredLabel?.en || "Unknown";
//     const description = occData?.description?.en || "";

//     // ✅ Try direct embedded first
//     let skills: string[] =
//       occData?._embedded?.hasEssentialSkill?.map(
//         (s: any) => s?.preferredLabel?.en
//       ) || [];

//     let tasks: string[] =
//       occData?._embedded?.hasOptionalSkill?.map((s: any) => s?.preferredLabel?.en) ||
//       [];

//     // ✅ If still empty, fetch via _links (THIS IS THE MAIN FIX)
//     if (skills.length === 0 && occData?._links?.hasEssentialSkill?.href) {
//       const essentialSkillUrl = occData._links.hasEssentialSkill.href;
//       const essentialSkillData = await fetchJson(essentialSkillUrl);
//       skills = extractLabelsFromEmbeddedSkills(essentialSkillData);
//     }

//     if (tasks.length === 0 && occData?._links?.hasOptionalSkill?.href) {
//       const optionalSkillUrl = occData._links.hasOptionalSkill.href;
//       const optionalSkillData = await fetchJson(optionalSkillUrl);
//       tasks = extractLabelsFromEmbeddedSkills(optionalSkillData);
//     }

//     return NextResponse.json({
//       label,
//       description,
//       skills: skills.filter(Boolean),
//       tasks: tasks.filter(Boolean),
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }


// exp3

// import { NextResponse } from "next/server";

// async function fetchJson(url: string) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: {
//       Accept: "application/json",
//     },
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`ESCO fetch failed: ${res.status} ${text.slice(0, 200)}`);
//   }

//   return res.json();
// }

// function pickLabel(item: any): string {
//   return (
//     item?.preferredLabel?.en ||
//     item?.preferredLabel ||
//     item?.title ||
//     item?.label ||
//     item?.name ||
//     ""
//   );
// }

// function extractListFromEmbedded(embeddedList: any): string[] {
//   if (!embeddedList) return [];
//   if (!Array.isArray(embeddedList)) return [];
//   return embeddedList.map(pickLabel).filter(Boolean);
// }

// function extractListFromLinkedResponse(data: any): string[] {
//   // ESCO link endpoints often return: { _embedded: { results: [...] } }
//   const results = data?._embedded?.results;
//   if (Array.isArray(results)) return results.map(pickLabel).filter(Boolean);

//   // sometimes it might be directly array
//   if (Array.isArray(data)) return data.map(pickLabel).filter(Boolean);

//   return [];
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     // ✅ Always use ESCO API (not occupation URI directly)
//     const occupationUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en&view=full`;

//     const occ = await fetchJson(occupationUrl);

//     const label = occ?.preferredLabel?.en || "Unknown";
//     const description = occ?.description?.en || "";

//     // ✅ ESCO uses different keys in different occupations
//     // We will check MANY possible embedded keys
//     const embedded = occ?._embedded || {};
//     const links = occ?._links || {};

//     // ✅ Try to read skills/competences from embedded first
//     let essentialSkills: string[] = [];
//     let optionalSkills: string[] = [];

//     const possibleEssentialKeys = [
//       "hasEssentialSkill",
//       "hasEssentialSkillAndCompetence",
//       "hasEssentialCompetence",
//     ];

//     const possibleOptionalKeys = [
//       "hasOptionalSkill",
//       "hasOptionalSkillAndCompetence",
//       "hasOptionalCompetence",
//     ];

//     for (const key of possibleEssentialKeys) {
//       essentialSkills = essentialSkills.concat(
//         extractListFromEmbedded(embedded[key])
//       );
//     }

//     for (const key of possibleOptionalKeys) {
//       optionalSkills = optionalSkills.concat(
//         extractListFromEmbedded(embedded[key])
//       );
//     }

//     // ✅ If still empty, follow ESCO links (this is common!)
//     async function fetchFromLinkKey(linkKey: string) {
//       const href = links?.[linkKey]?.href;
//       if (!href) return [];

//       // Make sure language stays English
//       const urlWithLang = href.includes("language=")
//         ? href
//         : href + (href.includes("?") ? "&" : "?") + "language=en";

//       const data = await fetchJson(urlWithLang);
//       return extractListFromLinkedResponse(data);
//     }

//     if (essentialSkills.length === 0) {
//       for (const key of possibleEssentialKeys) {
//         const fromLink = await fetchFromLinkKey(key);
//         essentialSkills = essentialSkills.concat(fromLink);
//       }
//     }

//     if (optionalSkills.length === 0) {
//       for (const key of possibleOptionalKeys) {
//         const fromLink = await fetchFromLinkKey(key);
//         optionalSkills = optionalSkills.concat(fromLink);
//       }
//     }

//     // ✅ Clean duplicates
//     essentialSkills = Array.from(new Set(essentialSkills)).filter(Boolean);
//     optionalSkills = Array.from(new Set(optionalSkills)).filter(Boolean);

//     return NextResponse.json({
//       label,
//       description,

//       // ✅ treat essential skills as "skills"
//       skills: essentialSkills,

//       // ✅ treat optional skills as "tasks" in your UI
//       tasks: optionalSkills,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }


// exp4 == working

// import { NextResponse } from "next/server";

// async function fetchJson(url: string) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: { Accept: "application/json" },
//   });

//   if (!res.ok) {
//     const txt = await res.text();
//     throw new Error(`ESCO fetch failed ${res.status}: ${txt.slice(0, 200)}`);
//   }

//   return res.json();
// }

// function pickLabel(item: any): string {
//   return (
//     item?.preferredLabel?.en ||
//     item?.preferredLabel ||
//     item?.title ||
//     item?.label ||
//     item?.name ||
//     ""
//   );
// }

// function cleanArray(arr: any[]) {
//   return Array.from(new Set(arr.filter(Boolean)));
// }

// function extractFromEmbedded(occ: any, keys: string[]): string[] {
//   const embedded = occ?._embedded || {};
//   let out: string[] = [];

//   for (const key of keys) {
//     const list = embedded?.[key];
//     if (Array.isArray(list)) {
//       out = out.concat(list.map(pickLabel));
//     }
//   }

//   return cleanArray(out);
// }

// async function extractFromLinks(occ: any, keys: string[]): Promise<string[]> {
//   const links = occ?._links || {};
//   let out: string[] = [];

//   for (const key of keys) {
//     const href = links?.[key]?.href;
//     if (!href) continue;

//     // keep language in English
//     const url = href.includes("language=")
//       ? href
//       : href + (href.includes("?") ? "&" : "?") + "language=en";

//     const linkedData = await fetchJson(url);

//     // ESCO usually returns { _embedded: { results: [...] } }
//     const results = linkedData?._embedded?.results;

//     if (Array.isArray(results)) {
//       out = out.concat(results.map(pickLabel));
//     }
//   }

//   return cleanArray(out);
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     // ✅ Important: view=full gives maximum info
//     const occupationUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en&view=full`;

//     const occ = await fetchJson(occupationUrl);

//     const label = occ?.preferredLabel?.en || "Unknown";
//     const description = occ?.description?.en || "";

//     // ✅ ESCO has different keys depending on occupation
//     const essentialKeys = [
//       "hasEssentialSkill",
//       "hasEssentialSkillAndCompetence",
//       "hasEssentialCompetence",
//       "hasEssentialKnowledge",
//     ];

//     const optionalKeys = [
//       "hasOptionalSkill",
//       "hasOptionalSkillAndCompetence",
//       "hasOptionalCompetence",
//       "hasOptionalKnowledge",
//     ];

//     // ✅ 1) Try embedded first
//     let skills = extractFromEmbedded(occ, essentialKeys);
//     let tasks = extractFromEmbedded(occ, optionalKeys);

//     // ✅ 2) If empty, try link-based fetch
//     if (skills.length === 0) {
//       skills = await extractFromLinks(occ, essentialKeys);
//     }

//     if (tasks.length === 0) {
//       tasks = await extractFromLinks(occ, optionalKeys);
//     }

//     return NextResponse.json({
//       label,
//       description,
//       skills,
//       tasks,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }

// exp 5

// import { NextResponse } from "next/server";

// async function fetchJson(url: string) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: { Accept: "application/json" },
//   });

//   if (!res.ok) {
//     const txt = await res.text();
//     throw new Error(`ESCO fetch failed ${res.status}: ${txt.slice(0, 200)}`);
//   }

//   return res.json();
// }

// function pickLabel(item: any): string {
//   return (
//     item?.preferredLabel?.en ||
//     item?.preferredLabel ||
//     item?.title ||
//     item?.label ||
//     item?.name ||
//     ""
//   );
// }

// function extractResultsLabels(data: any): string[] {
//   // ESCO relation endpoints usually return: { _embedded: { results: [...] } }
//   const results = data?._embedded?.results;
//   if (Array.isArray(results)) {
//     return results.map(pickLabel).filter(Boolean);
//   }

//   // Sometimes list may be directly in _embedded or top-level
//   if (Array.isArray(data)) return data.map(pickLabel).filter(Boolean);

//   return [];
// }

// function unique(arr: string[]) {
//   return Array.from(new Set(arr.filter(Boolean)));
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     // ✅ Main occupation endpoint
//     const occupationUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en&view=full`;

//     const occ = await fetchJson(occupationUrl);

//     const label = occ?.preferredLabel?.en || "Unknown";
//     const description = occ?.description?.en || "";

//     const links = occ?._links || {};

//     // ✅ AUTO-DETECT: collect all link keys that look like skills/competences/knowledge
//     const linkKeys = Object.keys(links);

//     const skillLikeKeys = linkKeys.filter((k) => {
//       const lower = k.toLowerCase();
//       return (
//         lower.includes("skill") ||
//         lower.includes("competence") ||
//         lower.includes("knowledge")
//       );
//     });

//     let skills: string[] = [];
//     let tasks: string[] = [];

//     // ✅ Fetch all skill-like links and combine
//     for (const key of skillLikeKeys) {
//       const href = links?.[key]?.href;
//       if (!href) continue;

//       const urlWithLang = href.includes("language=")
//         ? href
//         : href + (href.includes("?") ? "&" : "?") + "language=en";

//       const relData = await fetchJson(urlWithLang);
//       const labels = extractResultsLabels(relData);

//       // ✅ Split into essential vs optional if key contains those words
//       const lowerKey = key.toLowerCase();

//       if (lowerKey.includes("essential")) {
//         skills = skills.concat(labels);
//       } else if (lowerKey.includes("optional")) {
//         tasks = tasks.concat(labels);
//       } else {
//         // If unknown type, treat it as skill by default
//         skills = skills.concat(labels);
//       }
//     }

//     skills = unique(skills);
//     tasks = unique(tasks);

//     return NextResponse.json({
//       label,
//       description,
//       skills,
//       tasks,
//       debug: {
//         skillLikeKeys,
//         allLinkKeys: linkKeys,
//       },
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }



// exp6

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

// function pickLabel(item: any): string {
//   return (
//     item?.preferredLabel?.en ||
//     item?.preferredLabel ||
//     item?.title ||
//     item?.label ||
//     item?.name ||
//     ""
//   );
// }

// // ESCO link endpoints usually return: { _embedded: { results: [...] } }
// function extractResults(data: any): string[] {
//   const results = data?._embedded?.results;
//   if (Array.isArray(results)) return results.map(pickLabel).filter(Boolean);
//   return [];
// }

// async function fetchFromLink(occ: any, key: string): Promise<string[]> {
//   const href = occ?._links?.[key]?.href;
//   if (!href) return [];

//   const urlWithLang = href.includes("language=")
//     ? href
//     : href + (href.includes("?") ? "&" : "?") + "language=en";

//   const data = await fetchJson(urlWithLang);
//   return extractResults(data);
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const uri = searchParams.get("uri");

//     if (!uri) {
//       return NextResponse.json({ error: "Missing uri" }, { status: 400 });
//     }

//     // ✅ Load occupation core data
//     const occupationUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
//       uri
//     )}&language=en&view=full`;

//     const occ = await fetchJson(occupationUrl);

//     const label = occ?.preferredLabel?.en || "Unknown";
//     const description = occ?.description?.en || "";

//     // ✅ These are the exact keys used by ESCO website sections
//     const essentialSkills = await fetchFromLink(
//       occ,
//       "hasEssentialSkillAndCompetence"
//     );

//     const optionalSkills = await fetchFromLink(
//       occ,
//       "hasOptionalSkillAndCompetence"
//     );

//     const essentialKnowledge = await fetchFromLink(occ, "hasEssentialKnowledge");

//     const optionalKnowledge = await fetchFromLink(occ, "hasOptionalKnowledge");

//     // ✅ Combine them (your UI expects skills + tasks arrays)
//     const skills = Array.from(
//       new Set([...essentialSkills, ...essentialKnowledge])
//     );

//     const tasks = Array.from(
//       new Set([...optionalSkills, ...optionalKnowledge])
//     );

//     return NextResponse.json({
//       label,
//       description,
//       skills,
//       tasks,

//       // ✅ debug so you can confirm it is working
//       debug: {
//         essentialSkillsCount: essentialSkills.length,
//         essentialKnowledgeCount: essentialKnowledge.length,
//         optionalSkillsCount: optionalSkills.length,
//         optionalKnowledgeCount: optionalKnowledge.length,
//       },
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }

// exp7

import { NextResponse } from "next/server";

function unique(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean)));
}

async function fetchText(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  return res.text();
}

async function fetchJson(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`JSON fetch failed ${res.status}: ${txt.slice(0, 120)}`);
  }

  return res.json();
}

function pickLabel(data: any) {
  return (
    data?.preferredLabel?.en ||
    data?.preferredLabel ||
    data?.title ||
    data?.label ||
    data?.name ||
    ""
  );
}

// ✅ extract URIs from html
function extractUris(html: string, type: "skill" | "knowledge") {
  const regex = new RegExp(
    `https?:\\/\\/data\\.europa\\.eu\\/esco\\/${type}\\/[a-z0-9\\-]+`,
    "gi"
  );
  return unique(html.match(regex) || []);
}

// ✅ fetch label from correct ESCO API based on type
async function resolveEscoLabel(uri: string) {
  if (uri.includes("/skill/")) {
    const url = `https://ec.europa.eu/esco/api/resource/skill?uri=${encodeURIComponent(
      uri
    )}&language=en&view=full`;
    const json = await fetchJson(url);
    return pickLabel(json);
  }

  if (uri.includes("/knowledge/")) {
    const url = `https://ec.europa.eu/esco/api/resource/knowledge?uri=${encodeURIComponent(
      uri
    )}&language=en&view=full`;
    const json = await fetchJson(url);
    return pickLabel(json);
  }

  return "";
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uri = searchParams.get("uri");

    if (!uri) {
      return NextResponse.json({ error: "Missing uri" }, { status: 400 });
    }

    // ✅ 1) Get occupation label + description from official ESCO API
    const occApiUrl = `https://ec.europa.eu/esco/api/resource/occupation?uri=${encodeURIComponent(
      uri
    )}&language=en&view=full`;

    const occJson = await fetchJson(occApiUrl);

    const label = pickLabel(occJson) || "Unknown";
    const description =
      occJson?.description?.en?.literal ||
      occJson?.description?.en ||
      occJson?.description?.literal ||
      occJson?.description ||
      "N/A";

    // ✅ 2) Get skills/knowledge URIs from the classification page HTML
    const occPageUrl = `https://esco.ec.europa.eu/en/classification/occupation?uri=${encodeURIComponent(
      uri
    )}`;

    const html = await fetchText(occPageUrl);

    const skillUris = extractUris(html, "skill");
    const knowledgeUris = extractUris(html, "knowledge");

    // ✅ limit to prevent overload
    const skillUrisLimited = skillUris.slice(0, 120);
    const knowledgeUrisLimited = knowledgeUris.slice(0, 60);

    // ✅ 3) Resolve labels for skill/knowledge
    const skills = unique(
      (
        await Promise.all(
          skillUrisLimited.map(async (u) => {
            try {
              return await resolveEscoLabel(u);
            } catch {
              return "";
            }
          })
        )
      ).filter(Boolean)
    );

    const tasks = unique(
      (
        await Promise.all(
          knowledgeUrisLimited.map(async (u) => {
            try {
              return await resolveEscoLabel(u);
            } catch {
              return "";
            }
          })
        )
      ).filter(Boolean)
    );

    return NextResponse.json({
      label,
      description,
      skills,
      tasks,
      debug: {
        skillUrisFound: skillUris.length,
        knowledgeUrisFound: knowledgeUris.length,
        skillsLabelsFound: skills.length,
        tasksLabelsFound: tasks.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
