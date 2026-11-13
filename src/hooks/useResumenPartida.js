
// ==========================================
// CUSTOM HOOK: Lógica y Estado del Resumen de Partida
// ==========================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  obtenerResumenPartida, 
  reiniciarPartida, 
  validarPuntajesFinales, 
  obtenerMensajeFelicitacion 
} from "../services/alumnoService";
import { useFondoPantalla } from "./useFondoPantalla";

export const useResumenPartida = (esVistaPrevia = false) => {
  useFondoPantalla("body-resultados", esVistaPrevia);

  const navigate = useNavigate();
  const [reiniciando, setReiniciando] = useState(false);

  const resumen = obtenerResumenPartida();
  const puntajesFinales = validarPuntajesFinales(
    resumen.puntajeJuego1,
    resumen.puntajeJuego2
  );

  const mensajeFelicitacion = obtenerMensajeFelicitacion(
    puntajesFinales.puntajeTotal, 
    resumen.nombreJugador
  );

  const manejarJugarDeNuevo = () => {
    if (esVistaPrevia) {
      alert("Modo vista previa en Admin");
      return;
    }
    setReiniciando(true);
    reiniciarPartida();
    setTimeout(() => navigate("/"), 800);
  };

  return {
    reiniciando,
    resumen,
    puntajesFinales,
    mensajeFelicitacion,
    manejarJugarDeNuevo
  };
};