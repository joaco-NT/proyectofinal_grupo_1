
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Controla toda la interactividad del minijuego: rondas, temporizadores, puntajes y navegación.
 */
export const useJuego = (funcionObtenerRondas, funcionValidacion, guardarPuntaje, rutaSiguiente) => {
  const navegarRuta = useNavigate();

  const [estadoRondas, setEstadoRondas] = useState([]);
  const [estadoIndiceRonda, setEstadoIndiceRonda] = useState(0);
  const [estadoPuntaje, setEstadoPuntaje] = useState(0);
  const [estadoRetroalimentacion, setEstadoRetroalimentacion] = useState({ mensaje: "", claseCSS: "" });
  const [estadoJuegoTerminado, setEstadoJuegoTerminado] = useState(false);

  useEffect(() => {
    let estaMontado = true;
    async function cargarRondasAsincronas() {
      const rondasCargadas = await funcionObtenerRondas();
      if (estaMontado) {
        setEstadoRondas(rondasCargadas);
      }
    }
    cargarRondasAsincronas();
    return () => { estaMontado = false; };
  }, []);

  const rondaActual = estadoRondas[estadoIndiceRonda] || null;

  const manejarRespuestaSeleccionada = (opcionTexto) => {
    if (!rondaActual || !rondaActual.correcta) {
      return; 
    }

    const resultadoValidacion = funcionValidacion(opcionTexto, rondaActual.correcta, estadoPuntaje);
    
    setEstadoPuntaje(resultadoValidacion.nuevoPuntaje);
    setEstadoRetroalimentacion({ 
      mensaje: resultadoValidacion.mensaje, 
      claseCSS: resultadoValidacion.claseCSS 
    });

    setTimeout(() => {
      setEstadoRetroalimentacion({ mensaje: "", claseCSS: "" });
      
      setEstadoIndiceRonda((indiceActual) => {
        const siguienteIndice = indiceActual + 1;
        
        if (siguienteIndice < estadoRondas.length) {
          return siguienteIndice;
        } else {
          setEstadoJuegoTerminado(true);
          guardarPuntaje(Math.min(resultadoValidacion.nuevoPuntaje, 50));
          return indiceActual;
        }
      });
    }, 1200);
  };

  const manejarSiguienteJuego = () => {
    navegarRuta(rutaSiguiente);
  };

  return {
    rondaActual,
    puntaje: estadoPuntaje,
    retroalimentacion: estadoRetroalimentacion,
    juegoTerminado: estadoJuegoTerminado,
    manejarRespuesta: manejarRespuestaSeleccionada,
    manejarSiguienteJuego,
  };
};