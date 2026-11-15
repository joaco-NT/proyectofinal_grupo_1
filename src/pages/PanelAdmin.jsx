
// ==========================================
// CAPA DE PRESENTACIÓN / PÁGINA: Panel de Administración
// ==========================================
import React from "react";
import EstructuraAdmin from "../components/EstructuraAdmin";
import { usePanelAdmin } from "../hooks/usePanelAdmin";
import "../css/EstiloAdmin.css";

const PanelAdmin = () => {
  const {
    mostrarTabla,
    pantallaActiva,
    listaAlumnos,
    iframeRef,
    infoPantalla,
    irAlMenuDocente,
    seleccionarPantalla,
    manejarCierreSesion
  } = usePanelAdmin();

  return (
    <EstructuraAdmin
      mostrarTabla={mostrarTabla}
      pantallaActiva={pantallaActiva}
      listaAlumnos={listaAlumnos}
      iframeRef={iframeRef}
      infoPantalla={infoPantalla}
      alIrAlMenuDocente={irAlMenuDocente}
      alSeleccionarPantalla={seleccionarPantalla}
      alCerrarSesion={manejarCierreSesion}
    />
  );
};

export default PanelAdmin;