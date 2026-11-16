
// ==========================================
// PLANTILLA: PANEL ADMIN / DOCENTE
// Arquitectura: Abuelo ➔ Macros ➔ Micros (Cero estilos en línea)
// ==========================================
import React from "react";
import Boton from "./Boton";
import { evaluarYReproducirSonido, reproducirSonidoCurso } from "../services/sonido";
import { calcularPuntajeTotal } from "../services/calculos";
import { PANTALLAS_ALUMNO } from "../routes/Rutas";

// ------------------------------------------
// 1. EL ABUELO (Contenedor Raíz)
// ------------------------------------------
const ContenidoPrincipal = ({ fuenteDatos = {}, esIframe = false }) => {
  return (
    <MacroEstructura datosCompartidos={fuenteDatos} esIframe={esIframe} />
  );
};

// ------------------------------------------
// 2. LOS MACROS (Organizadores de Layout)
// ------------------------------------------
const MacroEstructura = ({ datosCompartidos }) => {
  return (
    <main className="admin-contenedor fade-in">
      <MacroHeader datos={datosCompartidos} />
      <MacroSection datos={datosCompartidos} />
      <MacroFooter datos={datosCompartidos} />
    </main>
  );
};

const MacroHeader = ({ datos }) => (
  <header className="admin-header">
    <MicroInsigniaDocente paquete={datos} />
    <MicroTabsPantallas paquete={datos} />
  </header>
);

const MacroSection = ({ datos }) => {
  const mostrarTabla = datos?.dinamicos?.efecto?.mostrarTabla ?? true;

  return (
    <section className="admin-seccion-lista">
      {mostrarTabla ? (
        <MicroTablaAlumnos paquete={datos} />
      ) : (
        <MicroVistaPreviaIframe paquete={datos} />
      )}
    </section>
  );
};

const MacroFooter = ({ datos }) => (
  <footer className="admin-footer">
    <MicroBotonCerrar paquete={datos} />
  </footer>
);

// ------------------------------------------
// 3. LOS MICROS (Átomos / Componentes Visuales Finales)
// ------------------------------------------
const MicroInsigniaDocente = ({ paquete }) => {
  const { insigniaDocente, tooltipInsignia } = paquete?.Bloque1 || {};
  const alIrAlMenuDocente = paquete?.dinamicos?.accion?.alIrAlMenuDocente;

  return (
    <div
      className="admin-badge"
      onClick={() => {
        evaluarYReproducirSonido();
        if (alIrAlMenuDocente) alIrAlMenuDocente();
      }}
      onMouseEnter={() => reproducirSonidoCurso()}
      title={tooltipInsignia}
    >
      {insigniaDocente}
    </div>
  );
};

const MicroTabsPantallas = ({ paquete }) => {
  const mostrarTabla = paquete?.dinamicos?.efecto?.mostrarTabla ?? true;
  const pantallaActiva = paquete?.dinamicos?.memoria?.pantallaActiva || 1;
  const alSeleccionarPantalla = paquete?.dinamicos?.accion?.alSeleccionarPantalla;

  return (
    <nav className="admin-tabs">
      {PANTALLAS_ALUMNO.map((item) => {
        const esActivo = !mostrarTabla && pantallaActiva === item.numero;
        return (
          <Boton
            key={item.numero}
            contenido={item.titulo}
            bloqueado={false}
            accion={() => {
              if (alSeleccionarPantalla) alSeleccionarPantalla(item.numero);
            }}
            estilo={`admin-tab ${esActivo ? "admin-tab--activo" : ""}`}
          />
        );
      })}
    </nav>
  );
};

const MicroTablaAlumnos = ({ paquete }) => {
  const { tituloTabla, columnas, mensajeTablaVacia } = paquete?.Bloque2 || {};
  const listaAlumnos = paquete?.dinamicos?.memoria?.listaAlumnos || [];

  return (
    <>
      <h2 className="admin-titulo-lista">{tituloTabla}</h2>
      <div className="admin-tabla-wrapper">
        <table className="admin-tabla">
          <thead>
            <tr>
              {columnas?.map((columnaTexto, indice) => (
                <th key={indice}>{columnaTexto}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listaAlumnos.length === 0 ? (
              <tr>
                <td colSpan="4" className="admin-tabla-vacia">
                  {mensajeTablaVacia}
                </td>
              </tr>
            ) : (
              listaAlumnos.map((alumno) => {
                const j1 = alumno.juego1 ?? 0;
                const j2 = alumno.juego2 ?? 0;
                const total = calcularPuntajeTotal(j1, j2);

                return (
                  <tr key={alumno.id}>
                    <td>{alumno.nombre}</td>
                    <td>{j1} pts</td>
                    <td>{j2} pts</td>
                    <td><strong>{total} pts</strong></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const MicroVistaPreviaIframe = ({ paquete }) => {
  const iframeRef = paquete?.dinamicos?.memoria?.iframeRef;
  const infoPantalla = paquete?.dinamicos?.memoria?.infoPantalla || {};

  return (
    <div className="admin-iframe-container">
      <div className="admin-iframe-wrapper-box">
        <iframe
          ref={iframeRef}
          src={infoPantalla?.ruta}
          title={infoPantalla?.titulo}
          allow="autoplay"
          className="admin-iframe-preview"
        />
      </div>
    </div>
  );
};

const MicroBotonCerrar = ({ paquete }) => {
  const { textoBotonCerrar } = paquete?.Bloque3 || {};
  const alCerrarSesion = paquete?.dinamicos?.accion?.alCerrarSesion;

  return (
    <Boton
      contenido={textoBotonCerrar}
      bloqueado={false}
      accion={alCerrarSesion}
      estilo="admin-boton-cerrar"
    />
  );
};

export default ContenidoPrincipal;