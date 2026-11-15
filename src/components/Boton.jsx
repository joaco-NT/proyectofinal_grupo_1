import React from "react";

const Boton = ({ texto, disabled, alHacerClick, claseCSS }) => {
  return (
    <button 
      onClick={alHacerClick}
      disabled={disabled}
      className={claseCSS}
    >
      {texto}
    </button>
  );
};

export default Boton;