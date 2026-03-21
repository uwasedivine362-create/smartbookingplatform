import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function UserProfileCard() {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <button onClick={() => navigate("/login")}
        style={{ padding: "0.4rem 1rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600 }}>
        Login
      </button>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <div style={{
        width: 34, height: 34, borderRadius: "50%", background: "#FF5A5F",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: "bold", fontSize: "0.95rem", flexShrink: 0,
      }}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{user.name}</span>
      <button onClick={logout}
        style={{ padding: "0.3rem 0.7rem", border: "1px solid #ddd", borderRadius: 4, cursor: "pointer", background: "#fff", fontSize: "0.82rem" }}>
        Logout
      </button>
    </div>
  );
}
