"use client";

import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";

interface PropertyMapProps {
  lat: number;
  long: number;
}

export default function PropertyMap({ lat, long }: PropertyMapProps) {
  const LeafletMap = dynamic(
    () => import("../../components/LeafletMap/LeafletMap"),
    {
      ssr: false,
      loading: () => (
        <div
          style={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Cargando mapa...
        </div>
      ),
    }
  );
  return (
    <>
      <LeafletMap lat={lat} lng={long} />
    </>
  );
}
