// src/api/axiosAPI.js
import axios from "axios";

// ✅ Create an Axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Example: http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: 10 seconds timeout
});

// ✅ Attach JWT token automatically to every request
API.interceptors.request.use(
  (req) => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      try {
        const { token } = JSON.parse(storedData);
        if (token) req.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error("Error parsing user token from localStorage:", err);
      }
    }
    return req;
  },
  (error) => {
    // Request error
    return Promise.reject(error);
  }
);

// ✅ Optional: Response interceptor to handle errors globally
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data.message || error.message);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
