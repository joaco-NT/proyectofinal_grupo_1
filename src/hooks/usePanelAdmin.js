
// ==========================================
// CUSTOM HOOK: usePanelAdmin.js (Cerebro del Panel Docente)
// ==========================================
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerListaAlumnos, cerrarSesion } from "../services/navegador";
import { PANTALLAS_ALUMNO } from "../routes/Rutas";

export const usePanelAdmin = () => {
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  // 1. MEMORIA
  const [pantallaActiva, setPantallaActiva] = useState(1);
  const [listaAlumnos, setListaAlumnos] = useState([]);

  // 3. EFECTO
  const [mostrarTabla, setMostrarTabla] = useState(true);

  useEffect(() => {
    if (mostrarTabla) {
      obtenerListaAlumnos().then((alumnos) => {
        setListaAlumnos(alumnos);
      });
    }
  }, [mostrarTabla]);

  useEffect(() => {
    const manejarMensaje = (event) => {
      if (event.data?.tipo === "CAMBIO_RUTA_IFRAME") {
        const encontrada = PANTALLAS_ALUMNO.find((p) => p.ruta === event.data.pathname);
        if (encontrada) {
          setPantallaActiva(encontrada.numero);
        }
      }
    };

    window.addEventListener("message", manejarMensaje);
    return () => window.removeEventListener("message", manejarMensaje);
  }, []);

  // 2. ACCIÓN
  const irAlMenuDocente = () => {
    setMostrarTabla(true);
  };

  const seleccionarPantalla = (num) => {
    setPantallaActiva(num);
    setMostrarTabla(false);
  };

  const manejarCierreSesion = () => {
    cerrarSesion();
    navigate("/");
  };

  const infoPantalla =
    PANTALLAS_ALUMNO.find((p) => p.numero === pantallaActiva) || PANTALLAS_ALUMNO[0];

  return {
    memoria: {
      pantallaActiva: pantallaActiva,
      listaAlumnos: listaAlumnos,
      iframeRef: iframeRef,
      infoPantalla: infoPantalla
    },
    accion: {
      alIrAlMenuDocente: irAlMenuDocente,
      alSeleccionarPantalla: seleccionarPantalla,
      alCerrarSesion: manejarCierreSesion
    },
    efecto: {
      mostrarTabla: mostrarTabla
    }
  };
};