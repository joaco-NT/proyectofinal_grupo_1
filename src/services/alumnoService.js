
// ==========================================
// CAPA DE NEGOCIO: Gestión de Alumnos y Puntajes
// ==========================================
import { obtenerUsuariosOficiales, autenticarUsuario, validarCredenciales } from "./autenticacionService";
import { 
  obtenerItemStorage, 
  guardarItemStorage, 
  eliminarItemStorage, 
  guardarUsuariosTemp, 
  limpiarSesionTemporalGlobal 
} from "./almacenamientoService";

const SESSION_KEY_NAME = "nombreJugador";
const SESSION_KEY_J1 = "puntajeJuego1";
const SESSION_KEY_J2 = "puntajeJuego2";

export { autenticarUsuario, validarCredenciales };

export const obtenerListaAlumnos = async () => {
  const usuarios = await obtenerUsuariosOficiales();
  return usuarios.filter(u => u.rol === "alumno" || u.tipo === "alumno");
};

export const procesarYGuardarNombre = (nombre) => {
  guardarItemStorage(SESSION_KEY_NAME, nombre);
};

export const procesarYGuardarPuntajeJuego1 = async (puntaje) => {
  guardarItemStorage(SESSION_KEY_J1, puntaje);
  const nombreActivo = obtenerItemStorage(SESSION_KEY_NAME);

  let usuarios = await obtenerUsuariosOficiales();
  usuarios = usuarios.map(u => {
    if (u.nombre === nombreActivo || u.usuario === nombreActivo) {
      return { ...u, juego1: puntaje };
    }
    return u;
  });
  guardarUsuariosTemp(usuarios);
};

export const procesarYGuardarPuntajeJuego2 = async (puntaje) => {
  guardarItemStorage(SESSION_KEY_J2, puntaje);
  const nombreActivo = obtenerItemStorage(SESSION_KEY_NAME);

  let usuarios = await obtenerUsuariosOficiales();
  usuarios = usuarios.map(u => {
    if (u.nombre === nombreActivo || u.usuario === nombreActivo) {
      return { ...u, juego2: puntaje };
    }
    return u;
  });
  guardarUsuariosTemp(usuarios);
};

export const obtenerResumenPartida = () => {
  return {
    nombreJugador: obtenerItemStorage(SESSION_KEY_NAME) || "Estudiante",
    puntajeJuego1: Number(obtenerItemStorage(SESSION_KEY_J1) || 0),
    puntajeJuego2: Number(obtenerItemStorage(SESSION_KEY_J2) || 0)
  };
};

export const validarPuntajesFinales = (j1, j2) => ({
  puntajeJuego1: j1,
  puntajeJuego2: j2,
  puntajeTotal: j1 + j2
});

export const obtenerMensajeFelicitacion = (total, nombre) => {
  if (total >= 80) return `¡Excelente trabajo, ${nombre}! Dominas los conocimientos de la granja.`;
  if (total >= 50) return `¡Buen trabajo, ${nombre}! Sigue practicando para mejorar.`;
  return `¡A seguir intentándolo, ${nombre}! La práctica hace al maestro.`;
};

export const reiniciarPartida = () => {
  eliminarItemStorage(SESSION_KEY_J1);
  eliminarItemStorage(SESSION_KEY_J2);
  eliminarItemStorage(SESSION_KEY_NAME);
};

export const limpiarSesionTemporal = () => {
  limpiarSesionTemporalGlobal();
};