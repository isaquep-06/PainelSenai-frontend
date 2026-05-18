import { toast } from "react-toastify";
import api from "./api";

function normalizeUploadItem(item) {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    url: item.url ?? item.src ?? "",
  };
}

function normalizeUploadCollection(payload) {
  if (Array.isArray(payload)) {
    return payload.map(normalizeUploadItem);
  }

  if (Array.isArray(payload?.midias)) {
    return payload.midias.map(normalizeUploadItem);
  }

  return [];
}

// Upload
export const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  for (const [key, value] of formData.entries()) {
    console.log("FormData entry:", {
      key,
      valueType: value?.constructor?.name,
      name: value?.name,
      type: value?.type,
      size: value?.size,
    });
  }

  console.log("Enviando arquivo para upload:", {
    name: file?.name,
    type: file?.type,
    size: file?.size,
  });

  const res = await api.post("/upload", formData);

  console.log("Resposta do upload:", res.data);

  return normalizeUploadItem(res.data);
};

// Buscar uploads
export const getUploads = async () => {
  try {
    const res = await api.get("/upload");
    return normalizeUploadCollection(res.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Ativar / desativar
export const updateUploadStatus = async (id, active) => {
  const safeId = encodeURIComponent(id);

  const res = await api.put(`/upload/${safeId}/status`, { active });

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

export { normalizeUploadCollection, normalizeUploadItem };
