
// ==========================================
// PÁGINA: PanelAdmin (Cascarón Delgado)
// ==========================================
import React from "react";
import ContenidoPrincipal from "../components/EstructuraAdmin";
import { usePanelAdmin } from "../hooks/usePanelAdmin";
import { useEntorno } from "../hooks/useEntorno";
import miJsonAdmin from "../data/textosAdmin.json";
import "../css/EstiloAdmin.css";

const PanelAdmin = () => {
  const { esIframe } = useEntorno("body-admin");
  const dinamicos = usePanelAdmin();

  const paqueteMaestro = {
    ...miJsonAdmin,
    dinamicos
  };

  return (
    <ContenidoPrincipal 
      fuenteDatos={paqueteMaestro} 
      esIframe={esIframe} 
    />
  );
};

export default PanelAdmin;