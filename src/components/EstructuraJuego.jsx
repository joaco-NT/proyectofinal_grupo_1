

import React from "react";
import Boton from "./Boton";


const ContenidoPrincipal = ({ fuenteDatos = {}, esIframe = false }) => {
  return (
    <MacroEstructura datosCompartidos={fuenteDatos} esIframe={esIframe} />
  );
};


const MacroEstructura = ({ datosCompartidos }) => {
  const base = datosCompartidos?.dinamicos?.memoria?.claseBaseEstilo || "juego1";
  const juegoTerminado = datosCompartidos?.dinamicos?.efecto?.juegoTerminado || false;

  if (juegoTerminado) {
    return (
      <main className={base}>
        <MacroHeaderTerminado datos={datosCompartidos} base={base} />
        <MacroSectionTerminado datos={datosCompartidos} base={base} />
      </main>
    );
  }

  return (
    <main className={base}>
      <MacroHeaderActivo datos={datosCompartidos} base={base} />
      <MacroIndicador datos={datosCompartidos} base={base} />
      <MacroOpciones datos={datosCompartidos} base={base} />
    </main>
  );
};

const MacroHeaderActivo = ({ datos, base }) => (
  <header className={`${base}__caja-general`}>
    <MicroTituloActivo paquete={datos} base={base} />
  </header>
);

const MacroIndicador = ({ datos, base }) => (
  <section className={`${base}__caja-general`}>
    <MicroIndicador paquete={datos} base={base} />
  </section>
);

const MacroOpciones = ({ datos, base }) => (
  <section className={`${base}__caja-general`}>
    <MicroPregunta paquete={datos} base={base} />
    <MicroBotonesOpcion paquete={datos} base={base} />
    <MicroRetroalimentacion paquete={datos} />
  </section>
);

const MacroHeaderTerminado = ({ datos, base }) => (
  <header className={`${base}__caja-general`}>
    <MicroTituloTerminado paquete={datos} base={base} />
  </header>
);

const MacroSectionTerminado = ({ datos, base }) => (
  <section className={`${base}__caja-general`}>
    <MicroAccionTerminado paquete={datos} base={base} />
  </section>
);

const MicroTituloActivo = ({ paquete, base }) => {
  const { titulo } = paquete?.Bloque1 || {};
  return <h1 className={`${base}__titulo`}>{titulo}</h1>;
};

const MicroIndicador = ({ paquete, base }) => {
  const emojiUnico = paquete?.dinamicos?.memoria?.emojiUnico;
  const textoAnimal = paquete?.dinamicos?.memoria?.textoAnimal;

  return (
    <div className={`${base}__contenedor-indicador`}>
      <span className={`${base}__emoji-grande`}>{emojiUnico}</span>
      <span className={`${base}__texto-animal`}>{textoAnimal}</span>
    </div>
  );
};

const MicroPregunta = ({ paquete, base }) => {
  const { pregunta } = paquete?.Bloque1 || {};
  return <p className={`${base}__pregunta`}>{pregunta}</p>;
};

const MicroBotonesOpcion = ({ paquete, base }) => {
  const opciones = paquete?.dinamicos?.memoria?.opciones || [];
  const alElegirOpcion = paquete?.dinamicos?.accion?.alElegirOpcion;
  const mensajeRetro = paquete?.dinamicos?.efecto?.retroalimentacion?.mensaje || "";
  const estaBloqueado = Boolean(mensajeRetro);

  return (
    <div className={`${base}__grupo-botones`}>
      {opciones.map((opcionTexto, indice) => (
        <Boton
          key={indice}
          contenido={opcionTexto}
          bloqueado={estaBloqueado}
          accion={() => alElegirOpcion && alElegirOpcion(opcionTexto)}
          estilo={`${base}__boton-opcion`}
        />
      ))}
    </div>
  );
};

const MicroRetroalimentacion = ({ paquete }) => {
  const retro = paquete?.dinamicos?.efecto?.retroalimentacion || {};
  if (!retro.mensaje) return null;

  return <p className={`mensaje ${retro.claseCSS || ""}`}>{retro.mensaje}</p>;
};

const MicroTituloTerminado = ({ paquete, base }) => {
  const { tituloTerminado } = paquete?.Bloque2 || {};
  return <h1 className={`${base}__titulo`}>{tituloTerminado}</h1>;
};

const MicroAccionTerminado = ({ paquete, base }) => {
  const { preguntaTerminado, textoBotonSiguiente } = paquete?.Bloque2 || {};
  const alHacerClickSiguiente = paquete?.dinamicos?.accion?.alHacerClickSiguiente;

  return (
    <>
      <p className={`${base}__pregunta`}>{preguntaTerminado}</p>
      <Boton
        contenido={textoBotonSiguiente}
        bloqueado={false}
        accion={alHacerClickSiguiente}
        estilo={`${base}__boton-siguiente`}
      />
    </>
  );
};

export default ContenidoPrincipal;