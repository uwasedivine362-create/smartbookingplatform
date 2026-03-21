import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import UserProfileCard from "./UserProfileCard";

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
      padding: "0.8rem 1.5rem", background: "#fff",
      borderBottom: "1px solid #e0e0e0", position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#FF5A5F", textDecoration: "none", whiteSpace: "nowrap" }}>
        🏠 SmartBooking
      </Link>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.4rem", flex: 1, maxWidth: 440 }}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search: sydney, london, paris, dubai, tokyo..."
          style={{ flex: 1, padding: "0.5rem 0.8rem", border: "1px solid #ddd", borderRadius: 5, fontSize: "0.9rem", outline: "none" }}
        />
        <button type="submit"
          style={{ padding: "0.5rem 1rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600 }}>
          Search
        </button>
      </form>

      <div style={{ marginLeft: "auto", display: "flex", gap: "1.2rem", alignItems: "center" }}>
        <Link to="/favorites" style={{ textDecoration: "none", color: "#333", fontSize: "0.9rem" }}>❤️ Favorites</Link>
        <Link to="/bookings" style={{ textDecoration: "none", color: "#333", fontSize: "0.9rem" }}>📋 Bookings</Link>
        <UserProfileCard />
      </div>
    </nav>
  );
}
