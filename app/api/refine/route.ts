// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { connectDB } from "@/lib/db";
// import { JobResult } from "@/lib/models/JobResult";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       jobTitle,
//       escoOccupationUri,
//       escoOccupationLabel,
//       escoDescription,
//       escoSkills,
//       escoTasks,
//       style,
//     } = body;

//     if (!jobTitle || !escoOccupationUri || !escoOccupationLabel) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const toneInstruction =
//       style === "startup"
//         ? "Write in a friendly, modern startup tone."
//         : style === "corporate"
//         ? "Write in a formal corporate tone."
//         : "Write in a professional ATS-friendly tone.";

//     const prompt = `
// You are an expert HR recruiter and job description writer.

// Generate a high-quality job description for this role:
// JOB TITLE: ${jobTitle}

// Use the following ESCO-based reference data (facts only):
// ESCO LABEL: ${escoOccupationLabel}
// ESCO DESCRIPTION: ${escoDescription || "N/A"}
// ESCO SKILLS: ${(escoSkills || []).join(", ")}
// ESCO TASKS: ${(escoTasks || []).join(", ")}

// Instructions:
// - Do NOT mention ESCO in the output
// - Do NOT add fake company names
// - Keep it realistic, clear, and professional
// - Make it readable and structured
// - Avoid fluff and overly generic lines
// - ${toneInstruction}

// Output format (exact headings):
// 1) Job Title
// 2) Role Overview
// 3) Key Responsibilities (bullets)
// 4) Required Skills (bullets)
// 5) Preferred Skills (bullets)
// 6) Qualifications (bullets)
// 7) Key Metrics / Success Criteria (bullets)
// 8) Keywords (comma-separated)
// `.trim();

//     const client = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });

//     const aiRes = await client.responses.create({
//       model: "gpt-4.1-mini",
//       input: prompt,
//     });

//     // const refinedDescription = aiRes.output_text?.trim() || "";

//     function extractTextFromResponse(aiRes: any): string {
//   // ✅ Most common case (string)
//   if (typeof aiRes?.output_text === "string") return aiRes.output_text;

//   // ✅ If output_text is an object/array
//   if (Array.isArray(aiRes?.output_text)) {
//     return aiRes.output_text
//       .map((x: any) => (typeof x === "string" ? x : x?.literal || ""))
//       .join("\n");
//   }

//   // ✅ Fallback: read from output array
//   const output = aiRes?.output;
//   if (Array.isArray(output)) {
//     let text = "";
//     for (const item of output) {
//       const content = item?.content;
//       if (Array.isArray(content)) {
//         for (const c of content) {
//           if (typeof c?.text === "string") text += c.text + "\n";
//           if (typeof c?.literal === "string") text += c.literal + "\n";
//         }
//       }
//     }
//     return text.trim();
//   }

//   // ✅ Last fallback
//   return JSON.stringify(aiRes);
// }


//     // if (!refinedDescription) {
//     //   return NextResponse.json(
//     //     { error: "OpenAI did not return output" },
//     //     { status: 500 }
//     //   );
//     // }



//     await connectDB();

//     const saved = await JobResult.create({
//       jobTitle,
//       escoOccupationUri,
//       escoOccupationLabel,
//       escoDescription: escoDescription || "",
//       escoSkills: escoSkills || [],
//       escoTasks: escoTasks || [],
//       refinedDescription,
//     });

//     return NextResponse.json({
//       refinedDescription,
//       savedId: saved._id,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// === working = chatgpt version


// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { connectDB } from "@/lib/db";
// import { JobResult } from "@/lib/models/JobResult";

// // ✅ Keep this helper OUTSIDE the POST function
// function extractTextFromResponse(aiRes: any): string {
//   // ✅ Most common case (string)
//   if (typeof aiRes?.output_text === "string") return aiRes.output_text;

//   // ✅ If output_text is an array of structured items
//   if (Array.isArray(aiRes?.output_text)) {
//     return aiRes.output_text
//       .map((x: any) => (typeof x === "string" ? x : x?.literal || ""))
//       .join("\n");
//   }

//   // ✅ Fallback: read from output array
//   const output = aiRes?.output;
//   if (Array.isArray(output)) {
//     let text = "";
//     for (const item of output) {
//       const content = item?.content;
//       if (Array.isArray(content)) {
//         for (const c of content) {
//           if (typeof c?.text === "string") text += c.text + "\n";
//           if (typeof c?.literal === "string") text += c.literal + "\n";
//         }
//       }
//     }
//     return text.trim();
//   }

//   // ✅ Last fallback
//   return JSON.stringify(aiRes);
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       jobTitle,
//       escoOccupationUri,
//       escoOccupationLabel,
//       escoDescription,
//       escoSkills,
//       escoTasks,
//       style,
//     } = body;

//     if (!jobTitle || !escoOccupationUri || !escoOccupationLabel) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const toneInstruction =
//       style === "startup"
//         ? "Write in a friendly, modern startup tone."
//         : style === "corporate"
//         ? "Write in a formal corporate tone."
//         : "Write in a professional ATS-friendly tone.";

//     const prompt = `
// You are an expert HR recruiter and job description writer.

// Generate a high-quality job description for this role:
// JOB TITLE: ${jobTitle}

// Use the following ESCO-based reference data (facts only):
// ESCO LABEL: ${escoOccupationLabel}
// ESCO DESCRIPTION: ${escoDescription || "N/A"}
// ESCO SKILLS: ${(escoSkills || []).join(", ")}
// ESCO TASKS: ${(escoTasks || []).join(", ")}

// Instructions:
// - Do NOT mention ESCO in the output
// - Do NOT add fake company names
// - Keep it realistic, clear, and professional
// - Make it readable and structured
// - Avoid fluff and overly generic lines
// - ${toneInstruction}

// Output format (exact headings):
// 1) Job Title
// 2) Role Overview
// 3) Key Responsibilities (bullets)
// 4) Required Skills (bullets)
// 5) Preferred Skills (bullets)
// 6) Qualifications (bullets)
// 7) Key Metrics / Success Criteria (bullets)
// 8) Keywords (comma-separated)
// `.trim();

//     const client = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });

//     const aiRes = await client.responses.create({
//       model: "gpt-4.1-mini",
//       input: prompt,
//     });

//     // ✅ THIS LINE WAS MISSING IN YOUR FILE
//     const refinedDescription = extractTextFromResponse(aiRes).trim();

//     // ✅ If OpenAI returns empty output, stop
//     if (!refinedDescription) {
//       return NextResponse.json(
//         { error: "OpenAI did not return output" },
//         { status: 500 }
//       );
//     }

//     await connectDB();

//     const saved = await JobResult.create({
//       jobTitle,
//       escoOccupationUri,
//       escoOccupationLabel,
//       escoDescription: escoDescription || "",
//       escoSkills: escoSkills || [],
//       escoTasks: escoTasks || [],
//       refinedDescription,
//     });

//     return NextResponse.json({
//       refinedDescription,
//       savedId: saved._id,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }


// groq 

// import { NextResponse } from "next/server";
// import Groq from "groq-sdk";
// import { connectDB } from "@/lib/db";
// import { JobResult } from "@/lib/models/JobResult";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       jobTitle,
//       escoOccupationUri,
//       escoOccupationLabel,
//       escoDescription,
//       escoSkills,
//       escoTasks,
//       style,
//     } = body;

//     if (!jobTitle || !escoOccupationUri || !escoOccupationLabel) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const toneInstruction =
//       style === "startup"
//         ? "Write in a friendly, modern startup tone."
//         : style === "corporate"
//         ? "Write in a formal corporate tone."
//         : "Write in a professional ATS-friendly tone.";

//     const prompt = `
// You are an expert HR recruiter and job description writer.

// Generate a high-quality job description for this role:
// JOB TITLE: ${jobTitle}

// Use the following ESCO-based reference data (facts only):
// ESCO LABEL: ${escoOccupationLabel}
// ESCO DESCRIPTION: ${escoDescription || "N/A"}
// ESCO SKILLS: ${(escoSkills || []).join(", ")}
// ESCO TASKS: ${(escoTasks || []).join(", ")}

// Instructions:
// - Do NOT mention ESCO in the output
// - Do NOT add fake company names
// - Keep it realistic, clear, and professional
// - Make it readable and structured
// - Avoid fluff and overly generic lines
// - ${toneInstruction}

// Output format (exact headings):
// 1) Job Title
// 2) Role Overview
// 3) Key Responsibilities (bullets)
// 4) Required Skills (bullets)
// 5) Preferred Skills (bullets)
// 6) Qualifications (bullets)
// 7) Key Metrics / Success Criteria (bullets)
// 8) Keywords (comma-separated)
// `.trim();

//     const groq = new Groq({
//       apiKey: process.env.GROQ_API_KEY,
//     });

//     // ✅ Choose a good free model
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant", // fast + good
//       messages: [
//         {
//           role: "system",
//           content:
//             "You write clean, professional, ATS-friendly job descriptions.",
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.4,
//       max_tokens: 900,
//     });

//     const refinedDescription =
//       completion?.choices?.[0]?.message?.content?.trim() || "";

//     if (!refinedDescription) {
//       return NextResponse.json(
//         { error: "Groq did not return output" },
//         { status: 500 }
//       );
//     }

//     await connectDB();

//     const saved = await JobResult.create({
//       jobTitle,
//       escoOccupationUri,
//       escoOccupationLabel,
//       escoDescription: escoDescription || "",
//       escoSkills: escoSkills || [],
//       escoTasks: escoTasks || [],
//       refinedDescription,
//     });

//     return NextResponse.json({
//       refinedDescription, // ✅ always a string
//       savedId: saved._id,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// groq working

// import { NextResponse } from "next/server";
// import Groq from "groq-sdk";
// import { connectDB } from "@/lib/db";
// import { JobResult } from "@/lib/models/JobResult";

// // ✅ Converts anything (including {literal, mimetype}) into string safely
// const toText = (val: any) => {
//   if (val == null) return "";
//   if (typeof val === "string") return val;
//   if (typeof val === "number") return String(val);
//   if (typeof val === "object" && val.literal) return String(val.literal);
//   return JSON.stringify(val);
// };

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       jobTitle,
//       escoOccupationUri,
//       escoOccupationLabel,
//       escoDescription,
//       escoSkills,
//       escoTasks,
//       style,
//     } = body;

//     if (!jobTitle || !escoOccupationUri || !escoOccupationLabel) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const toneInstruction =
//       style === "startup"
//         ? "Write in a friendly, modern startup tone."
//         : style === "corporate"
//         ? "Write in a formal corporate tone."
//         : "Write in a professional ATS-friendly tone.";

//     const prompt = `
// You are an expert HR recruiter and job description writer.

// Generate a high-quality job description for this role:
// JOB TITLE: ${toText(jobTitle)}

// Use the following ESCO-based reference data (facts only):
// ESCO LABEL: ${toText(escoOccupationLabel)}
// ESCO DESCRIPTION: ${toText(escoDescription) || "N/A"}
// ESCO SKILLS: ${(Array.isArray(escoSkills) ? escoSkills : []).map(toText).join(", ")}
// ESCO TASKS: ${(Array.isArray(escoTasks) ? escoTasks : []).map(toText).join(", ")}

// Instructions:
// - Do NOT mention ESCO in the output
// - Do NOT add fake company names
// - Keep it realistic, clear, and professional
// - Make it readable and structured
// - Avoid fluff and overly generic lines
// - ${toneInstruction}

// Output format (exact headings):
// 1) Job Title
// 2) Role Overview
// 3) Key Responsibilities (bullets)
// 4) Required Skills (bullets)
// 5) Preferred Skills (bullets)
// 6) Qualifications (bullets)
// 7) Key Metrics / Success Criteria (bullets)
// 8) Keywords (comma-separated)
// `.trim();

//     const groq = new Groq({
//       apiKey: process.env.GROQ_API_KEY,
//     });

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You write clean, professional, ATS-friendly job descriptions.",
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.4,
//       max_tokens: 900,
//     });

//     const refinedDescription = toText(
//       completion?.choices?.[0]?.message?.content
//     ).trim();

//     if (!refinedDescription) {
//       return NextResponse.json(
//         { error: "Groq did not return output" },
//         { status: 500 }
//       );
//     }

//     await connectDB();

//     const saved = await JobResult.create({
//       jobTitle: toText(jobTitle),
//       escoOccupationUri: toText(escoOccupationUri),
//       escoOccupationLabel: toText(escoOccupationLabel),
//       escoDescription: toText(escoDescription),

//       escoSkills: Array.isArray(escoSkills) ? escoSkills.map(toText) : [],
//       escoTasks: Array.isArray(escoTasks) ? escoTasks.map(toText) : [],

//       refinedDescription: toText(refinedDescription),
//     });

//     return NextResponse.json({
//       refinedDescription: toText(refinedDescription), // ✅ guaranteed string
//       savedId: saved._id,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// with company name extra

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { connectDB } from "@/lib/db";
import { JobResult } from "@/lib/models/JobResult";

// ✅ Converts anything (including {literal, mimetype}) into string safely
const toText = (val: any) => {
  if (val == null) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object" && val.literal) return String(val.literal);
  return JSON.stringify(val);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      jobTitle,
      companyName, // ✅ NEW
      escoOccupationUri,
      escoOccupationLabel,
      escoDescription,
      escoSkills,
      escoTasks,
      style,
    } = body;

    if (!jobTitle || !escoOccupationUri || !escoOccupationLabel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const toneInstruction =
      style === "startup"
        ? "Write in a friendly, modern startup tone."
        : style === "corporate"
        ? "Write in a formal corporate tone."
        : "Write in a professional ATS-friendly tone.";

    const companyLine = toText(companyName).trim();

    const prompt = `
You are an expert HR recruiter and job description writer.

Generate a high-quality job description for this role.

${companyLine ? `COMPANY NAME: ${companyLine}` : "COMPANY NAME: (not provided)"}
JOB TITLE: ${toText(jobTitle)}

Use the following reference data (facts only):
ROLE LABEL: ${toText(escoOccupationLabel)}
ROLE DESCRIPTION: ${toText(escoDescription) || "N/A"}
SKILLS: ${(Array.isArray(escoSkills) ? escoSkills : [])
      .map(toText)
      .join(", ")}
TASKS: ${(Array.isArray(escoTasks) ? escoTasks : [])
      .map(toText)
      .join(", ")}

Instructions:
- Do NOT mention ESCO in the output
- Do NOT add fake company names
- If COMPANY NAME is provided, include it in the job description (Company / About section)
- If COMPANY NAME is NOT provided, DO NOT create or guess a company name
- Keep it realistic, clear, and professional
- Make it readable and structured
- Avoid fluff and overly generic lines
- ${toneInstruction}

Output format (exact headings):
0) Company (only if COMPANY NAME is provided)
1) Job Title
2) Role Overview
3) Key Responsibilities (bullets)
4) Required Skills (bullets)
5) Preferred Skills (bullets)
6) Qualifications (bullets)
7) Key Metrics / Success Criteria (bullets)
8) Keywords (comma-separated)
`.trim();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You write clean, professional, ATS-friendly job descriptions.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 900,
    });

    const refinedDescription = toText(
      completion?.choices?.[0]?.message?.content
    ).trim();

    if (!refinedDescription) {
      return NextResponse.json(
        { error: "Groq did not return output" },
        { status: 500 }
      );
    }

    await connectDB();

    const saved = await JobResult.create({
      jobTitle: toText(jobTitle),
      companyName: companyLine, // ✅ OPTIONAL: store it too
      escoOccupationUri: toText(escoOccupationUri),
      escoOccupationLabel: toText(escoOccupationLabel),
      escoDescription: toText(escoDescription),

      escoSkills: Array.isArray(escoSkills) ? escoSkills.map(toText) : [],
      escoTasks: Array.isArray(escoTasks) ? escoTasks.map(toText) : [],

      refinedDescription: toText(refinedDescription),
    });

    return NextResponse.json({
      refinedDescription: toText(refinedDescription), // ✅ guaranteed string
      savedId: saved._id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
