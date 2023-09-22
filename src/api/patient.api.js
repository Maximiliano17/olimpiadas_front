import axios from "axios";

export const patientApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/patient/",
});

// Localhost: http://localhost:4000/api/v1/auth/
// Server:
