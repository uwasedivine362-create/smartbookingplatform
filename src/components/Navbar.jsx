import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import UserProfileCard from "./UserProfileCard";

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(AppContext);
  const [input, setInput] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input.trim());
    navigate("/");
  };

  return (
    <nav style={{
      background: "#fff", borderBottom: "1px solid #e0e0e0",
      padding: "0.75rem 1rem", position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "#FF5A5F", fontWeight: "bold", fontSize: "1.3rem", flexShrink: 0 }}>
          🏠 SmartBooking
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ display: "flex", flex: 1, minWidth: 200, maxWidth: 420 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search city (e.g. london, paris, tokyo...)"
            style={{ flex: 1, padding: "0.5rem 0.8rem", border: "1px solid #ddd", borderRadius: "5px 0 0 5px", fontSize: "0.9rem", outline: "none" }}
          />
          <button type="submit"
            style={{ padding: "0.5rem 1rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: "0 5px 5px 0", cursor: "pointer", fontWeight: 600 }}>
            🔍
          </button>
        </form>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginLeft: "auto" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#555", fontSize: "0.9rem", fontWeight: 500 }}>Home</Link>
          <Link to="/favorites" style={{ textDecoration: "none", color: "#555", fontSize: "0.9rem", fontWeight: 500 }}>❤️ Favorites</Link>
          <Link to="/bookings" style={{ textDecoration: "none", color: "#555", fontSize: "0.9rem", fontWeight: 500 }}>📋 Bookings</Link>
          <UserProfileCard />
        </div>
      </div>
    </nav>
  );
}
