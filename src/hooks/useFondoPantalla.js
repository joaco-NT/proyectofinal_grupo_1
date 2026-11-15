
import { useEffect } from "react";

export const useFondoPantalla = (claseBody, esVistaPrevia = false) => {
  useEffect(() => {
    // Si estamos en el panel admin simulando, no cambiamos el fondo global del body
    if (esVistaPrevia) return;

    if (claseBody) {
      document.body.className = claseBody;
    }

    return () => {
      document.body.className = "";
    };
  }, [claseBody, esVistaPrevia]);
};