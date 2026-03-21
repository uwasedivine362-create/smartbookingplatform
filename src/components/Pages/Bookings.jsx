import useBookingStore from "../../store/Usebookingstore";

export default function Bookings() {
  const bookings = useBookingStore((s) => s.bookings);
  const cancelBooking = useBookingStore((s) => s.cancelBooking);

  if (bookings.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
        <p style={{ fontSize: "1.1rem" }}>You have no bookings yet.</p>
        <p>Browse listings and book a property to see it here.</p>
      </div>
    );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>My Bookings ({bookings.length})</h2>
      {bookings.map((b) => (
        <div key={b.id} style={{
          display: "flex", gap: "1rem", background: "#fff",
          border: "1px solid #e0e0e0", borderRadius: 10,
          padding: "1rem", marginBottom: "1rem", alignItems: "center",
        }}>
          {b.image && (
            <img src={b.image} alt={b.name}
              style={{ width: 110, height: 75, objectFit: "cover", borderRadius: 6, flexShrink: 0 }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 0.25rem", fontSize: "1rem" }}>{b.name}</h3>
            {b.city && <p style={{ margin: "0 0 0.2rem", color: "#888", fontSize: "0.85rem" }}>📍 {b.city}</p>}
            <p style={{ margin: "0 0 0.2rem", color: "#555", fontSize: "0.9rem" }}>📅 {b.checkin} → {b.checkout}</p>
            <p style={{ margin: 0, color: "#555", fontSize: "0.9rem" }}>👥 {b.guests} guest{b.guests > 1 ? "s" : ""}</p>
            {b.price && <p style={{ margin: "0.2rem 0 0", fontWeight: "bold", color: "#FF5A5F", fontSize: "0.9rem" }}>${b.price} / night</p>}
          </div>
          <button
            onClick={() => cancelBooking(b.id)}
            style={{ padding: "0.45rem 0.9rem", background: "#fff", border: "1px solid #FF5A5F", color: "#FF5A5F", borderRadius: 5, cursor: "pointer", fontWeight: 500, flexShrink: 0 }}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
