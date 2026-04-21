"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

export default function VisualLoadingTrigger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // Cuando cambian los parámetros, activamos el preloader brevemente
    // o hasta que el nuevo contenido esté listo
    setIsChanging(true);

    const timeout = setTimeout(() => setIsChanging(false), 500); // Ajuste manual
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!isChanging) return <></>;

  return <Loading />;
}
