export default function ErrorState({ message }) {
  const isRateLimit = message?.includes("429") || message?.toLowerCase().includes("rate");
  const isNetwork = message?.toLowerCase().includes("network");
  const text = isRateLimit
    ? "API rate limit reached. Please wait a moment and try again."
    : isNetwork ? "Network error. Check your internet connection."
    : message || "Something went wrong. Please try again.";
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <p style={{ fontSize: "2.5rem", margin: 0 }}>⚠️</p>
      <p style={{ color: "#c0392b", marginTop: "0.5rem", maxWidth: 420, margin: "0.5rem auto 0" }}>{text}</p>
    </div>
  );
}
