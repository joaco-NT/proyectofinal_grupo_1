
// ==========================================
// CUSTOM HOOK: useLogin.js (Cerebro del Login)
// ==========================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../services/navegador";

export const useLogin = (esIframe) => { // 👈 1. Recibe si es iframe desde InicioSesion.jsx
  const navigate = useNavigate();

  // 1. MEMORIA
  const [credenciales, setCredenciales] = useState({
    identificador: "",
    password: ""
  });
  
  // 3. EFECTO
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // 2. ACCIÓN
  const actualizarCampo = (campo) => (e) => {
    const valor = e.target.value;
    setCredenciales((prev) => ({ ...prev, [campo]: valor }));
    if (error) setError(""); 
  };

  const manejarComenzar = async () => {
    // Si no es iframe, exigimos que rellene los campos
    if (!esIframe && (!credenciales.identificador || !credenciales.password)) {
      setError("⚠️ Por favor completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      setError("");

      // 🚀 2. Enviamos la bandera 'esIframe' a tu iniciarSesion() existente
      const resultado = await iniciarSesion(
        credenciales.identificador, 
        credenciales.password,
        esIframe
      );

      if (resultado.valido === false) {
        setError("❌ Credenciales incorrectas o usuario no encontrado.");
        setCredenciales({ identificador: "", password: "" });
        setCargando(false);
        return;
      }

      navigate(resultado.rutaDestino || "/inicio");

    } catch (err) {
      setError("⚠️ Ocurrió un error al intentar iniciar sesión.");
      setCargando(false);
    }
  };

  return {
    memoria: {
      identificador: credenciales.identificador,
      password: credenciales.password
    },
    accion: {
      alCambiarIdentificador: actualizarCampo("identificador"),
      alCambiarPassword: actualizarCampo("password"),
      alHacerClickIngresar: manejarComenzar
    },
    efecto: {
      error: error,
      cargando: cargando
    }
  };
};