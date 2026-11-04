
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Boton from "../components/Boton";

import {
  rondasJuego2,
  calcularPuntajeYValidacion,
} from "../services/calculoPantalla03.js";

import { guardarPuntajeJuego2 } from "../services/estadoJuego";

import "../css/EstiloPantalla03.css";

const Pantalla03 = () => {
  const navigate = useNavigate();

  // ==========================================
  // A. MEMORIA
  // ==========================================

  const [indiceRonda, setIndiceRonda] = useState(0);

  const [puntaje, setPuntaje] = useState(0);

  const [retroalimentacion, setRetroalimentacion] = useState({
    mensaje: "",
    claseCSS: "",
  });

  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const rondaActual = rondasJuego2[indiceRonda];

  // ==========================================
  // B. ACCIONES
  // ==========================================

  const manejarRespuesta = (opcionElegida) => {
    // Evita que se pueda responder más de una vez
    if (retroalimentacion.mensaje || juegoTerminado) {
      return;
    }

    const resultado = calcularPuntajeYValidacion(
      opcionElegida,
      rondaActual.intruso,
      puntaje
    );

    setPuntaje(resultado.nuevoPuntaje);

    setRetroalimentacion({
      mensaje: resultado.mensaje,
      claseCSS: resultado.claseCSS,
    });

    setTimeout(() => {
      setRetroalimentacion({
        mensaje: "",
        claseCSS: "",
      });

      if (indiceRonda + 1 < rondasJuego2.length) {
        setIndiceRonda((prev) => prev + 1);
      } else {
        setJuegoTerminado(true);

        guardarPuntajeJuego2(
          Math.min(resultado.nuevoPuntaje, 50)
        );
      }
    }, 2500);
  };

  const manejarVerResumen = () => {
    navigate("/resumen");
  };

  // ==========================================
  // C. EFECTOS
  // ==========================================

  useEffect(() => {
    document.body.classList.add("body-pantalla03");

    return () => {
      document.body.classList.remove("body-pantalla03");
    };
  }, []);

  // ==========================================
  // D. MAPA DE ESTADOS
  // ==========================================

  const estructurasPorEstado = {
    activo: (
      <EstructuraJuegoActivo
        rondaActual={rondaActual}
        indiceRonda={indiceRonda}
        puntaje={puntaje}
        retroalimentacion={retroalimentacion}
        manejarRespuesta={manejarRespuesta}
      />
    ),

    terminado: (
      <EstructuraJuegoTerminado
        puntaje={puntaje}
        alHacerClick={manejarVerResumen}
      />
    ),
  };

  // ==========================================
  // E. ESCENARIO
  // ==========================================

  return (
    <main className="pantalla03">
      {estructurasPorEstado[
        juegoTerminado ? "terminado" : "activo"
      ]}
    </main>
  );
};

// ==========================================
// PIEZAS VISUALES AUXILIARES
// ==========================================

// ESTRUCTURA 1: Juego activo

const EstructuraJuegoActivo = ({
  rondaActual,
  indiceRonda,
  puntaje,
  retroalimentacion,
  manejarRespuesta,
}) => (
  <>
    <header className="pantalla03__caja-general">
      <h1 className="pantalla03__titulo">
        🐄 Juego 2: El Intruso de la Granja
      </h1>

      <p className="pantalla03__pregunta">
        ¡Un animal que NO es de la granja se metió!
      </p>

      <p className="pantalla03__instruccion">
        Encontrá al intruso y sacalo de la granja.
      </p>
    </header>

    <section className="pantalla03__caja-general">
      <p className="pantalla03__progreso">
        Ronda {indiceRonda + 1} de {rondasJuego2.length}
      </p>

      <p className="pantalla03__puntaje">
        ⭐ Puntaje: {puntaje} / 50
      </p>
    </section>

    <section className="pantalla03__caja-general">
      <div className="pantalla03__grupo-animales">
        {rondaActual.animales.map((animal) => (
          <Boton
            key={animal.nombre}
            texto={
              <>
                <span className="pantalla03__emoji">
                  {animal.emoji}
                </span>

                <span className="pantalla03__nombre-animal">
                  {animal.nombre}
                </span>
              </>
            }
            disabled={Boolean(retroalimentacion.mensaje)}
            alHacerClick={() =>
              manejarRespuesta(animal.nombre)
            }
            claseCSS="pantalla03__boton-animal"
          />
        ))}
      </div>

      {retroalimentacion.mensaje && (
        <p
          className={`pantalla03__mensaje ${retroalimentacion.claseCSS}`}
        >
          {retroalimentacion.mensaje}
        </p>
      )}
    </section>
  </>
);

// ESTRUCTURA 2: Juego terminado

const EstructuraJuegoTerminado = ({
  puntaje,
  alHacerClick,
}) => (
  <>
    <header className="pantalla03__caja-general">
      <h1 className="pantalla03__titulo">
        🎉 ¡Juego terminado!
      </h1>
    </header>

    <section className="pantalla03__caja-general">
      <p className="pantalla03__texto">
        ¡Muy bien! Ayudaste a la granja.
      </p>

      <p className="pantalla03__puntaje-final">
        Puntaje final: {puntaje} / 50
      </p>
    </section>

    <section className="pantalla03__caja-general">
      <Boton
        texto="Ver mis resultados 🏆"
        alHacerClick={alHacerClick}
        claseCSS="pantalla03__boton-siguiente"
      />
    </section>
  </>
);

export default Pantalla03;