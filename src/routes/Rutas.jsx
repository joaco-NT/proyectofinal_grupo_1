
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import InicioSesion from "../pages/InicioSesion.jsx";
import Juego1 from "../pages/Juego1.jsx";
import Juego2 from "../pages/Juego2.jsx";
import Resultados from "../pages/Resultados.jsx";
import PanelAdmin from "../pages/PanelAdmin.jsx";

// Títulos limpios y directos para las pestañas del Panel Docente
export const PANTALLAS_ALUMNO = [
  { numero: 1, titulo: "Acceso", ruta: "/" },
  { numero: 2, titulo: "Juego 1", ruta: "/juego1" },
  { numero: 3, titulo: "Juego 2", ruta: "/juego2" },
  { numero: 4, titulo: "Resultados", ruta: "/resultados" }
];

export const rutas = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <InicioSesion /> },
      { path: "/juego1", element: <Juego1 /> },
      { path: "/juego2", element: <Juego2 /> },
      { path: "/resultados", element: <Resultados /> },
      { path: "/admin", element: <PanelAdmin /> },
    ],
  },
]);