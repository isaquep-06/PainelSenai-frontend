import api from "./api";

export const dashboardApi = (turno) => {
  return api.get(`/dashboard?turno=${turno}`);
};