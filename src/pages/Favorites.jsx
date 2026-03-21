import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { normalize } from "../utils/helpers";
import ListingCard from "../components/ListingCard";

export default function Favorites() {
  const { favorites } = useContext(AppContext);

  if (favorites.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#aaa" }}>
        <p style={{ fontSize: "1.2rem" }}>❤️ No favorites yet.</p>
        <p style={{ fontSize: "0.9rem" }}>Click 🤍 on any listing to save it here.</p>
      </div>
    );

  return (
    <div>
      <h2 style={{ marginBottom: "1.2rem" }}>My Favorites ({favorites.length})</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
        {favorites.map((item) => {
          const { id } = normalize(item);
          return <ListingCard key={id} listing={item} />;
        })}
      </div>
    </div>
  );
}
