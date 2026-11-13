
// ==========================================
// LAYOUT RAÍZ / CONTENEDOR GENERAL DE RUTAS
// ==========================================
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./css/EstiloGlobal.css"; // Estilos base y transiciones transversales

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
      <div key={ubicacion.pathname} className="transicion-pagina">
        <Outlet />
      </div>
    </div>
  );
}