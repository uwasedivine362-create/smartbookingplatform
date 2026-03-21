import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import useBookingStore from "../store/bookingStore";

export default function Bookings() {
  const { user } = useContext(AppContext);
  const { bookings, cancelBooking } = useBookingStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p style={{ fontSize: "1.1rem", color: "#888", marginBottom: "1rem" }}>Please login to view your bookings.</p>
        <button onClick={() => navigate("/login")}
          style={{ padding: "0.6rem 1.4rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600 }}>
          Login
        </button>
      </div>
    );
  }

  const userBookings = bookings.filter((b) => b.userEmail === user.email);

  if (userBookings.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📋</p>
        <p style={{ color: "#888", fontSize: "1rem" }}>No bookings yet. Start exploring!</p>
        <button onClick={() => navigate("/")}
          style={{ marginTop: "1rem", padding: "0.6rem 1.4rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600 }}>
          Browse Listings
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem" }}>My Bookings ({userBookings.length})</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {userBookings.map((b) => (
          <div key={b.id} style={{
            background: "#fff", border: "1px solid #e0e0e0", borderRadius: 10,
            padding: "1rem", display: "flex", gap: "1rem", alignItems: "flex-start",
          }}>
            <img src={b.listingImage} alt={b.listingName}
              style={{ width: 110, height: 80, objectFit: "cover", borderRadius: 7, flexShrink: 0 }}
              onError={(e) => { e.target.src = "https://placehold.co/110x80?text=No+Image"; }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 0.3rem", fontSize: "1rem" }}>{b.listingName}</h3>
              {b.city && <p style={{ color: "#888", fontSize: "0.85rem", margin: "0 0 0.3rem" }}>📍 {b.city}</p>}
              <p style={{ fontSize: "0.88rem", margin: "0 0 0.2rem" }}>
                📅 {b.checkIn} → {b.checkOut} &nbsp;·&nbsp; {b.nights} night{b.nights !== 1 ? "s" : ""} &nbsp;·&nbsp; {b.guests} guest{b.guests !== 1 ? "s" : ""}
              </p>
              {b.total && <p style={{ fontWeight: "bold", color: "#FF5A5F", margin: "0.2rem 0 0", fontSize: "0.95rem" }}>Total: ${b.total}</p>}
            </div>
            <button onClick={() => cancelBooking(b.id)}
              style={{ padding: "0.4rem 0.9rem", border: "1px solid #e74c3c", color: "#e74c3c", background: "#fff", borderRadius: 5, cursor: "pointer", fontSize: "0.85rem", flexShrink: 0 }}>
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
