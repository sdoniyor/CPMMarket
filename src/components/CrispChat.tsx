import { useEffect } from "react";

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function CrispChat(): null {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "cfd69891-8d8e-4a7b-8531-c5283de127d4";

    (function () {
      const d = document;
      const s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = true;

      d.head.appendChild(s);
    })();
  }, []);

  return null;
}