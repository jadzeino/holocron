import { test, expect } from "../playwright-fixture";

test.describe("Pagination", () => {
  test("shows pagination controls with record count", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/RECORDS/)).toBeVisible();
    await expect(page.getByText(/PAGE 1 OF/)).toBeVisible();
  });

  test("PREV button is disabled on first page", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  test("NEXT button navigates to page 2", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: "Next page" }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByRole("button", { name: "Previous page" })).toBeEnabled({ timeout: 5000 });
  });

  test("GO TO button is disabled when only 1 page", async ({ page }) => {
    await page.goto("/films");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("button", { name: "Jump to page" })).toBeDisabled();
  });

  test("GO TO button is enabled when multiple pages exist", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("button", { name: "Jump to page" })).toBeEnabled();
  });

  test("GO TO opens input", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: "Jump to page" }).click();
    await expect(page.locator('input[type="number"]')).toBeVisible();
  });

  test("GO TO opens input and navigates to target page", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: "Jump to page" }).click();
    const jumpInput = page.locator('input[type="number"]');
    await expect(jumpInput).toBeVisible();

    await jumpInput.fill("3");
    await page.getByRole("button", { name: "GO", exact: true }).click();

    await expect(page).toHaveURL(/page=3/);
  });

  test("GO TO can be submitted with Enter key", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: "Jump to page" }).click();
    const jumpInput = page.locator('input[type="number"]');
    await jumpInput.fill("2");
    await jumpInput.press("Enter");

    await expect(page).toHaveURL(/page=2/);
  });

  test("GO TO close button dismisses the input", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: "Jump to page" }).click();
    await expect(page.locator('input[type="number"]')).toBeVisible();

    await page.getByText("✕").click();
    await expect(page.locator('input[type="number"]')).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Jump to page" })).toBeVisible();
  });

  test("GO TO ignores invalid page numbers", async ({ page }) => {
    await page.goto("/people");
    await expect(page.locator(".datacard").first()).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: "Jump to page" }).click();
    const jumpInput = page.locator('input[type="number"]');
    await jumpInput.fill("999");
    await page.getByRole("button", { name: "GO", exact: true }).click();

    await expect(page).toHaveURL(/\/people(?:\?page=1)?$/);
  });
});
