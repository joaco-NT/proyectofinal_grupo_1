
const audioCursoGlobal = new Audio("/sounds/cursor.mp3");
audioCursoGlobal.volume = 0.4;

const audioClickGlobal = new Audio("/sounds/click.mp3");
audioClickGlobal.volume = 1.0;

const audioCorrectoGlobal = new Audio("/sounds/Correcto.mp3");
audioCorrectoGlobal.volume = 0.8;

const audioIncorrectoGlobal = new Audio("/sounds/Incorrecto.mp3");
audioIncorrectoGlobal.volume = 0.8;

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

export const reproducirSonidoCorrecto = () => {

  audioCorrectoGlobal.pause();
  audioCorrectoGlobal.currentTime = 0;

  audioCorrectoGlobal.play().catch(() => {});
};

export const reproducirSonidoIncorrecto = () => {

  audioIncorrectoGlobal.pause();
  audioIncorrectoGlobal.currentTime = 0;

  audioIncorrectoGlobal.play().catch(() => {});

};