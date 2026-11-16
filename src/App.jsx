

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./css/EstiloGlobal.css";
import MusicaFondo from "./components/MusicaFondo"; 

export default function App() {
  const ubicacion = useLocation();

  useEffect(() => {
    
    if (window.self !== window.top) {
      window.parent.postMessage(
        { tipo: "CAMBIO_RUTA_IFRAME", pathname: ubicacion.pathname },
        "*"
      );
    }
  }, [ubicacion.pathname]);

  return (
    <div className="app-contenedor-principal">
      <MusicaFondo />

      <div key={ubicacion.pathname} className="transicion-pagina">
        <Outlet />
      </div>
    </div>
  );
}