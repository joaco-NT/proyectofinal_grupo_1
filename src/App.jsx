
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./css/EstiloGlobal.css";
import MusicaFondo from "./components/MusicaFondo";

const RUTAS_VALIDAS = ["/", "/juego1", "/juego2", "/resultados", "/admin"];

const App = () => {
  const ubicacion = useLocation();
  const esRutaError = !RUTAS_VALIDAS.includes(ubicacion.pathname);

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
      {!esRutaError && <MusicaFondo />}

      <div key={ubicacion.pathname} className="transicion-pagina">
        <Outlet />
      </div>
    </div>
  );
};

export default App;