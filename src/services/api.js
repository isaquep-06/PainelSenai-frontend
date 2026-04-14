import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // sua API
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