import { useEffect } from "react";

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function CrispChat() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "9a9f36b8-5de5-4614-934c-abf8b9ff226f";

    const script = document.createElement("script");

    script.src = "https://client.crisp.chat/l.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return null;
}