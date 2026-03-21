import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import useBookingStore from "../store/bookingStore";

export default function BookingForm({ listing }) {
  const { user } = useContext(AppContext);
  const addBooking = useBookingStore((s) => s.addBooking);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!user) { navigate("/login"); return; }
    if (checkin < today) { setError("Check-in cannot be in the past."); return; }
    if (checkout <= checkin) { setError("Check-out must be after check-in."); return; }

    addBooking({ id: Date.now(), listingId: listing.id, name: listing.name, image: listing.image, city: listing.city, price: listing.price, checkin, checkout, guests });
    setSuccess(true);
    setTimeout(() => navigate("/bookings"), 1500);
  };

  if (success) return (
    <div style={{ padding: "1rem", background: "#e8f5e9", borderRadius: 8, color: "#2e7d32", fontWeight: 600 }}>
      ✅ Booking confirmed! Redirecting to your bookings...
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 360 }}>
      {error && <p style={{ color: "#c0392b", margin: 0, fontSize: "0.9rem", background: "#fdecea", padding: "0.5rem 0.75rem", borderRadius: 5 }}>⚠️ {error}</p>}
      {!user && <p style={{ color: "#888", fontSize: "0.88rem", margin: 0 }}>You need to <span style={{ color: "#FF5A5F", cursor: "pointer" }} onClick={() => navigate("/login")}>login</span> to book.</p>}

      <label style={{ fontWeight: 500, fontSize: "0.9rem" }}>Check-in
        <input type="date" value={checkin} min={today} onChange={(e) => setCheckin(e.target.value)} required
          style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: 5, border: "1px solid #ddd", borderRadius: 5, fontSize: "0.9rem" }} />
      </label>
      <label style={{ fontWeight: 500, fontSize: "0.9rem" }}>Check-out
        <input type="date" value={checkout} min={checkin || today} onChange={(e) => setCheckout(e.target.value)} required
          style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: 5, border: "1px solid #ddd", borderRadius: 5, fontSize: "0.9rem" }} />
      </label>
      <label style={{ fontWeight: 500, fontSize: "0.9rem" }}>Guests
        <input type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(Number(e.target.value))} required
          style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: 5, border: "1px solid #ddd", borderRadius: 5, fontSize: "0.9rem" }} />
      </label>
      <button type="submit"
        style={{ padding: "0.7rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>
        {user ? "Confirm Booking" : "Login to Book"}
      </button>
    </form>
  );
}
