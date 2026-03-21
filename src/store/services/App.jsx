import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/Appcontext";
import Navbar from "../../components/Navbar";
import Home from "../../components/Pages/Home";
import ListingDetails from "../../components/Pages/ListingDetails";
import Bookings from "../../components/Pages/Bookings";
import Favorites from "../../components/Pages/Favorites";
import Login from "../../components/Pages/Login";

function ProtectedRoute({ children }) {
  const { user } = useContext(AppContext);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", fontFamily: "sans-serif" }}>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "1rem" }}>
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
