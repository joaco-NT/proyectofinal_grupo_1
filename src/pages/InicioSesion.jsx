
// ==========================================
// PÁGINA: Inicio de Sesión (Cascarón Delgado)
// ==========================================
import React from "react";
import ContenidoPrincipal from "../components/EstructuraLogin";
import { useLogin } from "../hooks/useInicioSesion";
import { useEntorno } from "../hooks/useEntorno";
import miJsonLogin from "../data/textosLogin.json";
import "../css/EstiloLogin.css";

const InicioSesion = () => {
  // 1. Hook especialista en el entorno (detecta el iframe y cambia el body)
  const { esIframe } = useEntorno("body-login");

  // 2. Hook especialista en el negocio (Memoria, Acción y Efecto)
  const dinamicos = useLogin(esIframe);

  // 3. Paquete maestro que une los textos estáticos con la lógica dinámica
  const paqueteMaestro = {
    ...miJsonLogin,
    dinamicos
  };

  return (
    <ContenidoPrincipal 
      fuenteDatos={paqueteMaestro} 
      esIframe={esIframe} 
    />
  );
};

export default InicioSesion;