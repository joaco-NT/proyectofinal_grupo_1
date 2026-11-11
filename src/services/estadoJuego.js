
let partidaActual = {
  nombreJugador: "",
  puntajeJuego1: 0,
  puntajeJuego2: 0,
};

// Responsabilidad única: Registrar y almacenar el nombre del jugador en el estado global
export const procesarYGuardarNombre = (nombreProcesado) => {
  partidaActual.nombreJugador = nombreProcesado;
};

// Responsabilidad única: Guardar y limitar el puntaje máximo del Juego 1 en el estado global
export const procesarYGuardarPuntajeJuego1 = (puntaje) => {
  partidaActual.puntajeJuego1 = Math.min(puntaje, 50);
};

// Responsabilidad única: Guardar y limitar el puntaje máximo del Juego 2 en el estado global
export const procesarYGuardarPuntajeJuego2 = (puntaje) => {
  partidaActual.puntajeJuego2 = Math.min(puntaje, 50);
};

// Responsabilidad única: Retornar una copia segura del resumen actual de la partida
export const obtenerResumenPartida = () => {
  return { ...partidaActual };
};

// Responsabilidad única: Restablecer todos los valores del estado global a sus valores iniciales
export const reiniciarPartida = () => {
  partidaActual.nombreJugador = "";
  partidaActual.puntajeJuego1 = 0;
  partidaActual.puntajeJuego2 = 0;
};