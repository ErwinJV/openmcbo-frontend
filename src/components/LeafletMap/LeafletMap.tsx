"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Solución para los iconos de marcador (problema común en Leaflet)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LeafletMapProps {
  lat: number;
  lng: number;
  address?: string;
  zoom?: number;
  height?: string;
}

// Componente para actualizar la vista del mapa cuando cambian las coordenadas
function MapUpdater({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], zoom || map.getZoom());
  }, [lat, lng, zoom, map]);

  return null;
}

export default function LeafletMap({
  lat,
  lng,
  address,
  zoom = 16,
  height = "400px",
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      style={{ height, width: "100%" }}
      ref={mapRef}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>
          <div>
            <strong>Ubicación</strong>
            <br />
            {address || "Dirección no disponible"}
            <br />
            <small>
              Coordenadas: {lat.toFixed(6)}, {lng.toFixed(6)}
            </small>
            <br />
            <a
              href={`https://www.google.com/maps?q=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Abrir en Google Maps
            </a>
          </div>
        </Popup>
      </Marker>

      <MapUpdater lat={lat} lng={lng} zoom={zoom} />
    </MapContainer>
  );
}
