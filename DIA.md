
# 📋 Reporte de Progreso General - ProyectoFinal

## 👤 Reporte de Progreso - Miembro 1

### 📒 Datos Generales
- **Estudiante:** Torrez Joaquin
- **Ejercicio Asignado:**
  - **Ejercicio 01:** Pantalla de Login (Validación y almacenamiento de nombre de usuario)
  - **Ejercicio 02:** Juego 1: ¡Hora de Comer! (Manejo de rondas, opciones aleatorias, puntaje y persistencia)


## 📁 Componentes (components/)

##  📄  `Boton.jsx`:
Componente de interfaz reutilizable diseñado para encapsular la estructura y el comportamiento de los botones de acción bajo una misma base homogénea.

##  📄  `PlantillaJuegoBase.jsx`:
se implento un componente estructural para unificar la interfaz de todos los minijuegos de la plataforma y evitar duplicar código de diseño entre pantallas.

Lo utilizan directamente las pantallas de juego (como Pantalla02.jsx y Pantalla03.jsx) para renderizar de forma uniforme tanto el estado activo de las preguntas como la pantalla final de puntajes.

## 📁 Estilos (css/)

##  📄  `EstiloGlobal.css`:
 Aplica de forma global para unificar los estilos transversales en todas las pantallas y componentes.

 Al importarse en la raíz, sus reglas se aplican de manera global a todo el proyecto, afectando a todas las pantallas (Pantalla01, Pantalla02, etc.) y componentes sin necesidad de importarlos individualmente en cada archivo.

##  📄  `trasiciones.css`:
Centraliza las reglas de animación, efectos de desvanecimiento y microinteracciones fluidas para los elementos interactivos.

Aporta dinamismo visual y suavidad en la respuesta de los botones, estados de carga y cambios de estado.

Se conectan directamente al archivo raíz o de entrada principal de la aplicación React (app.jsx).

Al importarse en la raíz, sus reglas se aplican de manera global a todo el proyecto, afectando a todas las pantallas (Pantalla01, Pantalla02, etc.) y componentes sin necesidad de importarlos individualmente en cada archivo.

## 📁 Hook (hooks/)

##  📄  `useFondoPantalla.js`:
Añade dinámicamente la clase CSS del cuerpo de la página al montarse y la limpia al desmontarse.

Se conecta directamente al objeto global document.body de cada pantalla para cambiar el fondo exclusivo.

Lo utilizan las pantallas de forma individual (Pantalla01, Pantalla02, etc.) para asignar el color de fondo correspondiente.

##  📄  `useJuego.js`:
Orquesta todo el ciclo de vida, las rondas asíncronas, el puntaje y las respuestas de los minijuegos.

Se conecta con los servicios de cálculo (calculoPantalla02.js y calculoPantalla03.js) y con react-router-dom para la navegación.

Lo utilizan directamente las pantallas de juego (Pantalla02.jsx y Pantalla03.jsx) para encapsular toda su lógica interactiva.

##  📄  `useProgresoPartida.js`:
Proporciona una interfaz limpia y desacoplada para leer y modificar el estado global de la partida.

Se conecta directamente con el módulo de almacenamiento global en memoria (estadoJuego.js).

Lo utilizan las pantallas principales (Pantalla01, Pantalla02, Pantalla03, Pantalla04) para registrar nombres, guardar puntajes y reiniciar el juego.

## 📁 Servicios (services/)

### ⚙️ `estadoJuego.js`:

El módulo que guarda en memoria la sesión actual con el nombre y los puntajes de los minijuegos.
Permite registrar y limitar los puntos mediante funciones seguras sin romper la reactividad.
Borra todo y deja los valores en cero cuando tocamos el botón de reiniciar la partida.

### ⚙️ `utilidades.js`:

Módulo de funciones auxiliares que centraliza la lógica compartida de procesamiento de datos, aleatoriedad y validación para los minijuegos.

Implementa el algoritmo de mezcla Fisher-Yates para el barajado estocástico de opciones y un servicio asíncrono genérico basado en fetch para la ingesta de recursos JSON.

Se importa directamente en calculoPantalla02.js y calculoPantalla03.js para reutilizar las funciones de carga de rondas y validación de respuestas.

Sirve como la base principal que le da soporte a los minijuegos de toda la aplicación sin tener que duplicar lógica.


## 📁 public (data/):

###  `rondasJuego1.json`:
Contiene el conjunto de datos estructurados en formato JSON con los animales, sus emojis y las opciones de comida correspondientes.

Define las rondas del primer minijuego interactivo sobre la alimentación correcta de los animales de la granja.

Se conecta directamente con el servicio calculoPantalla02.js a través de la función asíncrona que carga y procesa las rondas.

###  `rondasJuego1.json`:
Almacena las estructuras de datos en formato JSON con los grupos de opciones para identificar al animal intruso.

Define las rondas del segundo minijuego desafiando al usuario a reconocer elementos ajenos al entorno rural.

Se conecta directamente con el servicio calculoPantalla03.js mediante la función encargada de consumir y barajar las rondas.

### Archivos Creados:
- `src/css/EstiloPantalla03.css`
- `src/css/EstiloPantalla04.css`
- `src/pages/Pantalla03.jsx`
- `src/pages/Pantalla04.jsx`
- `src/services/calculoPantalla03.js`
- `src/componets/PlantillaJuegoBase.js`
- `src/hooks/useFondoPantalla.js`
- `src/hooks/useJuego.js`
- `src/hooks/useProgresoPartida.js`

### Archivos Modificados:
- `src/services/calculoPantalla01.js`
- `src/services/calculoPantalla02.js`
- `src/services/calculoPantalla03.js`
- `src/services/calculoPantalla04.js`
- `src/services/estadoJuego.js`
- `src/services/utilidades.js`

- **Archivos Eliminados:** N/A

## 🤖 Uso de Inteligencia Artificial

- **Uso de IA:**
  - [x] Sí
  - [ ] No

- **Forma de uso:** 
  - [ ] **Autogeneración IA:** Código completo hecho por la IA para copiar y pegar.
  - [ ] **Alto (Copiloto):** Trabajo en equipo constante con la IA.
  - [x] **Medio (Guía):** Consulta para resolver dudas y corregir errores.
  - [ ] **Bajo (Consulta puntual):** Ayuda rápida para resolver dudas menores.












## 👤 Reporte de Progreso - Miembro 2

### 📒 Datos Generales
- **Estudiante:** Gastón Flores
- **Ejercicio Asignado:**
  - **Ejercicio 03:** Juego 2: El Intruso de la Granja (Manejo de rondas, selección de animales, validación de respuestas y puntaje).
  - **Ejercicio 04:** Pantalla de resumen final (Visualización de puntajes y resultado total de la partida).


### 📄 `Pantalla03.jsx`:
Componente correspondiente al segundo juego de la aplicación, denominado "El Intruso de la Granja". Gestiona el desarrollo de las rondas mediante hooks de React como `useState` y `useEffect`, y utiliza `useNavigate` de `react-router-dom` para controlar la navegación.

El componente presenta diferentes grupos de animales y permite al jugador identificar cuál es el intruso. Al seleccionar una respuesta, valida si es correcta, muestra una retroalimentación visual y actualiza el puntaje. Al finalizar las rondas, guarda el puntaje obtenido mediante `guardarPuntajeJuego2` desde `estadoJuego.js` y redirige a la pantalla de resumen final.

### 📄 `Pantalla04.jsx`:
Componente encargado de mostrar el resumen final de la partida. Recupera los datos almacenados en el servicio `estadoJuego.js` mediante `obtenerResumenPartida()`.

Presenta el nombre del jugador, los puntajes obtenidos en ambos juegos y el puntaje total sobre 100 puntos. También muestra un mensaje de felicitación según el desempeño del jugador y permite reiniciar la partida mediante un botón que limpia los datos guardados y redirige a la pantalla inicial.

---

## 🛠️ Servicios (services/)

### ⚙️ `calculoPantalla03.js`:
Módulo encargado de centralizar la lógica del Juego 2, "El Intruso de la Granja".

- **rondasJuego2:** Arreglo que contiene las rondas del juego, con grupos de animales y la respuesta correcta.
- **calcularPuntajeYValidacion(opcionElegida, opcionCorrecta, puntajeActual):** Evalúa si el animal seleccionado es el intruso, determina si la respuesta es correcta y actualiza el puntaje.
- **prepararGuardadoFinal(puntajeFinal):** Controla el puntaje final para asegurar que no supere los 50 puntos establecidos como máximo para el juego.

### ⚙️ `estadoJuego.js`:
Servicio encargado de almacenar los datos generales de la partida en memoria.

Se utiliza para conservar el nombre del jugador y los puntajes obtenidos durante los juegos.

- **guardarNombreJugador(nombre):** Almacena el nombre del jugador.
- **guardarPuntajeJuego1(puntaje):** Registra el puntaje obtenido en el primer juego.
- **guardarPuntajeJuego2(puntaje):** Registra el puntaje obtenido en el segundo juego.
- **obtenerResumenPartida():** Devuelve una copia de los datos de la partida para que la pantalla de resultados pueda utilizarlos.
- **reiniciarPartida():** Restablece los datos de la partida para comenzar nuevamente.

---

## 📁 Gestión de Archivos

### Archivos Creados:
- `src/css/EstiloPantalla03.css`
- `src/css/EstiloPantalla04.css`
- `src/pages/Pantalla03.jsx`
- `src/pages/Pantalla04.jsx`
- `src/services/calculoPantalla03.js`

### Archivos Modificados:
- `src/services/estadoJuego.js`

### Archivos Eliminados:
- N/A


- **Forma de uso:**
  - [ ] **Autogeneración IA:** Código completo hecho por la IA para copiar y pegar.
  - [x] **Alto (Copiloto):** Trabajo en equipo constante con la IA.
  - [ ] **Medio (Guía):** Consulta para resolver dudas y corregir errores.
  - [ ] **Bajo (Consulta puntual):** Ayuda rápida para resolver dudas menores.



