import { test, expect } from "../playwright-fixture";

test.describe("Navigation & Sidebar", () => {
  test("sidebar links navigate to correct resource pages", async ({ page }) => {
    await page.goto("/");
    const resources = ["people", "films", "planets", "species", "starships", "vehicles"];

    for (const resource of resources) {
      await page.locator(`[data-sidebar="sidebar"] a[href="/${resource}"]`).first().click();
      await page.waitForURL(`**/${resource}**`);
      await expect(page.getByRole("main").locator("h1")).toContainText(resource);
    }
  });

  test("active sidebar link is highlighted", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator('[data-sidebar="sidebar"] a[href="/people"]').first()).toHaveClass(/sector-active/);
  });

  test("non-active sidebar link is not highlighted", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator('[data-sidebar="sidebar"] a[href="/films"]').first()).not.toHaveClass(/sector-active/);
  });
});

test.describe("Theme & Settings", () => {
  test("theme toggle switches between light and dark", async ({ page }) => {
    await page.goto("/");

    const darkToggle = page.getByRole("button", { name: /Switch to light mode|Switch to dark mode/ });
    await expect(darkToggle).toBeVisible();

    // Click to toggle
    const initialLabel = await darkToggle.getAttribute("aria-label");
    await darkToggle.click();

    // Label should change
    const newLabel = await darkToggle.getAttribute("aria-label");
    expect(newLabel).not.toBe(initialLabel);
  });

  test("music toggle button is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /background music/ })).toBeVisible();
  });

  test("rounded corners toggle button is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /corners/ })).toBeVisible();
  });
});

test.describe("404 Page", () => {
  test("shows not found page for invalid routes", async ({ page }) => {
    await page.goto("/this/does/not/exist");
    // Should show some not found state
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible({ timeout: 5000 });
  });
});
