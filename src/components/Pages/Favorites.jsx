import { useContext } from "react";
import { AppContext } from "../../Context/Appcontext";
import { normalize } from "../../utils/helpers";
import ListingCard from "../ListingCard";

export default function Favorites() {
  const { favorites } = useContext(AppContext);

  if (favorites.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
        <p style={{ fontSize: "1.1rem" }}>No favorites saved yet.</p>
        <p>Click 🤍 on any listing to save it here.</p>
      </div>
    );

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>My Favorites ({favorites.length})</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
        {favorites.map((item) => {
          const { id } = normalize(item);
          return <ListingCard key={id} listing={item} />;
        })}
      </div>
    </div>
  );
}
