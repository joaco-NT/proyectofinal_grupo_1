
// ==========================================
// CUSTOM HOOK: Lógica y Estado de Inicio de Sesión
// ==========================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { procesarYGuardarNombre } from "../services/alumnoService";
import { autenticarUsuario, obtenerRutaSegunRol } from "../services/autenticacionService";
import { useFondoPantalla } from "./useFondoPantalla";

export const useInicioSesion = () => {
  const navigate = useNavigate();
  const [esVistaPreviaEnIframe, setEsVistaPreviaEnIframe] = useState(false);
  const [credenciales, setCredenciales] = useState({ identificador: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setEsVistaPreviaEnIframe(window.self !== window.top);
  }, []);

  useFondoPantalla("body-login", esVistaPreviaEnIframe);

  const actualizarCampo = (campo) => (e) => {
    setCredenciales((prev) => ({ ...prev, [campo]: e.target.value }));
    if (error) setError("");
  };

  const manejarComenzar = async () => {
    const { identificador, password } = credenciales;
    if (!identificador.trim()) {
      setError("Por favor, ingresa tu correo o usuario.");
      return;
    }

    const resultado = await autenticarUsuario(identificador, password, esVistaPreviaEnIframe);
    if (!resultado.valido) {
      setError(resultado.error);
      setCredenciales({ identificador: "", password: "" });
      return;
    }

    procesarYGuardarNombre(resultado.nombreProcesado);
    navigate(obtenerRutaSegunRol(resultado.rol));
  };

  return {
    esVistaPreviaEnIframe,
    credenciales,
    error,
    actualizarCampo,
    manejarComenzar
  };
};