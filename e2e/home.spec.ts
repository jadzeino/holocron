import { test, expect } from "../playwright-fixture";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays the Holocron title and terminal heading", async ({ page }) => {
    await expect(page.getByRole("main").locator("h1")).toContainText("Holocron");
    await expect(page.getByText("TERMINAL ONLINE")).toBeVisible();
    await expect(page.getByText("Galactic Database Terminal")).toBeVisible();
    await expect(page.getByText("ACCESS GRANTED")).toBeVisible();
  });

  test("renders all 6 resource sector links", async ({ page }) => {
    const resources = ["people", "films", "planets", "species", "starships", "vehicles"];
    for (const resource of resources) {
      await expect(page.locator(`a[href="/${resource}"]`).first()).toBeVisible();
    }
  });

  test("navigates to resource list when sector card is clicked", async ({ page }) => {
    await page.locator('a[href="/people"]').first().click();
    await page.waitForURL("**/people**");
    await expect(page.getByRole("main").locator("h1")).toContainText("people");
  });

  test("does not show search bar on home page", async ({ page }) => {
    await expect(page.locator("#search-input")).not.toBeVisible();
  });

  test("sidebar shows Holocron branding and sector links", async ({ page }) => {
    await expect(page.getByText("Database Terminal v2.1")).toBeVisible();
    const resources = ["people", "films", "planets", "species", "starships", "vehicles"];
    for (const resource of resources) {
      await expect(page.locator(`[data-sidebar="sidebar"] a[href="/${resource}"]`).first()).toBeVisible();
    }
  });

  test("clicking Holocron logo in sidebar navigates home", async ({ page }) => {
    // Navigate away first
    await page.locator('a[href="/people"]').first().click();
    await page.waitForURL("**/people**");
    // Click sidebar logo
    await page.locator('button[aria-label="Go to home page"]').click();
    await page.waitForURL("**/");
    await expect(page.getByRole("main").locator("h1")).toContainText("Holocron");
  });
});
