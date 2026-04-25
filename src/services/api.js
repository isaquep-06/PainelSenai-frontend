import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const data = localStorage.getItem("PainelSenai:DataUser");

  if (data) {
    const parsed = JSON.parse(data);
    const token = parsed.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
export default api;
