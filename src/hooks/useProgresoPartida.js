
import { 
  procesarYGuardarNombre, 
  procesarYGuardarPuntajeJuego1, 
  procesarYGuardarPuntajeJuego2, 
  obtenerResumenPartida, 
  reiniciarPartida 
} from "../services/estadoJuego";

export const useProgresoPartida = () => {
  return {
    registrarNombre: procesarYGuardarNombre,
    registrarPuntajeJuego1: procesarYGuardarPuntajeJuego1,
    registrarPuntajeJuego2: procesarYGuardarPuntajeJuego2,
    obtenerResumen: obtenerResumenPartida,
    reiniciarProgreso: reiniciarPartida,
  };
};