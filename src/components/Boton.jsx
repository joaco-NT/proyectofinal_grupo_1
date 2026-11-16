

import React from "react";
import { evaluarYReproducirSonido, reproducirSonidoCurso } from "../services/sonido";

export const Boton = ({ contenido, bloqueado, accion, estilo, alPasarCursor, title }) => {
  const manejarClick = (evento) => {
    evaluarYReproducirSonido();

    if (accion !== undefined) {
      accion(evento);
    }
  };

  const manejarMouseEnter = (evento) => {
    reproducirSonidoCurso(); 

    if (alPasarCursor !== undefined) {
      alPasarCursor(evento);
    }
  };

  return (
    <button 
      onClick={manejarClick}
      onMouseEnter={manejarMouseEnter}
      disabled={bloqueado}
      className={estilo}
      title={title}
    >
      {contenido}
    </button>
  );
};

export default Boton;