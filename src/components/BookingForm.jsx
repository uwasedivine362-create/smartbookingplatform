import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import useBookingStore from "../store/bookingStore";

export default function BookingForm({ listing }) {
  const { user } = useContext(AppContext);
  const { addBooking, hasBooking } = useBookingStore();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  if (hasBooking(listing.id)) {
    return (
      <div style={{ padding: "1rem", background: "#f0fff4", border: "1px solid #b2dfdb", borderRadius: 8, color: "#2e7d32" }}>
        ✅ You already have a booking for this property.{" "}
        <button onClick={() => navigate("/bookings")}
          style={{ background: "none", border: "none", color: "#FF5A5F", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}>
          View Bookings
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ padding: "1rem", background: "#f0fff4", border: "1px solid #b2dfdb", borderRadius: 8, color: "#2e7d32" }}>
        🎉 Booking confirmed! <button onClick={() => navigate("/bookings")}
          style={{ background: "none", border: "none", color: "#FF5A5F", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}>
          View Bookings
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!user) { navigate("/login"); return; }
    if (checkOut <= checkIn) { setError("Check-out must be after check-in."); return; }

    const nights = Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
    const total = listing.price ? (parseFloat(listing.price) * nights).toFixed(2) : null;

    addBooking({
      listingId: String(listing.id),
      listingName: listing.name,
      listingImage: listing.image,
      city: listing.city,
      price: listing.price,
      checkIn,
      checkOut,
      guests: Number(guests),
      nights,
      total,
      userName: user.name,
      userEmail: user.email,
    });

    setSubmitted(true);
  };

  const inputStyle = {
    display: "block", width: "100%", padding: "0.55rem 0.8rem",
    border: "1px solid #ddd", borderRadius: 5, fontSize: "0.92rem", marginTop: 4,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem", maxWidth: 420 }}>
      {error && <p style={{ color: "#c0392b", fontSize: "0.88rem", margin: 0 }}>⚠️ {error}</p>}

      <label style={{ fontSize: "0.88rem", color: "#555" }}>
        Check-in
        <input type="date" value={checkIn} min={today} required onChange={(e) => setCheckIn(e.target.value)} style={inputStyle} />
      </label>

      <label style={{ fontSize: "0.88rem", color: "#555" }}>
        Check-out
        <input type="date" value={checkOut} min={checkIn || today} required onChange={(e) => setCheckOut(e.target.value)} style={inputStyle} />
      </label>

      <label style={{ fontSize: "0.88rem", color: "#555" }}>
        Guests
        <input type="number" value={guests} min={1} max={16} required onChange={(e) => setGuests(e.target.value)} style={inputStyle} />
      </label>

      {checkIn && checkOut && checkOut > checkIn && listing.price && (
        <p style={{ fontSize: "0.9rem", color: "#555", margin: 0 }}>
          💰 Total:{" "}
          <strong style={{ color: "#FF5A5F" }}>
            ${(parseFloat(listing.price) * Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)).toFixed(2)}
          </strong>
          {" "}({Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)} nights)
        </p>
      )}

      <button type="submit"
        style={{ padding: "0.7rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>
        {user ? "Confirm Booking" : "Login to Book"}
      </button>
    </form>
  );
}
