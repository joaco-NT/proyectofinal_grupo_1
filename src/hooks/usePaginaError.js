
import { useNavigate } from "react-router-dom";

export const usePaginaError = () => {
  const navigate = useNavigate();

  const alHacerClickVolver = () => {
    navigate("/");
  };

  return {
    memoria: {},
    accion: {
      alHacerClickVolver: alHacerClickVolver
    },
    efecto: {}
  };
};