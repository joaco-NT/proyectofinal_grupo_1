
// ==========================================
// CUSTOM HOOK: useEntorno.js (Entorno Global e Iframe)
// ==========================================
import { useState, useEffect } from "react";

export const useEntorno = (claseBody = "body-login") => {
  const [esIframe] = useState(() => {
    return typeof window !== "undefined" && window.self !== window.top;
  });

  useEffect(() => {
    if (!esIframe && claseBody) {
      document.body.className = claseBody;
    }

    return () => {
      document.body.className = "";
    };
  }, [esIframe, claseBody]);

  return { esIframe };
};