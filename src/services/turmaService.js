import { toast } from "react-toastify";
import api from "./api";

// Criar turma 🔷 -> POST
export const createTurma = async (data) => {
  try {
    const res = await api.post('/turma/criar-turma', data)

    toast.success(res.data.message)

    return res.data

  } catch (error) {
    const msg = error.response?.data?.message || "Erro ao criar turma"
    toast.error(msg)

    throw error
  }
}

// Atualziar turma 🔷 -> PUT
export const updateTurma = async (data) => {
  try {
    const { id } = data

    const res = await api.put(`/turma/atualizar-turma/${id}`, data)

    toast.success(`Turma atualizada: ${data.name}`)

    return res.data

  } catch (error) {
    const msg = error.response?.data?.message || "Erro ao atualizar turma"
    toast.error(msg)

    throw error
  }
}

// Deletar turma 🔷 -> DELETE
export const deleteTurma = async (id) => {
  try {
    const res = await api.delete(`/turma/deletar-turma/${id}`)

    toast.success(`Turma deletada com sucesso`)

    return res.data

  } catch (error) {
    const msg = error.response?.data?.message || "Erro ao deletar turma"
    toast.error(msg)

    throw error
  }
}

// Mostar turmas disponiveis 🔷 -> GET
export const getTurma = async () => {
  try {
    const res = await api.get('/turma')

    return res.data

  } catch (error) {
    const msg = error.response?.data?.message || "Erro ao carregar turmas"
    toast.error(msg)

    throw error
  }
}