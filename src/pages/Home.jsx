import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../context/AppContext";
import { normalize, getPlaceId } from "../utils/helpers";
import api from "../services/api";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const fetchListings = (query) =>
  api.get("/searchPropertyByPlaceId", { params: { placeId: getPlaceId(query) } }).then((r) => r.data);

export default function Home() {
  const { searchQuery, filters, setFilters } = useContext(AppContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", searchQuery],
    queryFn: () => fetchListings(searchQuery),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error.message} />;

  const listings = data?.data || data?.results || [];

  const filtered = listings.filter((item) => {
    const { price, rating } = normalize(item);
    const p = parseFloat(price) || 0;
    const r = parseFloat(rating) || 0;
    if (filters.minPrice && p < Number(filters.minPrice)) return false;
    if (filters.maxPrice && p > Number(filters.maxPrice)) return false;
    if (filters.rating && r < Number(filters.rating)) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>

      {/* Filter Sidebar */}
      <aside style={{ width: 210, flexShrink: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 10, padding: "1.2rem" }}>
        <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", color: "#333" }}>🔍 Filters</h3>

        <label style={{ display: "block", marginBottom: "0.85rem", fontSize: "0.88rem", color: "#555" }}>
          Min Price ($)
          <input type="number" value={filters.minPrice} onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
            placeholder="0"
            style={{ display: "block", width: "100%", padding: "0.45rem", marginTop: 4, border: "1px solid #ddd", borderRadius: 5, fontSize: "0.88rem" }} />
        </label>

        <label style={{ display: "block", marginBottom: "0.85rem", fontSize: "0.88rem", color: "#555" }}>
          Max Price ($)
          <input type="number" value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
            placeholder="9999"
            style={{ display: "block", width: "100%", padding: "0.45rem", marginTop: 4, border: "1px solid #ddd", borderRadius: 5, fontSize: "0.88rem" }} />
        </label>

        <label style={{ display: "block", marginBottom: "1rem", fontSize: "0.88rem", color: "#555" }}>
          Min Rating ⭐
          <input type="number" min="0" max="5" step="0.5" value={filters.rating} onChange={(e) => setFilters((f) => ({ ...f, rating: e.target.value }))}
            placeholder="0"
            style={{ display: "block", width: "100%", padding: "0.45rem", marginTop: 4, border: "1px solid #ddd", borderRadius: 5, fontSize: "0.88rem" }} />
        </label>

        <button onClick={() => setFilters({ minPrice: "", maxPrice: "", rating: "" })}
          style={{ width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: 5, cursor: "pointer", background: "#f7f7f7", fontSize: "0.88rem" }}>
          Clear Filters
        </button>
      </aside>

      {/* Listings */}
      <div style={{ flex: 1 }}>
        <p style={{ color: "#888", marginBottom: "1rem", fontSize: "0.9rem" }}>
          <strong>{filtered.length}</strong> propert{filtered.length === 1 ? "y" : "ies"} found
          {searchQuery ? ` for "${searchQuery}"` : " in Sydney"}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#aaa" }}>
            <p style={{ fontSize: "1.1rem" }}>No listings match your filters.</p>
            <p style={{ fontSize: "0.9rem" }}>Try: sydney, london, paris, dubai, tokyo, rome, barcelona, bali</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
            {filtered.map((item) => {
              const { id } = normalize(item);
              return <ListingCard key={id} listing={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
