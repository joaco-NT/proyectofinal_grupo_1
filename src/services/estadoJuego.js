
// Guardar puntaje del Juego 2
export const guardarPuntajeJuego2 = (puntaje) => {
  memoriaPartida.puntajeJuego2 = puntaje;
};

// Reiniciar toda la partida
export const reiniciarPartida = () => {
  memoriaPartida = {
    nombreJugador: "",
    puntajeJuego1: 0,
    puntajeJuego2: 0,
  };
};