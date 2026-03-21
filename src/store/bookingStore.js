import { create } from "zustand";

const useBookingStore = create((set) => ({
  bookings: (() => {
    try { return JSON.parse(localStorage.getItem("sbp_bookings")) || []; }
    catch { return []; }
  })(),

  addBooking: (booking) =>
    set((state) => {
      const updated = [...state.bookings, booking];
      localStorage.setItem("sbp_bookings", JSON.stringify(updated));
      return { bookings: updated };
    }),

  cancelBooking: (id) =>
    set((state) => {
      const updated = state.bookings.filter((b) => b.id !== id);
      localStorage.setItem("sbp_bookings", JSON.stringify(updated));
      return { bookings: updated };
    }),
}));

export default useBookingStore;
