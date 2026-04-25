import api from "./api.js";

export const loginAuth = async (data) => {
  const res = await api.post("/user/login", data);
  const token =
    res.data?.token ||
    res.data?.accessToken ||
    res.data?.access_token;
  const user =
    res.data?.user ||
    res.data?.data?.user ||
    {};

  const userRes = {
    token,
    username: user.username || data.username,
  };

  if (!token) {
    throw new Error("Token nÃ£o fornecido!");
  }

  localStorage.setItem(
    "PainelSenai:DataUser",
    JSON.stringify(userRes)
  );

  return res.data;
};
