import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Login() {
  const { login, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (user) { navigate("/"); return null; }

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email });
    navigate("/bookings");
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", background: "#fff", padding: "2rem", borderRadius: 10, border: "1px solid #e0e0e0", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "0.4rem" }}>Welcome Back 👋</h2>
      <p style={{ textAlign: "center", color: "#888", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Login to manage your bookings</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required
          style={{ padding: "0.6rem 0.8rem", border: "1px solid #ddd", borderRadius: 5, fontSize: "0.95rem" }} />
        <input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          style={{ padding: "0.6rem 0.8rem", border: "1px solid #ddd", borderRadius: 5, fontSize: "0.95rem" }} />
        <button type="submit"
          style={{ padding: "0.7rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>
          Login
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.2rem", fontSize: "0.88rem", color: "#888" }}>
        Just browsing? <Link to="/" style={{ color: "#FF5A5F" }}>Go to listings</Link>
      </p>
    </div>
  );
}
