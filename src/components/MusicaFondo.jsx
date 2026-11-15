
import React, { useEffect, useRef, useState } from "react";
import "../css/EstiloMusica.css";

const MusicaFondo = () => {
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.10; 
    }
  }, []);
  const alternarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setReproduciendo(true);
        console.log("Música reproduciéndose");
      } catch (error) {
        console.error("Error al reproducir el audio:", error);
        setReproduciendo(false);
      }
    } else {
      audio.pause();
      setReproduciendo(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/sound/musicaFondo.mp3"
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
