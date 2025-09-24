import { test, expect } from '@playwright/test';
import * as path from 'path';

test('Open table links in parallel and perform actions', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Absolute file path to your HTML
  const filePath = path.resolve(__dirname, '../html/tablelinks.html');
  await page.goto(`file://${filePath}`);

  // Collect all link locators
  const links = await page.locator('#employeeTable tbody tr td a').all();

  // Run actions in parallel
  await Promise.all(
    links.map(async (link, index) => {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'), // new tab opens
        link.click(),                 // click table link
      ]);

      await newPage.waitForLoadState('domcontentloaded');

      // Validate profile page
      const headerText = await newPage.locator('#profileHeader').innerText();
      console.log(`✅ Tab ${index + 1} opened with header: ${headerText}`);

      // Perform action in new window
      const btn = newPage.locator('#actionBtn');
      await btn.click();
      await expect(btn).toBeVisible();

      await newPage.close();
    })
  );

  await context.close();
});
