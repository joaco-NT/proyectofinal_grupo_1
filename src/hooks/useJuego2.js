
// ==========================================
// CUSTOM HOOK: useJuego2.js (Cerebro del Juego 2)
// ==========================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cargarRondasJuego, guardarPuntajeJuego } from "../services/navegador";
import { evaluarRespuesta } from "../services/calculos";

export const useJuego2 = () => {
  const navigate = useNavigate();

  // 1. MEMORIA
  const [rondas, setRondas] = useState([]);
  const [indiceRonda, setIndiceRonda] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  // 3. EFECTO
  const [retroalimentacion, setRetroalimentacion] = useState({ mensaje: "", claseCSS: "" });
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  useEffect(() => {
    let montado = true;
    cargarRondasJuego("/data/rondasJuego2.json").then((datos) => {
      if (montado) {
        setRondas(datos);
        setIndiceRonda(0);
        setPuntaje(0);
        setJuegoTerminado(false);
        setRetroalimentacion({ mensaje: "", claseCSS: "" });
      }
    });
    return () => {
      montado = false;
    };
  }, []);

  const rondaActual = rondas.length > 0 ? rondas[indiceRonda] : null;

  // 2. ACCIÓN
  const manejarRespuesta = (opcionTexto) => {
    if (retroalimentacion.mensaje !== "") return;

    const resultado = evaluarRespuesta(opcionTexto, rondaActual);
    const nuevoPuntaje = puntaje + resultado.puntosGanados;
    setPuntaje(nuevoPuntaje);

    setRetroalimentacion({
      mensaje: resultado.esCorrecta
        ? "🎉 Correcto. ¡Encontraste al intruso!"
        : "❌ Incorrecto. ¡Ese sí corresponde!",
      claseCSS: resultado.esCorrecta
        ? "juego2__mensaje--correcto"
        : "juego2__mensaje--incorrecto"
    });

    setTimeout(() => {
      const siguienteIndice = indiceRonda + 1;
      if (siguienteIndice < rondas.length) {
        setIndiceRonda(siguienteIndice);
        setRetroalimentacion({ mensaje: "", claseCSS: "" });
      } else {
        setJuegoTerminado(true);
        guardarPuntajeJuego(2, nuevoPuntaje);
        setRetroalimentacion({ mensaje: "", claseCSS: "" });
      }
    }, 1200);
  };

  const manejarSiguienteJuego = () => {
    navigate("/resultados");
  };

  return {
    memoria: {
      claseBaseEstilo: "juego2",
      emojiUnico: rondas.length > 0 ? "🕵️‍♂️" : "⏳",
      textoAnimal: rondas.length > 0 ? "¡Encuentra al intruso!" : "Cargando juego...",
      opciones: rondaActual?.opciones || [],
      puntajeFinal: puntaje
    },
    accion: {
      alElegirOpcion: manejarRespuesta,
      alHacerClickSiguiente: manejarSiguienteJuego
    },
    efecto: {
      juegoTerminado: juegoTerminado,
      estaCargando: rondaActual === null,
      retroalimentacion: retroalimentacion
    }
  };
};