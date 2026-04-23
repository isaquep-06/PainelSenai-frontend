import { toast } from "react-toastify";
import api from "./api";

// 🔹 Buscar salas
export const getSalas = async () => {
  const res = await api.get("/sala");
  return res.data;
};

// 🔹 Criar sala
export const createSala = async (data) => {
  try {
    const res = await api.post("/sala", data);

    if (res.status === 201) {
      toast.success(`Sala criada: ${data.name}`);
    }

    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao criar sala");
    throw error;
  }
};

// 🔹 Atualizar sala
export const updateSala = async (data) => {
  try {
    const res = await api.put(`/sala/atualizar-sala/${data.id}`, data);

    toast.success(`Sala atualizada: ${data.name}`);
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao atualizar sala");
    throw error;
  }
};

// 🔹 Deletar sala
export const deleteSala = async (id) => {
  try {
    const res = await api.delete(`/sala/deletar-sala/${id}`);

    toast.success("Sala deletada com sucesso");
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao deletar sala");
    throw error;
  }
};