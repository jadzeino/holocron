import { test as base, expect } from "@playwright/test";
import * as swapiMockModule from "./e2e/mocks/swapi-data.ts";

const handleSwapiRoute =
  typeof swapiMockModule.handleSwapiRoute === "function"
    ? swapiMockModule.handleSwapiRoute
    : typeof swapiMockModule.default === "function"
      ? swapiMockModule.default
      : null;

/**
 * Custom Playwright fixture that intercepts all swapi.dev requests
 * and returns deterministic mock data.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    if (!handleSwapiRoute) {
      throw new Error("SWAPI mock handler export not found.");
    }

    await page.route("**/swapi.dev/api/**", async (route) => {
      const url = new URL(route.request().url());
      const mock = handleSwapiRoute(url);
      if (mock) {
        await route.fulfill({
          status: mock.status,
          contentType: mock.contentType,
          body: mock.body,
        });
      } else {
        await route.fallback();
      }
    });

    await use(page);
  },
});

export { expect };
