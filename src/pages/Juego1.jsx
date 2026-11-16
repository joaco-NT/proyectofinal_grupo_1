
import React from "react";
import ContenidoPrincipal from "../components/EstructuraJuego";
import { useJuego1 } from "../hooks/useJuego1";
import { useEntorno } from "../hooks/useEntorno";
import miJsonJuego1 from "../data/textosJuego1.json";
import "../css/EstiloJuegos.css";

const Juego1 = () => {
  const { esIframe } = useEntorno("body-juego1");
  const dinamicos = useJuego1();

  const paqueteMaestro = {
    ...miJsonJuego1,
    dinamicos
  };

  return (
    <ContenidoPrincipal 
      fuenteDatos={paqueteMaestro} 
      esIframe={esIframe} 
    />
  );
};

export default Juego1;