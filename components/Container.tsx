export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
      {children}
    </div>
  );
}
