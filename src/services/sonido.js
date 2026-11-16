
// ==========================================
// SERVICIO: Lógica y evaluación de sonidos (Universal para todos los botones)
// ==========================================

// Instancia única global para el sonido del cursor (con control anti-saturación)
const audioCursoGlobal = new Audio("/sounds/cursor.mp3");
audioCursoGlobal.volume = 0.4;

// Instancia única global para el clic (evita que se corte al cambiar de ruta o navegar)
const audioClickGlobal = new Audio("/sounds/click.mp3");
audioClickGlobal.volume = 1.0;

let ultimoTiempoAudio = 0;

// ==========================================
// 1. Sonido de Cursor (Hover) para cualquier botón
// ==========================================
export const reproducirSonidoCurso = () => {
  const tiempoActual = Date.now();

  // Si pasaron menos de 150 milisegundos, ignora para evitar ruidos raros al mover rápido el mouse
  if (tiempoActual - ultimoTiempoAudio < 150) {
    return;
  }

  ultimoTiempoAudio = tiempoActual;
  audioCursoGlobal.pause();         
  audioCursoGlobal.currentTime = 0; 
  audioCursoGlobal.play().catch(() => {});
};

// ==========================================
// 2. Sonido de Clic para cualquier botón
// ==========================================
export const evaluarYReproducirSonido = () => {
  // Reproduce al instante en cualquier botón sin restricciones de texto
  audioClickGlobal.pause();
  audioClickGlobal.currentTime = 0;
  audioClickGlobal.play().catch(() => {
    // Previene errores si el navegador restringe la reproducción automática
  });
};