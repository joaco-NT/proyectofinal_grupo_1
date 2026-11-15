
// ==========================================
// CUSTOM HOOK: Lógica y Estado del Panel Admin
// ==========================================
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerListaAlumnos, limpiarSesionTemporal } from "../services/alumnoService";
import { useFondoPantalla } from "./useFondoPantalla";

const CONFIG_PANTALLAS = {
  1: { titulo: "Pantalla 1: Acceso / Registro Temporal", ruta: "/" },
  2: { titulo: "Pantalla 2: Juego 1 (¡Hora de Comer!)", ruta: "/juego1" },
  3: { titulo: "Pantalla 3: Juego 2 (El Intruso)", ruta: "/juego2" },
  4: { titulo: "Pantalla 4: Resumen de Resultados", ruta: "/resultados" }
};

const MAPA_RUTA_A_PANTALLA = {
  "/": 1,
  "/juego1": 2,
  "/juego2": 3,
  "/resultados": 4
};

export const usePanelAdmin = () => {
  useFondoPantalla("body-admin");
  const navigate = useNavigate();

  const [pantallaActiva, setPantallaActiva] = useState(1);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [listaAlumnos, setListaAlumnos] = useState([]);
  const iframeRef = useRef(null);

  useEffect(() => {
    let montado = true;
    if (mostrarTabla) {
      obtenerListaAlumnos().then((alumnos) => {
        if (montado) setListaAlumnos(alumnos);
      });
    }
    return () => { montado = false; };
  }, [mostrarTabla]);

  useEffect(() => {
    const manejarMensajeIframe = (event) => {
      if (event.data?.tipo === "CAMBIO_RUTA_IFRAME") {
        const numeroPantalla = MAPA_RUTA_A_PANTALLA[event.data.pathname];
        if (numeroPantalla) setPantallaActiva(numeroPantalla);
      }
    };

    window.addEventListener("message", manejarMensajeIframe);
    return () => window.removeEventListener("message", manejarMensajeIframe);
  }, []);

  const irAlMenuDocente = () => setMostrarTabla(true);

  const seleccionarPantalla = (num) => {
    setPantallaActiva(num);
    setMostrarTabla(false);
  };

  const manejarCierreSesion = () => {
    limpiarSesionTemporal();
    navigate("/");
  };

  const infoPantalla = CONFIG_PANTALLAS[pantallaActiva] || CONFIG_PANTALLAS[1];

  return {
    mostrarTabla,
    pantallaActiva,
    listaAlumnos,
    iframeRef,
    infoPantalla,
    irAlMenuDocente,
    seleccionarPantalla,
    manejarCierreSesion
  };
};