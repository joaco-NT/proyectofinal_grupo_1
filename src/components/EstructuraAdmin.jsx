
// ==========================================
// CAPA DE PRESENTACIÓN: Estructura del Panel de Administración (SRP)
// ==========================================
import React from "react";
import Boton from "./Boton";

const EstructuraAdmin = ({
  mostrarTabla,
  pantallaActiva,
  listaAlumnos,
  iframeRef,
  infoPantalla,
  alIrAlMenuDocente,
  alSeleccionarPantalla,
  alCerrarSesion
}) => {
  // Diccionario interno para alternar entre la tabla de datos y el visor iframe
  const diccionarioVistasPanel = {
    tablaAlumnos: () => (
      <>
        <h2 className="admin-titulo-lista">Lista Alumno</h2>
        <div className="admin-tabla-wrapper">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Apellido / Nombre</th>
                <th>Juego1: Puntaje</th>
                <th>Juego2: Puntaje</th>
                <th>Total Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {listaAlumnos.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                    📭 No hay registros de alumnos todavía.
                  </td>
                </tr>
              ) : (
                listaAlumnos.map((alumno) => {
                  const j1 = alumno.juego1 ?? 0;
                  const j2 = alumno.juego2 ?? 0;
                  const total = j1 + j2;
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
    ),

    visorIframe: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#e3f2fd", padding: "5px 12px", borderRadius: "8px", border: "1px solid #90caf9" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0d47a1" }}>
            🖥️ {infoPantalla.titulo}
          </span>
          <button 
            onClick={alIrAlMenuDocente}
            style={{ background: "#fff", border: "1px solid #90caf9", padding: "2px 8px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "bold", color: "#1976d2" }}
          >
            ⬅️ Volver a Lista Alumno
          </button>
        </div>

        <div style={{ 
          width: "100%", 
          height: "312px",      
          border: "2px solid #90caf9", 
          borderRadius: "12px", 
          overflow: "hidden",   
          background: "#f8fbff", 
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
          position: "relative"
        }}>
          <iframe 
            ref={iframeRef}
            src={infoPantalla.ruta} 
            title={infoPantalla.titulo}
            style={{ 
              width: "1050px",        
              height: "650px",        
              transform: "translateX(-50%) scale(0.48)", 
              transformOrigin: "top center", 
              border: "none",
              position: "absolute",
              top: 0,
              left: "50%"             
            }}
          />
        </div>
      </div>
    )
  };

  const claveVistaActual = mostrarTabla ? "tablaAlumnos" : "visorIframe";

  return (
    <main className="admin-contenedor fade-in">
      <header className="admin-header">
        <div 
          className="admin-badge" 
          onClick={alIrAlMenuDocente} 
          style={{ cursor: "pointer" }}
          title="Volver a la lista de alumnos"
        >
          DOCENTE 🏠
        </div>
        <nav className="admin-tabs">
          {[1, 2, 3, 4].map((num) => (
            <button 
              key={num}
              className={`admin-tab ${!mostrarTabla && pantallaActiva === num ? "admin-tab--activo" : ""}`}
              onClick={() => alSeleccionarPantalla(num)}
            >
              Pantalla{num}
            </button>
          ))}
        </nav>
      </header>

      <section className="admin-seccion-lista">
        {diccionarioVistasPanel[claveVistaActual]()}
      </section>

      <footer className="admin-footer">
        <Boton 
          texto="Cerrar Sesión 🚪" 
          alHacerClick={alCerrarSesion} 
          claseCSS="pantalla01__boton-comenzar"
        />
      </footer>
    </main>
  );
};

export default EstructuraAdmin;