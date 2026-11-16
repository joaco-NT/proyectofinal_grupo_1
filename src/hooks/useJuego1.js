
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cargarRondasJuego, guardarPuntajeJuego } from "../services/navegador";
import { evaluarRespuesta } from "../services/calculos";

export const useJuego1 = () => {
  const navigate = useNavigate();

  const [rondas, setRondas] = useState([]);
  const [indiceRonda, setIndiceRonda] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  const [retroalimentacion, setRetroalimentacion] = useState({ mensaje: "", claseCSS: "" });
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  useEffect(() => {
    let montado = true;
    cargarRondasJuego("/data/rondasJuego1.json").then((datos) => {
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

  const manejarRespuesta = (opcionTexto) => {
    if (retroalimentacion.mensaje !== "") return;

    const resultado = evaluarRespuesta(opcionTexto, rondaActual);
    const nuevoPuntaje = puntaje + resultado.puntosGanados;
    setPuntaje(nuevoPuntaje);

    setRetroalimentacion({
      mensaje: resultado.esCorrecta
        ? "🎉 Correcto. ¡El animal comió!"
        : "❌ Incorrecto. ¡Esa no es su comida!",
      claseCSS: resultado.esCorrecta
        ? "juego1__mensaje--correcto"
        : "juego1__mensaje--incorrecto"
    });

    setTimeout(() => {
      const siguienteIndice = indiceRonda + 1;
      if (siguienteIndice < rondas.length) {
        setIndiceRonda(siguienteIndice);
        setRetroalimentacion({ mensaje: "", claseCSS: "" });
      } else {
        setJuegoTerminado(true);
        guardarPuntajeJuego(1, nuevoPuntaje);
        setRetroalimentacion({ mensaje: "", claseCSS: "" });
      }
    }, 1200);
  };

  const manejarSiguienteJuego = () => {
    navigate("/juego2");
  };

  return {
    memoria: {
      claseBaseEstilo: "juego1",
      emojiUnico: rondaActual?.emoji || "⏳",
      textoAnimal: rondaActual?.animal || "Cargando juego...",
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