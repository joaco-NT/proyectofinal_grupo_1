
import { useEffect } from "react";

export const useFondoPantalla = (claseBody) => {
  useEffect(() => {
    document.body.classList.add(claseBody);
    return () => document.body.classList.remove(claseBody);
  }, [claseBody]);
};