"use client";

import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";

interface PropertyMapProps {
  main_property: {
    lat: number;
    long: number;
    title: string;
  };
  relatives_properties: {
    lat: number;
    long: number;
    title: string;
  }[];
}

export default function PropertyMap({
  main_property,
  relatives_properties,
}: PropertyMapProps) {
  const LeafletMap = dynamic(() => import("@/components/PropertiesMap"), {
    ssr: false,
  });

  // const [isClient, setIsClient] = useState(false);
  return (
    <>
      <LeafletMap
        main_property={main_property}
        relatives_properties={relatives_properties}
      />
    </>
  );
}
