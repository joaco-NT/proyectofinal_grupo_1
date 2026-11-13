
// ==========================================
// CAPA DE PRESENTACIÓN / PÁGINA: Vista de Juego
// ==========================================
import React from "react";
import EstructuraJuego from "../components/EstructuraJuego";
import { useVistaJuego } from "../hooks/useVistaJuego";
import "../css/EstiloJuegos.css";

const VistaJuego = ({ esJuego1Prop, esVistaPrevia = false }) => {
  const {
    claseBaseEstilo,
    juegoTerminado,
    juegoActivo,
    juegoTerminadoDatos
  } = useVistaJuego(esJuego1Prop, esVistaPrevia);

  return (
    <div style={esVistaPrevia ? { transform: "scale(0.9)", transformOrigin: "top center", margin: "-10px 0" } : {}}>
      <EstructuraJuego
        claseBaseEstilo={claseBaseEstilo}
        juegoTerminado={juegoTerminado}
        juegoActivo={juegoActivo}
        juegoTerminadoDatos={juegoTerminadoDatos}
      />
    </div>
  );
};

export default VistaJuego;