import axios from "axios";

export const areaApi = axios.create({
  baseURL:
    "https://olimpiadas-informatica-production.up.railway.app/api/v1/area/",
});

// Localhost: http://localhost:4000/api/v1/auth/
// Server: https://olimpiadas-informatica-production.up.railway.app/
