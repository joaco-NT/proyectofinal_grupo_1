
// 1. Librerías por defecto
import React from "react";

// 2. Componentes visuales propios
import PlantillaJuegoBase from "../components/PlantillaJuegoBase";

// 3. Motorización propia (servicios, hooks y estilos)
import { obtenerRondasJuego2, calcularPuntajeYValidacionJuego2 } from "../services/calculoPantalla03";
import { useJuego } from "../hooks/useJuego";
import { useFondoPantalla } from "../hooks/useFondoPantalla";
import { useProgresoPartida } from "../hooks/useProgresoPartida";
import "../css/EstiloPantalla03.css";

const Pantalla03 = () => {
  useFondoPantalla("body-pantalla03");
  const { registrarPuntajeJuego2 } = useProgresoPartida();

  const {
    rondaActual, 
    puntaje, 
    retroalimentacion, 
    juegoTerminado, 
    manejarRespuesta, 
    manejarSiguienteJuego,
  } = useJuego(
    obtenerRondasJuego2,
    calcularPuntajeYValidacionJuego2,
    registrarPuntajeJuego2,
    "/resultados"
  );

  const estaCargando = !rondaActual || !rondaActual.opciones?.length;

  // --- ESTADO ACTIVO ---
  const juegoActivo = {
    titulo: "Juego 2: El Intruso de la Granja",
    emojiIndicadorTexto: "🕵️‍♂️ ¡Encuentra al intruso!",
    estaCargando: estaCargando,
    preguntaTexto: "Haz clic en el elemento que NO corresponde a la granja:",
    opciones: rondaActual?.opciones || [],
    retroalimentacion: retroalimentacion,
    manejarRespuesta: manejarRespuesta
  };

  // --- ESTADO TERMINADO ---
  const juegoTerminadoDatos = {
    puntajeFinal: puntaje,
    textoBotonSiguiente: "Ver Resultados 🏆",
    alHacerClickSiguiente: manejarSiguienteJuego
  };

  return (
    <PlantillaJuegoBase 
      claseBaseEstilo="pantalla03"
      juegoTerminado={juegoTerminado}
      juegoActivo={juegoActivo}
      juegoTerminadoDatos={juegoTerminadoDatos}
    />
  );
};

export default Pantalla03;