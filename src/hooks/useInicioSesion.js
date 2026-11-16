

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../services/navegador";

export const useLogin = (esIframe) => { 
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({
    identificador: "",
    password: ""
  });
  
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");


  const actualizarCampo = (campo) => (e) => {
    const valor = e.target.value;
    setCredenciales((prev) => ({ ...prev, [campo]: valor }));
    if (error) setError(""); 
  };

  const manejarComenzar = async () => {
    if (!esIframe && (!credenciales.identificador || !credenciales.password)) {
      setError("⚠️ Por favor completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      setError("");

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