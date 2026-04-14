import api from "./api.js";

export const loginAuth = async (data) => {
  const res = await api.post('user/login', data)
  const { token, user } = res.data

  const userRes = {
    token,
    username: user.username
  }

  if (!token) {
    throw new Error("Token não fornecido!");
  }

  localStorage.setItem("PainelSenai:DataUser", JSON.stringify(userRes))



  return res.data
} 