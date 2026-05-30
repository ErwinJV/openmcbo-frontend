import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Navigation to Property Details from Hero section (search input)", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Alquilar" }).click();
    await page
      .getByRole("textbox", { name: "Buscar por Ubicación, Título" })
      .click();
    await page
      .getByRole("textbox", { name: "Buscar por Ubicación, Título" })
      .fill("Bayona");
    await page.getByRole("button", { name: "Buscar" }).click();
    const page1Promise = page.waitForEvent("popup");
    const linkProperty = page.getByRole("link", {
      name: "Apartamento en Alquiler en",
    });
    const href = await linkProperty.getAttribute("href");
    await expect(href).toBeTruthy();
    await linkProperty.click();

    const page1 = await page1Promise;
    await expect(page1).toHaveURL(href!);
  });

  test("Navigation to About Us page", async ({ page }) => {
    await page
      .locator("#navbar")
      .getByRole("link", { name: "sobre nosotros" })
      .click();
  });

  test("Navigation to Properties page", async ({ page }) => {
    await page
      .locator("#navbar")
      .getByRole("link", { name: "inmuebles" })
      .click();

    await expect(
      page.getByRole("heading", { name: "Propiedades Disponibles" }),
    ).toBeVisible();
  });
});
