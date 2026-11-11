
import { 
  obtenerRondasGenerico, 
  calcularPuntajeYValidacionGenerico 
} from "./utilidades";

// Responsabilidad única: Solicitar y cargar las rondas específicas del Juego 1 desde su archivo JSON
export async function obtenerRondasJuego1() {
  return await obtenerRondasGenerico("/data/rondasJuego1.json");
}

// Responsabilidad única: Evaluar la respuesta del usuario para el Juego 1 utilizando la lógica genérica de validación
export function calcularPuntajeYValidacion(opcionElegida, opcionCorrecta, puntajeActual) {
  return calcularPuntajeYValidacionGenerico(
    opcionElegida,
    opcionCorrecta,
    puntajeActual,
    "🎉 Correcto. ¡El animal comió!",
    "pantalla02__mensaje--correcto",
    "❌ ¡Esa no es su comida!",
    "pantalla02__mensaje--incorrecto"
  );
}