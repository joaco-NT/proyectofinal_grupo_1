
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import InicioSesion from "../pages/InicioSesion.jsx";
import VistaJuego from "../pages/VistaJuego.jsx";
import ResumenPartida from "../pages/ResumenPartida.jsx";
import PanelAdmin from "../pages/PanelAdmin.jsx";

export const rutas = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <InicioSesion /> },
      { path: "/juego1", element: <VistaJuego /> },
      { path: "/juego2", element: <VistaJuego /> },
      { path: "/resultados", element: <ResumenPartida /> },
      { path: "/admin", element: <PanelAdmin /> },
    ],
  },
]);