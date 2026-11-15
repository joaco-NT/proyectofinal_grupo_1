
// ==========================================
// CAPA DE NEGOCIO: Lógica Pura de Minijuegos (Clean Architecture, DRY & Strategy)
// ==========================================
import axios from "axios";

const PUNTOS_POR_ACIERTO = 10;

// Diccionario de configuración por juego (Patrón Strategy)
const CONFIG_JUEGOS = {
  juego1: {
    rutaJson: "/data/rondasJuego1.json",
    mensajeCorrecto: "🎉 Correcto. ¡El animal comió!",
    mensajeIncorrecto: "❌ ¡Esa no es su comida!",
    claseCorrecta: "pantalla02__mensaje--correcto",
    claseIncorrecta: "pantalla02__mensaje--incorrecto"
  },
  juego2: {
    rutaJson: "/data/rondasJuego2.json",
    mensajeCorrecto: "🎉 ¡Sacaste al intruso! La granja está a salvo.",
    mensajeIncorrecto: "❌ Incorrecto. Ese sí es de la granja.",
    claseCorrecta: "pantalla03__mensaje--correcto",
    claseIncorrecta: "pantalla03__mensaje--incorrecto"
  }
};

// 1. Función pura: Algoritmo de mezcla aleatoria (Fisher-Yates)
export const mezclarArray = (array) => {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

// 2. Función genérica de carga de rondas desde JSON utilizando Axios
const obtenerRondasPorClave = async (claveJuego) => {
  const config = CONFIG_JUEGOS[claveJuego];
  if (!config) return [];

  try {
    const respuesta = await axios.get(config.rutaJson);
    const rondasBase = respuesta.data;
    
    return rondasBase.map((ronda) => ({
      ...ronda,
      opciones: mezclarArray(ronda.opciones)
    }));
  } catch (error) {
    console.error(`Error al cargar las rondas de ${claveJuego}:`, error);
    return [];
  }
};

// 3. Función genérica de evaluación de respuesta
const evaluarRespuestaPorClave = (claveJuego, opcionElegida, opcionCorrecta, puntajeActual) => {
  const config = CONFIG_JUEGOS[claveJuego];
  const esCorrecta = opcionElegida === opcionCorrecta;
  const nuevoPuntaje = puntajeActual + (esCorrecta ? PUNTOS_POR_ACIERTO : 0);

  return {
    esCorrecta,
    nuevoPuntaje,
    mensaje: esCorrecta ? config.mensajeCorrecto : config.mensajeIncorrecto,
    claseCSS: esCorrecta ? config.claseCorrecta : config.claseIncorrecta
  };
};

// --- Exportaciones públicas consumidas por VistaJuego.jsx ---

export const obtenerRondasJuego1 = () => obtenerRondasPorClave("juego1");

export const calcularPuntajeYValidacion = (opcionElegida, opcionCorrecta, puntajeActual) =>
  evaluarRespuestaPorClave("juego1", opcionElegida, opcionCorrecta, puntajeActual);

export const obtenerRondasJuego2 = () => obtenerRondasPorClave("juego2");

export const calcularPuntajeYValidacionJuego2 = (opcionElegida, opcionCorrecta, puntajeActual) =>
  evaluarRespuestaPorClave("juego2", opcionElegida, opcionCorrecta, puntajeActual);