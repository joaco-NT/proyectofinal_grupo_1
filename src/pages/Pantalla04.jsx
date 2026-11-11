
// 1. Librerías por defecto
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 2. Componentes visuales propios
import Boton from "../components/Boton";

// 3. Motorización propia (servicios, hooks y estilos)
import { obtenerMensajeFelicitacion, validarPuntajesFinales } from "../services/calculoPantalla04";
import { useFondoPantalla } from "../hooks/useFondoPantalla";
import { useProgresoPartida } from "../hooks/useProgresoPartida";
import "../css/EstiloPantalla04.css";

const Pantalla04 = () => {
  useFondoPantalla("body-pantalla04");

  const navigate = useNavigate();
  const { obtenerResumen, reiniciarProgreso } = useProgresoPartida();
  const [reiniciando, setReiniciando] = useState(false);

  const resumen = obtenerResumen();

  const { puntajeJuego1, puntajeJuego2, puntajeTotal } = validarPuntajesFinales(
    resumen.puntajeJuego1,
    resumen.puntajeJuego2
  );

  const mensajeFelicitacion = obtenerMensajeFelicitacion(puntajeTotal, resumen.nombreJugador);

  const manejarJugarDeNuevo = () => {
    setReiniciando(true);
    reiniciarProgreso();
    
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  // --- PREPARACIÓN DE DATOS PARA LA VISTA ---
  const claseBaseEstilo = "pantalla04";

  const datosResultados = {
    tituloPrincipal: "🏆 ¡Aventura completada!",
    subtituloNombre: `¡Felicitaciones, ${resumen.nombreJugador}!`,
    etiquetaSeccion: "Tus resultados",
    etiquetaJuego1: "🐮 Juego 1",
    etiquetaJuego2: "🦁 Juego 2",
    etiquetaTotal: "⭐ Total",
    etiquetaPorcentaje: "📈 Porcentaje de aciertos",
    puntajeJuego1,
    puntajeJuego2,
    puntajeTotal,
    porcentajeTotalTexto: `${puntajeTotal}%`,
    mensajeFelicitacion,
    textoBoton: "¡Jugar de nuevo! 🚀",
    alHacerClickBoton: manejarJugarDeNuevo
  };

  const datosReiniciando = {
    titulo: "🔄 Reiniciando...",
    mensaje: "Volviendo al inicio de la granja..."
  };

  return (
    <EstructuraPantalla04
      claseBaseEstilo={claseBaseEstilo}
      estaReiniciando={reiniciando}
      datosResultados={datosResultados}
      datosReiniciando={datosReiniciando}
    />
  );
};

const EstructuraPantalla04 = ({
  claseBaseEstilo,
  estaReiniciando,
  datosResultados,
  datosReiniciando
}) => {

  const renderizarEncabezado = (textoTitulo) => (
    <header className={`${claseBaseEstilo}__caja-general`}>
      <h1 className={`${claseBaseEstilo}__titulo`}>{textoTitulo}</h1>
    </header>
  );
  

  const renderizarAreaResultados = () => (
    <main className={claseBaseEstilo}>
      {renderizarEncabezado(datosResultados.tituloPrincipal)}

      <header className={`${claseBaseEstilo}__caja-general`}>
        <p className={`${claseBaseEstilo}__nombre`}>{datosResultados.subtituloNombre}</p>
      </header>

      <section className={`${claseBaseEstilo}__caja-general`}>
        <h2 className={`${claseBaseEstilo}__subtitulo`}>{datosResultados.etiquetaSeccion}</h2>
        
        <div className={`${claseBaseEstilo}__resultado`}>
          <span>{datosResultados.etiquetaJuego1}</span>
          <strong>{datosResultados.puntajeJuego1} / 50</strong>
        </div>
        
        <div className={`${claseBaseEstilo}__resultado`}>
          <span>{datosResultados.etiquetaJuego2}</span>
          <strong>{datosResultados.puntajeJuego2} / 50</strong>
        </div>
        
        <div className={`${claseBaseEstilo}__resultado-total`}>
          <span>{datosResultados.etiquetaTotal}</span>
          <strong>{datosResultados.puntajeTotal} / 100</strong>
        </div>

        <div className={`${claseBaseEstilo}__resultado`}>
          <span>{datosResultados.etiquetaPorcentaje}</span>
          <strong>{datosResultados.porcentajeTotalTexto}</strong>
        </div>
        
        <p className={`${claseBaseEstilo}__felicitacion`}>{datosResultados.mensajeFelicitacion}</p>
      </section>

      <section className={`${claseBaseEstilo}__caja-general`}>
        <Boton
          texto={datosResultados.textoBoton}
          alHacerClick={datosResultados.alHacerClickBoton}
          claseCSS={`${claseBaseEstilo}__boton-reiniciar`}
        />
      </section>
    </main>
  );

  const renderizarAreaReiniciando = () => (
    <main className={claseBaseEstilo}>
      {renderizarEncabezado(datosReiniciando.titulo)}

      <section className={`${claseBaseEstilo}__caja-general`}>
        <p className={`${claseBaseEstilo}__pregunta`}>{datosReiniciando.mensaje}</p>
      </section>
    </main>
  );

  return estaReiniciando ? renderizarAreaReiniciando() : renderizarAreaResultados();
};

export default Pantalla04;