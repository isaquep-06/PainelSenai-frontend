import { useState } from "react";
import { uploadFile } from "../../../services/uploadService";
import { toast } from "react-toastify";

export default function UploadAnuncio({
  onSuccess,
}) {
  const [file, setFile] =
    useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.warning(
        "Selecione um arquivo"
      );
      return;
    }

    try {
      await uploadFile(file);

      toast.success(
        "Upload realizado com sucesso!"
      );

      setFile(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro no upload");
    }
  };

  return (
    <div style={container}>
      <div style={leftArea}>
        <span style={label}>
          Enviar anúncio
        </span>

        <span style={subLabel}>
          Imagem ou vídeo para o
          painel
        </span>
      </div>

      <div style={rightArea}>
        <label style={fileLabel}>
          <input
            type="file"
            style={input}
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          {file
            ? file.name
            : "Selecionar arquivo"}
        </label>

        <button
          style={button}
          onClick={handleUpload}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

const container = {
  width: "100%",
  background:
    "linear-gradient(135deg,#0f172a,#1e293b)",
  borderRadius: "22px",
  padding: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  boxShadow:
    "0 15px 35px rgba(0,0,0,0.18)",
  flexWrap: "wrap",
};

const leftArea = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  color: "#fff",
  fontSize: "24px",
  fontWeight: "700",
};

const subLabel = {
  color: "#cbd5e1",
  fontSize: "14px",
  marginTop: "4px",
};

const rightArea = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
};

const fileLabel = {
  background: "#fff",
  color: "#0f172a",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  minWidth: "230px",
  textAlign: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const input = {
  display: "none",
};

const button = {
  border: "none",
  background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#fff",
  padding: "12px 26px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
  boxShadow:
    "0 8px 20px rgba(37,99,235,0.35)",
};