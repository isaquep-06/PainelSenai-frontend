import { toast } from "react-toastify";
import api from "./api";

// Upload
export const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Buscar uploads
export const getUploads = async () => {
  try {
    const res = await api.get("/upload");
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Ativar / desativar
export const updateUploadStatus = async (id, active) => {
  const safeId = encodeURIComponent(id);

  const res = await api.put(
    `/upload/${safeId}/status`,
    { active }
  );

  return res.data;
};
// Deletar
export const deleteUpload = async (id, type) => {
  try {
    const encodedId = encodeURIComponent(id);

    const res = await api.delete(
      `/upload/${encodedId}?type=${type}`
    );
    toast.success('Deletado com sucesso!')
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};