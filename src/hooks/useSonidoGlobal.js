
// ==========================================
// CUSTOM HOOK: Control de sonidos globales
// ==========================================
import { useEffect } from "react";
import { reproducirSonidoClick } from "../services/sonido";

export const useSonidoGlobal = () => {
  useEffect(() => {
    document.addEventListener("click", reproducirSonidoClick);

    return () => {
      document.removeEventListener("click", reproducirSonidoClick);
    };
  }, []);
};