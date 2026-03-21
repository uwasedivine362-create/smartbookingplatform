import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../../Context/Appcontext";
import { normalize, getPlaceId } from "../../utils/helpers";
import api from "../../store/services/api";
import BookingForm from "../BookingForm";
import Loader from "../Loader";
import ErrorState from "../Errorstate";

const fetchListings = (query) =>
  api.get("/searchPropertyByPlaceId", { params: { placeId: getPlaceId(query) } }).then((r) => r.data);

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchQuery, toggleFavorite, isFavorite } = useContext(AppContext);

  // Reuses cached data — no new API call if already fetched
  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", searchQuery],
    queryFn: () => fetchListings(searchQuery),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error.message} />;

  const listings = data?.data || data?.results || [];
  const raw = listings.find((item) => normalize(item).id === String(id));

  if (!raw) return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <p style={{ fontSize: "1.1rem", color: "#888" }}>Listing not found.</p>
      <button onClick={() => navigate("/")}
        style={{ marginTop: "1rem", padding: "0.5rem 1.2rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}>
        ← Back to Home
      </button>
    </div>
  );

  const listing = normalize(raw);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <button onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem", background: "none", border: "none", color: "#FF5A5F", fontSize: "1rem", cursor: "pointer" }}>
        ← Back
      </button>

      <img
        src={listing.image}
        alt={listing.name}
        style={{ width: "100%", borderRadius: 10, maxHeight: 420, objectFit: "cover" }}
        onError={(e) => { e.target.src = "https://placehold.co/760x420?text=No+Image"; }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "1rem" }}>
        <div>
          <h2 style={{ margin: "0 0 0.3rem" }}>{listing.name}</h2>
          <p style={{ color: "#888", margin: "0 0 0.3rem" }}>📍 {listing.city}</p>
          <p style={{ margin: "0 0 0.3rem" }}>⭐ {listing.rating}</p>
          {listing.price && <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#FF5A5F", margin: 0 }}>${listing.price} / night</p>}
        </div>
        <button
          onClick={() => toggleFavorite(raw)}
          style={{ fontSize: "1.5rem", background: "none", border: "none", cursor: "pointer" }}
        >
          {isFavorite(raw) ? "❤️" : "🤍"}
        </button>
      </div>

      {listing.description && (
        <p style={{ lineHeight: 1.7, color: "#444", marginTop: "1rem" }}>{listing.description}</p>
      )}

      <hr style={{ margin: "1.5rem 0", borderColor: "#eee" }} />
      <h3 style={{ marginBottom: "1rem" }}>Reserve this property</h3>
      <BookingForm listing={listing} />
    </div>
  );
}
