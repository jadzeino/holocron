import { test, expect } from "../playwright-fixture";

test.describe("Resource List Page", () => {
  test("displays people list with datacards", async ({ page }) => {
    await page.goto("/people");
    await expect(page.getByRole("main").locator("h1")).toContainText("people");
    await expect(page.getByText("SECTOR:")).toBeVisible();
    await expect(page.getByText("DATABASE_ACCESS_GRANTED")).toBeVisible();
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    const cards = page.locator(".datacard");
    await expect(cards).toHaveCount(10);
  });

  test("displays films list", async ({ page }) => {
    await page.goto("/films");
    await expect(page.getByRole("main").locator("h1")).toContainText("films");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
  });

  test("displays planets list", async ({ page }) => {
    await page.goto("/planets");
    await expect(page.getByRole("main").locator("h1")).toContainText("planets");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
  });

  test("shows loading state while fetching", async ({ page }) => {
    await page.goto("/people");
    const loader = page.getByText("SCANNING...");
    const content = page.locator(".datacard").first();
    await expect(loader.or(content)).toBeVisible({ timeout: 5000 });
  });

  test("shows error state for invalid resource", async ({ page }) => {
    await page.goto("/invalidresource");
    await expect(page.getByText("SIGNAL ERROR")).toBeVisible();
    await expect(page.getByText("Unknown sector")).toBeVisible();
  });

  test("each datacard links to detail page", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    const firstCard = page.locator(".datacard").first();
    const href = await firstCard.getAttribute("href");
    expect(href).toMatch(/^\/people\/\d+$/);
  });

  test("clicking a datacard navigates to detail", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    await page.locator(".datacard").first().click();
    await page.waitForURL("**/people/*");
    await expect(page.getByText("CORE DATA")).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Resource List - All Sectors", () => {
  const resources = ["people", "films", "planets", "species", "starships", "vehicles"];

  for (const resource of resources) {
    test(`loads ${resource} sector successfully`, async ({ page }) => {
      await page.goto(`/${resource}`);
      await expect(page.getByRole("main").locator("h1")).toContainText(resource);
      await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    });
  }
});
