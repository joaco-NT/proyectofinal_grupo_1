
// --- FUNCIONES DE CÁLCULO Y VALIDACIÓN PARA PANTALLA 04 ---

// Responsabilidad única: Validar, normalizar y sumar los puntajes finales de los juegos
export const validarPuntajesFinales = (puntajeJuego1, puntajeJuego2) => {
  const p1 = Number(puntajeJuego1) || 0;
  const p2 = Number(puntajeJuego2) || 0;
  const puntajeTotal = p1 + p2;

  return {
    puntajeJuego1: p1,
    puntajeJuego2: p2,
    puntajeTotal
  };
};

// Responsabilidad única: Generar un mensaje de felicitación dinámico y personalizado según el puntaje total obtenido
export const obtenerMensajeFelicitacion = (puntajeTotal, nombreJugador) => {
  const nombreUsar = (nombreJugador && nombreJugador.trim() !== "") ? nombreJugador : "amigo";

  if (puntajeTotal >= 90) {
    return `🌟 ¡Qué gran puntaje, ${nombreUsar}! ¡Eres un verdadero experto de la granja! 🚜✨`;
  } 
  if (puntajeTotal >= 70) {
    return `⭐ ¡Muy bien hecho, ${nombreUsar}! ¡Conoces perfecto a todos los animalitos! 🐮🐔`;
  } 
  if (puntajeTotal >= 50) {
    return `🌱 ¡Buen trabajo, ${nombreUsar}! Vas aprendiendo todos los secretos del campo. 🐷🌾`;
  } 
  
  return `💪 ¡No te desanimes! ¡Vuelve a intentarlo y verás que lo logras! 🐥🐣`;
};