
// 1. Librerías por defecto
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 2. Componentes visuales propios
import Boton from "../components/Boton";

// 3. Motorización propia (servicios, hooks y estilos)
import { validarNombreJugador } from "../services/calculoPantalla01";
import { useFondoPantalla } from "../hooks/useFondoPantalla";
import { useProgresoPartida } from "../hooks/useProgresoPartida";
import "../css/EstiloPantalla01.css";

const Pantalla01 = () => {
  useFondoPantalla("body-pantalla01");

  const navigate = useNavigate();
  const { registrarNombre } = useProgresoPartida();
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  const manejarComenzar = () => {
    const resultado = validarNombreJugador(nombre);
    if (!resultado.valido) {
      setError(resultado.error);
      return;
    }
    registrarNombre(resultado.nombreProcesado);
    navigate("/juego1");
  };

  const manejarCambioInput = (e) => {
    setNombre(e.target.value);
    if (error) setError("");
  };

  // --- PREPARACIÓN DE DATOS PARA LA VISTA ---
  const claseBaseEstilo = "pantalla01";

  const datosFormulario = {
    tituloPrincipal: "🏡 ¡Aventura en la Granja!",
    preguntaTexto: "¿Cómo te llamas?",
    valorNombre: nombre,
    placeholderTexto: "Tu nombre aquí...",
    mensajeError: error,
    textoBoton: "¡Comenzar! 🚀",
    alCambiarNombre: manejarCambioInput,
    alHacerClickBoton: manejarComenzar
  };

  return (
    <EstructuraPantalla01
      claseBaseEstilo={claseBaseEstilo}
      datosFormulario={datosFormulario}
    />
  );
};

const EstructuraPantalla01 = ({ claseBaseEstilo, datosFormulario }) => {
  const renderizarEncabezado = (textoTitulo) => (
    <header className={`${claseBaseEstilo}__caja-general`}>
      <h1 className={`${claseBaseEstilo}__titulo`}>{textoTitulo}</h1>
    </header>
  );

  return (
    <main className={claseBaseEstilo}>
      {renderizarEncabezado(datosFormulario.tituloPrincipal)}

      <section className={`${claseBaseEstilo}__caja-general`}>
        <p className={`${claseBaseEstilo}__pregunta`}>{datosFormulario.preguntaTexto}</p>
        <input 
          type="text" 
          value={datosFormulario.valorNombre}
          onChange={datosFormulario.alCambiarNombre}
          placeholder={datosFormulario.placeholderTexto}
          className={`${claseBaseEstilo}__input-nombre`}
        />
        {datosFormulario.mensajeError && (
          <p className={`${claseBaseEstilo}__error`}>{datosFormulario.mensajeError}</p>
        )}
      </section>

      <section className={`${claseBaseEstilo}__caja-general`}>
        <Boton 
          texto={datosFormulario.textoBoton} 
          alHacerClick={datosFormulario.alHacerClickBoton} 
          claseCSS={`${claseBaseEstilo}__boton-comenzar`} 
        />
      </section>
    </main>
  );
};

export default Pantalla01;