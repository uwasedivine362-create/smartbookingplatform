import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../../Context/Appcontext";
import { normalize, getPlaceId } from "../../utils/helpers";
import api from "../../store/services/api";
import ListingCard from "../ListingCard";
import Loader from "../Loader";
import ErrorState from "../Errorstate";

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

      {/* Sidebar Filter Panel */}
      <aside style={{ width: 200, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "1rem", flexShrink: 0 }}>
        <h3 style={{ margin: "0 0 1rem", fontSize: "1rem" }}>Filters</h3>
        <label style={{ display: "block", marginBottom: "0.75rem", fontSize: "0.88rem" }}>
          Min Price ($)
          <input type="number" value={filters.minPrice} onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
            placeholder="0" style={{ display: "block", width: "100%", padding: "0.4rem", marginTop: 4, border: "1px solid #ddd", borderRadius: 4 }} />
        </label>
        <label style={{ display: "block", marginBottom: "0.75rem", fontSize: "0.88rem" }}>
          Max Price ($)
          <input type="number" value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
            placeholder="9999" style={{ display: "block", width: "100%", padding: "0.4rem", marginTop: 4, border: "1px solid #ddd", borderRadius: 4 }} />
        </label>
        <label style={{ display: "block", marginBottom: "1rem", fontSize: "0.88rem" }}>
          Min Rating ⭐
          <input type="number" min="0" max="5" step="0.1" value={filters.rating} onChange={(e) => setFilters((f) => ({ ...f, rating: e.target.value }))}
            placeholder="0" style={{ display: "block", width: "100%", padding: "0.4rem", marginTop: 4, border: "1px solid #ddd", borderRadius: 4 }} />
        </label>
        <button onClick={() => setFilters({ minPrice: "", maxPrice: "", rating: "" })}
          style={{ width: "100%", padding: "0.45rem", border: "1px solid #ddd", borderRadius: 4, cursor: "pointer", background: "#f7f7f7" }}>
          Clear Filters
        </button>
      </aside>

      {/* Listings Grid */}
      <div style={{ flex: 1 }}>
        <p style={{ color: "#888", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {filtered.length} propert{filtered.length === 1 ? "y" : "ies"} found
          {searchQuery ? ` in "${searchQuery}"` : ""}
        </p>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
            <p style={{ fontSize: "1.1rem" }}>No listings found.</p>
            <p>Try: sydney, london, paris, dubai, tokyo, rome, barcelona, bali</p>
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
