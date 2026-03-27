import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { normalize } from "../utils/helpers";

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
];

export default function ListingCard({ listing }) {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const navigate = useNavigate();
  const item = normalize(listing);
  const [imageFailed, setImageFailed] = useState(false);
  const gradient = FALLBACK_GRADIENTS[Math.floor(Math.random() * FALLBACK_GRADIENTS.length)];

  if (!item.id) return null;

  return (
    <div style={{
      width: "100%",
      maxWidth: 280,
      background: "#fff",
      border: "1px solid #e8e8e8",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      transition: "transform 0.15s, box-shadow 0.15s",
      cursor: "pointer",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";
      }}
    >
      <div style={{ 
        position: "relative",
        height: 185,
        background: imageFailed ? gradient : "#f0f0f0",
        overflow: "hidden"
      }}>
        {!imageFailed && (
          <img src={item.image} alt={item.name}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              display: "block" 
            }}
            onError={() => setImageFailed(true)}
          />
        )}
        {imageFailed && (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.8)",
            fontSize: "3rem"
          }}>
            🏠
          </div>
        )}
        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(listing); }}
          style={{ 
            position: "absolute", 
            top: 10, 
            right: 10, 
            background: "rgba(255,255,255,0.9)", 
            border: "none", 
            borderRadius: "50%", 
            width: 34, 
            height: 34, 
            fontSize: "1rem", 
            cursor: "pointer",
            transition: "transform 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {isFavorite(listing) ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "0.85rem" }}>
        <h3 style={{ 
          fontSize: "0.95rem", 
          margin: "0 0 0.3rem", 
          overflow: "hidden", 
          textOverflow: "ellipsis", 
          whiteSpace: "nowrap" 
        }}>
          {item.name}
        </h3>
        {item.city && (
          <p style={{ color: "#888", fontSize: "0.82rem", margin: "0 0 0.3rem" }}>
            📍 {item.city}
          </p>
        )}
        {item.rating && (
          <p style={{ margin: "0 0 0.3rem", fontSize: "0.88rem" }}>
            ⭐ {item.rating}
          </p>
        )}
        {item.price && (
          <p style={{ 
            fontWeight: "bold", 
            color: "#FF5A5F", 
            margin: "0 0 0.7rem", 
            fontSize: "0.95rem" 
          }}>
            ${item.price} / night
          </p>
        )}
        <button onClick={() => navigate(`/listing/${item.id}`)}
          style={{ 
            width: "100%", 
            padding: "0.5rem", 
            background: "#FF5A5F", 
            color: "#fff", 
            border: "none", 
            borderRadius: 5, 
            cursor: "pointer", 
            fontWeight: 600, 
            fontSize: "0.9rem",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#e84840"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#FF5A5F"; }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
