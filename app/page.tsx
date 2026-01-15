// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }




// "use client";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };


// import { useState } from "react";

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState("");
//   const [savedId, setSavedId] = useState("");

//   async function searchESCO() {
//     setLoading(true);
//     setResults([]);
//     setSelected(null);
//     setDetails(null);
//     setRefined("");
//     setSavedId("");

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();
//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);
//     setRefined("");
//     setSavedId("");
//     setLoading(true);

//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     setLoading(false);
//   }

//   // async function refineWithAI() {
//   //   if (!selected || !details) return;

//   //   setLoading(true);
//   //   setRefined("");
//   //   setSavedId("");

//   //   const res = await fetch("/api/refine", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({
//   //       jobTitle,
//   //       style,
//   //       escoOccupationUri: selected.uri,
//   //       escoOccupationLabel: details.label,
//   //       escoDescription: details.description,
//   //       escoSkills: details.skills,
//   //       escoTasks: details.tasks,
//   //     }),
//   //   });

//   //   const data = await res.json();

//   //   setRefined(data?.refinedDescription || data?.error || "");
//   //   setSavedId(data?.savedId || "");
//   //   setLoading(false);
//   // }

//   async function refineWithAI() {
//   if (!selected || !details) return;

//   setLoading(true);
//   setRefined("");
//   setSavedId("");

//   const res = await fetch("/api/refine", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       jobTitle,
//       style,
//       escoOccupationUri: selected.uri,
//       escoOccupationLabel: details.label,
//       escoDescription: details.description,
//       escoSkills: details.skills,
//       escoTasks: details.tasks,
//     }),
//   });

//   const data = await res.json();

//   // ✅ FIX: Convert refinedDescription to string ALWAYS
//   let refinedText = "";

//   if (typeof data?.refinedDescription === "string") {
//     refinedText = data.refinedDescription;
//   } else if (data?.refinedDescription?.literal) {
//     refinedText = data.refinedDescription.literal;
//   } else {
//     refinedText = JSON.stringify(data?.refinedDescription || data?.error || "");
//   }

//   setRefined(refinedText);
//   setSavedId(data?.savedId || "");

//   setLoading(false);
// }


//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + ChatGPT ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → refine into a professional job
//         description.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., Data Scientist)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{r.title}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {r.description?.slice(0, 140) || "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {details.label}
//             </p>
//             <p>
//               <b>ESCO Description:</b> {details.description || "N/A"}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>
//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 10,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with ChatGPT ✨
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Output */}
//       {refined && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Refined Job Description</h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {savedId})
//             </p>
//           )}

//           <pre
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//             }}
//           >
//             {refined}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>(""); // ✅ keep as any for safety
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);


//   async function searchESCO() {
//     setLoading(true);
//     setResults([]);
//     setSelected(null);
//     setDetails(null);
//     setRefined("");
//     setSavedId("");

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();
//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);
//     setRefined("");
//     setSavedId("");
//     setLoading(true);

//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     // ✅ ALWAYS convert to text safely
//     const refinedText = safeText(data?.refinedDescription || data?.error || "");

//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");
//     setLoading(false);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + ChatGPT ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → refine into a professional job
//         description.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., Data Scientist)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>
//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>
//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 10,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with ChatGPT ✨
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Output */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Refined Job Description</h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           <pre
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//             }}
//           >
//             {safeText(refined)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }


//ls

// "use client";

// import { useState } from "react";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>(""); // keep any for safety
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);

//   async function searchESCO() {
//     setLoading(true);

//     setResults([]);
//     setSelected(null);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");

//     setRelatedRoles([]);

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();

//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");

//     setRelatedRoles([]);
//     setLoading(true);

//     // ✅ 1) Fetch occupation details
//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     // ✅ 2) Fetch related roles/sub roles
//     const relatedRes = await fetch(
//       `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const relatedData = await relatedRes.json();
//     setRelatedRoles(relatedData?.related || []);

//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     // ✅ ALWAYS convert to text safely
//     const refinedText = safeText(data?.refinedDescription || data?.error || "");

//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");
//     setLoading(false);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + AI ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → select sub roles → refine into a
//         professional job description.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., pastry chef)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>

//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>

//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 10,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with AI ✨
//             </button>

//             {/* ✅ Related roles */}
//             {relatedRoles.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   Related Roles / Sub Roles
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {relatedRoles.slice(0, 15).map((role) => (
//                     <button
//                       key={role.uri}
//                       onClick={() => selectOccupation(role)}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         background: "white",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(role.title)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Output */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Refined Job Description</h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           <pre
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//             }}
//           >
//             {safeText(refined)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }


// ls2

// "use client";

// import { useState } from "react";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>(""); // keep any for safety
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);
//   const [relatedSource, setRelatedSource] = useState<
//     "esco" | "similar" | null
//   >(null);

//   async function searchESCO() {
//     setLoading(true);

//     setResults([]);
//     setSelected(null);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();

//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     setLoading(true);

//     // ✅ 1) Fetch occupation details
//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     // ✅ 2) Fetch related roles from ESCO hierarchy route
//     const relatedRes = await fetch(
//       `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const relatedData = await relatedRes.json();

//     let related = relatedData?.related || [];

//     // ✅ If ESCO gives nothing, fallback to similar search results
//     if (related.length === 0) {
//       const query = occ?.title || data?.label || jobTitle || "role";

//       const similarRes = await fetch(
//         `/api/esco/similar?q=${encodeURIComponent(query)}`
//       );
//       const similarData = await similarRes.json();

//       related = (similarData?.results || []).filter(
//         (x: any) => x?.uri && x?.uri !== occ.uri
//       );

//       setRelatedSource("similar");
//     } else {
//       setRelatedSource("esco");
//     }

//     setRelatedRoles(related);

//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     // ✅ ALWAYS convert to text safely
//     const refinedText = safeText(data?.refinedDescription || data?.error || "");

//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");
//     setLoading(false);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + AI ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → select sub roles → refine into a
//         professional job description.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., pastry chef)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>

//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>

//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 10,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with AI ✨
//             </button>

//             {/* ✅ Related roles */}
//             {relatedRoles.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   {relatedSource === "esco"
//                     ? "Related Roles / Sub Roles (ESCO Hierarchy)"
//                     : "Similar Roles (Fallback Search)"}
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {relatedRoles.slice(0, 15).map((role) => (
//                     <button
//                       key={role.uri}
//                       onClick={() => selectOccupation(role)}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         background: "white",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(role.title)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Output */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Refined Job Description</h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           <pre
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//             }}
//           >
//             {safeText(refined)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }


// ls3 == working

// "use client";

// import { useState } from "react";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>("");
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);
//   const [relatedSource, setRelatedSource] = useState<"esco" | "similar" | null>(
//     null
//   );

//   async function searchESCO() {
//     setLoading(true);

//     setResults([]);
//     setSelected(null);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();

//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     setLoading(true);

//     // ✅ 1) Fetch occupation details
//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     // ✅ 2) Fetch related roles/sub roles
//     const relatedRes = await fetch(
//       `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const relatedData = await relatedRes.json();

//     let related = relatedData?.related || [];

//     // ✅ fallback search if ESCO doesn't give related roles
//     if (related.length === 0) {
//       const query = occ?.title || data?.label || jobTitle || "role";

//       const similarRes = await fetch(
//         `/api/esco/similar?q=${encodeURIComponent(query)}`
//       );
//       const similarData = await similarRes.json();

//       related = (similarData?.results || []).filter(
//         (x: any) => x?.uri && x?.uri !== occ.uri
//       );

//       setRelatedSource("similar");
//     } else {
//       setRelatedSource("esco");
//     }

//     setRelatedRoles(related);

//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     const refinedText = safeText(data?.refinedDescription || data?.error || "");
//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");
//     setLoading(false);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + AI ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → select sub roles → refine into a
//         professional job description.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., pastry chef)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>

//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>

//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             {/* ✅ PRINT SKILLS ON SCREEN */}
//             {Array.isArray(details.skills) && details.skills.length > 0 && (
//               <div style={{ marginTop: 14 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   ✅ Skills & Competences
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {details.skills.slice(0, 120).map((skill: any, idx: number) => (
//                     <span
//                       key={idx}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         background: "#fafafa",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(skill)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ✅ PRINT TASKS/KNOWLEDGE ON SCREEN */}
//             {Array.isArray(details.tasks) && details.tasks.length > 0 && (
//               <div style={{ marginTop: 14 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   ✅ Knowledge / Optional Items
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {details.tasks.slice(0, 80).map((task: any, idx: number) => (
//                     <span
//                       key={idx}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         background: "#fff",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(task)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 14,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with AI ✨
//             </button>

//             {/* ✅ Related roles */}
//             {relatedRoles.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   {relatedSource === "esco"
//                     ? "Related Roles / Sub Roles"
//                     : "Similar Roles (Fallback Search)"}
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {relatedRoles.slice(0, 15).map((role) => (
//                     <button
//                       key={role.uri}
//                       onClick={() => selectOccupation(role)}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         background: "white",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(role.title)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Output */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Refined Job Description</h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           <pre
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//             }}
//           >
//             {safeText(refined)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// ls4 == edit JD and copy JD

// "use client";

// import { useState } from "react";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>("");
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);
//   const [relatedSource, setRelatedSource] = useState<"esco" | "similar" | null>(
//     null
//   );

//   const [saveMsg, setSaveMsg] = useState<string>("");

//   async function searchESCO() {
//     setLoading(true);

//     setResults([]);
//     setSelected(null);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();

//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     setLoading(true);

//     // ✅ 1) Fetch occupation details
//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     // ✅ 2) Fetch related roles/sub roles
//     const relatedRes = await fetch(
//       `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const relatedData = await relatedRes.json();

//     let related = relatedData?.related || [];

//     // ✅ fallback search if ESCO doesn't give related roles
//     if (related.length === 0) {
//       const query = occ?.title || data?.label || jobTitle || "role";

//       const similarRes = await fetch(
//         `/api/esco/similar?q=${encodeURIComponent(query)}`
//       );
//       const similarData = await similarRes.json();

//       related = (similarData?.results || []).filter(
//         (x: any) => x?.uri && x?.uri !== occ.uri
//       );

//       setRelatedSource("similar");
//     } else {
//       setRelatedSource("esco");
//     }

//     setRelatedRoles(related);

//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     const refinedText = safeText(data?.refinedDescription || data?.error || "");
//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");

//     if (data?.savedId) {
//       setSaveMsg("✅ Generated & Saved. You can edit below and save again.");
//     }

//     setLoading(false);
//   }

//   async function saveEditedDescription() {
//     setSaveMsg("");

//     if (!savedId) {
//       setSaveMsg("❌ No savedId found. First click 'Refine with AI'.");
//       return;
//     }

//     const textToSave = safeText(refined).trim();
//     if (!textToSave) {
//       setSaveMsg("❌ Job description is empty, cannot save.");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("/api/job/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id: savedId,
//         refinedDescription: textToSave,
//       }),
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setSaveMsg("✅ Edited job description updated successfully in MongoDB!");
//     } else {
//       setSaveMsg("❌ Save failed: " + safeText(data?.error));
//     }

//     setLoading(false);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + AI ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → select sub roles → refine into a
//         professional job description → edit & save.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., pastry chef)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>

//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>

//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             {/* ✅ PRINT SKILLS ON SCREEN */}
//             {Array.isArray(details.skills) && details.skills.length > 0 && (
//               <div style={{ marginTop: 14 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   ✅ Skills & Competences
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {details.skills.slice(0, 120).map((skill: any, idx: number) => (
//                     <span
//                       key={idx}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         background: "#fafafa",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(skill)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ✅ PRINT TASKS/KNOWLEDGE ON SCREEN */}
//             {Array.isArray(details.tasks) && details.tasks.length > 0 && (
//               <div style={{ marginTop: 14 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   ✅ Knowledge / Optional Items
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {details.tasks.slice(0, 80).map((task: any, idx: number) => (
//                     <span
//                       key={idx}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         background: "#fff",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(task)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 14,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with AI ✨
//             </button>

//             {/* ✅ Related roles */}
//             {relatedRoles.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   {relatedSource === "esco"
//                     ? "Related Roles / Sub Roles"
//                     : "Similar Roles (Fallback Search)"}
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {relatedRoles.slice(0, 15).map((role) => (
//                     <button
//                       key={role.uri}
//                       onClick={() => selectOccupation(role)}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         background: "white",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(role.title)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ✅ Output (Editable + Save) */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>
//             Refined Job Description (Editable ✅)
//           </h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           {saveMsg && (
//             <p style={{ marginTop: 8, color: saveMsg.includes("✅") ? "green" : "red" }}>
//               {saveMsg}
//             </p>
//           )}

//           {/* ✅ Editable Textarea */}
//           <textarea
//             value={safeText(refined)}
//             onChange={(e) => setRefined(e.target.value)}
//             rows={18}
//             style={{
//               width: "100%",
//               marginTop: 10,
//               padding: 14,
//               borderRadius: 10,
//               border: "1px solid #ddd",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//               fontSize: 14,
//               outline: "none",
//             }}
//           />

//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//             <button
//               onClick={saveEditedDescription}
//               disabled={loading || !savedId}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "green",
//                 color: "white",
//               }}
//             >
//               Save Edited Description ✅
//             </button>

//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(safeText(refined));
//                 setSaveMsg("✅ Copied to clipboard!");
//               }}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #ddd",
//                 cursor: "pointer",
//                 background: "white",
//                 color: "black",
//               }}
//             >
//               Copy 📋
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// ls 5 == docx and pdf export jd

// "use client";

// import { useState } from "react";
// import jsPDF from "jspdf";
// import { Document, Packer, Paragraph } from "docx";
// import { saveAs } from "file-saver";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// const cleanFileName = (name: string) => {
//   return name
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-_]/g, "")
//     .replace(/\s+/g, "_")
//     .slice(0, 60);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>("");
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);
//   const [relatedSource, setRelatedSource] = useState<"esco" | "similar" | null>(
//     null
//   );

//   const [saveMsg, setSaveMsg] = useState<string>("");

//   async function searchESCO() {
//     setLoading(true);

//     setResults([]);
//     setSelected(null);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();

//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     setLoading(true);

//     // ✅ 1) Fetch occupation details
//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     // ✅ 2) Fetch related roles/sub roles
//     const relatedRes = await fetch(
//       `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const relatedData = await relatedRes.json();

//     let related = relatedData?.related || [];

//     // ✅ fallback search if ESCO doesn't give related roles
//     if (related.length === 0) {
//       const query = occ?.title || data?.label || jobTitle || "role";

//       const similarRes = await fetch(
//         `/api/esco/similar?q=${encodeURIComponent(query)}`
//       );
//       const similarData = await similarRes.json();

//       related = (similarData?.results || []).filter(
//         (x: any) => x?.uri && x?.uri !== occ.uri
//       );

//       setRelatedSource("similar");
//     } else {
//       setRelatedSource("esco");
//     }

//     setRelatedRoles(related);

//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     const refinedText = safeText(data?.refinedDescription || data?.error || "");
//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");

//     if (data?.savedId) {
//       setSaveMsg("✅ Generated & Saved. You can edit below and save again.");
//     }

//     setLoading(false);
//   }

//   async function saveEditedDescription() {
//     setSaveMsg("");

//     if (!savedId) {
//       setSaveMsg("❌ No savedId found. First click 'Refine with AI'.");
//       return;
//     }

//     const textToSave = safeText(refined).trim();
//     if (!textToSave) {
//       setSaveMsg("❌ Job description is empty, cannot save.");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("/api/job/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id: savedId,
//         refinedDescription: textToSave,
//       }),
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setSaveMsg("✅ Edited job description updated successfully in MongoDB!");
//     } else {
//       setSaveMsg("❌ Save failed: " + safeText(data?.error));
//     }

//     setLoading(false);
//   }

//   // ✅ PDF Download
//   function downloadPDF() {
//     const text = safeText(refined).trim();
//     if (!text) return;

//     const title = jobTitle || details?.label || "job_description";
//     const fileName = `${cleanFileName(title)}.pdf`;

//     const doc = new jsPDF({
//       unit: "pt",
//       format: "a4",
//     });

//     const margin = 40;
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const maxWidth = pageWidth - margin * 2;

//     doc.setFont("times", "normal");
//     doc.setFontSize(12);

//     const lines = doc.splitTextToSize(text, maxWidth);

//     let y = margin;
//     const lineHeight = 16;

//     doc.text(lines, margin, y, { baseline: "top" });

//     doc.save(fileName);
//   }

//   // ✅ DOCX Download
//   async function downloadDOCX() {
//     const text = safeText(refined).trim();
//     if (!text) return;

//     const title = jobTitle || details?.label || "job_description";
//     const fileName = `${cleanFileName(title)}.docx`;

//     const paragraphs = text.split("\n").map((line) => new Paragraph(line));

//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: paragraphs,
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, fileName);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + AI ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → refine → edit → save → download
//         PDF/DOC.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., pastry chef)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>

//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>

//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             {/* ✅ PRINT SKILLS ON SCREEN */}
//             {Array.isArray(details.skills) && details.skills.length > 0 && (
//               <div style={{ marginTop: 14 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   ✅ Skills & Competences
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {details.skills.slice(0, 120).map((skill: any, idx: number) => (
//                     <span
//                       key={idx}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         background: "#fafafa",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(skill)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 14,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with AI ✨
//             </button>

//             {/* ✅ Related roles */}
//             {relatedRoles.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   {relatedSource === "esco"
//                     ? "Related Roles / Sub Roles"
//                     : "Similar Roles (Fallback Search)"}
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {relatedRoles.slice(0, 15).map((role) => (
//                     <button
//                       key={role.uri}
//                       onClick={() => selectOccupation(role)}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         background: "white",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(role.title)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ✅ Output (Editable + Save + Download) */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>
//             Refined Job Description (Editable ✅)
//           </h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           {saveMsg && (
//             <p
//               style={{
//                 marginTop: 8,
//                 color: saveMsg.includes("✅") ? "green" : "red",
//               }}
//             >
//               {saveMsg}
//             </p>
//           )}

//           {/* ✅ Editable Textarea */}
//           <textarea
//             value={safeText(refined)}
//             onChange={(e) => setRefined(e.target.value)}
//             rows={18}
//             style={{
//               width: "100%",
//               marginTop: 10,
//               padding: 14,
//               borderRadius: 10,
//               border: "1px solid #ddd",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//               fontSize: 14,
//               outline: "none",
//             }}
//           />

//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//             <button
//               onClick={saveEditedDescription}
//               disabled={loading || !savedId}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "green",
//                 color: "white",
//               }}
//             >
//               Save Edited ✅
//             </button>

//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(safeText(refined));
//                 setSaveMsg("✅ Copied to clipboard!");
//               }}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #ddd",
//                 cursor: "pointer",
//                 background: "white",
//                 color: "black",
//               }}
//             >
//               Copy 📋
//             </button>

//             <button
//               onClick={downloadPDF}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "#111",
//                 color: "white",
//               }}
//             >
//               Download PDF 📄
//             </button>

//             <button
//               onClick={downloadDOCX}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "#4b2aad",
//                 color: "white",
//               }}
//             >
//               Download DOCX 📝
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// adding company name

// "use client";

// import { useState } from "react";
// import jsPDF from "jspdf";
// import { Document, Packer, Paragraph } from "docx";
// import { saveAs } from "file-saver";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// const cleanFileName = (name: string) => {
//   return name
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-_]/g, "")
//     .replace(/\s+/g, "_")
//     .slice(0, 60);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [companyName, setCompanyName] = useState(""); // ✅ NEW
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>("");
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);
//   const [relatedSource, setRelatedSource] = useState<"esco" | "similar" | null>(
//     null
//   );

//   const [saveMsg, setSaveMsg] = useState<string>("");

//   async function searchESCO() {
//     setLoading(true);

//     setResults([]);
//     setSelected(null);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();

//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     setLoading(true);

//     // ✅ 1) Fetch occupation details
//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     // ✅ 2) Fetch related roles/sub roles
//     const relatedRes = await fetch(
//       `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const relatedData = await relatedRes.json();

//     let related = relatedData?.related || [];

//     // ✅ fallback search if ESCO doesn't give related roles
//     if (related.length === 0) {
//       const query = occ?.title || data?.label || jobTitle || "role";

//       const similarRes = await fetch(
//         `/api/esco/similar?q=${encodeURIComponent(query)}`
//       );
//       const similarData = await similarRes.json();

//       related = (similarData?.results || []).filter(
//         (x: any) => x?.uri && x?.uri !== occ.uri
//       );

//       setRelatedSource("similar");
//     } else {
//       setRelatedSource("esco");
//     }

//     setRelatedRoles(related);

//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         companyName, // ✅ NEW (sent to backend prompt)
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     const refinedText = safeText(data?.refinedDescription || data?.error || "");
//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");

//     if (data?.savedId) {
//       setSaveMsg("✅ Generated & Saved. You can edit below and save again.");
//     }

//     setLoading(false);
//   }

//   async function saveEditedDescription() {
//     setSaveMsg("");

//     if (!savedId) {
//       setSaveMsg("❌ No savedId found. First click 'Refine with AI'.");
//       return;
//     }

//     const textToSave = safeText(refined).trim();
//     if (!textToSave) {
//       setSaveMsg("❌ Job description is empty, cannot save.");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("/api/job/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id: savedId,
//         refinedDescription: textToSave,
//       }),
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setSaveMsg("✅ Edited job description updated successfully in MongoDB!");
//     } else {
//       setSaveMsg("❌ Save failed: " + safeText(data?.error));
//     }

//     setLoading(false);
//   }

//   // ✅ PDF Download
//   function downloadPDF() {
//     const text = safeText(refined).trim();
//     if (!text) return;

//     const title = jobTitle || details?.label || "job_description";
//     const fileName = `${cleanFileName(title)}.pdf`;

//     const doc = new jsPDF({
//       unit: "pt",
//       format: "a4",
//     });

//     const margin = 40;
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const maxWidth = pageWidth - margin * 2;

//     doc.setFont("times", "normal");
//     doc.setFontSize(12);

//     const lines = doc.splitTextToSize(text, maxWidth);

//     let y = margin;
//     doc.text(lines, margin, y, { baseline: "top" });

//     doc.save(fileName);
//   }

//   // ✅ DOCX Download
//   async function downloadDOCX() {
//     const text = safeText(refined).trim();
//     if (!text) return;

//     const title = jobTitle || details?.label || "job_description";
//     const fileName = `${cleanFileName(title)}.docx`;

//     const paragraphs = text.split("\n").map((line) => new Paragraph(line));

//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: paragraphs,
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, fileName);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + AI ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → refine → edit → save → download
//         PDF/DOC.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., pastry chef)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           {/* ✅ NEW Company Name input */}
//           <input
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             placeholder="Company name (optional)"
//             style={{
//               padding: 10,
//               width: 260,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>

//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>

//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             {/* ✅ PRINT SKILLS ON SCREEN */}
//             {Array.isArray(details.skills) && details.skills.length > 0 && (
//               <div style={{ marginTop: 14 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   ✅ Skills & Competences
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {details.skills.slice(0, 120).map((skill: any, idx: number) => (
//                     <span
//                       key={idx}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         background: "#fafafa",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(skill)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 14,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with AI ✨
//             </button>

//             {/* ✅ Related roles */}
//             {relatedRoles.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   {relatedSource === "esco"
//                     ? "Related Roles / Sub Roles"
//                     : "Similar Roles (Fallback Search)"}
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {relatedRoles.slice(0, 15).map((role) => (
//                     <button
//                       key={role.uri}
//                       onClick={() => selectOccupation(role)}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         background: "white",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(role.title)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ✅ Output (Editable + Save + Download) */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>
//             Refined Job Description (Editable ✅)
//           </h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           {saveMsg && (
//             <p
//               style={{
//                 marginTop: 8,
//                 color: saveMsg.includes("✅") ? "green" : "red",
//               }}
//             >
//               {saveMsg}
//             </p>
//           )}

//           {/* ✅ Editable Textarea */}
//           <textarea
//             value={safeText(refined)}
//             onChange={(e) => setRefined(e.target.value)}
//             rows={18}
//             style={{
//               width: "100%",
//               marginTop: 10,
//               padding: 14,
//               borderRadius: 10,
//               border: "1px solid #ddd",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//               fontSize: 14,
//               outline: "none",
//             }}
//           />

//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//             <button
//               onClick={saveEditedDescription}
//               disabled={loading || !savedId}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "green",
//                 color: "white",
//               }}
//             >
//               Save Edited ✅
//             </button>

//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(safeText(refined));
//                 setSaveMsg("✅ Copied to clipboard!");
//               }}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #ddd",
//                 cursor: "pointer",
//                 background: "white",
//                 color: "black",
//               }}
//             >
//               Copy 📋
//             </button>

//             <button
//               onClick={downloadPDF}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "#111",
//                 color: "white",
//               }}
//             >
//               Download PDF 📄
//             </button>

//             <button
//               onClick={downloadDOCX}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "#4b2aad",
//                 color: "white",
//               }}
//             >
//               Download DOCX 📝
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// rankimg

// "use client";

// import { useState } from "react";
// import jsPDF from "jspdf";
// import { Document, Packer, Paragraph } from "docx";
// import { saveAs } from "file-saver";

// const safeText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// const cleanFileName = (name: string) => {
//   return name
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-_]/g, "")
//     .replace(/\s+/g, "_")
//     .slice(0, 60);
// };

// export default function HomePage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [companyName, setCompanyName] = useState(""); // ✅ NEW
//   const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [details, setDetails] = useState<any>(null);

//   const [refined, setRefined] = useState<any>("");
//   const [savedId, setSavedId] = useState("");

//   const [relatedRoles, setRelatedRoles] = useState<any[]>([]);
//   const [relatedSource, setRelatedSource] = useState<"esco" | "similar" | null>(
//     null
//   );

//   const [saveMsg, setSaveMsg] = useState<string>("");

//   // ✅ Assessment form states
//   const [assessment, setAssessment] = useState<any>({
//     company: "",
//     street: "",
//     postal: "",
//     phone: "",
//     email: "",
//     internshipOccupation: "",

//     communication: 3,
//     criticism: 3,
//     teamwork: 3,

//     stamina: 3,
//     independence: 3,
//     orderliness: 3,
//     responsibility: 3,
//     accuracy: 3,
//     workspeed: 3,

//     manual: 3,
//     research: 3,
//     creative: 3,
//     supportive: 3,
//     leadership: 3,
//     admin: 3,
//   });

//   const [aiFilling, setAiFilling] = useState(false);
//   const [exportingDocx, setExportingDocx] = useState(false);

//   function updateAssessmentField(key: string, value: any) {
//     setAssessment((prev: any) => ({ ...prev, [key]: value }));
//   }

//   async function searchESCO() {
//     setLoading(true);

//     setResults([]);
//     setSelected(null);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     const res = await fetch(
//       `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
//     );
//     const data = await res.json();

//     setResults(data?.results || []);
//     setLoading(false);
//   }

//   async function selectOccupation(occ: any) {
//     setSelected(occ);
//     setDetails(null);

//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     setRelatedRoles([]);
//     setRelatedSource(null);

//     // reset assessment when role changes
//     setAssessment((prev: any) => ({
//       ...prev,
//       internshipOccupation: safeText(occ?.title || ""),
//     }));

//     setLoading(true);

//     // ✅ 1) Fetch occupation details
//     const res = await fetch(
//       `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const data = await res.json();
//     setDetails(data);

//     // ✅ 2) Fetch related roles/sub roles
//     const relatedRes = await fetch(
//       `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
//     );
//     const relatedData = await relatedRes.json();

//     let related = relatedData?.related || [];

//     // ✅ fallback search if ESCO doesn't give related roles
//     if (related.length === 0) {
//       const query = occ?.title || data?.label || jobTitle || "role";

//       const similarRes = await fetch(
//         `/api/esco/similar?q=${encodeURIComponent(query)}`
//       );
//       const similarData = await similarRes.json();

//       related = (similarData?.results || []).filter(
//         (x: any) => x?.uri && x?.uri !== occ.uri
//       );

//       setRelatedSource("similar");
//     } else {
//       setRelatedSource("esco");
//     }

//     setRelatedRoles(related);
//     setLoading(false);
//   }

//   async function refineWithAI() {
//     if (!selected || !details) return;

//     setLoading(true);
//     setRefined("");
//     setSavedId("");
//     setSaveMsg("");

//     const res = await fetch("/api/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobTitle,
//         companyName, // ✅ NEW (sent to backend prompt)
//         style,
//         escoOccupationUri: selected.uri,
//         escoOccupationLabel: details.label,
//         escoDescription: details.description,
//         escoSkills: details.skills,
//         escoTasks: details.tasks,
//       }),
//     });

//     const data = await res.json();

//     const refinedText = safeText(data?.refinedDescription || data?.error || "");
//     setRefined(refinedText);
//     setSavedId(data?.savedId || "");

//     if (data?.savedId) {
//       setSaveMsg("✅ Generated & Saved. You can edit below and save again.");
//     }

//     // Also auto-fill assessment company name if user typed it
//     if (companyName?.trim()) {
//       setAssessment((prev: any) => ({ ...prev, company: companyName.trim() }));
//     }

//     setLoading(false);
//   }

//   async function saveEditedDescription() {
//     setSaveMsg("");

//     if (!savedId) {
//       setSaveMsg("❌ No savedId found. First click 'Refine with AI'.");
//       return;
//     }

//     const textToSave = safeText(refined).trim();
//     if (!textToSave) {
//       setSaveMsg("❌ Job description is empty, cannot save.");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("/api/job/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id: savedId,
//         refinedDescription: textToSave,
//       }),
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setSaveMsg("✅ Edited job description updated successfully in MongoDB!");
//     } else {
//       setSaveMsg("❌ Save failed: " + safeText(data?.error));
//     }

//     setLoading(false);
//   }

//   // ✅ PDF Download (Job Description)
//   function downloadPDF() {
//     const text = safeText(refined).trim();
//     if (!text) return;

//     const title = jobTitle || details?.label || "job_description";
//     const fileName = `${cleanFileName(title)}.pdf`;

//     const doc = new jsPDF({
//       unit: "pt",
//       format: "a4",
//     });

//     const margin = 40;
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const maxWidth = pageWidth - margin * 2;

//     doc.setFont("times", "normal");
//     doc.setFontSize(12);

//     const lines = doc.splitTextToSize(text, maxWidth);

//     const y = margin;
//     doc.text(lines, margin, y, { baseline: "top" });

//     doc.save(fileName);
//   }

//   // ✅ DOCX Download (Job Description)
//   async function downloadDOCX() {
//     const text = safeText(refined).trim();
//     if (!text) return;

//     const title = jobTitle || details?.label || "job_description";
//     const fileName = `${cleanFileName(title)}.docx`;

//     const paragraphs = text.split("\n").map((line) => new Paragraph(line));

//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: paragraphs,
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, fileName);
//   }

//   // ✅ AI Suggest Ratings for Assessment Form
//   async function aiSuggestRatings() {
//     if (!refined) return;

//     setAiFilling(true);

//     const res = await fetch("/api/ai/assessment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         jobDescription: safeText(refined),
//         internshipOccupation: assessment.internshipOccupation,
//       }),
//     });

//     const data = await res.json();

//     if (data?.error) {
//       alert(data.error);
//       setAiFilling(false);
//       return;
//     }

//     setAssessment((prev: any) => ({
//       ...prev,
//       ...(data?.ratings || {}),
//     }));

//     setAiFilling(false);
//   }

//   // ✅ Download Filled Assessment DOCX
//   async function downloadFilledAssessmentDocx() {
//     setExportingDocx(true);

//     const payload = {
//       formData: {
//         company: safeText(assessment.company),
//         street: safeText(assessment.street),
//         postal: safeText(assessment.postal),
//         phone: safeText(assessment.phone),
//         email: safeText(assessment.email),
//         internship_occupation: safeText(assessment.internshipOccupation),

//         communication: Number(assessment.communication) || 3,
//         criticism: Number(assessment.criticism) || 3,
//         teamwork: Number(assessment.teamwork) || 3,

//         stamina: Number(assessment.stamina) || 3,
//         independence: Number(assessment.independence) || 3,
//         orderliness: Number(assessment.orderliness) || 3,
//         responsibility: Number(assessment.responsibility) || 3,
//         accuracy: Number(assessment.accuracy) || 3,
//         workspeed: Number(assessment.workspeed) || 3,

//         manual: Number(assessment.manual) || 3,
//         research: Number(assessment.research) || 3,
//         creative: Number(assessment.creative) || 3,
//         supportive: Number(assessment.supportive) || 3,
//         leadership: Number(assessment.leadership) || 3,
//         admin: Number(assessment.admin) || 3,
//       },
//     };

//     const res = await fetch("/api/export/docx", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       alert(err?.error || "DOCX export failed");
//       setExportingDocx(false);
//       return;
//     }

//     const blob = await res.blob();
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Filled_Assessment_Form.docx";
//     a.click();

//     URL.revokeObjectURL(url);
//     setExportingDocx(false);
//   }

//   return (
//     <div>
//       <h1 style={{ fontSize: 28, marginBottom: 8 }}>
//         ESCO Job Description Generator + AI ✨
//       </h1>

//       <p style={{ color: "#444" }}>
//         Type a job title → pick ESCO match → refine → edit → save → download JD
//         + fill assessment form → download filled DOCX.
//       </p>

//       {/* Input */}
//       <div
//         style={{
//           marginTop: 20,
//           padding: 16,
//           border: "1px solid #eee",
//           borderRadius: 10,
//         }}
//       >
//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <input
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             placeholder="Enter job title (e.g., pastry chef)"
//             style={{
//               padding: 10,
//               width: 320,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <input
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             placeholder="Company name (optional)"
//             style={{
//               padding: 10,
//               width: 260,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           />

//           <select
//             value={style}
//             onChange={(e) => setStyle(e.target.value as any)}
//             style={{
//               padding: 10,
//               border: "1px solid #ccc",
//               borderRadius: 8,
//             }}
//           >
//             <option value="ats">ATS Friendly</option>
//             <option value="startup">Startup Tone</option>
//             <option value="corporate">Corporate Tone</option>
//           </select>

//           <button
//             onClick={searchESCO}
//             disabled={!jobTitle || loading}
//             style={{
//               padding: "10px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//               background: "black",
//               color: "white",
//             }}
//           >
//             Search ESCO
//           </button>
//         </div>

//         {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

//           <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
//             {results.slice(0, 10).map((r) => (
//               <button
//                 key={r.uri}
//                 onClick={() => selectOccupation(r)}
//                 style={{
//                   textAlign: "left",
//                   padding: 12,
//                   borderRadius: 10,
//                   border: "1px solid #eee",
//                   cursor: "pointer",
//                   background: selected?.uri === r.uri ? "#f4f4f4" : "white",
//                 }}
//               >
//                 <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
//                 <div style={{ fontSize: 13, color: "#555" }}>
//                   {safeText(r.description)?.slice(0, 140) ||
//                     "No description available"}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Details */}
//       {details && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

//           <div
//             style={{
//               padding: 16,
//               borderRadius: 10,
//               border: "1px solid #eee",
//               marginTop: 10,
//             }}
//           >
//             <p>
//               <b>ESCO Label:</b> {safeText(details.label)}
//             </p>

//             <p>
//               <b>ESCO Description:</b> {safeText(details.description || "N/A")}
//             </p>

//             <p>
//               <b>Skills Found:</b> {details.skills?.length || 0}
//             </p>

//             <p>
//               <b>Tasks Found:</b> {details.tasks?.length || 0}
//             </p>

//             {/* ✅ PRINT SKILLS ON SCREEN */}
//             {Array.isArray(details.skills) && details.skills.length > 0 && (
//               <div style={{ marginTop: 14 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   ✅ Skills & Competences
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {details.skills.slice(0, 120).map((skill: any, idx: number) => (
//                     <span
//                       key={idx}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         background: "#fafafa",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(skill)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={refineWithAI}
//               disabled={loading}
//               style={{
//                 marginTop: 14,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "blue",
//                 color: "white",
//               }}
//             >
//               Refine with AI ✨
//             </button>

//             {/* ✅ Related roles */}
//             {relatedRoles.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 <h3 style={{ fontSize: 16, marginBottom: 10 }}>
//                   {relatedSource === "esco"
//                     ? "Related Roles / Sub Roles"
//                     : "Similar Roles (Fallback Search)"}
//                 </h3>

//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                   {relatedRoles.slice(0, 15).map((role) => (
//                     <button
//                       key={role.uri}
//                       onClick={() => selectOccupation(role)}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: 999,
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         background: "white",
//                         fontSize: 13,
//                       }}
//                     >
//                       {safeText(role.title)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ✅ Output: JD + edit + save + download */}
//       {safeText(refined) && (
//         <div style={{ marginTop: 20 }}>
//           <h2 style={{ fontSize: 18 }}>
//             Refined Job Description (Editable ✅)
//           </h2>

//           {savedId && (
//             <p style={{ color: "green" }}>
//               ✅ Saved to MongoDB (ID: {safeText(savedId)})
//             </p>
//           )}

//           {saveMsg && (
//             <p
//               style={{
//                 marginTop: 8,
//                 color: saveMsg.includes("✅") ? "green" : "red",
//               }}
//             >
//               {saveMsg}
//             </p>
//           )}

//           <textarea
//             value={safeText(refined)}
//             onChange={(e) => setRefined(e.target.value)}
//             rows={18}
//             style={{
//               width: "100%",
//               marginTop: 10,
//               padding: 14,
//               borderRadius: 10,
//               border: "1px solid #ddd",
//               background: "#fafafa",
//               whiteSpace: "pre-wrap",
//               lineHeight: 1.5,
//               fontSize: 14,
//               outline: "none",
//             }}
//           />

//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//             <button
//               onClick={saveEditedDescription}
//               disabled={loading || !savedId}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "green",
//                 color: "white",
//               }}
//             >
//               Save Edited ✅
//             </button>

//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(safeText(refined));
//                 setSaveMsg("✅ Copied to clipboard!");
//               }}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #ddd",
//                 cursor: "pointer",
//                 background: "white",
//                 color: "black",
//               }}
//             >
//               Copy 📋
//             </button>

//             <button
//               onClick={downloadPDF}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "#111",
//                 color: "white",
//               }}
//             >
//               Download JD PDF 📄
//             </button>

//             <button
//               onClick={downloadDOCX}
//               style={{
//                 marginTop: 12,
//                 padding: "10px 16px",
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: "pointer",
//                 background: "#4b2aad",
//                 color: "white",
//               }}
//             >
//               Download JD DOCX 📝
//             </button>
//           </div>

//           {/* ✅ Assessment Form Section */}
//           <div style={{ marginTop: 30 }}>
//             <h2 style={{ fontSize: 18 }}>
//               Assessment Form (User Editable + AI Help ✅)
//             </h2>

//             <div
//               style={{
//                 marginTop: 10,
//                 padding: 16,
//                 border: "1px solid #eee",
//                 borderRadius: 10,
//                 background: "#fff",
//               }}
//             >
//               <h3 style={{ marginBottom: 10 }}>Company Details</h3>

//               <div style={{ display: "grid", gap: 10 }}>
//                 <input
//                   value={assessment.company}
//                   onChange={(e) =>
//                     updateAssessmentField("company", e.target.value)
//                   }
//                   placeholder="Company"
//                   style={{
//                     padding: 10,
//                     borderRadius: 8,
//                     border: "1px solid #ccc",
//                   }}
//                 />

//                 <input
//                   value={assessment.street}
//                   onChange={(e) =>
//                     updateAssessmentField("street", e.target.value)
//                   }
//                   placeholder="Street, house number"
//                   style={{
//                     padding: 10,
//                     borderRadius: 8,
//                     border: "1px solid #ccc",
//                   }}
//                 />

//                 <input
//                   value={assessment.postal}
//                   onChange={(e) =>
//                     updateAssessmentField("postal", e.target.value)
//                   }
//                   placeholder="Postal code, city"
//                   style={{
//                     padding: 10,
//                     borderRadius: 8,
//                     border: "1px solid #ccc",
//                   }}
//                 />

//                 <input
//                   value={assessment.phone}
//                   onChange={(e) =>
//                     updateAssessmentField("phone", e.target.value)
//                   }
//                   placeholder="Phone"
//                   style={{
//                     padding: 10,
//                     borderRadius: 8,
//                     border: "1px solid #ccc",
//                   }}
//                 />

//                 <input
//                   value={assessment.email}
//                   onChange={(e) =>
//                     updateAssessmentField("email", e.target.value)
//                   }
//                   placeholder="Email"
//                   style={{
//                     padding: 10,
//                     borderRadius: 8,
//                     border: "1px solid #ccc",
//                   }}
//                 />

//                 <input
//                   value={assessment.internshipOccupation}
//                   onChange={(e) =>
//                     updateAssessmentField(
//                       "internshipOccupation",
//                       e.target.value
//                     )
//                   }
//                   placeholder="Internship occupation"
//                   style={{
//                     padding: 10,
//                     borderRadius: 8,
//                     border: "1px solid #ccc",
//                   }}
//                 />
//               </div>

//               <h3 style={{ marginTop: 16 }}>Ratings (1–5)</h3>

//               {[
//                 ["communication", "Communication skills"],
//                 ["criticism", "Ability to accept criticism"],
//                 ["teamwork", "Ability to work in a team"],
//                 ["stamina", "Stamina at work"],
//                 ["independence", "Independence"],
//                 ["orderliness", "Orderliness"],
//                 ["responsibility", "Sense of responsibility"],
//                 ["accuracy", "Accuracy at work"],
//                 ["workspeed", "Work speed"],
//                 ["manual", "Manual/technical skills"],
//                 ["research", "Investigative/research skills"],
//                 ["creative", "Creative skills"],
//                 ["supportive", "Educational/supportive skills"],
//                 ["leadership", "Leadership/sales skills"],
//                 ["admin", "Commercial/administrative skills"],
//               ].map(([key, label]) => (
//                 <div
//                   key={key}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginTop: 10,
//                     padding: 10,
//                     borderRadius: 10,
//                     border: "1px solid #eee",
//                     background: "#fafafa",
//                   }}
//                 >
//                   <div style={{ fontWeight: 600 }}>{label}</div>

//                   <select
//                     value={assessment[key]}
//                     onChange={(e) =>
//                       updateAssessmentField(key, Number(e.target.value))
//                     }
//                     style={{
//                       padding: "8px 10px",
//                       borderRadius: 8,
//                       border: "1px solid #ccc",
//                     }}
//                   >
//                     {[1, 2, 3, 4, 5].map((n) => (
//                       <option key={n} value={n}>
//                         {n}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               ))}

//               <div
//                 style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}
//               >
//                 <button
//                   onClick={aiSuggestRatings}
//                   disabled={aiFilling}
//                   style={{
//                     padding: "10px 16px",
//                     borderRadius: 8,
//                     border: "none",
//                     cursor: "pointer",
//                     background: "orange",
//                     color: "black",
//                     fontWeight: 700,
//                   }}
//                 >
//                   {aiFilling ? "AI Filling..." : "AI Suggest Ratings ✨"}
//                 </button>

//                 <button
//                   onClick={downloadFilledAssessmentDocx}
//                   disabled={exportingDocx}
//                   style={{
//                     padding: "10px 16px",
//                     borderRadius: 8,
//                     border: "none",
//                     cursor: "pointer",
//                     background: "green",
//                     color: "white",
//                     fontWeight: 700,
//                   }}
//                 >
//                   {exportingDocx ? "Generating..." : "Download Filled DOCX ✅"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// ranking 2

"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

const safeText = (val: any) => {
  if (val == null) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object" && val.literal) return String(val.literal);
  return JSON.stringify(val);
};

const cleanFileName = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 60);
};

export default function HomePage() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [style, setStyle] = useState<"ats" | "startup" | "corporate">("ats");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);

  const [refined, setRefined] = useState<any>("");
  const [savedId, setSavedId] = useState("");

  const [relatedRoles, setRelatedRoles] = useState<any[]>([]);
  const [relatedSource, setRelatedSource] = useState<"esco" | "similar" | null>(
    null
  );

  const [saveMsg, setSaveMsg] = useState<string>("");

  // ✅ Assessment form states
  const [assessment, setAssessment] = useState<any>({
    company: "",
    street: "",
    postal: "",
    phone: "",
    email: "",
    internshipOccupation: "",

    communication: 3,
    criticism: 3,
    teamwork: 3,

    stamina: 3,
    independence: 3,
    orderliness: 3,
    responsibility: 3,
    accuracy: 3,
    workspeed: 3,

    manual: 3,
    research: 3,
    creative: 3,
    supportive: 3,
    leadership: 3,
    admin: 3,
  });

  const [aiFilling, setAiFilling] = useState(false);
  const [exportingDocx, setExportingDocx] = useState(false);

  function updateAssessmentField(key: string, value: any) {
    setAssessment((prev: any) => ({ ...prev, [key]: value }));
  }

  async function searchESCO() {
    setLoading(true);

    setResults([]);
    setSelected(null);
    setDetails(null);

    setRefined("");
    setSavedId("");
    setSaveMsg("");

    setRelatedRoles([]);
    setRelatedSource(null);

    const res = await fetch(
      `/api/esco/search?title=${encodeURIComponent(jobTitle)}`
    );
    const data = await res.json();

    setResults(data?.results || []);
    setLoading(false);
  }

  async function selectOccupation(occ: any) {
    setSelected(occ);
    setDetails(null);

    setRefined("");
    setSavedId("");
    setSaveMsg("");

    setRelatedRoles([]);
    setRelatedSource(null);

    // reset assessment when role changes
    setAssessment((prev: any) => ({
      ...prev,
      internshipOccupation: safeText(occ?.title || ""),
    }));

    setLoading(true);

    // ✅ 1) Fetch occupation details
    const res = await fetch(
      `/api/esco/occupation?uri=${encodeURIComponent(occ.uri)}`
    );
    const data = await res.json();
    setDetails(data);

    // ✅ 2) Fetch related roles/sub roles
    const relatedRes = await fetch(
      `/api/esco/related?uri=${encodeURIComponent(occ.uri)}`
    );
    const relatedData = await relatedRes.json();

    let related = relatedData?.related || [];

    // ✅ fallback search if ESCO doesn't give related roles
    if (related.length === 0) {
      const query = occ?.title || data?.label || jobTitle || "role";

      const similarRes = await fetch(
        `/api/esco/similar?q=${encodeURIComponent(query)}`
      );
      const similarData = await similarRes.json();

      related = (similarData?.results || []).filter(
        (x: any) => x?.uri && x?.uri !== occ.uri
      );

      setRelatedSource("similar");
    } else {
      setRelatedSource("esco");
    }

    setRelatedRoles(related);
    setLoading(false);
  }

  async function refineWithAI() {
    if (!selected || !details) return;

    setLoading(true);
    setRefined("");
    setSavedId("");
    setSaveMsg("");

    const res = await fetch("/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle,
        companyName,
        style,
        escoOccupationUri: selected.uri,
        escoOccupationLabel: details.label,
        escoDescription: details.description,
        escoSkills: details.skills,
        escoTasks: details.tasks,
      }),
    });

    const data = await res.json();

    const refinedText = safeText(data?.refinedDescription || data?.error || "");
    setRefined(refinedText);
    setSavedId(data?.savedId || "");

    if (data?.savedId) {
      setSaveMsg("✅ Generated & Saved. You can edit below and save again.");
    }

    // auto-fill assessment company
    if (companyName?.trim()) {
      setAssessment((prev: any) => ({ ...prev, company: companyName.trim() }));
    }

    // auto-fill internshipOccupation if empty
    if (!assessment?.internshipOccupation?.trim()) {
      setAssessment((prev: any) => ({
        ...prev,
        internshipOccupation: safeText(details?.label || jobTitle),
      }));
    }

    setLoading(false);
  }

  async function saveEditedDescription() {
    setSaveMsg("");

    if (!savedId) {
      setSaveMsg("❌ No savedId found. First click 'Refine with AI'.");
      return;
    }

    const textToSave = safeText(refined).trim();
    if (!textToSave) {
      setSaveMsg("❌ Job description is empty, cannot save.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/job/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: savedId,
        refinedDescription: textToSave,
      }),
    });

    const data = await res.json();

    if (data?.success) {
      setSaveMsg("✅ Edited job description updated successfully in MongoDB!");
    } else {
      setSaveMsg("❌ Save failed: " + safeText(data?.error));
    }

    setLoading(false);
  }

  // ✅ PDF Download (Job Description)
  function downloadPDF() {
    const text = safeText(refined).trim();
    if (!text) return;

    const title = jobTitle || details?.label || "job_description";
    const fileName = `${cleanFileName(title)}.pdf`;

    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(text, maxWidth);

    doc.text(lines, margin, margin, { baseline: "top" });
    doc.save(fileName);
  }

  // ✅ DOCX Download (Job Description)
  async function downloadDOCX() {
    const text = safeText(refined).trim();
    if (!text) return;

    const title = jobTitle || details?.label || "job_description";
    const fileName = `${cleanFileName(title)}.docx`;

    const paragraphs = text.split("\n").map((line) => new Paragraph(line));

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);
  }

  // ✅ AI Suggest Ratings for Assessment Form
  async function aiSuggestRatings() {
    if (!refined) return;

    setAiFilling(true);

    const res = await fetch("/api/ai/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobDescription: safeText(refined),
        internshipOccupation: safeText(assessment.internshipOccupation),
      }),
    });

    const data = await res.json();

    if (data?.error) {
      alert(data.error);
      setAiFilling(false);
      return;
    }

    setAssessment((prev: any) => ({
      ...prev,
      ...(data?.ratings || {}),
    }));

    setAiFilling(false);
  }

  // ✅ Download Filled Assessment DOCX (Server route)
  async function downloadFilledAssessmentDocx() {
    setExportingDocx(true);

    const payload = {
      formData: {
        company: safeText(assessment.company),
        street: safeText(assessment.street),
        postal: safeText(assessment.postal),
        phone: safeText(assessment.phone),
        email: safeText(assessment.email),
        internship_occupation: safeText(assessment.internshipOccupation),

        communication: Number(assessment.communication) || 3,
        criticism: Number(assessment.criticism) || 3,
        teamwork: Number(assessment.teamwork) || 3,

        stamina: Number(assessment.stamina) || 3,
        independence: Number(assessment.independence) || 3,
        orderliness: Number(assessment.orderliness) || 3,
        responsibility: Number(assessment.responsibility) || 3,
        accuracy: Number(assessment.accuracy) || 3,
        workspeed: Number(assessment.workspeed) || 3,

        manual: Number(assessment.manual) || 3,
        research: Number(assessment.research) || 3,
        creative: Number(assessment.creative) || 3,
        supportive: Number(assessment.supportive) || 3,
        leadership: Number(assessment.leadership) || 3,
        admin: Number(assessment.admin) || 3,
      },
    };

    const res = await fetch("/api/export/docx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // if (!res.ok) {
    //   const err = await res.json();
    //   alert(err?.error || "DOCX export failed");
    //   setExportingDocx(false);
    //   return;
    // }

    if (!res.ok) {
  let errText = "DOCX export failed";

  try {
    const err = await res.json();
    errText = err?.error || errText;

    // ✅ Show full docxtemplater errors (duplicate tags etc.)
    if (err?.details) {
      errText += "\n\nDETAILS:\n" + JSON.stringify(err.details, null, 2);
    }
  } catch (e) {}

  alert(errText);
  setExportingDocx(false);
  return;
}


    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Filled_Assessment_Form.docx";
    a.click();

    URL.revokeObjectURL(url);
    setExportingDocx(false);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        ESCO Job Description Generator + AI ✨
      </h1>

      <p style={{ color: "#444" }}>
        Type a job title → pick ESCO match → refine → edit → save → download JD
        + fill assessment form → download filled DOCX ✅
      </p>

      {/* Input */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 10,
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title (e.g., pastry chef)"
            style={{
              padding: 10,
              width: 320,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />

          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company name (optional)"
            style={{
              padding: 10,
              width: 260,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as any)}
            style={{
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          >
            <option value="ats">ATS Friendly</option>
            <option value="startup">Startup Tone</option>
            <option value="corporate">Corporate Tone</option>
          </select>

          <button
            onClick={searchESCO}
            disabled={!jobTitle || loading}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "black",
              color: "white",
            }}
          >
            Search ESCO
          </button>
        </div>

        {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 18 }}>ESCO Matches</h2>

          <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
            {results.slice(0, 10).map((r) => (
              <button
                key={r.uri}
                onClick={() => selectOccupation(r)}
                style={{
                  textAlign: "left",
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #eee",
                  cursor: "pointer",
                  background: selected?.uri === r.uri ? "#f4f4f4" : "white",
                }}
              >
                <div style={{ fontWeight: 700 }}>{safeText(r.title)}</div>
                <div style={{ fontSize: 13, color: "#555" }}>
                  {safeText(r.description)?.slice(0, 140) ||
                    "No description available"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      {details && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 18 }}>Selected Occupation Data</h2>

          <div
            style={{
              padding: 16,
              borderRadius: 10,
              border: "1px solid #eee",
              marginTop: 10,
            }}
          >
            <p>
              <b>ESCO Label:</b> {safeText(details.label)}
            </p>

            <p>
              <b>ESCO Description:</b> {safeText(details.description || "N/A")}
            </p>

            <p>
              <b>Skills Found:</b> {details.skills?.length || 0}
            </p>

            <p>
              <b>Tasks Found:</b> {details.tasks?.length || 0}
            </p>

            {/* ✅ PRINT SKILLS ON SCREEN */}
            {Array.isArray(details.skills) && details.skills.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <h3 style={{ fontSize: 16, marginBottom: 10 }}>
                  ✅ Skills & Competences
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {details.skills.slice(0, 120).map((skill: any, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: "1px solid #ddd",
                        background: "#fafafa",
                        fontSize: 13,
                      }}
                    >
                      {safeText(skill)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={refineWithAI}
              disabled={loading}
              style={{
                marginTop: 14,
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "blue",
                color: "white",
              }}
            >
              Refine with AI ✨
            </button>

            {/* ✅ Related roles */}
            {relatedRoles.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: 16, marginBottom: 10 }}>
                  {relatedSource === "esco"
                    ? "Related Roles / Sub Roles"
                    : "Similar Roles (Fallback Search)"}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {relatedRoles.slice(0, 15).map((role) => (
                    <button
                      key={role.uri}
                      onClick={() => selectOccupation(role)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        background: "white",
                        fontSize: 13,
                      }}
                    >
                      {safeText(role.title)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ Output: JD + edit + save + download */}
      {safeText(refined) && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 18 }}>Refined Job Description (Editable ✅)</h2>

          {savedId && (
            <p style={{ color: "green" }}>
              ✅ Saved to MongoDB (ID: {safeText(savedId)})
            </p>
          )}

          {saveMsg && (
            <p
              style={{
                marginTop: 8,
                color: saveMsg.includes("✅") ? "green" : "red",
              }}
            >
              {saveMsg}
            </p>
          )}

          <textarea
            value={safeText(refined)}
            onChange={(e) => setRefined(e.target.value)}
            rows={18}
            style={{
              width: "100%",
              marginTop: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fafafa",
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              fontSize: 14,
              outline: "none",
            }}
          />

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={saveEditedDescription}
              disabled={loading || !savedId}
              style={{
                marginTop: 12,
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "green",
                color: "white",
              }}
            >
              Save Edited ✅
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(safeText(refined));
                setSaveMsg("✅ Copied to clipboard!");
              }}
              style={{
                marginTop: 12,
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid #ddd",
                cursor: "pointer",
                background: "white",
                color: "black",
              }}
            >
              Copy 📋
            </button>

            <button
              onClick={downloadPDF}
              style={{
                marginTop: 12,
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "#111",
                color: "white",
              }}
            >
              Download JD PDF 📄
            </button>

            <button
              onClick={downloadDOCX}
              style={{
                marginTop: 12,
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "#4b2aad",
                color: "white",
              }}
            >
              Download JD DOCX 📝
            </button>
          </div>

          {/* ✅ Assessment Form Section */}
          <div style={{ marginTop: 30 }}>
            <h2 style={{ fontSize: 18 }}>
              Assessment Form (User Editable + AI Help ✅)
            </h2>

            <div
              style={{
                marginTop: 10,
                padding: 16,
                border: "1px solid #eee",
                borderRadius: 10,
                background: "#fff",
              }}
            >
              <h3 style={{ marginBottom: 10 }}>Company Details</h3>

              <div style={{ display: "grid", gap: 10 }}>
                <input
                  value={assessment.company}
                  onChange={(e) =>
                    updateAssessmentField("company", e.target.value)
                  }
                  placeholder="Company"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />

                <input
                  value={assessment.street}
                  onChange={(e) =>
                    updateAssessmentField("street", e.target.value)
                  }
                  placeholder="Street, house number"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />

                <input
                  value={assessment.postal}
                  onChange={(e) =>
                    updateAssessmentField("postal", e.target.value)
                  }
                  placeholder="Postal code, city"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />

                <input
                  value={assessment.phone}
                  onChange={(e) =>
                    updateAssessmentField("phone", e.target.value)
                  }
                  placeholder="Phone"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />

                <input
                  value={assessment.email}
                  onChange={(e) =>
                    updateAssessmentField("email", e.target.value)
                  }
                  placeholder="Email"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />

                <input
                  value={assessment.internshipOccupation}
                  onChange={(e) =>
                    updateAssessmentField("internshipOccupation", e.target.value)
                  }
                  placeholder="Internship occupation"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <h3 style={{ marginTop: 16 }}>Ratings (1–5)</h3>

              {[
                ["communication", "Communication skills"],
                ["criticism", "Ability to accept criticism"],
                ["teamwork", "Ability to work in a team"],
                ["stamina", "Stamina at work"],
                ["independence", "Independence"],
                ["orderliness", "Orderliness"],
                ["responsibility", "Sense of responsibility"],
                ["accuracy", "Accuracy at work"],
                ["workspeed", "Work speed"],
                ["manual", "Manual/technical skills"],
                ["research", "Investigative/research skills"],
                ["creative", "Creative skills"],
                ["supportive", "Educational/supportive skills"],
                ["leadership", "Leadership/sales skills"],
                ["admin", "Commercial/administrative skills"],
              ].map(([key, label]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid #eee",
                    background: "#fafafa",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{label}</div>

                  <select
                    value={assessment[key]}
                    onChange={(e) =>
                      updateAssessmentField(key, Number(e.target.value))
                    }
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 16,
                }}
              >
                <button
                  onClick={aiSuggestRatings}
                  disabled={aiFilling}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    background: "orange",
                    color: "black",
                    fontWeight: 700,
                  }}
                >
                  {aiFilling ? "AI Filling..." : "AI Suggest Ratings ✨"}
                </button>

                <button
                  onClick={downloadFilledAssessmentDocx}
                  disabled={exportingDocx}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    background: "green",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {exportingDocx ? "Generating..." : "Download Filled DOCX ✅"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
