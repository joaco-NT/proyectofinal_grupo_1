
// ==========================================
// COMPONENTE: Música de Fondo (Cascarón Delgado)
// ==========================================
import React from "react";
import { useMusicaFondo } from "../hooks/useMusicaFondo";
import { useEntorno } from "../hooks/useEntorno"; // 👈 1. Importar el hook de entorno
import "../css/EstiloMusica.css";

const MusicaFondo = () => {
  const { esIframe } = useEntorno(); // 👈 2. Detectar si está dentro de un iframe
  const { audioRef, reproduciendo, alternarMusica } = useMusicaFondo();

  // 👈 3. Si está dentro del iframe del Panel Admin, no renderizamos el botón flotante
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