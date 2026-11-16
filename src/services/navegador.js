

import axios from "axios";
import { 
  validarAcceso, 
  filtrarAlumnos, 
  calcularPuntajeTotal, 
  mezclarOpciones 
} from "./calculos";

export const obtenerUsuariosOficiales = async () => {
  const datosGuardados = sessionStorage.getItem("usuarios_temp");
  let tieneDatos = false;
  if (datosGuardados !== null) {
    tieneDatos = true;
  }

  if (tieneDatos === true) {
    return JSON.parse(datosGuardados);
  }

  try {
    const respuesta = await axios.get("/data/usuarios.json");
    const listaUsuarios = respuesta.data;

    const usuariosNormalizados = listaUsuarios.map((usuario) => {
      let j1 = usuario.juego1;
      if (j1 === undefined) {
        j1 = 0;
      }

      let j2 = usuario.juego2;
      if (j2 === undefined) {
        j2 = 0;
      }

      // Usamos el operador de propagación (...) aquí
      return {
        ...usuario,
        juego1: j1,
        juego2: j2
      };
    });

    sessionStorage.setItem("usuarios_temp", JSON.stringify(usuariosNormalizados));
    return usuariosNormalizados;
  } catch (errorDeCarga) {
    return [];
  }
};

export const iniciarSesion = async (identificador, password, esIframe) => {
  const listaUsuarios = await obtenerUsuariosOficiales();
  const resultadoValidacion = validarAcceso(listaUsuarios, identificador, password, esIframe);

  let esValido = resultadoValidacion.valido;
  if (esValido === false) {
    return resultadoValidacion;
  }

  let esTemporal = resultadoValidacion.usuario.esTemporal;
  if (esTemporal === true) {
    listaUsuarios.push(resultadoValidacion.usuario);
    sessionStorage.setItem("usuarios_temp", JSON.stringify(listaUsuarios));
  }

  sessionStorage.setItem("nombreJugador", resultadoValidacion.usuario.nombre);

  let rolUsuario = resultadoValidacion.usuario.rol;
  if (rolUsuario === undefined) {
    rolUsuario = resultadoValidacion.usuario.tipo;
  }

  return {
    valido: true,
    rol: rolUsuario,
    nombreProcesado: resultadoValidacion.usuario.nombre,
    rutaDestino: resultadoValidacion.destino
  };
};

export const guardarPuntajeJuego = async (numeroJuego, puntosNuevos) => {
  let puntosFinales = puntosNuevos;
  if (puntosFinales > 50) {
    puntosFinales = 50;
  }

  sessionStorage.setItem("puntajeJuego" + numeroJuego, puntosFinales);

  const nombreActivo = sessionStorage.getItem("nombreJugador");
  const listaUsuarios = await obtenerUsuariosOficiales();

  const usuariosActualizados = listaUsuarios.map((usuario) => {
    const coincideNombre = usuario.nombre === nombreActivo;
    const coincideAlias = usuario.usuario === nombreActivo;

    if (coincideNombre === true || coincideAlias === true) {
      let nuevoJuego1 = usuario.juego1;
      let nuevoJuego2 = usuario.juego2;

      if (numeroJuego === 1) {
        nuevoJuego1 = puntosFinales;
      }
      if (numeroJuego === 2) {
        nuevoJuego2 = puntosFinales;
      }

      // Usamos el operador de propagación (...) para actualizar el objeto
      return {
        ...usuario,
        juego1: nuevoJuego1,
        juego2: nuevoJuego2
      };
    }

    return usuario;
  });

  sessionStorage.setItem("usuarios_temp", JSON.stringify(usuariosActualizados));
};

export const obtenerListaAlumnos = async () => {
  const listaUsuarios = await obtenerUsuariosOficiales();
  return filtrarAlumnos(listaUsuarios);
};

export const obtenerResumenPartida = () => {
  const valorJ1 = sessionStorage.getItem("puntajeJuego1");
  let j1 = Number(valorJ1);
  if (isNaN(j1)) {
    j1 = 0;
  }

  const valorJ2 = sessionStorage.getItem("puntajeJuego2");
  let j2 = Number(valorJ2);
  if (isNaN(j2)) {
    j2 = 0;
  }

  let nombreJugadorGuardado = sessionStorage.getItem("nombreJugador");
  if (nombreJugadorGuardado === null) {
    nombreJugadorGuardado = "Estudiante";
  }

  return {
    nombreJugador: nombreJugadorGuardado,
    puntajeJuego1: j1,
    puntajeJuego2: j2,
    puntajeTotal: calcularPuntajeTotal(j1, j2)
  };
};

export const cargarRondasJuego = async (rutaJson) => {
  try {
    const respuesta = await fetch(rutaJson);
    const rondasOriginales = await respuesta.json();

    return rondasOriginales.map((ronda) => {
      const opcionesMezcladas = mezclarOpciones(ronda.opciones);
      
      // Usamos el operador de propagación (...) para combinar las opciones mezcladas
      return {
        ...ronda,
        opciones: opcionesMezcladas
      };
    });
  } catch (errorDeRondas) {
    return [];
  }
};

export const reiniciarPartida = () => {
  sessionStorage.removeItem("puntajeJuego1");
  sessionStorage.removeItem("puntajeJuego2");
};

export const cerrarSesion = () => {
  const datosGuardados = sessionStorage.getItem("usuarios_temp");
  let tieneDatos = false;
  if (datosGuardados !== null) {
    tieneDatos = true;
  }

  if (tieneDatos === true) {
    const listaCompleta = JSON.parse(datosGuardados);
    const soloOficiales = listaCompleta.filter((usuario) => {
      let esTemporal = usuario.esTemporal;
      if (esTemporal === undefined) {
        esTemporal = false;
      }
      return esTemporal === false;
    });
    sessionStorage.setItem("usuarios_temp", JSON.stringify(soloOficiales));
  }

  sessionStorage.removeItem("nombreJugador");
  sessionStorage.removeItem("puntajeJuego1");
  sessionStorage.removeItem("puntajeJuego2");
};