import { test, expect, chromium } from '@playwright/test';

test("browser context page demo", async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const parentPage = await context.newPage();

  await parentPage.goto("file:///Users/pushpalatha/Desktop/PWDEMOS/html/index.html");

  // Click the button to open 3 new tabs
  await parentPage.click('#openThree');

  // 🔑 Give the tabs a moment to open
  await parentPage.waitForTimeout(2000);

  // Get all pages in the context
  const pages = context.pages();

  // The first page is the parent (closed by window.close()),
  // so remaining should be the 3 new tabs
  const newPages = pages.slice(1);

  const urls: string[] = [];
  for (const p of newPages) {
    await p.waitForLoadState();
    urls.push(p.url());
  }

  console.log("Opened URLs:", urls);

  // ✅ Assert that 3 unique URLs are opened
  const uniqueUrls = new Set(urls);
  expect(uniqueUrls.size).toBe(3);

  await browser.close();
});

