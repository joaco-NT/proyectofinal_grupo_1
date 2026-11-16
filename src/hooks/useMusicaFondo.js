
import { useState, useEffect, useRef } from "react";

export const useMusicaFondo = () => {
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

  return {
    audioRef,
    reproduciendo,
    alternarMusica
  };
};