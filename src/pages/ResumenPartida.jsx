
// ==========================================
// CAPA DE PRESENTACIÓN / PÁGINA: Resumen de Partida
// ==========================================
import React from "react";
import EstructuraResultados from "../components/EstructuraResultados";
import { useResumenPartida } from "../hooks/useResumenPartida";
import "../css/EstiloResultados.css";

const ResumenPartida = ({ esVistaPrevia = false }) => {
  const {
    reiniciando,
    resumen,
    puntajesFinales,
    mensajeFelicitacion,
    manejarJugarDeNuevo
  } = useResumenPartida(esVistaPrevia);

  return (
    <div style={esVistaPrevia ? { transform: "scale(0.9)", transformOrigin: "top center", margin: "-10px 0" } : {}}>
      <EstructuraResultados
        claseBaseEstilo="pantalla04"
        estaReiniciando={reiniciando}
        resumen={resumen}
        puntajesFinales={puntajesFinales}
        mensajeFelicitacion={mensajeFelicitacion}
        manejarJugarDeNuevo={manejarJugarDeNuevo}
      />
    </div>
  );
};

export default ResumenPartida;