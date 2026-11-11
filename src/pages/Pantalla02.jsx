
// 1. Librerías por defecto
import React from "react";

// 2. Componentes visuales propios
import PlantillaJuegoBase from "../components/PlantillaJuegoBase";

// 3. Motorización propia (servicios, hooks y estilos)
import { obtenerRondasJuego1, calcularPuntajeYValidacion } from "../services/calculoPantalla02";
import { useJuego } from "../hooks/useJuego";
import { useFondoPantalla } from "../hooks/useFondoPantalla";
import { useProgresoPartida } from "../hooks/useProgresoPartida";
import "../css/EstiloPantalla02.css";

const Pantalla02 = () => {
  useFondoPantalla("body-pantalla02");
  const { registrarPuntajeJuego1 } = useProgresoPartida();

  const {
    rondaActual, 
    puntaje, 
    retroalimentacion, 
    juegoTerminado, 
    manejarRespuesta, 
    manejarSiguienteJuego,
  } = useJuego(
    obtenerRondasJuego1,
    calcularPuntajeYValidacion,
    registrarPuntajeJuego1,
    "/juego2"
  );

  const estaCargando = !rondaActual || !rondaActual.opciones?.length;
  const emojiTexto = rondaActual?.emoji ? `${rondaActual.emoji} ${rondaActual.animal}` : "";

  // --- ESTADO ACTIVO ---
  const juegoActivo = {
    titulo: "Juego 1: ¡Hora de Comer!",
    emojiIndicadorTexto: emojiTexto,
    estaCargando: estaCargando,
    preguntaTexto: "Elige la comida correcta:",
    opciones: rondaActual?.opciones || [],
    retroalimentacion: retroalimentacion,
    manejarRespuesta: manejarRespuesta
  };

  // --- ESTADO TERMINADO ---
  const juegoTerminadoDatos = {
    puntajeFinal: puntaje,
    textoBotonSiguiente: "Siguiente 🚀",
    alHacerClickSiguiente: manejarSiguienteJuego
  };

  return (
    <PlantillaJuegoBase 
      claseBaseEstilo="pantalla02"
      juegoTerminado={juegoTerminado}
      juegoActivo={juegoActivo}
      juegoTerminadoDatos={juegoTerminadoDatos}
    />
  );
};

export default Pantalla02;