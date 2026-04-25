import axios from "axios";

const apiBaseUrl = (
  import.meta.env.VITE_API_URL ||
  "https://painelsenai-production.up.railway.app"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const data = localStorage.getItem("PainelSenai:DataUser");

  if (data) {
    const parsed = JSON.parse(data);
    const token = parsed?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("PainelSenai:DataUser");
    }

    return Promise.reject(error);
  }
);

export default api;
