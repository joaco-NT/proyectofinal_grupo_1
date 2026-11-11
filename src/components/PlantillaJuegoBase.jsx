
// 1. Librerías por defecto
import React from "react";

// 2. Componentes visuales propios
import Boton from "./Boton";

const PlantillaJuegoBase = ({
  claseBaseEstilo,
  juegoTerminado,
  juegoActivo,
  juegoTerminadoDatos
}) => {

  // --- FUNCIONES INTERNAS (Estilo Escolar) ---

  const renderizarEncabezado = (textoTitulo) => (
    <header className={`${claseBaseEstilo}__caja-general`}>
      <h1 className={`${claseBaseEstilo}__titulo`}>{textoTitulo}</h1>
    </header>
  );

  const renderizarIndicadorVisual = () => {
    let emojiUnico = "";
    let textoAnimal = "";

    if (juegoActivo.estaCargando) {
      emojiUnico = "⏳";
      textoAnimal = "Cargando juego...";
    } else {
      const partes = (juegoActivo.emojiIndicadorTexto || "").split(" ");
      emojiUnico = partes[0] || "";
      textoAnimal = partes.slice(1).join(" ");
    }

    return (
      <section className={`${claseBaseEstilo}__caja-general`}>
        <div className={`${claseBaseEstilo}__contenedor-indicador`}>
          <span className={`${claseBaseEstilo}__emoji-grande`}>
            {emojiUnico}
          </span>
          {textoAnimal && (
            <span className={`${claseBaseEstilo}__texto-animal`}>
              {textoAnimal}
            </span>
          )}
        </div>
      </section>
    );
  };

  const renderizarAreaJuegoActivo = () => {
    const retro = juegoActivo.retroalimentacion || { mensaje: "", claseCSS: "" };

    return (
      <main className={claseBaseEstilo}>
        {renderizarEncabezado(juegoActivo.titulo)}
        {renderizarIndicadorVisual()}

        <section className={`${claseBaseEstilo}__caja-general`}>
          <p className={`${claseBaseEstilo}__pregunta`}>{juegoActivo.preguntaTexto}</p>

          <div className={`${claseBaseEstilo}__grupo-botones`}>
            {juegoActivo.opciones?.map((opcionTexto, indice) => (
              <Boton 
                key={indice} 
                texto={opcionTexto} 
                disabled={Boolean(retro.mensaje)} 
                alHacerClick={() => juegoActivo.manejarRespuesta(opcionTexto)} 
                claseCSS={`${claseBaseEstilo}__boton-opcion`}
              />
            ))}
          </div>

          {retro.mensaje && (
            <p className={`mensaje ${retro.claseCSS}`}>
              {retro.mensaje}
            </p>
          )}
        </section>
      </main>
    );
  };

  const renderizarAreaJuegoTerminado = () => (
    <main className={claseBaseEstilo}>
      {renderizarEncabezado("🎉 ¡Juego terminado!")}

      {/* <section className={`${claseBaseEstilo}__caja-general`}>
        <p className={`${claseBaseEstilo}__texto`}>Puntaje final: {juegoTerminadoDatos.puntajeFinal} / 50</p>
      </section> */}

      <section className={`${claseBaseEstilo}__caja-general`}>
        <p className={`${claseBaseEstilo}__pregunta`}>¿Listo para el siguiente reto?</p>
        <Boton 
          texto={juegoTerminadoDatos.textoBotonSiguiente} 
          alHacerClick={juegoTerminadoDatos.alHacerClickSiguiente} 
          claseCSS={`${claseBaseEstilo}__boton-siguiente`}
        />
      </section>
    </main>
  );

  // --- EVALUACIÓN PRINCIPAL ---
  return juegoTerminado ? renderizarAreaJuegoTerminado() : renderizarAreaJuegoActivo();
};

export default PlantillaJuegoBase;