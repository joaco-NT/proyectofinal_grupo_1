
// ==========================================
// COMPONENTE: Botón reutilizable (Con sonidos globales automáticos)
// ==========================================
import React from "react";
import { evaluarYReproducirSonido, reproducirSonidoCurso } from "../services/sonido";

export const Boton = ({ contenido, bloqueado, accion, estilo, alPasarCursor, title }) => {
  const manejarClick = (evento) => {
    evaluarYReproducirSonido(); // Reproduce el sonido de clic global

    if (accion !== undefined) {
      accion(evento);
    }
  };

  const manejarMouseEnter = (evento) => {
    reproducirSonidoCurso(); // 👈 Reproduce el sonido de cursor automáticamente en cualquier botón

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