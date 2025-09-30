import { test } from "@playwright/test";

test("demo", async ({ page }) => {
  await page.goto("https://example.com");
});