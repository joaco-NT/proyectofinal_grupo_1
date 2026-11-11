
// Responsabilidad única: Verificar que el valor recibido sea estrictamente de tipo texto (string)
function esTipoTextoValido(valor) {
  return typeof valor === "string";
}

// Responsabilidad única: Comprobar que el texto contenga caracteres y no esté vacío
function esTextoNoVacio(texto) {
  return texto.length > 0;
}

// Responsabilidad única: Validar mediante una expresión regular que el texto contenga únicamente letras, acentos, eñes y espacios
function esSoloTextoAlfabetico(texto) {
  const expresionRegular = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return expresionRegular.test(texto);
}

// Responsabilidad única: Validar el nombre del jugador aplicando todas las reglas de formato, longitud y contenido alfabético
export function validarNombreJugador(nombre) {
  if (!esTipoTextoValido(nombre)) {
    return {
      valido: false,
      error: "¡Ups! El formato ingresado no es válido 🐾",
      nombreProcesado: ""
    };
  }

  const nombreLimpio = nombre.trim();

  if (!esTextoNoVacio(nombreLimpio)) {
    return {
      valido: false,
      error: "¡Ups! Escribe tu nombre para empezar 🐾",
      nombreProcesado: ""
    };
  }

  if (!esSoloTextoAlfabetico(nombreLimpio)) {
    return {
      valido: false,
      error: "¡Ups! Tu nombre solo puede contener letras 🐾",
      nombreProcesado: ""
    };
  }

  return {
    valido: true,
    error: "",
    nombreProcesado: nombreLimpio
  };
}