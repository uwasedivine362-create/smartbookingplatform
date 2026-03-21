import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { normalize } from "../utils/helpers";

export default function ListingCard({ listing }) {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const navigate = useNavigate();
  const item = normalize(listing);

  if (!item.id) return null;

  return (
    <div style={{
      width: 280, background: "#fff", border: "1px solid #e8e8e8",
      borderRadius: 10, overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      transition: "transform 0.15s, box-shadow 0.15s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)"; }}
    >
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name}
          style={{ width: "100%", height: 185, objectFit: "cover", display: "block" }}
          onError={(e) => { e.target.src = "https://placehold.co/280x185?text=No+Image"; }} />
        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(listing); }}
          style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 34, height: 34, fontSize: "1rem", cursor: "pointer" }}>
          {isFavorite(listing) ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "0.85rem" }}>
        <h3 style={{ fontSize: "0.95rem", margin: "0 0 0.3rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</h3>
        {item.city && <p style={{ color: "#888", fontSize: "0.82rem", margin: "0 0 0.3rem" }}>📍 {item.city}</p>}
        {item.rating && <p style={{ margin: "0 0 0.3rem", fontSize: "0.88rem" }}>⭐ {item.rating}</p>}
        {item.price && <p style={{ fontWeight: "bold", color: "#FF5A5F", margin: "0 0 0.7rem", fontSize: "0.95rem" }}>${item.price} / night</p>}
        <button onClick={() => navigate(`/listing/${item.id}`)}
          style={{ width: "100%", padding: "0.5rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
          View Details
        </button>
      </div>
    </div>
  );
}
