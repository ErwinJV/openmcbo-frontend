"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";

interface TextWithFadeProps {
  children: ReactNode;
  maxHeight?: string;
  buttonComponent?: React.ComponentType<{
    onClick: () => void;
    isExpanded: boolean;
  }>;
}

export default function TextFade({
  children,
  maxHeight = "100px",
  buttonComponent: ButtonComponent,
}: TextWithFadeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      const clientHeight = contentRef.current.clientHeight;

      setCanExpand(scrollHeight > clientHeight);
    }
  }, [children, maxHeight]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const containerStyle = isExpanded ? {} : { maxHeight };

  return (
    <div className="text-fade-container">
      {/* Text container with fade effect */}
      <div
        ref={contentRef}
        style={containerStyle}
        className={`text-content-wrapper ${
          !isExpanded && "text-content-collapsed"
        }`}
      >
        <div className="text-content">{children}</div>

        {/* Fade overlay - only visible when collapsed */}
        {!isExpanded && canExpand && <div className="fade-overlay"></div>}
      </div>

      {/* Toggle button area */}
      {canExpand && (
        <div className="button-wrapper">
          {ButtonComponent ? (
            <div className="self-center w-auto">
              <ButtonComponent
                onClick={toggleExpanded}
                isExpanded={isExpanded}
              />
            </div>
          ) : (
            // Add button - botón temporal que reemplazarás
            <div className="w-50">
              <button onClick={toggleExpanded} className="toggle-btn">
                {isExpanded ? "Mostrar menos" : "Mostrar más"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
