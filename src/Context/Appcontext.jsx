import { createContext, useState, useEffect } from "react";
import { normalize } from "../utils/helpers";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sbp_user")) || null; }
    catch { return null; }
  });

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sbp_favorites")) || []; }
    catch { return []; }
  });

  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", rating: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("sbp_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) localStorage.setItem("sbp_user", JSON.stringify(user));
    else localStorage.removeItem("sbp_user");
  }, [user]);

  const toggleFavorite = (item) => {
    const { id } = normalize(item);
    setFavorites((prev) =>
      prev.some((f) => normalize(f).id === id)
        ? prev.filter((f) => normalize(f).id !== id)
        : [...prev, item]
    );
  };

  const isFavorite = (item) => {
    const { id } = normalize(item);
    return favorites.some((f) => normalize(f).id === id);
  };

  return (
    <AppContext.Provider value={{
      user,
      login: (u) => setUser(u),
      logout: () => setUser(null),
      favorites,
      toggleFavorite,
      isFavorite,
      filters,
      setFilters,
      searchQuery,
      setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
};
