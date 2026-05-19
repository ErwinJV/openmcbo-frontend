import { test, expect } from "@playwright/test";

test.describe("Display Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero section", async ({ page }) => {
    // Check if the landing page contains the expected text
    await expect(
      page.getByRole("heading", { name: "Conecta con tu propiedad ideal" }),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Buscar" })).toBeVisible();

    await expect(page.getByRole("button", { name: "Alquilar" })).toBeVisible();

    await expect(page.getByRole("button", { name: "Comprar" })).toBeVisible();
  });

  test("should display last posts section content", async ({ page }) => {
    // Check if the last posts section is visible
    await expect(
      page.getByRole("heading", { name: "Ultimas Publicaciones" }),
    ).toBeVisible();
    const buyLink = page.getByRole("link", {
      name: "¿Buscas comprar una propiedad?",
    });
    await expect(buyLink).toBeVisible();
    await expect(buyLink).toHaveAttribute(
      "href",
      "/inmuebles?type=HOUSE&status=SALE",
    );

    const rentLink = page.getByRole("link", {
      name: "Descubre sobre apartamentos en alquiler disponibles",
    });

    await expect(rentLink).toBeVisible();
    await expect(rentLink).toHaveAttribute(
      "href",
      "/inmuebles?type=APARTMENT&status=RENT",
    );
  });

  test("should display the available properties section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Listado de Propiedades" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Explora las Opciones disponibles" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Selecciona las propiedades disponibles y revisa sus detalles",
      ),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Mas Opciones" }),
    ).toBeVisible();
  });
});
