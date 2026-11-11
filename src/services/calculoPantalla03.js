
import { 
  obtenerRondasGenerico, 
  calcularPuntajeYValidacionGenerico 
} from "./utilidades";

// Responsabilidad única: Solicitar y cargar las rondas específicas del Juego 2 desde su archivo JSON
export function obtenerRondasJuego2() {
  return obtenerRondasGenerico("/data/rondasJuego2.json");
}

// Responsabilidad única: Evaluar la respuesta del usuario para el Juego 2 utilizando la lógica genérica de validación
export function calcularPuntajeYValidacionJuego2(opcionElegida, opcionCorrecta, puntajeActual) {
  return calcularPuntajeYValidacionGenerico(
    opcionElegida,
    opcionCorrecta,
    puntajeActual,
    "🎉 ¡Sacaste al intruso! La granja está a salvo.",
    "pantalla03__mensaje--correcto",
    "❌ Incorrecto. Ese sí es de la granja.",
    "pantalla03__mensaje--incorrecto"
  );
}