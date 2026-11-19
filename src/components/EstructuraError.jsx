
import React from "react";
import Boton from "./Boton";

const ContenidoPrincipal = ({ fuenteDatos = {} }) => (
  <MacroEstructura datosCompartidos={fuenteDatos} />
);

const MacroEstructura = ({ datosCompartidos }) => (
  <main className="error-pantalla">
    <MacroHeader datos={datosCompartidos} />
    <MacroSection datos={datosCompartidos} />
    <MacroFooter datos={datosCompartidos} />
  </main>
);

const MacroHeader = ({ datos }) => (
  <header className="error-pantalla__encabezado">
    <MicroCodigo datos={datos} />
    <MicroTitulo datos={datos} />
  </header>
);

const MacroSection = ({ datos }) => (
  <section className="error-pantalla__cuerpo">
    <MicroEmoji datos={datos} />
    <MicroMensaje datos={datos} />
  </section>
);

const MacroFooter = ({ datos }) => (
  <footer className="error-pantalla__pie">
    <MicroBotonVolver datos={datos} />
  </footer>
);

const MicroCodigo = ({ datos }) => {
  const { codigo } = datos?.Bloque1 || {};
  return <span className="error-pantalla__codigo">{codigo}</span>;
};

const MicroTitulo = ({ datos }) => {
  const { titulo } = datos?.Bloque1 || {};
  return <h1 className="error-pantalla__titulo">{titulo}</h1>;
};

const MicroEmoji = ({ datos }) => {
  const { emoji } = datos?.Bloque1 || {};
  return <div className="error-pantalla__emoji">{emoji}</div>;
};

const MicroMensaje = ({ datos }) => {
  const { mensaje } = datos?.Bloque1 || {};
  return <p className="error-pantalla__mensaje">{mensaje}</p>;
};

const MicroBotonVolver = ({ datos }) => {
  const { textoBotonVolver } = datos?.Bloque2 || {};
  const alVolver = datos?.dinamicos?.accion?.alHacerClickVolver;

  return (
    <Boton
      contenido={textoBotonVolver}
      bloqueado={false}
      accion={alVolver}
      estilo="error-pantalla__boton"
    />
  );
};

export default ContenidoPrincipal;