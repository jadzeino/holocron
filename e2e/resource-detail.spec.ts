import { test, expect } from "../playwright-fixture";

test.describe("Resource Detail Page", () => {
  test("displays person detail with core data", async ({ page }) => {
    await page.goto("/people/1");
    await expect(page.getByText("CORE DATA")).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("main").locator("h1")).toContainText("Luke Skywalker");
    await expect(page.getByText("PEOPLE // DETAIL")).toBeVisible();
  });

  test("shows back link to resource list", async ({ page }) => {
    await page.goto("/people/1");
    await expect(page.getByText("BACK TO PEOPLE")).toBeVisible({ timeout: 5000 });
  });

  test("back link navigates to resource list", async ({ page }) => {
    await page.goto("/people/1");
    await expect(page.getByText("BACK TO PEOPLE")).toBeVisible({ timeout: 5000 });
    await page.getByText("BACK TO PEOPLE").click();
    await page.waitForURL("**/people**");
  });

  test("displays core data fields", async ({ page }) => {
    await page.goto("/people/1");
    await expect(page.getByText("CORE DATA")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("height")).toBeVisible();
    await expect(page.getByText("mass")).toBeVisible();
    await expect(page.getByText("birth year")).toBeVisible();
    await expect(page.getByText("gender")).toBeVisible();
  });

  test("displays related signals section", async ({ page }) => {
    await page.goto("/people/1");
    await expect(page.getByText("RELATED SIGNALS")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/films \(\d+\)/)).toBeVisible();
  });

  test("expanding related signals loads linked resources", async ({ page }) => {
    await page.goto("/people/1");
    await expect(page.getByText("RELATED SIGNALS")).toBeVisible({ timeout: 5000 });

    await page.getByText(/films \(\d+\)/).click();
    const loadingOrLinks = page.getByText("DECRYPTING SIGNALS...").or(page.locator('a[href^="/films/"]'));
    await expect(loadingOrLinks.first()).toBeVisible({ timeout: 5000 });
  });

  test("film detail shows opening crawl", async ({ page }) => {
    await page.goto("/films/1");
    await expect(page.getByRole("heading", { name: "OPENING CRAWL" })).toBeVisible({ timeout: 5000 });
  });

  test("film detail shows core data fields", async ({ page }) => {
    await page.goto("/films/1");
    await expect(page.getByText("CORE DATA")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("director")).toBeVisible();
    await expect(page.getByText("producer")).toBeVisible();
    await expect(page.getByText("release date")).toBeVisible();
  });

  test("planet detail page loads correctly", async ({ page }) => {
    await page.goto("/planets/1");
    await expect(page.getByText("CORE DATA")).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("main").locator("h1")).toContainText("Tatooine");
  });

  test("starship detail page loads correctly", async ({ page }) => {
    await page.goto("/starships/9");
    await expect(page.getByText("CORE DATA")).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("main").locator("h1")).toContainText("Death Star");
  });

  test("shows error state for invalid resource type", async ({ page }) => {
    await page.goto("/invalidtype/1");
    await expect(page.getByText("SIGNAL ERROR")).toBeVisible();
  });

  test("does not show search bar on detail page", async ({ page }) => {
    await page.goto("/people/1");
    await expect(page.getByText("CORE DATA").or(page.getByText("SCANNING..."))).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#search-input")).not.toBeVisible();
  });
});
