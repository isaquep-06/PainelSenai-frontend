import axios from "axios";

const apiBaseUrl = (
  import.meta.env.VITE_API_URL ||
  "https://painelsenai-production.up.railway.app"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
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

  const isFormData =
    typeof FormData !== "undefined" &&
    config.data instanceof FormData;

  if (isFormData) {
    delete config.headers["Content-Type"];
    console.log("Request multipart detectada:", {
      url: config.url,
      method: config.method,
    });
  } else if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
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
