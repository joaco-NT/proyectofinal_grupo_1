
// ==========================================
// CAPA DE PRESENTACIÓN / PÁGINA: Inicio de Sesión
// ==========================================
import React from "react";
import EstructuraLogin from "../components/EstructuraLogin";
import { useInicioSesion } from "../hooks/useInicioSesion";
import "../css/EstiloLogin.css";

const InicioSesion = () => {
  const {
    esVistaPreviaEnIframe,
    credenciales,
    error,
    actualizarCampo,
    manejarComenzar
  } = useInicioSesion();

  return (
    <EstructuraLogin
      claseBaseEstilo="pantalla01"
      esVistaPreviaEnIframe={esVistaPreviaEnIframe}
      identificador={credenciales.identificador}
      password={credenciales.password}
      error={error}
      alCambiarIdentificador={actualizarCampo("identificador")}
      alCambiarPassword={actualizarCampo("password")}
      alHacerClickIngresar={manejarComenzar}
    />
  );
};

export default InicioSesion;