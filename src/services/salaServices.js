import api from "./api";

export const getSalasDisponiveis = async (turno) => {
  const res = await api.get(`/sala/disponiveis?turno=${turno}`)
  return res.data
}