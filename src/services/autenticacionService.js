
// ==========================================
// CAPA DE NEGOCIO: Autenticación y Credenciales
// ==========================================
import axios from "axios";
import { obtenerUsuariosTemp, guardarUsuariosTemp } from "./almacenamientoService";

const RUTA_POR_ROL = {
  admin: "/admin",
  alumno: "/juego1"
};

export const obtenerRutaSegunRol = (rol) => RUTA_POR_ROL[rol] || "/juego1";

export const obtenerUsuariosOficiales = async () => {
  const temporales = obtenerUsuariosTemp();
  if (temporales) return temporales;

  try {
    // Petición HTTP usando Axios en lugar de fetch
    const respuesta = await axios.get("/data/usuarios.json");
    const usuariosJSON = respuesta.data;

    const normalizados = usuariosJSON.map(u => ({
      ...u,
      juego1: u.juego1 ?? 0,
      juego2: u.juego2 ?? 0
    }));

    guardarUsuariosTemp(normalizados);
    return normalizados;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    return [];
  }
};

export const autenticarUsuario = async (identificadorIngresado, passwordIngresado = "", esModoPrueba = false) => {
  const usuarios = await obtenerUsuariosOficiales();
  const idLimpio = identificadorIngresado.trim();
  const idLimpioLower = idLimpio.toLowerCase();
  const passLimpio = String(passwordIngresado).trim();

  let usuarioEncontrado = usuarios.find(u => {
    const coincide = 
      (u.email && u.email.trim().toLowerCase() === idLimpioLower) ||
      (u.usuario && u.usuario.trim().toLowerCase() === idLimpioLower) ||
      (u.correo && u.correo.trim().toLowerCase() === idLimpioLower) ||
      (u.nombre && u.nombre.trim().toLowerCase() === idLimpioLower);

    if (!coincide) return false;

    if (u.rol === "admin") {
      return (
        (u.password !== undefined && String(u.password).trim() === passLimpio) ||
        (u.contrasena !== undefined && String(u.contrasena).trim() === passLimpio)
      );
    }
    return true;
  });

  if (!usuarioEncontrado && esModoPrueba && idLimpio) {
    const nuevoAlumnoTemporal = {
      id: Date.now(),
      usuario: idLimpio,
      nombre: idLimpio,
      rol: "alumno",
      juego1: 0,
      juego2: 0
    };
    usuarios.push(nuevoAlumnoTemporal);
    guardarUsuariosTemp(usuarios);
    usuarioEncontrado = nuevoAlumnoTemporal;
  }

  if (!usuarioEncontrado) {
    return {
      valido: false,
      error: "Credenciales incorrectas o usuario no registrado."
    };
  }

  return {
    valido: true,
    rol: usuarioEncontrado.rol || usuarioEncontrado.tipo,
    nombreProcesado: usuarioEncontrado.nombre || usuarioEncontrado.usuario
  };
};

export const validarCredenciales = autenticarUsuario;