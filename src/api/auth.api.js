import axios from "axios";

export const authApi = axios.create({
  baseURL:
    "https://olimpiadas-informatica-production.up.railway.app/api/v1/auth/",
});

// Localhost: http://localhost:4000/api/v1/auth/
// Server: https://olimpiadas-informatica-production.up.railway.app
