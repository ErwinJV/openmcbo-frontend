import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

jest.mock("@/graphql/client", () => ({
  getClient: jest.fn(() => ({
    // Simulamos que query devuelve una promesa con la data esperada
    query: jest.fn().mockResolvedValue({
      data: {
        properties: [], // O añade algunos datos de prueba si quieres ver algo real
      },
    }),
  })),
  // También mockeamos gql por si se usa directamente
  gql: (strings: any) => strings,
}));

it("renders home page", async () => {
  const ResolvedHome = await Home();
  render(ResolvedHome);

  expect(screen.getByText("Co")).toBeInTheDocument();
});
