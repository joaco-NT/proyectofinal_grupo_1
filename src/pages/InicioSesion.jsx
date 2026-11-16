
import React from "react";
import ContenidoPrincipal from "../components/EstructuraLogin";
import { useLogin } from "../hooks/useInicioSesion";
import { useEntorno } from "../hooks/useEntorno";
import miJsonLogin from "../data/textosLogin.json";
import "../css/EstiloLogin.css";

const InicioSesion = () => {
  const { esIframe } = useEntorno("body-login");

  const dinamicos = useLogin(esIframe);

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