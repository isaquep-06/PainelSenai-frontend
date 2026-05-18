import { memo, useEffect, useRef } from "react";

function Anuncio({ midia, onNext }) {
  const timeoutRef = useRef(null);
  const mediaUrl = midia?.url;

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!midia || !mediaUrl) {
      return undefined;
    }

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
  }, [mediaUrl, midia, onNext]);

  if (!midia || !mediaUrl) {
    return null;
  }

  if (midia.type === "video") {
    return (
      <video
        src={mediaUrl}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={onNext}
        style={{ width: "100%", height: "100%", objectFit: "fill" }}
      />
    );
  }

  return (
    <img
      src={mediaUrl}
      alt="anuncio"
      loading="eager"
      decoding="async"
      style={{ width: "100%", height: "100%", objectFit: "fill" }}
    />
  );
}

export default memo(Anuncio);
