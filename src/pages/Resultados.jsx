
import React from "react";
import ContenidoPrincipal from "../components/EstructuraResultados";
import { useResultados } from "../hooks/useResultados";
import { useEntorno } from "../hooks/useEntorno";
import miJsonResultados from "../data/textosResultados.json";
import "../css/EstiloResultados.css";

const Resultados = () => {
  const { esIframe } = useEntorno("body-resultados");
  const dinamicos = useResultados();

  const paqueteMaestro = {
    ...miJsonResultados,
    dinamicos
  };

  return (
    <ContenidoPrincipal 
      fuenteDatos={paqueteMaestro} 
      esIframe={esIframe} 
    />
  );
};

export default Resultados;