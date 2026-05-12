import "@testing-library/jest-dom";

import React, { ReactNode } from "react";

import { TransformStream } from "node:stream/web";

Object.defineProperty(global, "TransformStream", {
  writable: true,
  enumerable: true,
  configurable: true,
  value: TransformStream,
});

// Al no tener el mapper, Jest simplemente interceptará el string "swiper/react"
jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: ReactNode }) =>
    React.createElement("div", { "data-testid": "swiper-mock" }, children),
  SwiperSlide: ({ children }: { children: ReactNode }) =>
    React.createElement(
      "div",
      { "data-testid": "swiper-slide-mock" },
      children,
    ),
}));

jest.mock("swiper/modules", () => ({
  Navigation: () => null,
  Pagination: () => null,
  // añade otros si los usas
}));

jest.mock("swiper/css", () => ({}));

// ... el resto de los mocks de módulos y CSS se mantienen igual
// Mock de los módulos de Swiper (Navigation, Pagination, etc.)
jest.mock("swiper/modules", () => ({
  Navigation: () => null,
  Pagination: () => null,
  Scrollbar: () => null,
  Autoplay: () => null,
  EffectFade: () => null,
}));

// Mock de los estilos (evita errores de importación de CSS)
jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/navigation", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: "/",
    query: {},
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => "/",
}));
