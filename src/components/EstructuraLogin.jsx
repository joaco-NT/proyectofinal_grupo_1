
// ==========================================
// CAPA DE PRESENTACIÓN: Estructura de Login 
// ==========================================
import React from "react";
import Boton from "./Boton";

const EstructuraLogin = ({
  claseBaseEstilo,
  esVistaPreviaEnIframe,
  identificador,
  password,
  error,
  alCambiarIdentificador,
  alCambiarPassword,
  alHacerClickIngresar
}) => {
  return (
    <main 
      className={claseBaseEstilo} 
      style={esVistaPreviaEnIframe ? { position: "relative", minHeight: "auto", boxShadow: "none", width: "100%", margin: "0 auto" } : {}}
    >
      <header className={`${claseBaseEstilo}__caja-general`}>
        <h1 className={`${claseBaseEstilo}__titulo`}>🔐 Iniciar Sesión</h1>
      </header>

      <section className={`${claseBaseEstilo}__caja-general`}>
        <p className={`${claseBaseEstilo}__pregunta`}>Plataforma Educativa - Acceso de Usuarios</p>
        
        <input 
          type="text" 
          value={identificador}
          onChange={alCambiarIdentificador}
          placeholder="Correo institucional o usuario"
          className={`${claseBaseEstilo}__input-nombre`}
        />

        <input 
          type="password" 
          value={password}
          onChange={alCambiarPassword}
          placeholder="Contraseña"
          className={`${claseBaseEstilo}__input-nombre`}
          style={{ marginTop: "12px" }}
        />

        {error && (
          <p className={`${claseBaseEstilo}__error`}>{error}</p>
        )}
      </section>

      <section className={`${claseBaseEstilo}__caja-general`}>
        <Boton 
          texto="Ingresar" 
          alHacerClick={alHacerClickIngresar} 
          claseCSS={`${claseBaseEstilo}__boton-comenzar`} 
        />
      </section>
    </main>
  );
};

export default EstructuraLogin;