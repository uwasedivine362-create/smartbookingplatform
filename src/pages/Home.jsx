import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { AppContext } from "../Context/AppContext";
import { normalize, getPlaceId } from "../utils/helpers";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState.jsx";

const MOCK_LISTINGS = [
  { id: "1", name: "Luxury Beachfront Apartment", city: "Sydney", price: "250", star_rating: "4.9", picture: { thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" }, description: "Beautiful ocean view apartment" },
  { id: "2", name: "Cozy City Center Studio", city: "Sydney", price: "120", star_rating: "4.7", picture: { thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" }, description: "Perfect for city explorers" },
  { id: "3", name: "Modern Penthouse Suite", city: "Sydney", price: "450", star_rating: "4.95", picture: { thumbnail: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop" }, description: "5-star luxury experience" },
  { id: "4", name: "Seaside Cottage with Garden", city: "Sydney", price: "180", star_rating: "4.8", picture: { thumbnail: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&h=300&fit=crop" }, description: "Charming family getaway" },
  { id: "5", name: "Historic Victorian Home", city: "Sydney", price: "200", star_rating: "4.6", picture: { thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop" }, description: "Classic elegance and charm" },
  { id: "6", name: "Tropical Pool Villa", city: "Sydney", price: "380", star_rating: "4.92", picture: { thumbnail: "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=400&h=300&fit=crop" }, description: "Resort-style living" },
  { id: "7", name: "Waterfront Loft Apartment", city: "Sydney", price: "320", star_rating: "4.85", picture: { thumbnail: "https://images.unsplash.com/photo-1493857671505-72967e0e0760?w=400&h=300&fit=crop" }, description: "Industrial chic with views" },
  { id: "8", name: "Garden House with Pool", city: "Sydney", price: "290", star_rating: "4.75", picture: { thumbnail: "https://images.unsplash.com/photo-1570129477492-45ea003588af?w=400&h=300&fit=crop" }, description: "Perfect for groups" },
  { id: "9", name: "Mountain View Retreat", city: "Sydney", price: "220", star_rating: "4.8", picture: { thumbnail: "https://images.unsplash.com/photo-1519167758993-a3a9b8a47ed5?w=400&h=300&fit=crop" }, description: "Peaceful nature escape" },
  { id: "10", name: "High-Rise Modern Condo", city: "Sydney", price: "350", star_rating: "4.9", picture: { thumbnail: "https://images.unsplash.com/photo-1512917774080-9a485d2a39f6?w=400&h=300&fit=crop" }, description: "Skyline city views" },
  { id: "11", name: "Charming Townhouse", city: "Sydney", price: "150", star_rating: "4.7", picture: { thumbnail: "https://images.unsplash.com/photo-1570129477492-45ea003588af?w=400&h=300&fit=crop" }, description: "Homey and comfortable" },
  { id: "12", name: "Designer Studio Flat", city: "Sydney", price: "140", star_rating: "4.6", picture: { thumbnail: "https://images.unsplash.com/photo-1576611168991-c4e4b60b9596?w=400&h=300&fit=crop" }, description: "Stylish and budget-friendly" },
  { id: "13", name: "Spacious Family Villa", city: "Sydney", price: "400", star_rating: "4.88", picture: { thumbnail: "https://images.unsplash.com/photo-1493809842364-78817281560d?w=400&h=300&fit=crop" }, description: "Room for everyone" },
  { id: "14", name: "Beachside Bungalow", city: "Sydney", price: "190", star_rating: "4.78", picture: { thumbnail: "https://images.unsplash.com/photo-1502773860571-211be0dbd5f7?w=400&h=300&fit=crop" }, description: "Steps to the beach" },
  { id: "15", name: "Contemporary Glass House", city: "Sydney", price: "420", star_rating: "4.91", picture: { thumbnail: "https://images.unsplash.com/photo-1502891876148-ce4e6958c8cd?w=400&h=300&fit=crop" }, description: "Architectural masterpiece" },
  { id: "16", name: "Rustic Farmhouse", city: "Sydney", price: "170", star_rating: "4.72", picture: { thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop" }, description: "Countryside tranquility" },
  { id: "17", name: "Minimalist Apartment", city: "Sydney", price: "160", star_rating: "4.65", picture: { thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" }, description: "Clean and simple living" },
  { id: "18", name: "Bohemian Studio", city: "Sydney", price: "130", star_rating: "4.74", picture: { thumbnail: "https://images.unsplash.com/photo-1602088113236-57bde9271121?w=400&h=300&fit=crop" }, description: "Artistic and unique space" },
  { id: "19", name: "Executive Penthouse", city: "Sydney", price: "500", star_rating: "4.97", picture: { thumbnail: "https://images.unsplash.com/photo-1512900735817-0e57a39da61c?w=400&h=300&fit=crop" }, description: "Ultimate luxury living" },
  { id: "20", name: "Eco-Friendly Cottage", city: "Sydney", price: "135", star_rating: "4.81", picture: { thumbnail: "https://images.unsplash.com/photo-1542228535-ce9eafb46b1b?w=400&h=300&fit=crop" }, description: "Sustainable living space" },
];

const fetchListings = async (placeId) => {
  try {
    const response = await api.get("/searchPropertyByPlaceId", { params: { placeId } });
    const responseData = response.data;
    
    console.log("📡 Raw API Response:", responseData);
    
    // Check if API returned an error
    if (responseData.status === false || responseData.message === "Error") {
      console.warn("⚠️ API returned error, using mock data as fallback");
      return { data: MOCK_LISTINGS };
    }
    
    // Check for actual error vs success
    if (!responseData.data && !responseData.results && !responseData.listings && !Array.isArray(responseData)) {
      console.warn("⚠️ Unexpected API response format, using mock data");
      return { data: MOCK_LISTINGS };
    }
    
    return responseData;
  } catch (error) {
    console.error("❌ API Error:", error.message);
    console.warn("⚠️ Using mock data as fallback due to API error");
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
  
  // Debug: Check if we found listings
  if (Array.isArray(listings) && listings.length > 0) {
    console.log(`✅ Found ${listings.length} listings`);
    console.log("📝 Sample listing:", listings[0]);
  } else {
    console.log("🔍 Debugging - No listings extracted");
    console.log("🔍 API Response:", data);
    console.log("🔍 Response Type:", typeof data);
    console.log("🔍 Response Keys:", data ? Object.keys(data) : "null");
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