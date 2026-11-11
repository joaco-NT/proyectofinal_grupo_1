import { Outlet, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import "./css/transiciones.css";
import './css/EstiloGlobal.css';

export default function App() {
  const location = useLocation();

  return (
    <Container>
      <div key={location.pathname} className="transicion-pagina">
        <Outlet />
      </div>
    </Container>
  );
}