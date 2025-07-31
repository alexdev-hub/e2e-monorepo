import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page.locator("h1")).toHaveText("Example Domain");
});
