🎯 Goal

Build a real booking app (like Airbnb) using React + Vite, with:

Real API data
Good state management
Fast performance
🔑 Main Things You Must Do
1. 🧠 State Management

You must use 3 types of state:

Local state → forms, inputs
Global state (Context API) → favorites, filters
Server state (TanStack Query) → API data
2. 🌐 API Integration (VERY IMPORTANT)

Use Airbnb API from RapidAPI:

Use Axios
Create this file:
src/services/api.ts
Add:
Base URL
Headers (API key)
Use .env file (NO hardcoding)
3. ⚡ TanStack Query (MANDATORY)

You MUST use:

useQuery → fetch listings
Caching (staleTime, cacheTime)
Avoid unnecessary API calls

👉 Example:

Open page again → data loads instantly (from cache)
4. 📄 Pages (Routing)

Your app must have:

/ → Home (listings)
/listing/:id → Details page
/bookings → bookings (protected)
/favorites → saved items
/login → login page
5. 🧩 Components

You must create:

Navbar (search + user)
Filter panel (price, rating)
ListingCard
BookingForm
Loader
ErrorState
6. 🔍 Features

Your app must:

Search listings
Filter by price/rating
Show listing details
Save favorites
Book & cancel bookings
7. ⚠️ Error Handling

Your app must:

Handle API errors
Show friendly messages
Avoid crashes
8. ⚡ Performance
Use caching (React Query)
Avoid refetching unnecessarily
Smooth UI (no flickering)
9. 💾 Persistence
Favorites must save (localStorage)
Data should stay when navigating
10. 🚀 Deployment
Deploy using Vercel or Netlify
Use .env for API key
Share live link🎯 Goal

Build a real booking app (like Airbnb) using React + Vite, with:

Real API data
Good state management
Fast performance
🔑 Main Things You Must Do
1. 🧠 State Management

You must use 3 types of state:

Local state → forms, inputs
Global state (Context API) → favorites, filters
Server state (TanStack Query) → API data
2. 🌐 API Integration (VERY IMPORTANT)

Use Airbnb API from RapidAPI:

Use Axios
Create this file:
src/services/api.ts
Add:
Base URL
Headers (API key)
Use .env file (NO hardcoding)
3. ⚡ TanStack Query (MANDATORY)

You MUST use:

useQuery → fetch listings
Caching (staleTime, cacheTime)
Avoid unnecessary API calls

👉 Example:

Open page again → data loads instantly (from cache)
4. 📄 Pages (Routing)

Your app must have:

/ → Home (listings)
/listing/:id → Details page
/bookings → bookings (protected)
/favorites → saved items
/login → login page
5. 🧩 Components

You must create:

Navbar (search + user)
Filter panel (price, rating)
ListingCard
BookingForm
Loader
ErrorState
6. 🔍 Features

Your app must:

Search listings
Filter by price/rating
Show listing details
Save favorites
Book & cancel bookings
7. ⚠️ Error Handling

Your app must:

Handle API errors
Show friendly messages
Avoid crashes
8. ⚡ Performance
Use caching (React Query)
Avoid refetching unnecessarily
Smooth UI (no flickering)
9. 💾 Persistence
Favorites must save (localStorage)
Data should stay when navigating
10. 🚀 Deployment
Deploy using Vercel or Netlify
Use .env for API key
Share live link