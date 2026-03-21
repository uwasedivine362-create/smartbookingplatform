# SmartBooking Platform

A production-grade accommodation booking platform built with React + Vite, inspired by Airbnb.

## Project Structure

```
smartbookingplatform/
├── src/
│   ├── components/
│   │   ├── Pages/
│   │   │   ├── Home.jsx          # Listings feed with filters
│   │   │   ├── ListingDetails.jsx # Single property view + booking
│   │   │   ├── Bookings.jsx      # User bookings dashboard
│   │   │   ├── Favorites.jsx     # Saved listings
│   │   │   └── Login.jsx         # Authentication
│   │   ├── Navbar.jsx            # Top navigation + search
│   │   ├── ListingCard.jsx       # Property card component
│   │   ├── BookingForm.jsx       # Booking form with validation
│   │   ├── UserProfileCard.jsx   # Auth status display
│   │   ├── Loader.jsx            # Loading spinner
│   │   └── Errorstate.jsx        # Error display
│   ├── Context/
│   │   └── Appcontext.jsx        # Global state (favorites, filters, auth)
│   ├── store/
│   │   ├── Usebookingstore.jsx   # Zustand store for bookings
│   │   └── services/
│   │       ├── api.js            # Axios instance with headers
│   │       ├── App.jsx           # Routes configuration
│   │       └── main.jsx          # App entry point
│   └── utils/
│       └── helpers.js            # normalize(), getPlaceId(), PLACE_IDS
├── .env                          # API key (never commit this)
├── index.html
├── vite.config.js
└── package.json
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root:
   ```
   VITE_RAPID_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Integration

- **Provider**: RapidAPI — Airbnb19 API
- **Base URL**: `https://airbnb19.p.rapidapi.com/api/v2`
- **Endpoint**: `/searchPropertyByPlaceId`
- **Axios instance**: configured in `src/store/services/api.js` with all required headers
- **TanStack Query**: all API calls use `useQuery` with `staleTime: 5min` and `gcTime: 10min` for caching

## State Management

| Type | Tool | Manages |
|------|------|---------|
| Local | useState | Forms, UI interactions |
| Global | Context API | Favorites, filters, auth, search |
| Advanced | Zustand | Bookings (with localStorage persistence) |
| Server | TanStack Query | API listings, caching |

## Supported Search Cities

sydney, london, paris, newyork, dubai, tokyo, rome, barcelona, bali
