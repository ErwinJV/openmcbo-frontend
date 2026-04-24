"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corregir los iconos de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface PropertyLocationInfo {
  lat: number;
  long: number;
  title: string;
}

interface PropertiesMapProps {
  main_property: PropertyLocationInfo;
  relatives_properties: PropertyLocationInfo[];
  height?: string;
}

export default function PropertiesMap({
  main_property,
  relatives_properties,
  height = "450px",
}: PropertiesMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const mainMarkerRef = useRef<L.Marker | null>(null);

  // Crear icono personalizado para la propiedad principal
  const createMainIcon = () => {
    return L.divIcon({
      className: "custom-main-marker",
      html: `
        <div style="
          background-color: #e74c3c;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          position: relative;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <div style="
              display: none;
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #e74c3c;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            border: 1px solid white;
          ">${main_property.title}</div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });
  };

  // Crear icono personalizado para propiedades relacionadas
  const createRelativeIcon = (title: string) => {
    return L.divIcon({
      className: "custom-relative-marker",
      html: `
        <div style="
          background-color: #3498db;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          position: relative;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
          <div style="
            display: none;  
            position: absolute;
            bottom: -22px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #3498db;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            border: 1px solid white;
          ">${title}</div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Crear el mapa centrado en la propiedad principal
    const map = L.map(mapContainerRef.current).setView(
      [main_property.lat, main_property.long],
      14,
    );

    // Agregar capa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Agregar marcador principal
    const mainMarker = L.marker([main_property.lat, main_property.long], {
      icon: createMainIcon(),
      zIndexOffset: 1000, // Asegurar que esté por encima
    }).addTo(map);

    mainMarker.bindPopup(`
      <div style="text-align: center;">
        <strong style="color: #e74c3c;">🏠 Propiedad Principal</strong><br/>
        <span style="font-size: 14px;">${main_property.title}</span>
      </div>
    `);

    // Agregar marcadores de propiedades relacionadas
    const relativeMarkers = relatives_properties.map((property) => {
      const marker = L.marker([property.lat, property.long], {
        icon: createRelativeIcon(property.title),
        zIndexOffset: 500,
      }).addTo(map);

      marker.bindPopup(`
        <div style="text-align: center;">
          <strong style="color: #3498db;">📍 Propiedad Relacionada</strong><br/>
          <span style="font-size: 14px;">${property.title}</span>
        </div>
      `);

      return marker;
    });

    // Crear un grupo de features para ajustar los límites del mapa
    const allCoordinates = [
      [main_property.lat, main_property.long],
      ...relatives_properties.map((p) => [p.lat, p.long]),
    ];

    // Ajustar el mapa para mostrar todos los marcadores
    if (allCoordinates.length > 1) {
      const bounds = L.latLngBounds(
        allCoordinates.map((coord) => L.latLng(coord[0], coord[1])),
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    mapRef.current = map;
    mainMarkerRef.current = mainMarker;
    markersRef.current = relativeMarkers;

    // Limpiar al desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        mainMarkerRef.current = null;
        markersRef.current = [];
      }
    };
  }, [main_property, relatives_properties]);

  // Actualizar el mapa si cambian las propiedades
  useEffect(() => {
    if (!mapRef.current) return;

    // Limpiar marcadores existentes
    markersRef.current.forEach((marker) => marker.remove());
    if (mainMarkerRef.current) {
      mainMarkerRef.current.remove();
    }

    // Agregar nuevo marcador principal
    const mainMarker = L.marker([main_property.lat, main_property.long], {
      icon: createMainIcon(),
      zIndexOffset: 1000,
    }).addTo(mapRef.current);

    mainMarker.bindPopup(`
      <div style="text-align: center;">
        <strong style="color: #e74c3c;">🏠 Propiedad Principal</strong><br/>
        <span style="font-size: 14px;">${main_property.title}</span>
      </div>
    `);

    // Agregar nuevos marcadores relacionados
    const relativeMarkers = relatives_properties.map((property) => {
      const marker = L.marker([property.lat, property.long], {
        icon: createRelativeIcon(property.title),
        zIndexOffset: 500,
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="text-align: center;">
          <strong style="color: #3498db;">📍 Propiedad Relacionada</strong><br/>
          <span style="font-size: 14px;">${property.title}</span>
        </div>
      `);

      return marker;
    });

    mainMarkerRef.current = mainMarker;
    markersRef.current = relativeMarkers;

    // Reajustar los límites del mapa
    const allCoordinates = [
      [main_property.lat, main_property.long],
      ...relatives_properties.map((p) => [p.lat, p.long]),
    ];

    if (allCoordinates.length > 1) {
      const bounds = L.latLngBounds(
        allCoordinates.map((coord) => L.latLng(coord[0], coord[1])),
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    } else {
      mapRef.current.setView([main_property.lat, main_property.long], 14);
    }
  }, [main_property, relatives_properties]);

  return (
    <div className="properties-map-wrapper" style={{ width: "100%" }}>
      <div
        ref={mapContainerRef}
        className="properties-map-container"
        style={{
          width: "100%",
          height: height,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          position: "relative", // Añadir position relative
          zIndex: 1, // Establecer un z-index bajo
        }}
      />
      <style jsx>{`
        .properties-map-wrapper {
          position: relative;
          width: 100%;
          z-index: 1; /* Asegurar que el wrapper tenga z-index bajo */
        }

        .properties-map-container {
          position: relative;
          z-index: 1;
        }

        /* Resetear z-index de elementos internos de Leaflet */
        .properties-map-container :global(.leaflet-map-pane) {
          z-index: 2 !important;
        }

        .properties-map-container :global(.leaflet-control) {
          z-index: 7 !important;
        }

        .properties-map-container :global(.leaflet-top),
        .properties-map-container :global(.leaflet-bottom) {
          z-index: 10 !important;
        }

        .properties-map-container :global(.leaflet-control-attribution) {
          font-size: 10px;
          z-index: 5 !important;
        }

        /* Asegurar que los popups aparezcan por encima de todo */
        .properties-map-container :global(.leaflet-popup) {
          z-index: 20 !important;
        }

        .properties-map-container :global(.leaflet-popup-pane) {
          z-index: 20 !important;
        }

        .properties-map-container :global(.custom-main-marker) {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
          z-index: 1000 !important;
        }

        .properties-map-container :global(.custom-relative-marker) {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          z-index: 500 !important;
        }

        .properties-map-container :global(.leaflet-container) {
          z-index: 1 !important;
        }

        /* Asegurar que el contenedor del mapa no se superponga a elementos flotantes */
        .properties-map-container :global(.leaflet-pane) {
          z-index: 1 !important;
        }

        .properties-map-container :global(.leaflet-overlay-pane) {
          z-index: 4 !important;
        }

        .properties-map-container :global(.leaflet-shadow-pane) {
          z-index: 5 !important;
        }

        .properties-map-container :global(.leaflet-marker-pane) {
          z-index: 6 !important;
        }

        .properties-map-container :global(.leaflet-tooltip-pane) {
          z-index: 7 !important;
        }
      `}</style>
    </div>
  );
}
