import axios from "axios";

export const patientApi = axios.create({
  baseURL:
    "https://olimpiadas-informatica-production.up.railway.app/api/v1/patient/",
});

// Localhost: http://localhost:4000/api/v1/auth/
// Server: https://olimpiadas-informatica-production.up.railway.app
