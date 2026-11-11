
// Responsabilidad única: Barajar de forma aleatoria los elementos de un array (Algoritmo Fisher-Yates)
export function mezclarArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temporal = arr[i];
    arr[i] = arr[j];
    arr[j] = temporal;
  }
  return arr;
}

// Responsabilidad única: Cargar, procesar y mapear las rondas de juego desde un archivo JSON externo
export async function obtenerRondasGenerico(rutaArchivoJson) {
  try {
    const respuesta = await fetch(rutaArchivoJson);
    const rondasBase = await respuesta.json();
    
    return rondasBase.map((rondaActual) => ({
      id: rondaActual.id,
      animal: rondaActual.animal,
      emoji: rondaActual.emoji,
      opciones: mezclarArray(rondaActual.opciones),
      correcta: rondaActual.correcta
    }));
  } catch (error) {
    console.error("Error al cargar las rondas:", error);
    return [];
  }
}

// Responsabilidad única: Validar la respuesta del usuario, calcular el puntaje y generar la retroalimentación visual
export function calcularPuntajeYValidacionGenerico(
  opcionElegida, 
  opcionCorrecta, 
  puntajeActual, 
  mensajeCorrecto, 
  claseCorrecta, 
  mensajeIncorrecto, 
  claseIncorrecta
) {
  const esCorrecta = opcionElegida === opcionCorrecta;
  const puntosGanados = esCorrecta ? 10 : 0;
  const nuevoPuntaje = puntajeActual + puntosGanados;

  return {
    esCorrecta,
    nuevoPuntaje,
    mensaje: esCorrecta ? mensajeCorrecto : mensajeIncorrecto,
    claseCSS: esCorrecta ? claseCorrecta : claseIncorrecta
  };
}