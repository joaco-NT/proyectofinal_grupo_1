
// ==========================================
// SERVICIOS Y LÓGICA DEL JUEGO 2
// ==========================================

// Datos base de las rondas
export const rondasJuego2 = [
  {
    id: 1,
    animales: [
      { nombre: "Perro", emoji: "🐶" },
      { nombre: "Gato", emoji: "🐱" },
      { nombre: "León", emoji: "🦁" },
    ],
    intruso: "León",
  },
  {
    id: 2,
    animales: [
      { nombre: "Vaca", emoji: "🐮" },
      { nombre: "Oveja", emoji: "🐑" },
      { nombre: "Cocodrilo", emoji: "🐊" },
    ],
    intruso: "Cocodrilo",
  },
  {
    id: 3,
    animales: [
      { nombre: "Gallina", emoji: "🐔" },
      { nombre: "Chancho", emoji: "🐷" },
      { nombre: "Elefante", emoji: "🐘" },
    ],
    intruso: "Elefante",
  },
  {
    id: 4,
    animales: [
      { nombre: "Caballo", emoji: "🐴" },
      { nombre: "Vaca", emoji: "🐮" },
      { nombre: "Tiburón", emoji: "🦈" },
    ],
    intruso: "Tiburón",
  },
  {
    id: 5,
    animales: [
      { nombre: "Oveja", emoji: "🐑" },
      { nombre: "Perro", emoji: "🐶" },
      { nombre: "Pingüino", emoji: "🐧" },
    ],
    intruso: "Pingüino",
  },
];

// Validar respuesta y calcular puntaje
export function calcularPuntajeYValidacion(
  opcionElegida,
  opcionCorrecta,
  puntajeActual
) {
  const esCorrecta = opcionElegida === opcionCorrecta;

  const puntosGanados = esCorrecta ? 10 : 0;

  return {
    esCorrecta,
    nuevoPuntaje: puntajeActual + puntosGanados,

    mensaje: esCorrecta
      ? "🎉 ¡Sacaste al intruso! La granja está a salvo. ¡Ganaste 10 puntos!"
      : "❌ ¡Incorrecto! Ese animal sí pertenece a la granja.",

    claseCSS: esCorrecta
      ? "pantalla03__mensaje--correcto"
      : "pantalla03__mensaje--incorrecto",
  };
}

// Preparar puntaje final
export function prepararGuardadoFinal(puntajeFinal) {
  return {
    clave: "puntajeJuego2",
    valor: Math.min(puntajeFinal, 50),
  };
}