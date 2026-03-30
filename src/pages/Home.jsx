import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { AppContext } from "../Context/AppContext";
import { normalize, getPlaceId } from "../utils/helpers";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const MOCK_LISTINGS = [
  { id: "1", name: "Luxury Beachfront Apartment", city: "Sydney", price: "250", star_rating: "4.9", picture: { thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" }, description: "Beautiful ocean view apartment" },
  { id: "2", name: "Cozy City Center Studio", city: "Sydney", price: "120", star_rating: "4.7", picture: { thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" }, description: "Perfect for city explorers" },
  { id: "3", name: "Modern Penthouse Suite", city: "Sydney", price: "450", star_rating: "4.95", picture: { thumbnail: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop" }, description: "5-star luxury experience" },
];

const fetchListings = async (placeId) => {
  try {
    const response = await api.get("/searchPropertyByPlaceId", { params: { placeId } });
    const responseData = response.data;
    
    // Check if API returned an error
    if (responseData.status === false || responseData.message === "Error") {
      return { data: MOCK_LISTINGS };
    }
    
    // Check for actual error vs success
    if (!responseData.data && !responseData.results && !responseData.listings && !Array.isArray(responseData)) {
      return { data: MOCK_LISTINGS };
    }
    
    return responseData;
  } catch (error) {
    return { data: MOCK_LISTINGS };
  }
};

// Debounce hook to prevent rapid API calls
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default function Home() {
  const { searchQuery, setSearchQuery, filters, setFilters } = useContext(AppContext);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 800); // Wait 800ms before searching
  const placeId = getPlaceId(debouncedSearch);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["listings", { placeId }],
    queryFn: () => fetchListings(placeId),
    staleTime: 1000 * 60 * 10, // 10 minutes (increased from 5)
    gcTime: 1000 * 60 * 30, // 30 minutes (increased from 10)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch.trim() || "");
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  let listings = data?.data || data?.results || data?.listings || data?.homes || [];
  
  // Handle nested responses
  if (!Array.isArray(listings) && listings && typeof listings === 'object') {
    if (Array.isArray(listings.data)) listings = listings.data;
    else if (Array.isArray(listings.results)) listings = listings.results;
    else if (Array.isArray(listings.listings)) listings = listings.listings;
    else if (Array.isArray(listings.homes)) listings = listings.homes;
  }
  
  // If response is a direct array
  if (Array.isArray(data)) {
    listings = data;
  }
  
  
  // Ensure listings is an array
  if (!Array.isArray(listings)) {
    listings = [];
  }

  // Apply client-side filters
  listings = listings.filter((item) => {
    const normalized = normalize(item);
    const price = parseFloat(normalized.price) || 0;

    if (filters.minPrice && price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && price > parseFloat(filters.maxPrice)) return false;
    if (filters.rating && normalized.rating < parseFloat(filters.rating)) return false;

    return true;
  });

  return (
    <div>
      {/* Filter Panel */}
      <div style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 10,
        padding: "1.5rem",
        marginBottom: "2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "flex-end",
      }}>
        <div>
          <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.4rem", color: "#555" }}>
            Min Price
          </label>
          <input
            type="number"
            placeholder="e.g., 50"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            style={{
              padding: "0.6rem 0.8rem",
              border: "1px solid #ddd",
              borderRadius: 5,
              fontSize: "0.9rem",
              width: 120,
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.4rem", color: "#555" }}>
            Max Price
          </label>
          <input
            type="number"
            placeholder="e.g., 500"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            style={{
              padding: "0.6rem 0.8rem",
              border: "1px solid #ddd",
              borderRadius: 5,
              fontSize: "0.9rem",
              width: 120,
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.4rem", color: "#555" }}>
            Min Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
            style={{
              padding: "0.6rem 0.8rem",
              border: "1px solid #ddd",
              borderRadius: 5,
              fontSize: "0.9rem",
            }}
          >
            <option value="">All</option>
            <option value="4">⭐ 4.0+</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="4.8">⭐ 4.8+</option>
          </select>
        </div>

        <button
          onClick={() => setFilters({ minPrice: "", maxPrice: "", rating: "" })}
          style={{
            padding: "0.6rem 1.2rem",
            background: "#f0f0f0",
            border: "1px solid #ddd",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          Clear Filters
        </button>

        <button
          onClick={() => refetch()}
          style={{
            padding: "0.6rem 1.2rem",
            background: "#FF5A5F",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
            marginLeft: "auto",
          }}
        >
          Refresh
        </button>
      </div>

      {/* Results Section */}
      <div>
        <h2 style={{ marginBottom: "1.5rem" }}>
          Listings {searchQuery && `for "${searchQuery}"`} ({listings.length})
        </h2>

        {isLoading && <Loader />}
        {error && <ErrorState message={error.message} />}

        {!isLoading && !error && listings.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: 10 }}>
            <p style={{ fontSize: "1rem", color: "#888" }}>
              No listings found. Try adjusting your filters or search.
            </p>
          </div>
        )}

        {!isLoading && !error && listings.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {listings.map((item) => {
              const { id } = normalize(item);
              return <ListingCard key={id} listing={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}