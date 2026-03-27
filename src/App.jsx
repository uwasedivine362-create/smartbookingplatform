import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Bookings from "./pages/Bookings";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

export default function App() {
  return (
    <ErrorBoundary>
      <div style={{ minHeight: "100vh", background: "#f7f7f7" }}>
        <Navbar />
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 1rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}
