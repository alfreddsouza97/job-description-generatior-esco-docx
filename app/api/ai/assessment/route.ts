import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobDescription, internshipOccupation } = body;

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Missing jobDescription" },
        { status: 400 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `
You are filling an internship competency assessment form.

Rating scale:
1 = very low
2 = low
3 = medium (Grade 8 expectation baseline)
4 = high
5 = very high

Task:
Suggest the MINIMUM required levels (1-5) for an internship based on the job description.

Return ONLY valid JSON using EXACT keys:
{
  "communication": 3,
  "criticism": 3,
  "teamwork": 3,
  "stamina": 3,
  "independence": 3,
  "orderliness": 3,
  "responsibility": 3,
  "accuracy": 3,
  "workspeed": 3,
  "manual": 3,
  "research": 3,
  "creative": 3,
  "supportive": 3,
  "leadership": 3,
  "admin": 3
}

Internship occupation (if provided):
${internshipOccupation || "(not provided)"}

Job Description:
${jobDescription}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 500,
    });

    const raw = completion?.choices?.[0]?.message?.content || "{}";

    let json: any = {};
    try {
      json = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw },
        { status: 500 }
      );
    }

    return NextResponse.json({ ratings: json });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "AI assessment failed" },
      { status: 500 }
    );
  }
}
