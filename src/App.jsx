
// ==========================================
// LAYOUT RAÍZ / CONTENEDOR GENERAL DE RUTAS
// ==========================================
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./css/EstiloGlobal.css"; // Estilos base y transiciones transversales
import MusicaFondo from "./components/MusicaFondo"; // 👈 1. Importa el componente de música

export default function App() {
  const ubicacion = useLocation();

  useEffect(() => {
    // Si la aplicación está corriendo dentro de un iframe, notifica al Panel Admin el cambio de ruta en tiempo real
    if (window.self !== window.top) {
      window.parent.postMessage(
        { tipo: "CAMBIO_RUTA_IFRAME", pathname: ubicacion.pathname },
        "*"
      );
    }
  }, [ubicacion.pathname]);

  return (
    <div className="app-contenedor-principal">
      {/* 🎵 2. Renderiza la música de fondo para que esté presente globalmente */}
      <MusicaFondo />

      <div key={ubicacion.pathname} className="transicion-pagina">
        <Outlet />
      </div>
    </div>
  );
}