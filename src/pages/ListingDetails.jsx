import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../Context/AppContext";
import { normalize, getPlaceId } from "../utils/helpers";
import api from "../services/api";
import BookingForm from "../components/BookingForm";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const fetchListings = (placeId) =>
  api.get("/searchPropertyByPlaceId", { params: { placeId } }).then((r) => r.data);

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchQuery, toggleFavorite, isFavorite } = useContext(AppContext);
  const placeId = getPlaceId(searchQuery);

  // Use consistent query key for caching
  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", { placeId }],
    queryFn: () => fetchListings(placeId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error.message} />;

  const listings = data?.data || data?.results || [];
  const raw = listings.find((item) => normalize(item).id === String(id));

  if (!raw) return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <p style={{ fontSize: "1.1rem", color: "#888" }}>Listing not found.</p>
      <button onClick={() => navigate("/")}
        style={{ marginTop: "1rem", padding: "0.6rem 1.4rem", background: "#FF5A5F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}>
        ← Back to Home
      </button>
    </div>
  );

  const listing = normalize(raw);

  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>
      <button onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem", background: "none", border: "none", color: "#FF5A5F", fontSize: "1rem", cursor: "pointer", padding: 0 }}>
        ← Back
      </button>

      <div style={{ position: "relative" }}>
        <img src={listing.image} alt={listing.name}
          style={{ width: "100%", borderRadius: 10, maxHeight: 440, objectFit: "cover", display: "block" }}
          onError={(e) => { e.target.src = "https://placehold.co/780x440?text=No+Image"; }} />
        <button onClick={() => toggleFavorite(raw)}
          style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 42, height: 42, fontSize: "1.2rem", cursor: "pointer" }}>
          {isFavorite(raw) ? "❤️" : "🤍"}
        </button>
      </div>

      <div style={{ marginTop: "1.2rem" }}>
        <h2 style={{ margin: "0 0 0.4rem" }}>{listing.name}</h2>
        {listing.city && <p style={{ color: "#888", margin: "0 0 0.4rem" }}>📍 {listing.city}</p>}
        {listing.rating && <p style={{ margin: "0 0 0.4rem" }}>⭐ {listing.rating}</p>}
        {listing.price && <p style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#FF5A5F", margin: "0 0 0.8rem" }}>${listing.price} / night</p>}
        {listing.description && <p style={{ lineHeight: 1.7, color: "#555", margin: 0 }}>{listing.description}</p>}
      </div>

      <hr style={{ margin: "1.8rem 0", borderColor: "#eee" }} />
      <h3 style={{ marginBottom: "1rem" }}>Reserve this property</h3>
      <BookingForm listing={listing} />
    </div>
  );
}
