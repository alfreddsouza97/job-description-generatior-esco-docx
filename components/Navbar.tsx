import Link from "next/link";

export default function Navbar() {
  return (
    <div
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/" style={{ fontWeight: 700, fontSize: 18 }}>
        ESCO JobDesc AI
      </Link>

      <div style={{ display: "flex", gap: 14 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          Generator
        </Link>
        <Link href="/history" style={{ textDecoration: "none" }}>
          History
        </Link>
      </div>
    </div>
  );
}
