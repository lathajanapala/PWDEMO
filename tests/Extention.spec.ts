import { test, expect, chromium } from '@playwright/test';

test("Find tab by visible text", async ({browser}) => {
//   const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const parentPage = await context.newPage();

  await parentPage.goto("file:///Users/pushpalatha/Desktop/PWDEMOS/html/index.html");

  // Click button to open 3 tabs
  await parentPage.click('#openThree');
  await parentPage.waitForTimeout(2000);

  // Get all open pages (skip parent)
  const pages = context.pages().slice(1);

let swagPage
  for (const page of pages) {
    await page.waitForLoadState('domcontentloaded');
    const bodyText = await page.textContent('body');

    if (bodyText && bodyText.includes("Swag Labs")) {
      swagPage = page;
      console.log("✅ Found Swag Labs tab:", page.url());
      break;
    }
  }

  // Do something only on that tab
  if (swagPage) {
    await swagPage.fill('[data-test="username"]', 'standard_user');
    await swagPage.fill('[data-test="password"]', 'secret_sauce');
    await swagPage.click('[data-test="login-button"]');
    await expect(swagPage.locator('.title')).toHaveText('Products');
  }

  await browser.close();
});
