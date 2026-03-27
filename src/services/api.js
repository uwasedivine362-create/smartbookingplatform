import axios from "axios";

const api = axios.create({
  baseURL: "https://airbnb19.p.rapidapi.com/api/v2",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "airbnb19.p.rapidapi.com",
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 second timeout
});

// Track last request time for throttling
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

// Request interceptor for throttling
api.interceptors.request.use(
  async (config) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const delayTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }
    
    lastRequestTime = Date.now();
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"] || "10";
      return Promise.reject(
        new Error(`Rate limited. Retry after ${retryAfter}s. Tip: Wait before making another request.`)
      );
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      return Promise.reject(new Error("Authentication failed. Check your API key."));
    }
    if (!error.response) {
      return Promise.reject(new Error("Network error. Check your internet connection."));
    }
    return Promise.reject(error);
  }
);

export default api;
