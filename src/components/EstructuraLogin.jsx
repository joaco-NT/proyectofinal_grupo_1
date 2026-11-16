
import React from "react";
import Boton from "./Boton";
import { reproducirSonidoCurso } from "../services/sonido";


const ContenidoPrincipal = ({ fuenteDatos = {}, esIframe = false }) => {
  return (
    <Area_Estructura datosCompartidos={fuenteDatos} esIframe={esIframe} />
  );
};


const Area_Estructura = ({ datosCompartidos, esIframe }) => {
  return (
    <main className={`login ${esIframe ? "login--iframe" : ""}`}>
      <Area_Header datos={datosCompartidos} />
      <Area_Section datos={datosCompartidos} />
    </main>
  );
};

const Area_Header = ({ datos }) => (
  <header>
    <Pieza_Titulo paquete={datos} />
  </header>
);

const Area_Section = ({ datos }) => {
  const mensajeError = datos?.dinamicos?.efecto?.error;

  return (
    <>
      <section className="login__caja-general">
        <Pieza_Usuario paquete={datos} />
        <Pieza_Contraseña paquete={datos} />
        
        {mensajeError && <p className="login__error">{mensajeError}</p>}
      </section>

      <section className="login__caja-general">
        <Pieza_Boton paquete={datos} />
      </section>
    </>
  );
};

// ------------------------------------------
// 3. LAS PIEZAS (Átomos / Componentes Finales Visuales)
// Cada una utiliza exclusivamente sus clases CSS correspondientes
// ------------------------------------------

const Pieza_Titulo = ({ paquete }) => {
  const { titulo, subtitulo } = paquete?.Bloque1 || {}; 

  return (
    <div className="login__caja-general">
      <h1 className="login__titulo">{titulo || "Iniciar Sesión"}</h1>
      <p className="login__pregunta">{subtitulo || "Ingresa tus credenciales para continuar"}</p>
    </div>
  );
}; 

const Pieza_Usuario = ({ paquete }) => {
  const { etiquetaUsuario } = paquete?.Bloque2 || {}; 
  const valor = paquete?.dinamicos?.memoria?.identificador || "";
  const alCambiar = paquete?.dinamicos?.accion?.alCambiarIdentificador;

  return (
    <div className="input-grupo">
      <label className="login__pregunta">
              {etiquetaUsuario || "Usuario"}
      </label>
      <input 
              type="text" 
              className="login__input-nombre"
              value={valor} 
              onChange={alCambiar} 
              placeholder={etiquetaUsuario || "Usuario"} 
      />
    </div>
  );
}; 

const Pieza_Contraseña = ({ paquete }) => {
  const { etiquetaPassword } = paquete?.Bloque2 || {}; 
  const valor = paquete?.dinamicos?.memoria?.password || "";
  const alCambiar = paquete?.dinamicos?.accion?.alCambiarPassword;

  return (
    <div className="input-grupo login__input-password">

      <label className="login__pregunta">
              {etiquetaPassword || "Contraseña"}
      </label>
      <input 
              type="password" 
              className="login__input-nombre"
              value={valor} 
              onChange={alCambiar} 
              placeholder={etiquetaPassword || "Contraseña"}
      />
    </div>
  );
}; 

const Pieza_Boton = ({ paquete }) => {
  const { textoBoton } = paquete?.Bloque3 || {}; 
  const alHacerClick = paquete?.dinamicos?.accion?.alHacerClickIngresar;
  const cargando = paquete?.dinamicos?.efecto?.cargando;

  return (
    <div className="boton-grupo">
      <Boton
        contenido={cargando ? "Cargando..." : (textoBoton || "Ingresar")}
        bloqueado={cargando}
        accion={alHacerClick}
        alPasarCursor={() => reproducirSonidoCurso("Acceso")}
        estilo="login__boton-comenzar"
      />
    </div>
  );
};

export default ContenidoPrincipal;