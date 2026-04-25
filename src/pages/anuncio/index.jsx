import { useEffect, useState } from "react";

import UploadAnuncio from "../../components/forms/anuncioForm/uploadAnuncio";
import NavBarAdmin from "../../components/navbarAdmin";

import {
  deleteUpload,
  getUploads,
  updateUploadStatus,
} from "../../services/uploadService";
import { usePageTitle } from "../../styles/pageName";

export default function AnuncioPage() {
  usePageTitle("Anuncio");
  const [uploads, setUploads] = useState([]);

  const loadUploads = async () => {
    try {
      const data = await getUploads();
      setUploads(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUploads();
  }, []);

  const toggleAtivo = async (item) => {
    try {
      await updateUploadStatus(item.id, !item.active);

      setUploads((prev) =>
        prev.map((media) =>
          media.id === item.id
            ? {
                ...media,
                active: !media.active,
              }
            : media
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deletarMidia = async (item) => {
    try {
      await deleteUpload(item.id, item.type);

      setUploads((prev) =>
        prev.filter((media) => media.id !== item.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBarAdmin />

      <div style={container}>
        <UploadAnuncio onSuccess={loadUploads} />

        <h1 style={title}>Gerenciar Anuncios</h1>

        <div style={grid}>
          {uploads.map((item) => (
            <div key={item.id} style={card}>
              <div style={mediaArea}>
                {item.type === "video" ? (
                  <video src={item.src} style={media} controls />
                ) : (
                  <img src={item.src} alt="anuncio" style={media} />
                )}
              </div>

              <div style={info}>
                <span style={status(item.active)}>
                  {item.active ? "Ativo" : "Inativo"}
                </span>

                <div style={actions}>
                  <button
                    style={btnPrimary}
                    onClick={() => toggleAtivo(item)}
                  >
                    {item.active ? "Desativar" : "Ativar"}
                  </button>

                  <button
                    style={btnDanger}
                    onClick={() => deletarMidia(item)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const container = {
  padding: "30px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const title = {
  fontSize: "28px",
  fontWeight: "700",
  margin: "30px 0 20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#fff",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
};

const mediaArea = {
  width: "100%",
  height: "220px",
  overflow: "hidden",
  borderRadius: "12px",
};

const media = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const info = {
  marginTop: "15px",
};

const actions = {
  display: "flex",
  gap: "10px",
  marginTop: "12px",
};

const btnPrimary = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};

const btnDanger = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "#dc2626",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};

const status = (active) => ({
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "30px",
  fontSize: "14px",
  fontWeight: "700",
  background: active ? "#dcfce7" : "#fee2e2",
  color: active ? "#166534" : "#991b1b",
});
