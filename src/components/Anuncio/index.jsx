import { useEffect, useRef } from "react";

export default function Anuncio({ midia, onNext }) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    // limpa qualquer timer antigo
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // IMAGEM → 30s
    if (midia.type === "image") {
      timeoutRef.current = setTimeout(() => {
        onNext();
      }, 30000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [midia, onNext]);

  //  VIDEO → até terminar
  if (midia.type === "video") {
    return (
      <video
        src={midia.src}
        autoPlay
        muted
        onEnded={onNext} //  chave aqui
        style={{ width: "100%", height: "100%", objectFit: "fill" }}
      />
    );
  }

  //  IMAGEM
  return (
    <img
      src={midia.src}
      alt="anuncio"
      style={{ width: "100%", height: "100%", objectFit: "fill" }}
    />
  );
}