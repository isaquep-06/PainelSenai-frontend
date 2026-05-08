import api from "./api";

export const dashboardApi = (turno) => {
  return api.get(`/dashboard?turno=${turno}`);
};

export const getLastDashboardUpdate = async () => {
  const res = await api.get(
    "/dashboard/ultima-atualizacao"
  );

  return res.data?.last_update ?? null;
};
