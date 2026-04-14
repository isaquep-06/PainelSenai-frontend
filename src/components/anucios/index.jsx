import { useEffect, useRef } from "react";

function Anuncio({ midia, onNext }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!midia) return;

    // 🔥 SE FOR IMAGEM → troca depois de X tempo
    if (midia.type === "image") {
      const timer = setTimeout(() => {
        onNext();
      }, midia.duration || 120000); // default 2min

      return () => clearTimeout(timer);
    }

    // 🔥 SE FOR VIDEO → espera terminar
    if (midia.type === "video") {
      const video = videoRef.current;

      if (video) {
        video.play().catch(() => { }); // autoplay

        const handleEnd = () => {
          onNext();
        };

        video.addEventListener("ended", handleEnd);

        return () => {
          video.removeEventListener("ended", handleEnd);
        };
      }
    }
  }, [midia, onNext]);

  if (!midia) return null;

  return (
    <>
      {midia.type === "image" ? (
        <img
          src={midia.src}
          alt=""
        />
      ) : (
        <video
          ref={videoRef}
          src={midia.src}
          autoPlay
          muted
          playsInline
          controls={false}
        />
      )}
    </>
  );
}

export default Anuncio;