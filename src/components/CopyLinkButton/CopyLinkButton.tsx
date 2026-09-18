// components/CopyLinkButton.tsx
"use client";

import { useState } from "react";
import { MdCheck, MdLink } from "react-icons/md";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      alert("Enlace copiado al portapapeles.");
    }
  };

  return (
    <div className="pt-2 flex justify-center">
      <button
        type="button"
        onClick={copyShareLink}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-500 py-1.5 px-3 rounded-lg hover:bg-surface-subtle transition-colors"
      >
        {copied ? <MdCheck size={16} /> : <MdLink size={16} />}

        <span>
          {copied ? "¡Enlace copiado!" : "Copiar enlace de referencia"}
        </span>
      </button>
    </div>
  );
}
