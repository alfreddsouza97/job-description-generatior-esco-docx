import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobResult } from "@/lib/models/JobResult";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, refinedDescription } = body;

    if (!id || !refinedDescription) {
      return NextResponse.json(
        { error: "Missing id or refinedDescription" },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await JobResult.findByIdAndUpdate(
      id,
      { refinedDescription },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "JobResult not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
