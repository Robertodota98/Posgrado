import axios from "axios";

// Url base de la API
export const API_URL = axios.create({
    baseURL: "http://localhost:3000/api/",
});