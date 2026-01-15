import { connectDB } from "@/lib/db";
import { JobResult } from "@/lib/models/JobResult";

export default async function HistoryPage() {
  await connectDB();

  const results = await JobResult.find().sort({ createdAt: -1 }).limit(20);

  return (
    <div>
      <h1 style={{ fontSize: 26, marginBottom: 8 }}>History</h1>
      <p style={{ color: "#444" }}>
        Latest saved refined job descriptions (MongoDB).
      </p>

      <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
        {results.map((r: any) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 16,
              background: "white",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 18 }}>{r.jobTitle}</div>

            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
              ESCO: {r.escoOccupationLabel}
            </div>

            <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
              Saved: {new Date(r.createdAt).toLocaleString()}
            </div>

            <pre
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 10,
                border: "1px solid #f1f1f1",
                background: "#fafafa",
                whiteSpace: "pre-wrap",
                lineHeight: 1.5,
                fontSize: 13,
              }}
            >
              {r.refinedDescription}
            </pre>
          </div>
        ))}

        {results.length === 0 && (
          <p style={{ color: "#777" }}>No saved results yet.</p>
        )}
      </div>
    </div>
  );
}
