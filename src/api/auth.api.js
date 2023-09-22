import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/auth/",
});

// Localhost: http://localhost:4000/api/v1/auth/
// Server: 