
// ==========================================
// PLANTILLA: RESULTADOS
// Arquitectura: Abuelo ➔ Macros ➔ Micros (Cero textos sueltos, cero estilos en línea)
// ==========================================
import React from "react";
import Boton from "./Boton";

// ------------------------------------------
// 1. EL ABUELO (Contenedor Raíz)
// ------------------------------------------
const ContenidoPrincipal = ({ fuenteDatos = {}, esIframe = false }) => {
  return (
    <MacroEstructura datosCompartidos={fuenteDatos} esIframe={esIframe} />
  );
};

// ------------------------------------------
// 2. LOS MACROS (Organizadores de Layout)
// ------------------------------------------
const MacroEstructura = ({ datosCompartidos }) => {
  const estaReiniciando = datosCompartidos?.dinamicos?.efecto?.estaReiniciando || false;

  if (estaReiniciando) {
    return (
      <main className="resultados">
        <MacroReiniciando datos={datosCompartidos} />
      </main>
    );
  }

  return (
    <main className="resultados">
      <MacroHeader datos={datosCompartidos} />
      <MacroJugador datos={datosCompartidos} />
      <MacroPuntajes datos={datosCompartidos} />
      <MacroFooter datos={datosCompartidos} />
    </main>
  );
};

const MacroReiniciando = ({ datos }) => (
  <>
    <header className="resultados__caja-general">
      <MicroTituloReiniciando paquete={datos} />
    </header>
    <section className="resultados__caja-general">
      <MicroMensajeReiniciando paquete={datos} />
    </section>
  </>
);

const MacroHeader = ({ datos }) => (
  <header className="resultados__caja-general">
    <MicroTitulo paquete={datos} />
  </header>
);

const MacroJugador = ({ datos }) => (
  <header className="resultados__caja-general">
    <MicroNombreJugador paquete={datos} />
  </header>
);

const MacroPuntajes = ({ datos }) => (
  <section className="resultados__caja-general">
    <MicroSubtitulo paquete={datos} />
    <MicroFilaPuntaje paquete={datos} claveTexto="etiquetaJuego1" claveValor="puntajeJuego1" maximo={50} />
    <MicroFilaPuntaje paquete={datos} claveTexto="etiquetaJuego2" claveValor="puntajeJuego2" maximo={50} />
    <MicroTotalPuntaje paquete={datos} />
    <MicroFelicitacion paquete={datos} />
  </section>
);

const MacroFooter = ({ datos }) => (
  <section className="resultados__caja-general">
    <MicroBotonReiniciar paquete={datos} />
  </section>
);

// ------------------------------------------
// 3. LOS MICROS (Átomos / Componentes Visuales Finales)
// ------------------------------------------
const MicroTituloReiniciando = ({ paquete }) => {
  const { tituloReiniciando } = paquete?.Bloque3 || {};
  return <h1 className="resultados__titulo">{tituloReiniciando}</h1>;
};

const MicroMensajeReiniciando = ({ paquete }) => {
  const { mensajeReiniciando } = paquete?.Bloque3 || {};
  return <p className="resultados__pregunta">{mensajeReiniciando}</p>;
};

const MicroTitulo = ({ paquete }) => {
  const { titulo } = paquete?.Bloque1 || {};
  return <h1 className="resultados__titulo">{titulo}</h1>;
};

const MicroNombreJugador = ({ paquete }) => {
  const nombre = paquete?.dinamicos?.memoria?.nombreJugador;
  return <p className="resultados__nombre">¡Felicitaciones, {nombre}!</p>;
};

const MicroSubtitulo = ({ paquete }) => {
  const { subtitulo } = paquete?.Bloque1 || {};
  return <h2 className="resultados__subtitulo">{subtitulo}</h2>;
};

const MicroFilaPuntaje = ({ paquete, claveTexto, claveValor, maximo }) => {
  const bloque = paquete?.Bloque1 || {};
  const valor = paquete?.dinamicos?.memoria?.[claveValor] ?? 0;

  return (
    <div className="resultados__resultado">
      <span>{bloque[claveTexto]}</span>
      <strong>{valor} / {maximo}</strong>
    </div>
  );
};

const MicroTotalPuntaje = ({ paquete }) => {
  const { etiquetaTotal } = paquete?.Bloque1 || {};
  const total = paquete?.dinamicos?.memoria?.puntajeTotal ?? 0;

  return (
    <div className="resultados__resultado-total">
      <span>{etiquetaTotal}</span>
      <strong>{total} / 100</strong>
    </div>
  );
};

const MicroFelicitacion = ({ paquete }) => {
  const mensaje = paquete?.dinamicos?.memoria?.mensajeFelicitacion || "";
  return <p className="resultados__felicitacion">{mensaje}</p>;
};

const MicroBotonReiniciar = ({ paquete }) => {
  const { textoBotonReiniciar } = paquete?.Bloque2 || {};
  const alReiniciar = paquete?.dinamicos?.accion?.alHacerClickReiniciar;
  const bloqueado = paquete?.dinamicos?.efecto?.estaReiniciando || false;

  return (
    <Boton
      contenido={textoBotonReiniciar}
      bloqueado={bloqueado}
      accion={alReiniciar}
      estilo="resultados__boton-reiniciar"
    />
  );
};

export default ContenidoPrincipal;