
// ==========================================
// CAPA DE PRESENTACIÓN: Estructura de Resultados (KISS & Diccionario)
// ==========================================
import React from "react";
import Boton from "./Boton";

const EstructuraResultados = ({
  claseBaseEstilo,
  estaReiniciando,
  resumen,
  puntajesFinales,
  mensajeFelicitacion,
  manejarJugarDeNuevo
}) => {
  
  const diccionarioVistas = {
    reiniciando: () => (
      <main className={claseBaseEstilo}>
        <header className={`${claseBaseEstilo}__caja-general`}>
          <h1 className={`${claseBaseEstilo}__titulo`}>🔄 Reiniciando...</h1>
        </header>
        <section className={`${claseBaseEstilo}__caja-general`}>
          <p className={`${claseBaseEstilo}__pregunta`}>Volviendo al inicio de la granja...</p>
        </section>
      </main>
    ),

    resultados: () => (
      <main className={claseBaseEstilo}>
        <header className={`${claseBaseEstilo}__caja-general`}>
          <h1 className={`${claseBaseEstilo}__titulo`}>🏆 ¡Aventura completada!</h1>
        </header>

        <header className={`${claseBaseEstilo}__caja-general`}>
          <p className={`${claseBaseEstilo}__nombre`}>¡Felicitaciones, {resumen.nombreJugador}!</p>
        </header>

        <section className={`${claseBaseEstilo}__caja-general`}>
          <h2 className={`${claseBaseEstilo}__subtitulo`}>Tus resultados</h2>
          
          <div className={`${claseBaseEstilo}__resultado`}>
            <span>🐮 Juego 1</span>
            <strong>{puntajesFinales.puntajeJuego1} / 50</strong>
          </div>
          
          <div className={`${claseBaseEstilo}__resultado`}>
            <span>🦁 Juego 2</span>
            <strong>{puntajesFinales.puntajeJuego2} / 50</strong>
          </div>
          
          <div className={`${claseBaseEstilo}__resultado-total`}>
            <span>⭐ Total</span>
            <strong>{puntajesFinales.puntajeTotal} / 100</strong>
          </div>

          <p className={`${claseBaseEstilo}__felicitacion`}>{mensajeFelicitacion}</p>
        </section>

        <section className={`${claseBaseEstilo}__caja-general`}>
          <Boton
            texto="¡Jugar de nuevo! 🚀"
            alHacerClick={manejarJugarDeNuevo}
            claseCSS={`${claseBaseEstilo}__boton-reiniciar`}
          />
        </section>
      </main>
    )
  };

  const claveVistaActual = estaReiniciando ? "reiniciando" : "resultados";
  return diccionarioVistas[claveVistaActual]();
};

export default EstructuraResultados;