

import React from "react";
import ContenidoPrincipal from "../components/EstructuraJuego";
import { useJuego2 } from "../hooks/useJuego2";
import { useEntorno } from "../hooks/useEntorno";
import miJsonJuego2 from "../data/textosJuego2.json";
import "../css/EstiloJuegos.css";

const Juego2 = () => {
  const { esIframe } = useEntorno("body-juego2");
  const dinamicos = useJuego2();

  const paqueteMaestro = {
    ...miJsonJuego2,
    dinamicos
  };

  return (
    <ContenidoPrincipal 
      fuenteDatos={paqueteMaestro} 
      esIframe={esIframe} 
    />
  );
};

export default Juego2;