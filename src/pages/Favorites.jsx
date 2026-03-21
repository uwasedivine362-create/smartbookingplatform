import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import ListingCard from "../components/ListingCard";
import { normalize } from "../utils/helpers";

export default function Favorites() {
  const { favorites } = useContext(AppContext);
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>❤️</p>
        <p style={{ color: "#888", fontSize: "1rem" }}>No favorites yet. Heart a listing to save it!</p>
        <button onClick={() => navigate("/")}
          style={{ marginTop: "1rem", padding: "0.6rem 1.4rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontWeight: 600 }}>
          Browse Listings
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem" }}>My Favorites ({favorites.length})</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
        {favorites.map((item) => {
          const { id } = normalize(item);
          return <ListingCard key={id} listing={item} />;
        })}
      </div>
    </div>
  );
}
