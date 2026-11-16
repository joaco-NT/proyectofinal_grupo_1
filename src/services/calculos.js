
export const filtrarAlumnos = (usuarios) => {
  return usuarios.filter((usuario) => {
    const esAlumnoRol = usuario.rol === "alumno";
    const esAlumnoTipo = usuario.tipo === "alumno";
    return esAlumnoRol || esAlumnoTipo;
  });
};

export const buscarUsuario = (usuarios, identificador) => {
  const textoLimpio = identificador.trim().toLowerCase();
  
  return usuarios.find((usuario) => {
    let coincideEmail = false;
    if (usuario.email !== undefined) {
      coincideEmail = usuario.email.trim().toLowerCase() === textoLimpio;
    }

    let coincideUsuario = false;
    if (usuario.usuario !== undefined) {
      coincideUsuario = usuario.usuario.trim().toLowerCase() === textoLimpio;
    }

    let coincideNombre = false;
    if (usuario.nombre !== undefined) {
      coincideNombre = usuario.nombre.trim().toLowerCase() === textoLimpio;
    }

    return coincideEmail || coincideUsuario || coincideNombre;
  });
};

export const validarAcceso = (usuarios, identificador, password, esIframe) => {
  const textoVacio = !identificador || identificador.trim() === "";
  if (textoVacio === true) {
    return { valido: false, error: "Escribe tu usuario o correo." };
  }

  let usuarioEncontrado = buscarUsuario(usuarios, identificador);

  let esUsuarioNulo = false;
  if (usuarioEncontrado === undefined) {
    esUsuarioNulo = true;
  }

  if (esUsuarioNulo === true && esIframe === true) {
    usuarioEncontrado = {
      nombre: identificador.trim(),
      rol: "alumno",
      juego1: 0,
      juego2: 0,
      esTemporal: true
    };
  }

  let sigueNulo = false;
  if (usuarioEncontrado === undefined) {
    sigueNulo = true;
  }

  if (sigueNulo === true) {
    return { valido: false, error: "Usuario no encontrado." };
  }

  let esAdmin = false;
  if (usuarioEncontrado.rol === "admin") {
    esAdmin = true;
  }

  if (esAdmin === true) {
    let passwordRegistrada = "";
    if (usuarioEncontrado.password !== undefined) {
      passwordRegistrada = String(usuarioEncontrado.password);
    } else if (usuarioEncontrado.contrasena !== undefined) {
      passwordRegistrada = String(usuarioEncontrado.contrasena);
    }

    const passwordEscrita = String(password);
    if (passwordRegistrada !== passwordEscrita) {
      return { valido: false, error: "Contraseña incorrecta." };
    }
  }

  let rutaDestino = "/juego1";
  if (esAdmin === true) {
    rutaDestino = "/admin";
  }

  return {
    valido: true,
    usuario: usuarioEncontrado,
    destino: rutaDestino
  };
};

export const calcularPuntajeTotal = (puntajeJuego1, puntajeJuego2) => {
  const numero1 = Number(puntajeJuego1);
  const numero2 = Number(puntajeJuego2);
  return numero1 + numero2;
};

export const obtenerMensajeFelicitacion = (puntajeTotal, nombreJugador) => {
  const mensajesPorRango = [
    { minimo: 80, texto: "¡Excelente trabajo, " + nombreJugador + "! Dominas los conocimientos." },
    { minimo: 50, texto: "¡Buen trabajo, " + nombreJugador + "! Sigue practicando." },
    { minimo: 0,  texto: "¡A seguir intentándolo, " + nombreJugador + "!" }
  ];

  let mensajeElegido = "¡A seguir intentándolo, " + nombreJugador + "!";

  mensajesPorRango.forEach((rango) => {
    if (puntajeTotal >= rango.minimo) {
      if (mensajeElegido.includes("A seguir")) {
        mensajeElegido = rango.texto;
      }
    }
  });

  return mensajeElegido;
};

export const mezclarOpciones = (opcionesOriginales) => {
  const copiaOpciones = opcionesOriginales.map((opcion) => {
    return opcion;
  });

  return copiaOpciones.sort(() => {
    return Math.random() - 0.5;
  });
};

export const evaluarRespuesta = (opcionElegida, rondaActual) => {
  const esCorrecta = opcionElegida === rondaActual.correcta;
  let puntos = 0;
  if (esCorrecta === true) {
    puntos = 10;
  }

  return {
    esCorrecta: esCorrecta,
    puntosGanados: puntos
  };
};