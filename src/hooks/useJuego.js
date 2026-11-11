
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useJuego = (funcionObtenerRondas, funcionValidacion, guardarPuntaje, rutaSiguiente) => {
  const navegarRuta = useNavigate();

  // --- A. Memoria ---
  const [estadoRondas, setEstadoRondas] = useState([]);
  const [estadoIndiceRonda, setEstadoIndiceRonda] = useState(0);
  const [estadoPuntaje, setEstadoPuntaje] = useState(0);
  const [estadoRetroalimentacion, setEstadoRetroalimentacion] = useState({ mensaje: "", claseCSS: "" });
  const [estadoJuegoTerminado, setEstadoJuegoTerminado] = useState(false);

  // Cargar las rondas de forma asíncrona al iniciar (una sola vez)
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
  }, []); // Dependencia vacía para evitar bucles si la función se recrea

  // Elemento actual de la ronda
  const rondaActual = estadoRondas[estadoIndiceRonda] || null;




  // --- B. Acciones ---
  const manejarRespuestaSeleccionada = (opcionTexto) => {
    // Protección: si no hay ronda cargada o la ronda ya no tiene respuesta correcta, ignorar
    if (!rondaActual || !rondaActual.correcta) {
      return; 
    }

    const resultadoValidacion = funcionValidacion(opcionTexto, rondaActual.correcta, estadoPuntaje);
    
    procesarEstadoInmediato(resultadoValidacion);
    programarSiguientePaso(resultadoValidacion);
  };

  const manejarSiguienteJuego = () => {
    navegarRuta(rutaSiguiente);
  };




  // --- C. Funciones Auxiliares ---
  const procesarEstadoInmediato = (resultadoValidacion) => {
    setEstadoPuntaje(resultadoValidacion.nuevoPuntaje);
    setEstadoRetroalimentacion({ 
      mensaje: resultadoValidacion.mensaje, 
      claseCSS: resultadoValidacion.claseCSS 
    });
  };

  const programarSiguientePaso = (resultadoValidacion) => {
    setTimeout(() => {
      setEstadoRetroalimentacion({ mensaje: "", claseCSS: "" });
      
      // Usamos el estado funcional (prev) para garantizar que leemos el índice correcto y evitar closures viejas
      setEstadoIndiceRonda((indiceActual) => {
        const siguienteIndice = indiceActual + 1;
        
        if (siguienteIndice < estadoRondas.length) {
          return siguienteIndice; // Avanza a la siguiente ronda
        } else {
          // Concluye el juego de forma segura
          setEstadoJuegoTerminado(true);
          guardarPuntaje(Math.min(resultadoValidacion.nuevoPuntaje, 50));
          return indiceActual; // Mantiene el índice al terminar
        }
      });
    }, 1200);
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