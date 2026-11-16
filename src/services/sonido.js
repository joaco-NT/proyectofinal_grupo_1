
const audioCursoGlobal = new Audio("/sounds/cursor.mp3");
audioCursoGlobal.volume = 0.4;

const audioClickGlobal = new Audio("/sounds/click.mp3");
audioClickGlobal.volume = 1.0;

let ultimoTiempoAudio = 0;

export const reproducirSonidoCurso = () => {
  const tiempoActual = Date.now();

  if (tiempoActual - ultimoTiempoAudio < 150) {
    return;
  }

  ultimoTiempoAudio = tiempoActual;
  audioCursoGlobal.pause();         
  audioCursoGlobal.currentTime = 0; 
  audioCursoGlobal.play().catch(() => {});
};

export const evaluarYReproducirSonido = () => {
  
  audioClickGlobal.pause();
  audioClickGlobal.currentTime = 0;
  audioClickGlobal.play().catch(() => {
    
  });
};