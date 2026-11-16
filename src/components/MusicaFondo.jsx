

import React from "react";
import { useMusicaFondo } from "../hooks/useMusicaFondo";
import { useEntorno } from "../hooks/useEntorno"; 
import "../css/EstiloMusica.css";

const MusicaFondo = () => {
  const { esIframe } = useEntorno();
  const { audioRef, reproduciendo, alternarMusica } = useMusicaFondo();

  if (esIframe) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/musicaFondo.mp3"
        loop
        preload="auto"
        onError={() => console.error("No se pudo cargar el audio")}
      />

      <button
        className="boton-musica"
        onClick={alternarMusica}
        type="button"
      >
        {reproduciendo
          ? "🔊 Silenciar música"
          : "🎵 Activar música"}
      </button>
    </>
  );
};

export default MusicaFondo;