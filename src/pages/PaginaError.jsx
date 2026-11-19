
import React from "react";
import ContenidoPrincipal from "../components/EstructuraError";
import { usePaginaError } from "../hooks/usePaginaError";
import { useEntorno } from "../hooks/useEntorno";
import miJsonError from "../data/textosError.json";
import "../css/EstiloError.css";

const PaginaError = () => {
  useEntorno("body-error");
  const dinamicos = usePaginaError();

  const paqueteMaestro = {
    ...miJsonError,
    dinamicos
  };

  return <ContenidoPrincipal fuenteDatos={paqueteMaestro} />;
};

export default PaginaError;