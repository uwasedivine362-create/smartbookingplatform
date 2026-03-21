import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: [],

      addBooking: (booking) =>
        set((state) => ({
          bookings: [
            ...state.bookings,
            { ...booking, id: Date.now(), createdAt: new Date().toISOString() },
          ],
        })),

      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      hasBooking: (listingId) =>
        get().bookings.some((b) => b.listingId === String(listingId)),
    }),
    { name: "sbp_bookings" }
  )
);

export default useBookingStore;
