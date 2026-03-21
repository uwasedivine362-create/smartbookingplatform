import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Bookings from "./pages/Bookings";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

function ProtectedRoute({ children }) {
  const { user } = useContext(AppContext);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", fontFamily: "Arial, sans-serif" }}>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
