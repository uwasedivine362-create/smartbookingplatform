export default function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <div style={{
        width: 48, height: 48, border: "5px solid #f0f0f0",
        borderTop: "5px solid #FF5A5F", borderRadius: "50%",
        animation: "spin 0.8s linear infinite", margin: "0 auto",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ marginTop: 14, color: "#999", fontSize: "0.95rem" }}>Loading listings...</p>
    </div>
  );
}
