

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerResumenPartida, reiniciarPartida } from "../services/navegador";
import { obtenerMensajeFelicitacion } from "../services/calculos";

export const useResultados = () => {
  const navigate = useNavigate();

  const [resumen, setResumen] = useState({
    nombreJugador: "",
    puntajeJuego1: 0,
    puntajeJuego2: 0,
    puntajeTotal: 0
  });


  const [estaReiniciando, setEstaReiniciando] = useState(false);

  useEffect(() => {
    const datosPartida = obtenerResumenPartida();
    setResumen(datosPartida);
  }, []);


  const alHacerClickReiniciar = () => {
    setEstaReiniciando(true);
    reiniciarPartida();

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const mensajeFelicitacion = obtenerMensajeFelicitacion(
    resumen.puntajeTotal,
    resumen.nombreJugador
  );

  return {
    memoria: {
      nombreJugador: resumen.nombreJugador,
      puntajeJuego1: resumen.puntajeJuego1,
      puntajeJuego2: resumen.puntajeJuego2,
      puntajeTotal: resumen.puntajeTotal,
      mensajeFelicitacion: mensajeFelicitacion
    },
    accion: {
      alHacerClickReiniciar: alHacerClickReiniciar
    },
    efecto: {
      estaReiniciando: estaReiniciando
    }
  };
};