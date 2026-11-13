
// ==========================================
// CAPA DE INFRAESTRUCTURA: Almacenamiento Local
// ==========================================
const SESSION_KEY_USERS = "usuarios_temp";
const SESSION_KEY_NAME = "nombreJugador";
const SESSION_KEY_J1 = "puntajeJuego1";
const SESSION_KEY_J2 = "puntajeJuego2";

export const obtenerItemStorage = (clave) => sessionStorage.getItem(clave);
export const guardarItemStorage = (clave, valor) => sessionStorage.setItem(clave, valor);
export const eliminarItemStorage = (clave) => sessionStorage.removeItem(clave);

export const obtenerUsuariosTemp = () => {
  const datos = sessionStorage.getItem(SESSION_KEY_USERS);
  return datos ? JSON.parse(datos) : null;
};

export const guardarUsuariosTemp = (usuarios) => {
  sessionStorage.setItem(SESSION_KEY_USERS, JSON.stringify(usuarios));
};

export const limpiarSesionTemporalGlobal = () => {
  // Al cerrar sesión: filtramos los usuarios temporales para BORRAR los nuevos 
  // (que usan Date.now()) y CONSERVAR únicamente los usuarios precargados oficiales (IDs 1 y 2).
  const usuariosActuales = obtenerUsuariosTemp();
  if (usuariosActuales) {
    const soloPrecargados = usuariosActuales.filter(u => u.id === 1 || u.id === 2);
    guardarUsuariosTemp(soloPrecargados);
  }

  // Limpiamos los datos de la partida activa actual
  sessionStorage.removeItem(SESSION_KEY_NAME);
  sessionStorage.removeItem(SESSION_KEY_J1);
  sessionStorage.removeItem(SESSION_KEY_J2);
};