import { test, expect } from "../playwright-fixture";

test.describe("Search Functionality", () => {
  test("search bar is visible on resource list pages", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator("#search-input")).toBeVisible();
  });

  test("search bar has correct placeholder for people", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator("#search-input")).toHaveAttribute("placeholder", "SEARCH DATABASE BY NAME...");
  });

  test("search bar has correct placeholder for films", async ({ page }) => {
    await page.goto("/films");
    await expect(page.locator("#search-input")).toHaveAttribute("placeholder", "SEARCH DATABASE BY TITLE...");
  });

  test("search bar has correct placeholder for starships", async ({ page }) => {
    await page.goto("/starships");
    await expect(page.locator("#search-input")).toHaveAttribute("placeholder", "SEARCH DATABASE BY NAME OR MODEL...");
  });

  test("searching filters results", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.locator("#search-input").fill("luke");
    // Wait for debounced search to kick in and results to update
    await expect(page.locator(".datacard")).toHaveCount(1, { timeout: 5000 });
    await expect(page.locator(".datacard").first()).toContainText("Luke Skywalker");
  });

  test("search updates URL params", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.locator("#search-input").fill("darth");
    // Wait for URL to update
    await expect(page).toHaveURL(/search=darth/, { timeout: 5000 });
    await expect(page).toHaveURL(/page=1/);
  });

  test("search with no results shows empty state", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.locator("#search-input").fill("xyznonexistent123");
    await expect(page.getByText("NO SIGNALS DETECTED")).toBeVisible({ timeout: 5000 });
  });

  test("clearing search restores full list", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.locator("#search-input").fill("luke");
    await expect(page.locator(".datacard")).toHaveCount(1, { timeout: 5000 });

    await page.locator("#search-input").clear();
    await expect(page.locator(".datacard")).toHaveCount(10, { timeout: 5000 });
  });

  test("search clears when navigating to a different sector", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.locator("#search-input").fill("luke");
    await expect(page).toHaveURL(/search=luke/, { timeout: 5000 });

    // Navigate to films via sidebar
    await page.locator('[data-sidebar="sidebar"] a[href="/films"]').first().click();
    await page.waitForURL("**/films**");

    // Search should be cleared
    await expect(page.locator("#search-input")).toHaveValue("");
    await expect(page).not.toHaveURL(/search=luke/);
  });

});
