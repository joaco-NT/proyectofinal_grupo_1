
// ==========================================
// CUSTOM HOOK: Lógica y Configuración de Vista de Juego (Strategy & State)
// ==========================================
import { useLocation } from "react-router-dom";
import { 
  obtenerRondasJuego1, 
  calcularPuntajeYValidacion, 
  obtenerRondasJuego2, 
  calcularPuntajeYValidacionJuego2 
} from "../services/juegoService";
import { procesarYGuardarPuntajeJuego1, procesarYGuardarPuntajeJuego2 } from "../services/alumnoService";
import { useJuego } from "./useJuego";
import { useFondoPantalla } from "./useFondoPantalla";

const ESTRATEGIAS_JUEGOS = {
  juego1: {
    claseBody: "body-juego1",
    claseBaseEstilo: "pantalla02",
    rutaSiguiente: "/juego2",
    obtenerRondas: obtenerRondasJuego1,
    funcionValidacion: calcularPuntajeYValidacion,
    guardarPuntaje: procesarYGuardarPuntajeJuego1,
    titulo: "Juego 1: ¡Hora de Comer!",
    preguntaTexto: "Elige la comida correcta:",
    textoBotonSiguiente: "Siguiente 🚀",
    obtenerEmojiTexto: (ronda) => (ronda?.emoji ? `${ronda.emoji} ${ronda.animal}` : "")
  },
  juego2: {
    claseBody: "body-juego2",
    claseBaseEstilo: "pantalla03",
    rutaSiguiente: "/resultados",
    obtenerRondas: obtenerRondasJuego2,
    funcionValidacion: calcularPuntajeYValidacionJuego2,
    guardarPuntaje: procesarYGuardarPuntajeJuego2,
    titulo: "Juego 2: El Intruso de la Granja",
    preguntaTexto: "Haz clic en el elemento que NO corresponde a la granja:",
    textoBotonSiguiente: "Ver Resultados 🏆",
    obtenerEmojiTexto: () => "🕵️‍♂️ ¡Encuentra al intruso!"
  }
};

export const useVistaJuego = (esJuego1Prop, esVistaPrevia = false) => {
  const { pathname } = useLocation();
  const esJuego1 = esJuego1Prop ?? pathname.includes("juego1");
  const estrategia = ESTRATEGIAS_JUEGOS[esJuego1 ? "juego1" : "juego2"];

  useFondoPantalla(estrategia.claseBody, esVistaPrevia);

  const {
    rondaActual,
    puntaje,
    retroalimentacion,
    juegoTerminado,
    manejarRespuesta,
    manejarSiguienteJuego
  } = useJuego(
    estrategia.obtenerRondas,
    estrategia.funcionValidacion,
    estrategia.guardarPuntaje,
    estrategia.rutaSiguiente
  );

  const juegoActivo = {
    titulo: estrategia.titulo,
    emojiIndicadorTexto: estrategia.obtenerEmojiTexto(rondaActual),
    estaCargando: !rondaActual?.opciones?.length,
    preguntaTexto: estrategia.preguntaTexto,
    opciones: rondaActual?.opciones || [],
    retroalimentacion,
    manejarRespuesta
  };

  const juegoTerminadoDatos = {
    puntajeFinal: puntaje,
    textoBotonSiguiente: estrategia.textoBotonSiguiente,
    alHacerClickSiguiente: esVistaPrevia ? () => alert("Modo vista previa en Admin") : manejarSiguienteJuego
  };

  return {
    claseBaseEstilo: estrategia.claseBaseEstilo,
    juegoTerminado,
    juegoActivo,
    juegoTerminadoDatos
  };
};